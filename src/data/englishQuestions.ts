import englishQuestionsRaw from './englishQuestionsRaw.json';
import { rateDifficulty } from '@/utils/difficultyRating';
import { uploadedEnglishQuestions } from './uploadedEnglishQuestions';
import { hardEnglishQuestions } from './hardEnglishQuestions';
import { satEnglishQuestions } from './satEnglishQuestions';
import { additionalEnglishQuestions } from './additionalEnglishQuestions';
import { extraEnglishQuestions } from './extraEnglishQuestions';
import { expertEnglishQuestions } from './expertEnglishQuestions';
import { mediumEnglishQuestions } from './mediumEnglishQuestions';
import { hardEnglishQuestions2 } from './hardEnglishQuestions2';
import { satEnglishPart1Questions } from './satEnglishPart1Questions';
import { satEnglishPart2Questions } from './satEnglishPart2Questions';

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
const allEnglishQuestions: EnglishQuestion[] = [...baseEnglishQuestions, ...uploadedEnglishQuestions, ...hardEnglishQuestions, ...satEnglishQuestions, ...additionalEnglishQuestions, ...extraEnglishQuestions, ...expertEnglishQuestions, ...mediumEnglishQuestions, ...hardEnglishQuestions2, ...satEnglishPart1Questions, ...satEnglishPart2Questions];

// Remove duplicate questions (keeps first occurrence of each)
// Uses full normalized question text for more accurate duplicate detection
const seenEnglishQuestions = new Map<string, string>(); // Map normalized text to first ID
const duplicateEnglishIds = new Set<string>();

for (const q of allEnglishQuestions) {
  // Normalize question text for comparison - use FULL text, not truncated
  const normalizedText = q.question
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  
  if (seenEnglishQuestions.has(normalizedText)) {
    duplicateEnglishIds.add(q.id);
  } else {
    seenEnglishQuestions.set(normalizedText, q.id);
  }
}

export const englishQuestions: EnglishQuestion[] = allEnglishQuestions.filter(q => !duplicateEnglishIds.has(q.id));

// Export counts for reporting
export const englishQuestionStats = {
  totalBeforeFilters: allEnglishQuestions.length,
  removedAsDuplicates: allEnglishQuestions.length - englishQuestions.length,
  finalCount: englishQuestions.length
};
