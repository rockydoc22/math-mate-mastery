import { supabase } from "@/integrations/supabase/client";

// ---------------------------------------------------------------------------
// Unified attempt writer.
//
// Goal: every quiz/mode in the app should funnel through this single helper so
// the skill graph, weakness clusters, and spaced-repetition queue all see the
// same signal. Existing callers can migrate gradually; the helper is additive
// and never throws — failures are logged and swallowed so quiz UX is never
// blocked by analytics.
// ---------------------------------------------------------------------------

export interface AttemptInput {
  userId: string;
  questionId: string;
  isCorrect: boolean;
  timeMs?: number;
  // Optional taxonomy — pass whatever you have; missing fields are fine.
  examFamily?: string;   // sat, act, ap_calc_bc, nclex_rn, …
  section?: string;      // math, english, science, …
  domain?: string;       // algebra, reading_comprehension, …
  skill?: string;        // linear_equations, main_idea, …
  difficulty?: number;   // 1–10
  confidence?: 1 | 2 | 3 | 4 | 5; // optional self-rating
  source?: string;       // quiz, daily, battle, weakness-retest, review-queue
}

// Local mirror of unsynced attempts — drives spaced-repetition even before
// the writer fires.
const LS_KEY = "ao_attempts_v1";
const MAX_LOCAL = 200;

interface LocalAttempt {
  qid: string;
  ok: boolean;
  at: number;
  examFamily?: string;
  skill?: string;
}

function pushLocal(a: LocalAttempt) {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr: LocalAttempt[] = raw ? JSON.parse(raw) : [];
    arr.unshift(a);
    localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(0, MAX_LOCAL)));
  } catch {}
}

export function getLocalAttempts(): LocalAttempt[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function recordAttempt(a: AttemptInput): Promise<void> {
  pushLocal({
    qid: a.questionId,
    ok: a.isCorrect,
    at: Date.now(),
    examFamily: a.examFamily,
    skill: a.skill,
  });

  // Best-effort dual write. Each insert is independent so a column mismatch
    // on one table never blocks the other.
  try {
    await supabase.from("question_attempts").insert({
      user_id: a.userId,
      question_id: a.questionId,
      is_correct: a.isCorrect,
      time_taken_ms: a.timeMs ?? null,
      domain: a.domain ?? null,
      skill: a.skill ?? null,
    } as any);
  } catch (err) {
    console.warn("[recordAttempt] question_attempts insert failed", err);
  }

  try {
    await supabase.from("student_attempts").insert({
      user_id: a.userId,
      question_id: a.questionId,
      is_correct: a.isCorrect,
      time_seconds: a.timeMs ? Math.round(a.timeMs / 1000) : null,
      confidence: a.confidence ?? null,
    } as any);
  } catch (err) {
    // student_attempts may have a strict FK to assessment_questions; fine to skip.
  }
}

// Trigger weakness-cluster recompute after a batch of attempts. Cheap to call
// — server-side function is idempotent. Pass examFamily to scope work.
export async function refreshWeaknessClusters(userId: string, examFamily?: string) {
  try {
    await supabase.rpc("recompute_weakness_clusters", {
      _user_id: userId,
      _exam_family: examFamily ?? null,
    } as any);
  } catch (err) {
    console.warn("[refreshWeaknessClusters] failed", err);
  }
}