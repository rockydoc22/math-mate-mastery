// SAT Key Concepts Database
// Used to enhance explanations with targeted learning insights

export interface KeyConcept {
  skill: string;
  domain: string;
  keyInsight: string;
  satTip: string;
  commonMistakes: string[];
}

// Math Key Concepts
export const mathKeyConcepts: KeyConcept[] = [
  // Algebra - Linear equations
  {
    skill: "Linear equations in two variables",
    domain: "Algebra",
    keyInsight: "Linear equations can be written as y = mx + b where m is slope and b is y-intercept.",
    satTip: "To find slope from standard form (Ax + By = C), rearrange to slope-intercept form. Slope = -A/B.",
    commonMistakes: ["Forgetting to flip the sign when moving terms", "Confusing slope with y-intercept"]
  },
  {
    skill: "Linear Functions",
    domain: "Algebra",
    keyInsight: "Slope = rise/run = (y₂ - y₁)/(x₂ - x₁). A positive slope rises left to right.",
    satTip: "Parallel lines have equal slopes. Perpendicular lines have slopes that multiply to -1.",
    commonMistakes: ["Subtracting coordinates in wrong order", "Forgetting perpendicular slopes are negative reciprocals"]
  },
  {
    skill: "Systems of linear equations",
    domain: "Algebra",
    keyInsight: "Systems have one solution (intersecting lines), no solution (parallel), or infinite solutions (same line).",
    satTip: "Use substitution for simple equations, elimination for matching coefficients.",
    commonMistakes: ["Solving for wrong variable first", "Sign errors during elimination"]
  },
  {
    skill: "Quadratic equations",
    domain: "Algebra",
    keyInsight: "Quadratics have form ax² + bx + c = 0. Solutions: factoring, completing square, or quadratic formula.",
    satTip: "Check if you can factor first - it's faster. Use discriminant (b² - 4ac) to determine number of solutions.",
    commonMistakes: ["Forgetting ± in quadratic formula", "Sign errors when factoring"]
  },
  {
    skill: "Quadratic functions",
    domain: "Algebra",
    keyInsight: "Vertex form y = a(x - h)² + k gives vertex at (h, k). If a > 0, opens up; if a < 0, opens down.",
    satTip: "The axis of symmetry is x = -b/(2a). The vertex is the min or max point.",
    commonMistakes: ["Confusing h with -h in vertex form", "Forgetting a affects direction of opening"]
  },
  {
    skill: "Exponential functions",
    domain: "Algebra",
    keyInsight: "Exponential growth: y = a·bˣ where b > 1 grows, 0 < b < 1 decays.",
    satTip: "For percent increase r, use (1 + r). For percent decrease, use (1 - r).",
    commonMistakes: ["Using wrong base for growth vs decay", "Confusing linear vs exponential growth"]
  },
  // Problem Solving & Data Analysis
  {
    skill: "Percentages",
    domain: "Problem Solving",
    keyInsight: "Percent = (Part/Whole) × 100. Percent change = (New - Old)/Old × 100.",
    satTip: "Convert percentages to decimals by dividing by 100 before multiplying.",
    commonMistakes: ["Using wrong denominator for percent change", "Confusing percent of vs percent increase"]
  },
  {
    skill: "Statistics",
    domain: "Problem Solving",
    keyInsight: "Mean = sum/count, Median = middle value, Mode = most frequent, Range = max - min.",
    satTip: "IQR = Q3 - Q1. Outliers are typically beyond 1.5 × IQR from the quartiles.",
    commonMistakes: ["Forgetting to sort data for median", "Confusing range with IQR"]
  },
  {
    skill: "Ratios and proportions",
    domain: "Problem Solving",
    keyInsight: "Cross-multiply to solve proportions: a/b = c/d means ad = bc.",
    satTip: "Set up ratios carefully - make sure units match on both sides.",
    commonMistakes: ["Setting up ratio backwards", "Not simplifying before solving"]
  },
  {
    skill: "Probability",
    domain: "Problem Solving",
    keyInsight: "P(event) = favorable outcomes / total outcomes. Always between 0 and 1.",
    satTip: "For 'or' problems, add probabilities. For 'and' problems, multiply.",
    commonMistakes: ["Forgetting to subtract overlap for 'or' with non-mutually exclusive events"]
  },
  // Geometry
  {
    skill: "Area and volume",
    domain: "Geometry",
    keyInsight: "Know key formulas: Circle area = πr², Triangle = ½bh, Cylinder volume = πr²h.",
    satTip: "Most formulas are given on the SAT reference sheet - know where to find them!",
    commonMistakes: ["Confusing radius with diameter", "Forgetting to square the radius"]
  },
  {
    skill: "Right triangles",
    domain: "Geometry",
    keyInsight: "Pythagorean theorem: a² + b² = c². Know special triangles: 45-45-90 and 30-60-90.",
    satTip: "In 30-60-90: sides are x, x√3, 2x. In 45-45-90: sides are x, x, x√2.",
    commonMistakes: ["Applying Pythagorean theorem to non-right triangles", "Mixing up leg vs hypotenuse"]
  },
  {
    skill: "Trigonometry",
    domain: "Geometry",
    keyInsight: "SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.",
    satTip: "sin(θ) = cos(90° - θ). Complementary angles have equal sine/cosine.",
    commonMistakes: ["Confusing which side is opposite vs adjacent", "Forgetting SOH-CAH-TOA order"]
  },
  {
    skill: "Circles",
    domain: "Geometry",
    keyInsight: "Circle equation: (x - h)² + (y - k)² = r² with center (h, k) and radius r.",
    satTip: "Arc length = (θ/360°) × 2πr. Sector area = (θ/360°) × πr².",
    commonMistakes: ["Confusing r with r² in equation", "Using diameter instead of radius"]
  },
  // Advanced Math
  {
    skill: "Polynomial operations",
    domain: "Advanced Math",
    keyInsight: "When dividing polynomials, use long division or synthetic division.",
    satTip: "Factor theorem: If f(a) = 0, then (x - a) is a factor of f(x).",
    commonMistakes: ["Sign errors in polynomial long division", "Forgetting to include zero coefficients"]
  },
  {
    skill: "Rational expressions",
    domain: "Advanced Math",
    keyInsight: "Factor numerator and denominator before simplifying. Find common denominators to add.",
    satTip: "Exclude values that make denominator zero from the domain.",
    commonMistakes: ["Canceling terms instead of factors", "Forgetting to check for undefined values"]
  },
  {
    skill: "Absolute value",
    domain: "Advanced Math",
    keyInsight: "|x| = a means x = a OR x = -a. |x| represents distance from zero.",
    satTip: "Split absolute value equations into two cases and solve each.",
    commonMistakes: ["Forgetting the negative case", "Not checking solutions in original equation"]
  },
  {
    skill: "Sequences",
    domain: "Advanced Math",
    keyInsight: "Arithmetic: aₙ = a₁ + (n-1)d. Geometric: aₙ = a₁ × r^(n-1).",
    satTip: "Find common difference (arithmetic) or ratio (geometric) from consecutive terms.",
    commonMistakes: ["Confusing arithmetic vs geometric sequences", "Using wrong formula for nth term"]
  }
];

