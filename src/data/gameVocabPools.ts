// Resolves the right vocabulary pool for Game Zone games based on what the
// student is studying (exam_type on their profile) and, as a fallback, their
// age. All pools return a uniform { word, definition } shape so games can
// consume them directly.
import { SAT_VOCAB_WORDS } from "@/data/satVocab";
import { GRE_VOCAB, GMAT_VOCAB, LSAT_VOCAB } from "@/data/proVocab";
import { MCAT_VOCAB } from "@/data/mcatVocab";

export interface GameVocabWord { word: string; definition: string }

// Pool of study focuses a game can be tuned to. Superset of ExamType so we
// can tailor for pro exams (MCAT/GRE/…) even though they aren't part of the
// SAT/PSAT/ACT ExamType union used elsewhere.
export type StudyFocus =
  | "sat" | "psat" | "act"
  | "gre" | "gmat" | "lsat" | "mcat"
  | "kid";

const toSimple = (arr: { word: string; definition: string }[]): GameVocabWord[] =>
  arr.map(w => ({ word: w.word, definition: w.definition }));

// Kid-friendly subset: shortest, simplest SAT common words. Used when the
// student has no exam picked AND is under 13.
const KID_POOL: GameVocabWord[] = toSimple(
  SAT_VOCAB_WORDS
    .filter(w => w.category === "common" && w.difficulty <= 2 && w.word.length <= 8)
    .slice(0, 60)
);

function poolFor(focus: StudyFocus): GameVocabWord[] {
  switch (focus) {
    case "gre":  return toSimple(GRE_VOCAB);
    case "gmat": return toSimple(GMAT_VOCAB);
    case "lsat": return toSimple(LSAT_VOCAB);
    case "mcat": return MCAT_VOCAB;
    case "kid":  return KID_POOL;
    // SAT / PSAT / ACT all share the SAT vocab bank (closest overlap)
    case "sat":
    case "psat":
    case "act":
    default:     return toSimple(SAT_VOCAB_WORDS);
  }
}

function ageFrom(dob?: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

/**
 * Resolve which vocab pool a game should draw from.
 * Priority: explicit study focus → exam_type on profile → age fallback → SAT.
 */
export function resolveStudyFocus(opts: {
  examType?: string | null;
  focusOverride?: StudyFocus | null;
  dateOfBirth?: string | null;
}): StudyFocus {
  if (opts.focusOverride) return opts.focusOverride;
  const e = (opts.examType || "").toLowerCase();
  if (["sat","psat","act","gre","gmat","lsat","mcat"].includes(e)) return e as StudyFocus;

  const age = ageFrom(opts.dateOfBirth);
  if (age !== null) {
    if (age < 13) return "kid";
    // 13-17 → SAT is a strong default; 18+ → SAT still fine (they may not have picked yet)
    return "sat";
  }
  return "sat";
}

export function getGameVocabPool(opts: {
  examType?: string | null;
  focusOverride?: StudyFocus | null;
  dateOfBirth?: string | null;
  minLength?: number;
}): { focus: StudyFocus; words: GameVocabWord[] } {
  const focus = resolveStudyFocus(opts);
  const min = opts.minLength ?? 4;
  const words = poolFor(focus).filter(
    w => /^[A-Za-z]+$/.test(w.word) && w.word.length >= min
  );
  return { focus, words };
}

export const FOCUS_LABEL: Record<StudyFocus, string> = {
  sat: "SAT", psat: "PSAT", act: "ACT",
  gre: "GRE", gmat: "GMAT", lsat: "LSAT", mcat: "MCAT medical",
  kid: "beginner",
};