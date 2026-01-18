// SAT Key Concepts Database - Enhanced for 1600 Level
// Based on the nuanced, tricky concepts that separate 1550 from 1600

export interface KeyConcept {
  skill: string;
  domain: string;
  keyInsight: string;
  satTip: string;
  commonMistakes: string[];
  advancedTrap?: string; // The nuanced trap that catches even strong students
  level1600Insight?: string; // What separates 1550 from 1600
}

// Math Key Concepts - Enhanced with 1600-level nuances
export const mathKeyConcepts: KeyConcept[] = [
  // === ADVANCED ALGEBRA ===
  {
    skill: "Linear equations in two variables",
    domain: "Algebra",
    keyInsight: "Linear equations can be written as y = mx + b where m is slope and b is y-intercept.",
    satTip: "To find slope from standard form (Ax + By = C), rearrange to slope-intercept form. Slope = -A/B.",
    commonMistakes: ["Forgetting to flip the sign when moving terms", "Confusing slope with y-intercept"],
    advancedTrap: "When given 3x - 6y = 12, students often forget to divide ALL terms by the coefficient of y",
    level1600Insight: "Watch for questions asking about parallel/perpendicular lines - parallel have equal slopes, perpendicular slopes multiply to -1"
  },
  {
    skill: "Linear Functions",
    domain: "Algebra",
    keyInsight: "Slope = rise/run = (y₂ - y₁)/(x₂ - x₁). A positive slope rises left to right.",
    satTip: "Parallel lines have equal slopes. Perpendicular lines have slopes that multiply to -1.",
    commonMistakes: ["Subtracting coordinates in wrong order", "Forgetting perpendicular slopes are negative reciprocals"],
    advancedTrap: "Questions may give equations in non-standard forms - always convert to slope-intercept first",
    level1600Insight: "A horizontal line has slope 0 (not undefined). A vertical line has undefined slope (not 0)."
  },
  {
    skill: "Systems of linear equations",
    domain: "Algebra",
    keyInsight: "Systems have one solution (intersecting lines), no solution (parallel), or infinite solutions (same line).",
    satTip: "Use substitution for simple equations, elimination for matching coefficients.",
    commonMistakes: ["Solving for wrong variable first", "Sign errors during elimination"],
    advancedTrap: "For infinitely many solutions, ALL coefficients must have the same ratio including constant term. 2x + 4y = 6 and 3x + 6y = 9 are the same line.",
    level1600Insight: "When asked 'for what value of k has no solution', set slopes equal but y-intercepts different."
  },
  {
    skill: "Quadratic equations",
    domain: "Algebra",
    keyInsight: "Quadratics have form ax² + bx + c = 0. Solutions: factoring, completing square, or quadratic formula.",
    satTip: "Use discriminant (b² - 4ac): >0 means 2 solutions, =0 means 1 solution, <0 means no real solutions.",
    commonMistakes: ["Forgetting ± in quadratic formula", "Sign errors when factoring"],
    advancedTrap: "b² - 4ac = 0 means the vertex touches the x-axis (one repeated root). This is faster than solving!",
    level1600Insight: "If asked 'how many solutions', use discriminant instead of solving - saves 30+ seconds"
  },
  {
    skill: "Quadratic functions",
    domain: "Algebra",
    keyInsight: "Vertex form y = a(x - h)² + k gives vertex at (h, k). If a > 0, opens up; if a < 0, opens down.",
    satTip: "The axis of symmetry is x = -b/(2a). The vertex is the min or max point.",
    commonMistakes: ["Confusing h with -h in vertex form", "Forgetting a affects direction of opening"],
    advancedTrap: "In y = a(x - h)² + k, the h has OPPOSITE sign: (x + 3)² means h = -3, not +3!",
    level1600Insight: "|a| > 1 makes parabola narrower; |a| < 1 makes it wider. a < 0 flips it upside down."
  },
  {
    skill: "Exponential functions",
    domain: "Algebra",
    keyInsight: "Exponential growth: y = a·bˣ where b > 1 grows, 0 < b < 1 decays.",
    satTip: "For percent increase r, use (1 + r). For percent decrease, use (1 - r).",
    commonMistakes: ["Using wrong base for growth vs decay", "Confusing linear vs exponential growth"],
    advancedTrap: "y = 100(1.05)ᵗ: Growth FACTOR is 1.05, but growth RATE is 0.05 (5%). Questions ask for rate, students give factor!",
    level1600Insight: "Base 0.85 means 15% DECAY (85% remains), not 85% growth. Rate = 1 - base for decay."
  },
  {
    skill: "Compound interest",
    domain: "Algebra",
    keyInsight: "A = P(1 + r/n)^(nt) where n = compounding frequency per year.",
    satTip: "Monthly compounding: n = 12. Quarterly: n = 4. Annual: n = 1.",
    commonMistakes: ["Forgetting to divide r by n", "Using wrong value for n"],
    advancedTrap: "More frequent compounding = slightly more interest. This is why 'monthly' beats 'annual' at same rate.",
    level1600Insight: "If question says 'compounded continuously', use A = Pe^(rt) instead of standard formula."
  },
  {
    skill: "Rational expressions",
    domain: "Advanced Math",
    keyInsight: "Factor numerator and denominator before simplifying. Find common denominators to add.",
    satTip: "Exclude values that make denominator zero from the domain.",
    commonMistakes: ["Canceling terms instead of factors", "Forgetting to check for undefined values"],
    advancedTrap: "(x² - 9)/(x + 3) = x - 3, BUT x ≠ -3. The simplified form KEEPS the original restriction!",
    level1600Insight: "Find restrictions BEFORE simplifying. After simplifying, the restriction still applies even though denominator looks fine."
  },
  {
    skill: "Function composition",
    domain: "Advanced Math",
    keyInsight: "f(g(x)) means apply g first, then f. Work from inside out.",
    satTip: "f(g(x)) ≠ g(f(x)) in general - order matters!",
    commonMistakes: ["Applying functions in wrong order", "Trying to 'distribute' composition"],
    advancedTrap: "If f(x) = x² and g(x) = x + 1: f(g(x)) = (x+1)² = x² + 2x + 1, but g(f(x)) = x² + 1. Different answers!",
    level1600Insight: "For inverse functions: if f(3) = 7, then f⁻¹(7) = 3. Inverse SWAPS input and output."
  },
  {
    skill: "Domain restrictions",
    domain: "Advanced Math",
    keyInsight: "Can't have: division by zero, square root of negative, log of non-positive.",
    satTip: "Set denominator ≠ 0, set radicand ≥ 0 for even roots.",
    commonMistakes: ["Forgetting to check all restrictions", "Only checking one type of restriction"],
    advancedTrap: "√(x-5) requires x ≥ 5. Even roots of negatives are undefined. Odd roots (like ∛) can have negative inputs.",
    level1600Insight: "Find restrictions BEFORE simplifying expressions. A simplified form may hide original restrictions."
  },
  {
    skill: "Function transformations",
    domain: "Advanced Math",
    keyInsight: "Inside changes affect x (horizontal), outside changes affect y (vertical).",
    satTip: "f(x + 2) shifts LEFT 2 units (opposite!). f(x) + 2 shifts UP 2 units (same direction).",
    commonMistakes: ["Horizontal shifts go opposite direction of sign", "Confusing stretches with shifts"],
    advancedTrap: "Inside = opposite, outside = same direction. f(x + 2) is LEFT, f(x - 2) is RIGHT. a·f(x) stretches vertically.",
    level1600Insight: "Horizontal transformations inside parentheses always work OPPOSITE to intuition."
  },
  // === STATISTICS ===
  {
    skill: "Percentages",
    domain: "Problem Solving",
    keyInsight: "Percent = (Part/Whole) × 100. Percent change = (New - Old)/Old × 100.",
    satTip: "Convert percentages to decimals by dividing by 100 before multiplying.",
    commonMistakes: ["Using wrong denominator for percent change", "Confusing percent of vs percent increase"],
    advancedTrap: "Increase 20% then decrease 20% does NOT return to start! 100 → 120 → 96. Percentages apply to CURRENT value.",
    level1600Insight: "To return to original after X% increase, you need to decrease by X/(1+X) percent, not X%."
  },
  {
    skill: "Statistics",
    domain: "Problem Solving",
    keyInsight: "Mean = sum/count, Median = middle value, Mode = most frequent, Range = max - min.",
    satTip: "IQR = Q3 - Q1. Outliers are typically beyond 1.5 × IQR from the quartiles.",
    commonMistakes: ["Forgetting to sort data for median", "Confusing range with IQR"],
    advancedTrap: "Mean is affected by outliers (pulled toward extremes). Median is resistant. If skewed right, mean > median.",
    level1600Insight: "Standard deviation measures SPREAD, not center. SD = 0 means all values are identical."
  },
  {
    skill: "Standard deviation",
    domain: "Problem Solving",
    keyInsight: "SD measures spread/variability. Larger SD = more spread out data.",
    satTip: "Two datasets can have same mean but very different standard deviations.",
    commonMistakes: ["Confusing SD with mean", "Thinking larger values mean larger SD"],
    advancedTrap: "Adding/subtracting same constant to all values: SD stays same! Multiplying all values: SD multiplies too.",
    level1600Insight: "If asked which dataset has larger SD, look for more spread from center, not larger numbers."
  },
  {
    skill: "Probability",
    domain: "Problem Solving",
    keyInsight: "P(event) = favorable outcomes / total outcomes. Always between 0 and 1.",
    satTip: "For 'or' problems, add probabilities. For 'and' problems, multiply.",
    commonMistakes: ["Forgetting to subtract overlap for 'or' with non-mutually exclusive events"],
    advancedTrap: "Correlation does NOT imply causation! Ice cream sales and drowning deaths correlate (both increase in summer).",
    level1600Insight: "When SAT asks 'what can be concluded', the answer is usually limited. Avoid causal claims from correlational data."
  },
  {
    skill: "Margin of error",
    domain: "Problem Solving",
    keyInsight: "Margin of error decreases as sample size increases.",
    satTip: "Margin of error ∝ 1/√n. Quadruple sample size to halve margin of error.",
    commonMistakes: ["Thinking double sample = half error", "Confusing sample size with population size"],
    advancedTrap: "To halve margin of error: need 4× sample size. To cut by ⅓: need 9× sample size. It's NOT linear!",
    level1600Insight: "Larger sample decreases margin of error but does NOT change the mean estimate."
  },
  {
    skill: "Correlation vs causation",
    domain: "Problem Solving",
    keyInsight: "Correlation shows relationship; causation proves one thing causes another.",
    satTip: "SAT loves asking 'what can be concluded' - answer is usually very limited!",
    commonMistakes: ["Assuming correlation means causation", "Ignoring confounding variables"],
    advancedTrap: "Example: ice cream sales and drowning correlate. Reason: both increase in summer (confounding variable).",
    level1600Insight: "On inference questions, choose the most CONSERVATIVE answer. Avoid claims about causation."
  },
  // === GEOMETRY & TRIGONOMETRY ===
  {
    skill: "Area and volume",
    domain: "Geometry",
    keyInsight: "Know key formulas: Circle area = πr², Triangle = ½bh, Cylinder volume = πr²h.",
    satTip: "Most formulas are given on the SAT reference sheet - know where to find them!",
    commonMistakes: ["Confusing radius with diameter", "Forgetting to square the radius"],
    advancedTrap: "For similar figures: area scales by k², volume scales by k³. If sides double, area quadruples!",
    level1600Insight: "When figures are similar with scale factor k: perimeter × k, area × k², volume × k³."
  },
  {
    skill: "Right triangles",
    domain: "Geometry",
    keyInsight: "Pythagorean theorem: a² + b² = c². Know special triangles: 45-45-90 and 30-60-90.",
    satTip: "In 30-60-90: sides are x, x√3, 2x (short leg, long leg, hypotenuse).",
    commonMistakes: ["Applying Pythagorean theorem to non-right triangles", "Mixing up leg vs hypotenuse"],
    advancedTrap: "45-45-90: legs are equal, hypotenuse = leg × √2. 30-60-90: opposite 30° is shortest side.",
    level1600Insight: "These ratios appear CONSTANTLY. Memorize them cold: 1:1:√2 and 1:√3:2."
  },
  {
    skill: "Trigonometry",
    domain: "Geometry",
    keyInsight: "SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.",
    satTip: "sin(θ) = cos(90° - θ). Complementary angles have this relationship.",
    commonMistakes: ["Confusing which side is opposite vs adjacent", "Forgetting SOH-CAH-TOA order"],
    advancedTrap: "sin(30°) = cos(60°). If sin(x) = cos(y), then x + y = 90°. This saves calculation time!",
    level1600Insight: "Complementary angle relationships: sin(x) = cos(90° - x), tan(x) × tan(90° - x) = 1."
  },
  {
    skill: "Circles",
    domain: "Geometry",
    keyInsight: "Circle equation: (x - h)² + (y - k)² = r² with center (h, k) and radius r.",
    satTip: "Arc length = (θ/360°) × 2πr. Sector area = (θ/360°) × πr².",
    commonMistakes: ["Confusing r with r² in equation", "Using diameter instead of radius"],
    advancedTrap: "(x + 3)² + (y - 2)² = 25: Center is (-3, 2) [opposite signs!], radius is 5 [√25].",
    level1600Insight: "Same sign reversal as vertex form. The h and k in formula have OPPOSITE signs from what you see."
  },
  {
    skill: "Radians",
    domain: "Geometry",
    keyInsight: "π radians = 180°. Radians measure arc length on unit circle.",
    satTip: "Common conversions: π/2 = 90°, π/3 = 60°, π/4 = 45°, π/6 = 30°.",
    commonMistakes: ["Mixing up radian and degree mode on calculator", "Not converting before calculations"],
    advancedTrap: "Calculator in wrong mode is a common error. Double-check mode before trig calculations!",
    level1600Insight: "Memorize these cold: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°, π = 180°."
  },
  // === WORD PROBLEMS ===
  {
    skill: "Rate problems",
    domain: "Problem Solving",
    keyInsight: "Distance = Rate × Time. Work = Rate × Time.",
    satTip: "When two people work together, ADD their rates, not their times!",
    commonMistakes: ["Adding times instead of rates", "Setting up distance formula incorrectly"],
    advancedTrap: "A does job in 3 hrs (rate = ⅓), B in 6 hrs (rate = ⅙). Together: ⅓ + ⅙ = ½ → 2 hours. NOT 4.5 hours!",
    level1600Insight: "Convert times to rates first, add rates, then convert back to time. Never average times directly."
  },
  {
    skill: "Mixture problems",
    domain: "Problem Solving",
    keyInsight: "Amount of substance = concentration × volume. Track the pure substance amount.",
    satTip: "Set up equation: (conc₁ × vol₁) + (conc₂ × vol₂) = (final conc) × (total vol).",
    commonMistakes: ["Averaging percentages without considering volumes", "Forgetting to track what's being mixed"],
    advancedTrap: "Mix 10L of 20% with 20L of 50%: (0.2×10) + (0.5×20) = 2 + 10 = 12L pure in 30L → 40%, NOT 35%!",
    level1600Insight: "When volumes are different, you can't just average percentages. Weight by volume!"
  },
  {
    skill: "Ratios and proportions",
    domain: "Problem Solving",
    keyInsight: "Cross-multiply to solve proportions: a/b = c/d means ad = bc.",
    satTip: "Set up ratios carefully - make sure units match on both sides.",
    commonMistakes: ["Setting up ratio backwards", "Not simplifying before solving"],
    advancedTrap: "In similar triangles, corresponding sides have equal ratios. Use this to find unknown sides.",
    level1600Insight: "Part:Part vs Part:Whole ratios are different! 3:5 ratio means 3/8 and 5/8 of whole."
  },
  // === NONLINEAR SYSTEMS ===
  {
    skill: "Nonlinear systems",
    domain: "Advanced Math",
    keyInsight: "Circle + line or parabola + line systems can have 0, 1, or 2 solutions.",
    satTip: "Substitute the linear equation into the quadratic, then use discriminant.",
    commonMistakes: ["Missing extraneous roots", "Forgetting to check solutions in original equations"],
    advancedTrap: "Use discriminant to count solutions without solving! D > 0: 2 intersections, D = 0: tangent, D < 0: no intersection.",
    level1600Insight: "For line tangent to parabola/circle: set up system, substitute, and solve for when D = 0."
  },
  {
    skill: "Polynomial operations",
    domain: "Advanced Math",
    keyInsight: "When dividing polynomials, use long division or synthetic division.",
    satTip: "Factor theorem: If f(a) = 0, then (x - a) is a factor of f(x).",
    commonMistakes: ["Sign errors in polynomial long division", "Forgetting to include zero coefficients"],
    advancedTrap: "Remainder theorem: f(a) = remainder when dividing f(x) by (x - a). Use this to find remainders fast!",
    level1600Insight: "To test if (x - 3) is a factor, just check if f(3) = 0. No need to actually divide."
  },
  {
    skill: "Complex numbers",
    domain: "Advanced Math",
    keyInsight: "i² = -1. Powers of i cycle: i, i², i³, i⁴ = i, -1, -i, 1, then repeats.",
    satTip: "To divide by complex number, multiply top and bottom by conjugate.",
    commonMistakes: ["Forgetting i² = -1 when multiplying", "Not simplifying powers of i"],
    advancedTrap: "To find i^47: 47 ÷ 4 = 11 remainder 3. So i^47 = i³ = -i. Use the cycle!",
    level1600Insight: "Conjugate of (a + bi) is (a - bi). Product of complex number and its conjugate is always real: a² + b²."
  },
  {
    skill: "Absolute value",
    domain: "Advanced Math",
    keyInsight: "|x| = a means x = a OR x = -a. |x| represents distance from zero.",
    satTip: "Split absolute value equations into two cases and solve each.",
    commonMistakes: ["Forgetting the negative case", "Not checking solutions in original equation"],
    advancedTrap: "|x - 3| < 5 means -5 < x - 3 < 5, so -2 < x < 8. Inequality splits into AND (for <) not OR (for >).",
    level1600Insight: "|a| < b becomes -b < a < b (AND). |a| > b becomes a < -b OR a > b."
  },
  {
    skill: "Sequences",
    domain: "Advanced Math",
    keyInsight: "Arithmetic: aₙ = a₁ + (n-1)d. Geometric: aₙ = a₁ × r^(n-1).",
    satTip: "Find common difference (arithmetic) or ratio (geometric) from consecutive terms.",
    commonMistakes: ["Confusing arithmetic vs geometric sequences", "Using wrong formula for nth term"],
    advancedTrap: "Sum formulas: Arithmetic: Sₙ = n(a₁ + aₙ)/2. Geometric: Sₙ = a₁(1 - rⁿ)/(1 - r).",
    level1600Insight: "For geometric with |r| < 1, infinite sum = a₁/(1 - r). This is tested on hard questions."
  }
];

