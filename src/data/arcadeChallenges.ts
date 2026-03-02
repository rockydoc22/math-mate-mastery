// Arcade challenge generator for SAT/PSAT/ACT test prep
// Generates quick-recall questions suitable for arcade games

import { ExamType } from '@/utils/examConfig';

export type ArcadeSkill = 'math' | 'english' | 'mixed';

export interface ArcadeChallenge {
  prompt: string;
  correctAnswer: string;
  distractors: string[];
  category: string;
}

// ── Helpers ──

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function uniqueDistractors(correct: number, min: number, max: number, count: number): string[] {
  const set = new Set<number>();
  let attempts = 0;
  while (set.size < count && attempts < 50) {
    const d = randInt(min, max);
    if (d !== correct) set.add(d);
    attempts++;
  }
  while (set.size < count) {
    set.add(correct + set.size + 1);
  }
  return [...set].map(String);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Vocab & Grammar Data ──

const vocabPairs: [string, string, string, string, string][] = [
  ['Ubiquitous', 'Found everywhere', 'Rarely seen', 'Extremely loud', 'Very old'],
  ['Ephemeral', 'Short-lived', 'Eternal', 'Bright', 'Heavy'],
  ['Pragmatic', 'Practical', 'Idealistic', 'Lazy', 'Romantic'],
  ['Ambiguous', 'Unclear', 'Obvious', 'Angry', 'Musical'],
  ['Eloquent', 'Fluent & persuasive', 'Silent', 'Confused', 'Hostile'],
  ['Concise', 'Brief & clear', 'Long-winded', 'Mysterious', 'Colorful'],
  ['Benevolent', 'Kind & generous', 'Cruel', 'Wealthy', 'Shy'],
  ['Diligent', 'Hardworking', 'Lazy', 'Fast', 'Clever'],
  ['Resilient', 'Able to recover', 'Fragile', 'Quiet', 'Tall'],
  ['Inevitable', 'Certain to happen', 'Unlikely', 'Optional', 'Sudden'],
  ['Prolific', 'Highly productive', 'Inactive', 'Destructive', 'Small'],
  ['Candid', 'Honest & direct', 'Secretive', 'Timid', 'Elaborate'],
  ['Meticulous', 'Very careful', 'Careless', 'Quick', 'Bold'],
  ['Vindicate', 'Clear of blame', 'Accuse', 'Punish', 'Ignore'],
  ['Juxtapose', 'Place side by side', 'Separate', 'Destroy', 'Hide'],
  ['Ameliorate', 'Make better', 'Worsen', 'Maintain', 'Delay'],
  ['Exacerbate', 'Make worse', 'Improve', 'Explain', 'Simplify'],
  ['Perfunctory', 'Done without care', 'Thorough', 'Enthusiastic', 'Novel'],
  ['Complacent', 'Smugly satisfied', 'Anxious', 'Ambitious', 'Angry'],
  ['Tenacious', 'Persistent', 'Giving up easily', 'Quiet', 'Nervous'],
];

const grammarQuestions: [string, string, string, string, string][] = [
  ['The data ___ inconclusive.', 'were', 'was', 'is being', 'has'],
  ['Neither the students nor the teacher ___ ready.', 'was', 'were', 'are', 'been'],
  ['Each of the players ___ a trophy.', 'receives', 'receive', 'receiving', 'received'],
  ['The team ___ their jerseys.', 'wore', 'weared', 'was wearing', 'wored'],
  ['She is taller ___ her brother.', 'than', 'then', 'that', 'from'],
  ['If I ___ rich, I would travel.', 'were', 'was', 'am', 'be'],
  ['The books on the shelf ___ dusty.', 'are', 'is', 'was', 'been'],
  ['He runs ___ than his sister.', 'faster', 'more fast', 'most fast', 'fastest'],
  ['They ___ to the store yesterday.', 'went', 'goed', 'goes', 'going'],
  ['_____ the rain, they played outside.', 'Despite', 'Although', 'Because', 'Since'],
  ['The committee ___ divided on the issue.', 'was', 'were', 'are', 'been'],
  ['She ___ studying when I called.', 'was', 'is', 'were', 'been'],
];

// ── Math Quick-Recall Questions ──

const mathChallenges: (() => ArcadeChallenge)[] = [
  () => {
    const a = randInt(2, 9); const x = randInt(1, 12); const b = randInt(1, 20);
    const result = a * x + b;
    return { prompt: `${a}x + ${b} = ${result}. x = ?`, correctAnswer: `${x}`, distractors: uniqueDistractors(x, 1, 20, 3), category: 'Algebra' };
  },
  () => {
    const r1 = randInt(1, 8); const r2 = randInt(1, 8);
    return { prompt: `x² − ${r1 + r2}x + ${r1 * r2} = 0. One root?`, correctAnswer: `${r1}`, distractors: uniqueDistractors(r1, 1, 15, 3), category: 'Quadratics' };
  },
  () => {
    const base = randInt(2, 5); const exp = randInt(2, 4); const ans = Math.pow(base, exp);
    return { prompt: `${base}^${exp} = ?`, correctAnswer: `${ans}`, distractors: uniqueDistractors(ans, 4, 200, 3), category: 'Exponents' };
  },
  () => {
    const pct = [10, 15, 20, 25, 30, 40, 50, 75][randInt(0, 7)];
    const whole = [40, 60, 80, 100, 120, 200, 300][randInt(0, 6)];
    const ans = (pct / 100) * whole;
    return { prompt: `${pct}% of ${whole} = ?`, correctAnswer: `${ans}`, distractors: uniqueDistractors(ans, 1, whole, 3), category: 'Percentages' };
  },
  () => {
    const x1 = randInt(0, 5), y1 = randInt(0, 5);
    const x2 = x1 + randInt(1, 4), y2 = y1 + randInt(-3, 5);
    const rise = y2 - y1, run = x2 - x1;
    const g = gcd(Math.abs(rise), Math.abs(run));
    const ans = g === run ? `${rise / g}` : `${rise / g}/${run / g}`;
    return { prompt: `Slope of (${x1},${y1}) to (${x2},${y2})?`, correctAnswer: ans, distractors: [`${rise + 1}/${run}`, `${run}/${rise || 1}`, `${-rise / g}/${run / g}`].slice(0, 3), category: 'Slope' };
  },
  () => {
    const a = randInt(11, 25); const b = randInt(11, 25);
    return { prompt: `${a} × ${b} = ?`, correctAnswer: `${a * b}`, distractors: uniqueDistractors(a * b, 100, 700, 3), category: 'Arithmetic' };
  },
  () => {
    const n = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144][randInt(0, 10)];
    return { prompt: `√${n} = ?`, correctAnswer: `${Math.sqrt(n)}`, distractors: uniqueDistractors(Math.sqrt(n), 2, 15, 3), category: 'Roots' };
  },
  () => {
    const n = randInt(-15, -1);
    return { prompt: `|${n}| = ?`, correctAnswer: `${-n}`, distractors: [`${n}`, `${-n + 1}`, `${-n - 1}`], category: 'Absolute Value' };
  },
];

