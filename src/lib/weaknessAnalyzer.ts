import { supabase } from "@/integrations/supabase/client";

export type WeakArea = {
  skill: string;
  domain: string;
  questionType: string;
  attempts: number;
  correct: number;
  accuracy: number;
  avgTimeMs: number;
  weaknessScore: number;
};

/**
 * Pulls the student's recent question_attempts and groups by skill+domain to
 * find weakest areas. Higher weaknessScore = bigger problem. Requires at
 * least 3 attempts in a skill for it to count.
 */
export async function loadWeakAreas(userId: string, limit = 6): Promise<{
  weakAreas: WeakArea[];
  totalAttempts: number;
  recentAccuracy: number;
}> {
  const { data, error } = await supabase
    .from("question_attempts")
    .select("skill, domain, question_type, is_correct, time_taken_ms, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error || !data) return { weakAreas: [], totalAttempts: 0, recentAccuracy: 0 };

  const buckets = new Map<string, WeakArea>();
  let totalCorrect = 0;
  for (const row of data) {
    const key = `${row.question_type}::${row.domain}::${row.skill}`;
    const b = buckets.get(key) ?? {
      skill: row.skill || "Unknown",
      domain: row.domain || "General",
      questionType: row.question_type || "math",
      attempts: 0,
      correct: 0,
      accuracy: 0,
      avgTimeMs: 0,
      weaknessScore: 0,
    };
    b.attempts += 1;
    if (row.is_correct) { b.correct += 1; totalCorrect += 1; }
    b.avgTimeMs += row.time_taken_ms || 0;
    buckets.set(key, b);
  }

  // Reliable per-skill signal needs ~8 attempts (Cronbach α ≥ 0.7 for short
  // skill quizzes). Below that, accuracy swings too much from luck.
  const all = Array.from(buckets.values())
    .filter((b) => b.attempts >= 8)
    .map((b) => {
      b.accuracy = b.correct / b.attempts;
      b.avgTimeMs = Math.round(b.avgTimeMs / b.attempts);
      // Weakness score: low accuracy + decent sample size
      const accComp = (1 - b.accuracy) * 60;
      const sampleComp = Math.min(20, b.attempts) * 0.8;
      b.weaknessScore = Math.round(Math.min(100, accComp + sampleComp));
      return b;
    })
    .sort((a, b) => b.weaknessScore - a.weaknessScore)
    .slice(0, limit);

  return {
    weakAreas: all,
    totalAttempts: data.length,
    recentAccuracy: data.length ? totalCorrect / data.length : 0,
  };
}

export function sampleQuestionsForWeakAreas<
  T extends { skill?: string; domain?: string }
>(bank: T[], weakAreas: WeakArea[], targetCount = 15): T[] {
  const out: T[] = [];
  const used = new Set<T>();
  const skillsLc = weakAreas.map((w) => w.skill.toLowerCase());

  // 70% weighted toward weak skills
  const weakTarget = Math.round(targetCount * 0.7);
  for (const w of weakAreas) {
    if (out.length >= weakTarget) break;
    const matches = bank.filter(
      (q) =>
        !used.has(q) &&
        (q.skill?.toLowerCase() === w.skill.toLowerCase() ||
          q.domain?.toLowerCase() === w.domain.toLowerCase())
    );
    // shuffle
    for (let i = matches.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matches[i], matches[j]] = [matches[j], matches[i]];
    }
    const perSkill = Math.max(2, Math.ceil(weakTarget / Math.max(1, weakAreas.length)));
    for (const m of matches.slice(0, perSkill)) {
      if (out.length >= weakTarget) break;
      out.push(m);
      used.add(m);
    }
  }

  // 30% mixed review from anything not used, preferring related domains
  const fillers = bank.filter((q) => !used.has(q));
  for (let i = fillers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fillers[i], fillers[j]] = [fillers[j], fillers[i]];
  }
  for (const f of fillers) {
    if (out.length >= targetCount) break;
    out.push(f);
  }
  return out.slice(0, targetCount);
}