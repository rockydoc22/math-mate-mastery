/**
 * Elite Practice Tiers - Score-based difficulty and pacing configurations
 */

export interface EliteTier {
  id: string;
  name: string;
  scoreRange: { min: number; max: number };
  difficultyRange: { min: number; max: number };
  pacingThresholdMs: number; // When to show pacing alert
  pacingDangerMs: number; // When to strongly suggest skip
  features: string[];
  description: string;
  color: string;
  bgColor: string;
}

export const ELITE_TIERS: EliteTier[] = [
  {
    id: '1600_club',
    name: '1600 Club',
    scoreRange: { min: 1500, max: 1600 },
    difficultyRange: { min: 12, max: 13 },
    pacingThresholdMs: 45000, // 45 seconds
    pacingDangerMs: 60000, // 60 seconds
    features: [
      'ONLY difficulty 12-13 questions',
      '45-second pacing alerts',
      '"What are you solving for?" prompts',
      'Deep Review: explain all wrong answers',
      'Personal Rulebook integration',
    ],
    description: 'For 1500+ scorers chasing perfection',
    color: 'text-amber-400',
    bgColor: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'elite_1500',
    name: 'Elite 1500',
    scoreRange: { min: 1400, max: 1500 },
    difficultyRange: { min: 10, max: 12 },
    pacingThresholdMs: 55000, // 55 seconds
    pacingDangerMs: 75000, // 75 seconds
    features: [
      'Difficulty 10-12 questions',
      '55-second pacing alerts',
      'Focus on interpretation errors',
      'Deep Review mode',
      'Pattern tracking',
    ],
    description: 'Breaking into the 1500s',
    color: 'text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'breakthrough_1400',
    name: 'Breakthrough 1400',
    scoreRange: { min: 1300, max: 1400 },
    difficultyRange: { min: 8, max: 11 },
    pacingThresholdMs: 65000, // 65 seconds
    pacingDangerMs: 90000, // 90 seconds
    features: [
      'Difficulty 8-11 questions',
      '65-second pacing alerts',
      'Core concept reinforcement',
      'Error pattern identification',
      'Topic mastery tracking',
    ],
    description: 'Building towards 1400+',
    color: 'text-blue-400',
    bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
  },
];

export function getTierForScore(score: number): EliteTier | null {
  return ELITE_TIERS.find(
    tier => score >= tier.scoreRange.min && score <= tier.scoreRange.max
  ) || null;
}

export function getTierById(tierId: string): EliteTier | null {
  return ELITE_TIERS.find(tier => tier.id === tierId) || null;
}

// Deep Review prompts for explaining wrong answers
export const DEEP_REVIEW_PROMPTS = [
  "Why is this answer wrong?",
  "What trap does this answer set?",
  "How would you eliminate this choice?",
];
