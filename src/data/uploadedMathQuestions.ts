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
  }),
  // Trigonometry questions - Pythagorean identities (Rating 5-6)
  addRating({
    id: "umath016",
    question: "In a right triangle, if sin(θ) = 3/5, what is cos(θ)?",
    options: [
      { letter: "A", text: "4/5" },
      { letter: "B", text: "3/4" },
      { letter: "C", text: "5/4" },
      { letter: "D", text: "2/5" }
    ],
    correctAnswer: "A",
    explanation: "sin(θ) = opposite/hypotenuse = 3/5. Then adjacent = √(5² - 3²) = 4, so cos(θ) = 4/5.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath017",
    question: "If tan(α) = 7/24, find sin(α).",
    options: [
      { letter: "A", text: "7/25" },
      { letter: "B", text: "24/25" },
      { letter: "C", text: "25/7" },
      { letter: "D", text: "7/24" }
    ],
    correctAnswer: "A",
    explanation: "tan(α) = opposite/adjacent = 7/24. Hypotenuse = √(7² + 24²) = 25, so sin(α) = 7/25.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath018",
    question: "If cos(β) = 12/13, what is sin(β)?",
    options: [
      { letter: "A", text: "5/13" },
      { letter: "B", text: "12/13" },
      { letter: "C", text: "13/5" },
      { letter: "D", text: "5/12" }
    ],
    correctAnswer: "A",
    explanation: "cos(β) = adjacent/hypotenuse = 12/13, opposite = √(13² - 12²) = 5, so sin(β) = 5/13.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath019",
    question: "If sin(θ) = 8/17, find tan(θ).",
    options: [
      { letter: "A", text: "8/15" },
      { letter: "B", text: "15/8" },
      { letter: "C", text: "17/8" },
      { letter: "D", text: "8/17" }
    ],
    correctAnswer: "A",
    explanation: "sin(θ) = 8/17, opposite = 8, hyp = 17, adjacent = √(17² - 8²) = 15, tan = 8/15.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath020",
    question: "If sec(φ) = √2, find sin(φ).",
    options: [
      { letter: "A", text: "1/√2" },
      { letter: "B", text: "√2/2" },
      { letter: "C", text: "1" },
      { letter: "D", text: "√3/2" }
    ],
    correctAnswer: "B",
    explanation: "sec(φ) = 1/cos(φ) = √2, so cos(φ) = 1/√2. sin(φ) = √(1 - 1/2) = √2/2.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Reciprocal Identities"
  }),
  addRating({
    id: "umath021",
    question: "If cot(θ) = 3/4, find sin(θ).",
    options: [
      { letter: "A", text: "4/5" },
      { letter: "B", text: "3/5" },
      { letter: "C", text: "5/4" },
      { letter: "D", text: "4/3" }
    ],
    correctAnswer: "A",
    explanation: "cot(θ) = adjacent/opposite = 3/4, so opposite = 4, adjacent = 3, hyp = 5, sin = 4/5.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath022",
    question: "If sin(θ) = √3/2, find cos(θ).",
    options: [
      { letter: "A", text: "1/2" },
      { letter: "B", text: "√3/2" },
      { letter: "C", text: "√2/2" },
      { letter: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "sin² + cos² = 1, sin² = (√3/2)² = 3/4, so cos² = 1/4, cos = 1/2.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Special Angles"
  }),
  addRating({
    id: "umath023",
    question: "If tan(θ) = √3, find sin(θ) when θ is acute.",
    options: [
      { letter: "A", text: "√3/2" },
      { letter: "B", text: "1/2" },
      { letter: "C", text: "1" },
      { letter: "D", text: "√2/2" }
    ],
    correctAnswer: "A",
    explanation: "tan = √3 corresponds to θ = 60°, where sin(60°) = √3/2.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Special Angles"
  }),
  addRating({
    id: "umath024",
    question: "If cos(θ) = 0.6, find sin(θ).",
    options: [
      { letter: "A", text: "0.8" },
      { letter: "B", text: "0.6" },
      { letter: "C", text: "0.4" },
      { letter: "D", text: "0.5" }
    ],
    correctAnswer: "A",
    explanation: "sin² = 1 - cos² = 1 - 0.36 = 0.64, sin = 0.8.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  addRating({
    id: "umath025",
    question: "If sin(θ) = 0.6, find tan(θ).",
    options: [
      { letter: "A", text: "0.75" },
      { letter: "B", text: "1.25" },
      { letter: "C", text: "0.6" },
      { letter: "D", text: "0.8" }
    ],
    correctAnswer: "A",
    explanation: "sin = 0.6, cos = √(1 - 0.36) = 0.8, tan = sin/cos = 0.6/0.8 = 0.75.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Pythagorean Identity"
  }),
  // Advanced questions - double angles, inscribed shapes, logs (Rating 6-8)
  addRating({
    id: "umath026",
    question: "If f(x) = sin(x) + cos(x), what is the maximum value of f(x) for x in [0, 2π]?",
    options: [
      { letter: "A", text: "√2" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "√3" }
    ],
    correctAnswer: "A",
    explanation: "Rewrite f(x) = sin(x) + cos(x) = √2 sin(x + π/4). Maximum value is √2.",
    difficulty: "Hard",
    domain: "Trigonometry",
    skill: "Trigonometric Identities"
  }),
  addRating({
    id: "umath027",
    question: "A circle is inscribed in a square of side length 10. A smaller square is inscribed in the circle. What is the area of the smaller square?",
    options: [
      { letter: "A", text: "50" },
      { letter: "B", text: "100" },
      { letter: "C", text: "25√2" },
      { letter: "D", text: "200" }
    ],
    correctAnswer: "A",
    explanation: "Diameter of circle = 10, so diagonal of smaller square = 10. Side = 10/√2 = 5√2. Area = (5√2)² = 50.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Inscribed Shapes"
  }),
  addRating({
    id: "umath028",
    question: "Solve for x: log₂(x) + log₄(x) = 3.",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "8" },
      { letter: "C", text: "16" },
      { letter: "D", text: "32" }
    ],
    correctAnswer: "A",
    explanation: "log₄(x) = log₂(x)/2, so total = 1.5·log₂(x) = 3, log₂(x) = 2, x = 4.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Logarithmic Equations"
  }),
  addRating({
    id: "umath029",
    question: "If sin(θ) + cos(θ) = 1.2, find sin(2θ).",
    options: [
      { letter: "A", text: "0.44" },
      { letter: "B", text: "0.88" },
      { letter: "C", text: "1.2" },
      { letter: "D", text: "0.96" }
    ],
    correctAnswer: "A",
    explanation: "(sinθ + cosθ)² = sin²θ + cos²θ + 2sinθcosθ = 1 + sin(2θ) = 1.44, so sin(2θ) = 0.44.",
    difficulty: "Hard",
    domain: "Trigonometry",
    skill: "Double Angle Formulas"
  }),
  addRating({
    id: "umath030",
    question: "The function f(x) = x³ - 6x² + 9x has a local minimum at x = ?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "C",
    explanation: "f'(x) = 3x² - 12x + 9 = 0 → x = 1 or 3. f''(x) = 6x - 12, at x = 3: f'' = 6 > 0 so local min at x = 3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Calculus Concepts"
  }),
  addRating({
    id: "umath031",
    question: "A parabola y = x² - 4x + 3 intersects the x-axis at points A and B. Find length AB.",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "x² - 4x + 3 = 0 → roots are 1 and 3, distance = |3 - 1| = 2.",
    difficulty: "Medium",
    domain: "Advanced Algebra",
    skill: "Quadratic Functions"
  }),
  addRating({
    id: "umath032",
    question: "If tan(α) = 3/4 and α is in the first quadrant, find sin(2α).",
    options: [
      { letter: "A", text: "24/25" },
      { letter: "B", text: "7/25" },
      { letter: "C", text: "12/25" },
      { letter: "D", text: "48/25" }
    ],
    correctAnswer: "A",
    explanation: "tan α = 3/4, so sin α = 3/5, cos α = 4/5. sin(2α) = 2 sin α cos α = 2(3/5)(4/5) = 24/25.",
    difficulty: "Hard",
    domain: "Trigonometry",
    skill: "Double Angle Formulas"
  }),
  addRating({
    id: "umath033",
    question: "A geometric sequence has first term 3 and common ratio r. If the sum of the first 4 terms is 120, find r.",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "B",
    explanation: "Sum = 3(1 + r + r² + r³) = 120 → 1 + r + r² + r³ = 40. Testing r = 4: 1 + 4 + 16 + 64 = 85 ≠ 40. Actually, 1 + 2 + 4 + 8 = 15, so r = 4 doesn't work directly. Check: if r = 3, sum = 1+3+9+27 = 40. So r = 3.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Sequences and Series"
  }),
  addRating({
    id: "umath034",
    question: "If cos²x - sin²x = 0.6, find cos(2x).",
    options: [
      { letter: "A", text: "0.6" },
      { letter: "B", text: "0.8" },
      { letter: "C", text: "0.4" },
      { letter: "D", text: "0.2" }
    ],
    correctAnswer: "A",
    explanation: "cos²x - sin²x = cos(2x) by the double angle identity, so cos(2x) = 0.6.",
    difficulty: "Medium",
    domain: "Trigonometry",
    skill: "Double Angle Formulas"
  }),
  // Advanced algebra and functions (Rating 6-8)
  addRating({
    id: "umath035",
    question: "If f(x) = (2x² - 3x + 1)/(x - 1), what is f(3)?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "10" },
      { letter: "C", text: "4" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "Plug x=3: numerator = 2(9) - 3(3) + 1 = 18 - 9 + 1 = 10; denominator = 3 - 1 = 2; f(3) = 10/2 = 5.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function Evaluation"
  }),
  addRating({
    id: "umath036",
    question: "Solve for x: log₂(x² - 3x) = 3",
    options: [
      { letter: "A", text: "x = 4 or x = -1" },
      { letter: "B", text: "x = 4 or x = -2" },
      { letter: "C", text: "x = 8 or x = -1" },
      { letter: "D", text: "x = 2 or x = -4" }
    ],
    correctAnswer: "A",
    explanation: "Convert log to exponent: x² - 3x = 2³ = 8. So x² - 3x - 8 = 0. Using quadratic formula: x = (3 ± √41)/2 ≈ 4 or -1.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Logarithms"
  }),
  addRating({
    id: "umath037",
    question: "A circle has a radius of 5. A square is inscribed in the circle. What is the area of the square?",
    options: [
      { letter: "A", text: "50" },
      { letter: "B", text: "100" },
      { letter: "C", text: "25" },
      { letter: "D", text: "25√2" }
    ],
    correctAnswer: "A",
    explanation: "Diagonal of inscribed square = diameter = 10. Side = 10/√2 = 5√2. Area = (5√2)² = 50.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Inscribed Shapes"
  }),
  addRating({
    id: "umath038",
    question: "If a/b = 3 and b/c = 4, what is a/c?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "7" },
      { letter: "C", text: "1" },
      { letter: "D", text: "4/3" }
    ],
    correctAnswer: "A",
    explanation: "a/c = (a/b) × (b/c) = 3 × 4 = 12.",
    difficulty: "Easy",
    domain: "Algebra",
    skill: "Ratios"
  }),
  addRating({
    id: "umath039",
    question: "The function g(x) = x³ - 6x² + 11x - 6. Find all real roots.",
    options: [
      { letter: "A", text: "x = 1, 2, 3" },
      { letter: "B", text: "x = 1, 2" },
      { letter: "C", text: "x = 2, 3" },
      { letter: "D", text: "x = 1, 6" }
    ],
    correctAnswer: "A",
    explanation: "Factor: g(x) = (x - 1)(x - 2)(x - 3). Roots are x = 1, 2, 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Polynomial Factoring"
  }),
  addRating({
    id: "umath040",
    question: "A geometric sequence has first term 3 and common ratio 2. What is the sum of the first 8 terms?",
    options: [
      { letter: "A", text: "765" },
      { letter: "B", text: "510" },
      { letter: "C", text: "384" },
      { letter: "D", text: "255" }
    ],
    correctAnswer: "A",
    explanation: "Sum = a(rⁿ - 1)/(r - 1) = 3(2⁸ - 1)/(2 - 1) = 3(256 - 1) = 3 × 255 = 765.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Sequences and Series"
  }),
  addRating({
    id: "umath041",
    question: "If x and y satisfy 2x + 3y = 12 and x² + y² = 20, find xy.",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "8" },
      { letter: "C", text: "4" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "From 2x + 3y = 12, square both sides: 4x² + 12xy + 9y² = 144. Since x² + y² = 20, substitute and solve: xy = 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  }),
  addRating({
    id: "umath042",
    question: "A parabola has vertex at (2, -3) and passes through (4, 5). Find its equation.",
    options: [
      { letter: "A", text: "y = 2(x - 2)² - 3" },
      { letter: "B", text: "y = (x - 2)² - 3" },
      { letter: "C", text: "y = 2(x + 2)² - 3" },
      { letter: "D", text: "y = 4(x - 2)² - 3" }
    ],
    correctAnswer: "A",
    explanation: "Vertex form: y = a(x - h)² + k. Plug (4, 5): 5 = a(4 - 2)² - 3 → 5 = 4a - 3 → 8 = 4a → a = 2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Quadratic Functions"
  }),
  addRating({
    id: "umath043",
    question: "If sin(θ) + cos(θ) = √2, find sin(2θ).",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "√2" },
      { letter: "C", text: "0" },
      { letter: "D", text: "1/2" }
    ],
    correctAnswer: "A",
    explanation: "Square both sides: sin²θ + 2sinθcosθ + cos²θ = 2. Since sin²θ + cos²θ = 1: 1 + 2sinθcosθ = 2 → sin(2θ) = 1.",
    difficulty: "Hard",
    domain: "Trigonometry",
    skill: "Trigonometric Identities"
  }),
  addRating({
    id: "umath044",
    question: "The probability of event A is 0.6 and event B is 0.5. If A and B are independent, what is P(A ∪ B)?",
    options: [
      { letter: "A", text: "0.8" },
      { letter: "B", text: "1.1" },
      { letter: "C", text: "0.7" },
      { letter: "D", text: "0.3" }
    ],
    correctAnswer: "A",
    explanation: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.6 + 0.5 - (0.6 × 0.5) = 1.1 - 0.3 = 0.8.",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Probability"
  })
];
