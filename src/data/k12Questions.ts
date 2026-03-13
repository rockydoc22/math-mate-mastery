import { Question } from './questions';

// Raw format from the 30k+ packs (choices as object)
interface RawK12PackQuestion {
  id: string;
  exam: string;
  subject: string;
  difficulty: string;
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  answer: string;
  explanation: string;
  skill?: string;
  skill_tag?: string;
  grade_band?: string;
  source_test_alignment?: string;
}

// Raw format from existing 200-question banks (options as array)
interface RawLegacyQuestion {
  id: string;
  exam: string;
  section: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  skill?: string;
  difficulty?: string;
}

function convertPackQuestion(raw: RawK12PackQuestion): Question {
  return {
    id: raw.id.toLowerCase(),
    question: raw.question,
    options: [
      { letter: 'A', text: raw.choices.A },
      { letter: 'B', text: raw.choices.B },
      { letter: 'C', text: raw.choices.C },
      { letter: 'D', text: raw.choices.D },
    ],
    correctAnswer: raw.answer,
    explanation: raw.explanation,
    difficulty: raw.difficulty === 'hard' ? 'Hard' : raw.difficulty === 'easy' ? 'Easy' : 'Medium',
    domain: raw.subject,
    skill: raw.skill || raw.subject,
  };
}

function convertLegacyQuestion(raw: RawLegacyQuestion): Question {
  return {
    id: raw.id.toLowerCase(),
    question: raw.question,
    options: raw.options.map(o => ({ letter: o.label, text: o.text })),
    correctAnswer: raw.correctAnswer,
    explanation: raw.explanation,
    difficulty: raw.difficulty === 'hard' ? 'Hard' : raw.difficulty === 'easy' ? 'Easy' : 'Medium',
    domain: raw.section,
    skill: raw.skill || raw.section,
  };
}

// Pack files served from public/ — fetched at runtime, not bundled
const PACK_FILES = Array.from({ length: 12 }, (_, i) =>
  `/data/k12_pack_${String(i + 1).padStart(2, '0')}.json`
);

// Legacy file importers (small files, safe to bundle)
const LEGACY_IMPORTERS: Record<string, () => Promise<any>> = {
  'ged_question_bank_200.json': () => import('./ged_question_bank_200.json'),
  'hiset_question_bank_200.json': () => import('./hiset_question_bank_200.json'),
  'homeschool_iowa_stanford10_question_bank_220_original.json': () => import('./homeschool_iowa_stanford10_question_bank_220_original.json'),
  'terranova_question_bank_200_original.json': () => import('./terranova_question_bank_200_original.json'),
  'map_growth_question_bank_200_original.json': () => import('./map_growth_question_bank_200_original.json'),
};

// Cache
const _cache: Record<string, Question[]> = {};
const _packLoaded: Record<string, Question[]> = {};
let _packPromise: Promise<void> | null = null;

async function loadAllPacks(): Promise<void> {
  if (Object.keys(_packLoaded).length > 0) return;
  if (_packPromise) return _packPromise;

  _packPromise = (async () => {
    // Load pack files in parallel via fetch (not bundled by Vite)
    const results = await Promise.allSettled(
      PACK_FILES.map(url => fetch(url).then(r => r.json()))
    );

    for (const result of results) {
      if (result.status !== 'fulfilled') continue;
      const data = result.value;
      const questions = data.questions || [];
      for (const raw of questions) {
        const examKey = raw.exam as string;
        if (!_packLoaded[examKey]) _packLoaded[examKey] = [];
        _packLoaded[examKey].push(convertPackQuestion(raw as RawK12PackQuestion));
      }
    }
  })();

  return _packPromise;
}

export async function loadK12ExamQuestions(
  examKeys: string[],
  legacyJsonFiles: string[]
): Promise<Question[]> {
  const cacheKey = examKeys.join('|');
  if (_cache[cacheKey]) return _cache[cacheKey];

  const allQuestions: Question[] = [];
  const seenIds = new Set<string>();

  // Load legacy 200-question banks first
  for (const file of legacyJsonFiles) {
    const importer = LEGACY_IMPORTERS[file];
    if (!importer) continue;
    try {
      const mod = await importer();
      const data = mod.default || mod;
      const arr = Array.isArray(data) ? data : [];
      for (const raw of arr) {
        const q = convertLegacyQuestion(raw as RawLegacyQuestion);
        if (!seenIds.has(q.id)) {
          seenIds.add(q.id);
          allQuestions.push(q);
        }
      }
    } catch (e) {
      console.warn(`Failed to load legacy ${file}:`, e);
    }
  }

  // Load from 30k+ packs (fetched at runtime)
  await loadAllPacks();
  for (const key of examKeys) {
    const packQs = _packLoaded[key] || [];
    for (const q of packQs) {
      if (!seenIds.has(q.id)) {
        seenIds.add(q.id);
        allQuestions.push(q);
      }
    }
  }

  _cache[cacheKey] = allQuestions;
  return allQuestions;
}

export function getK12QuestionsBySubject(questions: Question[], subject: string): Question[] {
  return questions.filter(q => q.domain === subject);
}
