// Questions to fill levels 4, 5, 6, 7, and 8 to 200 each
// These have direct difficultyRating values (no remapping)

import type { Question } from './questions';

// Helper to generate Level 4 questions (easier - basic arithmetic, simple equations)
const generateLevel4Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Simple addition/subtraction
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 30) + 5;
    const sum = a + b;
    
    questions.push({
      id: `filler-4-add-${i}`,
      question: `What is ${a} + ${b}?`,
      options: [
        { letter: "A", text: String(sum - 2) },
        { letter: "B", text: String(sum - 1) },
        { letter: "C", text: String(sum) },
        { letter: "D", text: String(sum + 1) }
      ],
      correctAnswer: "C",
      explanation: `${a} + ${b} = ${sum}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Basic Operations",
      difficultyRating: 4
    });
  }

  // Simple subtraction
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 50) + 30;
    const b = Math.floor(Math.random() * 20) + 5;
    const diff = a - b;
    
    questions.push({
      id: `filler-4-sub-${i}`,
      question: `What is ${a} - ${b}?`,
      options: [
        { letter: "A", text: String(diff - 2) },
        { letter: "B", text: String(diff) },
        { letter: "C", text: String(diff + 1) },
        { letter: "D", text: String(diff + 2) }
      ],
      correctAnswer: "B",
      explanation: `${a} - ${b} = ${diff}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Basic Operations",
      difficultyRating: 4
    });
  }

  // Simple multiplication
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 2;
    const product = a * b;
    
    questions.push({
      id: `filler-4-mult-${i}`,
      question: `What is ${a} × ${b}?`,
      options: [
        { letter: "A", text: String(product - 2) },
        { letter: "B", text: String(product - 1) },
        { letter: "C", text: String(product) },
        { letter: "D", text: String(product + 2) }
      ],
      correctAnswer: "C",
      explanation: `${a} × ${b} = ${product}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Basic Operations",
      difficultyRating: 4
    });
  }

  // Simple division
  for (let i = 1; i <= 25; i++) {
    const b = Math.floor(Math.random() * 9) + 2;
    const quotient = Math.floor(Math.random() * 10) + 2;
    const a = b * quotient;
    
    questions.push({
      id: `filler-4-div-${i}`,
      question: `What is ${a} ÷ ${b}?`,
      options: [
        { letter: "A", text: String(quotient - 1) },
        { letter: "B", text: String(quotient) },
        { letter: "C", text: String(quotient + 1) },
        { letter: "D", text: String(quotient + 2) }
      ],
      correctAnswer: "B",
      explanation: `${a} ÷ ${b} = ${quotient}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Basic Operations",
      difficultyRating: 4
    });
  }

  // Simple one-step equations (x + a = b)
  for (let i = 1; i <= 20; i++) {
    const x = Math.floor(Math.random() * 15) + 3;
    const a = Math.floor(Math.random() * 10) + 2;
    const b = x + a;
    
    questions.push({
      id: `filler-4-eq1-${i}`,
      question: `Solve for x: x + ${a} = ${b}`,
      options: [
        { letter: "A", text: String(x - 2) },
        { letter: "B", text: String(x - 1) },
        { letter: "C", text: String(x) },
        { letter: "D", text: String(x + 1) }
      ],
      correctAnswer: "C",
      explanation: `x + ${a} = ${b}, so x = ${b} - ${a} = ${x}`,
      difficulty: "Easy",
      domain: "Algebra",
      skill: "One-Variable Equations",
      difficultyRating: 4
    });
  }

  // Simple one-step equations (x - a = b)
  for (let i = 1; i <= 20; i++) {
    const x = Math.floor(Math.random() * 20) + 10;
    const a = Math.floor(Math.random() * 8) + 2;
    const b = x - a;
    
    questions.push({
      id: `filler-4-eq2-${i}`,
      question: `Solve for x: x - ${a} = ${b}`,
      options: [
        { letter: "A", text: String(x - 1) },
        { letter: "B", text: String(x) },
        { letter: "C", text: String(x + 1) },
        { letter: "D", text: String(x + 2) }
      ],
      correctAnswer: "B",
      explanation: `x - ${a} = ${b}, so x = ${b} + ${a} = ${x}`,
      difficulty: "Easy",
      domain: "Algebra",
      skill: "One-Variable Equations",
      difficultyRating: 4
    });
  }

  // Simple percentages
  const percentages = [10, 20, 25, 50];
  for (let i = 1; i <= 20; i++) {
    const percent = percentages[i % percentages.length];
    const whole = (Math.floor(Math.random() * 10) + 1) * 20;
    const answer = (percent / 100) * whole;
    
    questions.push({
      id: `filler-4-pct-${i}`,
      question: `What is ${percent}% of ${whole}?`,
      options: [
        { letter: "A", text: String(answer - 5) },
        { letter: "B", text: String(answer) },
        { letter: "C", text: String(answer + 5) },
        { letter: "D", text: String(answer + 10) }
      ],
      correctAnswer: "B",
      explanation: `${percent}% of ${whole} = (${percent}/100) × ${whole} = ${answer}`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Percentages",
      difficultyRating: 4
    });
  }

  // Simple ratio questions
  for (let i = 1; i <= 20; i++) {
    const ratio1 = Math.floor(Math.random() * 4) + 1;
    const ratio2 = Math.floor(Math.random() * 4) + 1;
    const multiplier = Math.floor(Math.random() * 5) + 2;
    const total = (ratio1 + ratio2) * multiplier;
    const part1 = ratio1 * multiplier;
    
    questions.push({
      id: `filler-4-ratio-${i}`,
      question: `If two quantities are in the ratio ${ratio1}:${ratio2} and their sum is ${total}, what is the smaller quantity?`,
      options: [
        { letter: "A", text: String(Math.min(part1, ratio2 * multiplier) - 2) },
        { letter: "B", text: String(Math.min(part1, ratio2 * multiplier)) },
        { letter: "C", text: String(Math.max(part1, ratio2 * multiplier)) },
        { letter: "D", text: String(Math.max(part1, ratio2 * multiplier) + 2) }
      ],
      correctAnswer: "B",
      explanation: `The ratio ${ratio1}:${ratio2} with sum ${total} gives parts of ${part1} and ${ratio2 * multiplier}. The smaller is ${Math.min(part1, ratio2 * multiplier)}.`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Ratios",
      difficultyRating: 4
    });
  }

  // Simple area of rectangle
  for (let i = 1; i <= 20; i++) {
    const length = Math.floor(Math.random() * 10) + 3;
    const width = Math.floor(Math.random() * 8) + 2;
    const area = length * width;
    
    questions.push({
      id: `filler-4-area-${i}`,
      question: `What is the area of a rectangle with length ${length} and width ${width}?`,
      options: [
        { letter: "A", text: String(area - 4) },
        { letter: "B", text: String(area) },
        { letter: "C", text: String(length + width) },
        { letter: "D", text: String(2 * (length + width)) }
      ],
      correctAnswer: "B",
      explanation: `Area = length × width = ${length} × ${width} = ${area}`,
      difficulty: "Easy",
      domain: "Geometry",
      skill: "Area",
      difficultyRating: 4
    });
  }

  return questions;
};

interface VisualQuestion extends Question {
  visual?: {
    type: string;
    data: Record<string, unknown>;
    title?: string;
    xLabel?: string;
    yLabel?: string;
  };
}

