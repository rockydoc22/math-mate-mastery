import { Question } from './questions';

export interface APCalcBCUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_CALC_BC_UNITS: APCalcBCUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Limits and Continuity', description: 'One-sided limits, continuity, squeeze theorem, IVT', icon: '📏' },
  { id: 'unit-2', unitNumber: 2, name: 'Differentiation: Definition and Fundamental Properties', description: 'Derivative rules, tangent lines, differentiability', icon: '📐' },
  { id: 'unit-3', unitNumber: 3, name: 'Differentiation: Composite, Implicit, and Inverse Functions', description: 'Chain rule, implicit differentiation, inverse trig', icon: '🔗' },
  { id: 'unit-4', unitNumber: 4, name: 'Contextual Applications of Differentiation', description: 'Related rates, linearization, L\'Hôpital\'s rule, motion', icon: '🚀' },
  { id: 'unit-5', unitNumber: 5, name: 'Analytical Applications of Differentiation', description: 'Mean Value Theorem, extrema, concavity, optimization', icon: '📊' },
  { id: 'unit-6', unitNumber: 6, name: 'Integration and Accumulation of Change', description: 'Riemann sums, FTC, u-substitution, integration techniques', icon: '∫' },
  { id: 'unit-7', unitNumber: 7, name: 'Differential Equations', description: 'Slope fields, separation of variables, Euler\'s method, logistic growth', icon: '🌀' },
  { id: 'unit-8', unitNumber: 8, name: 'Parametric, Polar, and Vector Functions', description: 'Parametric derivatives, polar area, vector-valued functions', icon: '🎯' },
];

// ─── Convert imported JSON bank into Question format ───
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

// ─── Lazy-loaded bank ───
let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;

  _bankPromise = Promise.all([
    import('./apcalcbc_full_question_bank.json'),
    import('./apcalcbc_full_question_bank_v2.json'),
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
      const existingIds = new Set(existing.map(q => q.id));
      result[key] = [...existing, ...v2Qs.filter(q => !existingIds.has(q.id))];
    }
    _bankCache = result;
    return result;
  });

  return _bankPromise;
}

export async function loadAPCalcBCQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 8; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apCalcBCQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [],
  'unit-2': [],
  'unit-3': [],
  'unit-4': [],
  'unit-5': [],
  'unit-6': [],
  'unit-7': [],
  'unit-8': [],
};
