import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export type GameId = "hangman" | "poker" | "emoji" | "rapid";
export type LoggedGameId = GameId | "anagram";

export interface GameZoneStats {
  totalPoints: number;
  streak: number;
  bestStreak: number;
  roundsPlayed: number;
  perGame: Record<string, { high: number; played: number; bestTimeMs?: number }>;
  fastestSolveMs?: number;
}

const EMPTY: GameZoneStats = {
  totalPoints: 0,
  streak: 0,
  bestStreak: 0,
  roundsPlayed: 0,
  perGame: {
    hangman: { high: 0, played: 0 },
    poker: { high: 0, played: 0 },
    emoji: { high: 0, played: 0 },
    rapid: { high: 0, played: 0 },
    anagram: { high: 0, played: 0 },
  },
};

function storageKey(userId?: string | null) {
  return `aoGameStats:${userId ?? "anon"}`;
}

function logKey(userId?: string | null) {
  return `aoGameLog:${userId ?? "anon"}`;
}

export type UsageLogEntry = { date: string; game: string; points: number };

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function readUsageLog(userId?: string | null): UsageLogEntry[] {
  try {
    const raw = localStorage.getItem(logKey(userId));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(-500) : [];
  } catch {
    return [];
  }
}

function appendUsageLog(userId: string | null | undefined, entry: UsageLogEntry) {
  try {
    const prev = readUsageLog(userId);
    prev.push(entry);
    localStorage.setItem(logKey(userId), JSON.stringify(prev.slice(-500)));
  } catch {}
}

function readStats(userId?: string | null): GameZoneStats {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return { ...EMPTY, perGame: { ...EMPTY.perGame } };
    const parsed = JSON.parse(raw);
    const mergedPerGame = { ...EMPTY.perGame, ...(parsed.perGame ?? {}) };
    // One-time migration: the game formerly known as "wordle" was renamed to "poker".
    // Carry the old stats over so returning players don't see their progress reset to 0.
    const legacyWordle = (parsed.perGame ?? {}).wordle;
    if (legacyWordle && (!parsed.perGame?.poker || (parsed.perGame.poker.high === 0 && parsed.perGame.poker.played === 0))) {
      mergedPerGame.poker = {
        high: Math.max(mergedPerGame.poker.high, legacyWordle.high ?? 0),
        played: Math.max(mergedPerGame.poker.played, legacyWordle.played ?? 0),
      };
    }
    return { ...EMPTY, ...parsed, perGame: mergedPerGame };
  } catch {
    return { ...EMPTY, perGame: { ...EMPTY.perGame } };
  }
}

function writeStats(userId: string | null | undefined, stats: GameZoneStats) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(stats));
    window.dispatchEvent(new CustomEvent("aoGameStatsChanged", { detail: { uid: userId ?? null } }));
  } catch {}
}

export const BADGE_TIERS = [
  { threshold: 100, name: "Word Rookie", emoji: "🥉" },
  { threshold: 500, name: "Vocab Shark", emoji: "🥈" },
  { threshold: 1000, name: "SAT Sensei", emoji: "🏆" },
];

export function useGameZoneStats() {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [stats, setStats] = useState<GameZoneStats>(() => readStats(uid));

  useEffect(() => {
    setStats(readStats(uid));
  }, [uid]);

  // Live-sync across hook instances (same tab) and across tabs (storage event).
  useEffect(() => {
    const onChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail as { uid?: string | null } | undefined;
      if (detail && detail.uid !== uid) return;
      setStats(readStats(uid));
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(uid) || e.key === logKey(uid)) {
        setStats(readStats(uid));
      }
    };
    window.addEventListener("aoGameStatsChanged", onChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("aoGameStatsChanged", onChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [uid]);

  const recordRound = useCallback(
    (game: LoggedGameId, pointsEarned: number, correctCount: number, wasCorrect: boolean, solveTimeMs?: number) => {
      setStats((prev) => {
        const nextStreak = wasCorrect && correctCount > 0 ? prev.streak + correctCount : 0;
        const perGamePrev = prev.perGame[game] ?? { high: 0, played: 0 };
        const fastest = solveTimeMs && wasCorrect
          ? Math.min(prev.fastestSolveMs ?? Number.POSITIVE_INFINITY, solveTimeMs)
          : prev.fastestSolveMs;
        const perGameBestTime = solveTimeMs && wasCorrect
          ? Math.min(perGamePrev.bestTimeMs ?? Number.POSITIVE_INFINITY, solveTimeMs)
          : perGamePrev.bestTimeMs;
        const next: GameZoneStats = {
          ...prev,
          totalPoints: prev.totalPoints + Math.max(0, pointsEarned),
          streak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
          roundsPlayed: prev.roundsPlayed + 1,
          fastestSolveMs: Number.isFinite(fastest as number) ? (fastest as number) : undefined,
          perGame: {
            ...prev.perGame,
            [game]: {
              high: Math.max(perGamePrev.high, pointsEarned),
              played: perGamePrev.played + 1,
              bestTimeMs: Number.isFinite(perGameBestTime as number) ? (perGameBestTime as number) : undefined,
            },
          },
        };
        writeStats(uid, next);
        appendUsageLog(uid, { date: todayISO(), game, points: Math.max(0, pointsEarned) });
        return next;
      });
    },
    [uid]
  );

  const recordAnswer = useCallback(
    (isCorrect: boolean, pointsIfCorrect = 10) => {
      setStats((prev) => {
        const nextStreak = isCorrect ? prev.streak + 1 : 0;
        const next: GameZoneStats = {
          ...prev,
          totalPoints: prev.totalPoints + (isCorrect ? pointsIfCorrect : 0),
          streak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
        };
        writeStats(uid, next);
        return next;
      });
    },
    [uid]
  );

  const earnedBadges = BADGE_TIERS.filter((b) => stats.totalPoints >= b.threshold);
  const nextBadge = BADGE_TIERS.find((b) => stats.totalPoints < b.threshold);

  return { stats, recordRound, recordAnswer, earnedBadges, nextBadge };
}