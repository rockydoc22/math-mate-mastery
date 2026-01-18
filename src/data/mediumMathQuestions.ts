import { Question } from './questions';

// Medium difficulty Math questions (levels 5-7) with balanced A/B/C/D distribution
// 60 questions: 15 each for A, B, C, D answers

export const mediumMathQuestions: Question[] = [
  // === ANSWER A (15 questions) ===
  {
    id: "med_math_001",
    question: "If 3x + 7 = 22, what is the value of x?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6" },
      { letter: "C", text: "7" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "3x + 7 = 22 → 3x = 15 → x = 5",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 5
  },
  {
    id: "med_math_002",
    question: "What is 15% of 80?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "15" },
      { letter: "C", text: "10" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "15% of 80 = 0.15 × 80 = 12",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages",
    difficultyRating: 5
  },
  {
    id: "med_math_003",
    question: "A rectangle has length 12 and width 5. What is its perimeter?",
    options: [
      { letter: "A", text: "34" },
      { letter: "B", text: "60" },
      { letter: "C", text: "17" },
      { letter: "D", text: "24" }
    ],
    correctAnswer: "A",
    explanation: "Perimeter = 2(length + width) = 2(12 + 5) = 2(17) = 34",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Perimeter",
    difficultyRating: 5
  },
  {
    id: "med_math_004",
    question: "Simplify: 4(2x - 3) + 5",
    options: [
      { letter: "A", text: "8x - 7" },
      { letter: "B", text: "8x - 12" },
      { letter: "C", text: "8x + 2" },
      { letter: "D", text: "6x - 7" }
    ],
    correctAnswer: "A",
    explanation: "4(2x - 3) + 5 = 8x - 12 + 5 = 8x - 7",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Simplifying expressions",
    difficultyRating: 6
  },
  {
    id: "med_math_005",
    question: "What is the slope of the line passing through (2, 5) and (6, 13)?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "Slope = (13 - 5)/(6 - 2) = 8/4 = 2",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Slope",
    difficultyRating: 6
  },
  {
    id: "med_math_006",
    question: "If f(x) = 2x² - 3, what is f(4)?",
    options: [
      { letter: "A", text: "29" },
      { letter: "B", text: "32" },
      { letter: "C", text: "13" },
      { letter: "D", text: "35" }
    ],
    correctAnswer: "A",
    explanation: "f(4) = 2(4)² - 3 = 2(16) - 3 = 32 - 3 = 29",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function evaluation",
    difficultyRating: 6
  },
  {
    id: "med_math_007",
    question: "What is the median of: 12, 15, 18, 22, 25?",
    options: [
      { letter: "A", text: "18" },
      { letter: "B", text: "15" },
      { letter: "C", text: "22" },
      { letter: "D", text: "18.4" }
    ],
    correctAnswer: "A",
    explanation: "The median is the middle value. In order: 12, 15, 18, 22, 25. Middle = 18",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Median",
    difficultyRating: 5
  },
  {
    id: "med_math_008",
    question: "Solve: 2(x + 4) = 3x - 2",
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "2x + 8 = 3x - 2 → 8 + 2 = 3x - 2x → 10 = x",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med_math_009",
    question: "A triangle has angles of 45° and 65°. What is the third angle?",
    options: [
      { letter: "A", text: "70°" },
      { letter: "B", text: "75°" },
      { letter: "C", text: "80°" },
      { letter: "D", text: "60°" }
    ],
    correctAnswer: "A",
    explanation: "Sum of angles = 180°. Third angle = 180 - 45 - 65 = 70°",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Triangle angles",
    difficultyRating: 5
  },
  {
    id: "med_math_010",
    question: "What is √144 + √81?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "15" },
      { letter: "C", text: "18" },
      { letter: "D", text: "225" }
    ],
    correctAnswer: "A",
    explanation: "√144 = 12, √81 = 9. Sum = 12 + 9 = 21",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Square roots",
    difficultyRating: 5
  },
  {
    id: "med_math_011",
    question: "If a car travels 210 miles in 3.5 hours, what is its average speed in mph?",
    options: [
      { letter: "A", text: "60" },
      { letter: "B", text: "55" },
      { letter: "C", text: "65" },
      { letter: "D", text: "70" }
    ],
    correctAnswer: "A",
    explanation: "Speed = Distance/Time = 210/3.5 = 60 mph",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Rate problems",
    difficultyRating: 6
  },
  {
    id: "med_math_012",
    question: "Factor: x² - 9",
    options: [
      { letter: "A", text: "(x + 3)(x - 3)" },
      { letter: "B", text: "(x - 3)(x - 3)" },
      { letter: "C", text: "(x + 9)(x - 1)" },
      { letter: "D", text: "x(x - 9)" }
    ],
    correctAnswer: "A",
    explanation: "This is a difference of squares: x² - 9 = (x + 3)(x - 3)",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factoring",
    difficultyRating: 6
  },
  {
    id: "med_math_013",
    question: "What is the y-intercept of y = 3x - 7?",
    options: [
      { letter: "A", text: "-7" },
      { letter: "B", text: "3" },
      { letter: "C", text: "7" },
      { letter: "D", text: "-3" }
    ],
    correctAnswer: "A",
    explanation: "In y = mx + b form, b is the y-intercept. Here b = -7",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 5
  },
  {
    id: "med_math_014",
    question: "Simplify: (3x²)(4x³)",
    options: [
      { letter: "A", text: "12x⁵" },
      { letter: "B", text: "12x⁶" },
      { letter: "C", text: "7x⁵" },
      { letter: "D", text: "12x" }
    ],
    correctAnswer: "A",
    explanation: "(3x²)(4x³) = 3·4·x^(2+3) = 12x⁵",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponent rules",
    difficultyRating: 6
  },
  {
    id: "med_math_015",
    question: "What is the range of the data set: 8, 15, 23, 31, 42?",
    options: [
      { letter: "A", text: "34" },
      { letter: "B", text: "42" },
      { letter: "C", text: "23.8" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "Range = Maximum - Minimum = 42 - 8 = 34",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Range",
    difficultyRating: 5
  },

  // === ANSWER B (15 questions) ===
  {
    id: "med_math_016",
    question: "Solve for x: 5x - 8 = 2x + 7",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "5" },
      { letter: "C", text: "4" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "B",
    explanation: "5x - 2x = 7 + 8 → 3x = 15 → x = 5",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med_math_017",
    question: "What is 25% of 140?",
    options: [
      { letter: "A", text: "30" },
      { letter: "B", text: "35" },
      { letter: "C", text: "40" },
      { letter: "D", text: "28" }
    ],
    correctAnswer: "B",
    explanation: "25% of 140 = 0.25 × 140 = 35",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages",
    difficultyRating: 5
  },
  {
    id: "med_math_018",
    question: "A circle has radius 7. What is its area? (Use π ≈ 22/7)",
    options: [
      { letter: "A", text: "44" },
      { letter: "B", text: "154" },
      { letter: "C", text: "49" },
      { letter: "D", text: "22" }
    ],
    correctAnswer: "B",
    explanation: "Area = πr² = (22/7)(7)² = (22/7)(49) = 22 × 7 = 154",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Circle area",
    difficultyRating: 6
  },
  {
    id: "med_math_019",
    question: "If 2x + 3y = 18 and y = 2, what is x?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6" },
      { letter: "C", text: "7" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "2x + 3(2) = 18 → 2x + 6 = 18 → 2x = 12 → x = 6",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Substitution",
    difficultyRating: 6
  },
  {
    id: "med_math_020",
    question: "What is the mean of: 14, 18, 22, 26, 30?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "22" },
      { letter: "C", text: "23" },
      { letter: "D", text: "20" }
    ],
    correctAnswer: "B",
    explanation: "Mean = (14 + 18 + 22 + 26 + 30)/5 = 110/5 = 22",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Mean",
    difficultyRating: 5
  },
  {
    id: "med_math_021",
    question: "Simplify: (x + 5)(x - 2)",
    options: [
      { letter: "A", text: "x² + 3x + 10" },
      { letter: "B", text: "x² + 3x - 10" },
      { letter: "C", text: "x² - 3x - 10" },
      { letter: "D", text: "x² + 7x - 10" }
    ],
    correctAnswer: "B",
    explanation: "(x + 5)(x - 2) = x² - 2x + 5x - 10 = x² + 3x - 10",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "FOIL",
    difficultyRating: 6
  },
  {
    id: "med_math_022",
    question: "What is 3⁴?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "81" },
      { letter: "C", text: "64" },
      { letter: "D", text: "27" }
    ],
    correctAnswer: "B",
    explanation: "3⁴ = 3 × 3 × 3 × 3 = 81",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponents",
    difficultyRating: 5
  },
  {
    id: "med_math_023",
    question: "A store offers 20% off a $45 item. What is the sale price?",
    options: [
      { letter: "A", text: "$40" },
      { letter: "B", text: "$36" },
      { letter: "C", text: "$38" },
      { letter: "D", text: "$35" }
    ],
    correctAnswer: "B",
    explanation: "Discount = 0.20 × 45 = $9. Sale price = 45 - 9 = $36",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent discount",
    difficultyRating: 6
  },
  {
    id: "med_math_024",
    question: "If f(x) = x² + 2x, what is f(-3)?",
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "3" },
      { letter: "C", text: "-3" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "B",
    explanation: "f(-3) = (-3)² + 2(-3) = 9 - 6 = 3",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function evaluation",
    difficultyRating: 6
  },
  {
    id: "med_math_025",
    question: "What is the slope of a line parallel to y = -4x + 9?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "-4" },
      { letter: "C", text: "9" },
      { letter: "D", text: "1/4" }
    ],
    correctAnswer: "B",
    explanation: "Parallel lines have equal slopes. The slope of y = -4x + 9 is -4",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Parallel lines",
    difficultyRating: 6
  },
  {
    id: "med_math_026",
    question: "Solve: |x - 4| = 7",
    options: [
      { letter: "A", text: "x = 11 only" },
      { letter: "B", text: "x = 11 or x = -3" },
      { letter: "C", text: "x = -3 only" },
      { letter: "D", text: "x = 3 or x = -11" }
    ],
    correctAnswer: "B",
    explanation: "|x - 4| = 7 means x - 4 = 7 or x - 4 = -7, so x = 11 or x = -3",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Absolute value",
    difficultyRating: 7
  },
  {
    id: "med_math_027",
    question: "What is the probability of rolling an even number on a fair six-sided die?",
    options: [
      { letter: "A", text: "1/3" },
      { letter: "B", text: "1/2" },
      { letter: "C", text: "2/3" },
      { letter: "D", text: "1/6" }
    ],
    correctAnswer: "B",
    explanation: "Even numbers: 2, 4, 6. That's 3 out of 6 outcomes = 3/6 = 1/2",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Probability",
    difficultyRating: 5
  },
  {
    id: "med_math_028",
    question: "Simplify: (2x³)²",
    options: [
      { letter: "A", text: "2x⁶" },
      { letter: "B", text: "4x⁶" },
      { letter: "C", text: "4x⁵" },
      { letter: "D", text: "2x⁵" }
    ],
    correctAnswer: "B",
    explanation: "(2x³)² = 2² × (x³)² = 4 × x⁶ = 4x⁶",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Exponent rules",
    difficultyRating: 6
  },
  {
    id: "med_math_029",
    question: "A right triangle has legs of 6 and 8. What is the hypotenuse?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "10" },
      { letter: "C", text: "14" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "B",
    explanation: "c² = 6² + 8² = 36 + 64 = 100 → c = 10",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Pythagorean theorem",
    difficultyRating: 6
  },
  {
    id: "med_math_030",
    question: "What is the GCF of 24 and 36?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "12" },
      { letter: "C", text: "4" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "B",
    explanation: "Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. GCF = 12",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "GCF",
    difficultyRating: 5
  },

  // === ANSWER C (15 questions) ===
  {
    id: "med_math_031",
    question: "Solve: 4x + 5 = 2x + 17",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "C",
    explanation: "4x - 2x = 17 - 5 → 2x = 12 → x = 6",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med_math_032",
    question: "What is 40% of 95?",
    options: [
      { letter: "A", text: "36" },
      { letter: "B", text: "40" },
      { letter: "C", text: "38" },
      { letter: "D", text: "42" }
    ],
    correctAnswer: "C",
    explanation: "40% of 95 = 0.40 × 95 = 38",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages",
    difficultyRating: 5
  },
  {
    id: "med_math_033",
    question: "A square has perimeter 48. What is its area?",
    options: [
      { letter: "A", text: "64" },
      { letter: "B", text: "192" },
      { letter: "C", text: "144" },
      { letter: "D", text: "96" }
    ],
    correctAnswer: "C",
    explanation: "Side = 48/4 = 12. Area = 12² = 144",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Area",
    difficultyRating: 6
  },
  {
    id: "med_math_034",
    question: "Simplify: 3(2x + 4) - 2(x - 1)",
    options: [
      { letter: "A", text: "4x + 10" },
      { letter: "B", text: "4x + 12" },
      { letter: "C", text: "4x + 14" },
      { letter: "D", text: "8x + 14" }
    ],
    correctAnswer: "C",
    explanation: "6x + 12 - 2x + 2 = 4x + 14",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Simplifying expressions",
    difficultyRating: 6
  },
  {
    id: "med_math_035",
    question: "What is the mode of: 5, 8, 8, 10, 12, 8, 15?",
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "5" },
      { letter: "C", text: "8" },
      { letter: "D", text: "9.43" }
    ],
    correctAnswer: "C",
    explanation: "Mode is the most frequent value. 8 appears 3 times",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Mode",
    difficultyRating: 5
  },
  {
    id: "med_math_036",
    question: "Factor: x² + 5x + 6",
    options: [
      { letter: "A", text: "(x + 1)(x + 6)" },
      { letter: "B", text: "(x + 1)(x + 5)" },
      { letter: "C", text: "(x + 2)(x + 3)" },
      { letter: "D", text: "(x - 2)(x - 3)" }
    ],
    correctAnswer: "C",
    explanation: "Find two numbers that multiply to 6 and add to 5: 2 and 3. So (x + 2)(x + 3)",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factoring",
    difficultyRating: 6
  },
  {
    id: "med_math_037",
    question: "What is the value of 5! (5 factorial)?",
    options: [
      { letter: "A", text: "25" },
      { letter: "B", text: "60" },
      { letter: "C", text: "120" },
      { letter: "D", text: "720" }
    ],
    correctAnswer: "C",
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factorials",
    difficultyRating: 6
  },
  {
    id: "med_math_038",
    question: "If a number is increased by 30% and becomes 78, what was the original number?",
    options: [
      { letter: "A", text: "50" },
      { letter: "B", text: "55" },
      { letter: "C", text: "60" },
      { letter: "D", text: "65" }
    ],
    correctAnswer: "C",
    explanation: "Let x be original. 1.30x = 78 → x = 78/1.30 = 60",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent increase",
    difficultyRating: 7
  },
  {
    id: "med_math_039",
    question: "What is the equation of a line with slope 3 passing through (0, -2)?",
    options: [
      { letter: "A", text: "y = 3x + 2" },
      { letter: "B", text: "y = -2x + 3" },
      { letter: "C", text: "y = 3x - 2" },
      { letter: "D", text: "y = 2x - 3" }
    ],
    correctAnswer: "C",
    explanation: "Point (0, -2) is the y-intercept. So y = 3x + (-2) = 3x - 2",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Slope-intercept form",
    difficultyRating: 6
  },
  {
    id: "med_math_040",
    question: "Simplify: √50",
    options: [
      { letter: "A", text: "5√3" },
      { letter: "B", text: "10√2" },
      { letter: "C", text: "5√2" },
      { letter: "D", text: "25" }
    ],
    correctAnswer: "C",
    explanation: "√50 = √(25 × 2) = √25 × √2 = 5√2",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Simplifying radicals",
    difficultyRating: 6
  },
  {
    id: "med_math_041",
    question: "How many degrees are in the interior angles of a hexagon?",
    options: [
      { letter: "A", text: "540°" },
      { letter: "B", text: "600°" },
      { letter: "C", text: "720°" },
      { letter: "D", text: "360°" }
    ],
    correctAnswer: "C",
    explanation: "Interior angles = (n-2) × 180 = (6-2) × 180 = 4 × 180 = 720°",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Polygon angles",
    difficultyRating: 6
  },
  {
    id: "med_math_042",
    question: "Solve: x/3 + x/6 = 5",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "12" },
      { letter: "C", text: "10" },
      { letter: "D", text: "15" }
    ],
    correctAnswer: "C",
    explanation: "Multiply by 6: 2x + x = 30 → 3x = 30 → x = 10",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Equations with fractions",
    difficultyRating: 6
  },
  {
    id: "med_math_043",
    question: "What is the LCM of 12 and 18?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "24" },
      { letter: "C", text: "36" },
      { letter: "D", text: "72" }
    ],
    correctAnswer: "C",
    explanation: "12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 4 × 9 = 36",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "LCM",
    difficultyRating: 6
  },
  {
    id: "med_math_044",
    question: "A bag has 4 red, 3 blue, and 5 green marbles. What is P(not red)?",
    options: [
      { letter: "A", text: "1/3" },
      { letter: "B", text: "1/4" },
      { letter: "C", text: "2/3" },
      { letter: "D", text: "5/12" }
    ],
    correctAnswer: "C",
    explanation: "Total = 12. Not red = 3 + 5 = 8. P(not red) = 8/12 = 2/3",
    difficulty: "Medium",
    domain: "Statistics",
    skill: "Probability",
    difficultyRating: 6
  },
  {
    id: "med_math_045",
    question: "If g(x) = 3x - 7, find x when g(x) = 11",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "C",
    explanation: "3x - 7 = 11 → 3x = 18 → x = 6",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Functions",
    difficultyRating: 6
  },

  // === ANSWER D (15 questions) ===
  {
    id: "med_math_046",
    question: "Solve: 7x - 3 = 4x + 18",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "D",
    explanation: "7x - 4x = 18 + 3 → 3x = 21 → x = 7",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med_math_047",
    question: "What is 35% of 120?",
    options: [
      { letter: "A", text: "35" },
      { letter: "B", text: "38" },
      { letter: "C", text: "40" },
      { letter: "D", text: "42" }
    ],
    correctAnswer: "D",
    explanation: "35% of 120 = 0.35 × 120 = 42",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages",
    difficultyRating: 5
  },
  {
    id: "med_math_048",
    question: "A rectangle has area 84 and width 7. What is its length?",
    options: [
      { letter: "A", text: "9" },
      { letter: "B", text: "10" },
      { letter: "C", text: "11" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "D",
    explanation: "Area = length × width → 84 = length × 7 → length = 12",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Area",
    difficultyRating: 5
  },
  {
    id: "med_math_049",
    question: "What is the slope of a line perpendicular to y = (1/3)x + 5?",
    options: [
      { letter: "A", text: "1/3" },
      { letter: "B", text: "3" },
      { letter: "C", text: "5" },
      { letter: "D", text: "-3" }
    ],
    correctAnswer: "D",
    explanation: "Perpendicular slopes are negative reciprocals. -1/(1/3) = -3",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Perpendicular lines",
    difficultyRating: 7
  },
  {
    id: "med_math_050",
    question: "Simplify: (x - 4)(x + 4)",
    options: [
      { letter: "A", text: "x² + 16" },
      { letter: "B", text: "x² - 8x - 16" },
      { letter: "C", text: "x² + 8" },
      { letter: "D", text: "x² - 16" }
    ],
    correctAnswer: "D",
    explanation: "This is a difference of squares pattern: (x - 4)(x + 4) = x² - 16",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Special products",
    difficultyRating: 6
  },
  {
    id: "med_math_051",
    question: "What is 2⁻³?",
    options: [
      { letter: "A", text: "-6" },
      { letter: "B", text: "-8" },
      { letter: "C", text: "1/6" },
      { letter: "D", text: "1/8" }
    ],
    correctAnswer: "D",
    explanation: "2⁻³ = 1/2³ = 1/8",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Negative exponents",
    difficultyRating: 6
  },
  {
    id: "med_math_052",
    question: "If the ratio of boys to girls is 3:5 and there are 24 boys, how many girls are there?",
    options: [
      { letter: "A", text: "30" },
      { letter: "B", text: "35" },
      { letter: "C", text: "38" },
      { letter: "D", text: "40" }
    ],
    correctAnswer: "D",
    explanation: "3/5 = 24/x → 3x = 120 → x = 40 girls",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Ratios",
    difficultyRating: 6
  },
  {
    id: "med_math_053",
    question: "Factor: x² - 7x + 12",
    options: [
      { letter: "A", text: "(x - 2)(x - 6)" },
      { letter: "B", text: "(x + 3)(x + 4)" },
      { letter: "C", text: "(x - 1)(x - 12)" },
      { letter: "D", text: "(x - 3)(x - 4)" }
    ],
    correctAnswer: "D",
    explanation: "Find two numbers that multiply to 12 and add to -7: -3 and -4. So (x - 3)(x - 4)",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Factoring",
    difficultyRating: 6
  },
  {
    id: "med_math_054",
    question: "A cylinder has radius 3 and height 8. What is its volume?",
    options: [
      { letter: "A", text: "72π" },
      { letter: "B", text: "48π" },
      { letter: "C", text: "24π" },
      { letter: "D", text: "96π" }
    ],
    correctAnswer: "A",
    explanation: "V = πr²h = π × 3² × 8 = π × 9 × 8 = 72π",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Volume",
    difficultyRating: 7
  },
  {
    id: "med_math_055",
    question: "What is the distance between points (1, 2) and (4, 6)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "7" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "D",
    explanation: "d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Distance formula",
    difficultyRating: 7
  },
  {
    id: "med_math_056",
    question: "Solve: 2(3x - 1) = 5x + 4",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "D",
    explanation: "6x - 2 = 5x + 4 → 6x - 5x = 4 + 2 → x = 6",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear equations",
    difficultyRating: 6
  },
  {
    id: "med_math_057",
    question: "What is the sum of the first 8 positive integers?",
    options: [
      { letter: "A", text: "28" },
      { letter: "B", text: "32" },
      { letter: "C", text: "30" },
      { letter: "D", text: "36" }
    ],
    correctAnswer: "D",
    explanation: "Sum = n(n+1)/2 = 8(9)/2 = 72/2 = 36",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Arithmetic series",
    difficultyRating: 6
  },
  {
    id: "med_math_058",
    question: "If h(x) = x² - 4x + 3, what is h(5)?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "6" },
      { letter: "C", text: "5" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "D",
    explanation: "h(5) = 25 - 20 + 3 = 8",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Function evaluation",
    difficultyRating: 6
  },
  {
    id: "med_math_059",
    question: "A price increases from $50 to $60. What is the percent increase?",
    options: [
      { letter: "A", text: "10%" },
      { letter: "B", text: "15%" },
      { letter: "C", text: "16.7%" },
      { letter: "D", text: "20%" }
    ],
    correctAnswer: "D",
    explanation: "Percent increase = (60-50)/50 × 100 = 10/50 × 100 = 20%",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent change",
    difficultyRating: 6
  },
  {
    id: "med_math_060",
    question: "What is √(x²) when x = -7?",
    options: [
      { letter: "A", text: "-7" },
      { letter: "B", text: "49" },
      { letter: "C", text: "-49" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "D",
    explanation: "√(x²) = |x|. When x = -7, |−7| = 7",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Absolute value and radicals",
    difficultyRating: 7
  }
];
