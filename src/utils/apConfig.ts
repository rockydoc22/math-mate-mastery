// AP Test subject definitions
export interface APSubject {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  category: APCategory;
  scoreRange: { min: number; max: number }; // AP exams are scored 1-5
  description: string;
  comingSoon?: boolean;
  requiredQuestions?: number; // minimum questions needed to activate
}

export type APCategory = 'sciences' | 'math' | 'history' | 'english' | 'cs' | 'languages' | 'arts';

export const AP_CATEGORIES: Record<APCategory, { label: string; icon: string }> = {
  sciences: { label: 'Sciences', icon: '🔬' },
  math: { label: 'Math', icon: '🧮' },
  cs: { label: 'Computer Science', icon: '💻' },
  history: { label: 'History & Social Sciences', icon: '🏛️' },
  english: { label: 'English', icon: '📝' },
  languages: { label: 'World Languages', icon: '🌍' },
  arts: { label: 'Arts', icon: '🎨' },
};

export const AP_SUBJECTS: APSubject[] = [
  // Sciences
  { id: 'ap-physics-1', name: 'AP Physics 1: Algebra-Based', shortName: 'Physics 1', icon: '⚛️', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Algebra-based physics: mechanics, waves, circuits', comingSoon: true },
  { id: 'ap-physics-2', name: 'AP Physics 2: Algebra-Based', shortName: 'Physics 2', icon: '🔭', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Fluids, thermodynamics, electromagnetism, optics' },
  { id: 'ap-biology', name: 'AP Biology', shortName: 'Biology', icon: '🧬', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Cells, genetics, evolution, ecology', comingSoon: true },
  { id: 'ap-chemistry', name: 'AP Chemistry', shortName: 'Chemistry', icon: '⚗️', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Atomic structure, reactions, thermodynamics' },
  { id: 'ap-environmental-science', name: 'AP Environmental Science', shortName: 'Env Science', icon: '🌱', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Ecosystems, pollution, sustainability' },

  // Math
  { id: 'ap-calculus-ab', name: 'AP Calculus AB', shortName: 'Calc AB', icon: '📈', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Limits, derivatives, integrals' },
  { id: 'ap-calculus-bc', name: 'AP Calculus BC', shortName: 'Calc BC', icon: '📊', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Calc AB + series, parametric, polar' },
  { id: 'ap-statistics', name: 'AP Statistics', shortName: 'Statistics', icon: '📉', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Data analysis, probability, inference' },

  // History & Social Sciences
  { id: 'ap-us-history', name: 'AP United States History', shortName: 'APUSH', icon: '🇺🇸', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'American history from pre-contact to present' },
  { id: 'ap-world-history', name: 'AP World History: Modern', shortName: 'World Hist', icon: '🌎', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Global history from 1200 CE to present' },
  { id: 'ap-euro-history', name: 'AP European History', shortName: 'Euro Hist', icon: '🏰', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'European history from 1450 to present' },
  { id: 'ap-us-gov', name: 'AP United States Government and Politics', shortName: 'US Gov', icon: '🏛️', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Constitutional foundations, institutions, policy', comingSoon: true },
  { id: 'ap-macro', name: 'AP Macroeconomics', shortName: 'Macro', icon: '💰', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'National income, price levels, international trade', comingSoon: true },
  { id: 'ap-micro', name: 'AP Microeconomics', shortName: 'Micro', icon: '📦', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Supply & demand, market structures, factor markets', comingSoon: true },
  { id: 'ap-human-geo', name: 'AP Human Geography', shortName: 'Human Geo', icon: '🗺️', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Population, culture, political geography' },

  // English
  { id: 'ap-english-lit', name: 'AP English Literature and Composition', shortName: 'AP Lit', icon: '📚', category: 'english', scoreRange: { min: 1, max: 5 }, description: 'Poetry, prose fiction, drama analysis and argumentation' },
  { id: 'ap-lang', name: 'AP English Language and Composition', shortName: 'AP Lang', icon: '✍️', category: 'english', scoreRange: { min: 1, max: 5 }, description: 'Rhetoric, argumentation, nonfiction analysis' },

  // Computer Science
  { id: 'ap-csp', name: 'AP Computer Science Principles', shortName: 'CSP', icon: '💻', category: 'cs', scoreRange: { min: 1, max: 5 }, description: 'Computing, data, algorithms, internet, impact' },

  // Languages
  { id: 'ap-french', name: 'AP French Language and Culture', shortName: 'French', icon: '🇫🇷', category: 'languages', scoreRange: { min: 1, max: 5 }, description: 'French language proficiency and cultural understanding', comingSoon: true },
  { id: 'ap-spanish-lit', name: 'AP Spanish Literature and Culture', shortName: 'Spanish Lit', icon: '🇪🇸', category: 'languages', scoreRange: { min: 1, max: 5 }, description: 'Spanish literary analysis and cultural exploration', comingSoon: true },
];

export const AP_CATEGORY_ORDER: APCategory[] = ['sciences', 'math', 'cs', 'history', 'english', 'languages'];

export function getAPSubjectsByCategory(category: APCategory): APSubject[] {
  return AP_SUBJECTS.filter(s => s.category === category);
}

export function getAPSubject(id: string): APSubject | undefined {
  return AP_SUBJECTS.find(s => s.id === id);
}
