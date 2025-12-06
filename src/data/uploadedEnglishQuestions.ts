import { EnglishQuestion } from './englishQuestions';
import { rateDifficulty } from '@/utils/difficultyRating';

// Helper to add difficulty ratings
function addRating(q: Omit<EnglishQuestion, 'difficultyRating'>): EnglishQuestion {
  return {
    ...q,
    difficultyRating: rateDifficulty(q.question, q.options, q.domain, q.skill)
  };
}

// Uploaded English questions from HTML files
export const uploadedEnglishQuestions: EnglishQuestion[] = [
  addRating({
    id: "ueng001",
    question: "Which sentence best maintains parallel structure?",
    options: [
      { letter: "A", text: "She likes running, to swim, and biking." },
      { letter: "B", text: "She likes to run, to swim, and to bike." },
      { letter: "C", text: "She likes running, swimming, and to bike." },
      { letter: "D", text: "She likes to run, swimming, and biking." }
    ],
    correctAnswer: "B",
    explanation: "Parallel structure requires consistent grammatical forms. Option B uses 'to + verb' consistently for all three activities.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Parallel Structure"
  }),
  addRating({
    id: "ueng002",
    question: "Based on the table, which word best fits the context?",
    options: [
      { letter: "A", text: "elated" },
      { letter: "B", text: "melancholy" },
      { letter: "C", text: "neutral" },
      { letter: "D", text: "furious" }
    ],
    correctAnswer: "A",
    explanation: "The tone in the passage is positive and joyful. 'Elated' means extremely happy, which matches the positive context.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Vocabulary in Context"
  }),
  addRating({
    id: "ueng003",
    question: "Which revision improves sentence clarity?",
    options: [
      { letter: "A", text: "Due to the fact that he was late, he missed the bus." },
      { letter: "B", text: "Because he was late, he missed the bus." },
      { letter: "C", text: "He missed the bus because of his lateness." },
      { letter: "D", text: "He was late, therefore he missed the bus." }
    ],
    correctAnswer: "B",
    explanation: "Concise wording improves clarity. 'Because' is more direct than 'Due to the fact that' and the sentence structure is cleaner.",
    difficulty: "Easy",
    domain: "Writing",
    skill: "Concision"
  }),
  addRating({
    id: "ueng004",
    question: "Which choice best completes the sentence logically?",
    options: [
      { letter: "A", text: "Although the data were inconclusive," },
      { letter: "B", text: "Because the data were inconclusive," },
      { letter: "C", text: "Since the data were conclusive," },
      { letter: "D", text: "Despite the data being conclusive," }
    ],
    correctAnswer: "A",
    explanation: "The sentence suggests a contrast. 'Although' introduces a contrasting idea, indicating the action proceeded despite the inconclusive data.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Transitions"
  }),
  addRating({
    id: "ueng005",
    question: "Which sentence uses correct subject-verb agreement?",
    options: [
      { letter: "A", text: "The list of items are on the desk." },
      { letter: "B", text: "The list of items is on the desk." },
      { letter: "C", text: "The items in the list is on the desk." },
      { letter: "D", text: "The items in the list has been on the desk." }
    ],
    correctAnswer: "B",
    explanation: "The subject is 'list,' which is singular. Therefore, the singular verb 'is' must be used, not the plural 'are.'",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Subject-Verb Agreement"
  })
];
