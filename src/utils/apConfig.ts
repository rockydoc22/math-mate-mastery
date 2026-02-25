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
}

export type APCategory = 'sciences' | 'math' | 'history' | 'english' | 'languages' | 'arts';

export const AP_CATEGORIES: Record<APCategory, { label: string; icon: string }> = {
  sciences: { label: 'Sciences', icon: '🔬' },
  math: { label: 'Math & Computer Science', icon: '🧮' },
  history: { label: 'History & Social Sciences', icon: '🏛️' },
  english: { label: 'English', icon: '📝' },
  languages: { label: 'World Languages', icon: '🌍' },
  arts: { label: 'Arts', icon: '🎨' },
};

export const AP_SUBJECTS: APSubject[] = [
  // Sciences
  { id: 'ap-physics-1', name: 'AP Physics 1', shortName: 'Physics 1', icon: '⚛️', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Algebra-based physics: mechanics, waves, circuits' },
  { id: 'ap-physics-2', name: 'AP Physics 2', shortName: 'Physics 2', icon: '🔭', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Fluids, thermodynamics, electromagnetism, optics', comingSoon: true },
  { id: 'ap-physics-c-mech', name: 'AP Physics C: Mechanics', shortName: 'Phys C Mech', icon: '⚙️', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Calculus-based mechanics', comingSoon: true },
  { id: 'ap-physics-c-em', name: 'AP Physics C: E&M', shortName: 'Phys C E&M', icon: '🧲', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Calculus-based electricity & magnetism', comingSoon: true },
  { id: 'ap-biology', name: 'AP Biology', shortName: 'Biology', icon: '🧬', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Cells, genetics, evolution, ecology' },
  { id: 'ap-chemistry', name: 'AP Chemistry', shortName: 'Chemistry', icon: '⚗️', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Atomic structure, reactions, thermodynamics' },
  { id: 'ap-environmental-science', name: 'AP Environmental Science', shortName: 'Env Science', icon: '🌱', category: 'sciences', scoreRange: { min: 1, max: 5 }, description: 'Ecosystems, pollution, sustainability', comingSoon: true },

  // Math
  { id: 'ap-calculus-ab', name: 'AP Calculus AB', shortName: 'Calc AB', icon: '📈', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Limits, derivatives, integrals' },
  { id: 'ap-calculus-bc', name: 'AP Calculus BC', shortName: 'Calc BC', icon: '📊', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Calc AB + series, parametric, polar' },
  { id: 'ap-statistics', name: 'AP Statistics', shortName: 'Statistics', icon: '📉', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Data analysis, probability, inference' },
  { id: 'ap-precalculus', name: 'AP Precalculus', shortName: 'Precalc', icon: '➗', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Functions, trigonometry, modeling', comingSoon: true },
  { id: 'ap-cs-a', name: 'AP Computer Science A', shortName: 'CS A', icon: '💻', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Java programming, algorithms, OOP', comingSoon: true },
  { id: 'ap-cs-principles', name: 'AP CS Principles', shortName: 'CSP', icon: '🖥️', category: 'math', scoreRange: { min: 1, max: 5 }, description: 'Computing concepts, data, impact', comingSoon: true },

  // History & Social Sciences
  { id: 'ap-us-history', name: 'AP US History', shortName: 'APUSH', icon: '🇺🇸', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'American history from pre-contact to present' },
  { id: 'ap-world-history', name: 'AP World History', shortName: 'World Hist', icon: '🌎', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Global history from 1200 CE to present' },
  { id: 'ap-euro-history', name: 'AP European History', shortName: 'Euro Hist', icon: '🏰', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'European history from 1450 to present', comingSoon: true },
  { id: 'ap-us-gov', name: 'AP US Government', shortName: 'US Gov', icon: '🏛️', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Constitutional foundations, institutions, policy' },
  { id: 'ap-comp-gov', name: 'AP Comparative Government', shortName: 'Comp Gov', icon: '🗳️', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Political systems across countries', comingSoon: true },
  { id: 'ap-macro', name: 'AP Macroeconomics', shortName: 'Macro', icon: '💰', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'National income, price levels, international trade' },
  { id: 'ap-micro', name: 'AP Microeconomics', shortName: 'Micro', icon: '📦', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Supply & demand, market structures, factor markets', comingSoon: true },
  { id: 'ap-psych', name: 'AP Psychology', shortName: 'Psych', icon: '🧠', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Behavior, cognition, development, disorders' },
  { id: 'ap-human-geo', name: 'AP Human Geography', shortName: 'Human Geo', icon: '🗺️', category: 'history', scoreRange: { min: 1, max: 5 }, description: 'Population, culture, political geography', comingSoon: true },

  // English
  { id: 'ap-lang', name: 'AP English Language', shortName: 'AP Lang', icon: '✍️', category: 'english', scoreRange: { min: 1, max: 5 }, description: 'Rhetoric, argumentation, nonfiction analysis' },
  { id: 'ap-lit', name: 'AP English Literature', shortName: 'AP Lit', icon: '📚', category: 'english', scoreRange: { min: 1, max: 5 }, description: 'Poetry, prose, drama analysis', comingSoon: true },
];

export const AP_CATEGORY_ORDER: APCategory[] = ['sciences', 'math', 'history', 'english'];

export function getAPSubjectsByCategory(category: APCategory): APSubject[] {
  return AP_SUBJECTS.filter(s => s.category === category);
}

export function getAPSubject(id: string): APSubject | undefined {
  return AP_SUBJECTS.find(s => s.id === id);
}
