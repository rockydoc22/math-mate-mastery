import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APCSPUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_CSP_UNITS: APCSPUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Creative Development', description: 'Collaboration, program design, iteration', icon: '💡' },
  { id: 'unit-2', unitNumber: 2, name: 'Data', description: 'Binary, data compression, metadata, visualization', icon: '📊' },
  { id: 'unit-3', unitNumber: 3, name: 'Algorithms and Programming', description: 'Variables, conditionals, loops, procedures', icon: '⚙️' },
  { id: 'unit-4', unitNumber: 4, name: 'Computer Systems and Networks', description: 'Internet, protocols, cybersecurity', icon: '🌐' },
  { id: 'unit-5', unitNumber: 5, name: 'Impact of Computing', description: 'Digital divide, bias, privacy, crowdsourcing', icon: '🤖' },
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
  } else if (raw.stimulus_type === 'code' && raw.stimulus && typeof raw.stimulus === 'object') {
    questionText = `[Code: ${raw.stimulus.title || 'Code Snippet'}]\n${raw.stimulus.code || ''}\n\n${raw.question}`;
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

  _bankPromise = Promise.resolve({ default: { courses: [] } }).then((mod) => {
    const raw = mod.default as any;
    const course = raw.courses?.find((c: any) => c.course === 'AP Computer Science Principles');
    const result: Record<string, Question[]> = {};
    if (course) {
      for (const unit of course.units) {
        const key = `unit-${unit.unit_id}`;
        result[key] = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q));
      }
    }
    _bankCache = deduplicateBank(result);
    return _bankCache;
  });

  return _bankPromise;
}

export async function loadAPCSPQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 5; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apCSPQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [], 'unit-5': [],
};
