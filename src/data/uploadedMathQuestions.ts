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
  }),
  // New advanced math questions (Rating 5-8)
  addRating({
    id: "umath006",
    question: "If f(x) = x³ - 6x² + 11x - 6, what is the sum of all real roots of f(x)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "6" },
      { letter: "C", text: "11" },
      { letter: "D", text: "None of the above" }
    ],
    correctAnswer: "B",
    explanation: "The sum of roots of a cubic polynomial ax³+bx²+cx+d is -b/a. Here, a=1, b=-6, so sum = 6.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Polynomial Functions"
  }),
  addRating({
    id: "umath007",
    question: "A circle is inscribed in a square of side length 10. What is the area outside the circle but inside the square?",
    options: [
      { letter: "A", text: "25π" },
      { letter: "B", text: "100 - 25π" },
      { letter: "C", text: "100 - 50π" },
      { letter: "D", text: "50π" }
    ],
    correctAnswer: "B",
    explanation: "Square area = 100. Circle radius = 5, area = 25π. Difference = 100 - 25π.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Area and Circles"
  }),
  addRating({
    id: "umath008",
    question: "If sin(θ) + cos(θ) = √2, what is θ in degrees?",
    options: [
      { letter: "A", text: "45°" },
      { letter: "B", text: "30°" },
      { letter: "C", text: "60°" },
      { letter: "D", text: "90°" }
    ],
    correctAnswer: "A",
    explanation: "sin θ + cos θ = √2 occurs when θ = 45°, since sin 45° = cos 45° = √2/2.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Trigonometric Equations"
  }),
  addRating({
    id: "umath009",
    question: "The function g(x) = ln(x² - 4) is defined for which domain?",
    options: [
      { letter: "A", text: "x > 2" },
      { letter: "B", text: "x < -2" },
      { letter: "C", text: "x > 2 or x < -2" },
      { letter: "D", text: "All real x" }
    ],
    correctAnswer: "C",
    explanation: "For ln to be defined, x² - 4 > 0 ⇒ x² > 4 ⇒ x > 2 or x < -2.",
    difficulty: "Medium",
    domain: "Advanced Algebra",
    skill: "Functions and Domain"
  }),
  addRating({
    id: "umath010",
    question: "If a geometric sequence has first term 3 and common ratio 2, what is the 8th term?",
    options: [
      { letter: "A", text: "384" },
      { letter: "B", text: "768" },
      { letter: "C", text: "1536" },
      { letter: "D", text: "192" }
    ],
    correctAnswer: "A",
    explanation: "nth term = a·r^(n-1) = 3·2^7 = 3·128 = 384.",
    difficulty: "Medium",
    domain: "Advanced Algebra",
    skill: "Sequences"
  }),
  addRating({
    id: "umath011",
    question: "A parabola y = x² - 4x + 3 intersects the x-axis at which points?",
    options: [
      { letter: "A", text: "(1,0) and (3,0)" },
      { letter: "B", text: "(3,0) and (4,0)" },
      { letter: "C", text: "(1,0) and (4,0)" },
      { letter: "D", text: "(0,0) and (3,0)" }
    ],
    correctAnswer: "A",
    explanation: "Solve x² - 4x + 3 = 0 ⇒ (x-1)(x-3) = 0 ⇒ x = 1, 3.",
    difficulty: "Medium",
    domain: "Advanced Algebra",
    skill: "Quadratic Functions"
  }),
  addRating({
    id: "umath012",
    question: "If the derivative of h(x) = x⁴ - 8x² + 16 is zero, what are the critical points?",
    options: [
      { letter: "A", text: "x = ±2" },
      { letter: "B", text: "x = 0, ±2" },
      { letter: "C", text: "x = ±4" },
      { letter: "D", text: "x = 0, ±4" }
    ],
    correctAnswer: "B",
    explanation: "h'(x) = 4x³ - 16x = 4x(x² - 4) = 0 ⇒ x = 0, ±2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Calculus Concepts"
  }),
  addRating({
    id: "umath013",
    question: "A triangle has sides 13, 14, and 15. What is its area?",
    options: [
      { letter: "A", text: "84" },
      { letter: "B", text: "90" },
      { letter: "C", text: "91" },
      { letter: "D", text: "92" }
    ],
    correctAnswer: "A",
    explanation: "Use Heron's formula: s = (13+14+15)/2 = 21; Area = √(21·8·7·6) = √7056 = 84.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Triangle Area"
  }),
  addRating({
    id: "umath014",
    question: "If log₂(x) + log₂(x-2) = 3, what is x?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "None of the above" }
    ],
    correctAnswer: "A",
    explanation: "Combine logs: log₂[x(x-2)] = 3 ⇒ x(x-2) = 8 ⇒ x² - 2x - 8 = 0 ⇒ x = 4 (positive root).",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Logarithmic Equations"
  }),
  addRating({
    id: "umath015",
    question: "The sum of an infinite geometric series is 20 and the first term is 5. What is the common ratio?",
    options: [
      { letter: "A", text: "0.25" },
      { letter: "B", text: "0.5" },
      { letter: "C", text: "0.75" },
      { letter: "D", text: "0.2" }
    ],
    correctAnswer: "C",
    explanation: "Sum = a/(1-r) ⇒ 20 = 5/(1-r) ⇒ 1-r = 0.25 ⇒ r = 0.75.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Sequences and Series"
  })
];
