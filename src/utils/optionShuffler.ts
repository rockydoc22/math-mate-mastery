/**
 * Deterministically shuffles the options within a question so the correct
 * answer is evenly distributed across A/B/C/D. The shuffle is keyed by
 * question.id, so:
 *   - The same student always sees the same option order for the same item
 *     (no jitter on re-render).
 *   - All players in a multiplayer room see the same order.
 *   - Across the whole bank the correct-letter distribution flattens to ~25%
 *     per letter, killing "always pick A" position bias.
 */

interface QuestionOption {
  letter: string;
  text: string;
}

interface ShuffleableQuestion {
  options: QuestionOption[];
  correctAnswer: string;
  id?: string;
  [key: string]: any;
}

// ---------- deterministic RNG ----------
function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Deterministically shuffles the options of a single question and updates the
 * correctAnswer letter. Idempotent: shuffling the same question twice returns
 * the same order. Skips items that aren't 4-option MCQ (TF, FRQ, etc.).
 */
export function shuffleQuestionOptions<T extends ShuffleableQuestion>(question: T): T {
  if (!question || !Array.isArray(question.options) || question.options.length < 2) return question;
  // skip non-MCQ shapes (anything that isn't letter/text)
  if (!question.options.every(o => o && typeof o.letter === 'string' && typeof o.text === 'string')) return question;

  const correctOption = question.options.find(opt => opt.letter === question.correctAnswer);
  if (!correctOption) return question;
  const correctText = correctOption.text;

  const seedBase = (question.id ?? correctText) + '|' + question.options.map(o => o.text).join('§');
  const seed = hashString(String(seedBase));

  const letters = ['A', 'B', 'C', 'D', 'E'].slice(0, question.options.length);
  const shuffledTexts = seededShuffle(question.options.map(o => o.text), seed);

  const newOptions: QuestionOption[] = shuffledTexts.map((text, index) => ({ letter: letters[index], text }));
  const newCorrectLetter = newOptions.find(opt => opt.text === correctText)?.letter ?? question.correctAnswer;

  return { ...question, options: newOptions, correctAnswer: newCorrectLetter };
}

/** Batch helper. */
export function shuffleAllQuestionOptions<T extends ShuffleableQuestion>(questions: T[]): T[] {
  return questions.map(q => shuffleQuestionOptions(q));
}
