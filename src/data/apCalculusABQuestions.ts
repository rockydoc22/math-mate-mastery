import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APCalcABUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_CALC_AB_UNITS: APCalcABUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Limits and Continuity', description: 'Limits, squeeze theorem, continuity, IVT, asymptotes', icon: '📏' },
  { id: 'unit-2', unitNumber: 2, name: 'Differentiation', description: 'Derivative rules, tangent lines, chain rule, implicit differentiation', icon: '📐' },
  { id: 'unit-3', unitNumber: 3, name: 'Applications of Differentiation', description: 'Related rates, extrema, concavity, optimization, MVT', icon: '📊' },
  { id: 'unit-4', unitNumber: 4, name: 'Integration', description: 'Riemann sums, FTC, u-substitution, definite integrals', icon: '∫' },
  { id: 'unit-5', unitNumber: 5, name: 'Differential Equations', description: 'Slope fields, separation of variables, exponential models', icon: '🌀' },
  { id: 'unit-6', unitNumber: 6, name: 'Applications of Integration', description: 'Area between curves, volume of solids, accumulation functions', icon: '🎯' },
];

interface RawQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  topic: string;
  stimulus_type?: string;
  stimulus?: any;
}

function convertQuestion(raw: RawQuestion): Question {
  const letters = ['A', 'B', 'C', 'D'];
  let questionText = raw.question;

  if (raw.stimulus_type === 'table' && raw.stimulus) {
    const table = raw.stimulus;
    const header = (table.columns || []).join(' | ');
    const rows = (table.rows || []).map((r: any[]) => r.join(' | ')).join('\n');
    questionText = `[${table.title || 'Table'}]\n${header}\n${rows}\n\n${raw.question}`;
  } else if (raw.stimulus_type === 'graph' && raw.stimulus) {
    const graph = raw.stimulus;
    const pts = (graph.points || []).map((p: number[]) => `(${p[0]}, ${p[1]})`).join(', ');
    questionText = `[Graph: ${graph.title || 'function graph'} — points: ${pts}]\n\n${raw.question}`;
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
    skill: raw.topic,
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
      const course = raw.courses?.find((c: any) => c.course === 'AP Calculus AB');
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

export async function loadAPCalcABQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 6; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apCalcABQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [],
};
