import englishQuestionsRaw from './englishQuestionsRaw.json';
import { rateDifficulty } from '@/utils/difficultyRating';
import { shuffleAllQuestionOptions } from '@/utils/optionShuffler';
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
import { veryHardEnglishQuestions } from './veryHardEnglishQuestions';
import { moreEnglishVisualQuestions } from './moreVisualQuestions';
import { additionalEnglishVisualQuestions } from './additionalEnglishVisualQuestions';
import { passageEnglishQuestions } from './passageEnglishQuestions';
import { satReadingQuestions } from './satReadingQuestions';
import { satHardestReadingQuestions } from './satHardestReadingQuestions';
import satEnglishMidRaw from './sat_english_midrange_200.json';

// ─── Convert midrange supplement JSON ───
interface RawMidEnglish {
  id: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  difficulty_level: number;
  stimulus_type?: string;
  stimulus?: string | null;
  domain?: string;
}

const midrangeEnglishQuestions: EnglishQuestion[] = ((satEnglishMidRaw as any).questions || []).map((q: RawMidEnglish) => {
  const letters = ['A', 'B', 'C', 'D'];
  let questionText = q.question;
  if (q.stimulus_type === 'text' && typeof q.stimulus === 'string') {
    questionText = `${q.stimulus}\n\n${q.question}`;
  }
  return {
    id: q.id.toLowerCase(),
    question: questionText,
    options: letters.filter(l => q.choices[l]).map(l => ({ letter: l, text: q.choices[l] })),
    correctAnswer: q.answer,
    explanation: q.explanation,
    difficulty: 'Medium',
    domain: q.domain || 'SAT English',
    skill: 'Grammar & Usage',
    difficultyRating: q.difficulty_level,
  };
});

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

// Combine all English questions (including visual questions for 1/3 ratio)
const allEnglishQuestions: EnglishQuestion[] = [...baseEnglishQuestions, ...uploadedEnglishQuestions, ...hardEnglishQuestions, ...satEnglishQuestions, ...additionalEnglishQuestions, ...extraEnglishQuestions, ...expertEnglishQuestions, ...mediumEnglishQuestions, ...hardEnglishQuestions2, ...satEnglishPart1Questions, ...satEnglishPart2Questions, ...veryHardEnglishQuestions, ...moreEnglishVisualQuestions, ...additionalEnglishVisualQuestions, ...passageEnglishQuestions, ...satReadingQuestions, ...satHardestReadingQuestions, ...midrangeEnglishQuestions];

// Patterns that indicate a question references an external passage that isn't provided
const passageReferencePatterns = [
  /\bthe passage\b/i,
  /\bthis passage\b/i,
  /\bthe author('s|s')?\b/i,
  /\bthe writer('s|s')?\b/i,
  /\bthe text\b/i,
  /\bthe excerpt\b/i,
  /\babove passage\b/i,
  /\bpassage above\b/i,
  /\bpassage's\b/i,
  /\baccording to the passage\b/i,
  /\bsupported by the passage\b/i,
  /\bin the passage\b/i,
  /\bfrom the passage\b/i,
];

// Check if a question references an external passage without having the passage embedded
const referencesExternalPassage = (q: EnglishQuestion): boolean => {
  const questionText = q.question.toLowerCase();
  
  // If the question text is long (>500 chars), it likely contains an embedded passage
  if (q.question.length > 500) return false;
  
  // Check if question references a passage
  const hasPassageReference = passageReferencePatterns.some(pattern => pattern.test(q.question));
  
  // If no passage reference, it's fine
  if (!hasPassageReference) return false;
  
  // Questions with passage references but short text = external passage (exclude)
  return true;
};

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

// Filter out external passage references, duplicates, and cap difficulty at 10
const filteredQuestions = allEnglishQuestions
  .filter(q => !duplicateEnglishIds.has(q.id))
  .filter(q => !referencesExternalPassage(q));

export const englishQuestions: EnglishQuestion[] = shuffleAllQuestionOptions(
  filteredQuestions.map(q => ({
    ...q,
    difficultyRating: q.difficultyRating ? Math.min(q.difficultyRating, 10) : q.difficultyRating
  }))
);

// Calculate difficulty distribution
const difficultyDistribution: Record<number, number> = {};
for (let i = 1; i <= 10; i++) difficultyDistribution[i] = 0;
for (const q of englishQuestions) {
  const level = q.difficultyRating || 5; // Default to 5 if not set
  if (level >= 1 && level <= 10) {
    difficultyDistribution[level]++;
  }
}

// Count questions with embedded passages (long text that references passage)
const withEmbeddedPassages = englishQuestions.filter(q => {
  const hasPassageRef = passageReferencePatterns.some(p => p.test(q.question));
  return hasPassageRef && q.question.length > 500;
}).length;

// Export counts for reporting
export const englishQuestionStats = {
  totalBeforeFilters: allEnglishQuestions.length,
  removedAsDuplicates: duplicateEnglishIds.size,
  removedAsExternalPassage: allEnglishQuestions.filter(q => !duplicateEnglishIds.has(q.id)).length - filteredQuestions.length,
  finalCount: englishQuestions.length,
  withEmbeddedPassages,
  difficultyDistribution
};

// Log stats during development for visibility
console.log('[English Questions] Stats:', englishQuestionStats);
console.log('[English Questions] Difficulty Distribution:', difficultyDistribution);
console.log('[English Questions] With Embedded Passages:', withEmbeddedPassages);
