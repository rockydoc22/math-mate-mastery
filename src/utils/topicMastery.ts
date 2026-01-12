/**
 * Core 25 Math Topics + Key Grammar Rules
 * Based on high-yield SAT study strategies
 */

export interface TopicDefinition {
  key: string;
  name: string;
  subject: 'math' | 'english';
  category: string;
  skills: string[]; // Maps to question skills
  description: string;
}

// Core 25 Math Topics (covers ~90% of SAT Math)
export const CORE_MATH_TOPICS: TopicDefinition[] = [
  {
    key: 'linear_equations',
    name: 'Linear Equations & Systems',
    subject: 'math',
    category: 'Algebra',
    skills: ['Linear equations in one variable', 'Linear equations in two variables', 'Systems of two linear equations in two variables'],
    description: 'Solve and graph linear equations, work with systems',
  },
  {
    key: 'ratios_percentages',
    name: 'Ratios & Percentages',
    subject: 'math',
    category: 'Problem Solving',
    skills: ['Ratios, rates, proportional relationships, and units', 'Percentages'],
    description: 'Proportions, percent change, unit rates',
  },
  {
    key: 'exponents_radicals',
    name: 'Exponents & Radicals',
    subject: 'math',
    category: 'Algebra',
    skills: ['Equivalent expressions', 'Nonlinear equations in one variable and systems of equations in two variables'],
    description: 'Simplify expressions with exponents and roots',
  },
  {
    key: 'quadratics',
    name: 'Quadratics',
    subject: 'math',
    category: 'Algebra',
    skills: ['Nonlinear functions'],
    description: 'Factoring, vertex form, solving quadratic equations',
  },
  {
    key: 'word_problems',
    name: 'Word Problems → Equations',
    subject: 'math',
    category: 'Problem Solving',
    skills: ['Linear equations in one variable', 'Linear equations in two variables'],
    description: 'Translate word problems into algebraic equations',
  },
  {
    key: 'functions',
    name: 'Functions',
    subject: 'math',
    category: 'Algebra',
    skills: ['Linear functions', 'Nonlinear functions'],
    description: 'Function notation, graphs, transformations',
  },
  {
    key: 'inequalities',
    name: 'Inequalities',
    subject: 'math',
    category: 'Algebra',
    skills: ['Linear inequalities in one or two variables'],
    description: 'Solve and graph linear inequalities',
  },
  {
    key: 'data_analysis',
    name: 'Data Analysis',
    subject: 'math',
    category: 'Problem Solving',
    skills: ['One-variable data: Distributions and measures of center and spread', 'Two-variable data: Models and scatterplots', 'Probability and conditional probability', 'Inference from sample statistics and margin of error', 'Evaluating statistical claims: Observational studies and experiments'],
    description: 'Mean, median, standard deviation, percent change',
  },
  {
    key: 'geometry_basics',
    name: 'Geometry Basics',
    subject: 'math',
    category: 'Geometry',
    skills: ['Area and volume', 'Lines, angles, and triangles', 'Right triangles and trigonometry'],
    description: 'Area, perimeter, volume, angles',
  },
  {
    key: 'circles',
    name: 'Circles',
    subject: 'math',
    category: 'Geometry',
    skills: ['Circles'],
    description: 'Circle equations, arc length, sectors',
  },
];

