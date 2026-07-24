// Tracks the last N Hangman words shown to a given student so we can avoid
// re-showing the same word too soon. Uses localStorage — per-device, no auth
// required. Non-fatal: any failure just returns an empty set.

const KEY = "hangman.recentWords.v1";
const MAX = 50;

function safeRead(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((s) => typeof s === "string") : [];
  } catch { return []; }
}

function safeWrite(arr: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(arr.slice(-MAX))); } catch { /* ignore */ }
}

export function getRecentHangmanWords(): Set<string> {
  return new Set(safeRead().map((w) => w.toUpperCase()));
}

export function rememberHangmanWord(word: string) {
  const w = word.toUpperCase();
  const list = safeRead().map((s) => s.toUpperCase()).filter((s) => s !== w);
  list.push(w);
  safeWrite(list);
}

export const HANGMAN_NO_REPEAT_WINDOW = MAX;