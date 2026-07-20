import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// Free daily plays for Game Zone. Resets at local midnight.
// Persisted in localStorage per user (or "anon"). Purely client-side —
// this is a gentle daily cap for the fun games, not a billing meter.
export const DAILY_CREDIT_MAX = 10;

// Parents can override the per-teen daily play limit from Parent Controls.
// Stored per uid at `aoDailyCreditLimit:{uid}`.
export function getDailyLimit(uid?: string | null): number {
  try {
    const raw = localStorage.getItem(`aoDailyCreditLimit:${uid ?? "anon"}`);
    if (!raw) return DAILY_CREDIT_MAX;
    const n = Math.max(0, Math.min(50, Math.round(Number(raw))));
    return Number.isFinite(n) ? n : DAILY_CREDIT_MAX;
  } catch {
    return DAILY_CREDIT_MAX;
  }
}

export function setDailyLimit(uid: string | null | undefined, limit: number) {
  try {
    const n = Math.max(0, Math.min(50, Math.round(limit)));
    localStorage.setItem(`aoDailyCreditLimit:${uid ?? "anon"}`, String(n));
    // Notify listeners in this tab
    window.dispatchEvent(new CustomEvent("aoDailyLimitChanged", { detail: { uid, limit: n } }));
  } catch {}
}

type Stored = { date: string; remaining: number };

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function storageKey(uid?: string | null) {
  return `aoDailyCredits:${uid ?? "anon"}`;
}

function read(uid?: string | null): Stored {
  const max = getDailyLimit(uid);
  try {
    const raw = localStorage.getItem(storageKey(uid));
    if (!raw) return { date: todayStr(), remaining: max };
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.date !== todayStr()) return { date: todayStr(), remaining: max };
    return {
      date: parsed.date,
      remaining: Math.max(0, Math.min(max, Number(parsed.remaining) || 0)),
    };
  } catch {
    return { date: todayStr(), remaining: max };
  }
}

function write(uid: string | null | undefined, s: Stored) {
  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(s));
    window.dispatchEvent(new CustomEvent("aoDailyCreditsChanged", { detail: { uid } }));
  } catch {}
}

function msUntilMidnight() {
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 5, 0);
  return Math.max(1000, next.getTime() - d.getTime());
}

export function useDailyCredits() {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [state, setState] = useState<Stored>(() => read(uid));
  const [max, setMax] = useState<number>(() => getDailyLimit(uid));

  useEffect(() => {
    setState(read(uid));
    setMax(getDailyLimit(uid));
  }, [uid]);

  // Refresh when the parent updates the limit for this teen.
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { uid?: string | null } | undefined;
      if (detail?.uid === uid) {
        setMax(getDailyLimit(uid));
        setState(read(uid));
      }
    };
    window.addEventListener("aoDailyLimitChanged", onChange);
    return () => window.removeEventListener("aoDailyLimitChanged", onChange);
  }, [uid]);

  // Keep every hook instance (badge, gate, hub) in sync when credits are
  // spent or reset from any other instance in this tab or another tab.
  useEffect(() => {
    const onCreditsChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail as { uid?: string | null } | undefined;
      if (detail && detail.uid !== uid) return;
      setState(read(uid));
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(uid)) setState(read(uid));
      if (e.key === `aoDailyCreditLimit:${uid ?? "anon"}`) {
        setMax(getDailyLimit(uid));
        setState(read(uid));
      }
    };
    window.addEventListener("aoDailyCreditsChanged", onCreditsChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("aoDailyCreditsChanged", onCreditsChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [uid]);

  // Auto-refresh at local midnight so the counter resets without a reload.
  useEffect(() => {
    const t = window.setTimeout(() => setState(read(uid)), msUntilMidnight());
    return () => window.clearTimeout(t);
  }, [uid, state.date]);

  const trySpend = useCallback((): boolean => {
    const current = read(uid);
    if (current.remaining <= 0) {
      setState(current);
      return false;
    }
    const next: Stored = { date: current.date, remaining: current.remaining - 1 };
    write(uid, next);
    setState(next);
    return true;
  }, [uid]);

  const resetsInLabel = useCallback(() => {
    const ms = msUntilMidnight();
    const totalMin = Math.max(1, Math.round(ms / 60000));
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    if (h <= 0) return `${m}m`;
    return `${h}h ${m}m`;
  }, []);

  return {
    credits: state.remaining,
    max,
    isEmpty: state.remaining <= 0,
    trySpend,
    resetsInLabel,
  };
}