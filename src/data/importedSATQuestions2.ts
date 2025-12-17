// Imported SAT Math Questions Batch 2 (pages 12-62)
// These are authentic College Board SAT questions

import type { Question } from './questions';

export interface ImageQuestion extends Question {
  imageUrl?: string;
  isNumericAnswer?: boolean;
}

export const importedSATMathQuestions2: ImageQuestion[] = [
  {
    id: "sat-70feb725",
    question: "During a month, Morgan ran r miles at 5 miles per hour and biked b miles at 10 miles per hour. She ran and biked a total of 200 miles that month, and she biked for twice as many hours as she ran. What is the total number of miles that Morgan biked during the month?",
    imageUrl: "/questions/sat-math-70feb725.jpg",
    options: [
      { letter: "A", text: "80" },
      { letter: "B", text: "100" },
      { letter: "C", text: "120" },
      { letter: "D", text: "160" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. The number of hours Morgan spent running or biking can be calculated by dividing the distance she traveled during that activity by her speed. So the number of hours she ran can be represented by r/5, and the number of hours she biked can be represented by b/10. It's given that she biked for twice as many hours as she ran, so b/10 = 2(r/5), which gives b = 4r. It's also given that r + b = 200. Substituting 4r for b yields r + 4r = 200, or 5r = 200, so r = 40. Therefore b = 4(40) = 160.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of equations",
    difficultyRating: 9
  },
  {
    id: "sat-b988eeec",
    question: "The functions f and g are defined as f(x) = x − 9 and g(x) = 3x + 21. If the function h is defined as h(x) = f(x) + g(x), what is the x-coordinate of the x-intercept of the graph of y = h(x) in the xy-plane?",
    imageUrl: "/questions/sat-math-b988eeec.jpg",
    options: [
      { letter: "A", text: "-12" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is −12. It's given that f(x) = x − 9 and g(x) = 3x + 21. Then h(x) = f(x) + g(x) = (x − 9) + (3x + 21) = 4x + 12. The x-intercept occurs when y = 0, so 0 = 4x + 12, which gives x = −12.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  },
  {
    id: "sat-9aaf7786",
    question: "In the xy-plane, line p has a slope of −5 and an x-intercept of (−2, 0). What is the y-coordinate of the y-intercept of line p?",
    imageUrl: "/questions/sat-math-9aaf7786.jpg",
    options: [
      { letter: "A", text: "-10" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is −10. A line in the xy-plane can be represented by y = mx + b. It's given that line p has a slope of −5, so m = −5. It's also given that line p has an x-intercept of (−2, 0). Substituting −5 for m, −2 for x, and 0 for y yields 0 = −5(−2) + b, which gives 0 = 10 + b, so b = −10.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 7
  },
  {
    id: "sat-ac472881",
    question: "In the given equation, r and s are constants, and r ≠ 0. If the equation has infinitely many solutions, what is the value of s?",
    imageUrl: "/questions/sat-math-ac472881.jpg",
    options: [
      { letter: "A", text: "403" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 403. For a linear equation to have infinitely many solutions, the coefficients of the variable must be equal on both sides and the constant terms must also be equal. From the equation structure, when the coefficients match (r = 3), the constant terms must also match, leading to s = 403.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 9
  },
  {
    id: "sat-3f5a3602",
    question: "What system of linear equations is represented by the lines shown in the graph?",
    imageUrl: "/questions/sat-math-3f5a3602.jpg",
    options: [
      { letter: "A", text: "See image for options" },
      { letter: "B", text: "See image for options" },
      { letter: "C", text: "See image for options" },
      { letter: "D", text: "4x + 10y = 32 and −8x − 10y = −64" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Using the points shown on the graph, one line passes through (8, 0) and (3, 4). The slope is (4-0)/(3-8) = -4/5. The other line passes through (8, 0) and (3, 2) with slope (2-0)/(3-8) = -2/5. Converting to standard form yields the system 4x + 10y = 32 and −8x − 10y = −64.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-edc1b7b7",
    question: "The solution to the given system of equations is (x, y). What is the value of 8x + 7y?",
    imageUrl: "/questions/sat-math-edc1b7b7.jpg",
    options: [
      { letter: "A", text: "3" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 3. Adding the two equations in the system yields 8(7y) = 24, so 7y = 3. Substituting back, 8x = 0. Therefore, 8x + 7y = 0 + 3 = 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-3008cfc3",
    question: "The table gives the coordinates of two points on a line in the xy-plane. The y-intercept of the line is (k − 5, b), where k and b are constants. What is the value of b?",
    imageUrl: "/questions/sat-math-3008cfc3.jpg",
    options: [
      { letter: "A", text: "33" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 33. Using the slope formula with points (k, 13) and (k + 7, −15), the slope is (−15 − 13)/(k + 7 − k) = −28/7 = −4. Using the y-intercept point (k − 5, b) and slope −4 with point (k, 13): −4 = (13 − b)/5, so −20 = 13 − b, giving b = 33.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-4becad44",
    question: "One of the two equations in a system of linear equations is given: 3x = 36y − 45. The system has no solution. Which equation could be the second equation in this system?",
    imageUrl: "/questions/sat-math-4becad44.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "x/12 = y" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. A system has no solution when lines are parallel (same slope) but distinct (different y-intercepts). Rewriting the first equation: y = (1/12)x + 5/4. For no solution, the second equation must have slope 1/12 but different y-intercept. Choice B gives y = x/12, which has slope 1/12 and y-intercept 0.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-d1b66ae6",
    question: "If (x, y) satisfies the system of equations above, what is the value of y?",
    imageUrl: "/questions/sat-math-d1b66ae6.jpg",
    options: [
      { letter: "A", text: "1.5" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 1.5 (or 3/2). Adding the corresponding sides of the two equations yields 4y = 6, so y = 6/4 = 3/2 = 1.5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-3cdbf026",
    question: "The graph of the equation ax + ky = 1 is a line in the xy-plane, where a and k are constants. If the line contains the points (k, a) and (a, k), what is the value of k?",
    imageUrl: "/questions/sat-math-3cdbf026.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "Choice A is correct. Using slope-intercept form and the given points, the value of k can be determined through substitution and solving the resulting equations.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-00723d16",
    question: "Line ℓ is defined by 3y + 12x = 5. Line n is perpendicular to line ℓ in the xy-plane. What is the slope of line n?",
    imageUrl: "/questions/sat-math-00723d16.jpg",
    options: [
      { letter: "A", text: "0.25 or 1/4" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 1/4 (or 0.25). Rewriting line ℓ: 3y = −12x + 5, so y = −4x + 5/3. The slope of line ℓ is −4. The slope of a perpendicular line is the negative reciprocal: 1/4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 7
  },
  {
    id: "sat-ff501705",
    question: "In the given system of equations, p is a constant. If the system has no solution, what is the value of p?",
    imageUrl: "/questions/sat-math-ff501705.jpg",
    options: [
      { letter: "A", text: "6" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 6. For a system to have no solution, the lines must be parallel. This occurs when the ratio of coefficients is equal but the constants differ. Solving for when this condition is met yields p = 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-2b15d65f",
    question: "An economist modeled the demand Q for a certain product as a linear function of the selling price P. The demand was 20,000 units when the selling price was $40 per unit, and the demand was 15,000 units when the selling price was $60 per unit. Based on the model, what is the demand, in units, when the selling price is $55 per unit?",
    imageUrl: "/questions/sat-math-2b15d65f.jpg",
    options: [
      { letter: "A", text: "16,250" },
      { letter: "B", text: "16,500" },
      { letter: "C", text: "16,750" },
      { letter: "D", text: "17,500" }
    ],
    correctAnswer: "A",
    explanation: "Choice A is correct. The slope is (15,000 − 20,000)/(60 − 40) = −250 units per dollar. Using point-slope form with (40, 20000): Q = −250(P − 40) + 20,000 = −250P + 30,000. When P = 55: Q = −250(55) + 30,000 = 16,250.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  },
  {
    id: "sat-e25f0807",
    question: "The table shows two values of x and their corresponding values of y. The graph of the linear equation representing this relationship passes through the point (1/4, a). What is the value of a?",
    imageUrl: "/questions/sat-math-e25f0807.jpg",
    options: [
      { letter: "A", text: "16.25 or 65/4" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 65/4 (or 16.25). Using the two points from the table to find the linear equation y = mx + b, then substituting x = 1/4 to find a.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-686b7244",
    question: "A certain apprentice has enrolled in 85 hours of training courses. The equation 10x + 15y = 85 represents this situation, where x is the number of on-site training courses and y is the number of online training courses. How many more hours does each online training course take than each on-site training course?",
    imageUrl: "/questions/sat-math-686b7244.jpg",
    options: [
      { letter: "A", text: "5" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 5. In the equation 10x + 15y = 85, the coefficient 10 represents hours per on-site course and 15 represents hours per online course. The difference is 15 − 10 = 5 hours.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 6
  },
  {
    id: "sat-1b1deebe",
    question: "In the given system of equations, a and b are constants. The graphs of these equations in the xy-plane intersect at the point (4, y). What is the value of a?",
    imageUrl: "/questions/sat-math-1b1deebe.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Since (4, y) is the solution, substituting x = 4 into the manipulated system equations and solving yields a = 14.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-be9cb6a2",
    question: "The cost of renting a backhoe for up to 10 days is $270 for the first day and $135 for each additional day. Which of the following equations gives the cost y, in dollars, of renting the backhoe for x days, where x is a positive integer and x ≤ 10?",
    imageUrl: "/questions/sat-math-be9cb6a2.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "y = 135x + 135" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. The cost is $270 for day 1 plus $135 for each additional (x − 1) days: y = 270 + 135(x − 1) = 270 + 135x − 135 = 135x + 135.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 7
  },
  {
    id: "sat-db422e7f",
    question: "Line p is defined by 4y + 8x = 6. Line r is perpendicular to line p in the xy-plane. What is the slope of line r?",
    imageUrl: "/questions/sat-math-db422e7f.jpg",
    options: [
      { letter: "A", text: "0.5 or 1/2" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 1/2 (or 0.5). Rewriting line p: 4y = −8x + 6, so y = −2x + 3/2. The slope of line p is −2. The perpendicular slope is 1/2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 7
  },
  {
    id: "sat-45cfb9de",
    question: "Adam's school is a 20-minute walk or a 5-minute bus ride away from his house. The bus runs once every 30 minutes, and the number of minutes, w, that Adam waits for the bus varies between 0 and 30. Which of the following inequalities gives the values of w for which it would be faster for Adam to walk to school?",
    imageUrl: "/questions/sat-math-45cfb9de.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "w + 5 > 20" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. The total bus time is w (wait) + 5 (ride) = w + 5 minutes. Walking is faster when w + 5 > 20.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 7
  },
  {
    id: "sat-571174f3",
    question: "In the given system of equations, g and k are constants. The system has infinitely many solutions. What is the value of g?",
    imageUrl: "/questions/sat-math-571174f3.jpg",
    options: [
      { letter: "A", text: "2/7 or 0.2857" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 2/7. For infinitely many solutions, the equations must be equivalent. Multiplying the first equation by 4 and comparing coefficients yields g = 2/7.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-979c6ebc",
    question: "For each real number r, which of the following points lies on the graph of each equation in the xy-plane for the given system?",
    imageUrl: "/questions/sat-math-979c6ebc.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "(−6r/7 + 5/7, r)" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. The two equations in the system are equivalent. Substituting r for y and solving for x gives x = (−6r + 5)/7. Therefore, the point ((−6r + 5)/7, r) lies on both graphs.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-f14484a5",
    question: "A manufacturing plant makes 7-inch, 9-inch, and 10-inch frying pans. During a certain day, the number of 9-inch frying pans is n and the number of 10-inch frying pans is 4 times the number of 9-inch pans. The number of 7-inch pans is 10. The plant makes 100 frying pans total. Which equation represents this situation?",
    imageUrl: "/questions/sat-math-f14484a5.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "5n + 10 = 100" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. The total is n (9-inch) + 4n (10-inch) + 10 (7-inch) = 5n + 10 = 100.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 7
  },
  {
    id: "sat-797a81fb",
    question: "How many solutions does the given system of equations have? (−12x + 14y = 36 and −6x + 7y = −18)",
    imageUrl: "/questions/sat-math-797a81fb.jpg",
    options: [
      { letter: "A", text: "Exactly one" },
      { letter: "B", text: "Exactly two" },
      { letter: "C", text: "Infinitely many" },
      { letter: "D", text: "Zero" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Converting to slope-intercept form, both lines have slope 6/7 but different y-intercepts (18/7 and −18/7). Since the lines are parallel but distinct, there are zero solutions.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-4f1342d6",
    question: "In August, a car dealer completed 15 more than 3 times the number of sales the car dealer completed in September. In August and September, the car dealer completed 363 sales. How many sales did the car dealer complete in September?",
    imageUrl: "/questions/sat-math-4f1342d6.jpg",
    options: [
      { letter: "A", text: "87" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 87. Let x = September sales. August = 3x + 15. Total: x + (3x + 15) = 363, so 4x + 15 = 363, giving 4x = 348, x = 87.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 7
  },
  {
    id: "sat-b5f62071",
    question: "In the given system of equations, r is a constant. If the system has no solution, what is the value of r?",
    imageUrl: "/questions/sat-math-b5f62071.jpg",
    options: [
      { letter: "A", text: "-28" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is −28. For no solution, the lines must be parallel. Comparing coefficients after rewriting in standard form yields r = −28.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-38bf4e04",
    question: "A factory makes 4-inch, 7-inch, and 9-inch concrete screws. During a certain day, the number of 7-inch screws is n, the number of 9-inch screws is 5 times the 7-inch, and the number of 4-inch is 22. The factory makes 100 screws total. Which equation represents this situation?",
    imageUrl: "/questions/sat-math-38bf4e04.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "6n + 22 = 100" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Total screws: n + 5n + 22 = 6n + 22 = 100.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 7
  },
  {
    id: "sat-b7e6394d",
    question: "Alan drives an average of 100 miles each week. His car can travel 25 miles per gallon. Alan would like to reduce his weekly expenditure on gasoline by $5. Assuming gasoline costs $4 per gallon, which equation can Alan use to determine how many fewer miles, m, he should drive each week?",
    imageUrl: "/questions/sat-math-b7e6394d.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "(4/25)m = 5" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Cost per mile = $4/gallon ÷ 25 miles/gallon = $4/25 per mile. To save $5: (4/25)m = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 8
  },
  {
    id: "sat-ee2f611f",
    question: "A local transit company sells a monthly pass for $95 that allows unlimited trips. Individual trips cost $1.50, $2.50, or $3.50 depending on length. What is the minimum number of trips per month for which a monthly pass could cost less than purchasing individual tickets?",
    imageUrl: "/questions/sat-math-ee2f611f.jpg",
    options: [
      { letter: "A", text: "28" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 28. To minimize trips needed, assume maximum cost per trip ($3.50). Solving 95 < 3.50n gives n > 27.14, so minimum is 28 trips.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 8
  },
  {
    id: "sat-25e1cfed",
    question: "How many solutions does the equation 30(5x − 3) = −90 + 150x have?",
    imageUrl: "/questions/sat-math-25e1cfed.jpg",
    options: [
      { letter: "A", text: "Exactly one" },
      { letter: "B", text: "Exactly two" },
      { letter: "C", text: "Infinitely many" },
      { letter: "D", text: "Zero" }
    ],
    correctAnswer: "C",
    explanation: "Choice C is correct. Expanding: 150x − 90 = −90 + 150x. Since both sides are identical (150x − 90 = 150x − 90), the equation is true for all x, giving infinitely many solutions.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 7
  },
  {
    id: "sat-fdee0fbf",
    question: "In the xy-plane, line k intersects the y-axis at a point and passes through another point. If the point (20, w) lies on line k, what is the value of w?",
    imageUrl: "/questions/sat-math-fdee0fbf.jpg",
    options: [
      { letter: "A", text: "74" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 74. Using the y-intercept and another point on the line to find the equation, then substituting x = 20 yields w = 74.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-541bef2f",
    question: "Which point is a solution to the given system of inequalities: y ≤ x + 7 and y ≥ −2x − 1?",
    imageUrl: "/questions/sat-math-541bef2f.jpg",
    options: [
      { letter: "A", text: "(−14, 0)" },
      { letter: "B", text: "(0, −14)" },
      { letter: "C", text: "(0, 14)" },
      { letter: "D", text: "(14, 0)" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Testing (14, 0): 0 ≤ 14 + 7 = 21 ✓ and 0 ≥ −2(14) − 1 = −29 ✓. Both inequalities are satisfied.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 7
  },
  {
    id: "sat-f75bd744",
    question: "In the given system of equations, t is a constant. If the system has no solution, what is the value of t?",
    imageUrl: "/questions/sat-math-f75bd744.jpg",
    options: [
      { letter: "A", text: "8" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 8. Using the elimination method and setting up the condition for no solution (parallel lines), the value of t = 8.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-d0e614a6",
    question: "Which table gives three values of x and their corresponding values of y for the given equation?",
    imageUrl: "/questions/sat-math-d0e614a6.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "x: 1,2,4 → y: 15,116,92" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Substituting x = 1, 2, and 4 into the given equation and solving for y yields the values in table D.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-b3abf40f",
    question: "The function F gives the temperature in degrees Fahrenheit for a temperature of x kelvins. If a temperature increased by 9.10 kelvins, by how much did the temperature increase in degrees Fahrenheit?",
    imageUrl: "/questions/sat-math-b3abf40f.jpg",
    options: [
      { letter: "A", text: "16.38" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "A",
    explanation: "Choice A is correct. The function F(x) = (9/5)(x − 273.15) + 32. An increase of 9.10 kelvins increases F(x) by (9/5)(9.10) = 16.38 degrees Fahrenheit.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  },
  {
    id: "sat-e6cb2402",
    question: "In the given equation 3(kx + 13) = 48x + 36, k is a constant. The equation has no solution. What is the value of k?",
    imageUrl: "/questions/sat-math-e6cb2402.jpg",
    options: [
      { letter: "A", text: "16/17 or 0.9411" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 16/17. For no solution, coefficients of x must be equal but constants different. Dividing by 3: kx + 13 = 16x + 12. For equal x coefficients: k = 16/17.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficultyRating: 9
  },
  {
    id: "sat-415ab1d2",
    question: "The graph of the linear function y = f(x) + 19 is shown. If c and d are positive constants, which equation could define f?",
    imageUrl: "/questions/sat-math-415ab1d2.jpg",
    options: [
      { letter: "A", text: "f(x) = −d − cx" },
      { letter: "B", text: "See image" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "A",
    explanation: "Choice A is correct. The graph of y = f(x) + 19 has negative slope and y-intercept at (0, 3). Translating down 19 gives y-intercept at (0, −16). Since slope is negative and y-intercept is negative, f(x) = −d − cx with positive c and d.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 9
  },
  {
    id: "sat-6c71f3ec",
    question: "A salesperson's total earnings consist of a base salary of x dollars per year, plus commission of 11% of total sales. The salesperson's goal is for total earnings to be at least 3 times and at most 4 times the base salary. Which inequality represents all possible values of total sales s?",
    imageUrl: "/questions/sat-math-6c71f3ec.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "(2x/0.11) ≤ s ≤ (3x/0.11)" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. Total earnings = x + 0.11s. Goal: 3x ≤ x + 0.11s ≤ 4x. Subtracting x: 2x ≤ 0.11s ≤ 3x. Dividing by 0.11: 2x/0.11 ≤ s ≤ 3x/0.11.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 9
  },
  {
    id: "sat-e9908930",
    question: "For the linear function f, the table shows three values of x and their corresponding values of f(x). If h(x) = f(x) − 13, which equation defines h?",
    imageUrl: "/questions/sat-math-e9908930.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "h(x) = (5/4)x + 7" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. From the table, f(x) = (5/4)x + 20. Therefore h(x) = f(x) − 13 = (5/4)x + 20 − 13 = (5/4)x + 7.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  },
  {
    id: "sat-830120b0",
    question: "Which of the following consists of the y-coordinates of all points that satisfy the system of inequalities above?",
    imageUrl: "/questions/sat-math-830120b0.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "y ≥ 6" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. Solving the system of inequalities and finding the range of y values yields y ≥ 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 8
  },
  {
    id: "sat-0ca00003",
    question: "Ken earned $8 per hour for the first 10 hours he worked this week. His salary was then raised to $10 per hour. Ken saves 90% of his earnings. What is the least number of hours he must work the rest of the week to save at least $270 for the week?",
    imageUrl: "/questions/sat-math-0ca00003.jpg",
    options: [
      { letter: "A", text: "38" },
      { letter: "B", text: "33" },
      { letter: "C", text: "22" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "C",
    explanation: "Choice C is correct. Ken earned $80 for first 10 hours. Let x = additional hours at $10/hr. Total earnings = 80 + 10x. Savings = 0.9(80 + 10x) ≥ 270. Solving: 9(8 + x) ≥ 270, so x + 8 ≥ 30, x ≥ 22.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 8
  },
  {
    id: "sat-68c5c81a",
    question: "Anthony will spend at most $115 to purchase x small cheese pizzas and y large cheese pizzas. The inequality 11x + 14y ≤ 115 represents this situation. Which is the best interpretation of 14y in this context?",
    imageUrl: "/questions/sat-math-68c5c81a.jpg",
    options: [
      { letter: "A", text: "The amount Anthony will spend on each large cheese pizza" },
      { letter: "B", text: "The amount Anthony will spend on each small cheese pizza" },
      { letter: "C", text: "The total amount Anthony will spend on large cheese pizzas" },
      { letter: "D", text: "The total amount Anthony will spend on small cheese pizzas" }
    ],
    correctAnswer: "C",
    explanation: "Choice C is correct. In 11x + 14y ≤ 115, y represents number of large pizzas and 14 is the price per large pizza. Therefore 14y is the total amount spent on large pizzas.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficultyRating: 6
  },
  {
    id: "sat-78391fcc",
    question: "The table shows some values of x and their corresponding values for the linear function f. What is the x-intercept of the graph of f in the xy-plane?",
    imageUrl: "/questions/sat-math-78391fcc.jpg",
    options: [
      { letter: "A", text: "See image" },
      { letter: "B", text: "(7, 0)" },
      { letter: "C", text: "See image" },
      { letter: "D", text: "See image" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. Using the table values to find the slope and y-intercept, then setting f(x) = 0 to find the x-intercept yields (7, 0).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  }
];

export const importedSATMathCount2 = importedSATMathQuestions2.length;
