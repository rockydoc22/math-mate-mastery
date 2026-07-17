import { useCallback, useEffect, useRef, useState } from "react";
import { useDailyCredits } from "@/hooks/useDailyCredits";

/**
 * Starts one play on mount (spending 1 daily credit). Exposes a
 * `spendForRestart` helper for "Play Again" buttons that also costs 1.
 * When credits run out, `blocked` flips true — the game page should render
 * <OutOfCreditsCard /> instead of gameplay.
 */
export function useGameCreditGate(options?: { spendOnMount?: boolean }) {
  const spendOnMount = options?.spendOnMount ?? true;
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

  return { blocked, spendForRestart, isEmpty };
}