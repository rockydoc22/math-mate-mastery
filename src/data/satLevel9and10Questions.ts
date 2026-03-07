import satEnglish9Raw from './sat_english_level9_100.json';
import satEnglish10Raw from './sat_english_level10_100.json';
import satMath9Raw from './sat_math_level9_100.json';
import satMath10Raw from './sat_math_level10_100.json';
import satEnglish9B2Raw from './sat_english_level9_100_b2.json';
import satEnglish10B2Raw from './sat_english_level10_100_b2.json';
import satMath9B2Raw from './sat_math_level9_100_b2.json';
import satMath10B2Raw from './sat_math_level10_100_b2.json';
import type { Question } from './questions';
import type { EnglishQuestion } from './englishQuestions';

interface RawJsonQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  difficulty: number;
  explanation: string;
}

const letters = ['A', 'B', 'C', 'D'];

function convertToMath(raw: RawJsonQuestion[], idPrefix = ''): Question[] {
  return raw.map(q => ({
    id: (idPrefix + q.id).toLowerCase(),
    question: q.question,
    options: letters.filter(l => q.choices[l]).map(l => ({ letter: l, text: q.choices[l] })),
    correctAnswer: q.answer,
    explanation: q.explanation,
    difficulty: 'Hard',
    domain: 'Advanced Math',
    skill: 'SAT Math',
    difficultyRating: Math.min(q.difficulty, 10),
  }));
}

function convertToEnglish(raw: RawJsonQuestion[], idPrefix = ''): EnglishQuestion[] {
  return raw.map(q => ({
    id: (idPrefix + q.id).toLowerCase(),
    question: q.question,
    options: letters.filter(l => q.choices[l]).map(l => ({ letter: l, text: q.choices[l] })),
    correctAnswer: q.answer,
    explanation: q.explanation,
    difficulty: 'Hard',
    domain: 'Standard English Conventions',
    skill: 'Grammar & Usage',
    difficultyRating: Math.min(q.difficulty, 10),
  }));
}

export const satMathLevel9Questions: Question[] = [
  ...convertToMath(satMath9Raw as RawJsonQuestion[]),
  ...convertToMath(satMath9B2Raw as RawJsonQuestion[], 'b2_'),
];
export const satMathLevel10Questions: Question[] = [
  ...convertToMath(satMath10Raw as RawJsonQuestion[]),
  ...convertToMath(satMath10B2Raw as RawJsonQuestion[], 'b2_'),
];
export const satEnglishLevel9Questions: EnglishQuestion[] = [
  ...convertToEnglish(satEnglish9Raw as RawJsonQuestion[]),
  ...convertToEnglish(satEnglish9B2Raw as RawJsonQuestion[], 'b2_'),
];
export const satEnglishLevel10Questions: EnglishQuestion[] = [
  ...convertToEnglish(satEnglish10Raw as RawJsonQuestion[]),
  ...convertToEnglish(satEnglish10B2Raw as RawJsonQuestion[], 'b2_'),
];

console.log(`[SAT Level 9/10] Math L9: ${satMathLevel9Questions.length}, Math L10: ${satMathLevel10Questions.length}, English L9: ${satEnglishLevel9Questions.length}, English L10: ${satEnglishLevel10Questions.length}`);
