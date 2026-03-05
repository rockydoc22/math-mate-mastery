import { Question } from './questions';

export interface APESUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_ES_UNITS: APESUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'The Living World: Ecosystems', description: 'Energy flow, nutrient cycling, biodiversity', icon: '🌿' },
  { id: 'unit-2', unitNumber: 2, name: 'Population', description: 'Population ecology, human population growth', icon: '👥' },
  { id: 'unit-3', unitNumber: 3, name: 'The Living World: Biodiversity', description: 'Species diversity, ecosystem services, threats', icon: '🦎' },
  { id: 'unit-4', unitNumber: 4, name: 'Earth Systems & Resources', description: 'Plate tectonics, soils, atmosphere, water', icon: '🌍' },
  { id: 'unit-5', unitNumber: 5, name: 'Land & Water Use', description: 'Agriculture, forestry, mining, fishing, urbanization', icon: '🏗️' },
  { id: 'unit-6', unitNumber: 6, name: 'Energy Resources & Consumption', description: 'Fossil fuels, nuclear, renewables, conservation', icon: '⚡' },
  { id: 'unit-7', unitNumber: 7, name: 'Aquatic and Terrestrial Pollution', description: 'Air, water, soil pollution, toxicology', icon: '🏭' },
  { id: 'unit-8', unitNumber: 8, name: 'Global Change', description: 'Climate change, ozone depletion, sustainability', icon: '🌡️' },
  { id: 'unit-9', unitNumber: 9, name: 'Science Practices & Experimental Design', description: 'Data analysis, experimental design, graph interpretation', icon: '🔬' },
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
  } else if (raw.stimulus_type === 'diagram' && raw.stimulus && typeof raw.stimulus === 'object') {
    questionText = `[Diagram: ${raw.stimulus.title || 'Diagram'}]\n${raw.stimulus.description || ''}\n\n${raw.question}`;
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

  _bankPromise = import('./ap_mega_bank_v2.json').then((mod) => {
    const raw = mod.default as any;
    const course = raw.courses?.find((c: any) => c.course === 'AP Environmental Science');
    const result: Record<string, Question[]> = {};
    if (course) {
      for (const unit of course.units) {
        const key = `unit-${unit.unit_id}`;
        result[key] = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q));
      }
    }
    _bankCache = result;
    return result;
  });

  return _bankPromise;
}

export async function loadAPESQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 9; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apESQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [], 'unit-7': [], 'unit-8': [], 'unit-9': [],
};
