import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, Zap, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

interface Trick {
  title: string;
  description: string;
  formula?: string;
  example: string;
  whyItWorks?: string;
  difficulty: "easy" | "medium" | "hard";
}

interface TrickCategory {
  category: string;
  emoji: string;
  tricks: Trick[];
}

const TRICK_CATEGORIES: TrickCategory[] = [
  {
    category: "Quick Mental Math",
    emoji: "🧠",
    tricks: [
      { title: "Multiply by 11", description: "For any 2-digit number, split the digits and put their sum in the middle.", example: "36 × 11 → 3_(3+6)_6 → 396. If sum ≥ 10, carry the 1.", difficulty: "easy" },
      { title: "Square Numbers Ending in 5", description: "Take the tens digit, multiply by (itself + 1), append 25.", example: "35² → 3 × 4 = 12, append 25 → 1225", difficulty: "easy" },
      { title: "Multiply by 5", description: "Divide by 2, then multiply by 10.", example: "48 × 5 → 48 ÷ 2 = 24 → 24 × 10 = 240", difficulty: "easy" },
      { title: "Percentage Swap", description: "x% of y = y% of x. Choose whichever is easier.", example: "8% of 25 = 25% of 8 = 2. Much easier!", difficulty: "easy" },
      { title: "Multiply by 9", description: "Multiply by 10 and subtract the original number.", example: "43 × 9 → 430 − 43 = 387", difficulty: "easy" },
    ],
  },
  {
    category: "Algebra Shortcuts",
    emoji: "⚡",
    tricks: [
      { title: "Sum & Product of Roots", description: "For ax² + bx + c = 0, sum of roots = −b/a, product = c/a. No need to solve!", formula: "x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}", example: "x² − 5x + 6 = 0 → sum = 5, product = 6", difficulty: "medium" },
      { title: "Difference of Squares", description: "Recognize a² − b² instantly. Factor as (a+b)(a−b).", formula: "a^2 - b^2 = (a+b)(a-b)", example: "99² − 1² = (99+1)(99−1) = 100 × 98 = 9800", difficulty: "easy" },
      { title: "Completing the Square (Vertex Form)", description: "To find vertex quickly: x = −b/(2a), then plug back in for y.", formula: "x_{vertex} = -\\frac{b}{2a}", example: "y = 2x² − 8x + 3 → x = 8/4 = 2, y = 2(4) − 16 + 3 = −5. Vertex: (2, −5)", difficulty: "medium" },
      { title: "Systems: Equal Coefficients", description: "If asked for x + y or x − y, sometimes you can add/subtract equations directly instead of solving for each variable.", example: "2x + 3y = 10 and x + 3y = 7 → Subtract: x = 3", difficulty: "medium" },
      { title: "Back-Substitution", description: "On multiple choice, plug in each answer. Start with B or C to narrow quickly.", example: "If x² + 3x = 10, try x = 2: 4 + 6 = 10 ✓", difficulty: "easy", whyItWorks: "SAT answers are usually nice numbers. Testing takes 10-15 seconds." },
    ],
  },
  {
    category: "Geometry Hacks",
    emoji: "📐",
    tricks: [
      { title: "Special Right Triangles", description: "Memorize 30-60-90 (1, √3, 2) and 45-45-90 (1, 1, √2). Saves tons of time.", formula: "30\\text{-}60\\text{-}90: \\quad x, \\; x\\sqrt{3}, \\; 2x", example: "Hypotenuse = 10, short side = 5, long side = 5√3", difficulty: "easy" },
      { title: "Pythagorean Triples", description: "Memorize: 3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples.", example: "Sides 6, 8, ? → It's 3-4-5 × 2, so hypotenuse = 10", difficulty: "easy" },
      { title: "Arc Length Shortcut", description: "Arc length = (angle/360) × 2πr. Think of it as a fraction of the full circle.", formula: "L = \\frac{\\theta}{360} \\times 2\\pi r", example: "90° arc, r = 4 → (90/360) × 2π(4) = (1/4) × 8π = 2π", difficulty: "medium" },
      { title: "Sector Area", description: "Same fraction idea: (angle/360) × πr²", formula: "A = \\frac{\\theta}{360} \\times \\pi r^2", example: "60° sector, r = 6 → (60/360) × π(36) = 6π", difficulty: "medium" },
    ],
  },
  {
    category: "Statistics Tricks",
    emoji: "📊",
    tricks: [
      { title: "Finding Median Quickly", description: "For n values, median is at position (n+1)/2. For even n, average the two middle.", example: "7 values → median at position 4. Already sorted? Just count!", difficulty: "easy" },
      { title: "Average Shortcut", description: "Instead of adding all, use deviation from an estimate. Pick a middle value, find deviations, average those.", example: "Avg of 98, 102, 97, 103 → Pick 100. Deviations: −2, +2, −3, +3 → avg dev = 0 → avg = 100", difficulty: "medium" },
      { title: "Weighted Average", description: "When groups have different sizes, weight accordingly.", formula: "\\bar{x} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}", example: "20 students avg 80, 30 students avg 90 → (20×80 + 30×90) ÷ 50 = 86", difficulty: "medium" },
    ],
  },
  {
    category: "Number Properties",
    emoji: "🔢",
    tricks: [
      { title: "Divisibility Rules", description: "By 3: digit sum divisible by 3. By 4: last 2 digits. By 9: digit sum by 9.", example: "Is 738 ÷ 3? Digits: 7+3+8 = 18 → 18 ÷ 3 = 6 ✓", difficulty: "easy" },
      { title: "Units Digit Patterns", description: "Powers of any number follow a repeating pattern in their units digit.", example: "7¹=7, 7²=49, 7³=343, 7⁴=2401 → pattern: 7,9,3,1 repeats every 4", difficulty: "medium" },
      { title: "Remainder Trick", description: "To find remainder of large expressions, work with remainders of each part.", example: "What's 47 × 53 mod 10? → 7 × 3 = 21, remainder = 1", difficulty: "hard" },
      { title: "Even/Odd Rules", description: "Even ± Even = Even. Even ± Odd = Odd. Odd × Odd = Odd. Even × anything = Even.", example: "Is 13 × 17 + 4 even or odd? Odd × Odd = Odd, Odd + Even = Odd", difficulty: "easy" },
    ],
  },
];

