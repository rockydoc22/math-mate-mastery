import { expandedFacts } from "./satFactsExpanded";

export type ExamType = "sat" | "psat" | "act";

export interface SATFact {
  id: string;
  category: "math" | "vocab" | "grammar" | "strategy" | "science";
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  exam?: ExamType[];
}

const baseFacts: SATFact[] = [
  // ── MATH: Trig Values ──
  { id: "m1", category: "math", question: "sin(30°) = ?", correctAnswer: "1/2", wrongAnswers: ["√2/2", "√3/2", "1"] },
  { id: "m2", category: "math", question: "cos(30°) = ?", correctAnswer: "√3/2", wrongAnswers: ["1/2", "√2/2", "1"] },
  { id: "m3", category: "math", question: "tan(45°) = ?", correctAnswer: "1", wrongAnswers: ["0", "√3", "1/2"] },
  { id: "m4", category: "math", question: "sin(45°) = ?", correctAnswer: "√2/2", wrongAnswers: ["1/2", "√3/2", "1"] },
  { id: "m5", category: "math", question: "cos(60°) = ?", correctAnswer: "1/2", wrongAnswers: ["√2/2", "√3/2", "0"] },
  { id: "m6", category: "math", question: "sin(90°) = ?", correctAnswer: "1", wrongAnswers: ["0", "1/2", "√2/2"] },
  { id: "m7", category: "math", question: "cos(0°) = ?", correctAnswer: "1", wrongAnswers: ["0", "1/2", "√3/2"] },
  { id: "m8", category: "math", question: "tan(60°) = ?", correctAnswer: "√3", wrongAnswers: ["1", "√2", "1/√3"] },
  { id: "m9", category: "math", question: "SOH-CAH-TOA: sin = ?", correctAnswer: "opposite / hypotenuse", wrongAnswers: ["adjacent / hypotenuse", "opposite / adjacent", "hypotenuse / opposite"] },
  { id: "m10", category: "math", question: "SOH-CAH-TOA: cos = ?", correctAnswer: "adjacent / hypotenuse", wrongAnswers: ["opposite / hypotenuse", "opposite / adjacent", "hypotenuse / adjacent"] },
  { id: "m11", category: "math", question: "SOH-CAH-TOA: tan = ?", correctAnswer: "opposite / adjacent", wrongAnswers: ["adjacent / opposite", "opposite / hypotenuse", "adjacent / hypotenuse"] },

  // ── MATH: Pythagorean Triples ──
  { id: "m12", category: "math", question: "Common Pythagorean triple: 3, 4, __?", correctAnswer: "5", wrongAnswers: ["6", "7", "8"] },
  { id: "m13", category: "math", question: "Common Pythagorean triple: 5, 12, __?", correctAnswer: "13", wrongAnswers: ["14", "15", "11"] },
  { id: "m14", category: "math", question: "Common Pythagorean triple: 8, 15, __?", correctAnswer: "17", wrongAnswers: ["16", "18", "19"] },
  { id: "m15", category: "math", question: "Common Pythagorean triple: 7, 24, __?", correctAnswer: "25", wrongAnswers: ["26", "28", "23"] },

  // ── MATH: Formulas ──
  { id: "m16", category: "math", question: "Area of a circle?", correctAnswer: "πr²", wrongAnswers: ["2πr", "πd", "πr"] },
  { id: "m17", category: "math", question: "Circumference of a circle?", correctAnswer: "2πr", wrongAnswers: ["πr²", "πd²", "πr"] },
  { id: "m18", category: "math", question: "Slope formula?", correctAnswer: "(y₂ − y₁) / (x₂ − x₁)", wrongAnswers: ["(x₂ − x₁) / (y₂ − y₁)", "y₂ − x₂ / y₁ − x₁", "(y₂ + y₁) / (x₂ + x₁)"] },
  { id: "m19", category: "math", question: "Quadratic formula: x = ?", correctAnswer: "(−b ± √(b²−4ac)) / 2a", wrongAnswers: ["(b ± √(b²−4ac)) / 2a", "(−b ± √(b²+4ac)) / 2a", "(−b ± √(b²−4ac)) / a"] },
  { id: "m20", category: "math", question: "Discriminant of a quadratic?", correctAnswer: "b² − 4ac", wrongAnswers: ["b² + 4ac", "4ac − b²", "2b − 4ac"] },
  { id: "m21", category: "math", question: "If discriminant > 0, the quadratic has:", correctAnswer: "Two real solutions", wrongAnswers: ["One real solution", "No real solutions", "Infinite solutions"] },
  { id: "m22", category: "math", question: "If discriminant = 0, the quadratic has:", correctAnswer: "One real solution", wrongAnswers: ["Two real solutions", "No real solutions", "Two complex solutions"] },
  { id: "m23", category: "math", question: "Volume of a cylinder?", correctAnswer: "πr²h", wrongAnswers: ["2πrh", "πrh", "⅓πr²h"] },
  { id: "m24", category: "math", question: "Area of a triangle?", correctAnswer: "½ × base × height", wrongAnswers: ["base × height", "2 × base × height", "base + height"] },
  { id: "m25", category: "math", question: "Distance formula?", correctAnswer: "√((x₂−x₁)² + (y₂−y₁)²)", wrongAnswers: ["(x₂−x₁)² + (y₂−y₁)²", "|x₂−x₁| + |y₂−y₁|", "√((x₂+x₁)² + (y₂+y₁)²)"] },

  // ── MATH: Exponent / Log Rules ──
  { id: "m26", category: "math", question: "x⁰ = ? (x ≠ 0)", correctAnswer: "1", wrongAnswers: ["0", "x", "undefined"] },
  { id: "m27", category: "math", question: "xᵃ × xᵇ = ?", correctAnswer: "x^(a+b)", wrongAnswers: ["x^(ab)", "x^(a−b)", "(2x)^(a+b)"] },
  { id: "m28", category: "math", question: "xᵃ / xᵇ = ?", correctAnswer: "x^(a−b)", wrongAnswers: ["x^(a+b)", "x^(a/b)", "x^(b−a)"] },
  { id: "m29", category: "math", question: "(xᵃ)ᵇ = ?", correctAnswer: "x^(ab)", wrongAnswers: ["x^(a+b)", "x^(a−b)", "x^(a/b)"] },
  { id: "m30", category: "math", question: "x^(−1) = ?", correctAnswer: "1/x", wrongAnswers: ["−x", "−1", "x"] },

  // ── MATH: Special angles / circles ──
  { id: "m31", category: "math", question: "Angles in a triangle sum to:", correctAnswer: "180°", wrongAnswers: ["360°", "90°", "270°"] },
  { id: "m32", category: "math", question: "Angles in a quadrilateral sum to:", correctAnswer: "360°", wrongAnswers: ["180°", "270°", "540°"] },
  { id: "m33", category: "math", question: "Arc length formula?", correctAnswer: "(θ/360) × 2πr", wrongAnswers: ["(θ/180) × πr", "θ × πr²", "(θ/360) × πr²"] },
  { id: "m34", category: "math", question: "A 45-45-90 triangle's sides ratio?", correctAnswer: "1 : 1 : √2", wrongAnswers: ["1 : √3 : 2", "1 : 2 : √3", "1 : 1 : 2"] },
  { id: "m35", category: "math", question: "A 30-60-90 triangle's sides ratio?", correctAnswer: "1 : √3 : 2", wrongAnswers: ["1 : 1 : √2", "1 : 2 : √3", "1 : √2 : 2"] },

  // ── MATH: Stats / Probability ──
  { id: "m36", category: "math", question: "Mean = ?", correctAnswer: "sum of values / count", wrongAnswers: ["middle value", "most frequent value", "largest − smallest"] },
  { id: "m37", category: "math", question: "Median of an even set is found by:", correctAnswer: "Average of two middle values", wrongAnswers: ["The lower middle value", "The higher middle value", "Sum divided by count"] },
  { id: "m38", category: "math", question: "Standard deviation measures:", correctAnswer: "Spread from the mean", wrongAnswers: ["The center of data", "The most common value", "The range of data"] },
  { id: "m39", category: "math", question: "Probability of event A = ?", correctAnswer: "Favorable outcomes / Total outcomes", wrongAnswers: ["Total / Favorable", "1 − Favorable", "Favorable × Total"] },
  { id: "m40", category: "math", question: "Percent change formula?", correctAnswer: "(new − old) / old × 100", wrongAnswers: ["(old − new) / new × 100", "new / old × 100", "(new − old) × 100"] },

  // ── VOCAB ──
  { id: "v1", category: "vocab", question: "'Ambiguous' means:", correctAnswer: "Open to multiple interpretations", wrongAnswers: ["Clear and definite", "Extremely hostile", "Full of ambition"] },
  { id: "v2", category: "vocab", question: "'Empirical' means:", correctAnswer: "Based on observation or experience", wrongAnswers: ["Based on theory alone", "Related to an empire", "Emotional"] },
  { id: "v3", category: "vocab", question: "'Pragmatic' means:", correctAnswer: "Practical, focused on results", wrongAnswers: ["Idealistic", "Dramatic", "Pessimistic"] },
  { id: "v4", category: "vocab", question: "'Substantiate' means:", correctAnswer: "To provide evidence for", wrongAnswers: ["To replace", "To subtract from", "To undermine"] },
  { id: "v5", category: "vocab", question: "'Juxtapose' means:", correctAnswer: "To place side by side for comparison", wrongAnswers: ["To combine into one", "To separate permanently", "To move in sequence"] },
  { id: "v6", category: "vocab", question: "'Undermine' means:", correctAnswer: "To weaken or erode gradually", wrongAnswers: ["To build up from below", "To strongly support", "To dig tunnels"] },
  { id: "v7", category: "vocab", question: "'Corroborate' means:", correctAnswer: "To confirm or support with evidence", wrongAnswers: ["To disprove", "To collaborate", "To decorate"] },
  { id: "v8", category: "vocab", question: "'Nuanced' means:", correctAnswer: "Having subtle differences or distinctions", wrongAnswers: ["Completely obvious", "Brand new", "Extremely annoying"] },
  { id: "v9", category: "vocab", question: "'Anomaly' means:", correctAnswer: "Something that deviates from the norm", wrongAnswers: ["A synonym", "A type of analysis", "Something anonymous"] },
  { id: "v10", category: "vocab", question: "'Converge' means:", correctAnswer: "To come together at a point", wrongAnswers: ["To move apart", "To rotate", "To stay constant"] },
  { id: "v11", category: "vocab", question: "'Diverge' means:", correctAnswer: "To move apart or differ", wrongAnswers: ["To come together", "To dive deep", "To agree"] },
  { id: "v12", category: "vocab", question: "'Proliferate' means:", correctAnswer: "To increase rapidly in number", wrongAnswers: ["To decrease slowly", "To remain stable", "To produce professionally"] },
  { id: "v13", category: "vocab", question: "'Exacerbate' means:", correctAnswer: "To make worse", wrongAnswers: ["To make better", "To examine closely", "To exaggerate"] },
  { id: "v14", category: "vocab", question: "'Mitigate' means:", correctAnswer: "To make less severe", wrongAnswers: ["To make worse", "To imitate", "To migrate"] },
  { id: "v15", category: "vocab", question: "'Inherent' means:", correctAnswer: "Existing as a natural part of something", wrongAnswers: ["Inherited from parents", "Learned through training", "Added artificially"] },
  { id: "v16", category: "vocab", question: "'Elucidate' means:", correctAnswer: "To make clear or explain", wrongAnswers: ["To confuse", "To escape", "To illuminate a room"] },
  { id: "v17", category: "vocab", question: "'Preclude' means:", correctAnswer: "To prevent from happening", wrongAnswers: ["To include beforehand", "To predict", "To summarize"] },
  { id: "v18", category: "vocab", question: "'Pervasive' means:", correctAnswer: "Spreading widely throughout", wrongAnswers: ["Persuasive", "Occasional", "Hidden from view"] },
  { id: "v19", category: "vocab", question: "'Conjecture' means:", correctAnswer: "An opinion formed without proof", wrongAnswers: ["A proven fact", "A legal term", "A type of experiment"] },
  { id: "v20", category: "vocab", question: "'Discrepancy' means:", correctAnswer: "A difference between things that should match", wrongAnswers: ["An agreement", "A secret", "A loud noise"] },
  { id: "v21", category: "vocab", question: "'Bolster' means:", correctAnswer: "To support or strengthen", wrongAnswers: ["To weaken", "To cushion physically", "To restrict"] },
  { id: "v22", category: "vocab", question: "'Tenuous' means:", correctAnswer: "Very weak or slight", wrongAnswers: ["Strong and durable", "Related to a tenant", "Musical in nature"] },
  { id: "v23", category: "vocab", question: "'Supplant' means:", correctAnswer: "To take the place of", wrongAnswers: ["To supply", "To plant again", "To beg"] },
  { id: "v24", category: "vocab", question: "'Disparate' means:", correctAnswer: "Fundamentally different", wrongAnswers: ["Desperate", "Similar", "Disappearing"] },
  { id: "v25", category: "vocab", question: "'Facilitate' means:", correctAnswer: "To make easier or help bring about", wrongAnswers: ["To build a facility", "To complicate", "To face someone"] },
  { id: "v26", category: "vocab", question: "'Scrutinize' means:", correctAnswer: "To examine very carefully", wrongAnswers: ["To criticize unfairly", "To ignore", "To clean thoroughly"] },
  { id: "v27", category: "vocab", question: "'Elicit' means:", correctAnswer: "To draw out a response", wrongAnswers: ["Illegal", "To choose", "To delete"] },
  { id: "v28", category: "vocab", question: "'Rhetoric' means:", correctAnswer: "The art of persuasive language", wrongAnswers: ["A type of question", "Angry speech", "A poetic form"] },
  { id: "v29", category: "vocab", question: "'Vindicate' means:", correctAnswer: "To clear of blame or suspicion", wrongAnswers: ["To take revenge", "To make angry", "To predict"] },
  { id: "v30", category: "vocab", question: "'Unprecedented' means:", correctAnswer: "Never done or known before", wrongAnswers: ["Unpresidential", "Expected", "Repeated often"] },
  { id: "v31", category: "vocab", question: "'Paradox' means:", correctAnswer: "A seemingly contradictory statement that may be true", wrongAnswers: ["Two doctors", "A perfect example", "A type of poem"] },
  { id: "v32", category: "vocab", question: "'Analogous' means:", correctAnswer: "Comparable in certain respects", wrongAnswers: ["Analytical", "Digital", "Unrelated"] },
  { id: "v33", category: "vocab", question: "'Refute' means:", correctAnswer: "To prove wrong with evidence", wrongAnswers: ["To refuse politely", "To repeat", "To recycle"] },
  { id: "v34", category: "vocab", question: "'Innate' means:", correctAnswer: "Inborn; natural", wrongAnswers: ["Learned", "Internal organs", "Innovative"] },
  { id: "v35", category: "vocab", question: "'Acquiesce' means:", correctAnswer: "To accept without protest", wrongAnswers: ["To acquire", "To question loudly", "To release"] },
  { id: "v36", category: "vocab", question: "'Equivocal' means:", correctAnswer: "Open to more than one interpretation; ambiguous", wrongAnswers: ["Equal in value", "Absolutely certain", "Mathematical"] },
  { id: "v37", category: "vocab", question: "'Articulate' (adj.) means:", correctAnswer: "Expressing ideas clearly and fluently", wrongAnswers: ["Related to joints", "Artificial", "Artistic"] },
  { id: "v38", category: "vocab", question: "'Advocate' (v.) means:", correctAnswer: "To publicly support or recommend", wrongAnswers: ["To avoid", "To advertise", "To add something"] },
  { id: "v39", category: "vocab", question: "'Plausible' means:", correctAnswer: "Seeming reasonable or probable", wrongAnswers: ["Deserving applause", "Plastic-like", "Impossible"] },
  { id: "v40", category: "vocab", question: "'Obsolete' means:", correctAnswer: "No longer in use; outdated", wrongAnswers: ["Absolutely certain", "Stubborn", "Transparent"] },
  { id: "v41", category: "vocab", question: "'Erratic' means:", correctAnswer: "Unpredictable and inconsistent", wrongAnswers: ["Always wrong", "Related to errors", "Automatic"] },
  { id: "v42", category: "vocab", question: "'Benevolent' means:", correctAnswer: "Well-meaning and kindly", wrongAnswers: ["Violent", "Beneficial to plants", "Below average"] },
  { id: "v43", category: "vocab", question: "'Candid' means:", correctAnswer: "Truthful and straightforward", wrongAnswers: ["Sweet like candy", "Running for office", "Secretly planned"] },
  { id: "v44", category: "vocab", question: "'Construe' means:", correctAnswer: "To interpret in a particular way", wrongAnswers: ["To build", "To destroy", "To restrict"] },
  { id: "v45", category: "vocab", question: "'Depict' means:", correctAnswer: "To represent in a picture or words", wrongAnswers: ["To choose", "To remove paint", "To depress"] },

  // ── GRAMMAR RULES ──
  { id: "g1", category: "grammar", question: "Use a semicolon to:", correctAnswer: "Join two independent clauses", wrongAnswers: ["Introduce a list", "Replace a period in all cases", "Separate subject from verb"] },
  { id: "g2", category: "grammar", question: "A comma splice is:", correctAnswer: "Two independent clauses joined only by a comma", wrongAnswers: ["A comma after a conjunction", "A comma before a list", "Correct punctuation"] },
  { id: "g3", category: "grammar", question: "'Its' vs 'It's': 'It's' means:", correctAnswer: "It is / It has", wrongAnswers: ["Belonging to it", "A plural form", "Past tense of 'it'"] },
  { id: "g4", category: "grammar", question: "Subject-verb agreement: 'Each of the students __ ready.'", correctAnswer: "is", wrongAnswers: ["are", "were", "have been"] },
  { id: "g5", category: "grammar", question: "A dangling modifier is:", correctAnswer: "A modifier with no clear word to modify", wrongAnswers: ["A very long sentence", "A sentence with two verbs", "A correctly placed adjective"] },
  { id: "g6", category: "grammar", question: "Parallel structure requires:", correctAnswer: "Consistent grammatical form in a series", wrongAnswers: ["Using the same word repeatedly", "Writing in passive voice", "Alternating sentence lengths"] },
  { id: "g7", category: "grammar", question: "When do you use 'whom'?", correctAnswer: "When it's the object (him/her)", wrongAnswers: ["When it's the subject", "Only in questions", "Interchangeably with 'who'"] },
  { id: "g8", category: "grammar", question: "'Who' vs 'Whom': 'The student __ scored highest.'", correctAnswer: "who", wrongAnswers: ["whom", "whose", "which"] },
  { id: "g9", category: "grammar", question: "A colon is used after:", correctAnswer: "A complete sentence to introduce a list or explanation", wrongAnswers: ["Any introductory word", "A dependent clause", "A conjunction"] },
  { id: "g10", category: "grammar", question: "'Neither the teacher nor the students __ present.'", correctAnswer: "were (verb agrees with closer noun)", wrongAnswers: ["was", "is", "has been"] },
  { id: "g11", category: "grammar", question: "An appositive should be:", correctAnswer: "Set off by commas if non-essential", wrongAnswers: ["Always in parentheses", "Never set off by commas", "Placed at the start of a sentence"] },
  { id: "g12", category: "grammar", question: "'Affect' is usually a __, 'Effect' is usually a __.", correctAnswer: "verb, noun", wrongAnswers: ["noun, verb", "adjective, adverb", "verb, verb"] },

  // ── SAT STRATEGIES ──
  { id: "s1", category: "strategy", question: "On Reading, which answer type is usually a trap?", correctAnswer: "Extreme or absolute language", wrongAnswers: ["Moderate, hedged language", "Direct quotes from the text", "Answers that feel uncertain"] },
  { id: "s2", category: "strategy", question: "In 'which choice best supports' questions, you should:", correctAnswer: "Find the answer with direct textual evidence", wrongAnswers: ["Choose the most logical inference", "Pick the longest option", "Go with your gut feeling"] },
  { id: "s3", category: "strategy", question: "If two answer choices are opposites, usually:", correctAnswer: "One of them is correct", wrongAnswers: ["Neither is correct", "Both are wrong", "Skip the question"] },
  { id: "s4", category: "strategy", question: "For 'could be true' vs 'must be true':", correctAnswer: "'Must' requires proof; 'Could' needs just one possibility", wrongAnswers: ["They mean the same thing", "'Could' is stricter than 'must'", "Always pick 'could be true'"] },
  { id: "s5", category: "strategy", question: "On grid-in math questions, can you enter a negative number?", correctAnswer: "No", wrongAnswers: ["Yes", "Only for integers", "Only for fractions"] },
  { id: "s6", category: "strategy", question: "Best first step when stuck on a word problem?", correctAnswer: "Define variables and translate to math", wrongAnswers: ["Try all answer choices", "Skip it immediately", "Estimate the answer"] },
  { id: "s7", category: "strategy", question: "On the SAT, is there a penalty for wrong answers?", correctAnswer: "No — always guess if unsure", wrongAnswers: ["Yes — ¼ point deducted", "Yes — ½ point deducted", "Only on math questions"] },
  { id: "s8", category: "strategy", question: "For Reading passages, you should:", correctAnswer: "Read the passage first, then answer questions", wrongAnswers: ["Read questions first, then skim the passage", "Only read the first paragraph", "Skip the passage and use context clues"] },
  { id: "s9", category: "strategy", question: "When the SAT writing asks for the 'most concise' option:", correctAnswer: "Choose the shortest option that preserves meaning", wrongAnswers: ["Always pick the longest one", "Pick the most formal option", "Choose the one with the most detail"] },
  { id: "s10", category: "strategy", question: "Plugging in numbers works best for:", correctAnswer: "Questions with variables in the answer choices", wrongAnswers: ["Word problems only", "Geometry questions only", "Questions with no answer choices"] },
];

// Merge base facts (default to all exams) with expanded facts
export const satFacts: SATFact[] = [
  ...baseFacts.map(f => ({ ...f, exam: f.exam || ["sat", "psat", "act"] as ExamType[] })),
  ...expandedFacts,
];