// Key Grammar Rules (Fastest English Gains)
export const CORE_ENGLISH_TOPICS: TopicDefinition[] = [
  {
    key: 'comma_semicolon',
    name: 'Comma vs Semicolon',
    subject: 'english',
    category: 'Grammar',
    skills: ['Boundaries'],
    description: 'When to use commas, semicolons, and periods',
  },
  {
    key: 'clauses',
    name: 'Independent vs Dependent Clauses',
    subject: 'english',
    category: 'Grammar',
    skills: ['Boundaries', 'Supplement'],
    description: 'Identify and punctuate clause types correctly',
  },
  {
    key: 'subject_verb_agreement',
    name: 'Subject-Verb Agreement',
    subject: 'english',
    category: 'Grammar',
    skills: ['Form, Structure, and Sense'],
    description: 'Match subjects with verbs (watch for prepositional traps)',
  },
  {
    key: 'pronoun_clarity',
    name: 'Pronoun Clarity',
    subject: 'english',
    category: 'Grammar',
    skills: ['Form, Structure, and Sense'],
    description: 'Clear pronoun references, agreement',
  },
  {
    key: 'apostrophes',
    name: 'Apostrophes',
    subject: 'english',
    category: 'Grammar',
    skills: ['Form, Structure, and Sense'],
    description: 'Possessives vs contractions',
  },
  {
    key: 'concision',
    name: 'Concision',
    subject: 'english',
    category: 'Style',
    skills: ['Rhetorical Synthesis'],
    description: 'Shorter is usually better - eliminate wordiness',
  },
  {
    key: 'transitions',
    name: 'Transitions',
    subject: 'english',
    category: 'Style',
    skills: ['Transitions'],
    description: 'Logical connectors between ideas',
  },
  {
    key: 'central_ideas',
    name: 'Central Ideas & Purpose',
    subject: 'english',
    category: 'Reading',
    skills: ['Central Ideas and Details', 'Inferences'],
    description: 'Main idea, author purpose, supporting details',
  },
  {
    key: 'evidence',
    name: 'Textual Evidence',
    subject: 'english',
    category: 'Reading',
    skills: ['Command of Evidence', 'Central Ideas and Details'],
    description: 'Find and use evidence from the passage',
  },
  {
    key: 'words_in_context',
    name: 'Words in Context',
    subject: 'english',
    category: 'Reading',
    skills: ['Words in Context'],
    description: 'Vocabulary in context, tone, connotation',
  },
];

export const ALL_TOPICS = [...CORE_MATH_TOPICS, ...CORE_ENGLISH_TOPICS];

export const MASTERY_THRESHOLD = 90; // 90% accuracy to master
export const MIN_QUESTIONS_FOR_MASTERY = 10; // Need at least 10 questions

/**
 * Find which topic a skill belongs to
 */
export function getTopicForSkill(skill: string, subject: 'math' | 'english'): TopicDefinition | null {
  const topics = subject === 'math' ? CORE_MATH_TOPICS : CORE_ENGLISH_TOPICS;
  return topics.find(t => t.skills.some(s => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))) || null;
}

/**
 * Calculate mastery status
 */
export function calculateMasteryStatus(attempted: number, correct: number): {
  accuracy: number;
  isMastered: boolean;
  questionsNeeded: number;
} {
  const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
  const isMastered = attempted >= MIN_QUESTIONS_FOR_MASTERY && accuracy >= MASTERY_THRESHOLD;
  const questionsNeeded = Math.max(0, MIN_QUESTIONS_FOR_MASTERY - attempted);
  
  return { accuracy, isMastered, questionsNeeded };
}

/**
 * Error/miss reason types
 */
export type MissReason = 'careless' | 'concept_gap' | 'timing' | 'trap_answer' | 'guessed';

export const MISS_REASONS: { value: MissReason; label: string; description: string; icon: string }[] = [
  { value: 'careless', label: 'Careless Mistake', description: 'I knew how to do it but made an error', icon: '😅' },
  { value: 'concept_gap', label: 'Concept Gap', description: "I didn't understand the concept", icon: '🤔' },
  { value: 'timing', label: 'Ran Out of Time', description: 'I rushed or spent too long', icon: '⏱️' },
  { value: 'trap_answer', label: 'Fell for Trap', description: 'I picked a tempting wrong answer', icon: '🪤' },
  { value: 'guessed', label: 'Guessed', description: "I didn't know and guessed", icon: '🎲' },
];

/**
 * Pacing thresholds
 */
export const PACING = {
  WARNING_THRESHOLD_MS: 40000, // 40 seconds - warn user
  DANGER_THRESHOLD_MS: 60000, // 60 seconds - strongly suggest skip
  IDEAL_PACE_MS: 75000, // 75 seconds average per question on SAT
};