// English Key Concepts
export const englishKeyConcepts: KeyConcept[] = [
  // Standard English Conventions
  {
    skill: "Subject-verb agreement",
    domain: "Standard English Conventions",
    keyInsight: "The subject and verb must agree in number. Ignore phrases between them.",
    satTip: "Look for the TRUE subject, not words in prepositional phrases or relative clauses.",
    commonMistakes: ["Getting distracted by intervening phrases", "Collective nouns can be singular or plural"]
  },
  {
    skill: "Pronoun-antecedent agreement",
    domain: "Standard English Conventions",
    keyInsight: "Pronouns must agree with their antecedents in number and gender.",
    satTip: "'Everyone', 'anyone', 'each' are singular and take singular pronouns.",
    commonMistakes: ["Using 'they' for singular antecedents in formal writing", "Unclear antecedent reference"]
  },
  {
    skill: "Verb tense consistency",
    domain: "Standard English Conventions",
    keyInsight: "Maintain consistent verb tense unless there's a logical reason to shift.",
    satTip: "Look at surrounding sentences to determine the correct tense.",
    commonMistakes: ["Unnecessary tense shifts within a sentence", "Confusing simple past with present perfect"]
  },
  {
    skill: "Punctuation",
    domain: "Standard English Conventions",
    keyInsight: "Commas separate items in lists, set off non-essential clauses, and join independent clauses with conjunctions.",
    satTip: "Semicolons connect two complete sentences. Colons introduce lists or explanations.",
    commonMistakes: ["Comma splices (using comma to join two sentences)", "Missing comma after introductory phrases"]
  },
  {
    skill: "Sentence structure",
    domain: "Standard English Conventions",
    keyInsight: "A complete sentence needs a subject and verb. Avoid run-ons and fragments.",
    satTip: "Check for complete thoughts. Look for FANBOYS (for, and, nor, but, or, yet, so) in compound sentences.",
    commonMistakes: ["Run-on sentences", "Sentence fragments starting with 'which' or 'because'"]
  },
  {
    skill: "Parallel structure",
    domain: "Standard English Conventions",
    keyInsight: "Items in a list or comparison should have the same grammatical form.",
    satTip: "Check lists and comparisons for matching forms: all nouns, all verbs, all phrases.",
    commonMistakes: ["Mixing gerunds and infinitives in lists", "Inconsistent verb forms in series"]
  },
  {
    skill: "Modifier placement",
    domain: "Standard English Conventions",
    keyInsight: "Modifiers should be placed next to the word they modify. Misplaced modifiers create confusion.",
    satTip: "Dangling modifiers at sentence beginning should describe the sentence's subject.",
    commonMistakes: ["Dangling modifiers", "Squinting modifiers that could modify either of two words"]
  },
  // Expression of Ideas
  {
    skill: "Transitions",
    domain: "Expression of Ideas",
    keyInsight: "Transitions show relationships: addition, contrast, cause/effect, sequence, or example.",
    satTip: "Read sentences before AND after to determine the logical relationship.",
    commonMistakes: ["Using 'however' when no contrast exists", "Missing transitions between paragraphs"]
  },
  {
    skill: "Conciseness",
    domain: "Expression of Ideas",
    keyInsight: "Eliminate redundancy and wordiness. Shorter is often better on the SAT.",
    satTip: "If two answer choices say the same thing, the shorter one is usually correct.",
    commonMistakes: ["Using wordy phrases like 'due to the fact that' instead of 'because'"]
  },
  {
    skill: "Logical sequence",
    domain: "Expression of Ideas",
    keyInsight: "Sentences and paragraphs should flow in a logical order.",
    satTip: "Look for pronouns, transitions, and topic continuity to determine order.",
    commonMistakes: ["Placing sentences that break logical flow", "Ignoring pronoun references"]
  },
  {
    skill: "Evidence and support",
    domain: "Expression of Ideas",
    keyInsight: "Claims need supporting evidence. Examples should directly relate to the main point.",
    satTip: "The best supporting detail is specific and directly addresses the claim.",
    commonMistakes: ["Choosing vague support over specific examples", "Adding irrelevant details"]
  },
  {
    skill: "Tone and style",
    domain: "Expression of Ideas",
    keyInsight: "Match the tone and formality of the passage. Academic passages need formal language.",
    satTip: "Avoid slang, colloquialisms, and overly casual language in formal passages.",
    commonMistakes: ["Using informal language in academic contexts", "Being overly complex when simple is better"]
  },
  // Reading Comprehension
  {
    skill: "Main idea",
    domain: "Reading",
    keyInsight: "The main idea is the central message or purpose of the passage.",
    satTip: "Check the first and last paragraphs. The main idea is often stated or summarized there.",
    commonMistakes: ["Choosing too narrow or too broad a statement", "Confusing a detail with main idea"]
  },
  {
    skill: "Inference",
    domain: "Reading",
    keyInsight: "Inferences are conclusions based on evidence in the text, not directly stated.",
    satTip: "The correct answer must be supported by specific text evidence.",
    commonMistakes: ["Making assumptions not supported by text", "Choosing answers that are too extreme"]
  },
  {
    skill: "Word in context",
    domain: "Reading",
    keyInsight: "Determine meaning from how the word is used in the passage, not just dictionary definition.",
    satTip: "Substitute each answer choice into the sentence to test which fits best.",
    commonMistakes: ["Choosing the most common meaning without checking context"]
  },
  {
    skill: "Author's purpose",
    domain: "Reading",
    keyInsight: "Authors write to inform, persuade, entertain, or explain. Identify which.",
    satTip: "Look at word choice and tone to determine the author's attitude and purpose.",
    commonMistakes: ["Confusing author's purpose with passage content", "Missing persuasive elements"]
  },
  {
    skill: "Text structure",
    domain: "Reading",
    keyInsight: "Common structures: chronological, compare/contrast, cause/effect, problem/solution.",
    satTip: "Signal words indicate structure: 'however' (contrast), 'because' (cause/effect).",
    commonMistakes: ["Missing structural transitions", "Not recognizing the overall organization"]
  }
];

// Function to find relevant key concept for a question
export function findKeyConcept(skill: string, domain: string, questionType: 'math' | 'english'): KeyConcept | null {
  const concepts = questionType === 'math' ? mathKeyConcepts : englishKeyConcepts;
  
  // Try exact skill match first
  let concept = concepts.find(c => 
    c.skill.toLowerCase() === skill.toLowerCase()
  );
  
  if (!concept) {
    // Try partial skill match
    concept = concepts.find(c => 
      c.skill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(c.skill.toLowerCase())
    );
  }
  
  if (!concept) {
    // Try domain match
    concept = concepts.find(c => 
      c.domain.toLowerCase() === domain.toLowerCase()
    );
  }
  
  return concept || null;
}

// Function to enhance an explanation with key concepts
export function enhanceExplanation(
  originalExplanation: string,
  skill: string,
  domain: string,
  questionType: 'math' | 'english'
): { explanation: string; keyConcept: KeyConcept | null } {
  const concept = findKeyConcept(skill, domain, questionType);
  
  if (!concept) {
    return { explanation: originalExplanation, keyConcept: null };
  }
  
  // Return original explanation with the concept for display
  return { explanation: originalExplanation, keyConcept: concept };
}
