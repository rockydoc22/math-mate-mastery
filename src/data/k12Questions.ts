import { Question } from './questions';
import { fetchProtectedJson } from '@/lib/protectedAsset';

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

/**
 * Normalize subject/section labels so near-duplicates collapse into a single
 * bucket in the picker. Examples:
 *   - "math" / "Mathematics" → "Math"
 *   - "Writing and Language" / "Language Arts" → "Language Usage"
 *   - "History" → "Social Studies"
 * Unknown labels pass through unchanged.
 */
function normalizeSubject(raw: string | undefined | null): string {
  if (!raw) return 'General';
  const s = raw.trim();
  const k = s.toLowerCase();
  if (k === 'math' || k === 'mathematics' || k === 'maths') return 'Math';
  if (
    k === 'writing and language' ||
    k === 'writing & language' ||
    k === 'writing' ||
    k === 'grammar' ||
    k === 'language arts' ||
    k === 'english language arts' ||
    k === 'ela'
  ) return 'Language Usage';
  if (k === 'reading comprehension' || k === 'reading & vocabulary') return 'Reading';
  if (k === 'history' || k === 'us history' || k === 'world history') return 'Social Studies';
  if (k === 'sciences' || k === 'general science') return 'Science';
  return s;
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
    domain: normalizeSubject(raw.subject),
    skill: raw.skill || raw.skill_tag || raw.subject,
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
    domain: normalizeSubject(raw.section),
    skill: raw.skill || raw.section,
  };
}

// Pack files live in the private `protected-content` storage bucket and are
// fetched through the `protected-asset` edge function (auth required).
const PACK_PATHS = Array.from({ length: 18 }, (_, i) =>
  `k12/k12_pack_${String(i + 1).padStart(2, '0')}.json`
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
      PACK_PATHS.map(path => fetchProtectedJson<any>(path))
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
  // Also dedupe by normalized question text — legacy + pack sources
  // sometimes carry the same prompt under different IDs (e.g. the DNA
  // question surfacing twice in a MAP session).
  const seenText = new Set<string>();
  const textKey = (q: Question) => q.question.trim().toLowerCase().replace(/\s+/g, ' ');

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
        const tk = textKey(q);
        if (!seenIds.has(q.id) && !seenText.has(tk)) {
          seenIds.add(q.id);
          seenText.add(tk);
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
      const tk = textKey(q);
      if (!seenIds.has(q.id) && !seenText.has(tk)) {
        seenIds.add(q.id);
        seenText.add(tk);
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
