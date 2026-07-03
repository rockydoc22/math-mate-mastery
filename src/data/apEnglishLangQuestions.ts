import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APLangUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_LANG_UNITS: APLangUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Rhetorical Situation', description: 'Purpose, audience, context, exigence, speaker', icon: '🎯' },
  { id: 'unit-2', unitNumber: 2, name: 'Claims and Evidence', description: 'Thesis, types of evidence, reasoning, counterargument', icon: '📋' },
  { id: 'unit-3', unitNumber: 3, name: 'Reasoning and Organization', description: 'Line of reasoning, transitions, structure', icon: '🏗️' },
  { id: 'unit-4', unitNumber: 4, name: 'Style and Tone', description: 'Diction, syntax, tone, rhetorical choices', icon: '🎨' },
  { id: 'unit-5', unitNumber: 5, name: 'Rhetorical Strategies', description: 'Ethos, logos, pathos, rhetorical devices', icon: '💡' },
  { id: 'unit-6', unitNumber: 6, name: 'Synthesis and Argumentation', description: 'Synthesizing sources, building arguments', icon: '🔗' },
  { id: 'unit-7', unitNumber: 7, name: 'Contrast and Comparison', description: 'Comparing rhetorical approaches across texts', icon: '⚖️' },
  { id: 'unit-8', unitNumber: 8, name: 'Revision & Editing', description: 'Clarity, coherence, sentence structure, concision', icon: '✍️' },
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

  _bankPromise = Promise.resolve({ default: { courses: [] } }).then((mod) => {
    const raw = mod.default as any;
    const course = raw.courses?.find((c: any) => c.course === 'AP English Language and Composition');
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

export async function loadAPLangQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 8; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apLangQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [], 'unit-7': [], 'unit-8': [],
};
