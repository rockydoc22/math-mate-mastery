/**
 * Converts decimal approximations to exact mathematical forms
 * Used to standardize SAT-style questions that should use exact values
 * (radicals, fractions, π expressions) instead of decimal approximations
 * Also fixes floating-point precision errors
 */

/**
 * Fixes floating-point precision errors in numbers
 * e.g., 1.3599999999999999 → 1.36, 7.000000000000001 → 7
 */
export const fixFloatingPoint = (text: string): string => {
  if (!text) return text;
  
  // Match numbers with excessive decimal places (more than 4 significant figures after decimal)
  return text.replace(/(\d+\.\d{2,}?)(\d{10,})/g, (match, prefix) => {
    const num = parseFloat(match);
    // Round to 2 decimal places for most cases
    const rounded = Math.round(num * 100) / 100;
    // If it's essentially an integer, return integer
    if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
      return String(Math.round(rounded));
    }
    // Remove trailing zeros after decimal
    return String(rounded).replace(/\.?0+$/, '');
  }).replace(/(\d+)\.0{5,}\d{1,3}$/g, '$1') // 7.000000000000001 → 7
    .replace(/(\d+\.\d{1,2})0{5,}\d{1,3}$/g, '$1'); // 1.360000000000001 → 1.36
};

/**
 * Converts repeating decimals to fractions
 */
export const fixRepeatingDecimals = (text: string): string => {
  if (!text) return text;
  
  const replacements: Record<string, string> = {
    '0.3333333333333333': '1/3',
    '0.6666666666666666': '2/3',
    '0.6666666666666667': '2/3',
    '4.666666666666667': '14/3',
    '6.666666666666667': '20/3',
    '7.333333333333334': '22/3',
    '8.666666666666666': '26/3',
    '8.666666666666668': '26/3',
    '9.333333333333334': '28/3',
    '10.666666666666666': '32/3',
    '11.333333333333334': '34/3',
    '12.666666666666666': '38/3',
  };
  
  let result = text;
  for (const [decimal, fraction] of Object.entries(replacements)) {
    result = result.replace(new RegExp(decimal.replace(/\./g, '\\.'), 'g'), fraction);
  }
  return result;
};

// Common decimal-to-exact mappings
const DECIMAL_TO_EXACT: Record<string, string> = {
  // Square roots
  '1.4142': '√2',
  '1.414': '√2',
  '1.41': '√2',
  '1.7321': '√3',
  '1.732': '√3',
  '1.73': '√3',
  '2.2361': '√5',
  '2.236': '√5',
  '2.449': '√6',
  '2.6458': '√7',
  '2.8284': '2√2',
  '2.828': '2√2',
  '3.4641': '2√3',
  '3.464': '2√3',
  
  // Trig values - sin/cos 30°, 60°
  '0.8660': '√3/2',
  '0.866': '√3/2',
  '0.87': '√3/2',
  '-0.8660': '-√3/2',
  '-0.866': '-√3/2',
  '0.4330': '√3/4',
  '0.433': '√3/4',
  
  // Trig values - sin/cos 45°
  '0.7071': '√2/2',
  '0.707': '√2/2',
  '0.71': '√2/2',
  '-0.7071': '-√2/2',
  '-0.707': '-√2/2',
  '0.3536': '√2/4',
  
  // Trig tan values
  '0.5774': '√3/3',
  '0.577': '√3/3',
  '-0.5774': '-√3/3',
  '-0.577': '-√3/3',
  '1.1547': '2√3/3',
  '-1.1547': '-2√3/3',
  
  // Simple fractions
  '0.5000': '1/2',
  '0.500': '1/2',
  '-0.5000': '-1/2',
  '-0.500': '-1/2',
  '0.2500': '1/4',
  '0.3333': '1/3',
  '0.333': '1/3',
  '0.6667': '2/3',
  '0.667': '2/3',
  '0.7500': '3/4',
  '1.0000': '1',
  '-1.0000': '-1',
  '2.0000': '2',
  
  // Pi approximations
  '3.14': 'π',
  '3.1416': 'π',
  '3.14159': 'π',
  '6.28': '2π',
  '6.2832': '2π',
  '9.42': '3π',
  '9.4248': '3π',
  '1.57': 'π/2',
  '1.5708': 'π/2',
  '0.7854': 'π/4',
  '0.79': 'π/4',
  
  // Common π-based arc lengths and areas
  '5.24': '5π/3',
  '5.236': '5π/3',
  '2.09': '2π/3',
  '2.094': '2π/3',
  '4.19': '4π/3',
  '4.189': '4π/3',
  '10.47': '10π/3',
  '10.472': '10π/3',
  '7.85': '5π/2',
  '7.854': '5π/2',
  '226.08': '72π',
  '226.19': '72π',
  '56.52': '18π',
  '56.55': '18π',
  '62.83': '20π',
  '62.832': '20π',
  '4.71': '3π/2',
  '5.76': '1.83π',
  
  // Common exact values from trig tables
  '2.4142': '1 + √2',
  '0.4142': '√2 - 1',
  '1.3660': '(√3 + 1)/2',
};

