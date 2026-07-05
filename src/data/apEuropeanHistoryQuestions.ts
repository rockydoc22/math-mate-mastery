import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APEuroUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_EURO_UNITS: APEuroUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Renaissance & Reformation', description: '1450–1648: Humanism, Protestant Reformation, religious wars', icon: '🎨' },
  { id: 'unit-2', unitNumber: 2, name: 'Absolutism & Constitutionalism', description: '1648–1815: Monarchies, Enlightenment, revolutions', icon: '👑' },
  { id: 'unit-3', unitNumber: 3, name: 'Industrialization & Reform', description: '1815–1914: Industrial Revolution, nationalism, imperialism', icon: '🏭' },
  { id: 'unit-4', unitNumber: 4, name: 'Global Wars & Recovery', description: '1914–1945: World Wars, totalitarianism, Holocaust', icon: '⚔️' },
  { id: 'unit-5', unitNumber: 5, name: 'Cold War & Contemporary Europe', description: '1945–Present: Cold War, EU, decolonization', icon: '🌍' },
];

interface RawQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  topic: string;
  skills_tested?: string[];
  stimulus_type?: string;
  stimulus?: any;
}

function convertQuestion(raw: RawQuestion): Question {
  const letters = ['A', 'B', 'C', 'D'];
  let questionText = raw.question;

  if (raw.stimulus_type === 'text' && typeof raw.stimulus === 'string') {
    questionText = `"${raw.stimulus}"\n\n${raw.question}`;
  } else if (raw.stimulus_type === 'table' && raw.stimulus && typeof raw.stimulus === 'object') {
    const table = raw.stimulus;
    const header = (table.columns || []).join(' | ');
    const rows = (table.rows || []).map((r: any[]) => r.join(' | ')).join('\n');
    questionText = `[${table.title || 'Table'}]\n${header}\n${rows}\n\n${raw.question}`;
  }

  return {
    id: raw.id.toLowerCase(),
    question: questionText,
    options: letters
      .filter(l => raw.choices[l] !== undefined)
      .map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer,
    explanation: raw.explanation,
    difficulty: 'Medium',
    domain: raw.topic,
    skill: raw.skills_tested?.[0] || raw.topic,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;

  _bankPromise = Promise.all([
    import('./ap_mega_bank_v2.json'),
    import('./ap_mega_bank_lovable.json'),
  ]).then((mods) => {
    const result: Record<string, Question[]> = {};
    for (const mod of mods) {
      const raw = mod.default as any;
      const course = raw.courses?.find((c: any) => c.course === 'AP European History');
      if (!course) continue;
      for (const unit of course.units) {
        const key = `unit-${unit.unit_id}`;
        result[key] = [...(result[key] || []), ...(unit.questions || []).map((q: RawQuestion) => convertQuestion(q))];
      }
    }
    _bankCache = deduplicateBank(result);
    return _bankCache;
  });

  return _bankPromise;
}

export async function loadAPEuroQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 5; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apEuroQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [], 'unit-5': [],
};
