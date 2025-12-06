/**
 * Difficulty Rating System (1-10 scale)
 * 
 * Analyzes question characteristics to assign difficulty ratings:
 * - 1-3: Easy (basic formula application, simple arithmetic)
 * - 4-5: Medium (standard SAT difficulty, most current questions)
 * - 6-8: Hard (multi-step reasoning, word problems, visual interpretation)
 * - 9-10: Very Hard (complex multi-concept, advanced reasoning)
 */

interface RatingFactors {
  hasVisual: boolean;
  isWordProblem: boolean;
  questionLength: number;
  optionComplexity: number;
  domain: string;
  skill: string;
  hasMultipleSteps: boolean;
  hasVariables: boolean;
  hasExponential: boolean;
  hasSystemOfEquations: boolean;
  hasFractions: boolean;
  hasInequalities: boolean;
  requiresInterpretation: boolean;
}

function analyzeQuestion(question: string, options: { letter: string; text: string }[], domain: string, skill: string, hasVisual: boolean): RatingFactors {
  const qLower = question.toLowerCase();
  const optionsText = options.map(o => o.text).join(' ').toLowerCase();
  
  return {
    hasVisual,
    isWordProblem: /\b(company|store|sells|costs?|bought|travel|distance|time|years?|months?|barrels|tickets|paint|gallons|percent|population|bacteria|survey|researcher)\b/i.test(question),
    questionLength: question.length,
    optionComplexity: options.reduce((sum, o) => sum + o.text.length, 0) / options.length,
    domain,
    skill,
    hasMultipleSteps: /\b(then|first|after|substitut|solve for|find|what is the value)\b/i.test(question),
    hasVariables: /\b[a-z]\s*[=+\-*/]\s*[a-z]|\b[a-z]\([a-z]\)|\bf\(x\)|g\(x\)|h\(x\)/i.test(question),
    hasExponential: /\b(\d+)\^|exponential|\(\d+\.\d+\)\^[tx]|2\^x|e\^/i.test(question) || /exponential/i.test(domain),
    hasSystemOfEquations: /system|two equations|\n.*[=].*\n.*[=]/i.test(question),
    hasFractions: /\d+\/\d+|¼|½|¾|⅓|⅔|⅕|⅖|⅗|⅘/i.test(question + optionsText),
    hasInequalities: /[<>≤≥]|inequality|at least|at most|no more than|no less than/i.test(question),
    requiresInterpretation: /interpret|represent|model|best describes|which.*conclusion|based on|supported by/i.test(question),
  };
}

function calculateRating(factors: RatingFactors): number {
  let score = 4; // Base score (medium difficulty)
  
  // Visual questions add complexity
  if (factors.hasVisual) score += 1;
  
  // Word problems require comprehension
  if (factors.isWordProblem) score += 1;
  
  // Long questions are harder to parse
  if (factors.questionLength > 300) score += 1;
  if (factors.questionLength > 500) score += 1;
  
  // Complex options indicate harder problems
  if (factors.optionComplexity > 30) score += 0.5;
  if (factors.optionComplexity > 50) score += 0.5;
  
  // Domain-based adjustments
  const advancedDomains = ['advanced algebra', 'advanced math', 'geometry', 'trigonometry'];
  if (advancedDomains.some(d => factors.domain.toLowerCase().includes(d))) score += 1;
  
  // Skill-based adjustments
  const hardSkills = ['quadratic', 'exponential', 'polynomial', 'rational', 'nonlinear', 'systems'];
  if (hardSkills.some(s => factors.skill.toLowerCase().includes(s))) score += 1;
  
  // Mathematical complexity factors
  if (factors.hasMultipleSteps) score += 0.5;
  if (factors.hasVariables) score += 0.5;
  if (factors.hasExponential) score += 1;
  if (factors.hasSystemOfEquations) score += 1;
  if (factors.hasFractions) score += 0.5;
  if (factors.hasInequalities) score += 0.5;
  if (factors.requiresInterpretation) score += 0.5;
  
  // Normalize to 1-10 scale
  return Math.min(10, Math.max(1, Math.round(score)));
}

export function rateDifficulty(
  question: string,
  options: { letter: string; text: string }[],
  domain: string,
  skill: string,
  hasVisual: boolean = false
): number {
  const factors = analyzeQuestion(question, options, domain, skill, hasVisual);
  return calculateRating(factors);
}

export function getDifficultyLabel(rating: number): string {
  if (rating <= 3) return 'Easy';
  if (rating <= 5) return 'Medium';
  if (rating <= 8) return 'Hard';
  return 'Very Hard';
}

export function getDifficultyColor(rating: number): string {
  if (rating <= 3) return 'text-green-500';
  if (rating <= 5) return 'text-yellow-500';
  if (rating <= 8) return 'text-orange-500';
  return 'text-red-500';
}

export function getDifficultyBgColor(rating: number): string {
  if (rating <= 3) return 'bg-green-500/10 border-green-500/30';
  if (rating <= 5) return 'bg-yellow-500/10 border-yellow-500/30';
  if (rating <= 8) return 'bg-orange-500/10 border-orange-500/30';
  return 'bg-red-500/10 border-red-500/30';
}

export type DifficultyRange = 'all' | 'easy' | 'medium' | 'hard' | 'veryhard' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export function filterByDifficulty<T extends { difficultyRating?: number }>(
  questions: T[],
  range: DifficultyRange
): T[] {
  if (range === 'all') return questions;
  
  // Check if it's a specific number
  const specificLevel = parseInt(range);
  if (!isNaN(specificLevel) && specificLevel >= 1 && specificLevel <= 10) {
    return questions.filter(q => (q.difficultyRating || 5) === specificLevel);
  }
  
  // Range-based filtering
  return questions.filter(q => {
    const rating = q.difficultyRating || 5;
    switch (range) {
      case 'easy': return rating <= 3;
      case 'medium': return rating >= 4 && rating <= 5;
      case 'hard': return rating >= 6 && rating <= 8;
      case 'veryhard': return rating >= 9;
      default: return true;
    }
  });
}
