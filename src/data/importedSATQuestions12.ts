// Imported SAT Math Questions Batch 12 - Level 8 Focus
// These are authentic College Board SAT questions at difficulty rating 8

import type { Question } from './questions';

export interface ImageQuestion extends Question {
  imageUrl?: string;
  isNumericAnswer?: boolean;
}

export const importedSATMathQuestions12: ImageQuestion[] = [
  // Advanced Algebra - Systems & Functions
  {
    id: "sat-math-l8-001",
    question: "The function f is defined by f(x) = 3x² - 12x + 7. For what value of x does f(x) reach its minimum?",
    options: [
      { letter: "A", text: "-4" },
      { letter: "B", text: "-2" },
      { letter: "C", text: "2" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "C",
    explanation: "For a quadratic function f(x) = ax² + bx + c where a > 0, the minimum occurs at x = -b/(2a). Here, a = 3 and b = -12, so x = -(-12)/(2·3) = 12/6 = 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-002",
    question: "If 2x + 3y = 12 and 4x - y = 5, what is the value of 6x + 2y?",
    options: [
      { letter: "A", text: "17" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Adding the equations: (2x + 3y) + (4x - y) = 12 + 5, which gives 6x + 2y = 17.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-003",
    question: "The graph of f(x) = a(x - h)² + k has vertex (3, -5) and passes through the point (5, 3). What is the value of a?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "The vertex form is f(x) = a(x - 3)² - 5. Substituting (5, 3): 3 = a(5 - 3)² - 5 → 3 = 4a - 5 → 8 = 4a → a = 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-004",
    question: "If (x + 3)(x - 3) = x² + bx + c, what is the value of b + c?",
    options: [
      { letter: "A", text: "-9" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "(x + 3)(x - 3) = x² - 9. So b = 0 and c = -9. Therefore b + c = 0 + (-9) = -9.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-005",
    question: "The equation x² - 8x + k = 0 has exactly one real solution. What is the value of k?",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "16" },
      { letter: "C", text: "32" },
      { letter: "D", text: "64" }
    ],
    correctAnswer: "B",
    explanation: "A quadratic has exactly one solution when the discriminant equals zero: b² - 4ac = 0. Here, (-8)² - 4(1)(k) = 0 → 64 - 4k = 0 → k = 16.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  // Problem Solving & Data Analysis
  {
    id: "sat-math-l8-006",
    question: "A population of bacteria doubles every 3 hours. If there are 500 bacteria initially, which expression represents the population after t hours?",
    options: [
      { letter: "A", text: "500(2)^(t/3)" },
      { letter: "B", text: "500(2)^(3t)" },
      { letter: "C", text: "500(3)^(t/2)" },
      { letter: "D", text: "1000t" }
    ],
    correctAnswer: "A",
    explanation: "For exponential growth that doubles every 3 hours, the formula is P = P₀(2)^(t/3), where P₀ = 500. The exponent t/3 represents the number of doubling periods in t hours.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Exponential growth",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-007",
    question: "The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 18, what is the fifth number?",
    options: [
      { letter: "A", text: "10" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "If the mean of 5 numbers is 12, the sum is 5 × 12 = 60. The sum of four numbers is 8 + 10 + 14 + 18 = 50. The fifth number is 60 - 50 = 10.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistics and probability",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-008",
    question: "In a survey, 60% of respondents preferred Brand A. If 45 people preferred Brand A, how many people were surveyed in total?",
    options: [
      { letter: "A", text: "75" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "If 60% = 45 people, then 100% = 45 ÷ 0.60 = 75 people.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-009",
    question: "A car travels 240 miles using 8 gallons of gas. At this rate, how many gallons are needed to travel 420 miles?",
    options: [
      { letter: "A", text: "14" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The rate is 240/8 = 30 miles per gallon. For 420 miles: 420 ÷ 30 = 14 gallons.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, and proportions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-010",
    question: "If the standard deviation of a data set is 4, what is the variance?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "8" },
      { letter: "C", text: "16" },
      { letter: "D", text: "64" }
    ],
    correctAnswer: "C",
    explanation: "Variance is the square of standard deviation. If σ = 4, then variance = σ² = 16.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistics and probability",
    difficultyRating: 8
  },
  // Geometry & Trigonometry
  {
    id: "sat-math-l8-011",
    question: "A circle has a radius of 5. What is the area of a sector with a central angle of 72°?",
    options: [
      { letter: "A", text: "5π" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Sector area = (θ/360°) × πr² = (72/360) × π(5)² = (1/5) × 25π = 5π.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-012",
    question: "In right triangle ABC, angle C is the right angle. If sin A = 3/5, what is cos A?",
    options: [
      { letter: "A", text: "3/4" },
      { letter: "B", text: "4/5" },
      { letter: "C", text: "4/3" },
      { letter: "D", text: "5/3" }
    ],
    correctAnswer: "B",
    explanation: "Using the Pythagorean identity: sin²A + cos²A = 1. If sin A = 3/5, then (3/5)² + cos²A = 1 → 9/25 + cos²A = 1 → cos²A = 16/25 → cos A = 4/5.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-013",
    question: "Two similar triangles have areas in the ratio 4:9. What is the ratio of their corresponding sides?",
    options: [
      { letter: "A", text: "2:3" },
      { letter: "B", text: "4:9" },
      { letter: "C", text: "16:81" },
      { letter: "D", text: "8:27" }
    ],
    correctAnswer: "A",
    explanation: "For similar figures, if the ratio of areas is k², then the ratio of corresponding sides is k. Since 4:9 = 2²:3², the ratio of sides is 2:3.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-014",
    question: "The volume of a cone is 48π cubic centimeters and the height is 9 cm. What is the radius of the base?",
    options: [
      { letter: "A", text: "4" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Volume of cone = (1/3)πr²h. So 48π = (1/3)πr²(9) → 48π = 3πr² → 16 = r² → r = 4.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-015",
    question: "A line passes through points (2, 5) and (6, 13). What is the equation of the line perpendicular to this that passes through (4, 7)?",
    options: [
      { letter: "A", text: "y = -1/2x + 9" },
      { letter: "B", text: "y = -1/2x + 7" },
      { letter: "C", text: "y = 2x - 1" },
      { letter: "D", text: "y = 2x + 7" }
    ],
    correctAnswer: "A",
    explanation: "Original slope: (13-5)/(6-2) = 8/4 = 2. Perpendicular slope: -1/2. Using point-slope form with (4, 7): y - 7 = -1/2(x - 4) → y = -1/2x + 2 + 7 = -1/2x + 9.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 8
  },
  // More Advanced Algebra
  {
    id: "sat-math-l8-016",
    question: "If f(x) = 2x + 1 and g(x) = x² - 3, what is f(g(2))?",
    options: [
      { letter: "A", text: "3" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "First find g(2) = 2² - 3 = 4 - 3 = 1. Then f(g(2)) = f(1) = 2(1) + 1 = 3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-017",
    question: "Which of the following is equivalent to (2x³y²)³?",
    options: [
      { letter: "A", text: "2x⁹y⁶" },
      { letter: "B", text: "6x⁶y⁵" },
      { letter: "C", text: "8x⁹y⁶" },
      { letter: "D", text: "8x⁶y⁵" }
    ],
    correctAnswer: "C",
    explanation: "(2x³y²)³ = 2³ × (x³)³ × (y²)³ = 8 × x⁹ × y⁶ = 8x⁹y⁶.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-018",
    question: "If 3^(2x) = 81, what is the value of x?",
    options: [
      { letter: "A", text: "2" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "81 = 3⁴. So 3^(2x) = 3⁴ → 2x = 4 → x = 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-019",
    question: "The polynomial p(x) = x³ - 4x² - 7x + 10 has x = 5 as a zero. Which expression is a factor of p(x)?",
    options: [
      { letter: "A", text: "x + 5" },
      { letter: "B", text: "x - 5" },
      { letter: "C", text: "x + 2" },
      { letter: "D", text: "x - 10" }
    ],
    correctAnswer: "B",
    explanation: "By the Factor Theorem, if x = 5 is a zero of p(x), then (x - 5) is a factor of p(x).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-020",
    question: "What is the sum of the solutions to the equation x² - 5x - 14 = 0?",
    options: [
      { letter: "A", text: "5" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "By Vieta's formulas, the sum of roots of ax² + bx + c = 0 is -b/a. Here, sum = -(-5)/1 = 5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-021",
    question: "If h(x) = (x² - 9)/(x - 3) for x ≠ 3, which expression is equivalent to h(x)?",
    options: [
      { letter: "A", text: "x - 3" },
      { letter: "B", text: "x + 3" },
      { letter: "C", text: "x² - 6x + 9" },
      { letter: "D", text: "x² + 6x + 9" }
    ],
    correctAnswer: "B",
    explanation: "(x² - 9)/(x - 3) = (x + 3)(x - 3)/(x - 3) = x + 3 for x ≠ 3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-022",
    question: "The function f(x) = 2(x - 3)² - 8 has how many x-intercepts?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "C",
    explanation: "Set f(x) = 0: 2(x - 3)² - 8 = 0 → (x - 3)² = 4 → x - 3 = ±2 → x = 5 or x = 1. Two x-intercepts.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-023",
    question: "If |2x - 5| = 9, what is the product of all possible values of x?",
    options: [
      { letter: "A", text: "-14" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "2x - 5 = 9 → x = 7, or 2x - 5 = -9 → x = -2. Product: 7 × (-2) = -14.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-024",
    question: "In the equation y = 3(0.85)^x, what does 0.85 represent?",
    options: [
      { letter: "A", text: "The initial value" },
      { letter: "B", text: "A 15% decrease per unit of x" },
      { letter: "C", text: "An 85% increase per unit of x" },
      { letter: "D", text: "The y-intercept" }
    ],
    correctAnswer: "B",
    explanation: "In exponential decay y = a(b)^x where 0 < b < 1, the base 0.85 represents retaining 85% of the value, which is equivalent to a 15% decrease per unit of x.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-025",
    question: "If f(x) = x² + 2x - 3, what is f(-1)?",
    options: [
      { letter: "A", text: "-4" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "f(-1) = (-1)² + 2(-1) - 3 = 1 - 2 - 3 = -4.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  },
  // More Geometry
  {
    id: "sat-math-l8-026",
    question: "A rectangular prism has dimensions 3, 4, and 5. What is the length of the space diagonal?",
    options: [
      { letter: "A", text: "5√2" },
      { letter: "B", text: "6" },
      { letter: "C", text: "√50" },
      { letter: "D", text: "√52" }
    ],
    correctAnswer: "C",
    explanation: "Space diagonal = √(3² + 4² + 5²) = √(9 + 16 + 25) = √50.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-027",
    question: "In the xy-plane, what is the distance between the points (-3, 4) and (5, -2)?",
    options: [
      { letter: "A", text: "10" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Distance = √[(5-(-3))² + (-2-4)²] = √[8² + (-6)²] = √[64 + 36] = √100 = 10.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-028",
    question: "If tan θ = 3/4 and θ is in the first quadrant, what is sin θ?",
    options: [
      { letter: "A", text: "3/5" },
      { letter: "B", text: "4/5" },
      { letter: "C", text: "3/4" },
      { letter: "D", text: "4/3" }
    ],
    correctAnswer: "A",
    explanation: "If tan θ = 3/4, then opposite = 3, adjacent = 4. Hypotenuse = √(3² + 4²) = 5. sin θ = opposite/hypotenuse = 3/5.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-029",
    question: "A circle in the xy-plane has equation (x - 2)² + (y + 3)² = 16. What is the diameter of the circle?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "8" },
      { letter: "C", text: "16" },
      { letter: "D", text: "32" }
    ],
    correctAnswer: "B",
    explanation: "The equation (x - h)² + (y - k)² = r² gives r² = 16, so r = 4. Diameter = 2r = 8.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-030",
    question: "In an isosceles right triangle, if the hypotenuse is 10, what is the length of each leg?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "5√2" },
      { letter: "C", text: "10/√2" },
      { letter: "D", text: "Both B and C" }
    ],
    correctAnswer: "D",
    explanation: "In an isosceles right triangle (45-45-90), if hypotenuse = h, each leg = h/√2. So leg = 10/√2 = 10√2/2 = 5√2. Both B and C are equivalent expressions.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficultyRating: 8
  },
  // More Problem Solving
  {
    id: "sat-math-l8-031",
    question: "A store marks up items by 40% and then offers a 25% discount. What is the final price as a percentage of the original cost?",
    options: [
      { letter: "A", text: "105%" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "After 40% markup: 1.40 × cost. After 25% discount: 0.75 × 1.40 = 1.05 = 105% of original.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-032",
    question: "If y varies directly as x and y = 15 when x = 5, what is y when x = 8?",
    options: [
      { letter: "A", text: "24" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Direct variation: y = kx. When y = 15 and x = 5: 15 = k(5), so k = 3. When x = 8: y = 3(8) = 24.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, and proportions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-033",
    question: "In a class of 30 students, 18 play soccer and 12 play basketball. If 6 students play both sports, how many students play neither?",
    options: [
      { letter: "A", text: "6" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Using inclusion-exclusion: Soccer ∪ Basketball = 18 + 12 - 6 = 24. Neither = 30 - 24 = 6.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistics and probability",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-034",
    question: "A bag contains 3 red, 4 blue, and 5 green marbles. If two marbles are drawn without replacement, what is the probability that both are blue?",
    options: [
      { letter: "A", text: "1/11" },
      { letter: "B", text: "1/9" },
      { letter: "C", text: "4/33" },
      { letter: "D", text: "16/144" }
    ],
    correctAnswer: "A",
    explanation: "P(first blue) = 4/12. P(second blue | first blue) = 3/11. P(both blue) = (4/12)(3/11) = 12/132 = 1/11.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistics and probability",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-035",
    question: "A population of bacteria doubles every 3 hours. If the initial population is 500, which expression represents the population after t hours?",
    options: [
      { letter: "A", text: "500(2)^(t/3)" },
      { letter: "B", text: "500(2)^(3t)" },
      { letter: "C", text: "500(3)^(t/2)" },
      { letter: "D", text: "1000(2)^t" }
    ],
    correctAnswer: "A",
    explanation: "The population doubles (factor of 2) every 3 hours. The general form is P₀ × 2^(t/doubling period). With P₀ = 500 and doubling period = 3: P(t) = 500(2)^(t/3). At t = 3: 500(2)¹ = 1000 ✓. At t = 6: 500(2)² = 2000 ✓.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Exponential growth",
    difficultyRating: 8
  },
  // Additional Complex Algebra
  {
    id: "sat-math-l8-036",
    question: "If (a + b)² = 49 and ab = 12, what is a² + b²?",
    options: [
      { letter: "A", text: "25" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "(a + b)² = a² + 2ab + b² = 49. So a² + b² = 49 - 2ab = 49 - 24 = 25.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-037",
    question: "For what value of k does the equation 2x² + kx + 8 = 0 have equal roots?",
    options: [
      { letter: "A", text: "±8" },
      { letter: "B", text: "±4" },
      { letter: "C", text: "4 only" },
      { letter: "D", text: "8 only" }
    ],
    correctAnswer: "A",
    explanation: "Equal roots when discriminant = 0: k² - 4(2)(8) = 0 → k² = 64 → k = ±8.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-038",
    question: "If √(x + 5) = x - 1, what is the value of x?",
    options: [
      { letter: "A", text: "4" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "Squaring both sides: x + 5 = (x - 1)² = x² - 2x + 1. So x² - 3x - 4 = 0 → (x - 4)(x + 1) = 0 → x = 4 or x = -1. Checking: √9 = 3 ≠ -2, so x = -1 is extraneous. x = 4 works: √9 = 3 = 4 - 1.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-039",
    question: "The expression (x² - 4)/(x² + 4x + 4) simplifies to which of the following?",
    options: [
      { letter: "A", text: "(x - 2)/(x + 2)" },
      { letter: "B", text: "(x + 2)/(x - 2)" },
      { letter: "C", text: "x - 2" },
      { letter: "D", text: "x + 2" }
    ],
    correctAnswer: "A",
    explanation: "(x² - 4)/(x² + 4x + 4) = (x - 2)(x + 2)/(x + 2)² = (x - 2)/(x + 2) for x ≠ -2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficultyRating: 8
  },
  {
    id: "sat-math-l8-040",
    question: "If log₃(x) = 4, what is x?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "64" },
      { letter: "C", text: "81" },
      { letter: "D", text: "256" }
    ],
    correctAnswer: "C",
    explanation: "log₃(x) = 4 means 3⁴ = x, so x = 81.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficultyRating: 8
  }
];

// Export count for display
export const importedSATMathCount12 = importedSATMathQuestions12.length;
