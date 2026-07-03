import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APHuGUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_HUG_UNITS: APHuGUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Thinking Geographically', description: 'Maps, spatial concepts, geographic data', icon: '🗺️' },
  { id: 'unit-2', unitNumber: 2, name: 'Population & Migration', description: 'Population patterns, migration push-pull factors', icon: '👥' },
  { id: 'unit-3', unitNumber: 3, name: 'Cultural Patterns & Processes', description: 'Language, religion, ethnicity, cultural landscapes', icon: '🏛️' },
  { id: 'unit-4', unitNumber: 4, name: 'Political Patterns and Processes', description: 'Political organization, boundaries, geopolitics', icon: '⚖️' },
  { id: 'unit-5', unitNumber: 5, name: 'Agriculture & Rural Land Use', description: 'Agricultural practices, food production, land use', icon: '🌾' },
  { id: 'unit-6', unitNumber: 6, name: 'Cities & Urban Land Use', description: 'Urbanization, city models, sustainability', icon: '🏙️' },
  { id: 'unit-7', unitNumber: 7, name: 'Industrial and Economic Development', description: 'Industrialization, development models, globalization', icon: '🏭' },
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
  } else if (raw.stimulus_type === 'map' && raw.stimulus && typeof raw.stimulus === 'object') {
    questionText = `[Map: ${raw.stimulus.title || 'Map'}]\n${raw.stimulus.description || ''}\n\n${raw.question}`;
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
    const course = raw.courses?.find((c: any) => c.course === 'AP Human Geography');
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

export async function loadAPHuGQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 7; i++) {
    const key = `unit-${i}`;
    result[key] = bank[key] || [];
  }
  return result;
}

export const apHuGQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': [], 'unit-2': [], 'unit-3': [], 'unit-4': [],
  'unit-5': [], 'unit-6': [], 'unit-7': [],
};
