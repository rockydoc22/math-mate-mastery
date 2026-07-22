import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

// Snapshot of the last stats value we pushed to (or pulled from) the remote
// on this device. Used to compute additive deltas so a second device does
// not overwrite points/rounds earned on the first.
function syncKey(userId?: string | null) {
  return `aoGameStatsSynced:${userId ?? "anon"}`;
}

function readSyncSnapshot(userId?: string | null): GameZoneStats | null {
  try {
    const raw = localStorage.getItem(syncKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed, perGame: { ...EMPTY.perGame, ...(parsed.perGame ?? {}) } };
  } catch {
    return null;
  }
}

function writeSyncSnapshot(userId: string | null | undefined, stats: GameZoneStats) {
  try {
    localStorage.setItem(syncKey(userId), JSON.stringify(stats));
  } catch {}
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

// Backend sync — signed-in users only. localStorage stays the source of truth
// for the fast in-memory UI; the DB is the cross-device copy so a teen who
// plays on phone and tablet sees the same points and streaks.
async function pullRemoteStats(userId: string): Promise<GameZoneStats | null> {
  const { data, error } = await supabase
    .from("game_zone_stats")
    .select("total_points, streak, best_streak, rounds_played, fastest_solve_ms, per_game")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    totalPoints: data.total_points ?? 0,
    streak: data.streak ?? 0,
    bestStreak: data.best_streak ?? 0,
    roundsPlayed: data.rounds_played ?? 0,
    fastestSolveMs: data.fastest_solve_ms ?? undefined,
    perGame: { ...EMPTY.perGame, ...((data.per_game as GameZoneStats["perGame"]) ?? {}) },
  };
}

// Additive merge using a per-device sync snapshot. Cumulative counters
// (totalPoints, roundsPlayed, perGame.played) apply the local delta since
// the last sync on top of the remote value, so plays from another device
// are preserved. High-water values use max; best times use min.
function mergeStats(
  local: GameZoneStats,
  remote: GameZoneStats,
  snapshot: GameZoneStats | null
): GameZoneStats {
  const base = snapshot ?? EMPTY;
  const delta = (l: number, s: number) => Math.max(0, l - s);

  const perGame: GameZoneStats["perGame"] = { ...remote.perGame };
  const keys = new Set([
    ...Object.keys(local.perGame),
    ...Object.keys(remote.perGame),
    ...Object.keys(base.perGame ?? {}),
  ]);
  for (const key of keys) {
    const lv = local.perGame[key] ?? { high: 0, played: 0 };
    const rv = remote.perGame[key] ?? { high: 0, played: 0 };
    const sv = (base.perGame ?? {})[key] ?? { high: 0, played: 0 };
    perGame[key] = {
      high: Math.max(lv.high, rv.high),
      played: rv.played + delta(lv.played, sv.played),
      bestTimeMs:
        lv.bestTimeMs != null && rv.bestTimeMs != null
          ? Math.min(lv.bestTimeMs, rv.bestTimeMs)
          : lv.bestTimeMs ?? rv.bestTimeMs,
    };
  }
  const fastest =
    local.fastestSolveMs != null && remote.fastestSolveMs != null
      ? Math.min(local.fastestSolveMs, remote.fastestSolveMs)
      : local.fastestSolveMs ?? remote.fastestSolveMs;
  return {
    totalPoints: remote.totalPoints + delta(local.totalPoints, base.totalPoints),
    streak: Math.max(local.streak, remote.streak),
    bestStreak: Math.max(local.bestStreak, remote.bestStreak),
    roundsPlayed: remote.roundsPlayed + delta(local.roundsPlayed, base.roundsPlayed),
    fastestSolveMs: fastest,
    perGame,
  };
}

async function pushRemoteStats(userId: string, stats: GameZoneStats) {
  try {
    await supabase.from("game_zone_stats").upsert(
      {
        user_id: userId,
        total_points: stats.totalPoints,
        streak: stats.streak,
        best_streak: stats.bestStreak,
        rounds_played: stats.roundsPlayed,
        fastest_solve_ms: stats.fastestSolveMs ?? null,
        per_game: stats.perGame,
      },
      { onConflict: "user_id" }
    );
  } catch {}
}

async function insertRemoteRound(
  userId: string,
  game: string,
  points: number,
  correctCount: number,
  solveTimeMs?: number
) {
  try {
    await supabase.from("game_zone_rounds").insert({
      user_id: userId,
      game,
      points,
      correct_count: correctCount,
      solve_time_ms: solveTimeMs ?? null,
    });
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

  // On sign-in, pull remote stats, merge with local, and push the merged
  // version back so a teen who played logged-out keeps those points.
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    (async () => {
      const remote = await pullRemoteStats(uid);
      if (cancelled) return;
      const local = readStats(uid);
      const snapshot = readSyncSnapshot(uid);
      const merged = remote ? mergeStats(local, remote, snapshot) : local;
      writeStats(uid, merged);
      setStats(merged);
      if (!remote || JSON.stringify(remote) !== JSON.stringify(merged)) {
        await pushRemoteStats(uid, merged);
      }
      writeSyncSnapshot(uid, merged);
    })();
    return () => {
      cancelled = true;
    };
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
        if (uid) {
          void pushRemoteStats(uid, next).then(() => writeSyncSnapshot(uid, next));
          void insertRemoteRound(uid, game, Math.max(0, pointsEarned), correctCount, solveTimeMs);
        }
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