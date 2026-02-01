import { Question } from "@/data/questions";
import { EnglishQuestion } from "@/data/englishQuestions";

/**
 * Official SAT distribution ratios
 * Math Section (~35% Linear Algebra, ~35% Advanced Math, ~15% Data Analysis, ~15% Geometry/Trig)
 * English Section (~28% Craft & Structure, ~26% Information & Ideas, ~26% Standard English, ~20% Expression of Ideas)
 */

// SAT Math domain categories with their target percentages
export const MATH_SAT_DOMAINS = {
  // Linear Algebra (~35%) - linear equations, inequalities, systems, linear functions
  ALGEBRA: {
    weight: 0.35,
    keywords: [
      'linear', 'equation', 'inequality', 'system', 'slope', 'intercept', 
      'y = mx', 'substitution', 'elimination', 'variable', 'solve for'
    ],
    domains: ['algebra', 'linear', 'heart of algebra']
  },
  // Advanced Math (~35%) - quadratics, polynomials, exponentials, radicals, nonlinear
  ADVANCED_MATH: {
    weight: 0.35,
    keywords: [
      'quadratic', 'polynomial', 'exponential', 'radical', 'parabola', 'vertex',
      'factor', 'completing the square', 'exponent', 'growth', 'decay', 'root',
      'rational', 'function', 'nonlinear', 'logarithm', 'complex', 'imaginary'
    ],
    domains: ['advanced math', 'passport to advanced math', 'quadratic', 'polynomial', 'exponential']
  },
  // Problem Solving & Data Analysis (~15%) - ratios, percentages, statistics, probability
  DATA_ANALYSIS: {
    weight: 0.15,
    keywords: [
      'ratio', 'rate', 'proportion', 'percent', 'percentage', 'data', 'table',
      'graph', 'chart', 'mean', 'median', 'mode', 'probability', 'statistic',
      'average', 'standard deviation', 'sample', 'survey', 'interpret'
    ],
    domains: ['problem solving', 'data analysis', 'statistics', 'probability']
  },
  // Geometry & Trigonometry (~15%) - area, volume, angles, triangles, circles, trig
  GEOMETRY_TRIG: {
    weight: 0.15,
    keywords: [
      'area', 'volume', 'perimeter', 'triangle', 'circle', 'angle', 'radius',
      'diameter', 'arc', 'sector', 'sin', 'cos', 'tan', 'trig', 'geometry',
      'congruent', 'similar', 'parallel', 'perpendicular', 'coordinate'
    ],
    domains: ['geometry', 'trigonometry', 'additional topics']
  }
};

// SAT English domain categories with their target percentages
export const ENGLISH_SAT_DOMAINS = {
  // Craft & Structure (~28%) - vocabulary, text structure, purpose, cross-text
  CRAFT_STRUCTURE: {
    weight: 0.28,
    keywords: [
      'context', 'vocabulary', 'word', 'meaning', 'structure', 'purpose',
      'organization', 'author', 'tone', 'passage', 'compare', 'relate'
    ],
    domains: ['craft and structure', 'words in context', 'text structure', 'purpose']
  },
  // Information & Ideas (~26%) - central ideas, comprehension, evidence, inferences
  INFORMATION_IDEAS: {
    weight: 0.26,
    keywords: [
      'central', 'main idea', 'theme', 'comprehension', 'summary', 'inference',
      'infer', 'conclude', 'imply', 'suggest', 'evidence', 'support', 'claim'
    ],
    domains: ['information and ideas', 'central ideas', 'evidence', 'inference']
  },
  // Standard English Conventions (~26%) - grammar, punctuation, sentence structure
  STANDARD_ENGLISH: {
    weight: 0.26,
    keywords: [
      'punctuation', 'colon', 'semicolon', 'comma', 'dash', 'pronoun', 'verb',
      'tense', 'agreement', 'subject-verb', 'sentence', 'fragment', 'run-on',
      'modifier', 'parallel', 'grammar'
    ],
    domains: ['standard english', 'conventions', 'grammar', 'punctuation', 'sentence structure']
  },
  // Expression of Ideas (~20%) - transitions, rhetorical synthesis, revision
  EXPRESSION_IDEAS: {
    weight: 0.20,
    keywords: [
      'transition', 'however', 'therefore', 'moreover', 'furthermore',
      'rhetorical', 'synthesis', 'revision', 'improve', 'effective', 'clarity',
      'concise', 'combine', 'link'
    ],
    domains: ['expression of ideas', 'transitions', 'rhetorical synthesis', 'revision']
  }
};

type QuestionLike = Question | EnglishQuestion;

/**
 * Categorize a math question into one of the SAT domains
 */
export function categorizeMathQuestion(q: Question): keyof typeof MATH_SAT_DOMAINS {
  const textToCheck = `${q.domain} ${q.skill} ${q.question}`.toLowerCase();
  
  // Check each domain in order of specificity
  for (const [domainKey, domainConfig] of Object.entries(MATH_SAT_DOMAINS)) {
    // Check if domain name matches
    const domainMatch = domainConfig.domains.some(d => 
      textToCheck.includes(d.toLowerCase())
    );
    
    // Check if keywords match (need at least one)
    const keywordMatch = domainConfig.keywords.some(k => 
      textToCheck.includes(k.toLowerCase())
    );
    
    if (domainMatch || keywordMatch) {
      return domainKey as keyof typeof MATH_SAT_DOMAINS;
    }
  }
  
  // Default to ALGEBRA if no match (most common on SAT)
  return 'ALGEBRA';
}

