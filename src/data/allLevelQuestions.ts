// Comprehensive question bank to ensure 300+ questions per difficulty level (1-10)
// Uses deterministic generation to avoid duplicates
import type { Question } from './questions';
import { createSeededRandom, generateUniqueValues, generateUniqueSingleValues } from '@/utils/seededRandom';

interface VisualQuestion extends Question {
  imageUrl?: string;
  visualHtml?: string;
}

// ============ LEVEL 1 QUESTIONS (Very Easy - Basic counting, simple recognition) ============
const generateLevel1Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Counting questions - use unique values 2-9 (8 possible values)
  const countValues = generateUniqueSingleValues(8, 2, 9, 1001);
  for (let i = 0; i < countValues.length; i++) {
    const num = countValues[i];
    questions.push({
      id: `l1-count-${i + 1}`,
      question: `Count the objects: ${'●'.repeat(num)}`,
      options: [
        { letter: "A", text: String(num - 1) },
        { letter: "B", text: String(num) },
        { letter: "C", text: String(num + 1) },
        { letter: "D", text: String(num + 2) }
      ],
      correctAnswer: "B",
      explanation: `There are ${num} objects.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Counting",
      difficultyRating: 1
    });
  }
  
  // Single digit addition - unique pairs (1-5) + (1-4) = 20 possible combinations
  const addValues = generateUniqueValues(20, 1, 5, 1, 4, 1002);
  for (let i = 0; i < addValues.length; i++) {
    const { a, b } = addValues[i];
    const sum = a + b;
    questions.push({
      id: `l1-add-${i + 1}`,
      question: `What is ${a} + ${b}?`,
      options: [
        { letter: "A", text: String(sum - 1) },
        { letter: "B", text: String(sum) },
        { letter: "C", text: String(sum + 1) },
        { letter: "D", text: String(sum + 2) }
      ],
      correctAnswer: "B",
      explanation: `To add ${a} + ${b}, combine the two numbers. Starting at ${a}, count up ${b} more: ${a} + ${b} = ${sum}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Addition",
      difficultyRating: 1
    });
  }
  
  // Number recognition
  for (let i = 1; i <= 50; i++) {
    const num = Math.floor(Math.random() * 20) + 1;
    const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
                   'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
    questions.push({
      id: `l1-recog-${i}`,
      question: `Which number is "${words[num - 1]}"?`,
      options: [
        { letter: "A", text: String(num - 2 > 0 ? num - 2 : num + 3) },
        { letter: "B", text: String(num - 1 > 0 ? num - 1 : num + 2) },
        { letter: "C", text: String(num) },
        { letter: "D", text: String(num + 1) }
      ],
      correctAnswer: "C",
      explanation: `"${words[num - 1]}" is ${num}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Number Recognition",
      difficultyRating: 1
    });
  }
  
  // Even/Odd identification
  for (let i = 1; i <= 50; i++) {
    const num = Math.floor(Math.random() * 20) + 1;
    const isEven = num % 2 === 0;
    questions.push({
      id: `l1-evenodd-${i}`,
      question: `Is ${num} even or odd?`,
      options: [
        { letter: "A", text: "Even" },
        { letter: "B", text: "Odd" },
        { letter: "C", text: "Neither" },
        { letter: "D", text: "Both" }
      ],
      correctAnswer: isEven ? "A" : "B",
      explanation: `${num} is ${isEven ? 'even' : 'odd'} because it ${isEven ? 'can' : 'cannot'} be divided by 2 evenly.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Number Properties",
      difficultyRating: 1
    });
  }
  
  // Comparison
  for (let i = 1; i <= 50; i++) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const answer = a > b ? "A" : a < b ? "B" : "C";
    const symbol = a > b ? '>' : a < b ? '<' : '=';
    const explanation = a === b 
      ? `Both numbers are equal: ${a} = ${b}.`
      : a > b 
        ? `${a} is greater than ${b}, so we use the ">" symbol: ${a} > ${b}.`
        : `${a} is less than ${b}, so we use the "<" symbol: ${a} < ${b}.`;
    questions.push({
      id: `l1-compare-${i}`,
      question: `Compare: ${a} __ ${b}. Which symbol goes in the blank?`,
      options: [
        { letter: "A", text: ">" },
        { letter: "B", text: "<" },
        { letter: "C", text: "=" },
        { letter: "D", text: "≠" }
      ],
      correctAnswer: a === b ? "C" : answer,
      explanation,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Comparison",
      difficultyRating: 1
    });
  }
  
  // Simple subtraction
  for (let i = 1; i <= 50; i++) {
    const a = Math.floor(Math.random() * 8) + 5;
    const b = Math.floor(Math.random() * 4) + 1;
    const diff = a - b;
    questions.push({
      id: `l1-sub-${i}`,
      question: `What is ${a} - ${b}?`,
      options: [
        { letter: "A", text: String(diff - 1) },
        { letter: "B", text: String(diff) },
        { letter: "C", text: String(diff + 1) },
        { letter: "D", text: String(diff + 2) }
      ],
      correctAnswer: "B",
      explanation: `To subtract ${b} from ${a}, start at ${a} and count back ${b}: ${a} - ${b} = ${diff}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Subtraction",
      difficultyRating: 1
    });
  }
  
  return questions;
};

// ============ LEVEL 2 QUESTIONS (Easy - Two-digit operations, basic fractions) ============
const generateLevel2Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Two-digit addition
  for (let i = 1; i <= 50; i++) {
    const a = Math.floor(Math.random() * 30) + 10;
    const b = Math.floor(Math.random() * 20) + 5;
    const sum = a + b;
    questions.push({
      id: `l2-add-${i}`,
      question: `What is ${a} + ${b}?`,
      options: [
        { letter: "A", text: String(sum - 2) },
        { letter: "B", text: String(sum) },
        { letter: "C", text: String(sum + 2) },
        { letter: "D", text: String(sum + 5) }
      ],
      correctAnswer: "B",
      explanation: `Add the two numbers: ${a} + ${b} = ${sum}. You can add the tens (${Math.floor(a/10)*10} + ${Math.floor(b/10)*10}) and ones (${a%10} + ${b%10}) separately to check.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Addition",
      difficultyRating: 2
    });
  }
  
  // Two-digit subtraction
  for (let i = 1; i <= 50; i++) {
    const a = Math.floor(Math.random() * 40) + 30;
    const b = Math.floor(Math.random() * 20) + 5;
    const diff = a - b;
    questions.push({
      id: `l2-sub-${i}`,
      question: `What is ${a} - ${b}?`,
      options: [
        { letter: "A", text: String(diff - 3) },
        { letter: "B", text: String(diff - 1) },
        { letter: "C", text: String(diff) },
        { letter: "D", text: String(diff + 2) }
      ],
      correctAnswer: "C",
      explanation: `Subtract ${b} from ${a}: ${a} - ${b} = ${diff}. You can verify: ${diff} + ${b} = ${a}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Subtraction",
      difficultyRating: 2
    });
  }
  
  // Simple multiplication tables
  for (let i = 1; i <= 50; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 5) + 2;
    const prod = a * b;
    questions.push({
      id: `l2-mult-${i}`,
      question: `What is ${a} × ${b}?`,
      options: [
        { letter: "A", text: String(prod - 2) },
        { letter: "B", text: String(prod) },
        { letter: "C", text: String(prod + 3) },
        { letter: "D", text: String(prod + 5) }
      ],
      correctAnswer: "B",
      explanation: `Multiply ${a} by ${b}: ${a} × ${b} = ${prod}. Multiplication is repeated addition: adding ${a} to itself ${b} times gives ${prod}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Multiplication",
      difficultyRating: 2
    });
  }
  
  // Simple division
  for (let i = 1; i <= 50; i++) {
    const b = Math.floor(Math.random() * 5) + 2;
    const q = Math.floor(Math.random() * 8) + 2;
    const a = b * q;
    questions.push({
      id: `l2-div-${i}`,
      question: `What is ${a} ÷ ${b}?`,
      options: [
        { letter: "A", text: String(q - 1) },
        { letter: "B", text: String(q) },
        { letter: "C", text: String(q + 1) },
        { letter: "D", text: String(q + 2) }
      ],
      correctAnswer: "B",
      explanation: `Divide ${a} by ${b}: ${a} ÷ ${b} = ${q}. Division is the inverse of multiplication: ${b} × ${q} = ${a}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Division",
      difficultyRating: 2
    });
  }
  
  // Basic fractions
  for (let i = 1; i <= 50; i++) {
    const num = Math.floor(Math.random() * 3) + 1;
    const den = Math.floor(Math.random() * 4) + 2;
    const mult = Math.floor(Math.random() * 3) + 2;
    questions.push({
      id: `l2-frac-${i}`,
      question: `Which fraction is equivalent to ${num}/${den}?`,
      options: [
        { letter: "A", text: `${num * mult}/${den * mult}` },
        { letter: "B", text: `${num + 1}/${den}` },
        { letter: "C", text: `${num}/${den + 1}` },
        { letter: "D", text: `${num * 2}/${den}` }
      ],
      correctAnswer: "A",
      explanation: `${num}/${den} = ${num * mult}/${den * mult} (multiply both by ${mult})`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Fractions",
      difficultyRating: 2
    });
  }
  
  // Place value
  for (let i = 1; i <= 50; i++) {
    const num = Math.floor(Math.random() * 900) + 100;
    const tens = Math.floor((num % 100) / 10);
    questions.push({
      id: `l2-place-${i}`,
      question: `What digit is in the tens place of ${num}?`,
      options: [
        { letter: "A", text: String(Math.floor(num / 100)) },
        { letter: "B", text: String(tens) },
        { letter: "C", text: String(num % 10) },
        { letter: "D", text: String((tens + 1) % 10) }
      ],
      correctAnswer: "B",
      explanation: `In ${num}, the tens digit is ${tens}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Place Value",
      difficultyRating: 2
    });
  }
  
  return questions;
};

