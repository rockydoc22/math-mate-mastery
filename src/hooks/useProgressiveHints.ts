import { useEffect, useState, useMemo, useCallback } from "react";

export interface HintTemplate {
  skill_id: string;
  subject: string;
  difficulty: string;
  hint_sequence: string[];
}

const FALLBACK_HINTS = [
  "Read the question carefully. What is it really asking?",
  "Identify the key information given.",
  "Try eliminating obviously wrong answers first.",
  "Break the problem into smaller steps.",
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
export function useProgressiveHints(opts: {
  questionKey: string | number | undefined;
  subject?: string;
  difficulty?: string | number;
  skillId?: string;
}) {
  const { questionKey, subject, difficulty, skillId } = opts;
  const [templates, setTemplates] = useState<HintTemplate[]>(cache || []);
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
  }, [questionKey]);

  const hints = useMemo(
    () => pickHints(templates, subject, difficulty, skillId),
    [templates, subject, difficulty, skillId]
  );

  const revealNext = useCallback(() => {
    setRevealed((r) => Math.min(r + 1, hints.length));
  }, [hints.length]);

  return {
    hints,
    revealedCount: revealed,
    revealedHints: hints.slice(0, revealed),
    allShown: revealed >= hints.length,
    revealNext,
    reset: () => setRevealed(0),
  };
}
