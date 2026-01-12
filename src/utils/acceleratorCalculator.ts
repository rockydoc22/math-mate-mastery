/**
 * Accelerator Credit System
 * 
 * Credits reduce the total questions needed in your workplan.
 * Different activities earn different multipliers:
 * 
 * 1. Hard Questions (difficulty 10+): 1.5x credit
 * 2. Spaced Repetition Success: 1.0x to 2.0x (sliding scale based on days)
 *    - 7 days: 1.0x
 *    - 14 days: 1.5x  
 *    - 21+ days: 2.0x
 * 3. Master Your Weaknesses (correct): 1.5x
 * 4. Fight Club Participation: 1.1x per question
 * 5. Fight Club Win: 1.3x bonus on all questions
 * 6. Prediction Test (20+20): 1.5x per question + flat bonus for completion
 */

export type AcceleratorType = 
  | 'hard_question'
  | 'spaced_repetition'
  | 'master_weakness'
  | 'fight_club_participation'
  | 'fight_club_win'
  | 'prediction_test'
  | 'prediction_test_completion';

export interface AcceleratorConfig {
  type: AcceleratorType;
  baseMultiplier: number;
  description: string;
}

export const ACCELERATOR_CONFIG: Record<AcceleratorType, AcceleratorConfig> = {
  hard_question: {
    type: 'hard_question',
    baseMultiplier: 1.5,
    description: 'Hard question (difficulty 10+)',
  },
  spaced_repetition: {
    type: 'spaced_repetition',
    baseMultiplier: 1.0, // Sliding scale: 1.0x at 7 days, up to 2.0x at 21+ days
    description: 'Question mastered after review period',
  },
  master_weakness: {
    type: 'master_weakness',
    baseMultiplier: 1.5,
    description: 'Correctly answered weakness question',
  },
  fight_club_participation: {
    type: 'fight_club_participation',
    baseMultiplier: 1.1,
    description: 'Fight Club participation',
  },
  fight_club_win: {
    type: 'fight_club_win',
    baseMultiplier: 1.3,
    description: 'Fight Club victory bonus',
  },
  prediction_test: {
    type: 'prediction_test',
    baseMultiplier: 1.5,
    description: 'Prediction Test question',
  },
  prediction_test_completion: {
    type: 'prediction_test_completion',
    baseMultiplier: 1.0,
    description: 'Prediction Test completion bonus',
  },
};

// Flat bonus for completing a full prediction test
export const PREDICTION_TEST_COMPLETION_BONUS = 50; // 50 question credits

/**
 * Calculate spaced repetition multiplier based on days since first miss
 * Sliding scale: 7 days = 1.0x, 14 days = 1.5x, 21+ days = 2.0x
 */
export function getSpacedRepetitionMultiplier(daysSinceMiss: number): number {
  if (daysSinceMiss < 7) return 0; // No credit if reviewed too soon
  if (daysSinceMiss >= 21) return 2.0;
  if (daysSinceMiss >= 14) return 1.5;
  // Linear interpolation between 7-14 days (1.0 to 1.5)
  const progress = (daysSinceMiss - 7) / 7;
  return 1.0 + (progress * 0.5);
}

/**
 * Calculate credits earned for a specific action
 */
export function calculateCredits(
  type: AcceleratorType,
  baseQuestions: number = 1,
  options?: {
    daysSinceMiss?: number;
    difficultyRating?: number;
    isWin?: boolean;
  }
): { multiplier: number; credits: number } {
  let multiplier = ACCELERATOR_CONFIG[type].baseMultiplier;

  // Special handling for spaced repetition (sliding scale)
  if (type === 'spaced_repetition' && options?.daysSinceMiss !== undefined) {
    multiplier = getSpacedRepetitionMultiplier(options.daysSinceMiss);
  }

  // Bonus for extra hard questions (difficulty 12+)
  if (type === 'hard_question' && options?.difficultyRating && options.difficultyRating >= 12) {
    multiplier = 1.75; // Extra bonus for very hard
  }

  const credits = baseQuestions * multiplier;
  return { multiplier, credits };
}

/**
 * Check if a question qualifies as "hard" for accelerator bonus
 */
export function isHardQuestion(difficultyRating: number): boolean {
  return difficultyRating >= 10;
}

/**
 * Format credits for display
 */
export function formatCredits(credits: number): string {
  return credits >= 1000 
    ? `${(credits / 1000).toFixed(1)}k` 
    : credits.toFixed(credits % 1 === 0 ? 0 : 1);
}

export interface AcceleratorSummary {
  totalCredits: number;
  byType: Record<AcceleratorType, { count: number; credits: number }>;
  recentCredits: number; // Last 7 days
}

/**
 * Calculate summary of accelerator credits
 */
export function summarizeCredits(
  credits: Array<{ credit_type: string; earned_credits: number; created_at: string }>
): AcceleratorSummary {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const summary: AcceleratorSummary = {
    totalCredits: 0,
    byType: {
      hard_question: { count: 0, credits: 0 },
      spaced_repetition: { count: 0, credits: 0 },
      master_weakness: { count: 0, credits: 0 },
      fight_club_participation: { count: 0, credits: 0 },
      fight_club_win: { count: 0, credits: 0 },
      prediction_test: { count: 0, credits: 0 },
      prediction_test_completion: { count: 0, credits: 0 },
    },
    recentCredits: 0,
  };

  credits.forEach((credit) => {
    const earnedCredits = Number(credit.earned_credits);
    summary.totalCredits += earnedCredits;

    const type = credit.credit_type as AcceleratorType;
    if (summary.byType[type]) {
      summary.byType[type].count++;
      summary.byType[type].credits += earnedCredits;
    }

    if (new Date(credit.created_at) >= weekAgo) {
      summary.recentCredits += earnedCredits;
    }
  });

  return summary;
}
