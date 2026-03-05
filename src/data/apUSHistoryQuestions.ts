import { Question } from './questions';
import { deduplicateBank } from '@/utils/questionDedup';

export interface APUSHUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_USH_UNITS: APUSHUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Period 1: 1491–1607', description: 'Native American societies, European exploration, Columbian Exchange, Encomienda', icon: '🌎' },
  { id: 'unit-2', unitNumber: 2, name: 'Period 2: 1607–1754', description: 'Colonial societies, slavery, Great Awakening, Salutary Neglect', icon: '⛵' },
  { id: 'unit-3', unitNumber: 3, name: 'Period 3: 1754–1800', description: 'Revolution, Constitution, Federalists vs Anti-Federalists', icon: '🔔' },
  { id: 'unit-4', unitNumber: 4, name: 'Period 4: 1800–1848', description: 'Jacksonian democracy, Market Revolution, reform movements, Manifest Destiny', icon: '🏭' },
  { id: 'unit-5', unitNumber: 5, name: 'Period 5: 1844–1877', description: 'Civil War, Reconstruction, 13th–15th Amendments', icon: '⚔️' },
  { id: 'unit-6', unitNumber: 6, name: 'Period 6: 1865–1898', description: 'Gilded Age, industrialization, immigration, Western expansion', icon: '🚂' },
  { id: 'unit-7', unitNumber: 7, name: 'Period 7: 1890–1945', description: 'Progressivism, WWI, Roaring 20s, Great Depression, WWII', icon: '🗽' },
  { id: 'unit-8', unitNumber: 8, name: 'Period 8: 1945–1980', description: 'Cold War, Civil Rights, Vietnam, counterculture, Watergate', icon: '✊' },
  { id: 'unit-9', unitNumber: 9, name: 'Period 9: 1980–Present', description: 'Conservatism, globalization, War on Terror, technology', icon: '💻' },
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
  stimulus?: string | { title: string; x_label: string; y_label: string; points: number[][] } | null;
}

function convertQuestion(raw: RawQuestion): Question {
  const letters = ['A', 'B', 'C', 'D'];
  let questionText = raw.question;
  if (raw.stimulus_type === 'text' && typeof raw.stimulus === 'string') {
    questionText = `"${raw.stimulus}"\n\n${raw.question}`;
  } else if (raw.stimulus_type === 'chart' && raw.stimulus && typeof raw.stimulus === 'object') {
    const chart = raw.stimulus as { title: string };
    questionText = `[Chart: ${chart.title}]\n\n${raw.question}`;
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
    skill: raw.skills_tested?.[0] || 'Contextualization',
  };
}

