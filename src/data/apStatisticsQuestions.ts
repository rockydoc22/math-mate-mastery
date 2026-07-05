import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APStatsUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_STATS_UNITS: APStatsUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Exploring One-Variable Data', description: 'Histograms, boxplots, center, spread, shape, outliers', icon: '📊' },
  { id: 'unit-2', unitNumber: 2, name: 'Exploring Two-Variable Data', description: 'Scatterplots, correlation, regression, residuals', icon: '📈' },
  { id: 'unit-3', unitNumber: 3, name: 'Collecting Data', description: 'Sampling methods, experiments, observational studies, bias', icon: '📋' },
  { id: 'unit-4', unitNumber: 4, name: 'Probability', description: 'Rules of probability, conditional probability, independence', icon: '🎲' },
  { id: 'unit-5', unitNumber: 5, name: 'Sampling Distributions', description: 'CLT, sampling distributions of means and proportions', icon: '🔔' },
  { id: 'unit-6', unitNumber: 6, name: 'Inference for Proportions', description: 'Confidence intervals, hypothesis tests for proportions', icon: '🎯' },
  { id: 'unit-7', unitNumber: 7, name: 'Inference for Means', description: 'T-procedures, paired t-tests, two-sample t-tests', icon: '📏' },
  { id: 'unit-8', unitNumber: 8, name: 'Chi-Square and Slope Inference', description: 'Chi-square tests, inference for regression slope', icon: '🔢' },
  { id: 'unit-9', unitNumber: 9, name: 'AP Exam Skills & Communication', description: 'FRQ strategies, statistical communication, error types', icon: '✍️' },
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
  } else if ((raw.stimulus_type === 'chart' || raw.stimulus_type === 'graph') && raw.stimulus) {
    const chart = raw.stimulus;
    if (chart.bins) {
      const binStr = chart.bins.map((b: any) => `${b.bin}: ${b.count}`).join(', ');
      questionText = `[Chart: ${chart.title || 'histogram'} — ${binStr}]\n\n${raw.question}`;
    } else if (chart.min !== undefined && chart.median !== undefined) {
      questionText = `[Boxplot: ${chart.title || 'boxplot'} — min=${chart.min}, Q1=${chart.q1}, median=${chart.median}, Q3=${chart.q3}, max=${chart.max}]\n\n${raw.question}`;
    } else if (chart.points) {
      const pts = chart.points.map((p: number[]) => `(${p[0]}, ${p[1]})`).join(', ');
      questionText = `[Graph: ${chart.title || 'scatter'} — points: ${pts}]\n\n${raw.question}`;
    }
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
      const course = raw.courses?.find((c: any) => c.course === 'AP Statistics');
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

export async function loadAPStatsQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 9; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apStatsQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [], 'unit-7': [], 'unit-8': [], 'unit-9': [],
};
