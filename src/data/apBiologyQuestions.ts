import { Question } from './questions';

export interface APBioUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_BIO_UNITS: APBioUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Chemistry of Life', description: 'Water, macromolecules, enzymes', icon: '💧' },
  { id: 'unit-2', unitNumber: 2, name: 'Cell Structure and Function', description: 'Organelles, membranes, transport', icon: '🔬' },
  { id: 'unit-3', unitNumber: 3, name: 'Cellular Energetics', description: 'Photosynthesis, cellular respiration', icon: '⚡' },
  { id: 'unit-4', unitNumber: 4, name: 'Cell Communication and Cell Cycle', description: 'Signal transduction, mitosis, meiosis', icon: '📡' },
  { id: 'unit-5', unitNumber: 5, name: 'Heredity', description: 'Mendelian genetics, gene expression', icon: '🧬' },
  { id: 'unit-6', unitNumber: 6, name: 'Gene Expression and Regulation', description: 'DNA replication, transcription, translation, mutations', icon: '🔗' },
  { id: 'unit-7', unitNumber: 7, name: 'Natural Selection', description: 'Evolution, Hardy-Weinberg, speciation', icon: '🦎' },
  { id: 'unit-8', unitNumber: 8, name: 'Ecology', description: 'Populations, communities, ecosystems, biodiversity', icon: '🌿' },
];

interface RawQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  difficulty?: number;
}

function convertQuestion(raw: RawQuestion, unitId: string): Question {
  const letters = ['A', 'B', 'C', 'D'];
  return {
    id: raw.id.toLowerCase(),
    question: raw.question,
    options: letters.filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer,
    explanation: raw.explanation,
    difficulty: 'Medium',
    domain: 'Biology',
    skill: unitId,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_Biology_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    const unitCount = AP_BIO_UNITS.length;
    raw.forEach((q, i) => {
      const unitIndex = i % unitCount;
      const key = `unit-${unitIndex + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_BIO_UNITS[unitIndex].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPBioQuestions(): Promise<Record<string, Question[]>> {
  return loadBank();
}

export const apBioQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(
  AP_BIO_UNITS.map(u => [u.id, []])
);
