import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, BookOpen, Calculator, PenTool, Copy, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface CheatItem {
  title: string;
  formula?: string;
  description: string;
  example?: string;
}

interface CheatSection {
  category: string;
  subject: "math" | "english";
  items: CheatItem[];
}

const CHEAT_SHEETS: CheatSection[] = [
  {
    category: "Algebra",
    subject: "math",
    items: [
      { title: "Slope Formula", formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}", description: "Find slope between two points", example: "Points (2,3) and (4,7): m = (7-3)/(4-2) = 2" },
      { title: "Slope-Intercept Form", formula: "y = mx + b", description: "m = slope, b = y-intercept" },
      { title: "Point-Slope Form", formula: "y - y_1 = m(x - x_1)", description: "Use when you know a point and slope" },
      { title: "Quadratic Formula", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", description: "Solve ax² + bx + c = 0" },
      { title: "Discriminant", formula: "D = b^2 - 4ac", description: "D > 0: 2 real solutions, D = 0: 1 solution, D < 0: no real solutions" },
      { title: "FOIL", formula: "(a+b)(c+d) = ac + ad + bc + bd", description: "Multiply two binomials" },
      { title: "Difference of Squares", formula: "a^2 - b^2 = (a+b)(a-b)", description: "Factor pattern" },
      { title: "Perfect Square Trinomial", formula: "a^2 \\pm 2ab + b^2 = (a \\pm b)^2", description: "Recognize and factor" },
    ],
  },
  {
    category: "Geometry & Trig",
    subject: "math",
    items: [
      { title: "Pythagorean Theorem", formula: "a^2 + b^2 = c^2", description: "Right triangles only" },
      { title: "Distance Formula", formula: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}", description: "Distance between two points" },
      { title: "Midpoint Formula", formula: "M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)", description: "Midpoint of a segment" },
      { title: "Circle Equation", formula: "(x-h)^2 + (y-k)^2 = r^2", description: "Center (h,k), radius r" },
      { title: "Area of Triangle", formula: "A = \\frac{1}{2}bh", description: "b = base, h = height" },
      { title: "Area of Circle", formula: "A = \\pi r^2", description: "r = radius" },
      { title: "Circumference", formula: "C = 2\\pi r", description: "r = radius" },
      { title: "SOH CAH TOA", formula: "\\sin\\theta = \\frac{opp}{hyp},\\; \\cos\\theta = \\frac{adj}{hyp},\\; \\tan\\theta = \\frac{opp}{adj}", description: "Right triangle trig ratios" },
    ],
  },
  {
    category: "Statistics & Probability",
    subject: "math",
    items: [
      { title: "Mean (Average)", formula: "\\bar{x} = \\frac{\\sum x_i}{n}", description: "Sum of values divided by count" },
      { title: "Percent Change", formula: "\\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100", description: "Calculate percentage increase/decrease" },
      { title: "Probability", formula: "P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}", description: "Basic probability" },
      { title: "Standard Deviation", description: "Measures spread of data from the mean. Larger SD = more spread out." },
      { title: "Median", description: "Middle value when data is sorted. For even count, average the two middle values." },
    ],
  },
  {
    category: "Exponents & Radicals",
    subject: "math",
    items: [
      { title: "Product Rule", formula: "a^m \\cdot a^n = a^{m+n}", description: "Same base, add exponents" },
      { title: "Quotient Rule", formula: "\\frac{a^m}{a^n} = a^{m-n}", description: "Same base, subtract exponents" },
      { title: "Power Rule", formula: "(a^m)^n = a^{mn}", description: "Raise power to power, multiply" },
      { title: "Negative Exponent", formula: "a^{-n} = \\frac{1}{a^n}", description: "Flip to make positive" },
      { title: "Fractional Exponent", formula: "a^{m/n} = \\sqrt[n]{a^m}", description: "Denominator = root, numerator = power" },
    ],
  },
  {
    category: "Grammar Rules",
    subject: "english",
    items: [
      { title: "Subject-Verb Agreement", description: "Singular subjects take singular verbs. Ignore prepositional phrases between subject and verb.", example: "The box of chocolates IS on the table." },
      { title: "Pronoun Agreement", description: "Pronouns must match their antecedent in number and gender.", example: "Each student should bring THEIR (or his/her) book." },
      { title: "Comma Splice", description: "Two independent clauses cannot be joined by just a comma. Use a period, semicolon, or conjunction.", example: "WRONG: I ran, I won. RIGHT: I ran, and I won." },
      { title: "Parallelism", description: "Items in a list or comparison must follow the same grammatical pattern.", example: "She likes running, swimming, and biking (not 'to bike')." },
      { title: "Modifier Placement", description: "Modifiers should be next to the word they modify. Dangling modifiers are a common trap.", example: "WRONG: Walking to school, the rain started. RIGHT: Walking to school, I got caught in the rain." },
      { title: "Apostrophe Rules", description: "Possessive: add 's. Plural: just add s. It's = it is. Its = possessive.", example: "The dog's bone (possessive). The dogs ran (plural)." },
    ],
  },
  {
    category: "Punctuation",
    subject: "english",
    items: [
      { title: "Semicolons", description: "Join two related independent clauses. Can replace a period.", example: "I love math; it challenges me." },
      { title: "Colons", description: "Introduce a list, explanation, or elaboration. Must follow an independent clause.", example: "She needed three things: a pen, paper, and focus." },
      { title: "Dashes", description: "Em dashes (—) set off extra info, add emphasis, or signal a break in thought.", example: "The answer—surprisingly—was B." },
      { title: "Commas with FANBOYS", description: "Use comma before FANBOYS (for, and, nor, but, or, yet, so) joining independent clauses.", example: "I studied hard, but the test was still difficult." },
    ],
  },
  {
    category: "Reading Strategies",
    subject: "english",
    items: [
      { title: "Main Idea", description: "Ask: What is the author's primary point? Look at the first and last sentences of each paragraph." },
      { title: "Evidence-Based Questions", description: "The answer must be directly supported by text. If you can't point to a specific line, it's probably wrong." },
      { title: "Tone & Purpose", description: "Pay attention to word choice. Is the author persuading, informing, narrating, or analyzing?" },
      { title: "Vocabulary in Context", description: "Don't pick the most common definition. Re-read the sentence with each answer choice plugged in." },
      { title: "Graph/Chart Questions", description: "Read titles, axes, and labels carefully. The answer is usually directly stated in the data." },
    ],
  },
];

const CheatSheet = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<"all" | "math" | "english">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSections = CHEAT_SHEETS.filter(section => {
    if (subjectFilter !== "all" && section.subject !== subjectFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      section.category.toLowerCase().includes(q) ||
      section.items.some(
        i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      )
    );
  });

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Cheat Sheet</h1>
            <p className="text-xs text-muted-foreground">Key formulas & concepts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search formulas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "math", "english"] as const).map(f => (
              <Button
                key={f}
                variant={subjectFilter === f ? "default" : "outline"}
                size="sm"
                className="h-9 px-3 text-xs capitalize"
                onClick={() => setSubjectFilter(f)}
              >
                {f === "math" && <Calculator className="w-3 h-3 mr-1" />}
                {f === "english" && <PenTool className="w-3 h-3 mr-1" />}
                {f === "all" && <BookOpen className="w-3 h-3 mr-1" />}
                {f}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No results found</p>
          </div>
        ) : (
          filteredSections.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  section.subject === "math"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-emerald-100 dark:bg-emerald-900/30"
                }`}>
                  {section.subject === "math" ? (
                    <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">{section.category}</h2>
              </div>

              <div className="space-y-2">
                {section.items
                  .filter(item => {
                    if (!search) return true;
                    const q = search.toLowerCase();
                    return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
                  })
                  .map((item, ii) => {
                    const itemId = `${si}-${ii}`;
                    return (
                      <Card key={ii} className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                          {item.formula && (
                            <button
                              onClick={() => copyText(item.formula!, itemId)}
                              className="p-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
                              title="Copy formula"
                            >
                              {copiedId === itemId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>

                        {item.formula && (
                          <div className="my-2 p-2 bg-muted/50 rounded-lg overflow-x-auto">
                            <BlockMath math={item.formula} />
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">{item.description}</p>

                        {item.example && (
                          <p className="text-xs text-primary/80 mt-1 italic">
                            💡 {item.example}
                          </p>
                        )}
                      </Card>
                    );
                  })}
              </div>
            </motion.div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CheatSheet;
