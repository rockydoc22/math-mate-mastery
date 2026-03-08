import { Question } from './questions';

export interface APMicroUnit { id: string; unitNumber: number; name: string; description: string; icon: string; }

export const AP_MICRO_UNITS: APMicroUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Basic Economic Concepts', description: 'Scarcity, trade-offs, marginal analysis', icon: '📊' },
  { id: 'unit-2', unitNumber: 2, name: 'Supply and Demand', description: 'Market equilibrium, elasticity, price controls', icon: '⚖️' },
  { id: 'unit-3', unitNumber: 3, name: 'Production, Cost, and the Perfect Competition Model', description: 'Cost curves, profit maximization, efficiency', icon: '🏭' },
  { id: 'unit-4', unitNumber: 4, name: 'Imperfect Competition', description: 'Monopoly, oligopoly, monopolistic competition, game theory', icon: '🎯' },
  { id: 'unit-5', unitNumber: 5, name: 'Factor Markets', description: 'Labor markets, wages, MRP, monopsony', icon: '👷' },
  { id: 'unit-6', unitNumber: 6, name: 'Market Failure and the Role of Government', description: 'Externalities, public goods, income inequality', icon: '🏛️' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(), question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer, explanation: raw.explanation, difficulty: 'Medium', domain: 'Microeconomics', skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_Microeconomics_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_MICRO_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_MICRO_UNITS[i % AP_MICRO_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPMicroQuestions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apMicroQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_MICRO_UNITS.map(u => [u.id, []]));
