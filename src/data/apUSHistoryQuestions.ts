import { Question } from './questions';

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

// ─── UNIT 1: Period 1 (1491–1607) ───
const unit1Questions: Question[] = [
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

// ─── UNIT 2: Period 2 (1607–1754) ───
const unit2Questions: Question[] = [
  {
    id: 'apush-2-001',
    question: 'How did the British American system of slavery differ significantly from other colonial models (Spanish or French) by the mid-1700s?',
    options: [
      { letter: 'A', text: 'The British system relied primarily on Native American labor.' },
      { letter: 'B', text: 'The British system developed a rigid racial hierarchy that became hereditary.' },
      { letter: 'C', text: 'The British colonies allowed for frequent manumission (freeing) of slaves.' },
      { letter: 'D', text: 'The British system was confined exclusively to the New England colonies.' },
    ],
    correctAnswer: 'B',
    explanation: 'Unlike the Spanish or French, who often had "castas" or intermediate racial classes, the British colonies developed a binary racial system where status was inherited from the mother (partus sequitur ventrem).',
    difficulty: 'Hard',
    domain: 'Colonial Societies',
    skill: 'Comparison',
  },
  {
    id: 'apush-2-002',
    question: 'The First Great Awakening (1730s–1740s) led to which of the following social changes?',
    options: [
      { letter: 'A', text: 'The strengthening of established churches like the Anglicans.' },
      { letter: 'B', text: 'A decline in the use of enslaved labor in the South.' },
      { letter: 'C', text: 'Increased fragmentation of religious sects and a challenge to traditional authority.' },
      { letter: 'D', text: 'The total separation of church and state in all thirteen colonies.' },
    ],
    correctAnswer: 'C',
    explanation: 'The Great Awakening emphasized personal emotion over established doctrine, leading to the rise of "New Light" ministers and the growth of Baptist and Methodist denominations.',
    difficulty: 'Medium',
    domain: 'Colonial Societies',
    skill: 'CCOT',
  },
];

// ─── UNIT 3: Period 3 (1754–1800) ───
const unit3Questions: Question[] = [
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

// ─── UNIT 4: Period 4 (1800–1848) ───
const unit4Questions: Question[] = [
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

// ─── UNIT 5: Period 5 (1844–1877) ───
const unit5Questions: Question[] = [];

// ─── UNIT 6: Period 6 (1865–1898) ───
const unit6Questions: Question[] = [];

// ─── UNIT 7: Period 7 (1890–1945) ───
const unit7Questions: Question[] = [];

// ─── UNIT 8: Period 8 (1945–1980) ───
const unit8Questions: Question[] = [];

// ─── UNIT 9: Period 9 (1980–Present) ───
const unit9Questions: Question[] = [];

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
