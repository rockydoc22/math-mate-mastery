/**
 * SAT Workplan Calculator
 * 
 * Uses a linear model with difficulty multipliers:
 * - Base: 10 questions per point improvement
 * - 1.5x multiplier for scores above 1400
 * - 2x multiplier for scores above 1500
 * - Practice tests count as 150 questions each
 */

export interface WorkplanEstimate {
  totalQuestionsNeeded: number;
  recommendedPracticeTests: number;
  questionsExcludingTests: number;
  weeklyQuestionsNeeded: number;
  dailyQuestionsNeeded: number;
  estimatedWeeksNeeded: number;
  breakdown: {
    range: string;
    points: number;
    multiplier: number;
    questions: number;
  }[];
}

const BASE_QUESTIONS_PER_POINT = 10;
const MULTIPLIER_ABOVE_1400 = 1.5;
const MULTIPLIER_ABOVE_1500 = 2.0;
const QUESTIONS_PER_PRACTICE_TEST = 150;

/**
 * Calculate questions needed for a specific score range
 */
function calculateQuestionsForRange(
  startScore: number,
  endScore: number,
  rangeFloor: number,
  rangeCeiling: number,
  multiplier: number
): { points: number; questions: number } {
  const rangeStart = Math.max(startScore, rangeFloor);
  const rangeEnd = Math.min(endScore, rangeCeiling);
  
  if (rangeStart >= rangeEnd) {
    return { points: 0, questions: 0 };
  }
  
  const points = rangeEnd - rangeStart;
  const questions = Math.ceil(points * BASE_QUESTIONS_PER_POINT * multiplier);
  
  return { points, questions };
}

/**
 * Calculate the full workplan estimate
 */
export function calculateWorkplan(
  startingScore: number,
  targetScore: number,
  weeksUntilExam: number,
  dailyMinutes: number = 30
): WorkplanEstimate {
  // Clamp scores to valid SAT range
  const start = Math.max(400, Math.min(1600, startingScore));
  const target = Math.max(start, Math.min(1600, targetScore));
  
  const breakdown: WorkplanEstimate['breakdown'] = [];
  
  // Calculate for each difficulty band
  // Band 1: 400-1400 (base rate)
  const band1 = calculateQuestionsForRange(start, target, 400, 1400, 1.0);
  if (band1.points > 0) {
    breakdown.push({
      range: `${Math.max(start, 400)}-${Math.min(target, 1400)}`,
      points: band1.points,
      multiplier: 1.0,
      questions: band1.questions,
    });
  }
  
  // Band 2: 1400-1500 (1.5x multiplier)
  const band2 = calculateQuestionsForRange(start, target, 1400, 1500, MULTIPLIER_ABOVE_1400);
  if (band2.points > 0) {
    breakdown.push({
      range: `${Math.max(start, 1400)}-${Math.min(target, 1500)}`,
      points: band2.points,
      multiplier: MULTIPLIER_ABOVE_1400,
      questions: band2.questions,
    });
  }
  
  // Band 3: 1500-1600 (2x multiplier)
  const band3 = calculateQuestionsForRange(start, target, 1500, 1600, MULTIPLIER_ABOVE_1500);
  if (band3.points > 0) {
    breakdown.push({
      range: `${Math.max(start, 1500)}-${Math.min(target, 1600)}`,
      points: band3.points,
      multiplier: MULTIPLIER_ABOVE_1500,
      questions: band3.questions,
    });
  }
  
  const totalQuestionsNeeded = band1.questions + band2.questions + band3.questions;
  
  // Recommend 1 practice test per 2 weeks, minimum 2, maximum based on time
  const recommendedPracticeTests = Math.max(2, Math.min(Math.floor(weeksUntilExam / 2), 10));
  const questionsFromTests = recommendedPracticeTests * QUESTIONS_PER_PRACTICE_TEST;
  const questionsExcludingTests = Math.max(0, totalQuestionsNeeded - questionsFromTests);
  
  // Calculate weekly/daily requirements
  const effectiveWeeks = Math.max(1, weeksUntilExam);
  const weeklyQuestionsNeeded = Math.ceil(questionsExcludingTests / effectiveWeeks);
  const dailyQuestionsNeeded = Math.ceil(weeklyQuestionsNeeded / 6); // 6 days per week, 1 rest day
  
  // Estimate weeks needed at current pace (assuming ~2 min per question)
  const questionsPerDay = Math.floor(dailyMinutes / 2);
  const questionsPerWeek = questionsPerDay * 6;
  const estimatedWeeksNeeded = questionsPerWeek > 0 
    ? Math.ceil(totalQuestionsNeeded / questionsPerWeek)
    : weeksUntilExam;
  
  return {
    totalQuestionsNeeded,
    recommendedPracticeTests,
    questionsExcludingTests,
    weeklyQuestionsNeeded,
    dailyQuestionsNeeded,
    estimatedWeeksNeeded,
    breakdown,
  };
}

/**
 * Format the workplan as a readable summary
 */
export function formatWorkplanSummary(estimate: WorkplanEstimate): string {
  return `You need approximately ${estimate.totalQuestionsNeeded.toLocaleString()} questions total, ` +
    `including ${estimate.recommendedPracticeTests} practice tests. ` +
    `That's about ${estimate.dailyQuestionsNeeded} questions per day.`;
}
