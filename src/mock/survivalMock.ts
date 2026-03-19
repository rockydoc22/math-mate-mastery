import { Timing } from '@/components/PacingSummary';
import { SurvivalQuestion } from '@/components/SurvivalMode';

export const mockSurvivalQuestions: SurvivalQuestion[] = [
  { question: 'What is the value of x if 2x + 6 = 14?', options: ['2', '3', '4', '5'], correctIndex: 2 },
  { question: 'Which word is closest in meaning to "brief"?', options: ['long', 'short', 'angry', 'loud'], correctIndex: 1 },
  { question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correctIndex: 1 },
];

export const mockTimings: Timing[] = [
  { questionIndex: 0, timeMs: 18000, isCorrect: true },
  { questionIndex: 1, timeMs: 11200, isCorrect: false },
  { questionIndex: 2, timeMs: 134000, isCorrect: true },
  { questionIndex: 3, timeMs: 47000, isCorrect: true },
  { questionIndex: 4, timeMs: 22000, isCorrect: false },
];

export const mockTotalTimeMs = mockTimings.reduce((sum, item) => sum + item.timeMs, 0);
