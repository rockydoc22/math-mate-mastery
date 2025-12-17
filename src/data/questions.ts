import mathQuestionsRaw from './mathQuestionsRaw.json';
import { additionalMathQuestions } from './additionalMathQuestions';
import { newMathQuestions } from './newMathQuestions';
import { uploadedMathQuestions } from './uploadedMathQuestions';
import { hardMathQuestions } from './hardMathQuestions';
import { importedSATMathQuestions } from './importedSATQuestions';
import { importedSATMathQuestions2 } from './importedSATQuestions2';
import { importedSATMathQuestions3 } from './importedSATQuestions3';
import { rateDifficulty } from '@/utils/difficultyRating';

export interface Question {
  id: string;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  domain: string;
  skill: string;
  difficultyRating?: number;
}

interface RawMathQuestion {
  id: number;
  category: string;
  subcategory: string;
  difficulty: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
  explanation: string;
}

// Transform raw JSON questions to our Question format with difficulty ratings
const rawQuestions: Question[] = (mathQuestionsRaw as RawMathQuestion[]).map((q) => {
  const options = [
    { letter: "A", text: q.optionA },
    { letter: "B", text: q.optionB },
    { letter: "C", text: q.optionC },
    { letter: "D", text: q.optionD }
  ];
  return {
    id: `math${String(q.id).padStart(3, '0')}`,
    question: q.question,
    options,
    correctAnswer: q.correct,
    explanation: q.explanation,
    difficulty: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1),
    domain: q.category,
    skill: q.subcategory,
    difficultyRating: rateDifficulty(q.question, options, q.category, q.subcategory)
  };
});

// Combine all math questions
export const questions: Question[] = [...rawQuestions, ...additionalMathQuestions, ...newMathQuestions, ...uploadedMathQuestions, ...hardMathQuestions, ...importedSATMathQuestions, ...importedSATMathQuestions2, ...importedSATMathQuestions3];
