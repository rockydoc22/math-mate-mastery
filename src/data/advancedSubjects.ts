import { Question } from './questions';
import { hardMathQuestions } from './hardMathQuestions';

// Advanced questions that go beyond SAT scope - organized by subject
// These are the questions flagged as non-SAT content, now in separate subjects

// Physics questions (mechanics, thermodynamics, etc.)
export const physicsQuestionIds = [
  'hard-math-019', // atmospheric physics
  'hard-math-049', // statistical physics Maxwell-Boltzmann
  'hard-math-092', // bridge engineering physics
  'hard-math-108', // biomechanics physics
];

// Pre-Calculus questions (advanced trig, complex analysis, queueing theory, etc.)
export const precalcQuestionIds = [
  'hard-math-032', // logistic regression
  'hard-math-127', // M/M/1 queueing theory
  'hard-math-130', // sequence alignment (dynamic programming)
  'hard-math-137', // quantum qubit operations
  'hard-math-140', // principal component analysis
  'hard-math-195', // evolutionary game theory
  'hard-math-196', // information theory Huffman coding
  'hard-math-251', // quantum gate fidelity
  'hard-math-300', // Bell states entanglement
];

// Calculus questions (derivatives, integrals, etc.)
export const calculusQuestionIds = [
  'hard-math-036', // options trading Greeks (requires calculus)
  'hard-math-042', // economics equilibrium
  'hard-math-059', // quantum computing
  'hard-math-121', // RSA cryptography
  'hard-math-214', // derivatives trading Greeks
];

// Extract questions by ID
const getQuestionsById = (ids: string[]): Question[] => {
  return hardMathQuestions.filter(q => ids.includes(q.id));
};

export const physicsQuestions: Question[] = getQuestionsById(physicsQuestionIds);
export const precalcQuestions: Question[] = getQuestionsById(precalcQuestionIds);
export const calculusQuestions: Question[] = getQuestionsById(calculusQuestionIds);

// All advanced questions combined
export const allAdvancedQuestions: Question[] = [
  ...physicsQuestions,
  ...precalcQuestions,
  ...calculusQuestions,
];

// Subject metadata
export const advancedSubjects = {
  physics: {
    id: 'physics',
    name: 'Physics is Ph-un',
    description: 'Mechanics, thermodynamics, waves & more',
    icon: '⚛️',
    questionCount: physicsQuestions.length,
  },
  precalc: {
    id: 'precalc', 
    name: 'Pre-Calc is Queen',
    description: 'Advanced algebra, sequences & analysis',
    icon: '📐',
    questionCount: precalcQuestions.length,
  },
  calculus: {
    id: 'calculus',
    name: 'Calculus is King',
    description: 'Derivatives, integrals & applications',
    icon: '∫',
    questionCount: calculusQuestions.length,
  },
};
