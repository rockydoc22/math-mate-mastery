/**
 * Utility to fix questions that have only one option (numeric answer questions)
 * by generating plausible distractor options at runtime.
 */

interface QuestionOption {
  letter: string;
  text: string;
}

interface QuestionWithOptions {
  options: QuestionOption[];
  correctAnswer: string;
  isNumericAnswer?: boolean;
}

/**
 * Generates plausible wrong answer options for a numeric answer
 */
function generateDistractors(correctValue: string): string[] {
  const num = parseFloat(correctValue);
  
  // If it's not a valid number, return generic distractors
  if (isNaN(num)) {
    return [correctValue, "0", "1", "-1"];
  }
  
  const distractors: Set<string> = new Set();
  distractors.add(correctValue);
  
  // Common error patterns students make:
  
  // 1. Sign error (common mistake)
  if (num !== 0) {
    distractors.add(formatNumber(-num));
  }
  
  // 2. Off by common factors
  if (num !== 0) {
    distractors.add(formatNumber(num * 2));
    distractors.add(formatNumber(num / 2));
  }
  
  // 3. Off by small amounts
  distractors.add(formatNumber(num + 1));
  distractors.add(formatNumber(num - 1));
  distractors.add(formatNumber(num + 2));
  distractors.add(formatNumber(num - 2));
  
  // 4. Decimal place errors
  if (Math.abs(num) >= 10) {
    distractors.add(formatNumber(num / 10));
  }
  if (Math.abs(num) < 100) {
    distractors.add(formatNumber(num * 10));
  }
  
  // 5. Close plausible values
  if (Number.isInteger(num)) {
    distractors.add(formatNumber(num + 5));
    distractors.add(formatNumber(num - 5));
  }
  
  // Remove the correct answer and get 3 distinct distractors
  const wrongAnswers = Array.from(distractors)
    .filter(d => d !== correctValue)
    .slice(0, 3);
  
  // Ensure we have exactly 3 wrong answers
  while (wrongAnswers.length < 3) {
    const fallback = formatNumber(num + wrongAnswers.length + 10);
    if (!wrongAnswers.includes(fallback) && fallback !== correctValue) {
      wrongAnswers.push(fallback);
    }
  }
  
  return wrongAnswers.slice(0, 3);
}

/**
 * Formats a number for display (removes trailing zeros, handles decimals)
 */
function formatNumber(n: number): string {
  // Handle very small decimals
  if (Math.abs(n) < 0.01 && n !== 0) {
    return n.toFixed(4).replace(/\.?0+$/, '');
  }
  
  // Handle regular decimals
  if (!Number.isInteger(n)) {
    return n.toFixed(2).replace(/\.?0+$/, '');
  }
  
  return n.toString();
}

/**
 * Shuffles array elements deterministically based on question content
 */
function shuffleWithSeed(arr: string[], seed: number): string[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.abs((seed * (i + 1)) % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Fixes a question with only one option by adding plausible distractors
 */
export function fixSingleOptionQuestion<T extends QuestionWithOptions>(
  question: T
): T {
  // Only fix if there's exactly one option
  if (question.options.length !== 1) {
    return question;
  }
  
  const correctText = question.options[0].text;
  const distractors = generateDistractors(correctText);
  
  // Create a seed from the question content for consistent shuffling
  const seed = correctText.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Combine correct answer with distractors
  const allAnswers = [correctText, ...distractors];
  const shuffled = shuffleWithSeed(allAnswers, seed);
  
  // Find the position of the correct answer
  const correctIndex = shuffled.indexOf(correctText);
  const letters = ['A', 'B', 'C', 'D'];
  
  // Create the fixed options
  const fixedOptions: QuestionOption[] = shuffled.map((text, index) => ({
    letter: letters[index],
    text
  }));
  
  // Return the fixed question
  return {
    ...question,
    options: fixedOptions,
    correctAnswer: letters[correctIndex],
    // Remove isNumericAnswer flag since it's now multiple choice
    isNumericAnswer: undefined
  };
}

/**
 * Fixes all single-option questions in an array
 */
export function fixAllSingleOptionQuestions<T extends QuestionWithOptions>(
  questions: T[]
): T[] {
  return questions.map(fixSingleOptionQuestion);
}
