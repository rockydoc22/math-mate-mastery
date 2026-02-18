/**
 * Question Interleaving Algorithm
 * 
 * Reorders selected questions to maximize variety:
 * 1. Categorizes each question into one of ~20 math topic groups or ~10 english topic groups
 * 2. Uses greedy round-robin spacing so same-category questions are spread apart
 * 3. Alternates difficulty bands (easy/medium/hard) to avoid monotonic sequences
 */

// ── Math topic categories (20 groups) ──────────────────────────────────────
const MATH_TOPIC_CATEGORIES: { id: number; label: string; keywords: string[] }[] = [
  { id: 1,  label: "Linear equations",        keywords: ["linear equation", "solve for", "one variable", "two variables", "isolate"] },
  { id: 2,  label: "Linear inequalities",     keywords: ["linear inequality", "inequality", "at least", "at most", "no more than", "no less than"] },
  { id: 3,  label: "Linear functions",         keywords: ["linear function", "slope", "intercept", "y = mx", "rate of change", "interpreting linear"] },
  { id: 4,  label: "Systems of equations",     keywords: ["system", "two equations", "elimination", "substitution", "simultaneous"] },
  { id: 5,  label: "Linear word problems",     keywords: ["word problem", "real-world", "costs", "sells", "company", "store", "distance", "time", "travel"] },
  { id: 6,  label: "Quadratic equations",      keywords: ["quadratic", "parabola", "vertex", "completing the square", "discriminant", "x²", "x^2"] },
  { id: 7,  label: "Polynomials & rationals",  keywords: ["polynomial", "rational", "factor", "remainder", "degree", "long division"] },
  { id: 8,  label: "Exponentials & radicals",  keywords: ["exponential", "radical", "growth", "decay", "square root", "cube root", "exponent"] },
  { id: 9,  label: "Absolute value",           keywords: ["absolute value", "|x|", "absolute"] },
  { id: 10, label: "Nonlinear systems",        keywords: ["nonlinear system", "circle and line", "quadratic system"] },
  { id: 11, label: "Equivalent expressions",   keywords: ["equivalent", "simplify", "manipulation", "rewrite", "expression"] },
  { id: 12, label: "Ratios & proportions",     keywords: ["ratio", "rate", "proportion", "unit conversion", "per", "scale"] },
  { id: 13, label: "Percentages",              keywords: ["percent", "percentage", "increase", "decrease", "markup", "discount"] },
  { id: 14, label: "Data analysis",            keywords: ["table", "scatterplot", "graph", "data", "chart", "bar", "histogram", "line of best fit"] },
  { id: 15, label: "Statistics",               keywords: ["mean", "median", "mode", "range", "standard deviation", "average", "outlier"] },
  { id: 16, label: "Probability & inference",  keywords: ["probability", "likely", "random", "sample", "survey", "inference", "margin of error", "confidence"] },
  { id: 17, label: "Data claims",              keywords: ["claim", "supported", "justified", "conclusion", "evidence", "based on"] },
  { id: 18, label: "Area/volume/perimeter",    keywords: ["area", "volume", "perimeter", "surface area", "rectangle", "cube", "cylinder", "sphere"] },
  { id: 19, label: "Triangles & angles",       keywords: ["triangle", "angle", "similar", "congruent", "right triangle", "pythagorean", "parallel", "perpendicular", "line"] },
  { id: 20, label: "Trigonometry",             keywords: ["sine", "cosine", "tangent", "sin", "cos", "tan", "sohcahtoa", "trig", "trigonometry"] },
  { id: 21, label: "Circles",                  keywords: ["circle", "arc", "sector", "chord", "tangent line", "radius", "diameter", "circumference"] },
  { id: 22, label: "Coordinate geometry",      keywords: ["distance", "midpoint", "coordinate", "point", "plane"] },
];

// ── English topic categories ───────────────────────────────────────────────
const ENGLISH_TOPIC_CATEGORIES: { id: number; label: string; keywords: string[] }[] = [
  { id: 101, label: "Vocabulary in context",  keywords: ["context", "vocabulary", "word", "meaning", "most nearly means"] },
  { id: 102, label: "Text structure",          keywords: ["structure", "organization", "paragraph", "serve", "function"] },
  { id: 103, label: "Purpose & tone",          keywords: ["purpose", "tone", "author", "perspective", "attitude"] },
  { id: 104, label: "Connecting texts",        keywords: ["compare", "contrast", "relate", "both", "passages"] },
  { id: 105, label: "Central ideas",           keywords: ["central idea", "main idea", "theme", "summary", "primarily"] },
  { id: 106, label: "Inferences",              keywords: ["infer", "imply", "suggest", "conclude", "most likely"] },
  { id: 107, label: "Evidence analysis",       keywords: ["evidence", "support", "which choice", "best supports", "quotation"] },
  { id: 108, label: "Punctuation & grammar",   keywords: ["punctuation", "comma", "semicolon", "colon", "dash", "grammar", "pronoun", "verb", "tense", "agreement"] },
  { id: 109, label: "Sentence structure",      keywords: ["sentence", "fragment", "run-on", "modifier", "parallel", "dangling"] },
  { id: 110, label: "Transitions & revision",  keywords: ["transition", "however", "therefore", "moreover", "revision", "improve", "effective"] },
];

