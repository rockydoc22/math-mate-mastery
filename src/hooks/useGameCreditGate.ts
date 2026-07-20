import { useCallback, useEffect, useRef, useState } from "react";
import { useDailyCredits } from "@/hooks/useDailyCredits";

/**
 * Manages daily-credit spend for a single game session. By default nothing
 * is spent until the player actually acts: call `spendOnce()` from the first
 * meaningful interaction (first guess, first card played, Start button, etc.).
 * `spendForRestart()` is for "Play Again" — it always spends 1. When the
 * player has no credits left, `blocked` flips true and the game page should
 * render <OutOfCreditsCard /> instead of gameplay.
 */
export function useGameCreditGate(options?: { spendOnMount?: boolean }) {
  const spendOnMount = options?.spendOnMount ?? false;
  const { trySpend, isEmpty } = useDailyCredits();
  const spentOnce = useRef(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!spendOnMount) return;
    if (spentOnce.current) return;
    spentOnce.current = true;
    if (!trySpend()) setBlocked(true);
    // trySpend identity is stable per uid; intentionally run once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spendForRestart = useCallback((): boolean => {
    if (trySpend()) return true;
    setBlocked(true);
    return false;
  }, [trySpend]);

  /** Spend exactly one credit the first time it's called for this mount.
   *  Returns true if the player may proceed, false if they're out of plays. */
  const spendOnce = useCallback((): boolean => {
    if (spentOnce.current) return !blocked;
    spentOnce.current = true;
    if (trySpend()) return true;
    setBlocked(true);
    return false;
  }, [trySpend, blocked]);

  return { blocked, spendForRestart, spendOnce, isEmpty };
}