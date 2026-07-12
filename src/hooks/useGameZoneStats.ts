import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export type GameId = "hangman" | "poker" | "emoji" | "rapid";

export interface GameZoneStats {
  totalPoints: number;
  streak: number;
  bestStreak: number;
  roundsPlayed: number;
  perGame: Record<GameId, { high: number; played: number }>;
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
  },
};

function storageKey(userId?: string | null) {
  return `aoGameStats:${userId ?? "anon"}`;
}

function readStats(userId?: string | null): GameZoneStats {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return { ...EMPTY, perGame: { ...EMPTY.perGame } };
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed, perGame: { ...EMPTY.perGame, ...(parsed.perGame ?? {}) } };
  } catch {
    return { ...EMPTY, perGame: { ...EMPTY.perGame } };
  }
}

function writeStats(userId: string | null | undefined, stats: GameZoneStats) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(stats));
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

  const recordRound = useCallback(
    (game: GameId, pointsEarned: number, correctCount: number, wasCorrect: boolean) => {
      setStats((prev) => {
        const nextStreak = wasCorrect && correctCount > 0 ? prev.streak + correctCount : 0;
        const perGamePrev = prev.perGame[game] ?? { high: 0, played: 0 };
        const next: GameZoneStats = {
          ...prev,
          totalPoints: prev.totalPoints + Math.max(0, pointsEarned),
          streak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
          roundsPlayed: prev.roundsPlayed + 1,
          perGame: {
            ...prev.perGame,
            [game]: {
              high: Math.max(perGamePrev.high, pointsEarned),
              played: perGamePrev.played + 1,
            },
          },
        };
        writeStats(uid, next);
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