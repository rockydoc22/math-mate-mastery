// Alternative Assessment Question Types (Non-MCQ)

export interface OrderingQuestion {
  id: string;
  type: "ordering";
  prompt: string;
  steps: string[];
  correctOrder: string[];
  difficultyRating: number;
  domain: string;
  skill: string;
  explanation?: string;
}

export interface SpotTheErrorQuestion {
  id: string;
  type: "spot_the_error";
  prompt: string;
  workedSolution: { step: number; text: string; isError: boolean }[];
  correctAnswer: string;
  difficultyRating: number;
  domain: string;
  skill: string;
  explanation?: string;
}

export interface FillTheGapQuestion {
  id: string;
  type: "fill_the_gap";
  prompt: string;
  template: string; // e.g. "If 3x + 5 = 20, then x = ___"
  correctAnswer: string;
  acceptableAnswers?: string[]; // alternate accepted forms
  difficultyRating: number;
  domain: string;
  skill: string;
  explanation?: string;
}

export type AltQuestion = OrderingQuestion | SpotTheErrorQuestion | FillTheGapQuestion;

export const orderingQuestions: OrderingQuestion[] = [
  {
    id: "ord_001",
    type: "ordering",
    prompt: "Arrange the steps to solve: 2x + 5 = 15",
    steps: ["Divide both sides by 2", "Subtract 5 from both sides", "Write: x = 5"],
    correctOrder: ["Subtract 5 from both sides", "Divide both sides by 2", "Write: x = 5"],
    difficultyRating: 3,
    domain: "Algebra",
    skill: "Linear Equations",
    explanation: "First isolate the variable term by subtracting 5, then divide by the coefficient."
  },
  {
    id: "ord_002",
    type: "ordering",
    prompt: "Put the steps in order to factor: x² + 5x + 6",
    steps: ["Write (x + 2)(x + 3)", "Find two numbers that multiply to 6", "Check that those numbers add to 5"],
    correctOrder: ["Find two numbers that multiply to 6", "Check that those numbers add to 5", "Write (x + 2)(x + 3)"],
    difficultyRating: 5,
    domain: "Algebra",
    skill: "Factoring",
    explanation: "To factor a trinomial, find factors of the constant that sum to the middle coefficient."
  },
  {
    id: "ord_003",
    type: "ordering",
    prompt: "Order the steps to solve a system by substitution: y = 2x, x + y = 9",
    steps: ["Substitute 2x for y in the second equation", "Solve x + 2x = 9 → x = 3", "Find y = 2(3) = 6"],
    correctOrder: ["Substitute 2x for y in the second equation", "Solve x + 2x = 9 → x = 3", "Find y = 2(3) = 6"],
    difficultyRating: 5,
    domain: "Algebra",
    skill: "Systems of Equations",
    explanation: "Substitute the expression for y into the other equation, solve for x, then back-substitute."
  },
  {
    id: "ord_004",
    type: "ordering",
    prompt: "Order the steps to find the slope between (1, 3) and (4, 9)",
    steps: ["Calculate (9 − 3) ÷ (4 − 1)", "Identify y₂ − y₁ and x₂ − x₁", "Slope = 6 ÷ 3 = 2"],
    correctOrder: ["Identify y₂ − y₁ and x₂ − x₁", "Calculate (9 − 3) ÷ (4 − 1)", "Slope = 6 ÷ 3 = 2"],
    difficultyRating: 3,
    domain: "Algebra",
    skill: "Slope",
    explanation: "Use the slope formula: m = (y₂ − y₁) / (x₂ − x₁)."
  },
  {
    id: "ord_005",
    type: "ordering",
    prompt: "Arrange the steps to complete the square for x² + 6x + 2 = 0",
    steps: [
      "Move the constant: x² + 6x = −2",
      "Add (6/2)² = 9 to both sides",
      "Factor: (x + 3)² = 7",
      "Solve: x = −3 ± √7"
    ],
    correctOrder: [
      "Move the constant: x² + 6x = −2",
      "Add (6/2)² = 9 to both sides",
      "Factor: (x + 3)² = 7",
      "Solve: x = −3 ± √7"
    ],
    difficultyRating: 7,
    domain: "Algebra",
    skill: "Completing the Square"
  },
  {
    id: "ord_006",
    type: "ordering",
    prompt: "Order the steps to simplify: (3x²y)(4xy³)",
    steps: ["Multiply coefficients: 3 × 4 = 12", "Add exponents of x: 2 + 1 = 3", "Add exponents of y: 1 + 3 = 4", "Result: 12x³y⁴"],
    correctOrder: ["Multiply coefficients: 3 × 4 = 12", "Add exponents of x: 2 + 1 = 3", "Add exponents of y: 1 + 3 = 4", "Result: 12x³y⁴"],
    difficultyRating: 4,
    domain: "Algebra",
    skill: "Exponents"
  },
  // English ordering
  {
    id: "ord_eng_001",
    type: "ordering",
    prompt: "Arrange the sentence parts to form a grammatically correct complex sentence about climate.",
    steps: [
      "global temperatures will continue to rise",
      "Unless carbon emissions are significantly reduced",
      "leading to severe environmental consequences"
    ],
    correctOrder: [
      "Unless carbon emissions are significantly reduced",
      "global temperatures will continue to rise",
      "leading to severe environmental consequences"
    ],
    difficultyRating: 4,
    domain: "English",
    skill: "Sentence Structure"
  },
  {
    id: "ord_eng_002",
    type: "ordering",
    prompt: "Put the paragraph's supporting ideas in the most logical order for an essay about exercise benefits.",
    steps: [
      "Exercise also reduces stress hormones like cortisol",
      "Physical activity releases endorphins in the brain",
      "As a result, regular exercisers report better overall mood"
    ],
    correctOrder: [
      "Physical activity releases endorphins in the brain",
      "Exercise also reduces stress hormones like cortisol",
      "As a result, regular exercisers report better overall mood"
    ],
    difficultyRating: 5,
    domain: "English",
    skill: "Paragraph Organization"
  },
];

