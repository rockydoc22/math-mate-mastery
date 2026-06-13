// Tiny offline cache: stores the last N question attempts so kids can
// re-practice them on a plane or train without a network connection.
// Pure localStorage — no backend, no SW required.

const KEY = "ao_offline_questions_v1";
const MAX = 50;

export interface OfflineQ {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
  subject?: string;
  cachedAt: number;
}

export function cacheQuestion(q: Omit<OfflineQ, "cachedAt">) {
  if (typeof window === "undefined") return;
  try {
    const list = getOfflineQuestions();
    const filtered = list.filter(x => x.id !== q.id);
    filtered.unshift({ ...q, cachedAt: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX)));
  } catch {}
}

export function getOfflineQuestions(): OfflineQ[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch { return []; }
}

export function clearOfflineQuestions() {
  try { localStorage.removeItem(KEY); } catch {}
}