// English Key Concepts - Enhanced with 1600-level nuances
export const englishKeyConcepts: KeyConcept[] = [
  // === GRAMMAR - SUBTLE ERRORS ===
  {
    skill: "Subject-verb agreement",
    domain: "Standard English Conventions",
    keyInsight: "The subject and verb must agree in number. Ignore phrases between them.",
    satTip: "Look for the TRUE subject, not words in prepositional phrases or relative clauses.",
    commonMistakes: ["Getting distracted by intervening phrases", "Collective nouns can be singular or plural"],
    advancedTrap: "'The team, along with its coach, WAS celebrating.' Subject is 'team' (singular), not 'team and coach'.",
    level1600Insight: "Mentally delete everything between subject and verb. 'The box of chocolates IS' not 'ARE'."
  },
  {
    skill: "Pronoun-antecedent agreement",
    domain: "Standard English Conventions",
    keyInsight: "Pronouns must agree with their antecedents in number and gender.",
    satTip: "'Everyone', 'anyone', 'each', 'every' are SINGULAR and take singular pronouns.",
    commonMistakes: ["Using 'they' for singular antecedents in formal writing", "Unclear antecedent reference"],
    advancedTrap: "'Each student must bring THEIR book' is wrong! 'Each' is singular → 'his or her book'.",
    level1600Insight: "Indefinite pronouns (each, every, anyone, everyone, someone) are ALWAYS singular."
  },
  {
    skill: "Verb tense consistency",
    domain: "Standard English Conventions",
    keyInsight: "Maintain consistent verb tense unless there's a logical reason to shift.",
    satTip: "Look at surrounding sentences to determine the correct tense.",
    commonMistakes: ["Unnecessary tense shifts within a sentence", "Confusing simple past with present perfect"],
    advancedTrap: "Past perfect (had done) shows action completed BEFORE another past action. Don't overuse it.",
    level1600Insight: "Tense shifts are okay when timeline changes: 'He studied [past] and now he knows [present].'"
  },
  {
    skill: "Punctuation",
    domain: "Standard English Conventions",
    keyInsight: "Semicolon connects two COMPLETE sentences. Colon must follow a complete sentence.",
    satTip: "Comma + FANBOYS can join two independent clauses. Comma alone creates a comma splice (wrong).",
    commonMistakes: ["Comma splices (using comma to join two sentences)", "Missing comma after introductory phrases"],
    advancedTrap: "'Because I studied; I passed' is WRONG! 'Because I studied' is dependent, can't use semicolon.",
    level1600Insight: "Both sides of semicolon must be complete sentences. Colon must have complete sentence BEFORE it."
  },
  {
    skill: "Semicolons",
    domain: "Standard English Conventions",
    keyInsight: "Semicolons connect two independent clauses OR separate items in a list that contains commas.",
    satTip: "If you can replace semicolon with period, semicolon is correct.",
    commonMistakes: ["Using semicolon before dependent clause", "Not recognizing list use"],
    advancedTrap: "Complex lists: 'Cities included Paris, France; London, England; and Tokyo, Japan.'",
    level1600Insight: "Test: replace semicolon with period. If both parts are complete sentences, semicolon works."
  },
  {
    skill: "Colons",
    domain: "Standard English Conventions",
    keyInsight: "Colon introduces explanation, list, or elaboration. MUST have complete sentence before it.",
    satTip: "'I need three things: milk, eggs, bread' is correct. 'I need: milk, eggs' is WRONG.",
    commonMistakes: ["Using colon after incomplete sentence", "Using colon after 'such as' or 'including'"],
    advancedTrap: "What comes before colon must be able to stand alone as a sentence.",
    level1600Insight: "Never use colon after a verb or preposition. 'The supplies include:' is WRONG."
  },
  {
    skill: "Em-dashes",
    domain: "Standard English Conventions",
    keyInsight: "Em-dash (—) sets off information for emphasis, like parentheses but stronger.",
    satTip: "Pair of em-dashes works like parentheses: 'The solution—a simple change—saved millions.'",
    commonMistakes: ["Using single dash when pair is needed", "Confusing em-dash with hyphen"],
    advancedTrap: "If you open with em-dash, you must close with em-dash (or end of sentence).",
    level1600Insight: "Em-dash = MORE emphatic than parentheses or commas. Use for dramatic interruption."
  },
  {
    skill: "Apostrophes",
    domain: "Standard English Conventions",
    keyInsight: "Its = possessive. It's = 'it is'. Possessive pronouns NEVER have apostrophes.",
    satTip: "Your/you're, their/there/they're, its/it's - expand contractions to check.",
    commonMistakes: ["Adding apostrophe to possessive pronouns", "Confusing contractions with possessives"],
    advancedTrap: "'Its' (no apostrophe) = possessive. 'It's' = 'it is'. Opposite of nouns!",
    level1600Insight: "Possessive pronouns (its, yours, theirs, ours, whose) NEVER take apostrophes."
  },
  {
    skill: "Sentence structure",
    domain: "Standard English Conventions",
    keyInsight: "A complete sentence needs a subject and verb. Avoid run-ons and fragments.",
    satTip: "Check for complete thoughts. Look for FANBOYS (for, and, nor, but, or, yet, so) in compound sentences.",
    commonMistakes: ["Run-on sentences", "Sentence fragments starting with 'which' or 'because'"],
    advancedTrap: "'The test was hard, I studied for hours' is a comma splice. Need semicolon, period, or conjunction.",
    level1600Insight: "Comma alone CANNOT join two complete sentences. Must add conjunction or use semicolon/period."
  },
  {
    skill: "Parallel structure",
    domain: "Standard English Conventions",
    keyInsight: "Items in a list or comparison should have the same grammatical form.",
    satTip: "Check lists and comparisons for matching forms: all nouns, all verbs, all phrases.",
    commonMistakes: ["Mixing gerunds and infinitives in lists", "Inconsistent verb forms in series"],
    advancedTrap: "'I like reading, to write, and hiking' is WRONG. Must be: 'reading, writing, and hiking' OR 'to read, to write, and to hike'.",
    level1600Insight: "Scan lists for form consistency. All gerunds, all infinitives, or all nouns."
  },
  {
    skill: "Modifier placement",
    domain: "Standard English Conventions",
    keyInsight: "Modifiers should be placed next to the word they modify. Misplaced modifiers create confusion.",
    satTip: "Dangling modifiers at sentence beginning should describe the sentence's subject.",
    commonMistakes: ["Dangling modifiers", "Squinting modifiers that could modify either of two words"],
    advancedTrap: "'Running down the street, the car nearly hit me' is WRONG (car wasn't running!). Should be: 'Running down the street, I was nearly hit by the car.'",
    level1600Insight: "Opening modifier MUST describe the sentence subject. Check what immediately follows the comma."
  },
  // === TRANSITIONS AND LOGIC ===
  {
    skill: "Transitions",
    domain: "Expression of Ideas",
    keyInsight: "Transitions show relationships: addition, contrast, cause/effect, sequence, or example.",
    satTip: "Read sentences before AND after to determine the logical relationship.",
    commonMistakes: ["Using 'however' when no contrast exists", "Missing transitions between paragraphs"],
    advancedTrap: "Contrast: however, nevertheless, yet. Cause/effect: therefore, thus, consequently. Addition: moreover, furthermore.",
    level1600Insight: "First identify the RELATIONSHIP between ideas, THEN pick the transition. Not the other way around."
  },
  {
    skill: "Subtle transitions",
    domain: "Expression of Ideas",
    keyInsight: "Different transitions have different strengths and shades of meaning.",
    satTip: "'However' = general contrast. 'Nevertheless' = contrast despite expectation. 'On the other hand' = presenting alternative.",
    commonMistakes: ["Using strongest contrast for mild disagreement", "Treating all contrast words as identical"],
    advancedTrap: "If two choices mean almost the same thing (e.g., 'Moreover' and 'Furthermore'), they're probably BOTH wrong!",
    level1600Insight: "Sometimes DELETE is the right answer. If ideas flow naturally, transition may be redundant."
  },
  {
    skill: "Conciseness",
    domain: "Expression of Ideas",
    keyInsight: "Eliminate redundancy and wordiness. Shorter is often better on the SAT.",
    satTip: "If two answer choices say the same thing, the shorter one is usually correct.",
    commonMistakes: ["Using wordy phrases like 'due to the fact that' instead of 'because'"],
    advancedTrap: "Common redundancies: 'past history' (just 'history'), 'completely unanimous' (just 'unanimous').",
    level1600Insight: "'Because' beats 'due to the fact that'. 'Although' beats 'despite the fact that'. Shorter wins!"
  },
  {
    skill: "Logical sequence",
    domain: "Expression of Ideas",
    keyInsight: "Sentences and paragraphs should flow in a logical order.",
    satTip: "Look for pronouns, transitions, and topic continuity to determine order.",
    commonMistakes: ["Placing sentences that break logical flow", "Ignoring pronoun references"],
    advancedTrap: "If a sentence uses 'this idea' or 'these results', the previous sentence must introduce them.",
    level1600Insight: "Follow the chain: concept introduced → concept discussed → conclusion. No jumping around."
  },
  {
    skill: "Add/delete decisions",
    domain: "Expression of Ideas",
    keyInsight: "Add if it provides NEW, RELEVANT information. Delete if redundant or off-topic.",
    satTip: "Ask: 'Does this strengthen the argument?' and 'Is this already stated elsewhere?'",
    commonMistakes: ["Keeping interesting but irrelevant details", "Adding information already implied"],
    advancedTrap: "If sentence sounds good but repeats what's already said, DELETE it. Relevance beats interest.",
    level1600Insight: "The best detail is SPECIFIC and DIRECTLY supports the main point. Vague = weak = delete."
  },
  // === READING COMPREHENSION ===
  {
    skill: "Main idea",
    domain: "Reading",
    keyInsight: "The main idea is the central message or purpose of the passage.",
    satTip: "Check the first and last paragraphs. The main idea is often stated or summarized there.",
    commonMistakes: ["Choosing too narrow or too broad a statement", "Confusing a detail with main idea"],
    advancedTrap: "Main idea = what the WHOLE passage is about, not just one paragraph or interesting detail.",
    level1600Insight: "Central idea vs supporting detail: Main idea appears multiple times/ways; details appear once."
  },
  {
    skill: "Inference",
    domain: "Reading",
    keyInsight: "Inferences are conclusions based on evidence in the text, not directly stated.",
    satTip: "The correct answer must be supported by specific text evidence.",
    commonMistakes: ["Making assumptions not supported by text", "Choosing answers that are too extreme"],
    advancedTrap: "Choose inference requiring FEWEST assumptions. 'Sales and advertising are associated' beats 'advertising caused sales increase.'",
    level1600Insight: "SAT wants minimal, defensible inferences. Avoid logical leaps. Stick close to text."
  },
  {
    skill: "Implied vs stated",
    domain: "Reading",
    keyInsight: "Stated = explicitly written. Implied = suggested but not directly said.",
    satTip: "For inference questions, look for what text IMPLIES, not what it directly states.",
    commonMistakes: ["Choosing restatement when inference is asked", "Making unsupported logical leaps"],
    advancedTrap: "'Though the budget was limited, the team completed the project' → Implied: team was resourceful. NOT stated: budget should have been larger.",
    level1600Insight: "Inference questions want IMPLICATIONS. But the implication must be STRONGLY supported by text."
  },
  {
    skill: "Word in context",
    domain: "Reading",
    keyInsight: "Determine meaning from how the word is used in the passage, not just dictionary definition.",
    satTip: "Substitute each answer choice into the sentence to test which fits best.",
    commonMistakes: ["Choosing the most common meaning without checking context"],
    advancedTrap: "Words have shades of meaning: 'cheap' (negative) vs 'inexpensive' (neutral) vs 'economical' (positive).",
    level1600Insight: "Connotation matters. Context determines positive/negative/neutral shade of meaning."
  },
  {
    skill: "Author's purpose",
    domain: "Reading",
    keyInsight: "Authors write to inform, persuade, entertain, or explain. Identify which.",
    satTip: "Look at word choice and tone to determine the author's attitude and purpose.",
    commonMistakes: ["Confusing author's purpose with passage content", "Missing persuasive elements"],
    advancedTrap: "Function questions: What does this sentence DO? Present claim, offer evidence, acknowledge counterargument, provide example.",
    level1600Insight: "Think about argument STRUCTURE, not just content. What ROLE does each part play?"
  },
  {
    skill: "Text structure",
    domain: "Reading",
    keyInsight: "Common structures: chronological, compare/contrast, cause/effect, problem/solution.",
    satTip: "Signal words indicate structure: 'however' (contrast), 'because' (cause/effect).",
    commonMistakes: ["Missing structural transitions", "Not recognizing the overall organization"],
    advancedTrap: "A paragraph can do multiple things, but one is PRIMARY. Focus on what gets most space/attention.",
    level1600Insight: "Identify the 'skeleton' of the argument: claim → evidence → reasoning → (counterargument) → conclusion."
  },
  {
    skill: "Evidence and support",
    domain: "Expression of Ideas",
    keyInsight: "Claims need supporting evidence. Examples should directly relate to the main point.",
    satTip: "The best supporting detail is specific and directly addresses the claim.",
    commonMistakes: ["Choosing vague support over specific examples", "Adding irrelevant details"],
    advancedTrap: "Best evidence is most DIRECT and COMPLETE. Multiple quotes might support claim, but one is STRONGEST.",
    level1600Insight: "Match evidence SCOPE to claim scope. Broad claim needs general evidence; specific claim needs specific data."
  },
  {
    skill: "Quantitative synthesis",
    domain: "Reading",
    keyInsight: "Integrate data from charts/tables with passage claims. Watch for mismatches.",
    satTip: "Cross-check every number and claim. Don't assume trend without evidence.",
    commonMistakes: ["Reading chart incorrectly", "Assuming causation from correlation"],
    advancedTrap: "The data point must SPECIFICALLY support the claim, not just be from the same topic area.",
    level1600Insight: "Choose data point that BEST supports claim, not just any related data. Ignore true-but-irrelevant info."
  },
  {
    skill: "Tone and style",
    domain: "Expression of Ideas",
    keyInsight: "Match the tone and formality of the passage. Academic passages need formal language.",
    satTip: "Avoid slang, colloquialisms, and overly casual language in formal passages.",
    commonMistakes: ["Using informal language in academic contexts", "Being overly complex when simple is better"],
    advancedTrap: "Assert (confident) vs suggest (indicate indirectly) vs imply (hint) vs state (explicit). Strength matters!",
    level1600Insight: "Pay attention to STRENGTH and DIRECTNESS of language. Each word choice has a precise meaning."
  },
  // === RHETORICAL ANALYSIS ===
  {
    skill: "Rhetorical purpose",
    domain: "Reading",
    keyInsight: "Consider WHY the author included specific sentences, paragraphs, or examples.",
    satTip: "Common purposes: introduce claim, provide evidence, address counterargument, transition, conclude.",
    commonMistakes: ["Describing WHAT sentence says instead of what it DOES", "Missing rhetorical function"],
    advancedTrap: "Function of a sentence: What ROLE does it play? Present claim? Offer evidence? Acknowledge counterargument?",
    level1600Insight: "Think about argument structure, not just content. Each sentence has a PURPOSE in the argument."
  },
  {
    skill: "Comparing passages",
    domain: "Reading",
    keyInsight: "Authors can agree on facts but disagree on interpretation/conclusion.",
    satTip: "Look for common ground AND differences. They might agree on some things.",
    commonMistakes: ["Saying authors disagree about everything", "Missing subtle agreements"],
    advancedTrap: "Types of disagreement: factual (different data), interpretive (same facts, different conclusions), methodological (different approach).",
    level1600Insight: "'How would Author 2 respond?' answers must be SUPPORTED by Author 2's text, not your opinion."
  }
];