// Helper to generate questions programmatically
const generateLevel5Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Linear equations
  for (let i = 1; i <= 40; i++) {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 10) + 1;
    const result = Math.floor(Math.random() * 30) + 10;
    const x = (result - b) / a;
    const xRounded = Math.round(x);
    const correctResult = a * xRounded + b;
    
    questions.push({
      id: `filler-5-lin-${i}`,
      question: `Solve for x: ${a}x + ${b} = ${correctResult}.`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[`${a}x + ${b} = ${correctResult}`]]
        }
      },
      options: [
        { letter: "A", text: String(xRounded - 2) },
        { letter: "B", text: String(xRounded - 1) },
        { letter: "C", text: String(xRounded) },
        { letter: "D", text: String(xRounded + 1) }
      ],
      correctAnswer: "C",
      explanation: `Subtract ${b} from both sides: ${a}x = ${correctResult - b}. Divide by ${a}: x = ${xRounded}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Linear Equations",
      difficultyRating: 5
    });
  }

  // Slope questions
  const slopeQuestions = [
    { p1: [0, 2], p2: [2, 6], slope: 2 },
    { p1: [1, 3], p2: [3, 7], slope: 2 },
    { p1: [0, 5], p2: [2, 9], slope: 2 },
    { p1: [0, 1], p2: [4, 5], slope: 1 },
    { p1: [1, 2], p2: [5, 6], slope: 1 },
    { p1: [0, 0], p2: [3, 9], slope: 3 },
    { p1: [1, 1], p2: [4, 10], slope: 3 },
    { p1: [0, 4], p2: [2, 10], slope: 3 },
    { p1: [0, 3], p2: [2, 5], slope: 1 },
    { p1: [1, 5], p2: [3, 9], slope: 2 },
    { p1: [0, 0], p2: [5, 10], slope: 2 },
    { p1: [2, 4], p2: [4, 8], slope: 2 },
    { p1: [0, 1], p2: [3, 7], slope: 2 },
    { p1: [1, 0], p2: [4, 6], slope: 2 },
    { p1: [0, 2], p2: [4, 6], slope: 1 },
    { p1: [2, 3], p2: [5, 9], slope: 2 },
    { p1: [0, 5], p2: [5, 15], slope: 2 },
    { p1: [1, 2], p2: [4, 8], slope: 2 },
    { p1: [0, 3], p2: [3, 12], slope: 3 },
    { p1: [2, 1], p2: [6, 5], slope: 1 },
    { p1: [0, 4], p2: [4, 12], slope: 2 },
    { p1: [1, 3], p2: [5, 11], slope: 2 },
    { p1: [0, 6], p2: [3, 12], slope: 2 },
    { p1: [2, 2], p2: [5, 8], slope: 2 },
    { p1: [0, 1], p2: [2, 7], slope: 3 },
    { p1: [1, 4], p2: [4, 10], slope: 2 },
    { p1: [0, 2], p2: [3, 8], slope: 2 },
    { p1: [2, 5], p2: [4, 9], slope: 2 },
    { p1: [0, 0], p2: [4, 8], slope: 2 },
    { p1: [1, 1], p2: [3, 5], slope: 2 },
  ];

  slopeQuestions.forEach((sq, i) => {
    questions.push({
      id: `filler-5-slope-${i + 1}`,
      question: `What is the slope of the line through points (${sq.p1[0]}, ${sq.p1[1]}) and (${sq.p2[0]}, ${sq.p2[1]})?`,
      visual: {
        type: "scatterPlot",
        data: {
          points: [{ x: sq.p1[0], y: sq.p1[1] }, { x: sq.p2[0], y: sq.p2[1] }]
        },
        xLabel: "x",
        yLabel: "y"
      },
      options: [
        { letter: "A", text: String(sq.slope - 1) },
        { letter: "B", text: String(sq.slope) },
        { letter: "C", text: String(sq.slope + 1) },
        { letter: "D", text: String(sq.slope + 2) }
      ],
      correctAnswer: "B",
      explanation: `Slope = (${sq.p2[1]} - ${sq.p1[1]}) / (${sq.p2[0]} - ${sq.p1[0]}) = ${sq.slope}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Linear Functions",
      difficultyRating: 5
    });
  });

  // Percentage questions
  const percentQuestions = [
    { percent: 20, total: 100, answer: 20 },
    { percent: 25, total: 200, answer: 50 },
    { percent: 30, total: 150, answer: 45 },
    { percent: 40, total: 250, answer: 100 },
    { percent: 50, total: 180, answer: 90 },
    { percent: 15, total: 200, answer: 30 },
    { percent: 35, total: 200, answer: 70 },
    { percent: 45, total: 100, answer: 45 },
    { percent: 60, total: 150, answer: 90 },
    { percent: 75, total: 200, answer: 150 },
    { percent: 10, total: 300, answer: 30 },
    { percent: 80, total: 125, answer: 100 },
    { percent: 25, total: 160, answer: 40 },
    { percent: 55, total: 200, answer: 110 },
    { percent: 65, total: 100, answer: 65 },
    { percent: 20, total: 250, answer: 50 },
    { percent: 30, total: 200, answer: 60 },
    { percent: 40, total: 175, answer: 70 },
    { percent: 50, total: 220, answer: 110 },
    { percent: 70, total: 100, answer: 70 },
    { percent: 15, total: 400, answer: 60 },
    { percent: 25, total: 120, answer: 30 },
    { percent: 35, total: 300, answer: 105 },
    { percent: 45, total: 200, answer: 90 },
    { percent: 55, total: 180, answer: 99 },
    { percent: 10, total: 500, answer: 50 },
    { percent: 20, total: 350, answer: 70 },
    { percent: 30, total: 400, answer: 120 },
    { percent: 60, total: 200, answer: 120 },
    { percent: 80, total: 150, answer: 120 },
  ];

  percentQuestions.forEach((pq, i) => {
    questions.push({
      id: `filler-5-pct-${i + 1}`,
      question: `A survey of ${pq.total} students shows ${pq.percent}% prefer option A. How many students is this?`,
      visual: {
        type: "barChart",
        data: {
          labels: ["Option A", "Other"],
          values: [pq.percent, 100 - pq.percent]
        },
        title: "Survey Results (%)"
      },
      options: [
        { letter: "A", text: String(pq.answer - 10) },
        { letter: "B", text: String(pq.answer) },
        { letter: "C", text: String(pq.answer + 10) },
        { letter: "D", text: String(pq.answer + 20) }
      ],
      correctAnswer: "B",
      explanation: `${pq.percent}% of ${pq.total} = ${pq.answer}.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Percentages",
      difficultyRating: 5
    });
  });

  // IQR questions
  const iqrQuestions = [
    { q1: 10, q3: 20, iqr: 10 },
    { q1: 15, q3: 25, iqr: 10 },
    { q1: 12, q3: 28, iqr: 16 },
    { q1: 8, q3: 24, iqr: 16 },
    { q1: 5, q3: 17, iqr: 12 },
    { q1: 20, q3: 35, iqr: 15 },
    { q1: 14, q3: 26, iqr: 12 },
    { q1: 18, q3: 30, iqr: 12 },
    { q1: 22, q3: 38, iqr: 16 },
    { q1: 6, q3: 18, iqr: 12 },
    { q1: 11, q3: 23, iqr: 12 },
    { q1: 16, q3: 32, iqr: 16 },
    { q1: 9, q3: 21, iqr: 12 },
    { q1: 13, q3: 29, iqr: 16 },
    { q1: 7, q3: 19, iqr: 12 },
    { q1: 24, q3: 40, iqr: 16 },
    { q1: 10, q3: 26, iqr: 16 },
    { q1: 15, q3: 27, iqr: 12 },
    { q1: 19, q3: 31, iqr: 12 },
    { q1: 8, q3: 20, iqr: 12 },
    { q1: 12, q3: 24, iqr: 12 },
    { q1: 17, q3: 33, iqr: 16 },
    { q1: 21, q3: 37, iqr: 16 },
    { q1: 14, q3: 30, iqr: 16 },
    { q1: 11, q3: 27, iqr: 16 },
    { q1: 9, q3: 25, iqr: 16 },
    { q1: 16, q3: 28, iqr: 12 },
    { q1: 13, q3: 25, iqr: 12 },
    { q1: 20, q3: 32, iqr: 12 },
    { q1: 18, q3: 34, iqr: 16 },
  ];

  iqrQuestions.forEach((iq, i) => {
    questions.push({
      id: `filler-5-iqr-${i + 1}`,
      question: `A box plot shows Q1 = ${iq.q1} and Q3 = ${iq.q3}. What is the IQR?`,
      visual: {
        type: "table",
        data: {
          headers: ["Q1", "Median", "Q3"],
          rows: [[String(iq.q1), String(Math.round((iq.q1 + iq.q3) / 2)), String(iq.q3)]]
        },
        title: "Box Plot Summary"
      },
      options: [
        { letter: "A", text: String(iq.iqr - 4) },
        { letter: "B", text: String(iq.iqr) },
        { letter: "C", text: String(iq.iqr + 4) },
        { letter: "D", text: String(iq.iqr + 8) }
      ],
      correctAnswer: "B",
      explanation: `IQR = Q3 - Q1 = ${iq.q3} - ${iq.q1} = ${iq.iqr}.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 5
    });
  });

  // Y-intercept questions
  const interceptQuestions = [
    { m: 2, b: 3 },
    { m: 3, b: 5 },
    { m: -1, b: 4 },
    { m: -2, b: 6 },
    { m: 1, b: 7 },
    { m: 4, b: 2 },
    { m: -3, b: 9 },
    { m: 2, b: -1 },
    { m: -1, b: 8 },
    { m: 3, b: 1 },
    { m: -2, b: 5 },
    { m: 1, b: -3 },
    { m: 4, b: 6 },
    { m: -4, b: 8 },
    { m: 2, b: 10 },
    { m: -1, b: 2 },
    { m: 3, b: -2 },
    { m: -3, b: 7 },
    { m: 1, b: 5 },
    { m: 2, b: 4 },
    { m: -2, b: 3 },
    { m: 4, b: -1 },
    { m: -1, b: 6 },
    { m: 3, b: 8 },
    { m: 1, b: 9 },
    { m: -4, b: 4 },
    { m: 2, b: 7 },
    { m: -3, b: 5 },
    { m: 4, b: 3 },
    { m: -2, b: 10 },
  ];

  interceptQuestions.forEach((eq, i) => {
    const sign = eq.m >= 0 ? '' : '';
    questions.push({
      id: `filler-5-int-${i + 1}`,
      question: `The equation of a line is y = ${eq.m}x + ${eq.b}. What is the y-intercept?`,
      visual: {
        type: "lineGraph",
        data: {
          points: [{ x: 0, y: eq.b }, { x: 2, y: eq.m * 2 + eq.b }]
        },
        xLabel: "x",
        yLabel: "y"
      },
      options: [
        { letter: "A", text: String(eq.b - 2) },
        { letter: "B", text: String(eq.b - 1) },
        { letter: "C", text: String(eq.b) },
        { letter: "D", text: String(eq.b + 1) }
      ],
      correctAnswer: "C",
      explanation: `The y-intercept is the value when x = 0, which is ${eq.b}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Linear Functions",
      difficultyRating: 5
    });
  });

  // Mode bin questions
  const modeBinQuestions = [
    { bins: ["0-10", "10-20", "20-30"], freqs: [5, 12, 8], mode: "10-20" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [8, 6, 11], mode: "20-30" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [15, 9, 7], mode: "0-10" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [4, 9, 6], mode: "5-10" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [7, 5, 10], mode: "10-15" },
    { bins: ["10-20", "20-30", "30-40"], freqs: [6, 14, 9], mode: "20-30" },
    { bins: ["10-20", "20-30", "30-40"], freqs: [11, 8, 5], mode: "10-20" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [9, 15, 6], mode: "10-20" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [3, 7, 12], mode: "20-30" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [8, 4, 6], mode: "0-5" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [10, 10, 15], mode: "20-30" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [5, 11, 7], mode: "5-10" },
    { bins: ["10-20", "20-30", "30-40"], freqs: [8, 12, 10], mode: "20-30" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [7, 9, 4], mode: "10-20" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [6, 8, 9], mode: "10-15" },
    { bins: ["10-20", "20-30", "30-40"], freqs: [13, 7, 8], mode: "10-20" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [4, 11, 9], mode: "10-20" },
    { bins: ["0-5", "5-10", "10-15"], freqs: [9, 6, 5], mode: "0-5" },
    { bins: ["10-20", "20-30", "30-40"], freqs: [5, 9, 14], mode: "30-40" },
    { bins: ["0-10", "10-20", "20-30"], freqs: [6, 8, 10], mode: "20-30" },
  ];

  modeBinQuestions.forEach((mq, i) => {
    questions.push({
      id: `filler-5-mode-${i + 1}`,
      question: `A histogram shows bins ${mq.bins.join(", ")} with frequencies ${mq.freqs.join(", ")}. What is the mode bin?`,
      visual: {
        type: "barChart",
        data: {
          labels: mq.bins,
          values: mq.freqs
        },
        xLabel: "Range",
        yLabel: "Frequency"
      },
      options: [
        { letter: "A", text: mq.bins[0] },
        { letter: "B", text: mq.bins[1] },
        { letter: "C", text: mq.bins[2] },
        { letter: "D", text: "None" }
      ],
      correctAnswer: mq.mode === mq.bins[0] ? "A" : mq.mode === mq.bins[1] ? "B" : "C",
      explanation: `The mode bin is ${mq.mode} with the highest frequency.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 5
    });
  });

  return questions;
};