// ============ LEVEL 3 QUESTIONS (Easy-Medium - Multi-digit operations, basic word problems) ============
const generateLevel3Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Multi-step addition
  for (let i = 1; i <= 40; i++) {
    const a = Math.floor(Math.random() * 50) + 20;
    const b = Math.floor(Math.random() * 30) + 10;
    const c = Math.floor(Math.random() * 20) + 5;
    const sum = a + b + c;
    questions.push({
      id: `l3-add3-${i}`,
      question: `What is ${a} + ${b} + ${c}?`,
      options: [
        { letter: "A", text: String(sum - 5) },
        { letter: "B", text: String(sum - 2) },
        { letter: "C", text: String(sum) },
        { letter: "D", text: String(sum + 3) }
      ],
      correctAnswer: "C",
      explanation: `${a} + ${b} + ${c} = ${sum}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Addition",
      difficultyRating: 3
    });
  }
  
  // Order of operations (simple)
  for (let i = 1; i <= 40; i++) {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 5) + 1;
    const result = a * b + c;
    questions.push({
      id: `l3-order-${i}`,
      question: `What is ${a} × ${b} + ${c}?`,
      options: [
        { letter: "A", text: String(a * (b + c)) },
        { letter: "B", text: String(result) },
        { letter: "C", text: String(result + 2) },
        { letter: "D", text: String(result - 3) }
      ],
      correctAnswer: "B",
      explanation: `Following order of operations: ${a} × ${b} = ${a * b}, then ${a * b} + ${c} = ${result}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Order of Operations",
      difficultyRating: 3
    });
  }
  
  // Word problems - simple
  for (let i = 1; i <= 40; i++) {
    const apples = Math.floor(Math.random() * 10) + 5;
    const oranges = Math.floor(Math.random() * 8) + 3;
    const total = apples + oranges;
    questions.push({
      id: `l3-word-${i}`,
      question: `Sam has ${apples} apples and ${oranges} oranges. How many pieces of fruit does Sam have in total?`,
      options: [
        { letter: "A", text: String(total - 2) },
        { letter: "B", text: String(total) },
        { letter: "C", text: String(total + 2) },
        { letter: "D", text: String(apples) }
      ],
      correctAnswer: "B",
      explanation: `${apples} apples + ${oranges} oranges = ${total} pieces of fruit`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Word Problems",
      difficultyRating: 3
    });
  }
  
  // Simple decimals
  for (let i = 1; i <= 40; i++) {
    const a = (Math.floor(Math.random() * 50) + 10) / 10;
    const b = (Math.floor(Math.random() * 30) + 5) / 10;
    const sum = Math.round((a + b) * 10) / 10;
    questions.push({
      id: `l3-dec-${i}`,
      question: `What is ${a.toFixed(1)} + ${b.toFixed(1)}?`,
      options: [
        { letter: "A", text: (sum - 0.2).toFixed(1) },
        { letter: "B", text: sum.toFixed(1) },
        { letter: "C", text: (sum + 0.3).toFixed(1) },
        { letter: "D", text: (sum + 0.5).toFixed(1) }
      ],
      correctAnswer: "B",
      explanation: `${a.toFixed(1)} + ${b.toFixed(1)} = ${sum.toFixed(1)}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Decimals",
      difficultyRating: 3
    });
  }
  
  // Perimeter of rectangles
  for (let i = 1; i <= 40; i++) {
    const l = Math.floor(Math.random() * 10) + 3;
    const w = Math.floor(Math.random() * 8) + 2;
    const p = 2 * (l + w);
    questions.push({
      id: `l3-perim-${i}`,
      question: `A rectangle has length ${l} and width ${w}. What is its perimeter?`,
      options: [
        { letter: "A", text: String(l * w) },
        { letter: "B", text: String(l + w) },
        { letter: "C", text: String(p) },
        { letter: "D", text: String(p + 4) }
      ],
      correctAnswer: "C",
      explanation: `Perimeter = 2(${l} + ${w}) = 2(${l + w}) = ${p}`,
      difficulty: "Easy",
      domain: "Geometry",
      skill: "Perimeter",
      difficultyRating: 3
    });
  }
  
  // Rounding
  for (let i = 1; i <= 40; i++) {
    const num = Math.floor(Math.random() * 900) + 100;
    const rounded = Math.round(num / 10) * 10;
    questions.push({
      id: `l3-round-${i}`,
      question: `Round ${num} to the nearest ten.`,
      options: [
        { letter: "A", text: String(rounded - 10) },
        { letter: "B", text: String(rounded) },
        { letter: "C", text: String(rounded + 10) },
        { letter: "D", text: String(Math.round(num / 100) * 100) }
      ],
      correctAnswer: "B",
      explanation: `${num} rounded to the nearest ten is ${rounded}.`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Rounding",
      difficultyRating: 3
    });
  }
  
  // Simple patterns
  for (let i = 1; i <= 60; i++) {
    const start = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 4) + 2;
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const next = start + 4 * step;
    questions.push({
      id: `l3-pattern-${i}`,
      question: `What is the next number in the pattern: ${seq.join(', ')}, ?`,
      options: [
        { letter: "A", text: String(next - step) },
        { letter: "B", text: String(next) },
        { letter: "C", text: String(next + step) },
        { letter: "D", text: String(next + 2) }
      ],
      correctAnswer: "B",
      explanation: `The pattern adds ${step} each time. Next: ${seq[3]} + ${step} = ${next}`,
      difficulty: "Easy",
      domain: "Algebra",
      skill: "Patterns",
      difficultyRating: 3
    });
  }
  
  return questions;
};

// ============ LEVEL 4 ADDITIONAL QUESTIONS ============
const generateLevel4Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Percentage basics
  for (let i = 1; i <= 30; i++) {
    const whole = (Math.floor(Math.random() * 10) + 1) * 10;
    const pct = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
    const result = whole * pct / 100;
    questions.push({
      id: `l4-pct-${i}`,
      question: `What is ${pct}% of ${whole}?`,
      options: [
        { letter: "A", text: String(result - 5) },
        { letter: "B", text: String(result) },
        { letter: "C", text: String(result + 5) },
        { letter: "D", text: String(whole) }
      ],
      correctAnswer: "B",
      explanation: `${pct}% of ${whole} = ${whole} × ${pct}/100 = ${result}`,
      difficulty: "Easy",
      domain: "Arithmetic",
      skill: "Percentages",
      difficultyRating: 4
    });
  }
  
  // Simple equations x + a = b
  for (let i = 1; i <= 30; i++) {
    const x = Math.floor(Math.random() * 15) + 1;
    const a = Math.floor(Math.random() * 10) + 2;
    const b = x + a;
    questions.push({
      id: `l4-eq-${i}`,
      question: `Solve for x: x + ${a} = ${b}`,
      options: [
        { letter: "A", text: String(x - 2) },
        { letter: "B", text: String(x) },
        { letter: "C", text: String(x + 2) },
        { letter: "D", text: String(b) }
      ],
      correctAnswer: "B",
      explanation: `x + ${a} = ${b}, so x = ${b} - ${a} = ${x}`,
      difficulty: "Easy",
      domain: "Algebra",
      skill: "Linear Equations",
      difficultyRating: 4
    });
  }
  
  // Area of rectangle
  for (let i = 1; i <= 25; i++) {
    const l = Math.floor(Math.random() * 12) + 3;
    const w = Math.floor(Math.random() * 8) + 2;
    const area = l * w;
    questions.push({
      id: `l4-area-${i}`,
      question: `Find the area of a rectangle with length ${l} and width ${w}.`,
      options: [
        { letter: "A", text: String(area) },
        { letter: "B", text: String(2 * (l + w)) },
        { letter: "C", text: String(area + 5) },
        { letter: "D", text: String(l + w) }
      ],
      correctAnswer: "A",
      explanation: `Area = length × width = ${l} × ${w} = ${area}`,
      difficulty: "Easy",
      domain: "Geometry",
      skill: "Area",
      difficultyRating: 4
    });
  }
  
  // Mean/average
  for (let i = 1; i <= 15; i++) {
    const nums = [
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 10) + 5
    ];
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / 4;
    questions.push({
      id: `l4-mean-${i}`,
      question: `Find the mean of: ${nums.join(', ')}`,
      options: [
        { letter: "A", text: String(mean - 1) },
        { letter: "B", text: String(mean) },
        { letter: "C", text: String(mean + 1) },
        { letter: "D", text: String(sum) }
      ],
      correctAnswer: "B",
      explanation: `Mean = (${nums.join(' + ')}) ÷ 4 = ${sum} ÷ 4 = ${mean}`,
      difficulty: "Easy",
      domain: "Statistics",
      skill: "Mean",
      difficultyRating: 4
    });
  }
  
  return questions;
};

// ============ LEVEL 5 ADDITIONAL QUESTIONS ============
const generateLevel5Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Two-step equations
  for (let i = 1; i <= 30; i++) {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 10) + 1;
    const result = a * x + b;
    questions.push({
      id: `l5-2step-${i}`,
      question: `Solve for x: ${a}x + ${b} = ${result}`,
      options: [
        { letter: "A", text: String(x - 1) },
        { letter: "B", text: String(x) },
        { letter: "C", text: String(x + 1) },
        { letter: "D", text: String(x + 2) }
      ],
      correctAnswer: "B",
      explanation: `${a}x + ${b} = ${result} → ${a}x = ${result - b} → x = ${x}`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Linear Equations",
      difficultyRating: 5
    });
  }
  
  // Ratio problems
  for (let i = 1; i <= 25; i++) {
    const r1 = Math.floor(Math.random() * 4) + 1;
    const r2 = Math.floor(Math.random() * 4) + 2;
    const mult = Math.floor(Math.random() * 5) + 2;
    const total = (r1 + r2) * mult;
    const part1 = r1 * mult;
    questions.push({
      id: `l5-ratio-${i}`,
      question: `If two numbers are in the ratio ${r1}:${r2} and their sum is ${total}, what is the smaller number?`,
      options: [
        { letter: "A", text: String(part1) },
        { letter: "B", text: String(r2 * mult) },
        { letter: "C", text: String(part1 + 2) },
        { letter: "D", text: String(total / 2) }
      ],
      correctAnswer: "A",
      explanation: `Total parts = ${r1} + ${r2} = ${r1 + r2}. Each part = ${total} ÷ ${r1 + r2} = ${mult}. Smaller = ${r1} × ${mult} = ${part1}`,
      difficulty: "Medium",
      domain: "Arithmetic",
      skill: "Ratios",
      difficultyRating: 5
    });
  }
  
  // Coordinate points
  for (let i = 1; i <= 25; i++) {
    const x1 = Math.floor(Math.random() * 10) - 5;
    const y1 = Math.floor(Math.random() * 10) - 5;
    const x2 = Math.floor(Math.random() * 10) - 5;
    const y2 = Math.floor(Math.random() * 10) - 5;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    questions.push({
      id: `l5-mid-${i}`,
      question: `What is the midpoint of (${x1}, ${y1}) and (${x2}, ${y2})?`,
      options: [
        { letter: "A", text: `(${midX}, ${midY})` },
        { letter: "B", text: `(${x1 + x2}, ${y1 + y2})` },
        { letter: "C", text: `(${midX + 1}, ${midY})` },
        { letter: "D", text: `(${midY}, ${midX})` }
      ],
      correctAnswer: "A",
      explanation: `Midpoint = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${midX}, ${midY})`,
      difficulty: "Medium",
      domain: "Geometry",
      skill: "Coordinate Geometry",
      difficultyRating: 5
    });
  }
  
  // Median
  for (let i = 1; i <= 20; i++) {
    const nums = [
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1
    ].sort((a, b) => a - b);
    const median = nums[2];
    questions.push({
      id: `l5-median-${i}`,
      question: `Find the median of: ${nums.join(', ')}`,
      options: [
        { letter: "A", text: String(nums[1]) },
        { letter: "B", text: String(median) },
        { letter: "C", text: String(nums[3]) },
        { letter: "D", text: String(nums[0]) }
      ],
      correctAnswer: "B",
      explanation: `The median is the middle value: ${median}`,
      difficulty: "Medium",
      domain: "Statistics",
      skill: "Median",
      difficultyRating: 5
    });
  }
  
  return questions;
};

// ============ LEVEL 6 ADDITIONAL QUESTIONS ============
const generateLevel6Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Systems of equations (simple)
  for (let i = 1; i <= 30; i++) {
    const x = Math.floor(Math.random() * 6) + 1;
    const y = Math.floor(Math.random() * 6) + 1;
    questions.push({
      id: `l6-sys-${i}`,
      question: `Solve: x + y = ${x + y} and x - y = ${x - y}. What is x?`,
      options: [
        { letter: "A", text: String(x - 1) },
        { letter: "B", text: String(x) },
        { letter: "C", text: String(y) },
        { letter: "D", text: String(x + 1) }
      ],
      correctAnswer: "B",
      explanation: `Adding equations: 2x = ${2 * x}, so x = ${x}`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Systems of Equations",
      difficultyRating: 6
    });
  }
  
  // Factoring simple quadratics
  for (let i = 1; i <= 25; i++) {
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.floor(Math.random() * 6) + 1;
    const b = r1 + r2;
    const c = r1 * r2;
    questions.push({
      id: `l6-factor-${i}`,
      question: `Factor: x² + ${b}x + ${c}`,
      options: [
        { letter: "A", text: `(x + ${r1})(x + ${r2})` },
        { letter: "B", text: `(x - ${r1})(x - ${r2})` },
        { letter: "C", text: `(x + ${r1})(x - ${r2})` },
        { letter: "D", text: `(x + ${b})(x + ${c})` }
      ],
      correctAnswer: "A",
      explanation: `Find two numbers that multiply to ${c} and add to ${b}: ${r1} and ${r2}`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Factoring",
      difficultyRating: 6
    });
  }
  
  // Inequalities
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 20) + 5;
    const solution = Math.ceil(b / a);
    questions.push({
      id: `l6-ineq-${i}`,
      question: `Solve: ${a}x > ${b}. What is the smallest integer x?`,
      options: [
        { letter: "A", text: String(solution - 1) },
        { letter: "B", text: String(solution) },
        { letter: "C", text: String(solution + 1) },
        { letter: "D", text: String(Math.floor(b / a)) }
      ],
      correctAnswer: "B",
      explanation: `${a}x > ${b} → x > ${b}/${a} = ${(b / a).toFixed(2)}. Smallest integer: ${solution}`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Inequalities",
      difficultyRating: 6
    });
  }
  
  // Triangle angles
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 40) + 30;
    const b = Math.floor(Math.random() * 40) + 30;
    const c = 180 - a - b;
    questions.push({
      id: `l6-tri-${i}`,
      question: `A triangle has angles of ${a}° and ${b}°. What is the third angle?`,
      options: [
        { letter: "A", text: `${c - 5}°` },
        { letter: "B", text: `${c}°` },
        { letter: "C", text: `${c + 5}°` },
        { letter: "D", text: `${180 - a}°` }
      ],
      correctAnswer: "B",
      explanation: `Sum of angles = 180°. Third angle = 180° - ${a}° - ${b}° = ${c}°`,
      difficulty: "Medium",
      domain: "Geometry",
      skill: "Triangles",
      difficultyRating: 6
    });
  }
  
  return questions;
};

// ============ LEVEL 7 ADDITIONAL QUESTIONS ============
const generateLevel7Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Quadratic formula applications
  for (let i = 1; i <= 25; i++) {
    const r1 = Math.floor(Math.random() * 5) + 1;
    const r2 = Math.floor(Math.random() * 5) + 1;
    const sum = r1 + r2;
    const prod = r1 * r2;
    questions.push({
      id: `l7-quad-${i}`,
      question: `What are the solutions to x² - ${sum}x + ${prod} = 0?`,
      options: [
        { letter: "A", text: `x = ${r1} or x = ${r2}` },
        { letter: "B", text: `x = -${r1} or x = -${r2}` },
        { letter: "C", text: `x = ${r1 + 1} or x = ${r2 + 1}` },
        { letter: "D", text: `x = ${sum} or x = ${prod}` }
      ],
      correctAnswer: "A",
      explanation: `x² - ${sum}x + ${prod} = (x - ${r1})(x - ${r2}) = 0. Solutions: x = ${r1} or x = ${r2}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Quadratics",
      difficultyRating: 7
    });
  }
  
  // Exponent rules
  for (let i = 1; i <= 25; i++) {
    const base = Math.floor(Math.random() * 4) + 2;
    const exp1 = Math.floor(Math.random() * 4) + 2;
    const exp2 = Math.floor(Math.random() * 3) + 1;
    const result = exp1 + exp2;
    questions.push({
      id: `l7-exp-${i}`,
      question: `Simplify: ${base}^${exp1} × ${base}^${exp2}`,
      options: [
        { letter: "A", text: `${base}^${exp1 * exp2}` },
        { letter: "B", text: `${base}^${result}` },
        { letter: "C", text: `${base * 2}^${result}` },
        { letter: "D", text: `${base}^${result + 1}` }
      ],
      correctAnswer: "B",
      explanation: `When multiplying same bases, add exponents: ${base}^${exp1} × ${base}^${exp2} = ${base}^${result}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Exponents",
      difficultyRating: 7
    });
  }
  
  // Function evaluation
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 10) - 5;
    const x = Math.floor(Math.random() * 5) + 1;
    const result = a * x * x + b;
    questions.push({
      id: `l7-func-${i}`,
      question: `If f(x) = ${a}x² + ${b}, what is f(${x})?`,
      options: [
        { letter: "A", text: String(result - 2) },
        { letter: "B", text: String(result) },
        { letter: "C", text: String(result + 2) },
        { letter: "D", text: String(a * x + b) }
      ],
      correctAnswer: "B",
      explanation: `f(${x}) = ${a}(${x})² + ${b} = ${a}(${x * x}) + ${b} = ${result}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Functions",
      difficultyRating: 7
    });
  }
  
  // Pythagorean theorem
  for (let i = 1; i <= 25; i++) {
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10]];
    const triple = triples[Math.floor(Math.random() * triples.length)];
    const mult = Math.floor(Math.random() * 3) + 1;
    const [a, b, c] = triple.map(x => x * mult);
    questions.push({
      id: `l7-pyth-${i}`,
      question: `A right triangle has legs of length ${a} and ${b}. What is the hypotenuse?`,
      options: [
        { letter: "A", text: String(c - 1) },
        { letter: "B", text: String(c) },
        { letter: "C", text: String(c + 1) },
        { letter: "D", text: String(a + b) }
      ],
      correctAnswer: "B",
      explanation: `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, so c = ${c}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Right Triangles",
      difficultyRating: 7
    });
  }
  
  return questions;
};

// ============ LEVEL 8 ADDITIONAL QUESTIONS ============
const generateLevel8Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Complex factoring
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 3) + 2;
    const r = Math.floor(Math.random() * 5) + 1;
    const coef = a;
    const const_term = -a * r * r;
    questions.push({
      id: `l8-diff-${i}`,
      question: `Factor completely: ${coef}x² ${const_term >= 0 ? '+' : '-'} ${Math.abs(const_term)}`,
      options: [
        { letter: "A", text: `${a}(x + ${r})(x - ${r})` },
        { letter: "B", text: `${a}(x - ${r})²` },
        { letter: "C", text: `${a}(x + ${r})²` },
        { letter: "D", text: `(${a}x + ${r})(x - ${r})` }
      ],
      correctAnswer: "A",
      explanation: `${coef}x² - ${Math.abs(const_term)} = ${a}(x² - ${r * r}) = ${a}(x + ${r})(x - ${r})`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Factoring",
      difficultyRating: 8
    });
  }
  
  // Logarithms basics
  for (let i = 1; i <= 20; i++) {
    const base = [2, 3, 5, 10][Math.floor(Math.random() * 4)];
    const exp = Math.floor(Math.random() * 4) + 1;
    const result = Math.pow(base, exp);
    questions.push({
      id: `l8-log-${i}`,
      question: `What is log₍${base}₎(${result})?`,
      options: [
        { letter: "A", text: String(exp - 1) },
        { letter: "B", text: String(exp) },
        { letter: "C", text: String(exp + 1) },
        { letter: "D", text: String(base) }
      ],
      correctAnswer: "B",
      explanation: `log₍${base}₎(${result}) = ${exp} because ${base}^${exp} = ${result}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Logarithms",
      difficultyRating: 8
    });
  }
  
  // Circle equations
  for (let i = 1; i <= 20; i++) {
    const h = Math.floor(Math.random() * 10) - 5;
    const k = Math.floor(Math.random() * 10) - 5;
    const r = Math.floor(Math.random() * 5) + 2;
    const r2 = r * r;
    questions.push({
      id: `l8-circle-${i}`,
      question: `What is the radius of the circle (x ${h >= 0 ? '-' : '+'} ${Math.abs(h)})² + (y ${k >= 0 ? '-' : '+'} ${Math.abs(k)})² = ${r2}?`,
      options: [
        { letter: "A", text: String(r - 1) },
        { letter: "B", text: String(r) },
        { letter: "C", text: String(r2) },
        { letter: "D", text: String(r + 1) }
      ],
      correctAnswer: "B",
      explanation: `The equation is in form (x - h)² + (y - k)² = r². Here r² = ${r2}, so r = ${r}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Circles",
      difficultyRating: 8
    });
  }
  
  // Rational expressions
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    questions.push({
      id: `l8-rat-${i}`,
      question: `Simplify: (x² - ${a * a}) / (x - ${a})`,
      options: [
        { letter: "A", text: `x + ${a}` },
        { letter: "B", text: `x - ${a}` },
        { letter: "C", text: `x² + ${a}` },
        { letter: "D", text: `${a}` }
      ],
      correctAnswer: "A",
      explanation: `(x² - ${a * a}) / (x - ${a}) = (x + ${a})(x - ${a}) / (x - ${a}) = x + ${a}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Rational Expressions",
      difficultyRating: 8
    });
  }
  
  // Compound interest
  for (let i = 1; i <= 20; i++) {
    const P = (Math.floor(Math.random() * 10) + 1) * 100;
    const r = [5, 6, 8, 10][Math.floor(Math.random() * 4)];
    const t = Math.floor(Math.random() * 3) + 1;
    const A = Math.round(P * Math.pow(1 + r / 100, t));
    questions.push({
      id: `l8-int-${i}`,
      question: `$${P} is invested at ${r}% annual interest compounded yearly. What is the value after ${t} year${t > 1 ? 's' : ''}?`,
      options: [
        { letter: "A", text: `$${A - 10}` },
        { letter: "B", text: `$${A}` },
        { letter: "C", text: `$${P + P * r * t / 100}` },
        { letter: "D", text: `$${A + 15}` }
      ],
      correctAnswer: "B",
      explanation: `A = P(1 + r)^t = ${P}(1.${r.toString().padStart(2, '0')})^${t} = $${A}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Exponential Growth",
      difficultyRating: 8
    });
  }
  
  return questions;
};

// ============ LEVEL 9 ADDITIONAL QUESTIONS ============
const generateLevel9Extra = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Complex systems
  for (let i = 1; i <= 15; i++) {
    const x = Math.floor(Math.random() * 5) + 1;
    const y = Math.floor(Math.random() * 5) + 1;
    const a1 = Math.floor(Math.random() * 3) + 2;
    const b1 = Math.floor(Math.random() * 3) + 1;
    const a2 = Math.floor(Math.random() * 3) + 1;
    const b2 = Math.floor(Math.random() * 3) + 2;
    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;
    questions.push({
      id: `l9-sys-${i}`,
      question: `Solve the system: ${a1}x + ${b1}y = ${c1} and ${a2}x + ${b2}y = ${c2}. Find x + y.`,
      options: [
        { letter: "A", text: String(x + y - 1) },
        { letter: "B", text: String(x + y) },
        { letter: "C", text: String(x + y + 1) },
        { letter: "D", text: String(x * y) }
      ],
      correctAnswer: "B",
      explanation: `Solving the system gives x = ${x}, y = ${y}. So x + y = ${x + y}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Systems of Equations",
      difficultyRating: 9
    });
  }
  
  // Trigonometry
  for (let i = 1; i <= 15; i++) {
    const angles = [30, 45, 60];
    const angle = angles[Math.floor(Math.random() * 3)];
    const sinVals: { [key: number]: string } = { 30: '1/2', 45: '√2/2', 60: '√3/2' };
    const cosVals: { [key: number]: string } = { 30: '√3/2', 45: '√2/2', 60: '1/2' };
    questions.push({
      id: `l9-trig-${i}`,
      question: `What is sin(${angle}°)?`,
      options: [
        { letter: "A", text: sinVals[angle] },
        { letter: "B", text: cosVals[angle] },
        { letter: "C", text: '1' },
        { letter: "D", text: '0' }
      ],
      correctAnswer: "A",
      explanation: `sin(${angle}°) = ${sinVals[angle]}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Trigonometry",
      difficultyRating: 9
    });
  }
  
  // Polynomial division
  for (let i = 1; i <= 15; i++) {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = a * b;
    questions.push({
      id: `l9-poly-${i}`,
      question: `If x² - ${c} is divided by (x - ${a}), what is the remainder?`,
      options: [
        { letter: "A", text: String(a * a - c) },
        { letter: "B", text: '0' },
        { letter: "C", text: String(a) },
        { letter: "D", text: String(c) }
      ],
      correctAnswer: "A",
      explanation: `By Remainder Theorem, substitute x = ${a}: ${a}² - ${c} = ${a * a - c}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Polynomials",
      difficultyRating: 9
    });
  }
  
  // Probability
  for (let i = 1; i <= 15; i++) {
    const red = Math.floor(Math.random() * 5) + 2;
    const blue = Math.floor(Math.random() * 5) + 2;
    const total = red + blue;
    questions.push({
      id: `l9-prob-${i}`,
      question: `A bag has ${red} red and ${blue} blue marbles. What's the probability of drawing a red marble?`,
      options: [
        { letter: "A", text: `${red}/${total}` },
        { letter: "B", text: `${blue}/${total}` },
        { letter: "C", text: `${red}/${blue}` },
        { letter: "D", text: '1/2' }
      ],
      correctAnswer: "A",
      explanation: `P(red) = red marbles / total = ${red}/${total}`,
      difficulty: "Hard",
      domain: "Statistics",
      skill: "Probability",
      difficultyRating: 9
    });
  }
  
  // Sequences - using LaTeX-friendly notation
  for (let i = 1; i <= 15; i++) {
    const a1 = Math.floor(Math.random() * 5) + 1;
    const r = Math.floor(Math.random() * 3) + 2;
    const n = Math.floor(Math.random() * 3) + 4;
    const an = a1 * Math.pow(r, n - 1);
    questions.push({
      id: `l9-seq-${i}`,
      question: `In a geometric sequence, $a_1 = ${a1}$ and the common ratio $r = ${r}$. What is $a_{${n}}$?`,
      options: [
        { letter: "A", text: String(an / r) },
        { letter: "B", text: String(an) },
        { letter: "C", text: String(an * r) },
        { letter: "D", text: String(a1 + (n - 1) * r) }
      ],
      correctAnswer: "B",
      explanation: `For a geometric sequence, the nth term formula is $a_n = a_1 \\times r^{n-1}$. Substituting: $a_{${n}} = ${a1} \\times ${r}^{${n - 1}} = ${a1} \\times ${Math.pow(r, n - 1)} = ${an}$.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Sequences",
      difficultyRating: 9
    });
  }
  
  return questions;
};

// ============ LEVEL 10 QUESTIONS (Expert - Competition math level) ============
const generateLevel10Questions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  // Complex number operations
  for (let i = 1; i <= 30; i++) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const d = Math.floor(Math.random() * 5) + 1;
    const realPart = a * c - b * d;
    const imagPart = a * d + b * c;
    questions.push({
      id: `l10-complex-${i}`,
      question: `Multiply: (${a} + ${b}i)(${c} + ${d}i)`,
      options: [
        { letter: "A", text: `${realPart} + ${imagPart}i` },
        { letter: "B", text: `${a * c} + ${b * d}i` },
        { letter: "C", text: `${realPart} - ${imagPart}i` },
        { letter: "D", text: `${realPart + 2} + ${imagPart}i` }
      ],
      correctAnswer: "A",
      explanation: `(${a} + ${b}i)(${c} + ${d}i) = ${a * c} + ${a * d}i + ${b * c}i + ${b * d}i² = ${a * c} + ${a * d + b * c}i - ${b * d} = ${realPart} + ${imagPart}i`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Complex Numbers",
      difficultyRating: 10
    });
  }
  
  // Advanced trig identities
  for (let i = 1; i <= 25; i++) {
    const angle = [30, 45, 60][Math.floor(Math.random() * 3)];
    const double = angle * 2;
    const sin2x: { [key: number]: string } = { 60: '√3/2', 90: '1', 120: '√3/2' };
    questions.push({
      id: `l10-trig2-${i}`,
      question: `What is sin(2 × ${angle}°) = sin(${double}°)?`,
      options: [
        { letter: "A", text: sin2x[double] },
        { letter: "B", text: '1/2' },
        { letter: "C", text: '√2/2' },
        { letter: "D", text: '0' }
      ],
      correctAnswer: "A",
      explanation: `sin(${double}°) = ${sin2x[double]}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Trigonometry",
      difficultyRating: 10
    });
  }
  
  // Combinatorics
  for (let i = 1; i <= 25; i++) {
    const n = Math.floor(Math.random() * 4) + 4;
    const r = Math.floor(Math.random() * 3) + 2;
    const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
    const comb = factorial(n) / (factorial(r) * factorial(n - r));
    questions.push({
      id: `l10-comb-${i}`,
      question: `How many ways can you choose ${r} items from ${n} items? (C(${n},${r}))`,
      options: [
        { letter: "A", text: String(comb - 5 > 0 ? comb - 5 : comb + 10) },
        { letter: "B", text: String(comb) },
        { letter: "C", text: String(comb + 5) },
        { letter: "D", text: String(n * r) }
      ],
      correctAnswer: "B",
      explanation: `C(${n},${r}) = ${n}! / (${r}! × ${n - r}!) = ${comb}`,
      difficulty: "Hard",
      domain: "Statistics",
      skill: "Combinatorics",
      difficultyRating: 10
    });
  }
  
  // Modular arithmetic
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 50) + 20;
    const m = [3, 5, 7, 11][Math.floor(Math.random() * 4)];
    const result = a % m;
    questions.push({
      id: `l10-mod-${i}`,
      question: `What is ${a} mod ${m}?`,
      options: [
        { letter: "A", text: String(result) },
        { letter: "B", text: String((result + 1) % m) },
        { letter: "C", text: String((result + 2) % m) },
        { letter: "D", text: String(m - 1) }
      ],
      correctAnswer: "A",
      explanation: `${a} = ${Math.floor(a / m)} × ${m} + ${result}, so ${a} mod ${m} = ${result}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Number Theory",
      difficultyRating: 10
    });
  }
  
  // Infinite series
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 8) + 2;
    const r = [0.5, 0.25, 0.2][Math.floor(Math.random() * 3)];
    const sum = a / (1 - r);
    questions.push({
      id: `l10-series-${i}`,
      question: `Find the sum of infinite geometric series: ${a} + ${a * r} + ${a * r * r} + ...`,
      options: [
        { letter: "A", text: String(sum - 2) },
        { letter: "B", text: String(sum) },
        { letter: "C", text: String(sum + 2) },
        { letter: "D", text: 'Diverges' }
      ],
      correctAnswer: "B",
      explanation: `S = a/(1-r) = ${a}/(1-${r}) = ${a}/${1 - r} = ${sum}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Series",
      difficultyRating: 10
    });
  }
  
  // Conic sections - Use exact radical forms for SAT standard
  for (let i = 1; i <= 25; i++) {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 4) + 1;
    const cSquared = a * a - b * b;
    // Check if c² is a perfect square
    const cExact = Math.sqrt(cSquared);
    const isPerfectSquare = Number.isInteger(cExact);
    const cDisplay = isPerfectSquare ? String(cExact) : `√${cSquared}`;
    questions.push({
      id: `l10-conic-${i}`,
      question: `For ellipse x²/${a * a} + y²/${b * b} = 1, what is the distance from center to focus?`,
      options: [
        { letter: "A", text: cDisplay },
        { letter: "B", text: String(a) },
        { letter: "C", text: String(b) },
        { letter: "D", text: String(a + b) }
      ],
      correctAnswer: "A",
      explanation: `c = √(a² - b²) = √(${a * a} - ${b * b}) = ${cDisplay}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Conic Sections",
      difficultyRating: 10
    });
  }
  
  // Vectors
  for (let i = 1; i <= 25; i++) {
    const x1 = Math.floor(Math.random() * 6) - 3;
    const y1 = Math.floor(Math.random() * 6) - 3;
    const x2 = Math.floor(Math.random() * 6) - 3;
    const y2 = Math.floor(Math.random() * 6) - 3;
    const dot = x1 * x2 + y1 * y2;
    questions.push({
      id: `l10-vec-${i}`,
      question: `Find the dot product of <${x1}, ${y1}> and <${x2}, ${y2}>`,
      options: [
        { letter: "A", text: String(dot - 2) },
        { letter: "B", text: String(dot) },
        { letter: "C", text: String(dot + 2) },
        { letter: "D", text: `<${x1 * x2}, ${y1 * y2}>` }
      ],
      correctAnswer: "B",
      explanation: `Dot product = (${x1})(${x2}) + (${y1})(${y2}) = ${x1 * x2} + ${y1 * y2} = ${dot}`,
      difficulty: "Hard",
      domain: "Geometry",
      skill: "Vectors",
      difficultyRating: 10
    });
  }
  
  // Matrices - expanded
  for (let i = 1; i <= 30; i++) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const d = Math.floor(Math.random() * 5) + 1;
    const det = a * d - b * c;
    questions.push({
      id: `l10-mat-${i}`,
      question: `Find the determinant of matrix [[${a}, ${b}], [${c}, ${d}]]`,
      options: [
        { letter: "A", text: String(det - 2) },
        { letter: "B", text: String(det) },
        { letter: "C", text: String(a * d + b * c) },
        { letter: "D", text: String(det + 3) }
      ],
      correctAnswer: "B",
      explanation: `det = ad - bc = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Matrices",
      difficultyRating: 10
    });
  }
  
  // Logarithms - Advanced
  for (let i = 1; i <= 25; i++) {
    const base = [2, 3, 5, 10][Math.floor(Math.random() * 4)];
    const exp = Math.floor(Math.random() * 4) + 2;
    const value = Math.pow(base, exp);
    questions.push({
      id: `l10-log-${i}`,
      question: `What is log base ${base} of ${value}?`,
      options: [
        { letter: "A", text: String(exp) },
        { letter: "B", text: String(exp - 1) },
        { letter: "C", text: String(exp + 1) },
        { letter: "D", text: String(base) }
      ],
      correctAnswer: "A",
      explanation: `log_${base}(${value}) = ${exp} because ${base}^${exp} = ${value}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Logarithms",
      difficultyRating: 10
    });
  }
  
  // Polynomial Long Division
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 4) + 1;
    // (x + a) * (x + b) = x² + (a+b)x + ab
    const coeff1 = a + b;
    const coeff2 = a * b;
    questions.push({
      id: `l10-polydiv-${i}`,
      question: `When x² + ${coeff1}x + ${coeff2} is divided by (x + ${a}), what is the quotient?`,
      options: [
        { letter: "A", text: `x + ${b}` },
        { letter: "B", text: `x + ${a}` },
        { letter: "C", text: `x + ${b + 1}` },
        { letter: "D", text: `x - ${b}` }
      ],
      correctAnswer: "A",
      explanation: `x² + ${coeff1}x + ${coeff2} = (x + ${a})(x + ${b}), so dividing by (x + ${a}) gives (x + ${b})`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Polynomial Division",
      difficultyRating: 10
    });
  }
  
  // Parametric Equations
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    const t = Math.floor(Math.random() * 3) + 1;
    const x = a * t;
    const y = b * t * t;
    questions.push({
      id: `l10-param-${i}`,
      question: `For parametric equations x = ${a}t and y = ${b}t², what is y when t = ${t}?`,
      options: [
        { letter: "A", text: String(y) },
        { letter: "B", text: String(x) },
        { letter: "C", text: String(b * t) },
        { letter: "D", text: String(y + a) }
      ],
      correctAnswer: "A",
      explanation: `When t = ${t}: y = ${b}(${t})² = ${b} × ${t * t} = ${y}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Parametric Equations",
      difficultyRating: 10
    });
  }
  
  // Arithmetic Sequences - Advanced
  for (let i = 1; i <= 20; i++) {
    const a1 = Math.floor(Math.random() * 10) + 1;
    const d = Math.floor(Math.random() * 5) + 2;
    const n = Math.floor(Math.random() * 8) + 10;
    const an = a1 + (n - 1) * d;
    questions.push({
      id: `l10-arith-seq-${i}`,
      question: `In an arithmetic sequence with first term $a_1 = ${a1}$ and common difference $d = ${d}$, what is $a_{${n}}$?`,
      options: [
        { letter: "A", text: String(an) },
        { letter: "B", text: String(an - d) },
        { letter: "C", text: String(an + d) },
        { letter: "D", text: String(a1 * n) }
      ],
      correctAnswer: "A",
      explanation: `$a_n = a_1 + (n-1)d = ${a1} + (${n}-1)(${d}) = ${a1} + ${(n - 1) * d} = ${an}$`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Sequences",
      difficultyRating: 10
    });
  }
  
  // Geometric Sequences - Advanced
  for (let i = 1; i <= 20; i++) {
    const a1 = Math.floor(Math.random() * 4) + 2;
    const r = Math.floor(Math.random() * 2) + 2;
    const n = Math.floor(Math.random() * 3) + 3;
    const an = a1 * Math.pow(r, n - 1);
    questions.push({
      id: `l10-geom-seq-${i}`,
      question: `In a geometric sequence with first term $a_1 = ${a1}$ and common ratio $r = ${r}$, what is $a_{${n}}$?`,
      options: [
        { letter: "A", text: String(an) },
        { letter: "B", text: String(a1 * r * n) },
        { letter: "C", text: String(an / r) },
        { letter: "D", text: String(an + r) }
      ],
      correctAnswer: "A",
      explanation: `$a_n = a_1 \\times r^{n-1} = ${a1} \\times ${r}^{${n - 1}} = ${a1} \\times ${Math.pow(r, n - 1)} = ${an}$`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Sequences",
      difficultyRating: 10
    });
  }
  
  // Advanced Probability
  for (let i = 1; i <= 20; i++) {
    const n = Math.floor(Math.random() * 4) + 3;
    const k = Math.floor(Math.random() * n) + 1;
    const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
    const ways = factorial(n) / (factorial(k) * factorial(n - k));
    const total = Math.pow(2, n);
    questions.push({
      id: `l10-prob-adv-${i}`,
      question: `When flipping ${n} fair coins, how many ways can exactly ${k} come up heads?`,
      options: [
        { letter: "A", text: String(ways) },
        { letter: "B", text: String(ways + 1) },
        { letter: "C", text: String(n * k) },
        { letter: "D", text: String(total) }
      ],
      correctAnswer: "A",
      explanation: `C(${n},${k}) = ${n}!/(${k}!×${n - k}!) = ${ways}`,
      difficulty: "Hard",
      domain: "Statistics",
      skill: "Probability",
      difficultyRating: 10
    });
  }
  
  // Rational Expressions
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  for (let i = 1; i <= 20; i++) {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const x = Math.floor(Math.random() * 5) + 2;
    const num = x + a;
    const den = x + b;
    const g = gcd(num, den);
    const simNum = num / g;
    const simDen = den / g;
    const simplified = simDen === 1 ? `${simNum}` : `${simNum}/${simDen}`;
    const unsimplified = g > 1 ? `${num}/${den}` : `${num + 1}/${den}`;
    questions.push({
      id: `l10-rational-${i}`,
      question: `Simplify and evaluate (x + ${a})/(x + ${b}) when x = ${x}`,
      options: [
        { letter: "A", text: simplified },
        { letter: "B", text: `${a}/${b}` },
        { letter: "C", text: unsimplified },
        { letter: "D", text: `${x}/${b}` }
      ],
      correctAnswer: "A",
      explanation: `When x = ${x}: (${x} + ${a})/(${x} + ${b}) = ${num}/${den}${g > 1 ? ` = ${simplified}` : ''}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Rational Expressions",
      difficultyRating: 10
    });
  }
  
  // Exponential Equations - Advanced
  for (let i = 1; i <= 20; i++) {
    const base = [2, 3, 4][Math.floor(Math.random() * 3)];
    const exp1 = Math.floor(Math.random() * 3) + 1;
    const exp2 = exp1 + Math.floor(Math.random() * 2) + 1;
    const result = exp2 - exp1;
    questions.push({
      id: `l10-exp-adv-${i}`,
      question: `If ${base}^x = ${Math.pow(base, exp1)} and ${base}^y = ${Math.pow(base, exp2)}, what is y - x?`,
      options: [
        { letter: "A", text: String(result) },
        { letter: "B", text: String(result + 1) },
        { letter: "C", text: String(exp1) },
        { letter: "D", text: String(exp2) }
      ],
      correctAnswer: "A",
      explanation: `${base}^x = ${Math.pow(base, exp1)} means x = ${exp1}. ${base}^y = ${Math.pow(base, exp2)} means y = ${exp2}. So y - x = ${exp2} - ${exp1} = ${result}`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Exponential Equations",
      difficultyRating: 10
    });
  }
  
  return questions;
};

// Generate all questions
export const level1Questions = generateLevel1Questions();
export const level2Questions = generateLevel2Questions();
export const level3Questions = generateLevel3Questions();
export const level4Extra = generateLevel4Extra();
export const level5Extra = generateLevel5Extra();
export const level6Extra = generateLevel6Extra();
export const level7Extra = generateLevel7Extra();
export const level8Extra = generateLevel8Extra();
export const level9Extra = generateLevel9Extra();
export const level10Questions = generateLevel10Questions();

// Helper to deduplicate questions within the file
const deduplicateQuestions = (questions: VisualQuestion[]): VisualQuestion[] => {
  const seen = new Map<string, boolean>();
  return questions.filter(q => {
    const normalized = q.question.toLowerCase().replace(/\s+/g, ' ').trim();
    if (seen.has(normalized)) {
      return false;
    }
    seen.set(normalized, true);
    return true;
  });
};

// Combined export with deduplication
const rawAllLevelQuestions: VisualQuestion[] = [
  ...level1Questions,
  ...level2Questions,
  ...level3Questions,
  ...level4Extra,
  ...level5Extra,
  ...level6Extra,
  ...level7Extra,
  ...level8Extra,
  ...level9Extra,
  ...level10Questions,
];

export const allLevelQuestions: VisualQuestion[] = deduplicateQuestions(rawAllLevelQuestions);

// Export counts (after deduplication)
export const levelCounts = {
  level1: deduplicateQuestions(level1Questions).length,
  level2: deduplicateQuestions(level2Questions).length,
  level3: deduplicateQuestions(level3Questions).length,
  level4: deduplicateQuestions(level4Extra).length,
  level5: deduplicateQuestions(level5Extra).length,
  level6: deduplicateQuestions(level6Extra).length,
  level7: deduplicateQuestions(level7Extra).length,
  level8: deduplicateQuestions(level8Extra).length,
  level9: deduplicateQuestions(level9Extra).length,
  level10: deduplicateQuestions(level10Questions).length,
  total: allLevelQuestions.length,
  rawTotal: rawAllLevelQuestions.length,
  duplicatesRemoved: rawAllLevelQuestions.length - allLevelQuestions.length
};
