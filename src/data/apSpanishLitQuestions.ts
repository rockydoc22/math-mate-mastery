import { Question } from './questions';

export interface APSpanishLitUnit { id: string; unitNumber: number; name: string; description: string; icon: string; }

export const AP_SPANISH_LIT_UNITS: APSpanishLitUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'La época medieval', description: 'Medieval Spanish literature, oral traditions', icon: '🏰' },
  { id: 'unit-2', unitNumber: 2, name: 'El Siglo de Oro', description: 'Golden Age: Cervantes, Lope de Vega, Calderón', icon: '👑' },
  { id: 'unit-3', unitNumber: 3, name: 'La literatura del siglo XIX', description: 'Romanticism, Realism, Naturalism', icon: '📖' },
  { id: 'unit-4', unitNumber: 4, name: 'La Generación del 98 y el Modernismo', description: 'Modernismo, Generation of 98, identity crisis', icon: '🖋️' },
  { id: 'unit-5', unitNumber: 5, name: 'Teatro y poesía del siglo XX', description: 'García Lorca, Neruda, Borges, Magical Realism', icon: '🎭' },
  { id: 'unit-6', unitNumber: 6, name: 'Boom latinoamericano y literatura contemporánea', description: 'Latin American Boom, contemporary voices', icon: '🌎' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(), question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer, explanation: raw.explanation, difficulty: 'Medium', domain: 'Spanish Literature', skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_Spanish_Literature_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_SPANISH_LIT_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_SPANISH_LIT_UNITS[i % AP_SPANISH_LIT_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPSpanishLitQuestions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apSpanishLitQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_SPANISH_LIT_UNITS.map(u => [u.id, []]));
