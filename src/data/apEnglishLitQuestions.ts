import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APLitUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_LIT_UNITS: APLitUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Poetry: Reading for Meaning and Theme', description: 'Imagery, tone, speaker, symbolism, theme in poetry', icon: '📜' },
  { id: 'unit-2', unitNumber: 2, name: 'Poetry: Structure and Technique', description: 'Form, meter, rhyme, enjambment, literary devices', icon: '🎭' },
  { id: 'unit-3', unitNumber: 3, name: 'Prose Fiction: Reading for Meaning', description: 'Characterization, setting, narrative perspective, theme', icon: '📖' },
  { id: 'unit-4', unitNumber: 4, name: 'Prose Fiction: Structure and Technique', description: 'Point of view, pacing, juxtaposition, irony', icon: '🔍' },
  { id: 'unit-5', unitNumber: 5, name: 'Longer Fiction and Drama: Complexity', description: 'Novel and play analysis, complex characters, subplots', icon: '🎪' },
  { id: 'unit-6', unitNumber: 6, name: 'Longer Fiction and Drama: Interpretation', description: 'Thematic synthesis, cultural context, multiple interpretations', icon: '🎬' },
  { id: 'unit-7', unitNumber: 7, name: 'Comparison and Intertextuality', description: 'Comparing texts, allusion, literary conversation', icon: '🔀' },
  { id: 'unit-8', unitNumber: 8, name: 'Writing & Argument About Literature', description: 'Thesis, evidence, commentary, literary argumentation', icon: '✍️' },
];

// ─── Convert imported JSON bank into Question format ───
interface RawQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  skills_tested: string[];
  topic: string;
  stimulus_type?: string;
  stimulus?: string | { title: string; description?: string } | null;
}

function convertQuestion(raw: RawQuestion): Question {
  const letters = ['A', 'B', 'C', 'D'];
  let questionText = raw.question;
  if (raw.stimulus_type === 'text' && typeof raw.stimulus === 'string') {
    questionText = `"${raw.stimulus}"\n\n${raw.question}`;
  } else if (raw.stimulus_type === 'diagram' && raw.stimulus && typeof raw.stimulus === 'object') {
    const diagram = raw.stimulus as { title: string; description?: string };
    questionText = `[${diagram.title}${diagram.description ? ': ' + diagram.description : ''}]\n\n${raw.question}`;
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
    skill: raw.skills_tested?.[0] || 'Interpretation',
  };
}

// ─── Lazy-loaded bank ───
let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;

  _bankPromise = Promise.all([
    import('./aplit_full_question_bank.json'),
    import('./aplit_full_question_bank_v2.json'),
  ]).then(([mod1, mod2]) => {
    const result: Record<string, Question[]> = {};
    for (const unit of (mod1.default as any).units) {
      const key = `unit-${unit.unit_id}`;
      result[key] = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q));
    }
    for (const unit of (mod2.default as any).units) {
      const key = `unit-${unit.unit_id}`;
      const v2Qs = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q));
      const existing = result[key] || [];
      const existingIds = new Set(existing.map(q => q.id.toLowerCase()));
      result[key] = [...existing, ...v2Qs.filter(q => !existingIds.has(q.id.toLowerCase()))];
    }
    _bankCache = deduplicateBank(result);
    return _bankCache;
  });

  return _bankPromise;
}

// ─── Async loader for use in components ───
export async function loadAPLitQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 8; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

// ─── Synchronous fallback (empty, before bank loads) ───
export const apLitQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [],
  'unit-2': [],
  'unit-3': [],
  'unit-4': [],
  'unit-5': [],
  'unit-6': [],
  'unit-7': [],
  'unit-8': [],
};