// ─── Hand-curated questions (kept as priority / high-quality originals) ───
const curatedQuestions: Record<string, Question[]> = {
  'unit-1': [
    {
      id: 'apush-1-001',
      question: 'Which of the following best describes the impact of the Encomienda system on Spanish colonial society?',
      options: [
        { letter: 'A', text: 'It created a system of mutual benefit between Spanish and Natives.' },
        { letter: 'B', text: 'It organized Native labor to support plantation agriculture and mining.' },
        { letter: 'C', text: 'It led to the immediate abolition of slavery in the Americas.' },
        { letter: 'D', text: 'It prevented Spanish settlers from intermarrying with Native populations.' },
      ],
      correctAnswer: 'B',
      explanation: 'The Encomienda system was a labor system established by the Spanish crown in the 1500s.',
      difficulty: 'Medium', domain: 'Contact & Exchange', skill: 'Contextualization',
    },
    {
      id: 'apush-1-002',
      question: 'The 1680 Pueblo Revolt (Popé\'s Rebellion) is historically significant because it:',
      options: [
        { letter: 'A', text: 'Ended Spanish presence in the American Southwest permanently.' },
        { letter: 'B', text: 'Led to the total assimilation of Pueblo people into Spanish culture.' },
        { letter: 'C', text: 'Forced the Spanish to accommodate some aspects of Native culture and religion.' },
        { letter: 'D', text: 'Resulted in the English taking control of the New Mexico territory.' },
      ],
      correctAnswer: 'C',
      explanation: 'After the revolt, the Spanish adopted a more conciliatory approach to colonial governance.',
      difficulty: 'Hard', domain: 'Contact & Exchange', skill: 'Causation',
    },
  ],
  'unit-3': [
    {
      id: 'apush-3-001',
      question: 'Which of the following most accurately describes the "Republican Motherhood" ideal that emerged after the American Revolution?',
      options: [
        { letter: 'A', text: 'Women should be granted the right to vote to ensure virtuous government.' },
        { letter: 'B', text: 'Women should be educated to raise sons as virtuous citizens of the republic.' },
        { letter: 'C', text: 'Women should take an active role in political office to balance federal power.' },
        { letter: 'D', text: 'Women\'s roles should be strictly confined to agricultural labor.' },
      ],
      correctAnswer: 'B',
      explanation: 'Republican Motherhood elevated women\'s domestic status by arguing they were essential for teaching republican values.',
      difficulty: 'Hard', domain: 'Revolution & Constitution', skill: 'Contextualization',
    },
    {
      id: 'apush-3-002',
      question: 'The Northwest Ordinance of 1787 was significant because it:',
      options: [
        { letter: 'A', text: 'Established a process for admitting new states and banned slavery in the territory.' },
        { letter: 'B', text: 'Ended the conflict between the Federalists and Anti-Federalists.' },
        { letter: 'C', text: 'Created a permanent alliance with Native American tribes in the Ohio Valley.' },
        { letter: 'D', text: 'Authorized the purchase of the Louisiana Territory from France.' },
      ],
      correctAnswer: 'A',
      explanation: 'It created a system for organized westward expansion and set a precedent for excluding slavery from certain territories.',
      difficulty: 'Medium', domain: 'Revolution & Constitution', skill: 'Causation',
    },
  ],
  'unit-4': [
    {
      id: 'apush-4-001',
      question: 'The "Corrupt Bargain" of 1824 refers to the alleged political deal that:',
      options: [
        { letter: 'A', text: 'Allowed Missouri to enter the Union as a slave state.' },
        { letter: 'B', text: 'Resulted in John Quincy Adams winning the presidency over Andrew Jackson.' },
        { letter: 'C', text: 'Enabled the Second Bank of the United States to bypass federal taxes.' },
        { letter: 'D', text: 'Forced the Cherokee people to move west via the Trail of Tears.' },
      ],
      correctAnswer: 'B',
      explanation: 'Henry Clay threw his support to Adams; Adams then named Clay Secretary of State.',
      difficulty: 'Hard', domain: 'Jacksonian Democracy', skill: 'Causation',
    },
  ],
};

// ─── Lazy-loaded banks (loaded on first access) ───
let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  
  _bankPromise = Promise.all([
    import('./apush_full_question_bank.json'),
    import('./apush_full_question_bank_v2.json'),
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

function mergeWithCurated(bankQuestions: Question[], unitKey: string): Question[] {
  const curated = curatedQuestions[unitKey] || [];
  if (curated.length === 0) return bankQuestions;
  const ids = new Set(curated.map(q => q.id));
  return [...curated, ...bankQuestions.filter(q => !ids.has(q.id))];
}

// ─── Async loader for use in components ───
export async function loadAPUSHQuestions(): Promise<Record<string, Question[]>> {
  const bank = await loadBank();
  const result: Record<string, Question[]> = {};
  for (let i = 1; i <= 9; i++) {
    const key = `unit-${i}`;
    result[key] = mergeWithCurated(bank[key] || [], key);
  }
  return result;
}

// ─── Synchronous fallback (curated only, before bank loads) ───
export const apUSHQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': curatedQuestions['unit-1'] || [],
  'unit-2': [],
  'unit-3': curatedQuestions['unit-3'] || [],
  'unit-4': curatedQuestions['unit-4'] || [],
  'unit-5': [],
  'unit-6': [],
  'unit-7': [],
  'unit-8': [],
  'unit-9': [],
};

export const allAPUSHQuestions: Question[] = Object.values(apUSHQuestionsByUnit).flat();