const generateLevel6Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  // Systems of equations
  const systemQuestions = [
    { eq1: "y = x + 3", eq2: "y = 2x + 1", solution: "(2, 5)" },
    { eq1: "y = 2x - 1", eq2: "y = -x + 8", solution: "(3, 5)" },
    { eq1: "y = 3x + 2", eq2: "y = x + 6", solution: "(2, 8)" },
    { eq1: "y = x + 5", eq2: "y = 3x - 1", solution: "(3, 8)" },
    { eq1: "y = 2x + 4", eq2: "y = -x + 7", solution: "(1, 6)" },
    { eq1: "y = x + 2", eq2: "y = -2x + 8", solution: "(2, 4)" },
    { eq1: "y = 3x - 2", eq2: "y = x + 4", solution: "(3, 7)" },
    { eq1: "y = 2x + 3", eq2: "y = -x + 9", solution: "(2, 7)" },
    { eq1: "y = x + 4", eq2: "y = 2x + 1", solution: "(3, 7)" },
    { eq1: "y = 3x + 1", eq2: "y = x + 7", solution: "(3, 10)" },
    { eq1: "y = 2x - 3", eq2: "y = -x + 6", solution: "(3, 3)" },
    { eq1: "y = x + 6", eq2: "y = 3x", solution: "(3, 9)" },
    { eq1: "y = 2x + 2", eq2: "y = -x + 11", solution: "(3, 8)" },
    { eq1: "y = x + 1", eq2: "y = 2x - 2", solution: "(3, 4)" },
    { eq1: "y = 3x - 1", eq2: "y = x + 5", solution: "(3, 8)" },
    { eq1: "y = 2x + 5", eq2: "y = -x + 8", solution: "(1, 7)" },
    { eq1: "y = x + 7", eq2: "y = 3x + 1", solution: "(3, 10)" },
    { eq1: "y = 2x - 2", eq2: "y = -x + 7", solution: "(3, 4)" },
    { eq1: "y = x + 8", eq2: "y = 2x + 5", solution: "(3, 11)" },
    { eq1: "y = 3x + 3", eq2: "y = x + 9", solution: "(3, 12)" },
    { eq1: "y = 2x + 1", eq2: "y = -x + 10", solution: "(3, 7)" },
    { eq1: "y = x + 9", eq2: "y = 3x + 3", solution: "(3, 12)" },
    { eq1: "y = 2x", eq2: "y = -x + 9", solution: "(3, 6)" },
    { eq1: "y = x + 10", eq2: "y = 2x + 7", solution: "(3, 13)" },
    { eq1: "y = 3x - 3", eq2: "y = x + 3", solution: "(3, 6)" },
    { eq1: "y = 2x + 6", eq2: "y = -x + 9", solution: "(1, 8)" },
    { eq1: "y = x + 11", eq2: "y = 3x + 5", solution: "(3, 14)" },
    { eq1: "y = 2x - 1", eq2: "y = -x + 5", solution: "(2, 3)" },
    { eq1: "y = x + 12", eq2: "y = 2x + 9", solution: "(3, 15)" },
    { eq1: "y = 3x + 4", eq2: "y = x + 10", solution: "(3, 13)" },
    { eq1: "y = 2x + 7", eq2: "y = -x + 10", solution: "(1, 9)" },
    { eq1: "y = x + 13", eq2: "y = 3x + 7", solution: "(3, 16)" },
    { eq1: "y = 2x - 4", eq2: "y = -x + 8", solution: "(4, 4)" },
    { eq1: "y = x + 14", eq2: "y = 2x + 11", solution: "(3, 17)" },
    { eq1: "y = 3x + 5", eq2: "y = x + 11", solution: "(3, 14)" },
  ];

  systemQuestions.forEach((sq, i) => {
    const wrongAnswers = ["(1, 4)", "(2, 6)", "(4, 7)", "(3, 9)"].filter(a => a !== sq.solution);
    questions.push({
      id: `filler-6-sys-${i + 1}`,
      question: `Solve the system: ${sq.eq1} and ${sq.eq2}. What is the solution?`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation 1", "Equation 2"],
          rows: [[sq.eq1, sq.eq2]]
        }
      },
      options: [
        { letter: "A", text: sq.solution },
        { letter: "B", text: wrongAnswers[0] },
        { letter: "C", text: wrongAnswers[1] },
        { letter: "D", text: wrongAnswers[2] }
      ],
      correctAnswer: "A",
      explanation: `Solving the system gives ${sq.solution}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Systems of Equations",
      difficultyRating: 6
    });
  });

  // Quadratic roots
  const quadraticQuestions = [
    { eq: "x² - 5x + 6 = 0", roots: "x = 2, 3" },
    { eq: "x² - 7x + 12 = 0", roots: "x = 3, 4" },
    { eq: "x² - 6x + 8 = 0", roots: "x = 2, 4" },
    { eq: "x² - 8x + 15 = 0", roots: "x = 3, 5" },
    { eq: "x² - 9x + 20 = 0", roots: "x = 4, 5" },
    { eq: "x² - 10x + 21 = 0", roots: "x = 3, 7" },
    { eq: "x² - 11x + 24 = 0", roots: "x = 3, 8" },
    { eq: "x² - 12x + 35 = 0", roots: "x = 5, 7" },
    { eq: "x² - 7x + 10 = 0", roots: "x = 2, 5" },
    { eq: "x² - 8x + 12 = 0", roots: "x = 2, 6" },
    { eq: "x² - 9x + 14 = 0", roots: "x = 2, 7" },
    { eq: "x² - 10x + 16 = 0", roots: "x = 2, 8" },
    { eq: "x² - 11x + 18 = 0", roots: "x = 2, 9" },
    { eq: "x² - 6x + 5 = 0", roots: "x = 1, 5" },
    { eq: "x² - 8x + 7 = 0", roots: "x = 1, 7" },
    { eq: "x² - 10x + 9 = 0", roots: "x = 1, 9" },
    { eq: "x² - 5x + 4 = 0", roots: "x = 1, 4" },
    { eq: "x² - 9x + 18 = 0", roots: "x = 3, 6" },
    { eq: "x² - 10x + 24 = 0", roots: "x = 4, 6" },
    { eq: "x² - 11x + 28 = 0", roots: "x = 4, 7" },
    { eq: "x² - 12x + 32 = 0", roots: "x = 4, 8" },
    { eq: "x² - 13x + 36 = 0", roots: "x = 4, 9" },
    { eq: "x² - 11x + 30 = 0", roots: "x = 5, 6" },
    { eq: "x² - 12x + 27 = 0", roots: "x = 3, 9" },
    { eq: "x² - 13x + 40 = 0", roots: "x = 5, 8" },
    { eq: "x² - 14x + 45 = 0", roots: "x = 5, 9" },
    { eq: "x² - 13x + 42 = 0", roots: "x = 6, 7" },
    { eq: "x² - 14x + 48 = 0", roots: "x = 6, 8" },
    { eq: "x² - 15x + 54 = 0", roots: "x = 6, 9" },
    { eq: "x² - 15x + 56 = 0", roots: "x = 7, 8" },
    { eq: "x² - 16x + 63 = 0", roots: "x = 7, 9" },
    { eq: "x² - 17x + 72 = 0", roots: "x = 8, 9" },
    { eq: "x² - 4x + 3 = 0", roots: "x = 1, 3" },
    { eq: "x² - 6x + 9 = 0", roots: "x = 3" },
    { eq: "x² - 8x + 16 = 0", roots: "x = 4" },
  ];

  quadraticQuestions.forEach((qq, i) => {
    questions.push({
      id: `filler-6-quad-${i + 1}`,
      question: `Solve: ${qq.eq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[qq.eq]]
        }
      },
      options: [
        { letter: "A", text: qq.roots },
        { letter: "B", text: "x = 0, 5" },
        { letter: "C", text: "x = -1, -2" },
        { letter: "D", text: "x = 1, 6" }
      ],
      correctAnswer: "A",
      explanation: `Factoring gives ${qq.roots}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Quadratic Equations",
      difficultyRating: 6
    });
  });

  // Square root equations
  const sqrtQuestions = [
    { eq: "√x = 5", answer: 25 },
    { eq: "√x = 6", answer: 36 },
    { eq: "√x = 7", answer: 49 },
    { eq: "√x = 8", answer: 64 },
    { eq: "√x = 9", answer: 81 },
    { eq: "√x = 10", answer: 100 },
    { eq: "√x = 11", answer: 121 },
    { eq: "√x = 12", answer: 144 },
    { eq: "√x = 3", answer: 9 },
    { eq: "√x = 4", answer: 16 },
    { eq: "√(x+1) = 5", answer: 24 },
    { eq: "√(x+4) = 6", answer: 32 },
    { eq: "√(x-1) = 4", answer: 17 },
    { eq: "√(x+9) = 7", answer: 40 },
    { eq: "√(x-4) = 5", answer: 29 },
    { eq: "√(2x) = 6", answer: 18 },
    { eq: "√(3x) = 6", answer: 12 },
    { eq: "√(2x) = 8", answer: 32 },
    { eq: "√(x+16) = 8", answer: 48 },
    { eq: "√(x-9) = 6", answer: 45 },
    { eq: "√(x+25) = 9", answer: 56 },
    { eq: "√(2x+2) = 6", answer: 17 },
    { eq: "√(3x+1) = 7", answer: 16 },
    { eq: "√(x+36) = 10", answer: 64 },
    { eq: "√(x-16) = 7", answer: 65 },
    { eq: "√(4x) = 8", answer: 16 },
    { eq: "√(5x) = 10", answer: 20 },
    { eq: "√(x+49) = 11", answer: 72 },
    { eq: "√(x-25) = 8", answer: 89 },
    { eq: "√(2x-2) = 6", answer: 19 },
  ];

  sqrtQuestions.forEach((sq, i) => {
    questions.push({
      id: `filler-6-sqrt-${i + 1}`,
      question: `Solve for x: ${sq.eq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[sq.eq]]
        }
      },
      options: [
        { letter: "A", text: String(sq.answer - 5) },
        { letter: "B", text: String(sq.answer) },
        { letter: "C", text: String(sq.answer + 5) },
        { letter: "D", text: String(sq.answer + 10) }
      ],
      correctAnswer: "B",
      explanation: `Squaring both sides and solving gives x = ${sq.answer}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Radical Equations",
      difficultyRating: 6
    });
  });

  // Inequality questions
  const ineqQuestions = [
    { ineq: "3x + 5 > 14", answer: "x > 3" },
    { ineq: "2x - 4 ≥ 10", answer: "x ≥ 7" },
    { ineq: "4x + 8 < 24", answer: "x < 4" },
    { ineq: "5x - 10 ≤ 15", answer: "x ≤ 5" },
    { ineq: "2x + 6 > 12", answer: "x > 3" },
    { ineq: "3x - 9 ≥ 6", answer: "x ≥ 5" },
    { ineq: "4x + 4 < 20", answer: "x < 4" },
    { ineq: "5x - 5 ≤ 20", answer: "x ≤ 5" },
    { ineq: "6x + 12 > 30", answer: "x > 3" },
    { ineq: "7x - 7 ≥ 28", answer: "x ≥ 5" },
    { ineq: "2x + 8 < 16", answer: "x < 4" },
    { ineq: "3x - 6 ≤ 9", answer: "x ≤ 5" },
    { ineq: "4x + 12 > 24", answer: "x > 3" },
    { ineq: "5x - 15 ≥ 10", answer: "x ≥ 5" },
    { ineq: "6x + 6 < 30", answer: "x < 4" },
    { ineq: "2x + 10 > 18", answer: "x > 4" },
    { ineq: "3x - 3 ≥ 12", answer: "x ≥ 5" },
    { ineq: "4x + 16 < 32", answer: "x < 4" },
    { ineq: "5x - 20 ≤ 5", answer: "x ≤ 5" },
    { ineq: "6x + 18 > 36", answer: "x > 3" },
    { ineq: "7x - 14 ≥ 21", answer: "x ≥ 5" },
    { ineq: "2x + 12 < 20", answer: "x < 4" },
    { ineq: "3x - 12 ≤ 3", answer: "x ≤ 5" },
    { ineq: "4x + 20 > 32", answer: "x > 3" },
    { ineq: "5x - 25 ≥ 0", answer: "x ≥ 5" },
    { ineq: "6x + 24 < 48", answer: "x < 4" },
    { ineq: "2x + 14 > 22", answer: "x > 4" },
    { ineq: "3x - 15 ≥ 0", answer: "x ≥ 5" },
    { ineq: "4x + 24 < 40", answer: "x < 4" },
    { ineq: "5x - 30 ≤ -5", answer: "x ≤ 5" },
  ];

  ineqQuestions.forEach((iq, i) => {
    questions.push({
      id: `filler-6-ineq-${i + 1}`,
      question: `Solve: ${iq.ineq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Inequality"],
          rows: [[iq.ineq]]
        }
      },
      options: [
        { letter: "A", text: iq.answer },
        { letter: "B", text: "x > 10" },
        { letter: "C", text: "x < 1" },
        { letter: "D", text: "x ≤ 0" }
      ],
      correctAnswer: "A",
      explanation: `Solving the inequality gives ${iq.answer}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Inequalities",
      difficultyRating: 6
    });
  });

  // Range questions
  const rangeQuestions = [
    { min: 5, max: 25, range: 20 },
    { min: 10, max: 35, range: 25 },
    { min: 8, max: 28, range: 20 },
    { min: 12, max: 42, range: 30 },
    { min: 15, max: 45, range: 30 },
    { min: 3, max: 23, range: 20 },
    { min: 7, max: 32, range: 25 },
    { min: 11, max: 41, range: 30 },
    { min: 6, max: 26, range: 20 },
    { min: 9, max: 34, range: 25 },
    { min: 14, max: 44, range: 30 },
    { min: 4, max: 24, range: 20 },
    { min: 8, max: 33, range: 25 },
    { min: 13, max: 43, range: 30 },
    { min: 2, max: 22, range: 20 },
    { min: 6, max: 31, range: 25 },
    { min: 10, max: 40, range: 30 },
    { min: 5, max: 30, range: 25 },
    { min: 9, max: 39, range: 30 },
    { min: 7, max: 27, range: 20 },
    { min: 11, max: 36, range: 25 },
    { min: 15, max: 50, range: 35 },
    { min: 3, max: 28, range: 25 },
    { min: 8, max: 38, range: 30 },
    { min: 12, max: 47, range: 35 },
    { min: 4, max: 29, range: 25 },
    { min: 9, max: 44, range: 35 },
    { min: 6, max: 36, range: 30 },
    { min: 10, max: 45, range: 35 },
    { min: 5, max: 35, range: 30 },
  ];

  rangeQuestions.forEach((rq, i) => {
    questions.push({
      id: `filler-6-range-${i + 1}`,
      question: `A dataset has minimum ${rq.min} and maximum ${rq.max}. What is the range?`,
      visual: {
        type: "table",
        data: {
          headers: ["Min", "Max"],
          rows: [[String(rq.min), String(rq.max)]]
        }
      },
      options: [
        { letter: "A", text: String(rq.range - 5) },
        { letter: "B", text: String(rq.range) },
        { letter: "C", text: String(rq.range + 5) },
        { letter: "D", text: String(rq.range + 10) }
      ],
      correctAnswer: "B",
      explanation: `Range = Max - Min = ${rq.max} - ${rq.min} = ${rq.range}.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 6
    });
  });

  return questions;
};

