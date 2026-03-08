import { Question } from './questions';

export interface APMacroUnit { id: string; unitNumber: number; name: string; description: string; icon: string; }

export const AP_MACRO_UNITS: APMacroUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Basic Economic Concepts', description: 'Scarcity, opportunity cost, PPC, comparative advantage', icon: '📊' },
  { id: 'unit-2', unitNumber: 2, name: 'Economic Indicators and the Business Cycle', description: 'GDP, unemployment, inflation, business cycle', icon: '📈' },
  { id: 'unit-3', unitNumber: 3, name: 'National Income and Price Determination', description: 'AD/AS model, multiplier, fiscal policy', icon: '💵' },
  { id: 'unit-4', unitNumber: 4, name: 'Financial Sector', description: 'Money, banking, Federal Reserve, monetary policy', icon: '🏦' },
  { id: 'unit-5', unitNumber: 5, name: 'Long-Run Consequences of Stabilization Policies', description: 'Phillips curve, economic growth, deficits', icon: '📉' },
  { id: 'unit-6', unitNumber: 6, name: 'Open Economy — International Trade and Finance', description: 'Balance of payments, exchange rates, trade', icon: '🌐' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(), question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer, explanation: raw.explanation, difficulty: 'Medium', domain: 'Macroeconomics', skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_Macroeconomics_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_MACRO_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_MACRO_UNITS[i % AP_MACRO_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPMacroQuestions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apMacroQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_MACRO_UNITS.map(u => [u.id, []]));