// ── Science topic categories (ACT) ─────────────────────────────────────────
const SCIENCE_TOPIC_CATEGORIES: { id: number; label: string; keywords: string[] }[] = [
  { id: 201, label: "Data representation",     keywords: ["data", "table", "graph", "chart", "figure", "trend"] },
  { id: 202, label: "Research summaries",      keywords: ["experiment", "study", "researcher", "hypothesis", "procedure", "trial"] },
  { id: 203, label: "Conflicting viewpoints",  keywords: ["scientist", "student", "viewpoint", "disagree", "theory", "model"] },
];

type QuestionLike = {
  id: string;
  type: "math" | "english" | "science";
  domain: string;
  skill: string;
  question: string;
  difficultyRating?: number;
};

/**
 * Categorize a question into its topic group ID
 */
function categorizeQuestion(q: QuestionLike): number {
  const categories = q.type === "math" 
    ? MATH_TOPIC_CATEGORIES 
    : q.type === "english" 
      ? ENGLISH_TOPIC_CATEGORIES 
      : SCIENCE_TOPIC_CATEGORIES;
  
  const text = `${q.domain} ${q.skill} ${q.question}`.toLowerCase();
  
  // Score each category by keyword match count for best fit
  let bestId = categories[0].id;
  let bestScore = 0;
  
  for (const cat of categories) {
    const score = cat.keywords.reduce((sum, kw) => sum + (text.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestId = cat.id;
    }
  }
  
  return bestId;
}

/**
 * Get difficulty band: 0=easy(1-3), 1=medium(4-7), 2=hard(8-10)
 */
function difficultyBand(rating: number): number {
  if (rating <= 3) return 0;
  if (rating <= 7) return 1;
  return 2;
}

/**
 * Interleave questions to maximize variety.
 * 
 * Algorithm:
 * 1. Group questions by topic category
 * 2. Sort groups by size (largest first) for round-robin
 * 3. Pick one question from each group in rotation
 * 4. Within each group, alternate difficulty bands
 * 5. Result: same-category questions are maximally spread apart
 */
export function interleaveQuestions<T extends QuestionLike>(questions: T[]): T[] {
  if (questions.length <= 2) return questions;
  
  // Categorize all questions
  const categorized = questions.map(q => ({
    question: q,
    category: categorizeQuestion(q),
    difficulty: q.difficultyRating || 5,
  }));
  
  // Group by category
  const groups = new Map<number, typeof categorized>();
  for (const item of categorized) {
    if (!groups.has(item.category)) {
      groups.set(item.category, []);
    }
    groups.get(item.category)!.push(item);
  }
  
  // Within each group, sort by difficulty to enable band alternation
  for (const [, items] of groups) {
    items.sort((a, b) => a.difficulty - b.difficulty);
  }
  
  // Sort groups by size (largest first) for better distribution
  const sortedGroups = [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([, items]) => ({ items, index: 0 }));
  
  // Round-robin pick from groups, tracking last used difficulty band
  const result: T[] = [];
  let lastBand = -1;
  
  while (result.length < questions.length) {
    let picked = false;
    
    for (const group of sortedGroups) {
      if (group.index >= group.items.length) continue;
      
      // Try to pick a question from a different difficulty band than the last
      let bestIdx = group.index;
      if (lastBand >= 0) {
        for (let i = group.index; i < group.items.length; i++) {
          if (difficultyBand(group.items[i].difficulty) !== lastBand) {
            bestIdx = i;
            break;
          }
        }
      }
      
      // Swap the best candidate into the current position
      if (bestIdx !== group.index) {
        [group.items[group.index], group.items[bestIdx]] = [group.items[bestIdx], group.items[group.index]];
      }
      
      const item = group.items[group.index];
      result.push(item.question);
      lastBand = difficultyBand(item.difficulty);
      group.index++;
      picked = true;
    }
    
    // Safety: if no group had remaining items (shouldn't happen), break
    if (!picked) break;
  }
  
  return result;
}
