/**
 * Daily reminder helper — opt-in browser notifications.
 * Uses the standard Notification API; while the tab is open we schedule
 * a setTimeout that fires at the user's chosen time. Persists choice in
 * localStorage so the next session re-arms the reminder.
 */

const KEY = "ao_daily_reminder_time"; // "HH:MM"

export function getReminderTime(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function clearReminder() {
  try { localStorage.removeItem(KEY); } catch {}
}

export async function enableReminder(time: string): Promise<boolean> {
  if (!("Notification" in window)) return false;
  let perm = Notification.permission;
  if (perm === "default") perm = await Notification.requestPermission();
  if (perm !== "granted") return false;
  try { localStorage.setItem(KEY, time); } catch {}
  scheduleNext(time);
  return true;
}

function msUntil(time: string): number {
  const [h, m] = time.split(":").map(Number);
  const now = new Date();
  const target = new Date(now);
  target.setHours(h, m, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

function scheduleNext(time: string) {
  const ms = msUntil(time);
  setTimeout(() => {
    try {
      new Notification("AlphaOmega — time to practice", {
        body: "5 minutes today keeps your streak alive.",
        icon: "/pwa-192x192.png",
        tag: "ao-daily",
      });
    } catch {}
    // Re-arm for next day (only while tab open)
    scheduleNext(time);
  }, ms);
}

export function bootReminder() {
  const t = getReminderTime();
  if (t && "Notification" in window && Notification.permission === "granted") {
    scheduleNext(t);
  }
}