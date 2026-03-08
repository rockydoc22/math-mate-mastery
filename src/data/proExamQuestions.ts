import { Question } from './questions';

interface RawProQuestion {
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

function convertQuestion(raw: RawProQuestion): Question {
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

// Cache per exam id
const _cache: Record<string, Question[]> = {};
const _promises: Record<string, Promise<Question[]>> = {};

const FILE_IMPORTERS: Record<string, () => Promise<any>> = {
  'gre_question_bank_200_original.json': () => import('./gre_question_bank_200_original.json'),
  'gre_question_bank_expansion_300.json': () => import('./gre_question_bank_expansion_300.json'),
  'gre_question_bank_expansion_300_b2.json': () => import('./gre_question_bank_expansion_300_b2.json'),
  'gre_question_bank_expansion_300_b3.json': () => import('./gre_question_bank_expansion_300_b3.json'),
  'gmat_question_bank_200_original.json': () => import('./gmat_question_bank_200_original.json'),
  'gmat_question_bank_expansion_300.json': () => import('./gmat_question_bank_expansion_300.json'),
  'gmat_question_bank_expansion_300_b2.json': () => import('./gmat_question_bank_expansion_300_b2.json'),
  'gmat_question_bank_expansion_300_b3.json': () => import('./gmat_question_bank_expansion_300_b3.json'),
  'lsat_question_bank_250_original.json': () => import('./lsat_question_bank_250_original.json'),
  'lsat_question_bank_expansion_300.json': () => import('./lsat_question_bank_expansion_300.json'),
  'lsat_question_bank_expansion_300_b2.json': () => import('./lsat_question_bank_expansion_300_b2.json'),
  'lsat_question_bank_expansion_300_b3.json': () => import('./lsat_question_bank_expansion_300_b3.json'),
  'mcat_question_bank_300_original.json': () => import('./mcat_question_bank_300_original.json'),
  'mcat_question_bank_expansion_300.json': () => import('./mcat_question_bank_expansion_300.json'),
  'mcat_question_bank_expansion_300_b2.json': () => import('./mcat_question_bank_expansion_300_b2.json'),
  'mcat_question_bank_expansion_300_b3.json': () => import('./mcat_question_bank_expansion_300_b3.json'),
  'mcat_question_bank_expansion_300_b4.json': () => import('./mcat_question_bank_expansion_300_b4.json'),
  'asvab_question_bank_300_original.json': () => import('./asvab_question_bank_300_original.json'),
  'asvab_question_bank_expansion_300.json': () => import('./asvab_question_bank_expansion_300.json'),
  'asvab_question_bank_expansion_300_b2.json': () => import('./asvab_question_bank_expansion_300_b2.json'),
  'asvab_question_bank_expansion_300_b3.json': () => import('./asvab_question_bank_expansion_300_b3.json'),
  'asvab_question_bank_expansion_300_b4.json': () => import('./asvab_question_bank_expansion_300_b4.json'),
  'dat_question_bank_240_original.json': () => import('./dat_question_bank_240_original.json'),
  'oat_question_bank_240_original.json': () => import('./oat_question_bank_240_original.json'),
  'clt_question_bank_180_original.json': () => import('./clt_question_bank_180_original.json'),
  'homeschool_iowa_stanford10_question_bank_220_original.json': () => import('./homeschool_iowa_stanford10_question_bank_220_original.json'),
  'terranova_question_bank_200_original.json': () => import('./terranova_question_bank_200_original.json'),
  'map_growth_question_bank_200_original.json': () => import('./map_growth_question_bank_200_original.json'),
};

export async function loadProExamQuestions(jsonFiles: string[]): Promise<Question[]> {
  const cacheKey = jsonFiles.join('|');
  if (_cache[cacheKey]) return _cache[cacheKey];
  if (_promises[cacheKey]) return _promises[cacheKey];

  _promises[cacheKey] = (async () => {
    const allQuestions: Question[] = [];
    const seenIds = new Set<string>();

    for (const file of jsonFiles) {
      const importer = FILE_IMPORTERS[file];
      if (!importer) continue;
      try {
        const mod = await importer();
        const data = mod.default || mod;
        const arr = Array.isArray(data) ? data : [];
        for (const raw of arr) {
          const q = convertQuestion(raw as RawProQuestion);
          if (!seenIds.has(q.id)) {
            seenIds.add(q.id);
            allQuestions.push(q);
          }
        }
      } catch (e) {
        console.warn(`Failed to load ${file}:`, e);
      }
    }

    _cache[cacheKey] = allQuestions;
    return allQuestions;
  })();

  return _promises[cacheKey];
}

export function getQuestionsBySection(questions: Question[], section: string): Question[] {
  return questions.filter(q => q.domain === section);
}