const MathTricks = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedTrick, setExpandedTrick] = useState<string | null>(null);
  const [mastered, setMastered] = useState<string[]>(() => {
    const saved = localStorage.getItem("mastered-tricks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleMastered = (id: string) => {
    const updated = mastered.includes(id) ? mastered.filter(m => m !== id) : [...mastered, id];
    setMastered(updated);
    localStorage.setItem("mastered-tricks", JSON.stringify(updated));
  };

  const filteredCategories = TRICK_CATEGORIES.map(cat => ({
    ...cat,
    tricks: cat.tricks.filter(t => {
      if (!search) return true;
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    }),
  })).filter(cat => cat.tricks.length > 0);

  const totalTricks = TRICK_CATEGORIES.reduce((sum, c) => sum + c.tricks.length, 0);

  const getDiffBadge = (d: string) => {
    if (d === "easy") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    if (d === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Math Tricks
            </h1>
            <p className="text-xs text-muted-foreground">{mastered.length}/{totalTricks} mastered</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tricks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {filteredCategories.map((cat, ci) => (
          <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.05 }}>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>{cat.emoji}</span> {cat.category}
            </h2>

            <div className="space-y-2">
              {cat.tricks.map((trick, ti) => {
                const trickId = `${ci}-${ti}`;
                const isExpanded = expandedTrick === trickId;
                const isMastered = mastered.includes(trickId);

                return (
                  <Card key={ti} className={`overflow-hidden ${isMastered ? "border-emerald-200 dark:border-emerald-800/30" : ""}`}>
                    <button
                      onClick={() => setExpandedTrick(isExpanded ? null : trickId)}
                      className="w-full text-left p-3 flex items-start gap-3"
                    >
                      <button
                        onClick={e => { e.stopPropagation(); toggleMastered(trickId); }}
                        className="shrink-0 mt-0.5"
                      >
                        {isMastered ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`text-sm font-bold ${isMastered ? "text-muted-foreground" : "text-foreground"}`}>{trick.title}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getDiffBadge(trick.difficulty)}`}>{trick.difficulty}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{trick.description}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-3 pb-3 ml-8 space-y-2">
                            {trick.formula && (
                              <div className="p-2 bg-muted/50 rounded-lg overflow-x-auto">
                                <BlockMath math={trick.formula} />
                              </div>
                            )}
                            <div className="p-2 bg-primary/5 rounded-lg">
                              <p className="text-xs font-medium text-foreground">📝 Example: {trick.example}</p>
                            </div>
                            {trick.whyItWorks && (
                              <p className="text-xs text-muted-foreground italic">💡 {trick.whyItWorks}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No tricks found</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default MathTricks;