const generateLevel7Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  // Quadratic inequality questions
  const quadIneqQuestions = [
    { ineq: "(x-1)(x-4) < 0", answer: "1 < x < 4" },
    { ineq: "(x-2)(x-5) < 0", answer: "2 < x < 5" },
    { ineq: "(x-3)(x-6) < 0", answer: "3 < x < 6" },
    { ineq: "(x+1)(x-3) < 0", answer: "-1 < x < 3" },
    { ineq: "(x+2)(x-4) < 0", answer: "-2 < x < 4" },
    { ineq: "(x-1)(x-5) > 0", answer: "x < 1 or x > 5" },
    { ineq: "(x-2)(x-6) > 0", answer: "x < 2 or x > 6" },
    { ineq: "(x+1)(x-4) > 0", answer: "x < -1 or x > 4" },
    { ineq: "(x-0)(x-5) < 0", answer: "0 < x < 5" },
    { ineq: "(x-2)(x-7) < 0", answer: "2 < x < 7" },
    { ineq: "(x+3)(x-2) < 0", answer: "-3 < x < 2" },
    { ineq: "(x-4)(x-8) < 0", answer: "4 < x < 8" },
    { ineq: "(x+2)(x-6) > 0", answer: "x < -2 or x > 6" },
    { ineq: "(x-1)(x-6) < 0", answer: "1 < x < 6" },
    { ineq: "(x-3)(x-7) > 0", answer: "x < 3 or x > 7" },
    { ineq: "(x+4)(x-1) < 0", answer: "-4 < x < 1" },
    { ineq: "(x-2)(x-8) < 0", answer: "2 < x < 8" },
    { ineq: "(x+1)(x-5) > 0", answer: "x < -1 or x > 5" },
    { ineq: "(x-3)(x-8) < 0", answer: "3 < x < 8" },
    { ineq: "(x+2)(x-7) > 0", answer: "x < -2 or x > 7" },
    { ineq: "(x-4)(x-9) < 0", answer: "4 < x < 9" },
    { ineq: "(x+3)(x-4) < 0", answer: "-3 < x < 4" },
    { ineq: "(x-1)(x-7) > 0", answer: "x < 1 or x > 7" },
    { ineq: "(x-5)(x-9) < 0", answer: "5 < x < 9" },
    { ineq: "(x+1)(x-6) < 0", answer: "-1 < x < 6" },
    { ineq: "(x-2)(x-9) > 0", answer: "x < 2 or x > 9" },
    { ineq: "(x+4)(x-3) < 0", answer: "-4 < x < 3" },
    { ineq: "(x-3)(x-9) < 0", answer: "3 < x < 9" },
    { ineq: "(x+2)(x-8) > 0", answer: "x < -2 or x > 8" },
    { ineq: "(x-1)(x-8) < 0", answer: "1 < x < 8" },
    { ineq: "(x+5)(x-2) < 0", answer: "-5 < x < 2" },
    { ineq: "(x-4)(x-10) > 0", answer: "x < 4 or x > 10" },
    { ineq: "(x+3)(x-5) < 0", answer: "-3 < x < 5" },
    { ineq: "(x-2)(x-10) < 0", answer: "2 < x < 10" },
    { ineq: "(x+1)(x-7) > 0", answer: "x < -1 or x > 7" },
  ];

  quadIneqQuestions.forEach((qq, i) => {
    questions.push({
      id: `filler-7-quadineq-${i + 1}`,
      question: `Solve: ${qq.ineq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Inequality"],
          rows: [[qq.ineq]]
        }
      },
      options: [
        { letter: "A", text: qq.answer },
        { letter: "B", text: "x > 10" },
        { letter: "C", text: "All x" },
        { letter: "D", text: "No solution" }
      ],
      correctAnswer: "A",
      explanation: `The solution is ${qq.answer}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Quadratic Inequalities",
      difficultyRating: 7
    });
  });

  // Line-parabola intersections
  const intersectionQuestions = [
    { line: "y = x + 1", parabola: "y = x²", solutions: 2 },
    { line: "y = 2x", parabola: "y = x²", solutions: 2 },
    { line: "y = x + 2", parabola: "y = x² - 1", solutions: 2 },
    { line: "y = 3x - 1", parabola: "y = x²", solutions: 2 },
    { line: "y = x - 5", parabola: "y = x²", solutions: 2 },
    { line: "y = 2x + 3", parabola: "y = x² + 1", solutions: 2 },
    { line: "y = x + 4", parabola: "y = x² - 2", solutions: 2 },
    { line: "y = 4x", parabola: "y = x² + 2", solutions: 2 },
    { line: "y = x + 6", parabola: "y = x² + 3", solutions: 2 },
    { line: "y = 2x - 2", parabola: "y = x² - 1", solutions: 2 },
    { line: "y = x", parabola: "y = x² - x", solutions: 2 },
    { line: "y = 3x + 2", parabola: "y = x² + 1", solutions: 2 },
    { line: "y = x + 3", parabola: "y = x²", solutions: 2 },
    { line: "y = 2x + 1", parabola: "y = x² - 2", solutions: 2 },
    { line: "y = x - 1", parabola: "y = x² - 3", solutions: 2 },
    { line: "y = 4x + 1", parabola: "y = x² + 3", solutions: 2 },
    { line: "y = x + 5", parabola: "y = x² - 1", solutions: 2 },
    { line: "y = 2x - 1", parabola: "y = x²", solutions: 2 },
    { line: "y = 3x", parabola: "y = x² + 2", solutions: 2 },
    { line: "y = x + 7", parabola: "y = x² + 4", solutions: 2 },
    { line: "y = 2x + 4", parabola: "y = x²", solutions: 2 },
    { line: "y = x - 2", parabola: "y = x² - 4", solutions: 2 },
    { line: "y = 3x + 1", parabola: "y = x² - 1", solutions: 2 },
    { line: "y = x + 8", parabola: "y = x² + 5", solutions: 2 },
    { line: "y = 2x - 3", parabola: "y = x² - 2", solutions: 2 },
    { line: "y = 4x - 1", parabola: "y = x² + 1", solutions: 2 },
    { line: "y = x + 9", parabola: "y = x² + 6", solutions: 2 },
    { line: "y = 3x - 2", parabola: "y = x²", solutions: 2 },
    { line: "y = x - 3", parabola: "y = x² - 5", solutions: 2 },
    { line: "y = 2x + 5", parabola: "y = x² + 2", solutions: 2 },
    { line: "y = 5x", parabola: "y = x² + 4", solutions: 2 },
    { line: "y = x + 10", parabola: "y = x² + 7", solutions: 2 },
    { line: "y = 3x + 3", parabola: "y = x² + 1", solutions: 2 },
    { line: "y = 2x - 4", parabola: "y = x² - 3", solutions: 2 },
    { line: "y = x - 4", parabola: "y = x² - 6", solutions: 2 },
  ];

  intersectionQuestions.forEach((iq, i) => {
    questions.push({
      id: `filler-7-inter-${i + 1}`,
      question: `How many times do ${iq.line} and ${iq.parabola} intersect?`,
      visual: {
        type: "table",
        data: {
          headers: ["Line", "Parabola"],
          rows: [[iq.line, iq.parabola]]
        }
      },
      options: [
        { letter: "A", text: "0" },
        { letter: "B", text: "1" },
        { letter: "C", text: "2" },
        { letter: "D", text: "3" }
      ],
      correctAnswer: "C",
      explanation: `The line and parabola intersect ${iq.solutions} times.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Systems of Equations",
      difficultyRating: 7
    });
  });

  // Exponential equations
  const expQuestions = [
    { eq: "2^x = 8", answer: 3 },
    { eq: "2^x = 16", answer: 4 },
    { eq: "2^x = 32", answer: 5 },
    { eq: "3^x = 9", answer: 2 },
    { eq: "3^x = 27", answer: 3 },
    { eq: "3^x = 81", answer: 4 },
    { eq: "4^x = 16", answer: 2 },
    { eq: "4^x = 64", answer: 3 },
    { eq: "5^x = 25", answer: 2 },
    { eq: "5^x = 125", answer: 3 },
    { eq: "2^(x+1) = 16", answer: 3 },
    { eq: "2^(x+1) = 32", answer: 4 },
    { eq: "3^(x+1) = 27", answer: 2 },
    { eq: "3^(x+1) = 81", answer: 3 },
    { eq: "2^(x-1) = 8", answer: 4 },
    { eq: "2^(x-1) = 16", answer: 5 },
    { eq: "3^(x-1) = 9", answer: 3 },
    { eq: "3^(x-1) = 27", answer: 4 },
    { eq: "4^(x+1) = 64", answer: 2 },
    { eq: "5^(x+1) = 125", answer: 2 },
    { eq: "2^(2x) = 16", answer: 2 },
    { eq: "2^(2x) = 64", answer: 3 },
    { eq: "3^(2x) = 81", answer: 2 },
    { eq: "4^(x-1) = 16", answer: 3 },
    { eq: "5^(x-1) = 25", answer: 3 },
    { eq: "2^x = 64", answer: 6 },
    { eq: "2^x = 128", answer: 7 },
    { eq: "3^x = 243", answer: 5 },
    { eq: "4^x = 256", answer: 4 },
    { eq: "5^x = 625", answer: 4 },
    { eq: "6^x = 36", answer: 2 },
    { eq: "6^x = 216", answer: 3 },
    { eq: "7^x = 49", answer: 2 },
    { eq: "8^x = 64", answer: 2 },
    { eq: "9^x = 81", answer: 2 },
  ];

  expQuestions.forEach((eq, i) => {
    questions.push({
      id: `filler-7-exp-${i + 1}`,
      question: `Solve: ${eq.eq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[eq.eq]]
        }
      },
      options: [
        { letter: "A", text: String(eq.answer - 1) },
        { letter: "B", text: String(eq.answer) },
        { letter: "C", text: String(eq.answer + 1) },
        { letter: "D", text: String(eq.answer + 2) }
      ],
      correctAnswer: "B",
      explanation: `The solution is x = ${eq.answer}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Exponential Equations",
      difficultyRating: 7
    });
  });

  // Model fitting questions
  const modelQuestions = [
    { points: [[1, 2], [2, 4], [3, 6], [4, 8]], model: "Linear" },
    { points: [[1, 1], [2, 4], [3, 9], [4, 16]], model: "Quadratic" },
    { points: [[1, 2], [2, 4], [3, 8], [4, 16]], model: "Exponential" },
    { points: [[1, 3], [2, 6], [3, 9], [4, 12]], model: "Linear" },
    { points: [[1, 1], [2, 8], [3, 27], [4, 64]], model: "Cubic" },
    { points: [[1, 5], [2, 10], [3, 15], [4, 20]], model: "Linear" },
    { points: [[1, 2], [2, 5], [3, 10], [4, 17]], model: "Quadratic" },
    { points: [[1, 3], [2, 9], [3, 27], [4, 81]], model: "Exponential" },
    { points: [[1, 4], [2, 8], [3, 12], [4, 16]], model: "Linear" },
    { points: [[1, 0], [2, 3], [3, 8], [4, 15]], model: "Quadratic" },
    { points: [[1, 1], [2, 2], [3, 4], [4, 8]], model: "Exponential" },
    { points: [[1, 7], [2, 14], [3, 21], [4, 28]], model: "Linear" },
    { points: [[1, 3], [2, 12], [3, 27], [4, 48]], model: "Quadratic" },
    { points: [[1, 5], [2, 25], [3, 125], [4, 625]], model: "Exponential" },
    { points: [[1, 6], [2, 12], [3, 18], [4, 24]], model: "Linear" },
    { points: [[1, 2], [2, 8], [3, 18], [4, 32]], model: "Quadratic" },
    { points: [[1, 4], [2, 16], [3, 64], [4, 256]], model: "Exponential" },
    { points: [[1, 8], [2, 16], [3, 24], [4, 32]], model: "Linear" },
    { points: [[1, 5], [2, 20], [3, 45], [4, 80]], model: "Quadratic" },
    { points: [[1, 2], [2, 6], [3, 18], [4, 54]], model: "Exponential" },
    { points: [[1, 9], [2, 18], [3, 27], [4, 36]], model: "Linear" },
    { points: [[1, 4], [2, 16], [3, 36], [4, 64]], model: "Quadratic" },
    { points: [[1, 3], [2, 6], [3, 12], [4, 24]], model: "Exponential" },
    { points: [[1, 10], [2, 20], [3, 30], [4, 40]], model: "Linear" },
    { points: [[1, 6], [2, 24], [3, 54], [4, 96]], model: "Quadratic" },
    { points: [[1, 5], [2, 10], [3, 20], [4, 40]], model: "Exponential" },
    { points: [[1, 11], [2, 22], [3, 33], [4, 44]], model: "Linear" },
    { points: [[1, 7], [2, 28], [3, 63], [4, 112]], model: "Quadratic" },
    { points: [[1, 4], [2, 8], [3, 16], [4, 32]], model: "Exponential" },
    { points: [[1, 12], [2, 24], [3, 36], [4, 48]], model: "Linear" },
    { points: [[1, 1], [2, 3], [3, 5], [4, 7]], model: "Linear" },
    { points: [[1, 2], [2, 6], [3, 12], [4, 20]], model: "Quadratic" },
    { points: [[1, 6], [2, 12], [3, 24], [4, 48]], model: "Exponential" },
    { points: [[1, 13], [2, 26], [3, 39], [4, 52]], model: "Linear" },
    { points: [[1, 8], [2, 32], [3, 72], [4, 128]], model: "Quadratic" },
  ];

  modelQuestions.forEach((mq, i) => {
    questions.push({
      id: `filler-7-model-${i + 1}`,
      question: `Points ${mq.points.map(p => `(${p[0]}, ${p[1]})`).join(", ")} are plotted. What type of model best fits?`,
      visual: {
        type: "scatterPlot",
        data: {
          points: mq.points.map(p => ({ x: p[0], y: p[1] }))
        },
        xLabel: "x",
        yLabel: "y"
      },
      options: [
        { letter: "A", text: "Linear" },
        { letter: "B", text: "Quadratic" },
        { letter: "C", text: "Exponential" },
        { letter: "D", text: "Constant" }
      ],
      correctAnswer: mq.model === "Linear" ? "A" : mq.model === "Quadratic" ? "B" : "C",
      explanation: `The pattern suggests a ${mq.model.toLowerCase()} model.`,
      difficulty: "Hard",
      domain: "Problem Solving",
      skill: "Data Modeling",
      difficultyRating: 7
    });
  });

  return questions;
};

const generateLevel8Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  // Absolute value equations
  const absValQuestions = [
    { eq: "|x - 3| = 5", answer: "x = -2 or x = 8" },
    { eq: "|x + 2| = 4", answer: "x = -6 or x = 2" },
    { eq: "|2x - 4| = 6", answer: "x = -1 or x = 5" },
    { eq: "|3x + 6| = 9", answer: "x = -5 or x = 1" },
    { eq: "|x - 5| = 7", answer: "x = -2 or x = 12" },
    { eq: "|x + 4| = 6", answer: "x = -10 or x = 2" },
    { eq: "|2x - 6| = 8", answer: "x = -1 or x = 7" },
    { eq: "|3x + 3| = 12", answer: "x = -5 or x = 3" },
    { eq: "|x - 1| = 4", answer: "x = -3 or x = 5" },
    { eq: "|x + 5| = 8", answer: "x = -13 or x = 3" },
    { eq: "|2x - 2| = 10", answer: "x = -4 or x = 6" },
    { eq: "|3x - 9| = 15", answer: "x = -2 or x = 8" },
    { eq: "|x - 7| = 3", answer: "x = 4 or x = 10" },
    { eq: "|x + 6| = 10", answer: "x = -16 or x = 4" },
    { eq: "|2x + 4| = 12", answer: "x = -8 or x = 4" },
    { eq: "|3x - 3| = 18", answer: "x = -5 or x = 7" },
    { eq: "|x - 2| = 6", answer: "x = -4 or x = 8" },
    { eq: "|x + 8| = 12", answer: "x = -20 or x = 4" },
    { eq: "|2x - 8| = 14", answer: "x = -3 or x = 11" },
    { eq: "|3x + 9| = 21", answer: "x = -10 or x = 4" },
    { eq: "|x - 4| = 8", answer: "x = -4 or x = 12" },
    { eq: "|x + 1| = 5", answer: "x = -6 or x = 4" },
    { eq: "|2x + 2| = 16", answer: "x = -9 or x = 7" },
    { eq: "|3x - 6| = 24", answer: "x = -6 or x = 10" },
    { eq: "|x - 6| = 4", answer: "x = 2 or x = 10" },
    { eq: "|x + 3| = 7", answer: "x = -10 or x = 4" },
    { eq: "|2x - 10| = 6", answer: "x = 2 or x = 8" },
    { eq: "|3x + 12| = 15", answer: "x = -9 or x = 1" },
    { eq: "|x - 8| = 5", answer: "x = 3 or x = 13" },
    { eq: "|x + 7| = 9", answer: "x = -16 or x = 2" },
    { eq: "|2x - 12| = 8", answer: "x = 2 or x = 10" },
    { eq: "|3x - 12| = 21", answer: "x = -3 or x = 11" },
    { eq: "|x - 9| = 6", answer: "x = 3 or x = 15" },
    { eq: "|x + 9| = 11", answer: "x = -20 or x = 2" },
    { eq: "|2x + 6| = 18", answer: "x = -12 or x = 6" },
  ];

  absValQuestions.forEach((aq, i) => {
    questions.push({
      id: `filler-8-abs-${i + 1}`,
      question: `Solve: ${aq.eq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[aq.eq]]
        }
      },
      options: [
        { letter: "A", text: aq.answer },
        { letter: "B", text: "x = 0" },
        { letter: "C", text: "No solution" },
        { letter: "D", text: "x = 1 or x = -1" }
      ],
      correctAnswer: "A",
      explanation: `The solution is ${aq.answer}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Absolute Value Equations",
      difficultyRating: 8
    });
  });

  // Logarithm questions
  const logQuestions = [
    { eq: "log₂(x) = 4", answer: 16 },
    { eq: "log₂(x) = 5", answer: 32 },
    { eq: "log₃(x) = 2", answer: 9 },
    { eq: "log₃(x) = 3", answer: 27 },
    { eq: "log₅(x) = 2", answer: 25 },
    { eq: "log₅(x) = 3", answer: 125 },
    { eq: "log₄(x) = 2", answer: 16 },
    { eq: "log₄(x) = 3", answer: 64 },
    { eq: "log₂(x) = 6", answer: 64 },
    { eq: "log₂(x) = 7", answer: 128 },
    { eq: "log₃(x) = 4", answer: 81 },
    { eq: "log₁₀(x) = 2", answer: 100 },
    { eq: "log₁₀(x) = 3", answer: 1000 },
    { eq: "log₆(x) = 2", answer: 36 },
    { eq: "log₇(x) = 2", answer: 49 },
    { eq: "log₈(x) = 2", answer: 64 },
    { eq: "log₉(x) = 2", answer: 81 },
    { eq: "log₂(x) = 8", answer: 256 },
    { eq: "log₃(x) = 5", answer: 243 },
    { eq: "log₄(x) = 4", answer: 256 },
    { eq: "log₅(x) = 4", answer: 625 },
    { eq: "log₂(x-1) = 3", answer: 9 },
    { eq: "log₂(x+1) = 4", answer: 15 },
    { eq: "log₃(x-2) = 2", answer: 11 },
    { eq: "log₃(x+3) = 3", answer: 24 },
    { eq: "log₂(2x) = 4", answer: 8 },
    { eq: "log₂(3x) = 5", answer: 10.67 },
    { eq: "log₃(2x) = 3", answer: 13.5 },
    { eq: "log₄(x-4) = 2", answer: 20 },
    { eq: "log₅(x+5) = 2", answer: 20 },
    { eq: "log₂(x) = 9", answer: 512 },
    { eq: "log₂(x) = 10", answer: 1024 },
    { eq: "log₃(x) = 6", answer: 729 },
    { eq: "log₄(x) = 5", answer: 1024 },
    { eq: "log₁₀(x) = 4", answer: 10000 },
  ];

  logQuestions.forEach((lq, i) => {
    questions.push({
      id: `filler-8-log-${i + 1}`,
      question: `Solve: ${lq.eq}`,
      visual: {
        type: "table",
        data: {
          headers: ["Equation"],
          rows: [[lq.eq]]
        }
      },
      options: [
        { letter: "A", text: String(Math.round(lq.answer * 0.8)) },
        { letter: "B", text: String(Math.round(lq.answer)) },
        { letter: "C", text: String(Math.round(lq.answer * 1.2)) },
        { letter: "D", text: String(Math.round(lq.answer * 1.5)) }
      ],
      correctAnswer: "B",
      explanation: `The solution is x = ${lq.answer}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Logarithmic Equations",
      difficultyRating: 8
    });
  });

  // Perpendicular slope questions
  const perpQuestions = [
    { slope: 2, perpSlope: "-1/2" },
    { slope: 3, perpSlope: "-1/3" },
    { slope: 4, perpSlope: "-1/4" },
    { slope: -2, perpSlope: "1/2" },
    { slope: -3, perpSlope: "1/3" },
    { slope: -4, perpSlope: "1/4" },
    { slope: 1, perpSlope: "-1" },
    { slope: -1, perpSlope: "1" },
    { slope: 5, perpSlope: "-1/5" },
    { slope: -5, perpSlope: "1/5" },
    { slope: 6, perpSlope: "-1/6" },
    { slope: -6, perpSlope: "1/6" },
    { slope: 0.5, perpSlope: "-2" },
    { slope: -0.5, perpSlope: "2" },
    { slope: 0.25, perpSlope: "-4" },
    { slope: -0.25, perpSlope: "4" },
    { slope: 0.33, perpSlope: "-3" },
    { slope: -0.33, perpSlope: "3" },
    { slope: 7, perpSlope: "-1/7" },
    { slope: -7, perpSlope: "1/7" },
    { slope: 8, perpSlope: "-1/8" },
    { slope: -8, perpSlope: "1/8" },
    { slope: 10, perpSlope: "-1/10" },
    { slope: -10, perpSlope: "1/10" },
    { slope: 1.5, perpSlope: "-2/3" },
    { slope: -1.5, perpSlope: "2/3" },
    { slope: 2.5, perpSlope: "-2/5" },
    { slope: -2.5, perpSlope: "2/5" },
    { slope: 0.2, perpSlope: "-5" },
    { slope: -0.2, perpSlope: "5" },
    { slope: 0.1, perpSlope: "-10" },
    { slope: -0.1, perpSlope: "10" },
    { slope: 9, perpSlope: "-1/9" },
    { slope: -9, perpSlope: "1/9" },
    { slope: 12, perpSlope: "-1/12" },
  ];

  perpQuestions.forEach((pq, i) => {
    questions.push({
      id: `filler-8-perp-${i + 1}`,
      question: `A line has slope ${pq.slope}. What is the slope of a perpendicular line?`,
      visual: {
        type: "table",
        data: {
          headers: ["Original Slope"],
          rows: [[String(pq.slope)]]
        }
      },
      options: [
        { letter: "A", text: pq.perpSlope },
        { letter: "B", text: String(pq.slope) },
        { letter: "C", text: String(-pq.slope) },
        { letter: "D", text: "0" }
      ],
      correctAnswer: "A",
      explanation: `The perpendicular slope is ${pq.perpSlope} (negative reciprocal).`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Perpendicular Lines",
      difficultyRating: 8
    });
  });

  // Compound interest / growth
  const growthQuestions = [
    { initial: 100, rate: 1.1, years: 2, final: 121 },
    { initial: 200, rate: 1.05, years: 2, final: 220.5 },
    { initial: 500, rate: 1.2, years: 2, final: 720 },
    { initial: 1000, rate: 1.1, years: 3, final: 1331 },
    { initial: 100, rate: 1.5, years: 2, final: 225 },
    { initial: 200, rate: 1.1, years: 2, final: 242 },
    { initial: 300, rate: 1.2, years: 2, final: 432 },
    { initial: 400, rate: 1.05, years: 3, final: 463.05 },
    { initial: 500, rate: 1.1, years: 2, final: 605 },
    { initial: 100, rate: 2, years: 3, final: 800 },
    { initial: 150, rate: 1.2, years: 2, final: 216 },
    { initial: 250, rate: 1.1, years: 3, final: 332.75 },
    { initial: 600, rate: 1.05, years: 2, final: 661.5 },
    { initial: 800, rate: 1.25, years: 2, final: 1250 },
    { initial: 1000, rate: 1.2, years: 2, final: 1440 },
    { initial: 50, rate: 2, years: 4, final: 800 },
    { initial: 100, rate: 1.5, years: 3, final: 337.5 },
    { initial: 200, rate: 1.2, years: 3, final: 345.6 },
    { initial: 400, rate: 1.1, years: 4, final: 585.64 },
    { initial: 500, rate: 1.05, years: 4, final: 607.75 },
    { initial: 100, rate: 3, years: 2, final: 900 },
    { initial: 200, rate: 1.5, years: 2, final: 450 },
    { initial: 300, rate: 1.1, years: 3, final: 399.3 },
    { initial: 400, rate: 1.2, years: 3, final: 691.2 },
    { initial: 500, rate: 1.25, years: 2, final: 781.25 },
    { initial: 100, rate: 1.1, years: 5, final: 161.05 },
    { initial: 200, rate: 1.2, years: 4, final: 414.72 },
    { initial: 300, rate: 1.5, years: 2, final: 675 },
    { initial: 400, rate: 2, years: 2, final: 1600 },
    { initial: 500, rate: 1.1, years: 4, final: 732.05 },
    { initial: 1000, rate: 0.9, years: 2, final: 810 },
    { initial: 800, rate: 0.8, years: 2, final: 512 },
    { initial: 600, rate: 0.9, years: 3, final: 437.4 },
    { initial: 400, rate: 0.95, years: 2, final: 361 },
    { initial: 200, rate: 0.5, years: 3, final: 25 },
  ];

  growthQuestions.forEach((gq, i) => {
    const isGrowth = gq.rate > 1;
    const verb = isGrowth ? "grows" : "decays";
    const ratePercent = isGrowth ? Math.round((gq.rate - 1) * 100) : Math.round((1 - gq.rate) * 100);
    
    questions.push({
      id: `filler-8-growth-${i + 1}`,
      question: `A population starts at ${gq.initial} and ${verb} by ${ratePercent}% per year. What is the value after ${gq.years} years?`,
      visual: {
        type: "table",
        data: {
          headers: ["Initial", "Rate", "Years"],
          rows: [[String(gq.initial), `${isGrowth ? '+' : '-'}${ratePercent}%`, String(gq.years)]]
        }
      },
      options: [
        { letter: "A", text: String(Math.round(gq.final * 0.8)) },
        { letter: "B", text: String(Math.round(gq.final)) },
        { letter: "C", text: String(Math.round(gq.final * 1.2)) },
        { letter: "D", text: String(Math.round(gq.final * 1.4)) }
      ],
      correctAnswer: "B",
      explanation: `${gq.initial} × ${gq.rate}^${gq.years} = ${Math.round(gq.final)}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Exponential Growth",
      difficultyRating: 8
    });
  });

  // Correlation questions
  const corrQuestions = [
    { points: [[1, 10], [2, 8], [3, 6], [4, 4], [5, 2]], corr: "Strong negative" },
    { points: [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]], corr: "Strong positive" },
    { points: [[1, 5], [2, 3], [3, 8], [4, 2], [5, 7]], corr: "No correlation" },
    { points: [[1, 3], [2, 5], [3, 4], [4, 7], [5, 6]], corr: "Weak positive" },
    { points: [[1, 8], [2, 7], [3, 5], [4, 6], [5, 3]], corr: "Weak negative" },
    { points: [[1, 1], [2, 3], [3, 5], [4, 7], [5, 9]], corr: "Strong positive" },
    { points: [[1, 9], [2, 7], [3, 5], [4, 3], [5, 1]], corr: "Strong negative" },
    { points: [[1, 4], [2, 6], [3, 2], [4, 8], [5, 3]], corr: "No correlation" },
    { points: [[1, 2], [2, 3], [3, 5], [4, 6], [5, 8]], corr: "Strong positive" },
    { points: [[1, 8], [2, 6], [3, 4], [4, 2], [5, 0]], corr: "Strong negative" },
    { points: [[1, 5], [2, 6], [3, 4], [4, 7], [5, 5]], corr: "Weak positive" },
    { points: [[1, 7], [2, 5], [3, 6], [4, 4], [5, 5]], corr: "Weak negative" },
    { points: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]], corr: "Strong positive" },
    { points: [[1, 5], [2, 4], [3, 3], [4, 2], [5, 1]], corr: "Strong negative" },
    { points: [[1, 3], [2, 7], [3, 1], [4, 9], [5, 2]], corr: "No correlation" },
    { points: [[1, 2], [2, 5], [3, 7], [4, 10], [5, 12]], corr: "Strong positive" },
    { points: [[1, 12], [2, 10], [3, 7], [4, 5], [5, 2]], corr: "Strong negative" },
    { points: [[1, 6], [2, 4], [3, 8], [4, 3], [5, 9]], corr: "No correlation" },
    { points: [[1, 3], [2, 4], [3, 6], [4, 5], [5, 7]], corr: "Weak positive" },
    { points: [[1, 7], [2, 6], [3, 4], [4, 5], [5, 3]], corr: "Weak negative" },
    { points: [[1, 0], [2, 2], [3, 4], [4, 6], [5, 8]], corr: "Strong positive" },
    { points: [[1, 8], [2, 6], [3, 4], [4, 2], [5, 0]], corr: "Strong negative" },
    { points: [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5]], corr: "No correlation" },
    { points: [[1, 1], [2, 4], [3, 9], [4, 16], [5, 25]], corr: "Strong positive" },
    { points: [[1, 25], [2, 16], [3, 9], [4, 4], [5, 1]], corr: "Strong negative" },
    { points: [[1, 2], [2, 8], [3, 3], [4, 7], [5, 4]], corr: "No correlation" },
    { points: [[1, 3], [2, 4], [3, 5], [4, 6], [5, 7]], corr: "Strong positive" },
    { points: [[1, 7], [2, 6], [3, 5], [4, 4], [5, 3]], corr: "Strong negative" },
    { points: [[1, 4], [2, 5], [3, 3], [4, 6], [5, 4]], corr: "Weak positive" },
    { points: [[1, 6], [2, 5], [3, 6], [4, 4], [5, 5]], corr: "Weak negative" },
  ];

  corrQuestions.forEach((cq, i) => {
    questions.push({
      id: `filler-8-corr-${i + 1}`,
      question: `What type of correlation does this scatterplot show?`,
      visual: {
        type: "scatterPlot",
        data: {
          points: cq.points.map(p => ({ x: p[0], y: p[1] }))
        },
        xLabel: "x",
        yLabel: "y"
      },
      options: [
        { letter: "A", text: "Strong positive" },
        { letter: "B", text: "Strong negative" },
        { letter: "C", text: "Weak positive" },
        { letter: "D", text: "No correlation" }
      ],
      correctAnswer: cq.corr === "Strong positive" ? "A" : cq.corr === "Strong negative" ? "B" : cq.corr === "Weak positive" ? "C" : "D",
      explanation: `The data shows ${cq.corr.toLowerCase()}.`,
      difficulty: "Hard",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 8
    });
  });

  return questions;
};

// Generate all questions
export const level4FillerQuestions = generateLevel4Questions();
export const level5FillerQuestions = generateLevel5Questions();
export const level6FillerQuestions = generateLevel6Questions();
export const level7FillerQuestions = generateLevel7Questions();
export const level8FillerQuestions = generateLevel8Questions();

// Import level 9 questions
import { allLevel9Questions } from './level9Questions';

// Combined export
export const allFillerQuestions: VisualQuestion[] = [
  ...level4FillerQuestions,
  ...level5FillerQuestions,
  ...level6FillerQuestions,
  ...level7FillerQuestions,
  ...level8FillerQuestions,
  ...allLevel9Questions.map(q => ({
    ...q,
    difficultyRating: 9
  })) as VisualQuestion[]
];
