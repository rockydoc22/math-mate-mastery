import { SATFact } from "./satFacts";

/**
 * Expanded rapid-fire facts covering SAT, PSAT, and ACT-specific content.
 * These complement the base satFacts — duplicates have been removed.
 */
export const expandedFacts: SATFact[] = [
  // ══════════════════════════════════════════
  // SAT / PSAT MATH — new formulas not in base
  // ══════════════════════════════════════════
  { id: "em1", category: "math", exam: ["sat", "psat", "act"], question: "Midpoint formula?", correctAnswer: "((x₁+x₂)/2, (y₁+y₂)/2)", wrongAnswers: ["(x₂−x₁, y₂−y₁)", "√[(x₂−x₁)²+(y₂−y₁)²]", "(y₂−y₁)/(x₂−x₁)"] },
  { id: "em2", category: "math", exam: ["sat", "psat", "act"], question: "Average speed = ?", correctAnswer: "total distance / total time", wrongAnswers: ["total time / distance", "distance × time", "(speed₁ + speed₂) / 2"] },
  { id: "em3", category: "math", exam: ["sat", "psat", "act"], question: "x% of n = ?", correctAnswer: "n × (x/100)", wrongAnswers: ["n / (x/100)", "(x/100) − n", "n + x/100"] },
  { id: "em4", category: "math", exam: ["sat", "psat", "act"], question: "Slope-intercept form?", correctAnswer: "y = mx + b", wrongAnswers: ["y = bmx", "x = my + b", "ax + by = c"] },
  { id: "em5", category: "math", exam: ["sat", "psat", "act"], question: "Sector area = ?", correctAnswer: "(θ/360) × πr²", wrongAnswers: ["(θ/360) × 2πr", "πr² / θ", "θ × r²"] },
  { id: "em6", category: "math", exam: ["sat", "psat", "act"], question: "Point-slope form?", correctAnswer: "y − y₁ = m(x − x₁)", wrongAnswers: ["y = mx + b", "ax + by = c", "y = (x−h)² + k"] },
  { id: "em7", category: "math", exam: ["sat", "psat", "act"], question: "Circle equation (center h,k)?", correctAnswer: "(x−h)² + (y−k)² = r²", wrongAnswers: ["x² + y² = r²", "(x+h)² + (y+k)² = r²", "x/h + y/k = r"] },
  { id: "em8", category: "math", exam: ["sat", "psat", "act"], question: "Volume of a sphere?", correctAnswer: "(4/3)πr³", wrongAnswers: ["(1/3)πr²h", "πr²h", "4πr²"] },
  { id: "em9", category: "math", exam: ["sat", "psat", "act"], question: "Radians in a full circle?", correctAnswer: "2π", wrongAnswers: ["π", "360", "180"] },

  // ══════════════════════════════════════════
  // SAT / PSAT GRAMMAR — new rules not in base
  // ══════════════════════════════════════════
  { id: "eg1", category: "grammar", exam: ["sat", "psat", "act"], question: "Keep verb _____ consistent throughout.", correctAnswer: "tense", wrongAnswers: ["subject", "object", "adjective"] },
  { id: "eg2", category: "grammar", exam: ["sat", "psat", "act"], question: "Pronouns must agree with antecedents in:", correctAnswer: "number (singular/plural)", wrongAnswers: ["color", "size", "location"] },
  { id: "eg3", category: "grammar", exam: ["sat", "psat", "act"], question: "Apostrophe for plural possessives ending in s?", correctAnswer: "s' (e.g., dogs' toys)", wrongAnswers: ["'s", "s", "s's"] },
  { id: "eg4", category: "grammar", exam: ["sat", "psat", "act"], question: "Non-restrictive clauses are set off by:", correctAnswer: "commas or dashes", wrongAnswers: ["semicolons", "colons", "periods"] },
  { id: "eg5", category: "grammar", exam: ["sat", "psat", "act"], question: "Singular possessive uses:", correctAnswer: "'s (e.g., dog's bone)", wrongAnswers: ["s'", "s", "No apostrophe"] },
  { id: "eg6", category: "grammar", exam: ["sat", "psat", "act"], question: "Who for people, _____ for things.", correctAnswer: "that / which", wrongAnswers: ["who", "whom", "whose"] },
  { id: "eg7", category: "grammar", exam: ["sat", "psat", "act"], question: "Run-on sentences are fixed by:", correctAnswer: "semicolon, period, or conjunction", wrongAnswers: ["comma only", "no punctuation", "dash only"] },
  { id: "eg8", category: "grammar", exam: ["sat", "psat", "act"], question: "Comma before coordinating conjunction in compound sentence?", correctAnswer: "Yes (FANBOYS)", wrongAnswers: ["No", "Only in lists", "Never"] },
  { id: "eg9", category: "grammar", exam: ["sat", "psat", "act"], question: "Their/there/they're: 'there' means?", correctAnswer: "a place (There it is.)", wrongAnswers: ["they are", "possessive", "direction"] },
  { id: "eg10", category: "grammar", exam: ["sat", "psat", "act"], question: "Than for _____, then for time.", correctAnswer: "comparisons", wrongAnswers: ["sequences", "additions", "subtractions"] },
  { id: "eg11", category: "grammar", exam: ["sat", "psat", "act"], question: "A sentence fragment lacks:", correctAnswer: "an independent clause", wrongAnswers: ["a noun", "a verb", "an adjective"] },
  { id: "eg12", category: "grammar", exam: ["sat", "psat", "act"], question: "Use dashes for:", correctAnswer: "emphasis or appositives", wrongAnswers: ["lists", "quotes", "questions"] },
  { id: "eg13", category: "grammar", exam: ["sat", "psat", "act"], question: "To/too/two: 'too' means?", correctAnswer: "also or excess", wrongAnswers: ["direction", "number", "toward"] },
  { id: "eg14", category: "grammar", exam: ["sat", "psat", "act"], question: "Could of is _____ (correct form: could have).", correctAnswer: "always wrong", wrongAnswers: ["sometimes correct", "informal but fine", "British English"] },
  { id: "eg15", category: "grammar", exam: ["sat", "psat", "act"], question: "Lie vs. lay: 'lie' means (no object):", correctAnswer: "to recline", wrongAnswers: ["to place", "to sit", "to stand"] },
  { id: "eg16", category: "grammar", exam: ["sat", "psat", "act"], question: "Redundancy should be:", correctAnswer: "removed for conciseness", wrongAnswers: ["kept for emphasis", "added for clarity", "ignored"] },

  // ══════════════════════════════════════════
  // ACT-SPECIFIC MATH — advanced topics
  // ══════════════════════════════════════════
  { id: "am1", category: "math", exam: ["act"], question: "log_b(xy) = ?", correctAnswer: "log_b x + log_b y", wrongAnswers: ["log_b x × log_b y", "log_b x − log_b y", "log_b(x/y)"] },
  { id: "am2", category: "math", exam: ["act"], question: "Probability of independent events A and B?", correctAnswer: "P(A) × P(B)", wrongAnswers: ["P(A) + P(B)", "P(A)/P(B)", "1 − P(A)P(B)"] },
  { id: "am3", category: "math", exam: ["act"], question: "Trapezoid area?", correctAnswer: "(a + b)/2 × h", wrongAnswers: ["(a × b)/2 × h", "a + b + h", "√(a² + b²) × h"] },
  { id: "am4", category: "math", exam: ["act", "sat", "psat"], question: "sin²θ + cos²θ = ?", correctAnswer: "1", wrongAnswers: ["0", "sinθ cosθ", "tan²θ"] },
  { id: "am5", category: "math", exam: ["act"], question: "Combinations C(n,k) = ?", correctAnswer: "n! / (k!(n−k)!)", wrongAnswers: ["n! / k!", "P(n,k) / k!", "nᵏ"] },
  { id: "am6", category: "math", exam: ["act"], question: "Parallelogram area?", correctAnswer: "base × height", wrongAnswers: ["(b₁ + b₂)/2 × h", "perimeter × height", "diagonal²"] },
  { id: "am7", category: "math", exam: ["act"], question: "sec θ = ?", correctAnswer: "1 / cos θ", wrongAnswers: ["1 / sin θ", "tan θ", "cot θ"] },
  { id: "am8", category: "math", exam: ["act"], question: "log_b x = y means:", correctAnswer: "bʸ = x", wrongAnswers: ["xʸ = b", "bˣ = y", "yᵇ = x"] },
  { id: "am9", category: "math", exam: ["act"], question: "tan θ = ? (identity)", correctAnswer: "sin θ / cos θ", wrongAnswers: ["cos θ / sin θ", "1 / sin θ", "1 / cos θ"] },
  { id: "am10", category: "math", exam: ["act"], question: "Permutations P(n,k) = ?", correctAnswer: "n! / (n−k)!", wrongAnswers: ["n! / (k!(n−k)!)", "nᵏ", "kⁿ"] },
  { id: "am11", category: "math", exam: ["act"], question: "csc θ = ?", correctAnswer: "1 / sin θ", wrongAnswers: ["1 / cos θ", "sin θ / cos θ", "cos θ / sin θ"] },
  { id: "am12", category: "math", exam: ["act"], question: "cot θ = ?", correctAnswer: "1 / tan θ (or cos θ / sin θ)", wrongAnswers: ["tan θ", "sin θ / cos θ", "1 / cos θ"] },
  { id: "am13", category: "math", exam: ["act"], question: "P(at least one) = ?", correctAnswer: "1 − P(none)", wrongAnswers: ["P(A) + P(B)", "P(A) × P(B)", "P(A)/P(B)"] },
  { id: "am14", category: "math", exam: ["act", "sat", "psat"], question: "Volume of a cone?", correctAnswer: "(1/3)πr²h", wrongAnswers: ["πr²h", "(4/3)πr³", "(1/3)lwh"] },
  { id: "am15", category: "math", exam: ["act"], question: "Volume of a pyramid?", correctAnswer: "(1/3)lwh", wrongAnswers: ["lwh", "(1/3)πr²h", "(4/3)πr³"] },
  { id: "am16", category: "math", exam: ["act"], question: "log_b(x/y) = ?", correctAnswer: "log_b x − log_b y", wrongAnswers: ["log_b x + log_b y", "log_b x / log_b y", "log_b y − log_b x"] },
  { id: "am17", category: "math", exam: ["act"], question: "Lateral surface area of a cylinder?", correctAnswer: "2πrh", wrongAnswers: ["πr²h", "2πr", "πr²"] },
  { id: "am18", category: "math", exam: ["act"], question: "Ellipse standard equation?", correctAnswer: "(x−h)²/a² + (y−k)²/b² = 1", wrongAnswers: ["(x−h)² + (y−k)² = r²", "x² + y² = 1", "y = ax² + bx + c"] },
  { id: "am19", category: "math", exam: ["act", "sat"], question: "i² = ? (imaginary unit)", correctAnswer: "−1", wrongAnswers: ["1", "0", "i"] },
  { id: "am20", category: "math", exam: ["act"], question: "2×2 matrix determinant [[a,b],[c,d]]?", correctAnswer: "ad − bc", wrongAnswers: ["a + d", "ac + bd", "ab − cd"] },

  // ══════════════════════════════════════════
  // ACT-SPECIFIC ENGLISH
  // ══════════════════════════════════════════
  { id: "ae1", category: "grammar", exam: ["act"], question: "Subject pronouns (I, he, she, we, they) are for:", correctAnswer: "the doer of the action", wrongAnswers: ["the receiver", "possession", "location"] },
  { id: "ae2", category: "grammar", exam: ["act", "sat", "psat"], question: "Semicolon with conjunctive adverb: '; however,'?", correctAnswer: "Yes — semicolon before, comma after", wrongAnswers: ["Comma only", "Period only", "Colon"] },
  { id: "ae3", category: "grammar", exam: ["act"], question: "Faulty comparison: always compare:", correctAnswer: "like to like (apples to apples)", wrongAnswers: ["fruits to colors", "people to animals", "ideas to facts"] },
  { id: "ae4", category: "grammar", exam: ["act"], question: "Idiom: 'interested _____'", correctAnswer: "in", wrongAnswers: ["on", "at", "for"] },
  { id: "ae5", category: "grammar", exam: ["act", "sat", "psat"], question: "Sentences must _____ the paragraph's topic.", correctAnswer: "support / be relevant to", wrongAnswers: ["contradict", "ignore", "repeat"] },
  { id: "ae6", category: "grammar", exam: ["act", "sat", "psat"], question: "Tone must match the passage's _____ level.", correctAnswer: "formality", wrongAnswers: ["volume", "length", "voice"] },
  { id: "ae7", category: "grammar", exam: ["act", "sat", "psat"], question: "Effect is usually a _____, affect is usually a _____.", correctAnswer: "noun, verb", wrongAnswers: ["verb, noun", "adjective, adverb", "verb, verb"] },
  { id: "ae8", category: "grammar", exam: ["act", "sat", "psat"], question: "Comparisons: use more/less for 2, most/least for:", correctAnswer: "3 or more", wrongAnswers: ["always -er", "only adjectives", "adverbs only"] },

  // ══════════════════════════════════════════
  // ACT SCIENCE — all new
  // ══════════════════════════════════════════
  { id: "as1", category: "science", exam: ["act"], question: "Independent variable is:", correctAnswer: "manipulated by the experimenter", wrongAnswers: ["measured outcome", "kept constant", "the control group"] },
  { id: "as2", category: "science", exam: ["act"], question: "Dependent variable is:", correctAnswer: "the measured response/outcome", wrongAnswers: ["the changed input", "kept unchanged", "the hypothesis"] },
  { id: "as3", category: "science", exam: ["act"], question: "Positive correlation: as x ↑, y ___.", correctAnswer: "↑ (increases)", wrongAnswers: ["↓ (decreases)", "stays flat", "is random"] },
  { id: "as4", category: "science", exam: ["act"], question: "Negative correlation: as x ↑, y ___.", correctAnswer: "↓ (decreases)", wrongAnswers: ["↑ (increases)", "stays flat", "forms U shape"] },
  { id: "as5", category: "science", exam: ["act"], question: "Interpolation estimates:", correctAnswer: "within known data points", wrongAnswers: ["beyond data range", "the average", "max and min"] },
  { id: "as6", category: "science", exam: ["act"], question: "Extrapolation predicts:", correctAnswer: "outside the data range", wrongAnswers: ["within known range", "exact values only", "trend reversal"] },
  { id: "as7", category: "science", exam: ["act"], question: "A control variable is:", correctAnswer: "kept constant to isolate effects", wrongAnswers: ["changed each trial", "measured", "hypothesized"] },
  { id: "as8", category: "science", exam: ["act"], question: "Data Representation passages show:", correctAnswer: "graphs, tables, and charts", wrongAnswers: ["experiment descriptions", "competing viewpoints", "hypotheses only"] },
  { id: "as9", category: "science", exam: ["act"], question: "Research Summaries passages describe:", correctAnswer: "experiments and their results", wrongAnswers: ["single graphs", "opinions only", "raw data only"] },
  { id: "as10", category: "science", exam: ["act"], question: "Conflicting Viewpoints passages present:", correctAnswer: "competing hypotheses/theories", wrongAnswers: ["data tables", "procedures only", "predictions only"] },
  { id: "as11", category: "science", exam: ["act"], question: "ACT Science mainly tests:", correctAnswer: "reasoning and data interpretation", wrongAnswers: ["advanced biology facts", "complex equations", "memorized formulas"] },
  { id: "as12", category: "science", exam: ["act"], question: "A steep upward line on a graph shows:", correctAnswer: "strong positive correlation", wrongAnswers: ["weak negative", "no correlation", "constant value"] },
  { id: "as13", category: "science", exam: ["act"], question: "A control group receives:", correctAnswer: "no treatment (baseline)", wrongAnswers: ["full treatment", "average treatment", "the independent variable"] },
  { id: "as14", category: "science", exam: ["act"], question: "A hypothesis is supported if:", correctAnswer: "data matches the prediction", wrongAnswers: ["data contradicts it", "no data exists", "opinion agrees"] },
  { id: "as15", category: "science", exam: ["act"], question: "A scatterplot with random points shows:", correctAnswer: "no correlation", wrongAnswers: ["strong positive", "clustered data", "horizontal trend"] },
  { id: "as16", category: "science", exam: ["act"], question: "To judge experiment validity, look for:", correctAnswer: "consistent results across trials", wrongAnswers: ["one outlier", "bias confirmation", "small sample size"] },
  { id: "as17", category: "science", exam: ["act"], question: "In Conflicting Viewpoints, choose the hypothesis supported by:", correctAnswer: "evidence from the passage", wrongAnswers: ["personal opinion", "majority view", "prediction alone"] },
  { id: "as18", category: "science", exam: ["act"], question: "Adding a new variable to an experiment:", correctAnswer: "tests a new hypothesis", wrongAnswers: ["changes nothing", "removes data", "averages results"] },
];