export const spotTheErrorQuestions: SpotTheErrorQuestion[] = [
  {
    id: "ste_001",
    type: "spot_the_error",
    prompt: "A student solved 3x = 12. Find the incorrect step.",
    workedSolution: [
      { step: 1, text: "Start: 3x = 12", isError: false },
      { step: 2, text: "Subtract 3 from both sides: x = 12 − 3", isError: true },
      { step: 3, text: "x = 9", isError: false },
    ],
    correctAnswer: "Step 2 is wrong. You should divide both sides by 3, not subtract. x = 12 ÷ 3 = 4.",
    difficultyRating: 3,
    domain: "Algebra",
    skill: "Linear Equations"
  },
  {
    id: "ste_002",
    type: "spot_the_error",
    prompt: "Find the error in this simplification of (x + 3)².",
    workedSolution: [
      { step: 1, text: "(x + 3)²", isError: false },
      { step: 2, text: "= x² + 3²", isError: true },
      { step: 3, text: "= x² + 9", isError: false },
    ],
    correctAnswer: "Step 2 is wrong. (x + 3)² = x² + 2(x)(3) + 9 = x² + 6x + 9. The middle term 2·x·3 is missing.",
    difficultyRating: 5,
    domain: "Algebra",
    skill: "Expanding Binomials"
  },
  {
    id: "ste_003",
    type: "spot_the_error",
    prompt: "Find the error in solving: √(x + 4) = −3.",
    workedSolution: [
      { step: 1, text: "√(x + 4) = −3", isError: false },
      { step: 2, text: "Square both sides: x + 4 = 9", isError: true },
      { step: 3, text: "x = 5", isError: false },
    ],
    correctAnswer: "Step 2 ignores that a principal square root can never equal a negative number. The equation has no real solution.",
    difficultyRating: 7,
    domain: "Algebra",
    skill: "Radicals"
  },
  {
    id: "ste_004",
    type: "spot_the_error",
    prompt: "A student found the slope between (2, 5) and (2, 8). Find the error.",
    workedSolution: [
      { step: 1, text: "m = (8 − 5) / (2 − 2)", isError: false },
      { step: 2, text: "m = 3 / 0 = 0", isError: true },
      { step: 3, text: "The slope is 0", isError: false },
    ],
    correctAnswer: "Step 2 is wrong. Division by zero is undefined, not zero. The line is vertical with an undefined slope.",
    difficultyRating: 4,
    domain: "Algebra",
    skill: "Slope"
  },
  {
    id: "ste_eng_001",
    type: "spot_the_error",
    prompt: "Find the grammatical error in this sentence.",
    workedSolution: [
      { step: 1, text: "The team of scientists", isError: false },
      { step: 2, text: "have published", isError: true },
      { step: 3, text: "their findings in a peer-reviewed journal.", isError: false },
    ],
    correctAnswer: "Step 2: 'have published' should be 'has published'. The subject is 'team' (singular), not 'scientists'.",
    difficultyRating: 5,
    domain: "English",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "ste_eng_002",
    type: "spot_the_error",
    prompt: "Identify the punctuation error in this passage.",
    workedSolution: [
      { step: 1, text: "Although the weather was cold;", isError: true },
      { step: 2, text: "the hikers pressed on,", isError: false },
      { step: 3, text: "determined to reach the summit before dark.", isError: false },
    ],
    correctAnswer: "Step 1: A semicolon should not follow a subordinate clause. Use a comma: 'Although the weather was cold,'",
    difficultyRating: 4,
    domain: "English",
    skill: "Punctuation"
  },
];

