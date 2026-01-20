/**
 * Shuffles the options within a question to ensure balanced A/B/C/D distribution
 * This prevents answer position bias (e.g., too many "A" correct answers)
 */

interface QuestionOption {
  letter: string;
  text: string;
}

interface ShuffleableQuestion {
  options: QuestionOption[];
  correctAnswer: string;
  [key: string]: any;
}

/**
 * Shuffles the options of a single question and updates the correctAnswer accordingly
 */
export function shuffleQuestionOptions<T extends ShuffleableQuestion>(question: T): T {
  const letters = ['A', 'B', 'C', 'D'];
  
  // Find the correct option text before shuffling
  const correctOption = question.options.find(opt => opt.letter === question.correctAnswer);
  if (!correctOption) {
    return question; // Return unchanged if correct answer not found
  }
  const correctText = correctOption.text;
  
  // Create array of option texts and shuffle
  const optionTexts = question.options.map(opt => opt.text);
  const shuffledTexts = [...optionTexts].sort(() => Math.random() - 0.5);
  
  // Create new options with shuffled order
  const newOptions: QuestionOption[] = shuffledTexts.map((text, index) => ({
    letter: letters[index],
    text
  }));
  
  // Find the new position of the correct answer
  const newCorrectLetter = newOptions.find(opt => opt.text === correctText)?.letter || question.correctAnswer;
  
  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectLetter
  };
}

/**
 * Shuffles options for an array of questions
 */
export function shuffleAllQuestionOptions<T extends ShuffleableQuestion>(questions: T[]): T[] {
  return questions.map(q => shuffleQuestionOptions(q));
}
