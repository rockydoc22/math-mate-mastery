import { Question } from "./questions";
import { rateDifficulty } from '@/utils/difficultyRating';

function addRating(q: Omit<Question, 'difficultyRating'>): Question {
  return {
    ...q,
    difficultyRating: rateDifficulty(q.question, q.options, q.domain, q.skill)
  };
}

// 60 questions with balanced distribution: 15 A, 15 B, 15 C, 15 D
export const balancedMathQuestions: Question[] = [
  // === ANSWER A (15 questions) ===
  {
    id: "bal_math_001",
    question: "If f(x) = 3x² - 7x + 2, what is f(-2)?",
    options: [
      { letter: "A", text: "28" },
      { letter: "B", text: "24" },
      { letter: "C", text: "20" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "A",
    explanation: "f(-2) = 3(-2)² - 7(-2) + 2 = 3(4) + 14 + 2 = 12 + 14 + 2 = 28.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_002",
    question: "A circle has equation (x - 3)² + (y + 2)² = 49. What is the diameter of the circle?",
    options: [
      { letter: "A", text: "14" },
      { letter: "B", text: "7" },
      { letter: "C", text: "49" },
      { letter: "D", text: "24.5" }
    ],
    correctAnswer: "A",
    explanation: "The equation is in standard form (x-h)² + (y-k)² = r². Here r² = 49, so r = 7. The diameter = 2r = 14.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles"
  },
  {
    id: "bal_math_003",
    question: "If log₂(x) + log₂(x - 6) = 4, what is the value of x?",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "6" },
      { letter: "C", text: "10" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "log₂(x) + log₂(x-6) = log₂(x(x-6)) = 4, so x(x-6) = 2⁴ = 16. x² - 6x - 16 = 0, (x-8)(x+2) = 0. Since x > 6, x = 8.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_004",
    question: "In a right triangle, sin(θ) = 5/13. What is cos(θ)?",
    options: [
      { letter: "A", text: "12/13" },
      { letter: "B", text: "5/12" },
      { letter: "C", text: "13/12" },
      { letter: "D", text: "8/13" }
    ],
    correctAnswer: "A",
    explanation: "If sin(θ) = 5/13, then opposite = 5, hypotenuse = 13. Adjacent = √(13² - 5²) = √(169 - 25) = √144 = 12. So cos(θ) = 12/13.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_005",
    question: "The sum of an infinite geometric series is 24, and the first term is 18. What is the common ratio?",
    options: [
      { letter: "A", text: "1/4" },
      { letter: "B", text: "1/3" },
      { letter: "C", text: "3/4" },
      { letter: "D", text: "1/2" }
    ],
    correctAnswer: "A",
    explanation: "Sum = a/(1-r), so 24 = 18/(1-r). 24(1-r) = 18, 1-r = 18/24 = 3/4, r = 1/4.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_006",
    question: "If 3^(2x+1) = 27^(x-1), what is the value of x?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "3" },
      { letter: "C", text: "2" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "A",
    explanation: "27 = 3³, so 3^(2x+1) = 3^(3(x-1)) = 3^(3x-3). Thus 2x+1 = 3x-3, so x = 4.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_007",
    question: "A polynomial p(x) has zeros at x = -2, x = 1, and x = 3. If p(0) = 12, what is the leading coefficient?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "-2" },
      { letter: "C", text: "1" },
      { letter: "D", text: "-1" }
    ],
    correctAnswer: "A",
    explanation: "p(x) = a(x+2)(x-1)(x-3). p(0) = a(2)(-1)(-3) = 6a = 12, so a = 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable"
  },
  {
    id: "bal_math_008",
    question: "In how many ways can 8 people be arranged in a line if two specific people must stand next to each other?",
    options: [
      { letter: "A", text: "10,080" },
      { letter: "B", text: "5,040" },
      { letter: "C", text: "40,320" },
      { letter: "D", text: "20,160" }
    ],
    correctAnswer: "A",
    explanation: "Treat the two people as one unit: 7! arrangements. The two can switch places: 2!. Total = 7! × 2! = 5040 × 2 = 10,080.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_009",
    question: "If the vectors u = (3, -4) and v = (a, 6) are perpendicular, what is the value of a?",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "-8" },
      { letter: "C", text: "6" },
      { letter: "D", text: "-6" }
    ],
    correctAnswer: "A",
    explanation: "Perpendicular vectors have dot product = 0. u · v = 3a + (-4)(6) = 3a - 24 = 0, so a = 8.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles"
  },
  {
    id: "bal_math_010",
    question: "The function g(x) = x³ - 6x² + 9x has a local maximum at x = ?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "3" },
      { letter: "C", text: "0" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "g'(x) = 3x² - 12x + 9 = 3(x² - 4x + 3) = 3(x-1)(x-3). Critical points at x=1 and x=3. g''(x) = 6x - 12. g''(1) = -6 < 0, so x=1 is a local maximum.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_011",
    question: "A cone has a volume of 100π cm³ and height 12 cm. What is the radius of the base?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "10" },
      { letter: "C", text: "25" },
      { letter: "D", text: "√50" }
    ],
    correctAnswer: "A",
    explanation: "V = (1/3)πr²h, so 100π = (1/3)πr²(12) = 4πr². Thus r² = 25, r = 5.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume"
  },
  {
    id: "bal_math_012",
    question: "If i² = -1, what is the value of (2 + 3i)(4 - i)?",
    options: [
      { letter: "A", text: "11 + 10i" },
      { letter: "B", text: "11 - 10i" },
      { letter: "C", text: "5 + 10i" },
      { letter: "D", text: "8 + 10i" }
    ],
    correctAnswer: "A",
    explanation: "(2 + 3i)(4 - i) = 8 - 2i + 12i - 3i² = 8 + 10i - 3(-1) = 8 + 10i + 3 = 11 + 10i.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_013",
    question: "A data set has a mean of 50 and standard deviation of 8. If every value is multiplied by 3, what is the new standard deviation?",
    options: [
      { letter: "A", text: "24" },
      { letter: "B", text: "8" },
      { letter: "C", text: "150" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "A",
    explanation: "When all values are multiplied by k, the standard deviation is also multiplied by k. New SD = 8 × 3 = 24.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: distributions and measures of center and spread"
  },
  {
    id: "bal_math_014",
    question: "What is the period of the function f(x) = 2sin(3x - π/4)?",
    options: [
      { letter: "A", text: "2π/3" },
      { letter: "B", text: "3π" },
      { letter: "C", text: "π/3" },
      { letter: "D", text: "6π" }
    ],
    correctAnswer: "A",
    explanation: "For f(x) = A sin(Bx + C), the period is 2π/|B|. Here B = 3, so period = 2π/3.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_015",
    question: "If x² + y² = 25 and xy = 12, what is x + y if x > 0 and y > 0?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "5" },
      { letter: "C", text: "1" },
      { letter: "D", text: "49" }
    ],
    correctAnswer: "A",
    explanation: "(x + y)² = x² + 2xy + y² = 25 + 2(12) = 25 + 24 = 49. Since x,y > 0, x + y = 7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable"
  },

  // === ANSWER B (15 questions) ===
  {
    id: "bal_math_016",
    question: "If f(x) = 2x³ - 5x + 1, what is f'(2)?",
    options: [
      { letter: "A", text: "17" },
      { letter: "B", text: "19" },
      { letter: "C", text: "21" },
      { letter: "D", text: "23" }
    ],
    correctAnswer: "B",
    explanation: "f'(x) = 6x² - 5. f'(2) = 6(4) - 5 = 24 - 5 = 19.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_017",
    question: "A rectangle has perimeter 40 and area 96. What is the length of the longer side?",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "12" },
      { letter: "C", text: "16" },
      { letter: "D", text: "20" }
    ],
    correctAnswer: "B",
    explanation: "Let sides be x and y. 2(x+y) = 40, so x+y = 20. xy = 96. Solving: t² - 20t + 96 = 0, (t-8)(t-12) = 0. Longer side = 12.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume"
  },
  {
    id: "bal_math_018",
    question: "How many distinct 4-letter arrangements can be made from the word BOOK?",
    options: [
      { letter: "A", text: "24" },
      { letter: "B", text: "12" },
      { letter: "C", text: "6" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "BOOK has 4 letters with O repeated twice. Arrangements = 4!/2! = 24/2 = 12.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_019",
    question: "If tan(θ) = 3/4 and θ is in Quadrant I, what is sin(2θ)?",
    options: [
      { letter: "A", text: "7/25" },
      { letter: "B", text: "24/25" },
      { letter: "C", text: "12/25" },
      { letter: "D", text: "8/25" }
    ],
    correctAnswer: "B",
    explanation: "If tan(θ) = 3/4, then sin(θ) = 3/5 and cos(θ) = 4/5. sin(2θ) = 2sin(θ)cos(θ) = 2(3/5)(4/5) = 24/25.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_020",
    question: "The equation x² - 6x + k = 0 has exactly one solution. What is k?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "9" },
      { letter: "C", text: "12" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "B",
    explanation: "For exactly one solution, discriminant = 0. b² - 4ac = 36 - 4k = 0, so k = 9.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable"
  },
  {
    id: "bal_math_021",
    question: "A sphere has surface area 144π. What is its volume?",
    options: [
      { letter: "A", text: "256π" },
      { letter: "B", text: "288π" },
      { letter: "C", text: "324π" },
      { letter: "D", text: "216π" }
    ],
    correctAnswer: "B",
    explanation: "Surface area = 4πr² = 144π, so r² = 36, r = 6. Volume = (4/3)πr³ = (4/3)π(216) = 288π.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume"
  },
  {
    id: "bal_math_022",
    question: "If 5^x = 8, what is 5^(2x)?",
    options: [
      { letter: "A", text: "16" },
      { letter: "B", text: "64" },
      { letter: "C", text: "40" },
      { letter: "D", text: "25" }
    ],
    correctAnswer: "B",
    explanation: "5^(2x) = (5^x)² = 8² = 64.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_023",
    question: "In a survey of 100 people, 60 like coffee, 50 like tea, and 20 like both. How many like neither?",
    options: [
      { letter: "A", text: "20" },
      { letter: "B", text: "10" },
      { letter: "C", text: "30" },
      { letter: "D", text: "0" }
    ],
    correctAnswer: "B",
    explanation: "Coffee only: 60-20=40. Tea only: 50-20=30. Both: 20. Total liking at least one: 40+30+20=90. Neither: 100-90=10.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_024",
    question: "What is the remainder when x³ + 2x² - 5x + 3 is divided by (x - 2)?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "9" },
      { letter: "C", text: "13" },
      { letter: "D", text: "1" }
    ],
    correctAnswer: "B",
    explanation: "By the Remainder Theorem, substitute x = 2: 8 + 8 - 10 + 3 = 9.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_025",
    question: "The median of 5 consecutive odd integers is 15. What is the largest integer?",
    options: [
      { letter: "A", text: "17" },
      { letter: "B", text: "19" },
      { letter: "C", text: "21" },
      { letter: "D", text: "15" }
    ],
    correctAnswer: "B",
    explanation: "If median = 15, the integers are 11, 13, 15, 17, 19. Largest = 19.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: distributions and measures of center and spread"
  },
  {
    id: "bal_math_026",
    question: "If |2x - 5| = 9, what is the sum of all possible values of x?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "5" },
      { letter: "C", text: "7" },
      { letter: "D", text: "-2" }
    ],
    correctAnswer: "B",
    explanation: "2x - 5 = 9 gives x = 7. 2x - 5 = -9 gives x = -2. Sum = 7 + (-2) = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable"
  },
  {
    id: "bal_math_027",
    question: "A line passes through (2, 5) and is perpendicular to y = 3x + 1. What is the y-intercept of this line?",
    options: [
      { letter: "A", text: "16/3" },
      { letter: "B", text: "17/3" },
      { letter: "C", text: "5" },
      { letter: "D", text: "13/3" }
    ],
    correctAnswer: "B",
    explanation: "Perpendicular slope = -1/3. Using point (2,5): y - 5 = -1/3(x - 2). y = -x/3 + 2/3 + 5 = -x/3 + 17/3. Y-intercept = 17/3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions"
  },
  {
    id: "bal_math_028",
    question: "If log₁₀(x) = 2.5, what is x?",
    options: [
      { letter: "A", text: "250" },
      { letter: "B", text: "100√10" },
      { letter: "C", text: "25" },
      { letter: "D", text: "1000" }
    ],
    correctAnswer: "B",
    explanation: "x = 10^2.5 = 10² × 10^0.5 = 100 × √10 = 100√10.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_029",
    question: "A sequence is defined by aₙ = 3aₙ₋₁ - 2 with a₁ = 4. What is a₃?",
    options: [
      { letter: "A", text: "22" },
      { letter: "B", text: "28" },
      { letter: "C", text: "34" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "B",
    explanation: "a₁ = 4, a₂ = 3(4) - 2 = 10, a₃ = 3(10) - 2 = 28.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_030",
    question: "The graph of y = x² is shifted right 3 units and up 2 units. What is the equation of the new parabola?",
    options: [
      { letter: "A", text: "y = (x + 3)² + 2" },
      { letter: "B", text: "y = (x - 3)² + 2" },
      { letter: "C", text: "y = (x - 3)² - 2" },
      { letter: "D", text: "y = (x + 3)² - 2" }
    ],
    correctAnswer: "B",
    explanation: "Right shift by 3: replace x with (x-3). Up shift by 2: add 2. Result: y = (x-3)² + 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },

  // === ANSWER C (15 questions) ===
  {
    id: "bal_math_031",
    question: "If f(x) = √(x + 5), what is f⁻¹(3)?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "8" },
      { letter: "C", text: "4" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "C",
    explanation: "If y = √(x+5), then y² = x+5, so x = y² - 5. f⁻¹(x) = x² - 5. f⁻¹(3) = 9 - 5 = 4.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_032",
    question: "A triangle has sides 5, 12, and 13. What is the area?",
    options: [
      { letter: "A", text: "60" },
      { letter: "B", text: "65" },
      { letter: "C", text: "30" },
      { letter: "D", text: "26" }
    ],
    correctAnswer: "C",
    explanation: "5² + 12² = 25 + 144 = 169 = 13². It's a right triangle. Area = (1/2)(5)(12) = 30.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_033",
    question: "What is the sum of the first 20 terms of the arithmetic sequence 3, 7, 11, 15, ...?",
    options: [
      { letter: "A", text: "760" },
      { letter: "B", text: "780" },
      { letter: "C", text: "820" },
      { letter: "D", text: "840" }
    ],
    correctAnswer: "C",
    explanation: "a₁ = 3, d = 4. a₂₀ = 3 + 19(4) = 79. Sum = n(a₁ + aₙ)/2 = 20(3 + 79)/2 = 20(82)/2 = 820.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_034",
    question: "If sec(θ) = 5/3 and θ is in Quadrant I, what is tan(θ)?",
    options: [
      { letter: "A", text: "3/5" },
      { letter: "B", text: "5/4" },
      { letter: "C", text: "4/3" },
      { letter: "D", text: "3/4" }
    ],
    correctAnswer: "C",
    explanation: "sec(θ) = 5/3 means cos(θ) = 3/5. sin(θ) = √(1 - 9/25) = √(16/25) = 4/5. tan(θ) = sin/cos = (4/5)/(3/5) = 4/3.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_035",
    question: "If x + 1/x = 5, what is x² + 1/x²?",
    options: [
      { letter: "A", text: "25" },
      { letter: "B", text: "27" },
      { letter: "C", text: "23" },
      { letter: "D", text: "21" }
    ],
    correctAnswer: "C",
    explanation: "(x + 1/x)² = x² + 2 + 1/x² = 25. So x² + 1/x² = 25 - 2 = 23.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_036",
    question: "A cylinder has radius 3 and height 10. What is the lateral surface area?",
    options: [
      { letter: "A", text: "30π" },
      { letter: "B", text: "90π" },
      { letter: "C", text: "60π" },
      { letter: "D", text: "18π" }
    ],
    correctAnswer: "C",
    explanation: "Lateral surface area = 2πrh = 2π(3)(10) = 60π.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume"
  },
  {
    id: "bal_math_037",
    question: "How many ways can a committee of 3 be chosen from 7 people?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "210" },
      { letter: "C", text: "35" },
      { letter: "D", text: "42" }
    ],
    correctAnswer: "C",
    explanation: "C(7,3) = 7!/(3!4!) = (7×6×5)/(3×2×1) = 210/6 = 35.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_038",
    question: "If f(x) = (x² - 4)/(x - 2), what is lim(x→2) f(x)?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "2" },
      { letter: "C", text: "4" },
      { letter: "D", text: "undefined" }
    ],
    correctAnswer: "C",
    explanation: "f(x) = (x-2)(x+2)/(x-2) = x+2 for x ≠ 2. lim(x→2) = 2+2 = 4.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_039",
    question: "The probability of rain on any day is 0.3. What is the probability of rain on exactly 2 out of 3 days?",
    options: [
      { letter: "A", text: "0.27" },
      { letter: "B", text: "0.147" },
      { letter: "C", text: "0.189" },
      { letter: "D", text: "0.063" }
    ],
    correctAnswer: "C",
    explanation: "C(3,2) × 0.3² × 0.7 = 3 × 0.09 × 0.7 = 0.189.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_040",
    question: "If the roots of x² + bx + 12 = 0 are 3 and 4, what is b?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "12" },
      { letter: "C", text: "-7" },
      { letter: "D", text: "-12" }
    ],
    correctAnswer: "C",
    explanation: "Sum of roots = -b/a = 3 + 4 = 7. So -b = 7, b = -7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable"
  },
  {
    id: "bal_math_041",
    question: "A car depreciates 20% per year. After 2 years, what fraction of its original value remains?",
    options: [
      { letter: "A", text: "0.60" },
      { letter: "B", text: "0.80" },
      { letter: "C", text: "0.64" },
      { letter: "D", text: "0.36" }
    ],
    correctAnswer: "C",
    explanation: "After 1 year: 0.80. After 2 years: 0.80 × 0.80 = 0.64.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units"
  },
  {
    id: "bal_math_042",
    question: "What is the amplitude of y = -3cos(2x) + 5?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "5" },
      { letter: "C", text: "3" },
      { letter: "D", text: "-3" }
    ],
    correctAnswer: "C",
    explanation: "Amplitude = |A| = |-3| = 3.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_043",
    question: "If 2^(x+3) = 64, what is x?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "5" },
      { letter: "C", text: "3" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "C",
    explanation: "64 = 2⁶. So x + 3 = 6, x = 3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_044",
    question: "The diagonals of a rhombus are 10 and 24. What is the side length?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "17" },
      { letter: "C", text: "13" },
      { letter: "D", text: "26" }
    ],
    correctAnswer: "C",
    explanation: "Half diagonals: 5 and 12. Side = √(5² + 12²) = √(25 + 144) = √169 = 13.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles"
  },
  {
    id: "bal_math_045",
    question: "What is the value of ∑(k=1 to 5) (2k - 1)?",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "30" },
      { letter: "C", text: "25" },
      { letter: "D", text: "20" }
    ],
    correctAnswer: "C",
    explanation: "Sum = (2(1)-1) + (2(2)-1) + (2(3)-1) + (2(4)-1) + (2(5)-1) = 1 + 3 + 5 + 7 + 9 = 25.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },

  // === ANSWER D (15 questions) ===
  {
    id: "bal_math_046",
    question: "If f(x) = x³ - 4x, what is f(-3)?",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "21" },
      { letter: "C", text: "-39" },
      { letter: "D", text: "-15" }
    ],
    correctAnswer: "D",
    explanation: "f(-3) = (-3)³ - 4(-3) = -27 + 12 = -15.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_047",
    question: "An equilateral triangle has side length 8. What is its area?",
    options: [
      { letter: "A", text: "32" },
      { letter: "B", text: "24√3" },
      { letter: "C", text: "32√3" },
      { letter: "D", text: "16√3" }
    ],
    correctAnswer: "D",
    explanation: "Area = (√3/4)s² = (√3/4)(64) = 16√3.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume"
  },
  {
    id: "bal_math_048",
    question: "If a die is rolled twice, what is the probability that the sum is 7?",
    options: [
      { letter: "A", text: "1/12" },
      { letter: "B", text: "1/9" },
      { letter: "C", text: "7/36" },
      { letter: "D", text: "1/6" }
    ],
    correctAnswer: "D",
    explanation: "Pairs summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. P = 6/36 = 1/6.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability"
  },
  {
    id: "bal_math_049",
    question: "What is cos(60°)?",
    options: [
      { letter: "A", text: "√3/2" },
      { letter: "B", text: "1/√2" },
      { letter: "C", text: "√2/2" },
      { letter: "D", text: "1/2" }
    ],
    correctAnswer: "D",
    explanation: "cos(60°) = 1/2 is a standard trigonometric value.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry"
  },
  {
    id: "bal_math_050",
    question: "If the average of 6 numbers is 15, and one number 12 is removed, what is the new average?",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "14.4" },
      { letter: "C", text: "16" },
      { letter: "D", text: "15.6" }
    ],
    correctAnswer: "D",
    explanation: "Sum = 6 × 15 = 90. New sum = 90 - 12 = 78. New average = 78/5 = 15.6.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: distributions and measures of center and spread"
  },
  {
    id: "bal_math_051",
    question: "What is the vertex of the parabola y = 2(x - 3)² + 5?",
    options: [
      { letter: "A", text: "(-3, 5)" },
      { letter: "B", text: "(3, -5)" },
      { letter: "C", text: "(-3, -5)" },
      { letter: "D", text: "(3, 5)" }
    ],
    correctAnswer: "D",
    explanation: "The vertex form y = a(x-h)² + k has vertex (h, k). Here h = 3, k = 5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_052",
    question: "If |3x + 2| ≤ 8, what is the solution set?",
    options: [
      { letter: "A", text: "x ≤ 2" },
      { letter: "B", text: "x ≥ -10/3" },
      { letter: "C", text: "-2 ≤ x ≤ 10/3" },
      { letter: "D", text: "-10/3 ≤ x ≤ 2" }
    ],
    correctAnswer: "D",
    explanation: "-8 ≤ 3x + 2 ≤ 8. Subtract 2: -10 ≤ 3x ≤ 6. Divide by 3: -10/3 ≤ x ≤ 2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables"
  },
  {
    id: "bal_math_053",
    question: "A sector of a circle has radius 6 and central angle 60°. What is its area?",
    options: [
      { letter: "A", text: "12π" },
      { letter: "B", text: "18π" },
      { letter: "C", text: "36π" },
      { letter: "D", text: "6π" }
    ],
    correctAnswer: "D",
    explanation: "Area = (θ/360°)πr² = (60/360)π(36) = (1/6)(36π) = 6π.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles"
  },
  {
    id: "bal_math_054",
    question: "If i = √(-1), what is i⁵⁰?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "i" },
      { letter: "C", text: "-i" },
      { letter: "D", text: "-1" }
    ],
    correctAnswer: "D",
    explanation: "i cycles: i¹=i, i²=-1, i³=-i, i⁴=1. 50 mod 4 = 2. So i⁵⁰ = i² = -1.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_055",
    question: "The median of {3, 7, 9, x, 15} is 9. Which could be the value of x?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "8" },
      { letter: "C", text: "12" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "D",
    explanation: "For median to be 9, when sorted, the middle value must be 9. If x = 10: {3,7,9,10,15}, median = 9. ✓",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: distributions and measures of center and spread"
  },
  {
    id: "bal_math_056",
    question: "What is the slope of the line 3x - 6y = 12?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "-2" },
      { letter: "C", text: "-1/2" },
      { letter: "D", text: "1/2" }
    ],
    correctAnswer: "D",
    explanation: "-6y = -3x + 12, y = (1/2)x - 2. Slope = 1/2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables"
  },
  {
    id: "bal_math_057",
    question: "If a function f is defined by f(x) = 2x - 3, what is f(f(4))?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "13" },
      { letter: "C", text: "3" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "D",
    explanation: "f(4) = 2(4) - 3 = 5. f(f(4)) = f(5) = 2(5) - 3 = 7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions"
  },
  {
    id: "bal_math_058",
    question: "A regular hexagon has side length 4. What is its perimeter?",
    options: [
      { letter: "A", text: "16" },
      { letter: "B", text: "20" },
      { letter: "C", text: "28" },
      { letter: "D", text: "24" }
    ],
    correctAnswer: "D",
    explanation: "Perimeter = 6 × side = 6 × 4 = 24.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles"
  },
  {
    id: "bal_math_059",
    question: "If log₃(27) = x, what is x?",
    options: [
      { letter: "A", text: "9" },
      { letter: "B", text: "27" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "D",
    explanation: "3^x = 27 = 3³, so x = 3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions"
  },
  {
    id: "bal_math_060",
    question: "If $4x + 2y = 22$ and $x - y = 1$, what is $y$?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "2" },
      { letter: "C", text: "5" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "D",
    explanation: "From $x - y = 1$: $x = y + 1$. Substitute into the first equation: $4(y+1) + 2y = 22$, which gives $4y + 4 + 2y = 22$, so $6y = 18$, therefore $y = 3$. Verify: If $y = 3$, then $x = 4$. Check: $4(4) + 2(3) = 16 + 6 = 22$ ✓ and $4 - 3 = 1$ ✓.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  }
].map(addRating);
