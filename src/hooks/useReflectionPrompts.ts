import { useEffect, useMemo, useState } from "react";
import { fetchProtectedJson } from "@/lib/protectedAsset";

export interface ReflectionPrompt {
  id: string;
  subject: string;
  prompt: string;
  followups: string[];
}

let cache: ReflectionPrompt[] | null = null;
let inflight: Promise<ReflectionPrompt[]> | null = null;

const FALLBACK: ReflectionPrompt[] = [
  {
    id: "REF_FALLBACK_001",
    subject: "General",
    prompt:
      "What felt easier than expected, what still felt confusing, and what is one small move you can make before your next attempt?",
    followups: [
      "What strategy actually worked?",
      "Where did you slow down?",
      "What would you tell a friend doing this problem?",
      "What hint would have helped earlier?",
    ],
  },
];

async function loadPrompts(): Promise<ReflectionPrompt[]> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = fetchProtectedJson<{ reflection_prompts?: ReflectionPrompt[] }>("ai/reflection_journal_prompts.json")
    .then((j) => {
      cache = (j?.reflection_prompts as ReflectionPrompt[]) || [];
      return cache;
    })
    .catch(() => {
      cache = [];
      return cache;
    });
  return inflight;
}

export function useReflectionPrompt(subject?: string, sessionKey?: string) {
  const [prompts, setPrompts] = useState<ReflectionPrompt[]>(cache || []);

  useEffect(() => {
    let active = true;
    loadPrompts().then((p) => {
      if (active) setPrompts(p);
    });
    return () => {
      active = false;
    };
  }, []);

  const prompt = useMemo<ReflectionPrompt>(() => {
    const pool = prompts.length ? prompts : FALLBACK;
    const subj = (subject || "").toLowerCase();
    const matched = pool.filter((p) => p.subject?.toLowerCase() === subj);
    const list = matched.length ? matched : pool;
    const seed = (sessionKey || String(Date.now()))
      .split("")
      .reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return list[Math.abs(seed) % list.length];
  }, [prompts, subject, sessionKey]);

  return prompt;
}

export interface ReflectionEntry {
  id: string;
  promptId: string;
  subject: string;
  prompt: string;
  response: string;
  context?: string;
  createdAt: string;
}

const STORAGE_KEY = "reflection_journal_entries_v1";

export function getReflectionEntries(): ReflectionEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveReflectionEntry(entry: Omit<ReflectionEntry, "id" | "createdAt">) {
  const list = getReflectionEntries();
  list.unshift({
    ...entry,
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 200)));
}