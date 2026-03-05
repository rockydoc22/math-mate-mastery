import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APPhysics2Unit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_PHYS2_UNITS: APPhysics2Unit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Fluids', description: 'Pressure, buoyancy, continuity, Bernoulli', icon: '💧' },
  { id: 'unit-2', unitNumber: 2, name: 'Thermodynamics', description: 'Heat, temperature, ideal gas law, entropy', icon: '🌡️' },
  { id: 'unit-3', unitNumber: 3, name: 'Electric Force, Field, and Potential', description: 'Coulomb\'s law, electric fields, potential', icon: '⚡' },
  { id: 'unit-4', unitNumber: 4, name: 'Electric Circuits', description: 'Current, resistance, Kirchhoff\'s rules, RC circuits', icon: '🔌' },
  { id: 'unit-5', unitNumber: 5, name: 'Magnetism and Electromagnetic Induction', description: 'Magnetic fields, forces, Faraday\'s law', icon: '🧲' },
  { id: 'unit-6', unitNumber: 6, name: 'Geometric and Physical Optics', description: 'Reflection, refraction, lenses, diffraction', icon: '🔭' },
  { id: 'unit-7', unitNumber: 7, name: 'Quantum, Atomic, and Nuclear Physics', description: 'Photons, atomic models, nuclear reactions', icon: '⚛️' },
];

interface RawQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  topic: string;
  difficulty_bucket?: string;
  difficulty_level?: number;
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
  } else if (raw.stimulus_type === 'chart' && raw.stimulus && typeof raw.stimulus === 'object') {
    const chart = raw.stimulus;
    const pts = (chart.points || []).map((p: number[]) => `(${p[0]}, ${p[1]})`).join(', ');
    questionText = `[${chart.title || 'Graph'}: ${chart.x_label || 'x'} vs ${chart.y_label || 'y'}]\nData: ${pts}\n\n${raw.question}`;
  } else if (raw.stimulus_type === 'diagram' && raw.stimulus && typeof raw.stimulus === 'object') {
    const diagram = raw.stimulus as { title: string; description?: string };
    questionText = `[${diagram.title}${diagram.description ? ': ' + diagram.description : ''}]\n\n${raw.question}`;
  }

  const diffLevel = raw.difficulty_level || 5;
  const difficulty = diffLevel <= 4 ? 'Easy' : diffLevel <= 7 ? 'Medium' : 'Hard';

  return {
    id: raw.id.toLowerCase(),
    question: questionText,
    options: letters
      .filter(l => raw.choices[l] !== undefined)
      .map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer,
    explanation: raw.explanation,
    difficulty,
    domain: raw.topic,
    skill: raw.topic,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;

  _bankPromise = import('./ap_physics_2_question_bank_lovable.json').then((mod) => {
    const raw = mod.default as any;
    const result: Record<string, Question[]> = {};
    for (const unit of (raw.units || [])) {
      const key = `unit-${unit.unit_id}`;
      result[key] = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q));
    }
    _bankCache = deduplicateBank(result);
    return _bankCache;
  });

  return _bankPromise;
}

export async function loadAPPhys2Questions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 7; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apPhys2QuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [], 'unit-7': [],
};
