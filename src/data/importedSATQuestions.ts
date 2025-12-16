// Imported SAT Math Questions with images
// These are authentic College Board SAT questions

import type { Question } from './questions';

export interface ImageQuestion extends Question {
  imageUrl?: string;
  isNumericAnswer?: boolean; // For free-response questions
}

export const importedSATMathQuestions: ImageQuestion[] = [
  {
    id: "sat-52cb8ea4",
    question: "If (x, y) is the solution to the system of equations above, what is the value of 3x + 3y?\n\n7x − 5y = 4\n4x − 8y = 9",
    imageUrl: "/questions/sat-math-52cb8ea4.jpg",
    options: [
      { letter: "A", text: "−13" },
      { letter: "B", text: "−5" },
      { letter: "C", text: "5" },
      { letter: "D", text: "13" }
    ],
    correctAnswer: "B",
    explanation: "Choice B is correct. Subtracting the second equation, 4x − 8y = 9, from the first equation, 7x − 5y = 4, results in (7x − 5y) − (4x − 8y) = 4 − 9, or 7x − 5y − 4x + 8y = −5. Combining like terms on the left-hand side yields 3x + 3y = −5.\n\nChoice A is incorrect and may result from miscalculating 4 − 9 as −13. Choice C is incorrect and may result from miscalculating 4 − 9 as 5. Choice D is incorrect and may result from adding 9 to 4 instead of subtracting 9 from 4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-1362ccde",
    question: "The solution to the given system of equations is (x, y). What is the value of x − y?\n\ny = 4x + 1\n4y = 15x − 8",
    imageUrl: "/questions/sat-math-1362ccde.jpg",
    options: [
      { letter: "A", text: "35" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 35. The first equation defines y as 4x + 1. Substituting 4x + 1 for y in the second equation yields 4(4x + 1) = 15x − 8. Applying the distributive property: 16x + 4 = 15x − 8. Subtracting 15x from each side: x + 4 = −8. Subtracting 4 from each side: x = −12. Substituting −12 for x in the first equation: y = 4(−12) + 1 = −47. Therefore, x − y = −12 − (−47) = −12 + 47 = 35.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-cc7ffe02",
    question: "Keenan made 32 cups of vegetable broth. Keenan then filled x small jars and y large jars with all the vegetable broth he made. The equation 3x + 5y = 32 represents this situation. Which is the best interpretation of 5y in this context?",
    imageUrl: "/questions/sat-math-cc7ffe02.jpg",
    options: [
      { letter: "A", text: "The number of large jars Keenan filled" },
      { letter: "B", text: "The number of small jars Keenan filled" },
      { letter: "C", text: "The total number of cups of vegetable broth in the large jars" },
      { letter: "D", text: "The total number of cups of vegetable broth in the small jars" }
    ],
    correctAnswer: "C",
    explanation: "Choice C is correct. It's given that the equation 3x + 5y = 32 represents the situation where Keenan filled x small jars and y large jars with all the vegetable broth he made, which was 32 cups. Therefore, 3x represents the total number of cups of vegetable broth in the small jars and 5y represents the total number of cups of vegetable broth in the large jars.\n\nChoice A is incorrect. The number of large jars Keenan filled is represented by y, not 5y.\nChoice B is incorrect. The number of small jars Keenan filled is represented by x, not 5y.\nChoice D is incorrect. The total number of cups of vegetable broth in the small jars is represented by 3x, not 5y.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 7
  },
  {
    id: "sat-05bb1af9",
    question: "The graph of y = f(x) + 14 is shown. Which equation defines function f?",
    imageUrl: "/questions/sat-math-05bb1af9.jpg",
    options: [
      { letter: "A", text: "f(x) = −(1/4)x − 12" },
      { letter: "B", text: "f(x) = −(1/4)x + 16" },
      { letter: "C", text: "f(x) = −(1/4)x + 2" },
      { letter: "D", text: "f(x) = −(1/4)x − 14" }
    ],
    correctAnswer: "A",
    explanation: "Choice A is correct. An equation for the graph shown can be written in slope-intercept form y = mx + b, where m is the slope and (0, b) is the y-intercept. Since the y-intercept of the graph shown is (0, 2), the value of b is 2. Since the graph also passes through the point (4, 1), the slope can be calculated as (1 − 2)/(4 − 0) = −1/4. Therefore, the value of m is −1/4. Substituting into y = mx + b yields y = −(1/4)x + 2.\n\nIt's given that an equation for the graph shown is y = f(x) + 14. Substituting f(x) + 14 for y yields f(x) + 14 = −(1/4)x + 2. Subtracting 14 from both sides yields f(x) = −(1/4)x − 12.\n\nChoices B, C, and D are incorrect and may result from conceptual or calculation errors.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 8
  },
  {
    id: "sat-e1248a5c",
    question: "In the system of equations below, a and c are constants.\n\n(1/2)x + (1/3)y = 1/6\nax + y = c\n\nIf the system of equations has an infinite number of solutions (x, y), what is the value of a?",
    imageUrl: "/questions/sat-math-e1248a5c.jpg",
    options: [
      { letter: "A", text: "−1/2" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1/2" },
      { letter: "D", text: "3/2" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. A system of two linear equations has infinitely many solutions if one equation is equivalent to the other. This means that when the two equations are written in the same form, each coefficient or constant in one equation is equal to the corresponding coefficient or constant in the other equation multiplied by the same number.\n\nThe coefficient of y in the second equation is 1, which equals the coefficient of y in the first equation (1/3) multiplied by 3. Therefore, a, the coefficient of x in the second equation, must be equal to 3 times the coefficient of x in the first equation: a = (1/2)(3) = 3/2.\n\nChoices A, B, and C are incorrect. When a = −1/2, a = 0, or a = 1/2, the given system of equations has one solution.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficultyRating: 9
  },
  {
    id: "sat-d1f50dbe",
    question: "One gallon of stain will cover 170 square feet of a surface. A yard has a total fence area of w square feet. Which equation represents the total amount of stain S, in gallons, needed to stain the fence in this yard twice?",
    imageUrl: "/questions/sat-math-d1f50dbe.jpg",
    options: [
      { letter: "A", text: "S = w/340" },
      { letter: "B", text: "S = 340w" },
      { letter: "C", text: "S = 170w/2" },
      { letter: "D", text: "S = 2w/170" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. It's given that w represents the total fence area, in square feet. Since the fence will be stained twice, the amount of stain, in gallons, will need to cover 2w square feet. It's also given that one gallon of stain will cover 170 square feet. Dividing the total area, in square feet, of the surface to be stained by the number of square feet covered by one gallon of stain gives the number of gallons of stain that will be needed. Dividing 2w by 170 yields S = 2w/170.\n\nChoices A, B, and C are incorrect and may result from conceptual or calculation errors.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 7
  },
  {
    id: "sat-b9835972",
    question: "In the xy-plane, line ℓ passes through the point (0, 0) and is parallel to the line represented by the equation y = 8x + 2. If line ℓ also passes through the point (3, d), what is the value of d?",
    imageUrl: "/questions/sat-math-b9835972.jpg",
    options: [
      { letter: "A", text: "24" }
    ],
    correctAnswer: "A",
    isNumericAnswer: true,
    explanation: "The correct answer is 24. A line in the xy-plane can be defined by the equation y = mx + b, where m is the slope and b is the y-coordinate of the y-intercept. It's given that line ℓ passes through the point (0, 0). Therefore, the y-coordinate of the y-intercept of line ℓ is 0.\n\nIt's given that line ℓ is parallel to the line represented by the equation y = 8x + 2. Since parallel lines have the same slope, it follows that the slope of line ℓ is 8. Therefore, line ℓ can be defined by the equation y = 8x + 0, or y = 8x.\n\nIf line ℓ passes through the point (3, d), then when x = 3, y = d for the equation y = 8x. Substituting 3 for x and d for y yields d = 8(3) = 24.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficultyRating: 7
  },
  {
    id: "sat-af2ba762",
    question: "According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from September 1, 2014, to December 1, 2014, is modeled by the function F defined below, where F(x) is the average price per gallon x months after September 1.\n\nF(x) = 2.74 − 0.19(x − 3)\n\nThe constant 2.74 in this function estimates which of the following?",
    imageUrl: "/questions/sat-math-af2ba762.jpg",
    options: [
      { letter: "A", text: "The average monthly decrease in the price per gallon" },
      { letter: "B", text: "The difference in the average price per gallon from September 1, 2014, to December 1, 2014" },
      { letter: "C", text: "The average price per gallon on September 1, 2014" },
      { letter: "D", text: "The average price per gallon on December 1, 2014" }
    ],
    correctAnswer: "D",
    explanation: "Choice D is correct. Since 2.74 is a constant term, it represents an actual price of gas rather than a measure of change in gas price. To determine what gas price it represents, find x such that F(x) = 2.74:\n\n2.74 = 2.74 − 0.19(x − 3)\n0 = −0.19(x − 3)\n0 = x − 3\nx = 3\n\nTherefore, the average price of gas is $2.74 per gallon 3 months after September 1, 2014, which is December 1, 2014.\n\nChoice A is incorrect. Since 2.74 is a constant, not a multiple of x, it cannot represent a rate of change in price.\nChoice B is incorrect. The difference in the average price from September 1, 2014, to December 1, 2014, is F(3) − F(0) = 2.74 − (2.74 + 0.57) = −0.57, which is not 2.74.\nChoice C is incorrect. The average price per gallon on September 1, 2014, is F(0) = 2.74 − 0.19(0 − 3) = 2.74 + 0.57 = 3.31, which is not 2.74.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    difficultyRating: 8
  }
];

// Export count for display
export const importedSATMathCount = importedSATMathQuestions.length;
