import { Question } from './questions';

export interface APUSGovUnit { id: string; unitNumber: number; name: string; description: string; icon: string; }

export const AP_USGOV_UNITS: APUSGovUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Foundations of American Democracy', description: 'Constitutional principles, federalism', icon: '📜' },
  { id: 'unit-2', unitNumber: 2, name: 'Interactions Among Branches', description: 'Congress, presidency, judiciary, checks & balances', icon: '⚖️' },
  { id: 'unit-3', unitNumber: 3, name: 'Civil Liberties and Civil Rights', description: 'Bill of Rights, 14th Amendment, incorporation', icon: '🗽' },
  { id: 'unit-4', unitNumber: 4, name: 'American Political Ideologies and Beliefs', description: 'Political socialization, ideology, public opinion', icon: '🗳️' },
  { id: 'unit-5', unitNumber: 5, name: 'Political Participation', description: 'Voting, campaigns, interest groups, media', icon: '📢' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(), question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer, explanation: raw.explanation, difficulty: 'Medium', domain: 'US Government', skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_US_Government_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_USGOV_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_USGOV_UNITS[i % AP_USGOV_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPUSGovQuestions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apUSGovQuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_USGOV_UNITS.map(u => [u.id, []]));
