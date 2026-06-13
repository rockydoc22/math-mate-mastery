// Small starter banks so the International Tests gallery is functional
// before full banks land. Keep neutral, family-safe content.

export interface IntlSampleQ {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export const INTL_SAMPLE_BANKS: Record<string, IntlSampleQ[]> = {
  ib_dp: [
    {
      id: "ib1",
      prompt: "If f(x) = 3x² − 2x + 5, what is f'(2)?",
      choices: ["8", "10", "12", "14"],
      correctIndex: 1,
      explanation: "f'(x) = 6x − 2; f'(2) = 12 − 2 = 10.",
    },
    {
      id: "ib2",
      prompt: "The mean of 4, 7, 9, x is 7. Find x.",
      choices: ["6", "7", "8", "9"],
      correctIndex: 2,
      explanation: "(4+7+9+x)/4 = 7 → x = 8.",
    },
    {
      id: "ib3",
      prompt: "Evaluate ∫(2x) dx from 0 to 3.",
      choices: ["3", "6", "9", "12"],
      correctIndex: 2,
      explanation: "∫2x dx = x²; 3² − 0 = 9.",
    },
  ],
  a_level: [
    {
      id: "al1",
      prompt: "log₂(32) = ?",
      choices: ["3", "4", "5", "6"],
      correctIndex: 2,
      explanation: "2⁵ = 32.",
    },
    {
      id: "al2",
      prompt: "Solve: 2x + 5 = 17",
      choices: ["4", "5", "6", "7"],
      correctIndex: 2,
      explanation: "2x = 12 → x = 6.",
    },
    {
      id: "al3",
      prompt: "Derivative of sin(x) is:",
      choices: ["−cos(x)", "cos(x)", "−sin(x)", "tan(x)"],
      correctIndex: 1,
      explanation: "d/dx sin(x) = cos(x).",
    },
  ],
  igcse: [
    {
      id: "ig1",
      prompt: "Simplify: 3(x + 4) − 2x",
      choices: ["x + 12", "5x + 12", "x + 4", "x − 12"],
      correctIndex: 0,
      explanation: "3x + 12 − 2x = x + 12.",
    },
    {
      id: "ig2",
      prompt: "Area of a triangle with base 10 and height 6?",
      choices: ["16", "30", "60", "120"],
      correctIndex: 1,
      explanation: "½ × 10 × 6 = 30.",
    },
    {
      id: "ig3",
      prompt: "Which is a prime number?",
      choices: ["9", "15", "21", "23"],
      correctIndex: 3,
      explanation: "23 has no divisors besides 1 and itself.",
    },
  ],
  jee_main: [
    {
      id: "je1",
      prompt: "Roots of x² − 5x + 6 = 0 are:",
      choices: ["1, 6", "2, 3", "−2, −3", "−1, −6"],
      correctIndex: 1,
      explanation: "(x−2)(x−3) = 0.",
    },
    {
      id: "je2",
      prompt: "Value of sin(30°) + cos(60°):",
      choices: ["0", "½", "1", "√3"],
      correctIndex: 2,
      explanation: "½ + ½ = 1.",
    },
  ],
  gcse: [
    {
      id: "gc1",
      prompt: "25% of 80 = ?",
      choices: ["15", "20", "25", "40"],
      correctIndex: 1,
      explanation: "80 × 0.25 = 20.",
    },
    {
      id: "gc2",
      prompt: "Perimeter of a square with side 7 cm:",
      choices: ["14 cm", "21 cm", "28 cm", "49 cm"],
      correctIndex: 2,
      explanation: "4 × 7 = 28.",
    },
  ],
};

export function getIntlBank(examId: string): IntlSampleQ[] {
  return INTL_SAMPLE_BANKS[examId] || [];
}