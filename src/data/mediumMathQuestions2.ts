import { Question } from './questions';

export const mediumMathQuestions2: Question[] = [
  // Difficulty 5 - Answer A (5 questions)
  {
    id: "med2_001",
    question: "If 4x - 8 = 20, what is the value of x?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "3" },
      { letter: "C", text: "5" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "A",
    explanation: "4x - 8 = 20, so 4x = 28, and x = 7.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 5
  },
  {
    id: "med2_002",
    question: "What is 35% of 80?",
    options: [
      { letter: "A", text: "28" },
      { letter: "B", text: "32" },
      { letter: "C", text: "24" },
      { letter: "D", text: "35" }
    ],
    correctAnswer: "A",
    explanation: "35% of 80 = 0.35 × 80 = 28.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages",
    difficultyRating: 5
  },
  {
    id: "med2_003",
    question: "The ratio of boys to girls in a class is 3:5. If there are 24 students total, how many boys are there?",
    options: [
      { letter: "A", text: "9" },
      { letter: "B", text: "12" },
      { letter: "C", text: "15" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "Total parts = 3 + 5 = 8. Boys = (3/8) × 24 = 9.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Ratios and proportions",
    difficultyRating: 5
  },
  {
    id: "med2_004",
    question: "What is the slope of the line passing through points (1, 3) and (4, 12)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "2" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "A",
    explanation: "Slope = (12 - 3)/(4 - 1) = 9/3 = 3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 5
  },
  {
    id: "med2_005",
    question: "Simplify: 2(3x + 4) - 5x",
    options: [
      { letter: "A", text: "x + 8" },
      { letter: "B", text: "x + 4" },
      { letter: "C", text: "11x + 8" },
      { letter: "D", text: "6x + 8" }
    ],
    correctAnswer: "A",
    explanation: "2(3x + 4) - 5x = 6x + 8 - 5x = x + 8.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficultyRating: 5
  },
  // Difficulty 5 - Answer B (5 questions)
  {
    id: "med2_006",
    question: "If f(x) = 2x + 5, what is f(4)?",
    options: [
      { letter: "A", text: "11" },
      { letter: "B", text: "13" },
      { letter: "C", text: "9" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: "f(4) = 2(4) + 5 = 8 + 5 = 13.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function notation",
    difficultyRating: 5
  },
  {
    id: "med2_007",
    question: "A rectangle has length 12 and width 5. What is its perimeter?",
    options: [
      { letter: "A", text: "60" },
      { letter: "B", text: "34" },
      { letter: "C", text: "17" },
      { letter: "D", text: "24" }
    ],
    correctAnswer: "B",
    explanation: "Perimeter = 2(12 + 5) = 2(17) = 34.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Perimeter",
    difficultyRating: 5
  },
  {
    id: "med2_008",
    question: "What is the value of 5² + 3²?",
    options: [
      { letter: "A", text: "64" },
      { letter: "B", text: "34" },
      { letter: "C", text: "16" },
      { letter: "D", text: "40" }
    ],
    correctAnswer: "B",
    explanation: "5² + 3² = 25 + 9 = 34.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponents",
    difficultyRating: 5
  },
  {
    id: "med2_009",
    question: "If 3(x + 2) = 21, what is x?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "5" },
      { letter: "C", text: "7" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "B",
    explanation: "3(x + 2) = 21, so x + 2 = 7, and x = 5.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 5
  },
  {
    id: "med2_010",
    question: "A number increased by 25% gives 75. What is the original number?",
    options: [
      { letter: "A", text: "50" },
      { letter: "B", text: "60" },
      { letter: "C", text: "56.25" },
      { letter: "D", text: "65" }
    ],
    correctAnswer: "B",
    explanation: "Let x be the number. 1.25x = 75, so x = 60.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent increase",
    difficultyRating: 5
  },
  // Difficulty 5 - Answer C (5 questions)
  {
    id: "med2_011",
    question: "What is the median of: 3, 7, 9, 12, 15?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "12" },
      { letter: "C", text: "9" },
      { letter: "D", text: "9.2" }
    ],
    correctAnswer: "C",
    explanation: "The middle value in the ordered list is 9.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Measures of center",
    difficultyRating: 5
  },
  {
    id: "med2_012",
    question: "Solve for y: 2y + 6 = 18",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "9" },
      { letter: "C", text: "6" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "C",
    explanation: "2y + 6 = 18, so 2y = 12, and y = 6.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 5
  },
  {
    id: "med2_013",
    question: "The area of a square is 49 cm². What is the side length?",
    options: [
      { letter: "A", text: "24.5 cm" },
      { letter: "B", text: "12.25 cm" },
      { letter: "C", text: "7 cm" },
      { letter: "D", text: "14 cm" }
    ],
    correctAnswer: "C",
    explanation: "Side = √49 = 7 cm.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Area of squares",
    difficultyRating: 5
  },
  {
    id: "med2_014",
    question: "What is 3/4 expressed as a decimal?",
    options: [
      { letter: "A", text: "0.34" },
      { letter: "B", text: "0.70" },
      { letter: "C", text: "0.75" },
      { letter: "D", text: "0.80" }
    ],
    correctAnswer: "C",
    explanation: "3/4 = 3 ÷ 4 = 0.75.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Fractions and decimals",
    difficultyRating: 5
  },
  {
    id: "med2_015",
    question: "If a = 4 and b = 3, what is a² - b²?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "25" },
      { letter: "C", text: "7" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "C",
    explanation: "a² - b² = 16 - 9 = 7.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Evaluating expressions",
    difficultyRating: 5
  },
  // Difficulty 5 - Answer D (5 questions)
  {
    id: "med2_016",
    question: "A car travels 180 miles in 3 hours. What is its average speed?",
    options: [
      { letter: "A", text: "45 mph" },
      { letter: "B", text: "50 mph" },
      { letter: "C", text: "55 mph" },
      { letter: "D", text: "60 mph" }
    ],
    correctAnswer: "D",
    explanation: "Speed = 180 ÷ 3 = 60 mph.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Rate problems",
    difficultyRating: 5
  },
  {
    id: "med2_017",
    question: "What is the greatest common factor of 24 and 36?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "D",
    explanation: "Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. GCF = 12.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Factors",
    difficultyRating: 5
  },
  {
    id: "med2_018",
    question: "Simplify: 48 ÷ 8 + 2 × 3",
    options: [
      { letter: "A", text: "24" },
      { letter: "B", text: "9" },
      { letter: "C", text: "18" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "D",
    explanation: "48 ÷ 8 + 2 × 3 = 6 + 6 = 12.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Order of operations",
    difficultyRating: 5
  },
  {
    id: "med2_019",
    question: "The sum of two consecutive integers is 25. What is the larger integer?",
    options: [
      { letter: "A", text: "11" },
      { letter: "B", text: "12" },
      { letter: "C", text: "14" },
      { letter: "D", text: "13" }
    ],
    correctAnswer: "D",
    explanation: "Let n and n+1 be the integers. n + (n+1) = 25, so 2n = 24, n = 12. Larger = 13.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Word problems",
    difficultyRating: 5
  },
  {
    id: "med2_020",
    question: "What is 2⁴ × 2²?",
    options: [
      { letter: "A", text: "32" },
      { letter: "B", text: "16" },
      { letter: "C", text: "128" },
      { letter: "D", text: "64" }
    ],
    correctAnswer: "D",
    explanation: "2⁴ × 2² = 2⁶ = 64.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponent rules",
    difficultyRating: 5
  },
  // Difficulty 6 - Answer A (5 questions)
  {
    id: "med2_021",
    question: "Solve for x: 2x + 3 = x + 10",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "5" },
      { letter: "C", text: "13" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "2x + 3 = x + 10, so x = 7.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med2_022",
    question: "A triangle has sides 5, 12, and 13. What type of triangle is it?",
    options: [
      { letter: "A", text: "Right triangle" },
      { letter: "B", text: "Acute triangle" },
      { letter: "C", text: "Obtuse triangle" },
      { letter: "D", text: "Equilateral triangle" }
    ],
    correctAnswer: "A",
    explanation: "5² + 12² = 25 + 144 = 169 = 13². This satisfies the Pythagorean theorem.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Triangle classification",
    difficultyRating: 6
  },
  {
    id: "med2_023",
    question: "If the probability of rain is 0.3, what is the probability of no rain?",
    options: [
      { letter: "A", text: "0.7" },
      { letter: "B", text: "0.3" },
      { letter: "C", text: "0.6" },
      { letter: "D", text: "1.3" }
    ],
    correctAnswer: "A",
    explanation: "P(no rain) = 1 - P(rain) = 1 - 0.3 = 0.7.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Probability",
    difficultyRating: 6
  },
  {
    id: "med2_024",
    question: "Factor: x² - 9",
    options: [
      { letter: "A", text: "(x + 3)(x - 3)" },
      { letter: "B", text: "(x - 3)²" },
      { letter: "C", text: "(x + 9)(x - 1)" },
      { letter: "D", text: "x(x - 9)" }
    ],
    correctAnswer: "A",
    explanation: "x² - 9 is a difference of squares: (x + 3)(x - 3).",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factoring",
    difficultyRating: 6
  },
  {
    id: "med2_025",
    question: "What is the y-intercept of the line y = 3x - 5?",
    options: [
      { letter: "A", text: "-5" },
      { letter: "B", text: "3" },
      { letter: "C", text: "5" },
      { letter: "D", text: "-3" }
    ],
    correctAnswer: "A",
    explanation: "In y = mx + b form, b = -5 is the y-intercept.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 6
  },
  // Difficulty 6 - Answer B (5 questions)
  {
    id: "med2_026",
    question: "Simplify: √50",
    options: [
      { letter: "A", text: "5√3" },
      { letter: "B", text: "5√2" },
      { letter: "C", text: "10√5" },
      { letter: "D", text: "25√2" }
    ],
    correctAnswer: "B",
    explanation: "√50 = √(25 × 2) = 5√2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Radicals",
    difficultyRating: 6
  },
  {
    id: "med2_027",
    question: "The mean of 5 numbers is 12. What is their sum?",
    options: [
      { letter: "A", text: "17" },
      { letter: "B", text: "60" },
      { letter: "C", text: "2.4" },
      { letter: "D", text: "48" }
    ],
    correctAnswer: "B",
    explanation: "Mean = Sum/Count, so Sum = Mean × Count = 12 × 5 = 60.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Mean",
    difficultyRating: 6
  },
  {
    id: "med2_028",
    question: "Solve: |x - 4| = 7",
    options: [
      { letter: "A", text: "x = 3 or x = 11" },
      { letter: "B", text: "x = 11 or x = -3" },
      { letter: "C", text: "x = 7 or x = -7" },
      { letter: "D", text: "x = 4 or x = -4" }
    ],
    correctAnswer: "B",
    explanation: "x - 4 = 7 gives x = 11. x - 4 = -7 gives x = -3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Absolute value",
    difficultyRating: 6
  },
  {
    id: "med2_029",
    question: "A cylinder has radius 3 and height 7. What is its volume? (Use π ≈ 3.14)",
    options: [
      { letter: "A", text: "132.98" },
      { letter: "B", text: "197.82" },
      { letter: "C", text: "65.94" },
      { letter: "D", text: "263.76" }
    ],
    correctAnswer: "B",
    explanation: "V = πr²h = 3.14 × 9 × 7 = 197.82.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Volume",
    difficultyRating: 6
  },
  {
    id: "med2_030",
    question: "If f(x) = x² - 4, what is f(-3)?",
    options: [
      { letter: "A", text: "-13" },
      { letter: "B", text: "5" },
      { letter: "C", text: "13" },
      { letter: "D", text: "-5" }
    ],
    correctAnswer: "B",
    explanation: "f(-3) = (-3)² - 4 = 9 - 4 = 5.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function evaluation",
    difficultyRating: 6
  },
  // Difficulty 6 - Answer C (5 questions)
  {
    id: "med2_031",
    question: "What is the range of the data set: 4, 8, 15, 21, 3?",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "21" },
      { letter: "C", text: "18" },
      { letter: "D", text: "10.2" }
    ],
    correctAnswer: "C",
    explanation: "Range = max - min = 21 - 3 = 18.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Range",
    difficultyRating: 6
  },
  {
    id: "med2_032",
    question: "Solve for x: x/3 + x/6 = 5",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "6" },
      { letter: "C", text: "10" },
      { letter: "D", text: "30" }
    ],
    correctAnswer: "C",
    explanation: "x/3 + x/6 = 2x/6 + x/6 = 3x/6 = x/2 = 5, so x = 10.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Equations with fractions",
    difficultyRating: 6
  },
  {
    id: "med2_033",
    question: "An angle measures 55°. What is its supplement?",
    options: [
      { letter: "A", text: "35°" },
      { letter: "B", text: "55°" },
      { letter: "C", text: "125°" },
      { letter: "D", text: "145°" }
    ],
    correctAnswer: "C",
    explanation: "Supplementary angles sum to 180°. 180° - 55° = 125°.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Angle relationships",
    difficultyRating: 6
  },
  {
    id: "med2_034",
    question: "Simplify: (3x²y)(4xy³)",
    options: [
      { letter: "A", text: "7x³y⁴" },
      { letter: "B", text: "12x²y³" },
      { letter: "C", text: "12x³y⁴" },
      { letter: "D", text: "7x²y³" }
    ],
    correctAnswer: "C",
    explanation: "(3x²y)(4xy³) = 12x³y⁴.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Polynomial multiplication",
    difficultyRating: 6
  },
  {
    id: "med2_035",
    question: "A price drops from $80 to $60. What is the percent decrease?",
    options: [
      { letter: "A", text: "20%" },
      { letter: "B", text: "33.3%" },
      { letter: "C", text: "25%" },
      { letter: "D", text: "30%" }
    ],
    correctAnswer: "C",
    explanation: "Decrease = 20. Percent = (20/80) × 100 = 25%.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent change",
    difficultyRating: 6
  },
  // Difficulty 6 - Answer D (5 questions)
  {
    id: "med2_036",
    question: "What is the distance between points (1, 2) and (4, 6)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "7" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "D",
    explanation: "Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Distance formula",
    difficultyRating: 6
  },
  {
    id: "med2_037",
    question: "Solve: 2(x - 3) + 4 = 3x - 5",
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "D",
    explanation: "2x - 6 + 4 = 3x - 5, so 2x - 2 = 3x - 5, giving -x = -3, x = 3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Multi-step equations",
    difficultyRating: 6
  },
  {
    id: "med2_038",
    question: "What is the least common multiple of 6 and 8?",
    options: [
      { letter: "A", text: "48" },
      { letter: "B", text: "14" },
      { letter: "C", text: "2" },
      { letter: "D", text: "24" }
    ],
    correctAnswer: "D",
    explanation: "Multiples of 6: 6,12,18,24... Multiples of 8: 8,16,24... LCM = 24.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "LCM",
    difficultyRating: 6
  },
  {
    id: "med2_039",
    question: "If 3ˣ = 81, what is x?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "27" },
      { letter: "C", text: "5" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "D",
    explanation: "81 = 3⁴, so x = 4.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponential equations",
    difficultyRating: 6
  },
  {
    id: "med2_040",
    question: "A bag contains 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a blue marble?",
    options: [
      { letter: "A", text: "1/4" },
      { letter: "B", text: "5/12" },
      { letter: "C", text: "3/12" },
      { letter: "D", text: "1/3" }
    ],
    correctAnswer: "D",
    explanation: "P(blue) = 4/12 = 1/3.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Probability",
    difficultyRating: 6
  },
  // Difficulty 7 - Answer A (5 questions)
  {
    id: "med2_041",
    question: "Solve for x: x² - 5x + 6 = 0",
    options: [
      { letter: "A", text: "x = 2 or x = 3" },
      { letter: "B", text: "x = -2 or x = -3" },
      { letter: "C", text: "x = 1 or x = 6" },
      { letter: "D", text: "x = 5 or x = 1" }
    ],
    correctAnswer: "A",
    explanation: "x² - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or x = 3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Quadratic equations",
    difficultyRating: 7
  },
  {
    id: "med2_042",
    question: "The circumference of a circle is 20π. What is its area?",
    options: [
      { letter: "A", text: "100π" },
      { letter: "B", text: "400π" },
      { letter: "C", text: "20π" },
      { letter: "D", text: "10π" }
    ],
    correctAnswer: "A",
    explanation: "C = 2πr = 20π, so r = 10. Area = πr² = π(100) = 100π.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Circle properties",
    difficultyRating: 7
  },
  {
    id: "med2_043",
    question: "Simplify: (x² - 4)/(x + 2)",
    options: [
      { letter: "A", text: "x - 2" },
      { letter: "B", text: "x + 2" },
      { letter: "C", text: "x² - 2" },
      { letter: "D", text: "(x - 4)/2" }
    ],
    correctAnswer: "A",
    explanation: "(x² - 4)/(x + 2) = (x + 2)(x - 2)/(x + 2) = x - 2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Rational expressions",
    difficultyRating: 7
  },
  {
    id: "med2_044",
    question: "What is the midpoint of the segment from (2, 8) to (6, 4)?",
    options: [
      { letter: "A", text: "(4, 6)" },
      { letter: "B", text: "(8, 12)" },
      { letter: "C", text: "(4, 4)" },
      { letter: "D", text: "(3, 5)" }
    ],
    correctAnswer: "A",
    explanation: "Midpoint = ((2+6)/2, (8+4)/2) = (4, 6).",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Midpoint formula",
    difficultyRating: 7
  },
  {
    id: "med2_045",
    question: "If g(x) = 2x² - 3x + 1, what is g(2)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "7" },
      { letter: "C", text: "11" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "A",
    explanation: "g(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function evaluation",
    difficultyRating: 7
  },
  // Difficulty 7 - Answer B (5 questions)
  {
    id: "med2_046",
    question: "In a 30-60-90 triangle, if the shortest side is 5, what is the hypotenuse?",
    options: [
      { letter: "A", text: "5√3" },
      { letter: "B", text: "10" },
      { letter: "C", text: "15" },
      { letter: "D", text: "5√2" }
    ],
    correctAnswer: "B",
    explanation: "In a 30-60-90 triangle, hypotenuse = 2 × shortest side = 2 × 5 = 10.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Special right triangles",
    difficultyRating: 7
  },
  {
    id: "med2_047",
    question: "Solve the system: x + y = 7, x - y = 3",
    options: [
      { letter: "A", text: "x = 4, y = 3" },
      { letter: "B", text: "x = 5, y = 2" },
      { letter: "C", text: "x = 3, y = 4" },
      { letter: "D", text: "x = 6, y = 1" }
    ],
    correctAnswer: "B",
    explanation: "Adding equations: 2x = 10, so x = 5. Then y = 7 - 5 = 2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Systems of equations",
    difficultyRating: 7
  },
  {
    id: "med2_048",
    question: "What is the vertex of the parabola y = x² - 6x + 8?",
    options: [
      { letter: "A", text: "(3, 1)" },
      { letter: "B", text: "(3, -1)" },
      { letter: "C", text: "(-3, -1)" },
      { letter: "D", text: "(6, 8)" }
    ],
    correctAnswer: "B",
    explanation: "x = -b/2a = 6/2 = 3. y = 9 - 18 + 8 = -1. Vertex is (3, -1).",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Quadratic functions",
    difficultyRating: 7
  },
  {
    id: "med2_049",
    question: "Simplify: (2³)²",
    options: [
      { letter: "A", text: "32" },
      { letter: "B", text: "64" },
      { letter: "C", text: "12" },
      { letter: "D", text: "128" }
    ],
    correctAnswer: "B",
    explanation: "(2³)² = 2⁶ = 64.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponent rules",
    difficultyRating: 7
  },
  {
    id: "med2_050",
    question: "A cone has radius 4 and height 9. What is its volume? (V = ⅓πr²h)",
    options: [
      { letter: "A", text: "36π" },
      { letter: "B", text: "48π" },
      { letter: "C", text: "144π" },
      { letter: "D", text: "12π" }
    ],
    correctAnswer: "B",
    explanation: "V = (1/3)π(16)(9) = (1/3)(144π) = 48π.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Volume of cones",
    difficultyRating: 7
  },
  // Difficulty 7 - Answer C (5 questions)
  {
    id: "med2_051",
    question: "If log₂(x) = 5, what is x?",
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "25" },
      { letter: "C", text: "32" },
      { letter: "D", text: "64" }
    ],
    correctAnswer: "C",
    explanation: "log₂(x) = 5 means 2⁵ = x, so x = 32.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Logarithms",
    difficultyRating: 7
  },
  {
    id: "med2_052",
    question: "What is the sum of interior angles of a hexagon?",
    options: [
      { letter: "A", text: "540°" },
      { letter: "B", text: "360°" },
      { letter: "C", text: "720°" },
      { letter: "D", text: "900°" }
    ],
    correctAnswer: "C",
    explanation: "Sum = (n - 2) × 180° = (6 - 2) × 180° = 720°.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Polygon angles",
    difficultyRating: 7
  },
  {
    id: "med2_053",
    question: "Factor completely: 2x² + 8x",
    options: [
      { letter: "A", text: "2(x² + 4x)" },
      { letter: "B", text: "x(2x + 8)" },
      { letter: "C", text: "2x(x + 4)" },
      { letter: "D", text: "(2x + 4)x" }
    ],
    correctAnswer: "C",
    explanation: "2x² + 8x = 2x(x + 4).",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factoring",
    difficultyRating: 7
  },
  {
    id: "med2_054",
    question: "Solve for x: 5(x + 2) = 2(x + 11)",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "C",
    explanation: "5x + 10 = 2x + 22, so 3x = 12, x = 4.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 7
  },
  {
    id: "med2_055",
    question: "The standard deviation of a dataset indicates:",
    options: [
      { letter: "A", text: "The middle value" },
      { letter: "B", text: "The most frequent value" },
      { letter: "C", text: "How spread out the data is" },
      { letter: "D", text: "The difference between max and min" }
    ],
    correctAnswer: "C",
    explanation: "Standard deviation measures the spread or dispersion of data from the mean.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Statistical concepts",
    difficultyRating: 7
  },
  // Difficulty 7 - Answer D (5 questions)
  {
    id: "med2_056",
    question: "If the area of a triangle is 30 and its base is 12, what is its height?",
    options: [
      { letter: "A", text: "2.5" },
      { letter: "B", text: "18" },
      { letter: "C", text: "360" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "D",
    explanation: "Area = (1/2)bh, so 30 = (1/2)(12)h, giving h = 5.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Triangle area",
    difficultyRating: 7
  },
  {
    id: "med2_057",
    question: "Simplify: (x³y²)/(xy⁴)",
    options: [
      { letter: "A", text: "x²y²" },
      { letter: "B", text: "x²/y" },
      { letter: "C", text: "xy²" },
      { letter: "D", text: "x²/y²" }
    ],
    correctAnswer: "D",
    explanation: "(x³y²)/(xy⁴) = x^(3-1) × y^(2-4) = x²y^(-2) = x²/y².",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponent rules",
    difficultyRating: 7
  },
  {
    id: "med2_058",
    question: "Two dice are rolled. What is the probability of getting a sum of 7?",
    options: [
      { letter: "A", text: "1/12" },
      { letter: "B", text: "1/36" },
      { letter: "C", text: "7/36" },
      { letter: "D", text: "1/6" }
    ],
    correctAnswer: "D",
    explanation: "There are 6 ways to get sum of 7 out of 36 possible outcomes. 6/36 = 1/6.",
    difficulty: "Medium",
    domain: "Data Analysis",
    skill: "Probability",
    difficultyRating: 7
  },
  {
    id: "med2_059",
    question: "If a line has slope 2 and passes through (1, 5), what is its y-intercept?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "-3" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "D",
    explanation: "y = mx + b, so 5 = 2(1) + b, giving b = 3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 7
  },
  {
    id: "med2_060",
    question: "In similar triangles with a scale factor of 3:1, if the smaller triangle has area 8, what is the area of the larger triangle?",
    options: [
      { letter: "A", text: "24" },
      { letter: "B", text: "64" },
      { letter: "C", text: "16" },
      { letter: "D", text: "72" }
    ],
    correctAnswer: "D",
    explanation: "Area scales by the square of the linear scale factor: 8 × 3² = 8 × 9 = 72.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Similar figures",
    difficultyRating: 7
  }
];
