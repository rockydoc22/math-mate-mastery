import satEnglish9Raw from './sat_english_level9_100.json';
import satEnglish10Raw from './sat_english_level10_100.json';
import satMath10Raw from './sat_math_level10_100.json';
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

function convertToMath(raw: RawJsonQuestion[]): Question[] {
  return raw.map(q => ({
    id: q.id.toLowerCase(),
    question: q.question,
    options: letters.filter(l => q.choices[l]).map(l => ({ letter: l, text: q.choices[l] })),
    correctAnswer: q.answer,
    explanation: q.explanation,
    difficulty: q.difficulty >= 9 ? 'Hard' : 'Medium',
    domain: 'Advanced Math',
    skill: 'SAT Math',
    difficultyRating: q.difficulty,
  }));
}

function convertToEnglish(raw: RawJsonQuestion[]): EnglishQuestion[] {
  return raw.map(q => ({
    id: q.id.toLowerCase(),
    question: q.question,
    options: letters.filter(l => q.choices[l]).map(l => ({ letter: l, text: q.choices[l] })),
    correctAnswer: q.answer,
    explanation: q.explanation,
    difficulty: q.difficulty >= 9 ? 'Hard' : 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Grammar & Usage',
    difficultyRating: q.difficulty,
  }));
}

export const satMathLevel10Questions: Question[] = convertToMath(satMath10Raw as RawJsonQuestion[]);
export const satEnglishLevel9Questions: EnglishQuestion[] = convertToEnglish(satEnglish9Raw as RawJsonQuestion[]);
export const satEnglishLevel10Questions: EnglishQuestion[] = convertToEnglish(satEnglish10Raw as RawJsonQuestion[]);

console.log(`[SAT Level 9/10] Math L10: ${satMathLevel10Questions.length}, English L9: ${satEnglishLevel9Questions.length}, English L10: ${satEnglishLevel10Questions.length}`);
