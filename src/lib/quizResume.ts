/**
 * Persist a small snapshot of an in-progress quiz so the student can
 * resume in exactly the same spot after signing in / refreshing.
 *
 * Keyed by the route URL (pathname + search) so different exams /
 * subjects / counts each get their own slot.
 */

export type QuizResumeSnapshot = {
  /** Full URL (pathname + search) the snapshot was captured on. */
  url: string;
  /** Exam identifier (subject, examType, etc. — whatever the caller passes). */
  examId: string;
  /** Index of the question the student was looking at. */
  questionIndex: number;
  /** Seconds remaining on the SAT-paced timer (omit if no timer). */
  timeRemaining?: number;
  /** Captured at (ms epoch). */
  savedAt: number;
};

const PREFIX = "quiz:resume:";
/** Snapshots older than this are ignored on load. */
const MAX_AGE_MS = 1000 * 60 * 60 * 6; // 6 hours

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function keyFor(url: string) {
  return PREFIX + url;
}

export function saveQuizResume(snap: Omit<QuizResumeSnapshot, "savedAt">) {
  const s = safeStorage();
  if (!s) return;
  try {
    const payload: QuizResumeSnapshot = { ...snap, savedAt: Date.now() };
    s.setItem(keyFor(snap.url), JSON.stringify(payload));
  } catch {
    /* quota / serialization — ignore */
  }
}

export function loadQuizResume(url: string): QuizResumeSnapshot | null {
  const s = safeStorage();
  if (!s) return null;
  try {
    const raw = s.getItem(keyFor(url));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizResumeSnapshot;
    if (!parsed || typeof parsed !== "object") return null;
    if (Date.now() - (parsed.savedAt ?? 0) > MAX_AGE_MS) {
      s.removeItem(keyFor(url));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearQuizResume(url: string) {
  const s = safeStorage();
  if (!s) return;
  try {
    s.removeItem(keyFor(url));
  } catch {
    /* ignore */
  }
}

/** Current URL helper (pathname + search). */
export function currentQuizUrl(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname + window.location.search;
}