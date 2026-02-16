import { useState, useCallback, useEffect } from "react";

const PERFECT_STREAK_KEY = "sat_perfect_streak";
const PERFECT_STREAK_BEST_KEY = "sat_perfect_streak_best";

interface PerfectStreakData {
  current: number;
  best: number;
}

export function getPerfectStreakTitle(streak: number): string | null {
  if (streak >= 100) return "💎 Flawless 100";
  if (streak >= 50) return "👑 Flawless 50";
  if (streak >= 25) return "🔥 Flawless 25";
  if (streak >= 10) return "⭐ Flawless 10";
  if (streak >= 5) return "✨ Flawless 5";
  return null;
}

export function usePerfectStreak() {
  const [streak, setStreak] = useState<PerfectStreakData>({ current: 0, best: 0 });

  useEffect(() => {
    try {
      const current = parseInt(localStorage.getItem(PERFECT_STREAK_KEY) || "0", 10);
      const best = parseInt(localStorage.getItem(PERFECT_STREAK_BEST_KEY) || "0", 10);
      setStreak({ current, best });
    } catch {
      setStreak({ current: 0, best: 0 });
    }
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean) => {
    setStreak(prev => {
      if (isCorrect) {
        const newCurrent = prev.current + 1;
        const newBest = Math.max(newCurrent, prev.best);
        localStorage.setItem(PERFECT_STREAK_KEY, String(newCurrent));
        localStorage.setItem(PERFECT_STREAK_BEST_KEY, String(newBest));
        return { current: newCurrent, best: newBest };
      } else {
        localStorage.setItem(PERFECT_STREAK_KEY, "0");
        return { current: 0, best: prev.best };
      }
    });
  }, []);

  const title = getPerfectStreakTitle(streak.current);
  const bestTitle = getPerfectStreakTitle(streak.best);

  return { streak, recordAnswer, title, bestTitle };
}
