/**
 * Elo-based Skill Rating System for SAT Mastery
 * 
 * Maps question difficulty (1-10) to Elo-style ratings
 * and calculates rating changes based on performance.
 */

// Map difficulty 1-13 to effective "opponent" rating
export function difficultyToRating(difficulty: number): number {
  // Difficulty 1 = 800 rating, Difficulty 13 = 1900 rating
  const minRating = 800;
  const maxRating = 1900;
  const clampedDifficulty = Math.max(1, Math.min(13, difficulty));
  return minRating + ((clampedDifficulty - 1) / 12) * (maxRating - minRating);
}

// Calculate expected score (probability of winning) based on rating difference
function expectedScore(playerRating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

// Calculate rating change after answering a question
export function calculateRatingChange(
  currentRating: number,
  questionDifficulty: number,
  wasCorrect: boolean,
  questionsAnswered: number
): number {
  const questionRating = difficultyToRating(questionDifficulty);
  const expected = expectedScore(currentRating, questionRating);
  const actual = wasCorrect ? 1 : 0;
  
  // K-factor decreases as more questions are answered (rating stabilizes)
  // New users: K=40, Experienced users: K=16
  const kFactor = Math.max(16, 40 - Math.floor(questionsAnswered / 25));
  
  const change = Math.round(kFactor * (actual - expected));
  return change;
}

// Calculate new rating after answering a question
export function calculateNewRating(
  currentRating: number,
  questionDifficulty: number,
  wasCorrect: boolean,
  questionsAnswered: number
): { newRating: number; change: number } {
  const change = calculateRatingChange(currentRating, questionDifficulty, wasCorrect, questionsAnswered);
  const newRating = Math.max(400, Math.min(2000, currentRating + change));
  return { newRating, change };
}

// Get skill level label based on rating
export function getSkillLevel(rating: number): {
  level: string;
  color: string;
  bgColor: string;
} {
  if (rating < 1000) {
    return { level: 'Developing', color: 'text-slate-400', bgColor: 'bg-slate-500/20' };
  } else if (rating < 1200) {
    return { level: 'Progressing', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
  } else if (rating < 1400) {
    return { level: 'Proficient', color: 'text-green-400', bgColor: 'bg-green-500/20' };
  } else if (rating < 1600) {
    return { level: 'Advanced', color: 'text-purple-400', bgColor: 'bg-purple-500/20' };
  } else {
    return { level: 'Mastery', color: 'text-amber-400', bgColor: 'bg-amber-500/20' };
  }
}

// Convert skill rating to projected SAT score range
export function ratingToSATScore(rating: number): { min: number; max: number } {
  // Map rating range (400-2000) to SAT range (400-1600)
  // with some normalization to make it more realistic
  const normalizedRating = Math.max(400, Math.min(2000, rating));
  
  // Use a slightly curved mapping
  const baseScore = 400 + ((normalizedRating - 400) / 1600) * 1200;
  const min = Math.max(400, Math.round(baseScore - 40));
  const max = Math.min(1600, Math.round(baseScore + 40));
  
  return { min, max };
}

// Format rating display with projected SAT score
export function formatRatingDisplay(rating: number): string {
  const { min, max } = ratingToSATScore(rating);
  return `${rating} (SAT: ${min}-${max})`;
}
