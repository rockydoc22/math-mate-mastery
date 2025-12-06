import { Question } from './questions';
import { rateDifficulty } from '@/utils/difficultyRating';

// Helper to add difficulty ratings
function addRating(q: Omit<Question, 'difficultyRating'>): Question {
  return {
    ...q,
    difficultyRating: rateDifficulty(q.question, q.options, q.domain, q.skill)
  };
}

// Uploaded Math questions from HTML files
export const uploadedMathQuestions: Question[] = [
  // Question 1: Quadratic minimum (vertex formula) - Rating ~6 (multi-step, algebra)
  addRating({
    id: "umath001",
    question: "If f(x) = x² - 4x + 3, what is the minimum value of f(x)?",
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "The vertex of the parabola occurs at x = -b/(2a) = 4/2 = 2. f(2) = 4 - 8 + 3 = -1.",
    difficulty: "Medium",
    domain: "Advanced Algebra",
    skill: "Quadratic Functions"
  }),
  // Question 2: Circle radius (distance formula) - Rating ~5 (geometry, formula application)
  addRating({
    id: "umath002",
    question: "A circle has center at (0,0) and passes through (3,4). What is its radius?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "C",
    explanation: "Radius = distance from center to point = √(3² + 4²) = √(9 + 16) = √25 = 5.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Circles and Distance"
  }),
  // Question 3: Exponential equation - Rating ~4 (basic exponential recognition)
  addRating({
    id: "umath003",
    question: "Solve for x: 2^x = 32.",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "B",
    explanation: "32 = 2⁵, so x = 5.",
    difficulty: "Easy",
    domain: "Algebra",
    skill: "Exponential Equations"
  }),
  // Question 4: Trigonometry identity - Rating ~6 (trig, Pythagorean identity)
  addRating({
    id: "umath004",
    question: "If sin θ = 3/5 and θ is acute, what is cos θ?",
    options: [
      { letter: "A", text: "4/5" },
      { letter: "B", text: "3/4" },
      { letter: "C", text: "5/3" },
      { letter: "D", text: "1/2" }
    ],
    correctAnswer: "A",
    explanation: "sin²θ + cos²θ = 1, so cos θ = √(1 - (3/5)²) = √(1 - 9/25) = √(16/25) = 4/5.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Trigonometric Identities"
  }),
  // Question 5: Line-parabola intersection (Vieta's formulas) - Rating ~7 (multi-step, advanced)
  addRating({
    id: "umath005",
    question: "The line y = 2x + 1 intersects the parabola y = x² at two points. Find the sum of their x-coordinates.",
    options: [
      { letter: "A", text: "-2" },
      { letter: "B", text: "0" },
      { letter: "C", text: "2" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "C",
    explanation: "Set x² = 2x + 1 → x² - 2x - 1 = 0. By Vieta's formulas, sum of roots = -(-2)/1 = 2.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Systems of Equations"
  })
];
