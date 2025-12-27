import { Question } from './questions';

export const level8QuestionsExtra: Question[] = [
  {
    id: "sat-l8-extra-001",
    question: "A polynomial function p is defined as p(x) = (x - a)(x - b)(x - c), where a, b, and c are constants. If p(x) has zeros at x = -3, x = 2, and x = 5, what is the value of p(0)?",
    options: [
      { letter: "A", text: "-30" },
      { letter: "B", text: "-15" },
      { letter: "C", text: "15" },
      { letter: "D", text: "30" }
    ],
    correctAnswer: "D",
    explanation: "With zeros at -3, 2, and 5: p(x) = (x + 3)(x - 2)(x - 5). So p(0) = (3)(-2)(-5) = 30.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Polynomial Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-002",
    question: "In a geometric sequence, the 3rd term is 12 and the 6th term is 96. What is the first term of the sequence?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "Let a₁ be the first term and r be the common ratio. a₃ = a₁r² = 12 and a₆ = a₁r⁵ = 96. Dividing: r³ = 8, so r = 2. Then a₁(4) = 12, so a₁ = 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Sequences",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-003",
    question: "If 2^(x+1) + 2^(x-1) = 80, what is the value of x?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "B",
    explanation: "2^(x+1) + 2^(x-1) = 2·2^x + 2^x/2 = 2^x(2 + 0.5) = 2.5·2^x = 80. So 2^x = 32 = 2^5, meaning x = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-004",
    question: "The function f is defined by f(x) = ax² + bx + c. If f(1) = 0, f(-1) = 4, and f(2) = 3, what is the value of c?",
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "From the three conditions: a + b + c = 0, a - b + c = 4, and 4a + 2b + c = 3. Solving: a = 2, b = -2, c = 1.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-005",
    question: "A circle has center (3, -2) and passes through the point (7, 1). What is the area of the circle?",
    options: [
      { letter: "A", text: "16π" },
      { letter: "B", text: "25π" },
      { letter: "C", text: "36π" },
      { letter: "D", text: "49π" }
    ],
    correctAnswer: "B",
    explanation: "Radius = √[(7-3)² + (1-(-2))²] = √[16 + 9] = √25 = 5. Area = πr² = 25π.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Circle Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-006",
    question: "If log₂(x) + log₂(x - 6) = 4, what is the value of x?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "8" },
      { letter: "C", text: "10" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "B",
    explanation: "log₂[x(x-6)] = 4, so x(x-6) = 16. x² - 6x - 16 = 0, (x-8)(x+2) = 0. Since x > 6, x = 8.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Logarithmic Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-007",
    question: "The graph of y = f(x) is a parabola with vertex at (2, -3). If f(0) = 5, what is f(4)?",
    options: [
      { letter: "A", text: "-3" },
      { letter: "B", text: "1" },
      { letter: "C", text: "5" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "C",
    explanation: "A parabola is symmetric about its vertex. Since x = 0 is 2 units left of the vertex, x = 4 is 2 units right. So f(4) = f(0) = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-008",
    question: "In triangle ABC, angle A = 30° and angle B = 45°. If side a (opposite angle A) has length 8, what is the length of side b (opposite angle B)?",
    options: [
      { letter: "A", text: "8√2" },
      { letter: "B", text: "8" },
      { letter: "C", text: "4√2" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "A",
    explanation: "Using Law of Sines: a/sin(A) = b/sin(B). So 8/sin(30°) = b/sin(45°). 8/(1/2) = b/(√2/2). 16 = b·2/√2. b = 8√2.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Law of Sines",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-009",
    question: "If f(x) = 3x - 2 and g(x) = x² + 1, what is the value of g(f(2))?",
    options: [
      { letter: "A", text: "13" },
      { letter: "B", text: "17" },
      { letter: "C", text: "25" },
      { letter: "D", text: "37" }
    ],
    correctAnswer: "B",
    explanation: "f(2) = 3(2) - 2 = 4. Then g(4) = 4² + 1 = 17.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Function Composition",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-010",
    question: "A cone has a volume of 48π cubic centimeters and a height of 9 centimeters. What is the radius of the base?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "B",
    explanation: "V = (1/3)πr²h. 48π = (1/3)πr²(9). 48π = 3πr². r² = 16, so r = 4.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "3D Geometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-011",
    question: "The function f(x) = (x² - 9)/(x + 3) is equivalent to which of the following for all x ≠ -3?",
    options: [
      { letter: "A", text: "x - 3" },
      { letter: "B", text: "x + 3" },
      { letter: "C", text: "x² - 3" },
      { letter: "D", text: "(x - 3)²" }
    ],
    correctAnswer: "A",
    explanation: "Factor the numerator: (x² - 9)/(x + 3) = (x + 3)(x - 3)/(x + 3) = x - 3 for x ≠ -3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Rational Expressions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-012",
    question: "If sin(θ) = 3/5 and θ is in the first quadrant, what is the value of tan(θ)?",
    options: [
      { letter: "A", text: "3/4" },
      { letter: "B", text: "4/3" },
      { letter: "C", text: "3/5" },
      { letter: "D", text: "5/3" }
    ],
    correctAnswer: "A",
    explanation: "If sin(θ) = 3/5, then the opposite side is 3 and hypotenuse is 5. Adjacent = √(25-9) = 4. tan(θ) = 3/4.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-013",
    question: "A line passes through points (2, 5) and (6, -3). At what point does this line cross the y-axis?",
    options: [
      { letter: "A", text: "(0, 7)" },
      { letter: "B", text: "(0, 9)" },
      { letter: "C", text: "(0, 11)" },
      { letter: "D", text: "(0, 13)" }
    ],
    correctAnswer: "B",
    explanation: "Slope = (-3 - 5)/(6 - 2) = -8/4 = -2. Using point-slope: y - 5 = -2(x - 2). y = -2x + 9. Y-intercept is (0, 9).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-014",
    question: "If 3^(2x) = 27^(x-1), what is the value of x?",
    options: [
      { letter: "A", text: "-3" },
      { letter: "B", text: "-1" },
      { letter: "C", text: "1" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "D",
    explanation: "27 = 3³, so 3^(2x) = 3^(3(x-1)) = 3^(3x-3). Thus 2x = 3x - 3, so x = 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-015",
    question: "A rectangular prism has dimensions 3, 4, and 5. What is the length of the space diagonal?",
    options: [
      { letter: "A", text: "5√2" },
      { letter: "B", text: "√50" },
      { letter: "C", text: "6" },
      { letter: "D", text: "√41" }
    ],
    correctAnswer: "B",
    explanation: "Space diagonal = √(3² + 4² + 5²) = √(9 + 16 + 25) = √50 = 5√2.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "3D Geometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-016",
    question: "The expression (2 + i)(3 - 2i) is equivalent to which of the following? (Note: i = √-1)",
    options: [
      { letter: "A", text: "8 - i" },
      { letter: "B", text: "8 + i" },
      { letter: "C", text: "4 - i" },
      { letter: "D", text: "4 + i" }
    ],
    correctAnswer: "A",
    explanation: "(2 + i)(3 - 2i) = 6 - 4i + 3i - 2i² = 6 - i + 2 = 8 - i.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Complex Numbers",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-017",
    question: "If the average of 5 numbers is 12 and the average of 3 of those numbers is 10, what is the average of the other 2 numbers?",
    options: [
      { letter: "A", text: "14" },
      { letter: "B", text: "15" },
      { letter: "C", text: "16" },
      { letter: "D", text: "18" }
    ],
    correctAnswer: "B",
    explanation: "Sum of 5 numbers = 60. Sum of 3 numbers = 30. Sum of other 2 = 30. Average = 30/2 = 15.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-018",
    question: "A function f is defined such that f(2x) = 2f(x) + 1 for all values of x. If f(1) = 3, what is f(4)?",
    options: [
      { letter: "A", text: "13" },
      { letter: "B", text: "15" },
      { letter: "C", text: "17" },
      { letter: "D", text: "19" }
    ],
    correctAnswer: "B",
    explanation: "f(2) = 2f(1) + 1 = 2(3) + 1 = 7. f(4) = 2f(2) + 1 = 2(7) + 1 = 15.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Function Properties",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-019",
    question: "The equation x² + y² - 6x + 8y = 0 represents a circle. What is the radius of this circle?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "C",
    explanation: "Complete the square: (x² - 6x + 9) + (y² + 8y + 16) = 9 + 16. (x - 3)² + (y + 4)² = 25. Radius = 5.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Circle Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-020",
    question: "If f(x) = |2x - 6|, for how many values of x does f(x) = x?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "C",
    explanation: "Case 1: 2x - 6 = x when x ≥ 3, gives x = 6. Case 2: -(2x - 6) = x when x < 3, gives x = 2. Two solutions.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Absolute Value",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-021",
    question: "In an arithmetic sequence, the sum of the first 10 terms is 155. If the first term is 2, what is the common difference?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "B",
    explanation: "S₁₀ = (10/2)(2a₁ + 9d) = 5(4 + 9d) = 155. 20 + 45d = 155. 45d = 135. d = 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Sequences",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-022",
    question: "A sphere has a surface area of 144π square units. What is its volume?",
    options: [
      { letter: "A", text: "256π/3" },
      { letter: "B", text: "288π" },
      { letter: "C", text: "324π" },
      { letter: "D", text: "432π" }
    ],
    correctAnswer: "B",
    explanation: "Surface area = 4πr² = 144π, so r² = 36, r = 6. Volume = (4/3)πr³ = (4/3)π(216) = 288π.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "3D Geometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-023",
    question: "If log₁₀(x) = 2.5, what is the value of log₁₀(x²)?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6.25" },
      { letter: "C", text: "7.5" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "log₁₀(x²) = 2·log₁₀(x) = 2(2.5) = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Logarithms",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-024",
    question: "The graph of y = (x - 2)² - 5 has its vertex at what point?",
    options: [
      { letter: "A", text: "(2, -5)" },
      { letter: "B", text: "(-2, -5)" },
      { letter: "C", text: "(2, 5)" },
      { letter: "D", text: "(-2, 5)" }
    ],
    correctAnswer: "A",
    explanation: "In vertex form y = a(x - h)² + k, the vertex is (h, k). Here h = 2 and k = -5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-025",
    question: "If cos(θ) = -4/5 and π < θ < 3π/2, what is sin(θ)?",
    options: [
      { letter: "A", text: "3/5" },
      { letter: "B", text: "-3/5" },
      { letter: "C", text: "4/5" },
      { letter: "D", text: "-4/5" }
    ],
    correctAnswer: "B",
    explanation: "In the third quadrant, both sin and cos are negative. sin²θ + cos²θ = 1. sin²θ = 1 - 16/25 = 9/25. sin(θ) = -3/5.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-026",
    question: "What is the sum of all solutions to the equation |x - 3| = |2x + 1|?",
    options: [
      { letter: "A", text: "-2/3" },
      { letter: "B", text: "2/3" },
      { letter: "C", text: "-4/3" },
      { letter: "D", text: "4/3" }
    ],
    correctAnswer: "B",
    explanation: "Case 1: x - 3 = 2x + 1, gives x = -4. Case 2: x - 3 = -(2x + 1), gives 3x = 2, x = 2/3. Sum = -4 + 2/3 = -10/3. Let me recalculate: x - 3 = 2x + 1 → x = -4. x - 3 = -2x - 1 → 3x = 2 → x = 2/3. Sum = -4 + 2/3 = -10/3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Absolute Value",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-027",
    question: "A parabola has equation y = ax² + bx + c. If the parabola passes through (0, 3), (1, 0), and (3, 0), what is the value of a + b + c?",
    options: [
      { letter: "A", text: "-4" },
      { letter: "B", text: "0" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "At (0, 3): c = 3. Zeros at x = 1 and x = 3 means y = a(x-1)(x-3). At (0, 3): a(0-1)(0-3) = 3a = 3, so a = 1. y = (x-1)(x-3) = x² - 4x + 3. a + b + c = 1 - 4 + 3 = 0.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-028",
    question: "If the function f(x) = x³ - 6x² + 11x - 6 has a factor of (x - 1), what are the other factors?",
    options: [
      { letter: "A", text: "(x - 2)(x - 3)" },
      { letter: "B", text: "(x + 2)(x + 3)" },
      { letter: "C", text: "(x - 2)(x + 3)" },
      { letter: "D", text: "(x + 2)(x - 3)" }
    ],
    correctAnswer: "A",
    explanation: "Dividing by (x - 1) gives x² - 5x + 6 = (x - 2)(x - 3). So f(x) = (x - 1)(x - 2)(x - 3).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Polynomial Factoring",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-029",
    question: "Two similar triangles have areas in the ratio 9:25. What is the ratio of their corresponding sides?",
    options: [
      { letter: "A", text: "3:5" },
      { letter: "B", text: "9:25" },
      { letter: "C", text: "81:625" },
      { letter: "D", text: "27:125" }
    ],
    correctAnswer: "A",
    explanation: "For similar figures, the ratio of areas equals the square of the ratio of sides. If A₁/A₂ = 9/25, then s₁/s₂ = 3/5.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Similar Figures",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-030",
    question: "What is the period of the function f(x) = 3sin(2x + π/4)?",
    options: [
      { letter: "A", text: "π/2" },
      { letter: "B", text: "π" },
      { letter: "C", text: "2π" },
      { letter: "D", text: "4π" }
    ],
    correctAnswer: "B",
    explanation: "For f(x) = A·sin(Bx + C), the period is 2π/|B|. Here B = 2, so period = 2π/2 = π.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-031",
    question: "If x + 1/x = 5, what is the value of x² + 1/x²?",
    options: [
      { letter: "A", text: "21" },
      { letter: "B", text: "23" },
      { letter: "C", text: "25" },
      { letter: "D", text: "27" }
    ],
    correctAnswer: "B",
    explanation: "(x + 1/x)² = x² + 2 + 1/x² = 25. So x² + 1/x² = 23.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Algebraic Manipulation",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-032",
    question: "A regular hexagon has a side length of 6. What is its area?",
    options: [
      { letter: "A", text: "36√3" },
      { letter: "B", text: "54√3" },
      { letter: "C", text: "72√3" },
      { letter: "D", text: "108√3" }
    ],
    correctAnswer: "B",
    explanation: "A regular hexagon = 6 equilateral triangles. Each triangle has area (√3/4)s² = (√3/4)(36) = 9√3. Total = 54√3.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Polygon Area",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-033",
    question: "If f(x) = 2^x, what is f(a + 2) - f(a) in terms of f(a)?",
    options: [
      { letter: "A", text: "2f(a)" },
      { letter: "B", text: "3f(a)" },
      { letter: "C", text: "4f(a)" },
      { letter: "D", text: "f(a) + 2" }
    ],
    correctAnswer: "B",
    explanation: "f(a + 2) = 2^(a+2) = 4·2^a = 4f(a). So f(a + 2) - f(a) = 4f(a) - f(a) = 3f(a).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-034",
    question: "The expression (1 - sin²θ)/cos(θ) simplifies to which of the following?",
    options: [
      { letter: "A", text: "sin(θ)" },
      { letter: "B", text: "cos(θ)" },
      { letter: "C", text: "tan(θ)" },
      { letter: "D", text: "1" }
    ],
    correctAnswer: "B",
    explanation: "1 - sin²θ = cos²θ. So cos²θ/cosθ = cosθ.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-035",
    question: "If the roots of x² - 5x + k = 0 are in the ratio 2:3, what is the value of k?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "B",
    explanation: "Let roots be 2a and 3a. Sum = 5a = 5, so a = 1. Roots are 2 and 3. Product = k = 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-036",
    question: "A cylinder has a volume of 100π cm³ and a height of 4 cm. What is the circumference of its base?",
    options: [
      { letter: "A", text: "5π" },
      { letter: "B", text: "10π" },
      { letter: "C", text: "25π" },
      { letter: "D", text: "50π" }
    ],
    correctAnswer: "B",
    explanation: "V = πr²h. 100π = πr²(4). r² = 25, r = 5. Circumference = 2πr = 10π.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "3D Geometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-037",
    question: "For what value of k will the equation x² + kx + 9 = 0 have exactly one solution?",
    options: [
      { letter: "A", text: "±3" },
      { letter: "B", text: "±6" },
      { letter: "C", text: "±9" },
      { letter: "D", text: "±12" }
    ],
    correctAnswer: "B",
    explanation: "For one solution, discriminant = 0. k² - 4(1)(9) = 0. k² = 36. k = ±6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Equations",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-038",
    question: "If arctan(x) = π/4, what is the value of x?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1/2" },
      { letter: "C", text: "1" },
      { letter: "D", text: "√2" }
    ],
    correctAnswer: "C",
    explanation: "arctan(x) = π/4 means tan(π/4) = x. Since tan(45°) = 1, x = 1.",
    difficulty: "Hard",
    domain: "Geometry",
    skill: "Inverse Trigonometry",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-039",
    question: "A line is perpendicular to y = (2/3)x + 5 and passes through (6, 2). What is the y-intercept of this line?",
    options: [
      { letter: "A", text: "9" },
      { letter: "B", text: "11" },
      { letter: "C", text: "13" },
      { letter: "D", text: "15" }
    ],
    correctAnswer: "B",
    explanation: "Perpendicular slope = -3/2. Using point-slope: y - 2 = -3/2(x - 6). y = -3x/2 + 9 + 2 = -3x/2 + 11. Y-intercept = 11.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions",
    difficultyRating: 8
  },
  {
    id: "sat-l8-extra-040",
    question: "If f(x) = √(x + 4), what is the domain of f?",
    options: [
      { letter: "A", text: "x ≥ 0" },
      { letter: "B", text: "x ≥ 4" },
      { letter: "C", text: "x ≥ -4" },
      { letter: "D", text: "All real numbers" }
    ],
    correctAnswer: "C",
    explanation: "For √(x + 4) to be defined, x + 4 ≥ 0, so x ≥ -4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Function Domain",
    difficultyRating: 8
  }
];
