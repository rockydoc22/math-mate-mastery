// K-12 exam configurations
export interface K12ExamConfig {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  timePerQuestion: number;
  // Exam name as it appears in the question data's "exam" field
  examKeys: string[];
  // Existing small JSON banks (200-question files)
  legacyJsonFiles: string[];
  // New 30k-pack exam key for filtering
  packExamKey: string;
}

export const K12_EXAMS: K12ExamConfig[] = [
  {
    id: 'iowa-itbs', name: 'Iowa Assessments (ITBS)', shortName: 'ITBS', icon: '📋',
    description: 'Iowa Tests of Basic Skills & Educational Development',
    timePerQuestion: 60,
    examKeys: ['Iowa/ITBS'],
    legacyJsonFiles: ['homeschool_iowa_stanford10_question_bank_220_original.json'],
    packExamKey: 'Iowa/ITBS',
  },
  {
    id: 'ged', name: 'GED', shortName: 'GED', icon: '📖',
    description: 'General Educational Development test',
    timePerQuestion: 75,
    examKeys: ['GED'],
    legacyJsonFiles: ['ged_question_bank_200.json'],
    packExamKey: 'GED',
  },
  {
    id: 'hiset', name: 'HiSET', shortName: 'HiSET', icon: '📝',
    description: 'High School Equivalency Test',
    timePerQuestion: 75,
    examKeys: ['HiSET'],
    legacyJsonFiles: ['hiset_question_bank_200.json'],
    packExamKey: 'HiSET',
  },
  {
    id: 'tasc', name: 'TASC', shortName: 'TASC', icon: '✅',
    description: 'Test Assessing Secondary Completion',
    timePerQuestion: 70,
    examKeys: ['TASC'],
    legacyJsonFiles: [],
    packExamKey: 'TASC',
  },
  {
    id: 'map-growth', name: 'MAP Growth', shortName: 'MAP', icon: '📊',
    description: 'Measures of Academic Progress',
    timePerQuestion: 60,
    examKeys: ['MAP Growth'],
    legacyJsonFiles: ['map_growth_question_bank_200_original.json'],
    packExamKey: 'MAP Growth',
  },
  {
    id: 'star', name: 'STAR Assessments', shortName: 'STAR', icon: '⭐',
    description: 'Renaissance STAR Reading & Math',
    timePerQuestion: 60,
    examKeys: ['STAR Assessments', 'STAR Assessment'],
    legacyJsonFiles: [],
    packExamKey: 'STAR Assessments',
  },
  {
    id: 'stanford10', name: 'Stanford 10 (SAT-10)', shortName: 'SAT-10', icon: '🏫',
    description: 'Stanford Achievement Test Series',
    timePerQuestion: 60,
    examKeys: ['Stanford 10'],
    legacyJsonFiles: ['homeschool_iowa_stanford10_question_bank_220_original.json'],
    packExamKey: 'Stanford 10',
  },
  {
    id: 'terranova', name: 'TerraNova (CAT/6)', shortName: 'TerraNova', icon: '🌎',
    description: 'Comprehensive Tests of Basic Skills',
    timePerQuestion: 60,
    examKeys: ['TerraNova'],
    legacyJsonFiles: ['terranova_question_bank_200_original.json'],
    packExamKey: 'TerraNova',
  },
  {
    id: 'pssa', name: 'PSSA', shortName: 'PSSA', icon: '🔑',
    description: 'Pennsylvania System of School Assessment',
    timePerQuestion: 65,
    examKeys: ['PSSA'],
    legacyJsonFiles: [],
    packExamKey: 'PSSA',
  },
  {
    id: 'regents', name: 'Regents Exams', shortName: 'Regents', icon: '🗽',
    description: 'New York State Regents Examinations',
    timePerQuestion: 70,
    examKeys: ['Regents Exams (New York State)', 'Regents Exam'],
    legacyJsonFiles: [],
    packExamKey: 'Regents Exams (New York State)',
  },
];

export function getK12Exam(id: string): K12ExamConfig | undefined {
  return K12_EXAMS.find(e => e.id === id);
}
