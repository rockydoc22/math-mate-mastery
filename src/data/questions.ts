import mathQuestionsRaw from './mathQuestionsRaw.json';
import { additionalMathQuestions } from './additionalMathQuestions';
import { newMathQuestions } from './newMathQuestions';
import { uploadedMathQuestions } from './uploadedMathQuestions';
import { hardMathQuestions } from './hardMathQuestions';
import { importedSATMathQuestions as rawImportedSAT1 } from './importedSATQuestions';
import { importedSATMathQuestions2 as rawImportedSAT2 } from './importedSATQuestions2';
import { importedSATMathQuestions3 as rawImportedSAT3 } from './importedSATQuestions3';
import { importedSATMathQuestions4 as rawImportedSAT4 } from './importedSATQuestions4';
import { importedSATMathQuestions5 as rawImportedSAT5 } from './importedSATQuestions5';
import { importedSATMathQuestions6 as rawImportedSAT6 } from './importedSATQuestions6';
import { importedSATMathQuestions7 as rawImportedSAT7 } from './importedSATQuestions7';
import { importedSATMathQuestions8 as rawImportedSAT8 } from './importedSATQuestions8';
import { importedSATMathQuestions9 as rawImportedSAT9 } from './importedSATQuestions9';
import { importedSATMathQuestions10 as rawImportedSAT10 } from './importedSATQuestions10';
import { importedSATMathQuestions11 as rawImportedSAT11 } from './importedSATQuestions11';
import { importedSATMathQuestions12 as rawImportedSAT12 } from './importedSATQuestions12';
import { level8QuestionsExtra } from './level8QuestionsExtra';
import { pdfSATMathQuestions } from './pdfSATQuestions';
import { allLevelQuestions } from './allLevelQuestions';
import { allFillerQuestions } from './levelFillerQuestions';
import { balancedMathQuestions } from './balancedMathQuestions';
import { mediumMathQuestions } from './mediumMathQuestions';
import { mediumMathQuestions2 } from './mediumMathQuestions2';
import { rateDifficulty } from '@/utils/difficultyRating';
import { fixAllSingleOptionQuestions } from '@/utils/questionOptionsFixer';

// Fix single-option questions in all SAT batches
const importedSATMathQuestions = fixAllSingleOptionQuestions(rawImportedSAT1);
const importedSATMathQuestions2 = fixAllSingleOptionQuestions(rawImportedSAT2);
const importedSATMathQuestions3 = fixAllSingleOptionQuestions(rawImportedSAT3);
const importedSATMathQuestions4 = fixAllSingleOptionQuestions(rawImportedSAT4);
const importedSATMathQuestions5 = fixAllSingleOptionQuestions(rawImportedSAT5);
const importedSATMathQuestions6 = fixAllSingleOptionQuestions(rawImportedSAT6);
const importedSATMathQuestions7 = fixAllSingleOptionQuestions(rawImportedSAT7);
const importedSATMathQuestions8 = fixAllSingleOptionQuestions(rawImportedSAT8);
const importedSATMathQuestions9 = fixAllSingleOptionQuestions(rawImportedSAT9);
const importedSATMathQuestions10 = fixAllSingleOptionQuestions(rawImportedSAT10);
const importedSATMathQuestions11 = fixAllSingleOptionQuestions(rawImportedSAT11);
const importedSATMathQuestions12 = fixAllSingleOptionQuestions(rawImportedSAT12);

// Re-export for backward compatibility
export { importedSATMathQuestions };

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
  imageUrl?: string;
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

// Combine all math questions and filter out any with images (to avoid showing College Board branding)
const allMathQuestions: Question[] = [...rawQuestions, ...additionalMathQuestions, ...newMathQuestions, ...uploadedMathQuestions, ...hardMathQuestions, ...importedSATMathQuestions, ...importedSATMathQuestions2, ...importedSATMathQuestions3, ...importedSATMathQuestions4, ...importedSATMathQuestions5, ...importedSATMathQuestions6, ...importedSATMathQuestions7, ...importedSATMathQuestions8, ...importedSATMathQuestions9, ...importedSATMathQuestions10, ...importedSATMathQuestions11, ...importedSATMathQuestions12, ...level8QuestionsExtra, ...pdfSATMathQuestions, ...allFillerQuestions, ...allLevelQuestions, ...balancedMathQuestions, ...mediumMathQuestions, ...mediumMathQuestions2];

// Filter out questions with images to prevent showing original source branding
export const questions: Question[] = allMathQuestions.filter(q => !q.imageUrl);
