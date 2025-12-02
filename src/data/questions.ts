export interface Question {
  id: string;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  domain: string;
  skill: string;
}

export const questions: Question[] = [
  {
    id: "52cb8ea4",
    question: "If (x, y) is the solution to the system of equations:\n7x - 5y = 4\n4x - 8y = 9\nwhat is the value of 3x + 3y?",
    options: [
      { letter: "A", text: "-13" },
      { letter: "B", text: "-5" },
      { letter: "C", text: "5" },
      { letter: "D", text: "13" }
    ],
    correctAnswer: "B",
    explanation: "Subtracting the second equation from the first equation results in 3x + 3y = -5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  },
  {
    id: "1362ccde",
    question: "The solution to the given system of equations is (x, y). What is the value of x - y?\ny = 4x + 1\n4y = 15x - 8",
    options: [
      { letter: "A", text: "35" },
      { letter: "B", text: "-35" },
      { letter: "C", text: "12" },
      { letter: "D", text: "-12" }
    ],
    correctAnswer: "A",
    explanation: "Substituting the first equation into the second yields x = -12 and y = -47. Therefore x - y = -12 - (-47) = 35.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  },
  {
    id: "cc7ffe02",
    question: "Keenan made 32 cups of vegetable broth. Keenan then filled x small jars and y large jars with all the vegetable broth he made. The equation 3x + 5y = 32 represents this situation. Which is the best interpretation of 5y in this context?",
    options: [
      { letter: "A", text: "The number of large jars Keenan filled" },
      { letter: "B", text: "The number of small jars Keenan filled" },
      { letter: "C", text: "The total number of cups of vegetable broth in the large jars" },
      { letter: "D", text: "The total number of cups of vegetable broth in the small jars" }
    ],
    correctAnswer: "C",
    explanation: "In the equation 3x + 5y = 32, 5y represents the total number of cups of vegetable broth in the large jars.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables"
  },
  {
    id: "05bb1af9",
    question: "The graph of y = f(x) + 14 is shown passing through points (0,2) and (4,1). Which equation defines function f?",
    options: [
      { letter: "A", text: "f(x) = -(1/4)x - 12" },
      { letter: "B", text: "f(x) = -(1/4)x + 12" },
      { letter: "C", text: "f(x) = -(1/4)x + 2" },
      { letter: "D", text: "f(x) = -(1/4)x - 14" }
    ],
    correctAnswer: "A",
    explanation: "The graph has slope -1/4 and y-intercept 2, so y = -(1/4)x + 2. Since y = f(x) + 14, we get f(x) = -(1/4)x - 12.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables"
  },
  {
    id: "e1248a5c",
    question: "In the system of equations below, a and c are constants.\n(1/2)x + (1/3)y = 6\nax + y = c\nIf the system of equations has an infinite number of solutions (x, y), what is the value of a?",
    options: [
      { letter: "A", text: "1/2" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1/3" },
      { letter: "D", text: "3/2" }
    ],
    correctAnswer: "D",
    explanation: "For infinite solutions, the coefficient of y in the second equation (1) must equal 3 times the coefficient in the first equation (1/3). Therefore, a = 3 × (1/2) = 3/2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  },
  {
    id: "d1f50dbe",
    question: "One gallon of stain will cover 170 square feet of a surface. A yard has a total fence area of w square feet. Which equation represents the total amount of stain S, in gallons, needed to stain the fence in this yard twice?",
    options: [
      { letter: "A", text: "S = w / 170" },
      { letter: "B", text: "S = 170w" },
      { letter: "C", text: "S = 340w" },
      { letter: "D", text: "S = w / 85" }
    ],
    correctAnswer: "D",
    explanation: "Staining twice means covering 2w square feet. Dividing by 170 square feet per gallon gives 2w/170 = w/85.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions"
  },
  {
    id: "b9835972",
    question: "In the xy-plane, line ℓ passes through the point (0, 0) and is parallel to the line represented by the equation y = 8x + 2. If line ℓ also passes through the point (3, d), what is the value of d?",
    options: [
      { letter: "A", text: "24" },
      { letter: "B", text: "8" },
      { letter: "C", text: "3" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "A",
    explanation: "Line ℓ has slope 8 and passes through (0,0), so its equation is y = 8x. When x = 3, y = 8(3) = 24.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables"
  },
  {
    id: "af2ba762",
    question: "According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from September 1, 2014, to December 1, 2014, is modeled by the function F(x) = 2.74 - 0.19(x - 3), where F(x) is the average price per gallon x months after September 1. The constant 2.74 in this function estimates which of the following?",
    options: [
      { letter: "A", text: "The average monthly decrease in the price per gallon" },
      { letter: "B", text: "The difference in the average price per gallon from September 1, 2014, to December 1, 2014" },
      { letter: "C", text: "The average price per gallon on September 1, 2014" },
      { letter: "D", text: "The average price per gallon on December 1, 2014" }
    ],
    correctAnswer: "D",
    explanation: "When x = 3 (December 1), F(3) = 2.74 - 0.19(0) = 2.74. Therefore, 2.74 represents the price on December 1, 2014.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions"
  },
  {
    id: "1a621af4",
    question: "A number x is at most 2 less than 3 times the value of y. If the value of y is -4, what is the greatest possible value of x?",
    options: [
      { letter: "A", text: "-14" },
      { letter: "B", text: "-10" },
      { letter: "C", text: "-2" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "The inequality is x ≤ 3y - 2. Substituting y = -4 gives x ≤ 3(-4) - 2 = -14. The greatest value is -14.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables"
  }
];