export const fillTheGapQuestions: FillTheGapQuestion[] = [
  {
    id: "ftg_001",
    type: "fill_the_gap",
    prompt: "Complete the solution.",
    template: "If 3x + 5 = 20, then x = ___",
    correctAnswer: "5",
    acceptableAnswers: ["5", "5.0"],
    difficultyRating: 2,
    domain: "Algebra",
    skill: "Linear Equations"
  },
  {
    id: "ftg_002",
    type: "fill_the_gap",
    prompt: "Fill in the missing value.",
    template: "The slope of y = 4x − 7 is ___",
    correctAnswer: "4",
    acceptableAnswers: ["4", "4.0"],
    difficultyRating: 2,
    domain: "Algebra",
    skill: "Slope"
  },
  {
    id: "ftg_003",
    type: "fill_the_gap",
    prompt: "Complete the factoring.",
    template: "x² − 9 = (x + 3)(x − ___)",
    correctAnswer: "3",
    acceptableAnswers: ["3"],
    difficultyRating: 4,
    domain: "Algebra",
    skill: "Factoring"
  },
  {
    id: "ftg_004",
    type: "fill_the_gap",
    prompt: "Find the missing exponent.",
    template: "x⁵ · x³ = x^___",
    correctAnswer: "8",
    acceptableAnswers: ["8"],
    difficultyRating: 3,
    domain: "Algebra",
    skill: "Exponents"
  },
  {
    id: "ftg_005",
    type: "fill_the_gap",
    prompt: "Complete the proportion.",
    template: "If 2/5 = x/20, then x = ___",
    correctAnswer: "8",
    acceptableAnswers: ["8", "8.0"],
    difficultyRating: 3,
    domain: "Algebra",
    skill: "Ratios & Proportions"
  },
  {
    id: "ftg_006",
    type: "fill_the_gap",
    prompt: "Find the y-intercept.",
    template: "The y-intercept of y = −2x + 11 is ___",
    correctAnswer: "11",
    acceptableAnswers: ["11", "(0,11)", "(0, 11)"],
    difficultyRating: 2,
    domain: "Algebra",
    skill: "Linear Functions"
  },
  // English
  {
    id: "ftg_eng_001",
    type: "fill_the_gap",
    prompt: "Choose the correct word to complete the sentence.",
    template: "Neither the students nor the teacher ___ prepared for the fire drill. (was/were)",
    correctAnswer: "was",
    acceptableAnswers: ["was"],
    difficultyRating: 5,
    domain: "English",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "ftg_eng_002",
    type: "fill_the_gap",
    prompt: "Fill in the correct transition word.",
    template: "The experiment failed; ___, the team gained valuable insights. (however/therefore)",
    correctAnswer: "however",
    acceptableAnswers: ["however", "However"],
    difficultyRating: 4,
    domain: "English",
    skill: "Transitions"
  },
];

export const allAltQuestions: AltQuestion[] = [
  ...orderingQuestions,
  ...spotTheErrorQuestions,
  ...fillTheGapQuestions,
];
