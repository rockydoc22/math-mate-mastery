// Professional & specialized exam configurations
export interface ProExamConfig {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  category: 'graduate' | 'professional' | 'military' | 'faith-based' | 'k12';
  scoreRange: { min: number; max: number };
  sections: string[];
  description: string;
  timePerQuestion: number; // seconds
  jsonFiles: string[]; // JSON bank file names in src/data/
}

export const PRO_EXAM_CATEGORIES: Record<string, { label: string; icon: string }> = {
  graduate: { label: 'Graduate Admissions', icon: '🎓' },
  professional: { label: 'Professional School', icon: '⚕️' },
  military: { label: 'Military & Vocational', icon: '🎖️' },
  'faith-based': { label: 'Faith-Based', icon: '✝️' },
  k12: { label: 'K-12 Assessments', icon: '🏫' },
};

export const PRO_EXAMS: ProExamConfig[] = [
  {
    id: 'gre', name: 'GRE General Test', shortName: 'GRE', icon: '🎓',
    category: 'graduate',
    scoreRange: { min: 260, max: 340 },
    sections: ['Quantitative', 'Verbal', 'Analytical Writing'],
    description: 'Graduate Record Examination for graduate school admissions',
    timePerQuestion: 90,
    jsonFiles: ['gre_question_bank_200_original.json', 'gre_question_bank_expansion_300.json', 'gre_question_bank_expansion_300_b2.json'],
  },
  {
    id: 'gmat', name: 'GMAT', shortName: 'GMAT', icon: '📊',
    category: 'graduate',
    scoreRange: { min: 200, max: 800 },
    sections: ['Quantitative', 'Verbal', 'Data Insights'],
    description: 'Graduate Management Admission Test for business school',
    timePerQuestion: 120,
    jsonFiles: ['gmat_question_bank_200_original.json', 'gmat_question_bank_expansion_300.json', 'gmat_question_bank_expansion_300_b2.json'],
  },
  {
    id: 'lsat', name: 'LSAT', shortName: 'LSAT', icon: '⚖️',
    category: 'graduate',
    scoreRange: { min: 120, max: 180 },
    sections: ['Logical Reasoning', 'Analytical Reasoning', 'Reading Comprehension'],
    description: 'Law School Admission Test',
    timePerQuestion: 85,
    jsonFiles: ['lsat_question_bank_250_original.json', 'lsat_question_bank_expansion_300.json', 'lsat_question_bank_expansion_300_b2.json'],
  },
  {
    id: 'mcat', name: 'MCAT', shortName: 'MCAT', icon: '🔬',
    category: 'professional',
    scoreRange: { min: 472, max: 528 },
    sections: ['Chemical and Physical Foundations', 'Biological and Biochemical Foundations', 'Psychological, Social, and Biological Foundations', 'Critical Analysis and Reasoning'],
    description: 'Medical College Admission Test',
    timePerQuestion: 95,
    jsonFiles: ['mcat_question_bank_300_original.json', 'mcat_question_bank_expansion_300.json', 'mcat_question_bank_expansion_300_b2.json'],
  },
  {
    id: 'dat', name: 'DAT', shortName: 'DAT', icon: '🦷',
    category: 'professional',
    scoreRange: { min: 1, max: 30 },
    sections: ['Biology', 'General Chemistry', 'Organic Chemistry', 'Perceptual Ability', 'Reading Comprehension', 'Quantitative Reasoning'],
    description: 'Dental Admission Test',
    timePerQuestion: 60,
    jsonFiles: ['dat_question_bank_240_original.json'],
  },
  {
    id: 'oat', name: 'OAT', shortName: 'OAT', icon: '👁️',
    category: 'professional',
    scoreRange: { min: 200, max: 400 },
    sections: ['Biology', 'General Chemistry', 'Organic Chemistry', 'Physics', 'Reading Comprehension', 'Quantitative Reasoning'],
    description: 'Optometry Admission Test',
    timePerQuestion: 60,
    jsonFiles: ['oat_question_bank_240_original.json'],
  },
  {
    id: 'asvab', name: 'ASVAB', shortName: 'ASVAB', icon: '🎖️',
    category: 'military',
    scoreRange: { min: 1, max: 99 },
    sections: ['Arithmetic Reasoning', 'Word Knowledge', 'Paragraph Comprehension', 'Mathematics Knowledge', 'General Science', 'Electronics Information', 'Auto & Shop Information', 'Mechanical Comprehension'],
    description: 'Armed Services Vocational Aptitude Battery',
    timePerQuestion: 60,
    jsonFiles: ['asvab_question_bank_300_original.json', 'asvab_question_bank_expansion_300.json', 'asvab_question_bank_expansion_300_b2.json'],
  },
  {
    id: 'clt', name: 'CLT', shortName: 'CLT', icon: '✝️',
    category: 'faith-based',
    scoreRange: { min: 0, max: 120 },
    sections: ['Verbal Reasoning', 'Grammar/Writing', 'Quantitative Reasoning'],
    description: 'Classic Learning Test — faith-friendly college admissions',
    timePerQuestion: 75,
    jsonFiles: ['clt_question_bank_180_original.json'],
  },
  {
    id: 'homeschool', name: 'Homeschool / Iowa / Stanford 10', shortName: 'Homeschool', icon: '🏠',
    category: 'k12',
    scoreRange: { min: 0, max: 100 },
    sections: ['Reading', 'Language', 'Mathematics', 'Science', 'Social Studies'],
    description: 'Standardized testing for homeschool students',
    timePerQuestion: 60,
    jsonFiles: ['homeschool_iowa_stanford10_question_bank_220_original.json'],
  },
  {
    id: 'terranova', name: 'TerraNova / CTBS', shortName: 'TerraNova', icon: '📝',
    category: 'k12',
    scoreRange: { min: 0, max: 100 },
    sections: ['Reading/Language Arts', 'Mathematics', 'Science', 'Social Studies'],
    description: 'TerraNova achievement test for K-12',
    timePerQuestion: 55,
    jsonFiles: ['terranova_question_bank_200_original.json'],
  },
  {
    id: 'mapgrowth', name: 'MAP Growth', shortName: 'MAP', icon: '📈',
    category: 'k12',
    scoreRange: { min: 100, max: 300 },
    sections: ['Reading', 'Language Usage', 'Mathematics', 'Science'],
    description: 'NWEA MAP Growth adaptive assessment',
    timePerQuestion: 60,
    jsonFiles: ['map_growth_question_bank_200_original.json'],
  },
];

export function getProExam(id: string): ProExamConfig | undefined {
  return PRO_EXAMS.find(e => e.id === id);
}

export function getProExamsByCategory(category: string): ProExamConfig[] {
  return PRO_EXAMS.filter(e => e.category === category);
}