/**
 * Categorize an English question into one of the SAT domains
 */
export function categorizeEnglishQuestion(q: EnglishQuestion): keyof typeof ENGLISH_SAT_DOMAINS {
  const textToCheck = `${q.domain} ${q.skill} ${q.question}`.toLowerCase();
  
  // Check each domain in order of specificity
  for (const [domainKey, domainConfig] of Object.entries(ENGLISH_SAT_DOMAINS)) {
    // Check if domain name matches
    const domainMatch = domainConfig.domains.some(d => 
      textToCheck.includes(d.toLowerCase())
    );
    
    // Check if keywords match
    const keywordMatch = domainConfig.keywords.some(k => 
      textToCheck.includes(k.toLowerCase())
    );
    
    if (domainMatch || keywordMatch) {
      return domainKey as keyof typeof ENGLISH_SAT_DOMAINS;
    }
  }
  
  // Default to CRAFT_STRUCTURE if no match
  return 'CRAFT_STRUCTURE';
}

/**
 * Sample questions proportionally based on SAT domain distribution
 * @param questions Array of questions to sample from
 * @param count Number of questions to select
 * @param type 'math' or 'english'
 * @param seed Optional seed for deterministic sampling
 */
export function sampleProportionally<T extends QuestionLike>(
  questions: T[],
  count: number,
  type: 'math' | 'english',
  seed?: number
): T[] {
  const domains = type === 'math' ? MATH_SAT_DOMAINS : ENGLISH_SAT_DOMAINS;
  const categorize = type === 'math' 
    ? (q: T) => categorizeMathQuestion(q as Question)
    : (q: T) => categorizeEnglishQuestion(q as EnglishQuestion);
  
  // Group questions by domain
  const buckets: Record<string, T[]> = {};
  for (const domainKey of Object.keys(domains)) {
    buckets[domainKey] = [];
  }
  
  for (const q of questions) {
    const category = categorize(q);
    buckets[category].push(q);
  }
  
  // Calculate target counts for each domain
  const targetCounts: Record<string, number> = {};
  let totalAllocated = 0;
  
  for (const [domainKey, domainConfig] of Object.entries(domains)) {
    const target = Math.round(count * domainConfig.weight);
    targetCounts[domainKey] = target;
    totalAllocated += target;
  }
  
  // Adjust for rounding errors - add/subtract from largest domain
  const diff = count - totalAllocated;
  if (diff !== 0) {
    const largestDomain = Object.keys(domains)[0]; // First domain (ALGEBRA or CRAFT_STRUCTURE)
    targetCounts[largestDomain] += diff;
  }
  
  // Seeded shuffle function
  const seededShuffle = <U>(arr: U[], s: number): U[] => {
    let currentSeed = s;
    return [...arr].sort(() => {
      currentSeed++;
      const x = Math.sin(currentSeed) * 10000;
      return x - Math.floor(x) - 0.5;
    });
  };
  
  // Random shuffle (non-seeded)
  const randomShuffle = <U>(arr: U[]): U[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };
  
  const shuffle = seed !== undefined ? 
    <U>(arr: U[]) => seededShuffle(arr, seed) :
    randomShuffle;
  
  // Select questions from each bucket
  const selected: T[] = [];
  const usedBuckets: Record<string, T[]> = {};
  
  for (const [domainKey, target] of Object.entries(targetCounts)) {
    const bucket = buckets[domainKey];
    const shuffled = shuffle(bucket);
    const toSelect = shuffled.slice(0, target);
    selected.push(...toSelect);
    usedBuckets[domainKey] = toSelect;
  }
  
  // If we didn't get enough questions from some buckets, fill from others
  if (selected.length < count) {
    const remaining = count - selected.length;
    const selectedIds = new Set(selected.map(q => q.id));
    const unused = questions.filter(q => !selectedIds.has(q.id));
    const shuffledUnused = shuffle(unused);
    selected.push(...shuffledUnused.slice(0, remaining));
  }
  
  // Final shuffle to mix domains together
  return shuffle(selected);
}

/**
 * Get distribution statistics for a set of questions
 */
export function getDistributionStats(
  questions: QuestionLike[],
  type: 'math' | 'english'
): Record<string, { count: number; percentage: number; target: number }> {
  const domains = type === 'math' ? MATH_SAT_DOMAINS : ENGLISH_SAT_DOMAINS;
  const categorize = type === 'math' 
    ? (q: QuestionLike) => categorizeMathQuestion(q as Question)
    : (q: QuestionLike) => categorizeEnglishQuestion(q as EnglishQuestion);
  
  const counts: Record<string, number> = {};
  for (const domainKey of Object.keys(domains)) {
    counts[domainKey] = 0;
  }
  
  for (const q of questions) {
    const category = categorize(q);
    counts[category]++;
  }
  
  const total = questions.length;
  const stats: Record<string, { count: number; percentage: number; target: number }> = {};
  
  for (const [domainKey, domainConfig] of Object.entries(domains)) {
    stats[domainKey] = {
      count: counts[domainKey],
      percentage: total > 0 ? Math.round((counts[domainKey] / total) * 100) : 0,
      target: Math.round(domainConfig.weight * 100)
    };
  }
  
  return stats;
}
