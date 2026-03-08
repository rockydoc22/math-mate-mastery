import { Question } from './questions';

export interface APGermanUnit { id: string; unitNumber: number; name: string; description: string; icon: string; }

export const AP_GERMAN_UNITS: APGermanUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Families in Different Societies', description: 'Family structures, roles, traditions', icon: '👨‍👩‍👧' },
  { id: 'unit-2', unitNumber: 2, name: 'The Influence of Language and Culture', description: 'Identity, multilingualism, cultural products', icon: '🗣️' },
  { id: 'unit-3', unitNumber: 3, name: 'Factors That Impact Quality of Life', description: 'Education, healthcare, leisure, housing', icon: '🏥' },
  { id: 'unit-4', unitNumber: 4, name: 'Environmental, Political, and Societal Challenges', description: 'Environment, politics, immigration, social issues', icon: '🌍' },
  { id: 'unit-5', unitNumber: 5, name: 'Science and Technology', description: 'Innovation, ethics, digital life, future tech', icon: '🔬' },
  { id: 'unit-6', unitNumber: 6, name: 'Contemporary Life', description: 'Travel, food, arts, daily life, celebrations', icon: '🎭' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(), question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer, explanation: raw.explanation, difficulty: 'Medium', domain: 'German', skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_German_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_GERMAN_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_GERMAN_UNITS[i % AP_GERMAN_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPGermanQuestions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apGermanQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_GERMAN_UNITS.map(u => [u.id, []]));