// Arc length formula: (θ/360) × 2πr = πrθ/180
// For r=10, θ=30°: π×10×30/180 = 5π/3

/**
 * Converts a decimal string to its exact form if a mapping exists
 */
export const decimalToExact = (value: string): string => {
  const trimmed = value.trim();
  return DECIMAL_TO_EXACT[trimmed] || trimmed;
};

/**
 * Converts all decimal approximations in a text string to exact forms
 * Also fixes floating-point precision errors
 */
export const convertTextToExact = (text: string): string => {
  if (!text) return text;
  
  // First fix floating-point precision errors
  let result = fixFloatingPoint(text);
  
  // Then fix repeating decimals
  result = fixRepeatingDecimals(result);
  
  // Sort by length (longest first) to avoid partial matches
  const sortedDecimals = Object.keys(DECIMAL_TO_EXACT).sort((a, b) => b.length - a.length);
  
  for (const decimal of sortedDecimals) {
    const exact = DECIMAL_TO_EXACT[decimal];
    // Match the decimal as a standalone number (not part of a larger number)
    // Use word boundaries and common delimiters
    const regex = new RegExp(`(?<![0-9.])${decimal.replace(/[.-]/g, '\\$&')}(?![0-9])`, 'g');
    result = result.replace(regex, exact);
  }
  
  // Remove "(Use π ≈ 3.14)" type instructions since we're using exact values
  result = result.replace(/\s*\(Use\s*π\s*[≈=]\s*[\d.]+\)/gi, '');
  result = result.replace(/\s*\(use\s*pi\s*[≈=]\s*[\d.]+\)/gi, '');
  
  return result;
};

/**
 * Converts option text to exact form
 */
export const convertOptionToExact = (optionText: string): string => {
  if (!optionText) return optionText;
  return convertTextToExact(optionText);
};

/**
 * Determines if a question asks for "exact value" but has decimal answers
 */
export const questionNeedsExactConversion = (questionText: string, options: Array<{letter: string; text: string}>): boolean => {
  const asksForExact = /exact\s*value|exact\s*answer/i.test(questionText);
  const hasDecimals = options.some(opt => 
    Object.keys(DECIMAL_TO_EXACT).some(dec => opt.text.includes(dec))
  );
  return asksForExact && hasDecimals;
};

/**
 * Converts a full question object to use exact values
 */
export const convertQuestionToExact = <T extends {
  question: string;
  options: Array<{letter: string; text: string}>;
  explanation: string;
}>(question: T): T => {
  return {
    ...question,
    question: convertTextToExact(question.question),
    options: question.options.map(opt => ({
      ...opt,
      text: convertOptionToExact(opt.text)
    })),
    explanation: convertTextToExact(question.explanation)
  };
};

/**
 * Batch convert multiple questions to exact values
 */
export const convertQuestionsToExact = <T extends {
  question: string;
  options: Array<{letter: string; text: string}>;
  explanation: string;
}>(questions: T[]): T[] => {
  return questions.map(convertQuestionToExact);
};
