import { Question } from './questions';
import rawBank from './apush_full_question_bank.json';

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

function convertQuestion(raw: RawQuestion, unitNum: number): Question {
  const letters = ['A', 'B', 'C', 'D'];
  // Build stimulus prefix for questions with text stimuli
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

// Parse all units from the JSON bank
const bankByUnit: Record<string, Question[]> = {};
for (const unit of (rawBank as any).units) {
  const key = `unit-${unit.unit_id}`;
  bankByUnit[key] = (unit.questions || []).map((q: RawQuestion) => convertQuestion(q, unit.unit_id));
}

// ─── Hand-curated questions (kept as priority / high-quality originals) ───

const curatedUnit1: Question[] = [
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
    explanation: 'The Encomienda system was a labor system established by the Spanish crown in the 1500s. It gave settlers the right to tax local Native Americans or to make them work in exchange for "protection" and conversion to Christianity.',
    difficulty: 'Medium',
    domain: 'Contact & Exchange',
    skill: 'Contextualization',
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
    explanation: 'After the revolt, the Spanish realized they could not completely suppress Pueblo religious practices. When they returned, they adopted a more conciliatory approach to colonial governance.',
    difficulty: 'Hard',
    domain: 'Contact & Exchange',
    skill: 'Causation',
  },
];

const curatedUnit3: Question[] = [
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
    explanation: 'Republican Motherhood did not grant political rights, but it elevated women\'s domestic status by arguing they were essential for teaching the next generation of male leaders republican values.',
    difficulty: 'Hard',
    domain: 'Revolution & Constitution',
    skill: 'Contextualization',
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
    explanation: 'It was one of the few successes of the Articles of Confederation, creating a system for organized westward expansion and setting a precedent for excluding slavery from certain territories.',
    difficulty: 'Medium',
    domain: 'Revolution & Constitution',
    skill: 'Causation',
  },
];

const curatedUnit4: Question[] = [
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
    explanation: 'When the election went to the House, Henry Clay (Speaker) threw his support to Adams; Adams then named Clay Secretary of State. Jackson\'s supporters claimed a backroom deal had subverted the popular will.',
    difficulty: 'Hard',
    domain: 'Jacksonian Democracy',
    skill: 'Causation',
  },
  {
    id: 'apush-4-002',
    question: 'The "Lowell System" of the early 19th century was characterized by:',
    options: [
      { letter: 'A', text: 'The use of enslaved labor in Northern textile mills.' },
      { letter: 'B', text: 'Employment of young New England farm women in textile factories.' },
      { letter: 'C', text: 'A system of sharecropping that replaced the plantation economy.' },
      { letter: 'D', text: 'The banning of all European immigrants from industrial jobs.' },
    ],
    correctAnswer: 'B',
    explanation: 'The Lowell mills recruited young women, providing them with housing and a degree of economic independence, though the work was highly regulated and difficult.',
    difficulty: 'Hard',
    domain: 'Market Revolution',
    skill: 'Contextualization',
  },
  {
    id: 'apush-4-003',
    question: 'What was the primary purpose of the Monroe Doctrine (1823)?',
    options: [
      { letter: 'A', text: 'To facilitate the annexation of Texas into the United States.' },
      { letter: 'B', text: 'To warn European powers against further colonization in the Americas.' },
      { letter: 'C', text: 'To establish a trade alliance between the U.S. and Great Britain.' },
      { letter: 'D', text: 'To provide federal funding for the construction of national roads.' },
    ],
    correctAnswer: 'B',
    explanation: 'President Monroe declared the Western Hemisphere closed to European intervention, marking a major turning point in U.S. assertive foreign policy.',
    difficulty: 'Medium',
    domain: 'Foreign Policy',
    skill: 'Contextualization',
  },
  {
    id: 'apush-4-004',
    question: 'The 1848 Seneca Falls Convention was sparked by which of the following experiences of its organizers?',
    options: [
      { letter: 'A', text: 'Being barred from participation in an international anti-slavery convention.' },
      { letter: 'B', text: 'The loss of property rights during the Panic of 1837.' },
      { letter: 'C', text: 'The refusal of the federal government to grant women the right to own land.' },
      { letter: 'D', text: 'A desire to protest the Mexican-American War.' },
    ],
    correctAnswer: 'A',
    explanation: 'Elizabeth Cady Stanton and Lucretia Mott were motivated to hold the convention after they were denied seats at the World Anti-Slavery Convention in London because of their gender.',
    difficulty: 'Hard',
    domain: 'Reform Movements',
    skill: 'Causation',
  },
];

// ─── Merge: curated questions first, then bank questions (dedup by id) ───
function mergeQuestions(curated: Question[], bankKey: string): Question[] {
  const bank = bankByUnit[bankKey] || [];
  const ids = new Set(curated.map(q => q.id));
  return [...curated, ...bank.filter(q => !ids.has(q.id))];
}

const unit1Questions = mergeQuestions(curatedUnit1, 'unit-1');
const unit2Questions = bankByUnit['unit-2'] || []; // unit-2 curated questions had same IDs, bank replaces
const unit3Questions = mergeQuestions(curatedUnit3, 'unit-3');
const unit4Questions = mergeQuestions(curatedUnit4, 'unit-4');
const unit5Questions = bankByUnit['unit-5'] || [];
const unit6Questions = bankByUnit['unit-6'] || [];
const unit7Questions = bankByUnit['unit-7'] || [];
const unit8Questions = bankByUnit['unit-8'] || [];
const unit9Questions = bankByUnit['unit-9'] || [];

// ─── Exports ───
export const apUSHQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': unit1Questions,
  'unit-2': unit2Questions,
  'unit-3': unit3Questions,
  'unit-4': unit4Questions,
  'unit-5': unit5Questions,
  'unit-6': unit6Questions,
  'unit-7': unit7Questions,
  'unit-8': unit8Questions,
  'unit-9': unit9Questions,
};

export const allAPUSHQuestions: Question[] = [
  ...unit1Questions,
  ...unit2Questions,
  ...unit3Questions,
  ...unit4Questions,
  ...unit5Questions,
  ...unit6Questions,
  ...unit7Questions,
  ...unit8Questions,
  ...unit9Questions,
];
