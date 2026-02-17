// Exam type definitions and configuration
export type ExamType = 'sat' | 'psat' | 'act';

export interface ExamBranding {
  logoText: string; // text shown inside the logo icon (e.g. "40²")
  logoKatex: string; // KaTeX expression for logo icon
  appTitle: string; // app title text
  heroTagline: string; // tagline shown below logo
  mathTaglineKatex: string; // KaTeX math tagline for dashboard
  mathTaglineLabel: string; // plain-text portion surrounding the KaTeX
  extraMathFlair?: string[]; // additional KaTeX expressions to show as decorative flair
}

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
  branding: ExamBranding;
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
    branding: {
      logoText: '40²',
      logoKatex: '40^2',
      appTitle: '1600: The SAT App',
      heroTagline: 'Free SAT prep that actually works',
      mathTaglineKatex: '40^2 \\times \\left(\\pi + \\sum_{k=1}^{\\infty} \\frac{1}{k^2} - e\\right)',
      mathTaglineLabel: 'who crush the SAT',
    },
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
    branding: {
      logoText: '39²−1',
      logoKatex: '39^2 - 1',
      appTitle: 'Index 152',
      heroTagline: 'One away from perfect — chase the 1520',
      mathTaglineKatex: '39^2 - 1 = 1520',
      mathTaglineLabel: 'who conquer the PSAT',
      extraMathFlair: ['1.52k'],
    },
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
    branding: {
      logoText: 'Σ8',
      logoKatex: '\\Sigma 8',
      appTitle: 'Σ8: The ACT App',
      heroTagline: 'The sum of everything — target 36',
      mathTaglineKatex: '\\sum_{k=1}^{8} k = 36',
      mathTaglineLabel: 'who dominate the ACT',
      extraMathFlair: ['3! \\times 3!', '6^2'],
    },
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
