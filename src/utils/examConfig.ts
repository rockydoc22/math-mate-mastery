// Exam type definitions and configuration
export type ExamType = 'sat' | 'psat' | 'act';

export interface ExamConfig {
  id: ExamType;
  name: string;
  shortName: string;
  tagline: string;
  scoreRange: { min: number; max: number };
  sectionScoreRange: { min: number; max: number };
  maxDifficulty: number;
  secondsPerQuestion: number;
  sections: string[];
  icon: string; // emoji
  color: string; // tailwind color class suffix
}

export const EXAM_CONFIGS: Record<ExamType, ExamConfig> = {
  sat: {
    id: 'sat',
    name: 'SAT',
    shortName: 'SAT',
    tagline: 'The path to 1600',
    scoreRange: { min: 400, max: 1600 },
    sectionScoreRange: { min: 200, max: 800 },
    maxDifficulty: 10,
    secondsPerQuestion: 82,
    sections: ['Math', 'English'],
    icon: '📐',
    color: 'primary',
  },
  psat: {
    id: 'psat',
    name: 'PSAT/NMSQT',
    shortName: 'PSAT',
    tagline: 'National Merit starts here',
    scoreRange: { min: 320, max: 1520 },
    sectionScoreRange: { min: 160, max: 760 },
    maxDifficulty: 8,
    secondsPerQuestion: 82,
    sections: ['Math', 'English'],
    icon: '🎯',
    color: 'blue-500',
  },
  act: {
    id: 'act',
    name: 'ACT',
    shortName: 'ACT',
    tagline: 'Target 36',
    scoreRange: { min: 1, max: 36 },
    sectionScoreRange: { min: 1, max: 36 },
    maxDifficulty: 10,
    secondsPerQuestion: 60,
    sections: ['Math', 'English', 'Reading', 'Science'],
    icon: '🧪',
    color: 'emerald-500',
  },
};

// Convert an ELO rating to exam-specific projected score
export function ratingToExamScore(rating: number, examType: ExamType): { min: number; max: number } {
  const config = EXAM_CONFIGS[examType];

  if (examType === 'act') {
    // ACT: map ELO 800-1600 → 15-36
    const normalized = Math.max(0, Math.min(1, (rating - 800) / 800));
    const score = Math.round(15 + normalized * 21);
    return { min: Math.max(1, score - 1), max: Math.min(36, score + 1) };
  }

  // SAT/PSAT: linear map from ELO
  const { min, max } = config.scoreRange;
  const range = max - min;
  const normalized = Math.max(0, Math.min(1, (rating - 800) / 800));
  const score = Math.round(min + normalized * range);
  const margin = Math.round(range * 0.03);
  return {
    min: Math.max(min, score - margin),
    max: Math.min(max, score + margin),
  };
}
