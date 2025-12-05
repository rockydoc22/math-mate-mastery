import mathQuestionsRaw from './mathQuestionsRaw.json';
import { additionalMathQuestions } from './additionalMathQuestions';
import { newMathQuestions } from './newMathQuestions';

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

// Transform raw JSON questions to our Question format
const rawQuestions: Question[] = (mathQuestionsRaw as RawMathQuestion[]).map((q) => ({
  id: `math${String(q.id).padStart(3, '0')}`,
  question: q.question,
  options: [
    { letter: "A", text: q.optionA },
    { letter: "B", text: q.optionB },
    { letter: "C", text: q.optionC },
    { letter: "D", text: q.optionD }
  ],
  correctAnswer: q.correct,
  explanation: q.explanation,
  difficulty: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1),
  domain: q.category,
  skill: q.subcategory
}));

// Combine all math questions
export const questions: Question[] = [...rawQuestions, ...additionalMathQuestions, ...newMathQuestions];
