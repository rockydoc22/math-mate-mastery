import newMathQuestionsRaw from './newMathQuestions.json';
import { rateDifficulty } from '@/utils/difficultyRating';

export interface NewMathQuestion {
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

interface RawQuestion {
  question: string;
  choices: string[];
  correct_answer: string;
  explanation: string;
  image?: string;
}

// Extract category from question text like "[Functions] Question 1: ..."
const extractCategory = (question: string): string => {
  const match = question.match(/^\[([^\]]+)\]/);
  return match ? match[1] : 'Algebra';
};

// Clean question text by removing the category prefix
const cleanQuestion = (question: string): string => {
  return question.replace(/^\[[^\]]+\]\s*Question\s*\d+:\s*/, '');
};

// Transform raw JSON questions to our format with difficulty ratings
export const newMathQuestions: NewMathQuestion[] = (newMathQuestionsRaw as RawQuestion[]).map((q, index) => {
  const category = extractCategory(q.question);
  const letters = ['A', 'B', 'C', 'D'];
  const cleanedQuestion = cleanQuestion(q.question);
  
  // Find which letter corresponds to the correct answer
  const correctIndex = q.choices.findIndex(choice => choice === q.correct_answer);
  const correctLetter = correctIndex >= 0 ? letters[correctIndex] : 'A';
  
  const options = q.choices.map((choice, i) => ({
    letter: letters[i],
    text: choice
  }));
  
  return {
    id: `newmath${String(index + 1).padStart(3, '0')}`,
    question: cleanedQuestion,
    options,
    correctAnswer: correctLetter,
    explanation: q.explanation,
    difficulty: 'Hard',
    domain: category,
    skill: category,
    difficultyRating: rateDifficulty(cleanedQuestion, options, category, category)
  };
});
