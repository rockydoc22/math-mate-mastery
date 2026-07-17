import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// Free daily plays for Game Zone. Resets at local midnight.
// Persisted in localStorage per user (or "anon"). Purely client-side —
// this is a gentle daily cap for the fun games, not a billing meter.
export const DAILY_CREDIT_MAX = 10;

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
  try {
    const raw = localStorage.getItem(storageKey(uid));
    if (!raw) return { date: todayStr(), remaining: DAILY_CREDIT_MAX };
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.date !== todayStr()) return { date: todayStr(), remaining: DAILY_CREDIT_MAX };
    return {
      date: parsed.date,
      remaining: Math.max(0, Math.min(DAILY_CREDIT_MAX, Number(parsed.remaining) || 0)),
    };
  } catch {
    return { date: todayStr(), remaining: DAILY_CREDIT_MAX };
  }
}

function write(uid: string | null | undefined, s: Stored) {
  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(s));
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

  useEffect(() => {
    setState(read(uid));
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
    max: DAILY_CREDIT_MAX,
    isEmpty: state.remaining <= 0,
    trySpend,
    resetsInLabel,
  };
}