// ── English Quick-Recall Questions ──

const englishChallenges: (() => ArcadeChallenge)[] = [
  ...vocabPairs.map(([word, def, d1, d2, d3]) => () => ({
    prompt: `"${word}" means:`,
    correctAnswer: def,
    distractors: [d1, d2, d3],
    category: 'Vocabulary',
  })),
  ...grammarQuestions.map(([sentence, correct, d1, d2, d3]) => () => ({
    prompt: sentence,
    correctAnswer: correct,
    distractors: [d1, d2, d3],
    category: 'Grammar',
  })),
];

// ── Public API ──

export function generateArcadeChallenges(skill: ArcadeSkill, count: number, _examType?: ExamType): ArcadeChallenge[] {
  const generators = skill === 'math' ? mathChallenges
    : skill === 'english' ? englishChallenges
    : shuffle([...mathChallenges, ...englishChallenges]);

  const challenges: ArcadeChallenge[] = [];
  for (let i = 0; i < count; i++) {
    const gen = generators[i % generators.length];
    const c = gen();
    const allAnswers = shuffle([c.correctAnswer, ...c.distractors.slice(0, 3)]);
    challenges.push({ ...c, distractors: allAnswers.filter(a => a !== c.correctAnswer) });
  }
  return challenges;
}

export function generateHardChallenge(skill: ArcadeSkill): ArcadeChallenge {
  const generators = skill === 'math' ? mathChallenges : skill === 'english' ? englishChallenges : [...mathChallenges, ...englishChallenges];
  const gen = generators[Math.floor(Math.random() * generators.length)];
  return gen();
}
