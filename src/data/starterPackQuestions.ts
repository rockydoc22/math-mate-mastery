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
  difficulty: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const difficultyMap: Record<string, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

function convertStarterQuestion(raw: StarterRawQuestion): Question {
  return {
    id: raw.id,
    question: raw.question,
    options: raw.options.map(o => ({ letter: o.label, text: o.text })),
    correctAnswer: raw.correctAnswer,
    explanation: raw.explanation,
    difficulty: raw.difficulty.charAt(0).toUpperCase() + raw.difficulty.slice(1),
    domain: raw.section,
    skill: raw.skill,
    difficultyRating: difficultyMap[raw.difficulty.toLowerCase()] ?? 6,
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
