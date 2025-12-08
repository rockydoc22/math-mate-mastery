/**
 * Difficulty Rating System (1-13 scale)
 * 
 * Analyzes question characteristics to assign difficulty ratings:
 * - 1-3: Easy (basic formula application, simple arithmetic)
 * - 4-6: Medium (standard SAT difficulty)
 * - 7-8: Hard (multi-step reasoning, word problems)
 * - 9-10: Very Hard (complex multi-concept, advanced reasoning)
 * - 11: Titan (extreme difficulty)
 * - 12: Savant (near impossible)
 * - 13: Insane (ultimate challenge)
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
  let score = 0;
  
  // Base complexity from question length
  if (factors.questionLength < 80) score += 0.5;
  else if (factors.questionLength < 120) score += 1;
  else if (factors.questionLength < 180) score += 2;
  else if (factors.questionLength < 250) score += 3;
  else if (factors.questionLength < 350) score += 4;
  else if (factors.questionLength < 450) score += 5;
  else score += 6;
  
  // Visual questions add complexity
  if (factors.hasVisual) score += 1.5;
  
  // Word problems require comprehension
  if (factors.isWordProblem) score += 1.5;
  
  // Complex options indicate harder problems
  if (factors.optionComplexity > 25) score += 0.5;
  if (factors.optionComplexity > 45) score += 0.5;
  if (factors.optionComplexity > 70) score += 0.5;
  
  // Domain-based adjustments
  const advancedDomains = ['advanced algebra', 'advanced math', 'trigonometry'];
  const moderateDomains = ['geometry', 'problem solving'];
  if (advancedDomains.some(d => factors.domain.toLowerCase().includes(d))) score += 1.5;
  else if (moderateDomains.some(d => factors.domain.toLowerCase().includes(d))) score += 0.75;
  
  // Basic domains reduce difficulty
  const basicDomains = ['linear equations', 'heart of algebra'];
  const veryBasicDomains = ['arithmetic', 'basic'];
  if (veryBasicDomains.some(d => factors.domain.toLowerCase().includes(d))) score -= 1.5;
  else if (basicDomains.some(d => factors.domain.toLowerCase().includes(d)) && !factors.hasVisual && !factors.isWordProblem) score -= 1;
  
  // Skill-based adjustments
  const veryHardSkills = ['quadratic', 'exponential', 'polynomial', 'nonlinear'];
  const hardSkills = ['rational', 'systems', 'radical'];
  const moderateSkills = ['inequalities', 'absolute'];
  
  if (veryHardSkills.some(s => factors.skill.toLowerCase().includes(s))) score += 1.5;
  else if (hardSkills.some(s => factors.skill.toLowerCase().includes(s))) score += 1;
  else if (moderateSkills.some(s => factors.skill.toLowerCase().includes(s))) score += 0.5;
  
  // Easy skills
  const veryEasySkills = ['simple', 'basic', 'one-variable'];
  const easySkills = ['linear', 'slope'];
  if (veryEasySkills.some(s => factors.skill.toLowerCase().includes(s))) score -= 1;
  else if (easySkills.some(s => factors.skill.toLowerCase().includes(s)) && !factors.hasMultipleSteps) score -= 0.5;
  
  // Mathematical complexity factors
  if (factors.hasMultipleSteps) score += 0.75;
  if (factors.hasVariables) score += 0.5;
  if (factors.hasExponential) score += 1.5;
  if (factors.hasSystemOfEquations) score += 1.5;
  if (factors.hasFractions) score += 0.5;
  if (factors.hasInequalities) score += 0.75;
  if (factors.requiresInterpretation) score += 0.75;
  
  // Apply redistribution
  const hash = factors.questionLength % 10;
  const hash2 = (factors.questionLength + factors.optionComplexity) % 10;
  
  if (score >= 1.5 && score < 2.5 && hash < 4) score -= 0.6;
  if (score >= 2.5 && score < 3.5 && hash >= 5) score += 0.6;
  if (score >= 4.5 && score < 5.5 && hash < 3) score -= 0.6;
  if (score >= 4.5 && score < 5.5 && hash >= 6) score += 0.6;
  if (score >= 5.5 && score < 6.5 && hash2 >= 5) score += 0.6;
  if (score >= 7.5 && score < 8.5 && hash2 < 4) score -= 0.6;
  
  // Get base 1-10 rating
  const baseRating = Math.min(10, Math.max(1, Math.round(score)));
  
  // Remap levels: 5→7, 6→9, 7→10, 8→11, 9→12, 10→13
  return remapDifficulty(baseRating);
}

// Remap old difficulty levels to new scale
function remapDifficulty(oldRating: number): number {
  const mapping: Record<number, number> = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 7,
    6: 9,
    7: 10,
    8: 11,
    9: 12,
    10: 13
  };
  return mapping[oldRating] || oldRating;
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
  if (rating <= 6) return 'Medium';
  if (rating <= 8) return 'Hard';
  if (rating <= 10) return 'Very Hard';
  if (rating === 11) return 'Titan';
  if (rating === 12) return 'Savant';
  return 'Insane';
}

export function getDifficultyColor(rating: number): string {
  if (rating <= 3) return 'text-green-500';
  if (rating <= 6) return 'text-yellow-500';
  if (rating <= 8) return 'text-orange-500';
  if (rating <= 10) return 'text-red-500';
  if (rating === 11) return 'text-purple-500';
  if (rating === 12) return 'text-pink-500';
  return 'text-fuchsia-500';
}

export function getDifficultyBgColor(rating: number): string {
  if (rating <= 3) return 'bg-green-500/10 border-green-500/30';
  if (rating <= 6) return 'bg-yellow-500/10 border-yellow-500/30';
  if (rating <= 8) return 'bg-orange-500/10 border-orange-500/30';
  if (rating <= 10) return 'bg-red-500/10 border-red-500/30';
  if (rating === 11) return 'bg-purple-500/10 border-purple-500/30';
  if (rating === 12) return 'bg-pink-500/10 border-pink-500/30';
  return 'bg-fuchsia-500/10 border-fuchsia-500/30';
}

export type DifficultyRange = 'all' | 'easy' | 'medium' | 'hard' | 'veryhard' | 'titan' | 'savant' | 'insane' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';

export function filterByDifficulty<T extends { difficultyRating?: number }>(
  questions: T[],
  range: DifficultyRange
): T[] {
  if (range === 'all') return questions;
  
  // Check if it's a specific number
  const specificLevel = parseInt(range);
  if (!isNaN(specificLevel) && specificLevel >= 1 && specificLevel <= 13) {
    return questions.filter(q => (q.difficultyRating || 5) === specificLevel);
  }
  
  // Range-based filtering
  return questions.filter(q => {
    const rating = q.difficultyRating || 5;
    switch (range) {
      case 'easy': return rating <= 3;
      case 'medium': return rating >= 4 && rating <= 6;
      case 'hard': return rating >= 7 && rating <= 8;
      case 'veryhard': return rating >= 9 && rating <= 10;
      case 'titan': return rating === 11;
      case 'savant': return rating === 12;
      case 'insane': return rating === 13;
      default: return true;
    }
  });
}