// Function to find relevant key concept for a question
export function findKeyConcept(skill: string, domain: string, questionType: 'math' | 'english'): KeyConcept | null {
  const concepts = questionType === 'math' ? mathKeyConcepts : englishKeyConcepts;
  
  // Normalize search terms
  const skillLower = skill.toLowerCase();
  const domainLower = domain.toLowerCase();
  
  // Try exact skill match first
  let concept = concepts.find(c => 
    c.skill.toLowerCase() === skillLower
  );
  
  if (!concept) {
    // Try partial skill match
    concept = concepts.find(c => 
      c.skill.toLowerCase().includes(skillLower) ||
      skillLower.includes(c.skill.toLowerCase())
    );
  }
  
  if (!concept) {
    // Try keyword matching
    const skillWords = skillLower.split(/\s+/);
    concept = concepts.find(c => {
      const conceptWords = c.skill.toLowerCase().split(/\s+/);
      return skillWords.some(sw => conceptWords.some(cw => cw.includes(sw) || sw.includes(cw)));
    });
  }
  
  if (!concept) {
    // Try domain match with skill keywords
    concept = concepts.find(c => 
      c.domain.toLowerCase() === domainLower &&
      (c.skill.toLowerCase().includes(skillLower.split(' ')[0]) ||
       skillLower.includes(c.skill.toLowerCase().split(' ')[0]))
    );
  }
  
  if (!concept) {
    // Fallback to domain match
    concept = concepts.find(c => 
      c.domain.toLowerCase() === domainLower
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

// Export concept counts for admin display
export const conceptCounts = {
  math: mathKeyConcepts.length,
  english: englishKeyConcepts.length,
  total: mathKeyConcepts.length + englishKeyConcepts.length
};
