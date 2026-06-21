import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HintTemplate {
  skill_id: string;
  subject: string;
  difficulty: string;
  hint_sequence: string[];
}

const FALLBACK_HINTS = [
  "Pinpoint exactly what the question is asking for and which formula or rule applies.",
  "Write out the equation or quote the key line using the actual values from this problem.",
  "Carry out the computation or reasoning step that produces the answer.",
];

let cache: HintTemplate[] | null = null;
let cachePromise: Promise<HintTemplate[]> | null = null;

async function loadHintTemplates(): Promise<HintTemplate[]> {
  if (cache) return cache;
  if (cachePromise) return cachePromise;
  cachePromise = fetch("/data/tutor_and_hint_system.json")
    .then((r) => r.json())
    .then((d) => {
      cache = d.hint_templates || [];
      return cache!;
    })
    .catch(() => {
      cache = [];
      return cache!;
    });
  return cachePromise;
}

function normalizeSubject(subject?: string): string {
  if (!subject) return "Math";
  const s = subject.toLowerCase();
  if (s.includes("math") || s.includes("alg") || s.includes("geom")) return "Math";
  if (s.includes("read") || s.includes("english") || s.includes("writing") || s.includes("verbal")) return "Reading";
  if (s.includes("sci")) return "Science";
  return subject;
}

function normalizeDifficulty(d?: string | number): string {
  if (typeof d === "number") {
    if (d <= 3) return "easy";
    if (d <= 6) return "medium";
    if (d <= 8) return "hard";
    return "challenge";
  }
  if (!d) return "medium";
  return d.toLowerCase();
}

export function pickHints(
  templates: HintTemplate[],
  subject?: string,
  difficulty?: string | number,
  skillId?: string
): string[] {
  if (!templates || templates.length === 0) return FALLBACK_HINTS;
  const subj = normalizeSubject(subject);
  const diff = normalizeDifficulty(difficulty);
  const subjectMatches = templates.filter((h) => h.subject.toLowerCase() === subj.toLowerCase());
  if (skillId) {
    const skillExact = subjectMatches.find(
      (h) => h.skill_id.toLowerCase() === skillId.toLowerCase() && h.difficulty === diff
    );
    if (skillExact) return skillExact.hint_sequence;
    const skillAny = subjectMatches.find((h) => h.skill_id.toLowerCase() === skillId.toLowerCase());
    if (skillAny) return skillAny.hint_sequence;
  }
  const diffMatch = subjectMatches.find((h) => h.difficulty === diff);
  if (diffMatch) return diffMatch.hint_sequence;
  if (subjectMatches.length > 0) return subjectMatches[0].hint_sequence;
  return FALLBACK_HINTS;
}

/**
 * Progressive hint hook. Resets when `questionKey` changes.
 */
interface QuestionOption { letter: string; text: string }

export function useProgressiveHints(opts: {
  questionKey: string | number | undefined;
  subject?: string;
  difficulty?: string | number;
  skillId?: string;
  question?: string;
  options?: QuestionOption[];
  correctAnswer?: string;
  explanation?: string;
}) {
  const { questionKey, subject, difficulty, skillId, question, options, correctAnswer, explanation } = opts;
  const [templates, setTemplates] = useState<HintTemplate[]>(cache || []);
  const [aiHints, setAiHints] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let alive = true;
    if (!cache) {
      loadHintTemplates().then((t) => {
        if (alive) setTemplates(t);
      });
    }
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setRevealed(0);
    setAiHints(null);
    setError(null);
    // Try sessionStorage cache for AI hints, keyed by questionKey
    if (questionKey != null && typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(`hints:${questionKey}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length) setAiHints(parsed);
        }
      } catch { /* ignore */ }
    }
  }, [questionKey]);

  const fallbackHints = useMemo(
    () => pickHints(templates, subject, difficulty, skillId),
    [templates, subject, difficulty, skillId]
  );

  const hints = aiHints && aiHints.length ? aiHints : fallbackHints;

  const fetchAiHints = useCallback(async () => {
    if (aiHints || loading || !question) return null;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("generate-hints", {
        body: {
          question,
          options,
          correctAnswer,
          explanation,
          skill: skillId,
          domain: subject,
        },
      });
      if (fnErr) throw fnErr;
      const list: string[] = Array.isArray(data?.hints) ? data.hints : [];
      if (list.length) {
        setAiHints(list);
        if (questionKey != null && typeof window !== "undefined") {
          try { sessionStorage.setItem(`hints:${questionKey}`, JSON.stringify(list)); } catch { /* ignore */ }
        }
        return list;
      }
      return null;
    } catch (e: any) {
      setError(e?.message || "Could not load hints");
      return null;
    } finally {
      setLoading(false);
    }
  }, [aiHints, loading, question, options, correctAnswer, explanation, skillId, subject, questionKey]);

  const revealNext = useCallback(async () => {
    // First click: try to fetch question-specific hints before revealing
    if (revealed === 0 && !aiHints && question) {
      const list = await fetchAiHints();
      const total = (list ?? fallbackHints).length;
      setRevealed(Math.min(1, total));
      return;
    }
    setRevealed((r) => Math.min(r + 1, hints.length));
  }, [hints.length, revealed, aiHints, question, fetchAiHints, fallbackHints]);

  return {
    hints,
    revealedCount: revealed,
    revealedHints: hints.slice(0, revealed),
    allShown: revealed >= hints.length,
    revealNext,
    loading,
    error,
    reset: () => setRevealed(0),
  };
}
