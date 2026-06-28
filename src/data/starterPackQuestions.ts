// Loader for sat_question_bank_starter_200.json (ChatGPT-generated original questions)
// Converts { label, text } option format → { letter, text } used throughout the app

import type { Question } from './questions';
import type { EnglishQuestion } from './englishQuestions';
import starterRaw from './sat_question_bank_starter_200.json';

interface StarterRawQuestion {
  id: string;
  exam: string;
  section: string;
  skill: string;
  difficulty: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

function difficultyLabel(d: number): string {
  if (d <= 3) return 'Easy';
  if (d <= 6) return 'Medium';
  return 'Hard';
}

function convertStarterQuestion(raw: StarterRawQuestion): Question {
  return {
    id: raw.id,
    question: raw.question,
    options: raw.options.map(o => ({ letter: o.label, text: o.text })),
    correctAnswer: raw.correctAnswer,
    explanation: raw.explanation,
    difficulty: difficultyLabel(raw.difficulty),
    domain: raw.section,
    skill: raw.skill,
    difficultyRating: raw.difficulty,
  };
}

const allStarter = (starterRaw as unknown as StarterRawQuestion[]).map(convertStarterQuestion);

// Split into Math and English/Reading pools
export const starterMathQuestions: Question[] = allStarter.filter(
  q => q.domain === 'Math'
);

export const starterEnglishQuestions: EnglishQuestion[] = allStarter.filter(
  q => q.domain !== 'Math'
);

console.log(`[Starter Pack] Loaded ${allStarter.length} questions (${starterMathQuestions.length} math, ${starterEnglishQuestions.length} english)`);
