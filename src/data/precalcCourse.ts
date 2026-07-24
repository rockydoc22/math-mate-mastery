// Precalculus mini-course. Each chapter defines a short outline and a
// deterministic-but-shuffleable question generator so a chapter quiz always
// has fresh numbers without needing hundreds of hand-authored items.
//
// Shape is intentionally self-contained (no DB): questions are built at
// runtime, then options are shuffled once per session.

export interface PrecalcQuestion {
  id: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PrecalcChapter {
  id: string;
  title: string;
  summary: string;
  icon: string;
  build: (n: number) => PrecalcQuestion[];
}

// ── helpers ──
const rint = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const q = (
  id: string,
  stem: string,
  correct: string,
  distractors: string[],
  explanation: string
): PrecalcQuestion => {
  const options = shuffle([correct, ...distractors]);
  return { id, stem, options, correctIndex: options.indexOf(correct), explanation };
};

// Generator helpers per chapter build a large candidate list then take the first n.
function take<T>(gens: (() => T)[], n: number): T[] {
  const out: T[] = [];
  const pool = shuffle(gens);
  for (let i = 0; i < n; i++) out.push(pool[i % pool.length]());
  return out;
}

// ── Ch 1: Functions & Graphs ──
const CH_FUNCTIONS: PrecalcChapter = {
  id: "functions", title: "Functions & Graphs", icon: "📈",
  summary: "Function notation, domain, range, transformations, and even/odd symmetry.",
  build: (n) => take([
    () => { const a = rint(2,6), x = rint(1,5), b = rint(1,10); const val = a*x+b;
      return q("f1", `If f(x) = ${a}x + ${b}, find f(${x}).`, `${val}`, [`${val-a}`, `${val+b}`, `${a+x+b}`],
        `f(${x}) = ${a}·${x} + ${b} = ${val}.`); },
    () => { const c = rint(2,9);
      return q("f2", `What is the domain of f(x) = 1 / (x − ${c})?`,
        `All real x except x = ${c}`, ["All real numbers", `x ≥ ${c}`, `x = ${c}`],
        `Denominator can't be zero, so x ≠ ${c}.`); },
    () => { const k = rint(2,6);
      return q("f3", `The graph of y = f(x) is shifted so g(x) = f(x) + ${k}. This is a vertical shift`,
        `up ${k} units`, [`down ${k} units`, `left ${k} units`, `right ${k} units`],
        `Adding a constant outside f moves the graph vertically.`); },
    () => q("f4", "Which function is EVEN (f(−x) = f(x))?",
        "f(x) = x² + 3", ["f(x) = x³", "f(x) = x + 1", "f(x) = √x"],
        "Even powers are symmetric about the y-axis."),
    () => { const a = rint(2,5); const val = a*a + 1;
      return q("f5", `If f(x) = x² + 1, find f(${a}).`, `${val}`,
        [`${a*a}`, `${a+1}`, `${2*a+1}`], `${a}² + 1 = ${val}.`); },
    () => q("f6", "Which is NOT a function?",
        "x = y²", ["y = 3x + 1", "y = x²", "y = |x|"],
        "x = y² fails the vertical-line test — one x maps to two y values."),
    () => { const s = rint(2,5);
      return q("f7", `g(x) = f(x − ${s}) is the graph of f shifted`,
        `right ${s} units`, [`left ${s} units`, `up ${s} units`, `down ${s} units`],
        "Subtracting inside the function moves the graph to the right."); },
    () => q("f8", "The range of f(x) = x² is",
        "y ≥ 0", ["all reals", "y > 0", "y ≤ 0"],
        "Squares can never be negative."),
  ], n),
};

// ── Ch 2: Polynomial Functions ──
const CH_POLY: PrecalcChapter = {
  id: "polynomials", title: "Polynomial Functions", icon: "📐",
  summary: "Factoring, zeros, end behavior, and the Remainder Theorem.",
  build: (n) => take([
    () => { const r1 = rint(1,6), r2 = rint(1,6);
      return q("p1", `Solve x² − ${r1+r2}x + ${r1*r2} = 0.`,
        `x = ${r1}, ${r2}`, [`x = ${r1+r2}, 0`, `x = −${r1}, −${r2}`, `x = ${r1*r2}`],
        `Factor as (x − ${r1})(x − ${r2}).`); },
    () => q("p2", "End behavior of f(x) = −2x⁴ + …",
        "Both ends fall (→ −∞)", ["Both ends rise", "Left rises, right falls", "Left falls, right rises"],
        "Even degree with negative leading coefficient → both ends go to −∞."),
    () => { const a = rint(2,5);
      return q("p3", `If p(x) = x³ − ${a}, find p(${a === 8 ? 2 : a}). `,
        `${Math.pow(a === 8 ? 2 : a, 3) - a}`,
        [`${a*3 - a}`, `${a - a}`, `${a}`],
        "Substitute and evaluate the cube."); },
    () => q("p4", "Number of real zeros of f(x) = x⁴ + 1?",
        "0", ["1", "2", "4"], "x⁴ + 1 is always positive for real x."),
    () => q("p5", "By the Remainder Theorem, dividing p(x) by (x − 2) gives a remainder of",
        "p(2)", ["p(−2)", "2·p(x)", "0 always"],
        "Remainder = p(a) when dividing by (x − a)."),
    () => q("p6", "Which is a factor of x² − 9?",
        "(x − 3)", ["(x − 9)", "(x + 9)", "(x² + 3)"],
        "Difference of squares: x² − 9 = (x−3)(x+3)."),
  ], n),
};

// ── Ch 3: Rational Functions ──
const CH_RATIONAL: PrecalcChapter = {
  id: "rational", title: "Rational Functions", icon: "➗",
  summary: "Asymptotes, holes, and long-run behavior of p(x)/q(x).",
  build: (n) => take([
    () => { const c = rint(2,6);
      return q("r1", `Vertical asymptote of f(x) = 1 / (x − ${c})?`,
        `x = ${c}`, [`y = ${c}`, `x = 0`, `x = −${c}`],
        "Set denominator = 0."); },
    () => q("r2", "Horizontal asymptote of f(x) = (3x + 1)/(x + 4)?",
        "y = 3", ["y = 0", "y = 1/4", "y = 4"],
        "Equal degrees → ratio of leading coefficients."),
    () => q("r3", "Horizontal asymptote of f(x) = 5/(x² + 1)?",
        "y = 0", ["y = 5", "y = 1", "No asymptote"],
        "Denominator degree > numerator degree."),
    () => q("r4", "The graph of f(x) = (x² − 4)/(x − 2) has a hole at",
        "x = 2", ["x = −2", "x = 0", "x = 4"],
        "Numerator factors as (x−2)(x+2), canceling the (x−2)."),
    () => q("r5", "Domain of f(x) = x/(x² − 9)?",
        "x ≠ 3 and x ≠ −3", ["x > 0", "All real numbers", "x ≠ 9"],
        "Denominator zero at ±3."),
  ], n),
};

// ── Ch 4: Exponentials ──
const CH_EXP: PrecalcChapter = {
  id: "exponentials", title: "Exponential Functions", icon: "🚀",
  summary: "Growth and decay, base e, and compound interest.",
  build: (n) => take([
    () => { const b = pick([2,3,5,10]); const x = rint(2,4); const val = Math.pow(b,x);
      return q("e1", `Evaluate ${b}^${x}.`, `${val}`,
        [`${b*x}`, `${val-1}`, `${val*2}`], `${b}·${b}${x>2?`·${b}`:""}${x>3?`·${b}`:""} = ${val}.`); },
    () => q("e2", "f(x) = 3ˣ represents",
        "Exponential growth", ["Exponential decay", "Linear growth", "Constant"],
        "Base > 1 with positive exponent grows."),
    () => q("e3", "f(x) = (1/2)ˣ represents",
        "Exponential decay", ["Exponential growth", "Linear decay", "Constant"],
        "Base between 0 and 1 shrinks as x increases."),
    () => q("e4", "Which is the horizontal asymptote of y = 2ˣ − 3?",
        "y = −3", ["y = 0", "y = 3", "x = 0"],
        "Base function y = 2ˣ has asymptote y = 0; shifting down by 3 gives y = −3."),
    () => q("e5", "Approximate e (Euler's number).",
        "2.718", ["1.618", "3.141", "2.303"], "e ≈ 2.71828."),
  ], n),
};

// ── Ch 5: Logarithms ──
const CH_LOG: PrecalcChapter = {
  id: "logarithms", title: "Logarithmic Functions", icon: "🧮",
  summary: "Logs as inverses of exponents, log rules, and change of base.",
  build: (n) => take([
    () => q("l1", "log₂ 8 = ?", "3", ["2", "4", "8"], "2³ = 8."),
    () => q("l2", "log 1000 = ? (base 10)", "3", ["10", "100", "2"], "10³ = 1000."),
    () => q("l3", "log(a) + log(b) equals", "log(ab)", ["log(a+b)", "log(a) · log(b)", "log(a−b)"],
        "Sum of logs = log of product."),
    () => q("l4", "log(a) − log(b) equals", "log(a/b)", ["log(a·b)", "log(a) / log(b)", "log(a − b)"],
        "Difference of logs = log of quotient."),
    () => q("l5", "Solve 2ˣ = 16.", "x = 4", ["x = 2", "x = 8", "x = 16"], "2⁴ = 16."),
    () => q("l6", "ln(eˣ) = ?", "x", ["1", "eˣ", "0"], "Natural log undoes e^."),
  ], n),
};

// ── Ch 6: Trigonometry ──
const CH_TRIG: PrecalcChapter = {
  id: "trigonometry", title: "Trigonometric Functions", icon: "🌀",
  summary: "Unit circle, radians, and the six trig ratios.",
  build: (n) => take([
    () => q("t1", "sin(0) = ?", "0", ["1", "−1", "1/2"], "sin 0 = 0."),
    () => q("t2", "cos(0) = ?", "1", ["0", "−1", "1/2"], "cos 0 = 1."),
    () => q("t3", "sin(π/2) = ?", "1", ["0", "−1", "1/2"], "sin at the top of the unit circle."),
    () => q("t4", "cos(π) = ?", "−1", ["1", "0", "1/2"], "cos at the leftmost point."),
    () => q("t5", "tan(π/4) = ?", "1", ["0", "√3", "1/2"], "sin=cos at π/4."),
    () => q("t6", "180° in radians is", "π", ["π/2", "2π", "π/3"], "Half a full turn."),
    () => q("t7", "Convert 90° to radians.", "π/2", ["π", "π/3", "2π"], "Quarter of 2π."),
    () => q("t8", "Reciprocal of sin θ is", "csc θ", ["sec θ", "cot θ", "cos θ"], "sec = 1/cos, csc = 1/sin, cot = 1/tan."),
  ], n),
};

// ── Ch 7: Trig Identities ──
const CH_TRIG_ID: PrecalcChapter = {
  id: "trig-identities", title: "Trig Identities", icon: "🔁",
  summary: "Pythagorean, sum/difference, and double-angle identities.",
  build: (n) => take([
    () => q("i1", "sin²θ + cos²θ = ?", "1", ["0", "2", "tan²θ"], "Pythagorean identity."),
    () => q("i2", "1 + tan²θ = ?", "sec²θ", ["csc²θ", "cot²θ", "1"], "Derived from Pythagorean identity."),
    () => q("i3", "sin(2θ) = ?", "2 sinθ cosθ", ["sinθ cosθ", "cos²θ − sin²θ", "2 cos²θ − 1"],
        "Double-angle formula for sine."),
    () => q("i4", "cos(2θ) = ?", "cos²θ − sin²θ", ["2 sinθ cosθ", "1 − sinθ", "2 sin²θ"],
        "One form of the double-angle for cosine."),
    () => q("i5", "sin(−θ) = ?", "−sin θ", ["sin θ", "cos θ", "−cos θ"], "Sine is an odd function."),
  ], n),
};

// ── Ch 8: Systems & Matrices ──
const CH_SYS: PrecalcChapter = {
  id: "systems", title: "Systems & Matrices", icon: "🔢",
  summary: "Solving linear systems and basic 2×2 matrix operations.",
  build: (n) => take([
    () => { const x = rint(1,5), y = rint(1,5);
      return q("s1", `Solve: x + y = ${x+y},  x − y = ${x-y}.`,
        `x = ${x}, y = ${y}`, [`x = ${y}, y = ${x}`, `x = 0, y = ${x+y}`, `x = ${x+y}, y = 0`],
        "Add the equations: 2x = (x+y)+(x−y)."); },
    () => q("s2", "Determinant of [[2,3],[1,4]]?", "5", ["11", "−5", "8"], "2·4 − 3·1 = 5."),
    () => q("s3", "A 2×3 matrix has how many entries?", "6", ["5", "23", "8"], "2 rows × 3 columns."),
    () => q("s4", "The identity matrix I₂ is", "[[1,0],[0,1]]", ["[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[2,0],[0,2]]"],
        "1's on the diagonal, 0's elsewhere."),
  ], n),
};

// ── Ch 9: Conic Sections ──
const CH_CONIC: PrecalcChapter = {
  id: "conics", title: "Conic Sections", icon: "🥚",
  summary: "Circles, ellipses, parabolas, and hyperbolas.",
  build: (n) => take([
    () => { const r = rint(2,7);
      return q("c1", `Radius of x² + y² = ${r*r}?`, `${r}`, [`${r*r}`, `${r*2}`, `${Math.round(r/2)}`],
        `r² = ${r*r} → r = ${r}.`); },
    () => q("c2", "Standard form of a circle with center (h,k) is",
        "(x−h)² + (y−k)² = r²", ["(x+h)² + (y+k)² = r²", "x² + y² = h² + k²", "y − k = m(x − h)"],
        "Distance formula from center."),
    () => q("c3", "x²/9 + y²/4 = 1 is an", "ellipse", ["circle", "parabola", "hyperbola"],
        "Sum of two squared terms with different denominators."),
    () => q("c4", "x²/9 − y²/4 = 1 is a", "hyperbola", ["ellipse", "parabola", "circle"],
        "Difference of two squared terms."),
    () => q("c5", "y = x² is a", "parabola", ["hyperbola", "ellipse", "line"],
        "Only one variable is squared."),
  ], n),
};

// ── Ch 10: Sequences & Series ──
const CH_SEQ: PrecalcChapter = {
  id: "sequences", title: "Sequences & Series", icon: "🪜",
  summary: "Arithmetic and geometric sequences, sums, and sigma notation.",
  build: (n) => take([
    () => { const a = rint(1,5), d = rint(2,6), k = rint(4,9);
      const val = a + (k-1)*d;
      return q("q1", `Arithmetic sequence a₁ = ${a}, d = ${d}. Find a_${k}.`, `${val}`,
        [`${a+d*k}`, `${a*k}`, `${a+d}`], `a_n = a₁ + (n−1)d = ${a} + ${k-1}·${d} = ${val}.`); },
    () => { const a = rint(1,3), r = 2, k = rint(3,5);
      const val = a * Math.pow(r, k-1);
      return q("q2", `Geometric: a₁ = ${a}, r = ${r}. Find a_${k}.`, `${val}`,
        [`${a+r*k}`, `${a*k}`, `${a*r}`], `a_n = a₁ · rⁿ⁻¹ = ${a}·${r}^${k-1} = ${val}.`); },
    () => q("q3", "Sum of first n positive integers is",
        "n(n+1)/2", ["n²", "2n", "n(n−1)/2"], "Gauss's formula."),
    () => q("q4", "The series 1 + 1/2 + 1/4 + 1/8 + … converges to",
        "2", ["1", "∞", "1/2"], "Geometric with a=1, r=1/2 → 1/(1−1/2)."),
  ], n),
};

export const PRECALC_CHAPTERS: PrecalcChapter[] = [
  CH_FUNCTIONS, CH_POLY, CH_RATIONAL, CH_EXP, CH_LOG,
  CH_TRIG, CH_TRIG_ID, CH_SYS, CH_CONIC, CH_SEQ,
];

export const PRECALC_QUESTIONS_PER_CHAPTER = 10;