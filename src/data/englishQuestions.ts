import englishQuestionsRaw from './englishQuestionsRaw.json';
import { rateDifficulty } from '@/utils/difficultyRating';
import { uploadedEnglishQuestions } from './uploadedEnglishQuestions';

export interface EnglishQuestion {
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

interface RawEnglishQuestion {
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

// Transform raw JSON questions to our EnglishQuestion format with difficulty ratings
const baseEnglishQuestions: EnglishQuestion[] = (englishQuestionsRaw as RawEnglishQuestion[]).map((q) => {
  const options = [
    { letter: "A", text: q.optionA },
    { letter: "B", text: q.optionB },
    { letter: "C", text: q.optionC },
    { letter: "D", text: q.optionD }
  ];
  return {
    id: `eng${String(q.id).padStart(3, '0')}`,
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

// Combine all English questions
export const englishQuestions: EnglishQuestion[] = [...baseEnglishQuestions, ...uploadedEnglishQuestions];
