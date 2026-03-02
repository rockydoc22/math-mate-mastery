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

export interface PredictionTestConfig {
  testName: string; // display name e.g. "(20+20)² Prediction Test"
  testNameKatex?: string; // optional KaTeX for the name
  sections: { key: string; label: string; color: string; questionsCount: number; timeMinutes: number }[];
  maxSectionScore: number; // max per section
  penaltyPerWrong: number; // points lost per wrong answer per section
  minSectionScore: number; // floor per section
  scoringExamples: string[]; // explanatory bullets
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
  predictionTest: PredictionTestConfig;
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
      appTitle: 'The SAT App',
      heroTagline: 'Free SAT prep that actually works',
      mathTaglineKatex: '40^2 \\times \\left(\\pi + \\sum_{k=1}^{\\infty} \\frac{1}{k^2} - e\\right)',
      mathTaglineLabel: 'who crush the SAT',
    },
    predictionTest: {
      testName: '(20+20)² Prediction Test',
      sections: [
        { key: 'math', label: 'Hard Math', color: 'blue-500', questionsCount: 20, timeMinutes: 25 },
        { key: 'english', label: 'Hard English', color: 'green-500', questionsCount: 20, timeMinutes: 25 },
      ],
      maxSectionScore: 800,
      penaltyPerWrong: 30,
      minSectionScore: 200,
      scoringExamples: [
        'All correct = Predicted 1600',
        'Each wrong answer = -30 points in that section',
        'Example: 1 wrong in math = 770 Math + 800 English = 1570',
        'Math section first, then English',
      ],
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
      logoText: '39²+i²',
      logoKatex: '39^2 + i^2',
      appTitle: 'National Merit Starts Here',
      heroTagline: 'Free PSAT prep — chase the 1520',
      mathTaglineKatex: '39^2 + i^2 = 1520',
      mathTaglineLabel: 'who conquer the PSAT',
      extraMathFlair: ['1.52k'],
    },
    predictionTest: {
      testName: '(19+20)² Prediction Test',
      sections: [
        { key: 'math', label: 'Hard Math', color: 'blue-500', questionsCount: 19, timeMinutes: 24 },
        { key: 'english', label: 'Hard English', color: 'green-500', questionsCount: 20, timeMinutes: 25 },
      ],
      maxSectionScore: 760,
      penaltyPerWrong: 38,
      minSectionScore: 160,
      scoringExamples: [
        'All correct = Predicted 1520',
        'Each wrong answer = -38 points in that section',
        'Example: 1 wrong in math = 722 Math + 760 English = 1482',
        'Math section first, then English',
      ],
    },
  },
  act: {
    id: 'act',
    name: 'ACT',
    shortName: 'ACT',
    tagline: 'Destination 36',
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
      appTitle: 'The ACT App',
      heroTagline: 'The sum of everything — destination 36',
      mathTaglineKatex: '\\sum_{k=1}^{8} k',
      mathTaglineLabel: 'who dominate the ACT',
      extraMathFlair: ['3! \\times 3!', '6^2'],
    },
    predictionTest: {
      testName: '3×(2×3!) Prediction Test',
      testNameKatex: '3 \\times (2 \\times 3!)',
      sections: [
        { key: 'science', label: 'Hard Science', color: 'purple-500', questionsCount: 12, timeMinutes: 12 },
        { key: 'math', label: 'Hard Math', color: 'blue-500', questionsCount: 12, timeMinutes: 12 },
        { key: 'english', label: 'Hard English', color: 'green-500', questionsCount: 12, timeMinutes: 12 },
      ],
      maxSectionScore: 12,
      penaltyPerWrong: 1,
      minSectionScore: 1,
      scoringExamples: [
        'All correct = Predicted 36',
        'Each wrong answer = -1 point in that section',
        'Example: 1 wrong in science = 11 + 12 + 12 = 35',
        'Science first, then Math, then English',
      ],
    },
  },
};

// Convert an ELO rating to exam-specific projected TOTAL score range
// ELO range is 400-2000; map that to the exam's full score range
export function ratingToExamScore(rating: number, examType: ExamType): { min: number; max: number } {
  const config = EXAM_CONFIGS[examType];
  const clamped = Math.max(400, Math.min(2000, rating));
  const normalized = (clamped - 400) / 1600; // 0..1 across full ELO range

  if (examType === 'act') {
    const score = Math.round(1 + normalized * 35); // 1-36
    return { min: Math.max(1, score - 1), max: Math.min(36, score + 1) };
  }

  // SAT/PSAT: map to full score range
  const { min, max } = config.scoreRange;
  const range = max - min;
  const score = Math.round(min + normalized * range);
  const margin = Math.round(range * 0.03);
  return {
    min: Math.max(min, score - margin),
    max: Math.min(max, score + margin),
  };
}

// Convert an ELO rating to exam-specific projected SECTION score (per-section, not total)
// For SAT/PSAT this maps to sectionScoreRange (200-800 for SAT, 160-760 for PSAT)
// For ACT sections are on the same 1-36 scale
export function ratingToSectionScore(rating: number, examType: ExamType): number {
  const config = EXAM_CONFIGS[examType];
  const clamped = Math.max(400, Math.min(2000, rating));
  const normalized = (clamped - 400) / 1600; // 0..1

  const { min, max } = config.sectionScoreRange;
  const range = max - min;
  // Round to nearest 10 for SAT/PSAT (they report in 10-point increments)
  const raw = min + normalized * range;
  if (examType === 'act') {
    return Math.min(max, Math.max(min, Math.round(raw)));
  }
  return Math.min(max, Math.max(min, Math.round(raw / 10) * 10));
}
