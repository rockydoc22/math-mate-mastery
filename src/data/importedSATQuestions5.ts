import { Question } from './questions';

interface ImageQuestion extends Question {
  imageUrl?: string;
  isNumericAnswer?: boolean;
}

export const importedSATMathQuestions5: ImageQuestion[] = [
  {
    id: "sat-math-73b3b7d8",
    question: "The solution to the given system of equations is (x, y). What is the value of 30x?",
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "15" },
      { letter: "C", text: "20" },
      { letter: "D", text: "25" }
    ],
    correctAnswer: "C",
    explanation: "Adding the first equation to the second equation in the given system yields 5y − 5y = 10x + 5x + 11 − 21, or 0 = 15x − 10. Adding 10 to both sides yields 10 = 15x. Multiplying both sides by 2 yields 20 = 30x.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of equations",
    imageUrl: "/questions/sat-math-73b3b7d8.jpg"
  },
  {
    id: "sat-math-301faf80",
    question: "The product of two positive integers is 462. If the first integer is 5 greater than twice the second integer, what is the smaller of the two integers?",
    options: [
      { letter: "A", text: "11" },
      { letter: "B", text: "14" },
      { letter: "C", text: "21" },
      { letter: "D", text: "33" }
    ],
    correctAnswer: "B",
    explanation: "Let x represent the first integer and y represent the second integer. If x = 2y + 5 and xy = 462, substituting yields (2y + 5)(y) = 462, or 2y² + 5y − 462 = 0. Factoring gives (2y + 33)(y − 14) = 0. Since y is positive, y = 14. The two integers are 14 and 33, so the smaller is 14.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-301faf80.jpg"
  },
  {
    id: "sat-math-128c75e2",
    question: "The function g is defined by g(x) = |x| − 14, where a < 0. What is the product of g(15a) and g(7a)?",
    options: [
      { letter: "A", text: "549" },
      { letter: "B", text: "609" },
      { letter: "C", text: "651" },
      { letter: "D", text: "693" }
    ],
    correctAnswer: "B",
    explanation: "Since a < 0, |15a| = −15a and |7a| = −7a. So g(15a) = −15a − 14 = −29 and g(7a) = −7a − 14 = −21. The product is (−29)(−21) = 609.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-128c75e2.jpg"
  },
  {
    id: "sat-math-02060533",
    question: "The table shows three values of x and their corresponding values of g(x), where g(x) is related to a linear function f. What is the y-intercept of the graph of f in the xy-plane?",
    options: [
      { letter: "A", text: "(0, 36)" },
      { letter: "B", text: "(0, 12)" },
      { letter: "C", text: "(0, 4)" },
      { letter: "D", text: "(0, −9)" }
    ],
    correctAnswer: "A",
    explanation: "Using the table values and the relationship between f and g, the slope of f is 4. Using the point (-9, 0), f(x) = 4x + b gives 0 = 4(-9) + b, so b = 36. The y-intercept is (0, 36).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-02060533.jpg"
  },
  {
    id: "sat-math-91e7ea5e",
    question: "The quadratic function h is defined as shown. In the xy-plane, the graph of h(x) intersects the x-axis at the points (0, 0) and (t, 0), where t is a constant. What is the value of t?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "4" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "D",
    explanation: "Using the given quadratic function and the condition that the graph intersects the x-axis at (t, 0), solving the equation yields t = 8.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-91e7ea5e.jpg"
  },
  {
    id: "sat-math-358f18bc",
    question: "What is the minimum value of the function f(x) = x² − 48x + 2,304?",
    options: [
      { letter: "A", text: "1,152" },
      { letter: "B", text: "1,536" },
      { letter: "C", text: "1,728" },
      { letter: "D", text: "2,304" }
    ],
    correctAnswer: "C",
    explanation: "By completing the square, f(x) = x² − 48x + 2,304 = (x − 24)² + 1,728. The minimum value is 1,728.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-358f18bc.jpg"
  },
  {
    id: "sat-math-3a9d60b2",
    question: "What is the positive solution to the equation 5|4 − x| = 25?",
    options: [
      { letter: "A", text: "−1" },
      { letter: "B", text: "1" },
      { letter: "C", text: "5" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "D",
    explanation: "Dividing by 5 gives |4 − x| = 5. So 4 − x = 5 or 4 − x = −5, giving x = −1 or x = 9. The positive solution is 9.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-3a9d60b2.jpg"
  },
  {
    id: "sat-math-8490cc45",
    question: "The function f is defined by f(x) = (−8)(2)^x + 22. What is the y-intercept of the graph of y = f(x) in the xy-plane?",
    options: [
      { letter: "A", text: "(0, 14)" },
      { letter: "B", text: "(0, 22)" },
      { letter: "C", text: "(0, −8)" },
      { letter: "D", text: "(0, −6)" }
    ],
    correctAnswer: "A",
    explanation: "Substituting x = 0: f(0) = (−8)(2)⁰ + 22 = (−8)(1) + 22 = 14. The y-intercept is (0, 14).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-8490cc45.jpg"
  },
  {
    id: "sat-math-ebed7dc6",
    question: "An auditorium has seats for people. Tickets currently cost $12. For each $1 increase in price, 100 fewer tickets will be sold. The equation y = −100x² + 1,400x + 7,200 models this. At what value of x is the maximum revenue?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "7" },
      { letter: "C", text: "12" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: "For y = −100x² + 1,400x + 7,200, the x-coordinate of the vertex is −b/(2a) = −1,400/(2×(−100)) = 7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-ebed7dc6.jpg"
  },
  {
    id: "sat-math-ba0edc30",
    question: "One solution to x² − 2x − 9 = 0 can be written as 1 + √k, where k is a constant. What is the value of k?",
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "10" },
      { letter: "C", text: "12" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: "Adding 9 gives x² − 2x = 9. Completing the square: (x − 1)² = 10. Taking the square root: x = 1 ± √10. So k = 10.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-ba0edc30.jpg"
  },
  {
    id: "sat-math-line-para",
    question: "In the xy-plane, a line with equation 2y = 4.5 intersects a parabola at exactly one point. If the parabola has equation y = −4x² + bx, where b is a positive constant, what is the value of b?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "6" },
      { letter: "D", text: "9" }
    ],
    correctAnswer: "C",
    explanation: "Setting y = 2.25 in the parabola equation: 2.25 = −4x² + bx, or 4x² − bx + 2.25 = 0. For exactly one solution, discriminant = 0: b² − 36 = 0, so b = 6.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-line-para.jpg"
  },
  {
    id: "sat-math-a9084ca4",
    question: "The function f(x) = 9,000(0.66)^x models the number of advertisements a company sent each year, where x is years since 1997. What is the best interpretation of the y-intercept?",
    options: [
      { letter: "A", text: "The minimum estimated number during the years was 9,000" },
      { letter: "B", text: "The minimum estimated number during the years was 66" },
      { letter: "C", text: "The estimated number in 1997 was 66" },
      { letter: "D", text: "The estimated number in 1997 was 9,000" }
    ],
    correctAnswer: "D",
    explanation: "When x = 0 (year 1997), f(0) = 9,000(0.66)⁰ = 9,000(1) = 9,000. The y-intercept means the estimated number in 1997 was 9,000.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-a9084ca4.jpg"
  },
  {
    id: "sat-math-66bce0c1",
    question: "What is the solution set of the equation √(2x + 6) + 4 = x + 3?",
    options: [
      { letter: "A", text: "{−1}" },
      { letter: "B", text: "{5}" },
      { letter: "C", text: "{−1, 5}" },
      { letter: "D", text: "{1, 5}" }
    ],
    correctAnswer: "B",
    explanation: "Isolating the radical and squaring yields a quadratic. Checking both solutions, only x = 5 satisfies the original equation.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-66bce0c1.jpg"
  },
  {
    id: "sat-math-c81b6c57",
    question: "In the expression 3(2x² + px − 8) − 16x(p − 4), p is a constant. This expression is equivalent to 6x² − 155x + 24. What is the value of p?",
    options: [
      { letter: "A", text: "−3" },
      { letter: "B", text: "7" },
      { letter: "C", text: "13" },
      { letter: "D", text: "155" }
    ],
    correctAnswer: "B",
    explanation: "Expanding: 6x² + 3px − 24 − 16px + 64 = 6x² + (3p − 16p)x + 40 = 6x² − 13px + 40. Since coefficient of x is −155: −13p − 64 = −155, so p = 7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-c81b6c57.jpg"
  },
  {
    id: "sat-math-17d0e87d",
    question: "The given equation relates the distinct positive real numbers w, x, and y. Which equation correctly expresses w in terms of x and y?",
    options: [
      { letter: "A", text: "w = x² − 19" },
      { letter: "B", text: "w = (x − 19)²" },
      { letter: "C", text: "w = (x/y)² − 19" },
      { letter: "D", text: "w = x²/y² − 19" }
    ],
    correctAnswer: "C",
    explanation: "Dividing and squaring both sides appropriately yields w = (x/y)² − 19.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-17d0e87d.jpg"
  },
  {
    id: "sat-math-2f51abc2",
    question: "The function f is defined by f(x) = |59 − 2x|. For which of the following values of k does f(k) = 3k?",
    options: [
      { letter: "A", text: "59/5" },
      { letter: "B", text: "59/3" },
      { letter: "C", text: "−59" },
      { letter: "D", text: "59" }
    ],
    correctAnswer: "A",
    explanation: "Setting 3k = |59 − 2k| and solving: 3k = 59 − 2k gives 5k = 59, so k = 59/5. Checking: 3(59/5) = |59 − 2(59/5)| = |59 − 118/5| = |177/5| = 177/5 ✓",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-2f51abc2.jpg"
  },
  {
    id: "sat-math-5355c0ef",
    question: "The expression 0.36x² + 0.63x + 1.17 can be rewritten as a(4x² + 7x + 13), where a is a constant. What is the value of a?",
    options: [
      { letter: "A", text: "0.07" },
      { letter: "B", text: "0.09" },
      { letter: "C", text: "0.11" },
      { letter: "D", text: "0.13" }
    ],
    correctAnswer: "B",
    explanation: "Comparing coefficients: 0.36 = 4a, so a = 0.09. Verify: 0.63 = 7a = 7(0.09) = 0.63 ✓ and 1.17 = 13a = 13(0.09) = 1.17 ✓",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-5355c0ef.jpg"
  },
  {
    id: "sat-math-ce579859",
    question: "A model estimates that at the end of each year, the number of squirrels was 150% more than the previous year. At the end of 2016, there were 180 squirrels. Which equation represents this model?",
    options: [
      { letter: "A", text: "n = 180(1.5)^t" },
      { letter: "B", text: "n = 72(2.5)^t" },
      { letter: "C", text: "n = 180(1.5)^t" },
      { letter: "D", text: "n = 180(2.5)^t" }
    ],
    correctAnswer: "B",
    explanation: "150% more means multiply by 2.5 each year. At t = 1, n = 180, so 180 = a(2.5)¹, giving a = 72. Thus n = 72(2.5)^t.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-ce579859.jpg"
  },
  {
    id: "sat-math-8462b105",
    question: "The function f gives the product of a number, x, and a number that is 91 more than x. Which equation defines f?",
    options: [
      { letter: "A", text: "f(x) = x² − 91x" },
      { letter: "B", text: "f(x) = x² − 91" },
      { letter: "C", text: "f(x) = x² + 91x" },
      { letter: "D", text: "f(x) = x + 91" }
    ],
    correctAnswer: "C",
    explanation: "A number that is 91 more than x is x + 91. The product is x(x + 91) = x² + 91x.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-8462b105.jpg"
  },
  {
    id: "sat-math-88a0c425",
    question: "In the equation −2x² + 20x + c = 0, c is a constant. The equation has exactly one solution. What is the value of c?",
    options: [
      { letter: "A", text: "−100" },
      { letter: "B", text: "−50" },
      { letter: "C", text: "50" },
      { letter: "D", text: "100" }
    ],
    correctAnswer: "B",
    explanation: "For exactly one solution, discriminant = 0: b² − 4ac = 0. With a = −2 and b = 20: 400 + 8c = 0, so c = −50.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-88a0c425.jpg"
  },
  {
    id: "sat-math-7028c74f",
    question: "What is the sum of the solutions to 5(x + 7) = 15(x − 17)(x + 7)?",
    options: [
      { letter: "A", text: "31/3" },
      { letter: "B", text: "10" },
      { letter: "C", text: "45/3" },
      { letter: "D", text: "17" }
    ],
    correctAnswer: "A",
    explanation: "Factoring: 5(x + 7)(3(x − 17) − 1) = 0, giving x = −7 or 3x − 52 = 0 (x = 52/3). Sum = −7 + 52/3 = 31/3.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-7028c74f.jpg"
  },
  {
    id: "sat-math-03ff48d2",
    question: "In the equation x(kx − 56) = −16, k is an integer constant. If the equation has no real solution, what is the least possible value of k?",
    options: [
      { letter: "A", text: "48" },
      { letter: "B", text: "49" },
      { letter: "C", text: "50" },
      { letter: "D", text: "51" }
    ],
    correctAnswer: "C",
    explanation: "Rewriting: kx² − 56x + 16 = 0. For no real solutions: b² − 4ac < 0, so 3136 − 64k < 0, giving k > 49. The least integer is 50.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-03ff48d2.jpg"
  },
  {
    id: "sat-math-8e1da169",
    question: "The function f(x) = (x − 44)(x − 46) is defined. For what value of x does f(x) reach its minimum?",
    options: [
      { letter: "A", text: "44" },
      { letter: "B", text: "45" },
      { letter: "C", text: "46" },
      { letter: "D", text: "−1" }
    ],
    correctAnswer: "B",
    explanation: "Expanding: f(x) = x² − 90x + 2,024. The x-coordinate of the vertex is −b/(2a) = 90/2 = 45.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-8e1da169.jpg"
  },
  {
    id: "sat-math-softball",
    question: "A machine launches a softball from ground level. It reaches a maximum height of 51.84 meters at 1.8 seconds and hits the ground at 3.6 seconds. Which equation represents the height h at time t?",
    options: [
      { letter: "A", text: "h = −16(t)² + 3.6" },
      { letter: "B", text: "h = −16(t)² + 51.84" },
      { letter: "C", text: "h = −16(t − 3.6)² + 51.84" },
      { letter: "D", text: "h = −16(t − 1.8)² + 51.84" }
    ],
    correctAnswer: "D",
    explanation: "The vertex form h = −a(t − 1.8)² + 51.84 with h = 0 at t = 3.6 gives a = 16. So h = −16(t − 1.8)² + 51.84.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-softball.jpg"
  },
  {
    id: "sat-math-4a0d0399",
    question: "The function f is defined by f(x) = aˣ + b, where a and b are constants. The graph has an x-intercept at (2, 0) and a y-intercept at (0, −323). What is the value of b?",
    options: [
      { letter: "A", text: "−324" },
      { letter: "B", text: "−323" },
      { letter: "C", text: "−322" },
      { letter: "D", text: "−321" }
    ],
    correctAnswer: "A",
    explanation: "At (0, −323): f(0) = a⁰ + b = 1 + b = −323, so b = −324.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-4a0d0399.jpg"
  },
  {
    id: "sat-math-f2f3fa00",
    question: "During a 5-second interval, average acceleration a = (vf − 12)/5. If rewritten as vf = xa + y, what is the value of x?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "5" },
      { letter: "C", text: "7" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "B",
    explanation: "From a = (vf − 12)/5, multiplying both sides by 5: 5a = vf − 12. Adding 12: vf = 5a + 12. So x = 5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-f2f3fa00.jpg"
  },
  {
    id: "sat-math-9654add7",
    question: "The revenue function f intersects the x-axis at 0 and a. What does a represent?",
    options: [
      { letter: "A", text: "The revenue when the unit price is $0" },
      { letter: "B", text: "The unit price that results in maximum revenue" },
      { letter: "C", text: "The unit price that results in a revenue of $0" },
      { letter: "D", text: "The maximum revenue" }
    ],
    correctAnswer: "C",
    explanation: "When the graph intersects the x-axis, revenue (y-value) is 0. So a is the unit price that results in revenue of $0.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-9654add7.jpg"
  },
  {
    id: "sat-math-263f9937",
    question: "A culture of bacteria is doubling each day. Day 1: 2.5 × 10⁵, Day 2: 5.0 × 10⁵, Day 3: 10⁶. On which day would the number reach 5.12 × 10⁸?",
    options: [
      { letter: "A", text: "Day 5" },
      { letter: "B", text: "Day 9" },
      { letter: "C", text: "Day 11" },
      { letter: "D", text: "Day 12" }
    ],
    correctAnswer: "D",
    explanation: "At end of day d, bacteria = 10⁶ × 2^(d−3). Setting equal to 5.12 × 10⁸ = 512 × 10⁶: 2^(d−3) = 512 = 2⁹, so d = 12.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-263f9937.jpg"
  },
  {
    id: "sat-math-fada6b03",
    question: "One solution to 2x² − 8x − 7 = 0 can be written as (8 − √k)/4, where k is a constant. What is the value of k?",
    options: [
      { letter: "A", text: "64" },
      { letter: "B", text: "96" },
      { letter: "C", text: "120" },
      { letter: "D", text: "144" }
    ],
    correctAnswer: "C",
    explanation: "Using the quadratic formula: x = (8 ± √(64 + 56))/4 = (8 ± √120)/4. So k = 120.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-fada6b03.jpg"
  },
  {
    id: "sat-math-137cc6fd",
    question: "For what value of n is √(70ⁿ)·√(70ⁿ) equivalent to (70ⁿ)^(1/30x), where n > 1?",
    options: [
      { letter: "A", text: "4/225" },
      { letter: "B", text: "1/15" },
      { letter: "C", text: "4/15" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "The expression simplifies to (70ⁿ)^(1/15). Setting 1/15 = 1/30x gives x = 2. Working through yields n = 4/225.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-137cc6fd.jpg"
  },
  {
    id: "sat-math-6ce95fc8",
    question: "Which of the following is a solution to 2x² + 8x = 2?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "−2 − √3" },
      { letter: "C", text: "−2 − √5" },
      { letter: "D", text: "−2 + √5" }
    ],
    correctAnswer: "D",
    explanation: "Using the quadratic formula with a = 2, b = 8, c = −2: x = (−8 ± √(64 + 16))/4 = (−8 ± √80)/4 = −2 ± √5. Choice D is −2 + √5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-6ce95fc8.jpg"
  },
  {
    id: "sat-math-841ef26c",
    question: "The function f(x) = 4x² + 64x + 262 and g(x) = f(x + 5). For what value of x does g(x) reach its minimum?",
    options: [
      { letter: "A", text: "−13" },
      { letter: "B", text: "−8" },
      { letter: "C", text: "−3" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "g(x) = f(x + 5) = 4(x+5)² + 64(x+5) + 262 = 4x² + 104x + 682. Completing the square: g(x) = 4(x + 13)² + 6. Minimum at x = −13.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-841ef26c.jpg"
  },
  {
    id: "sat-math-qr78st90",
    question: "The expression (3x − 23)(19x + 6) is equivalent to ax² + bx + c. What is the value of b?",
    options: [
      { letter: "A", text: "−437" },
      { letter: "B", text: "−419" },
      { letter: "C", text: "−401" },
      { letter: "D", text: "−383" }
    ],
    correctAnswer: "B",
    explanation: "Expanding: 57x² + 18x − 437x − 138 = 57x² − 419x − 138. So b = −419.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-qr78st90.jpg"
  },
  {
    id: "sat-math-09d21d79",
    question: "The graph of y = 2x² + bx + c is shown, where b and c are constants. What is the value of bc?",
    options: [
      { letter: "A", text: "−24" },
      { letter: "B", text: "−12" },
      { letter: "C", text: "12" },
      { letter: "D", text: "24" }
    ],
    correctAnswer: "A",
    explanation: "From the graph passing through (0, −6) and having vertex at (−1, −8): c = −6 and b = 4. So bc = 4(−6) = −24.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-09d21d79.jpg"
  },
  {
    id: "sat-math-722de804",
    question: "What is the sum of the solutions to (x − 47)² = 1?",
    options: [
      { letter: "A", text: "46" },
      { letter: "B", text: "48" },
      { letter: "C", text: "94" },
      { letter: "D", text: "96" }
    ],
    correctAnswer: "C",
    explanation: "Taking square root: x − 47 = ±1, so x = 48 or x = 46. Sum = 48 + 46 = 94.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-722de804.jpg"
  },
  {
    id: "sat-math-433184f1",
    question: "Which expression is equivalent to 4/(x+1) − 1/(4x−5)?",
    options: [
      { letter: "A", text: "3/(5x − 4)" },
      { letter: "B", text: "3/((x+1)(4x−5))" },
      { letter: "C", text: "(15x − 21)/((x+1)(4x−5))" },
      { letter: "D", text: "9/((x+1)(4x−5))" }
    ],
    correctAnswer: "D",
    explanation: "Getting common denominator: (4(4x−5) − (x+1))/((x+1)(4x−5)) = (16x − 20 − x − 1)/((x+1)(4x−5)) = (15x − 21)/((x+1)(4x−5)).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-433184f1.jpg"
  },
  {
    id: "sat-math-d135f4bf",
    question: "The function f(x) = (x − 6)(x − 2)(x + 6). The graph of y = g(x) is the result of translating y = f(x) up 4 units. What is g(0)?",
    options: [
      { letter: "A", text: "68" },
      { letter: "B", text: "72" },
      { letter: "C", text: "76" },
      { letter: "D", text: "80" }
    ],
    correctAnswer: "C",
    explanation: "g(x) = f(x) + 4. So g(0) = f(0) + 4 = (−6)(−2)(6) + 4 = 72 + 4 = 76.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-d135f4bf.jpg"
  },
  {
    id: "sat-math-d8789a4c",
    question: "The expression (x² − c)/(x − b) is equivalent to x + b, where b and c are positive integers. If b < 5, which could be the value of c?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "If (x² − c)/(x − b) = x + b, then x² − c = (x − b)(x + b) = x² − b². So c = b². For c to be a perfect square, only c = 4 (b = 2) works.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-d8789a4c.jpg"
  }
];

export const importedSATMathCount5 = importedSATMathQuestions5.length;
