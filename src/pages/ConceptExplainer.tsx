import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, Calculator, PenTool, ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface Step {
  instruction: string;
  math?: string;
  tip?: string;
}

interface Concept {
  id: string;
  title: string;
  subject: "math" | "english";
  category: string;
  summary: string;
  keyIdea: string;
  steps: Step[];
  example: { problem: string; steps: Step[] };
  commonMistakes: string[];
  tryIt?: { question: string; answer: string };
}

const CONCEPTS: Concept[] = [
  {
    id: "linear-eq", title: "Solving Linear Equations", subject: "math", category: "Algebra",
    summary: "Isolate the variable by performing inverse operations on both sides.",
    keyIdea: "Whatever you do to one side, do to the other.",
    steps: [
      { instruction: "Distribute if needed" },
      { instruction: "Combine like terms on each side" },
      { instruction: "Move variable terms to one side using addition/subtraction" },
      { instruction: "Move constants to the other side" },
      { instruction: "Divide by the coefficient" },
    ],
    example: {
      problem: "Solve: 3(x + 2) = 21",
      steps: [
        { instruction: "Distribute the 3", math: "3x + 6 = 21" },
        { instruction: "Subtract 6 from both sides", math: "3x = 15" },
        { instruction: "Divide both sides by 3", math: "x = 5" },
        { instruction: "Check: 3(5 + 2) = 3(7) = 21 ✓", tip: "Always verify your answer!" },
      ],
    },
    commonMistakes: ["Forgetting to distribute to ALL terms", "Sign errors when moving terms", "Not checking the answer"],
    tryIt: { question: "Solve: 2(x - 4) = 10", answer: "x = 9" },
  },
  {
    id: "quadratic", title: "Quadratic Formula", subject: "math", category: "Algebra",
    summary: "Use when you can't easily factor a quadratic equation ax² + bx + c = 0.",
    keyIdea: "Identify a, b, and c, then plug into the formula.",
    steps: [
      { instruction: "Write equation in standard form: ax² + bx + c = 0" },
      { instruction: "Identify a, b, and c" },
      { instruction: "Calculate the discriminant: b² - 4ac", tip: "This tells you how many solutions exist" },
      { instruction: "Plug into the quadratic formula", math: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
      { instruction: "Simplify to find both solutions" },
    ],
    example: {
      problem: "Solve: x² + 5x + 6 = 0",
      steps: [
        { instruction: "Identify: a = 1, b = 5, c = 6" },
        { instruction: "Discriminant", math: "5^2 - 4(1)(6) = 25 - 24 = 1" },
        { instruction: "Apply formula", math: "x = \\frac{-5 \\pm \\sqrt{1}}{2} = \\frac{-5 \\pm 1}{2}" },
        { instruction: "Two solutions", math: "x = -2 \\text{ or } x = -3" },
      ],
    },
    commonMistakes: ["Wrong signs for b", "Forgetting the ± gives TWO answers", "Arithmetic errors in the discriminant"],
    tryIt: { question: "Solve: x² - 3x - 10 = 0", answer: "x = 5 or x = -2" },
  },
  {
    id: "percents", title: "Percent Problems", subject: "math", category: "Problem Solving",
    summary: "Translate word problems into equations using 'is' = equals, 'of' = multiply.",
    keyIdea: "Part = Percent × Whole",
    steps: [
      { instruction: "Identify what's the part, percent, and whole" },
      { instruction: "Convert percent to decimal (divide by 100)" },
      { instruction: "Set up: Part = (Percent/100) × Whole" },
      { instruction: "Solve for the unknown" },
    ],
    example: {
      problem: "What is 35% of 80?",
      steps: [
        { instruction: "Convert 35% to decimal", math: "35\\% = 0.35" },
        { instruction: "Multiply", math: "0.35 \\times 80 = 28" },
        { instruction: "Answer: 28" },
      ],
    },
    commonMistakes: ["Confusing percent increase with 'of'", "Forgetting to convert % to decimal", "Using wrong base for percent change"],
    tryIt: { question: "15 is what percent of 60?", answer: "25%" },
  },
  {
    id: "svagree", title: "Subject-Verb Agreement", subject: "english", category: "Grammar",
    summary: "The verb must agree in number with its subject, not with nearby nouns.",
    keyIdea: "Find the TRUE subject — ignore prepositional phrases in between.",
    steps: [
      { instruction: "Find the main verb in the sentence" },
      { instruction: "Ask 'Who or what is doing this?'" },
      { instruction: "Cross out prepositional phrases (of, in, with, etc.)" },
      { instruction: "Check: Is the subject singular or plural?" },
      { instruction: "Match the verb accordingly" },
    ],
    example: {
      problem: "'The box of chocolates ___ on the table.' (is/are)",
      steps: [
        { instruction: "Verb: is/are (being)" },
        { instruction: "Cross out 'of chocolates' — it's a prepositional phrase" },
        { instruction: "Subject: 'The box' — singular!" },
        { instruction: "Answer: 'The box of chocolates IS on the table.'", tip: "Don't be tricked by 'chocolates' — it's not the subject" },
      ],
    },
    commonMistakes: ["Matching verb to the nearest noun instead of the subject", "Tricked by 'there is/are' constructions", "Collective nouns (team, group) are usually singular"],
  },
  {
    id: "parallelism", title: "Parallelism", subject: "english", category: "Grammar",
    summary: "Items in a list or comparison must follow the same grammatical structure.",
    keyIdea: "If the first item is a gerund (-ing), they ALL must be gerunds.",
    steps: [
      { instruction: "Identify the list or comparison in the sentence" },
      { instruction: "Check the structure of the first item" },
      { instruction: "Ensure every other item matches that structure" },
      { instruction: "Fix any item that breaks the pattern" },
    ],
    example: {
      problem: "'She enjoys running, to swim, and biking.'",
      steps: [
        { instruction: "List: running, to swim, biking" },
        { instruction: "Pattern: gerund, infinitive, gerund — BROKEN!" },
        { instruction: "Fix: 'She enjoys running, swimming, and biking.'", tip: "All gerunds now match" },
      ],
    },
    commonMistakes: ["Mixing -ing with to + verb", "Not checking ALL items in a long list", "Parallel structure also applies to correlative conjunctions (both...and, not only...but also)"],
  },
  {
    id: "evidence", title: "Evidence-Based Reading", subject: "english", category: "Reading",
    summary: "Choose answers that are directly supported by specific text evidence.",
    keyIdea: "If you can't point to a line in the passage, the answer is likely wrong.",
    steps: [
      { instruction: "Read the question carefully — what exactly is it asking?" },
      { instruction: "Go back to the passage and find the relevant section" },
      { instruction: "Read a few lines before and after for context" },
      { instruction: "Eliminate answers that require assumptions" },
      { instruction: "Choose the answer best supported by the text" },
    ],
    example: {
      problem: "The passage states the character 'sighed and stared at the rain.' What can we infer?",
      steps: [
        { instruction: "Evidence: sighing + staring at rain" },
        { instruction: "Reasonable inference: The character is feeling melancholy or reflective" },
        { instruction: "NOT reasonable: The character hates the outdoors (too extreme)", tip: "Avoid extreme interpretations" },
      ],
    },
    commonMistakes: ["Choosing answers based on outside knowledge", "Picking the most interesting answer instead of the most supported", "Confusing 'what the author says' with 'what you think'"],
  },
];

const ConceptExplainer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<"all" | "math" | "english">("all");

  const filtered = CONCEPTS.filter(c => {
    if (subjectFilter !== "all" && c.subject !== subjectFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
  });

  if (selectedConcept) {
    const c = selectedConcept;
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setSelectedConcept(null); setCurrentStep(0); setShowAnswer(false); }}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{c.title}</h1>
            <p className="text-xs text-muted-foreground">{c.category} • {c.subject}</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto p-4 space-y-4">
          {/* Key Idea */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Key Idea</p>
              <p className="text-sm font-bold text-foreground">{c.keyIdea}</p>
              <p className="text-xs text-muted-foreground mt-2">{c.summary}</p>
            </Card>
          </motion.div>

          {/* Steps */}
          <Card className="p-4">
            <h3 className="font-bold text-foreground mb-3">How To Solve</h3>
            <div className="space-y-2">
              {c.steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">{i + 1}</div>
                  <div>
                    <p className="text-sm text-foreground">{step.instruction}</p>
                    {step.math && <div className="mt-1 p-2 bg-muted/50 rounded overflow-x-auto"><BlockMath math={step.math} /></div>}
                    {step.tip && <p className="text-xs text-primary/80 mt-1 italic">💡 {step.tip}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Worked Example */}
          <Card className="p-4">
            <h3 className="font-bold text-foreground mb-2">Worked Example</h3>
            <p className="text-sm text-foreground font-medium mb-3 p-2 bg-muted/50 rounded">{c.example.problem}</p>

            <div className="space-y-2">
              {c.example.steps.map((step, i) => (
                <AnimatePresence key={i}>
                  {i <= currentStep && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 p-2 rounded-lg bg-background border border-border"
                    >
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground">{step.instruction}</p>
                        {step.math && <div className="mt-1 overflow-x-auto"><BlockMath math={step.math} /></div>}
                        {step.tip && <p className="text-[10px] text-primary/80 mt-1 italic">💡 {step.tip}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {currentStep < c.example.steps.length - 1 && (
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => setCurrentStep(prev => prev + 1)}>
                Next Step <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </Card>

          {/* Common Mistakes */}
          <Card className="p-4">
            <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">⚠️ Common Mistakes</h3>
            <div className="space-y-1.5">
              {c.commonMistakes.map((m, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-red-500 text-xs mt-0.5">✗</span>
                  <p className="text-xs text-foreground">{m}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Try It */}
          {c.tryIt && (
            <Card className="p-4">
              <h3 className="font-bold text-foreground mb-2">🧪 Try It Yourself</h3>
              <p className="text-sm font-medium text-foreground mb-3">{c.tryIt.question}</p>
              {showAnswer ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
                >
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Answer: {c.tryIt.answer}</p>
                </motion.div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowAnswer(true)}>
                  Show Answer
                </Button>
              )}
            </Card>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Concept Explainer</h1>
            <p className="text-xs text-muted-foreground">Step-by-step walkthroughs</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "math", "english"] as const).map(f => (
              <Button key={f} variant={subjectFilter === f ? "default" : "outline"} size="sm" className="h-9 px-2 text-xs capitalize" onClick={() => setSubjectFilter(f)}>
                {f}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No concepts found</p>
          </div>
        ) : (
          filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card
                className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedConcept(c)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    c.subject === "math" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-emerald-100 dark:bg-emerald-900/30"
                  }`}>
                    {c.subject === "math" ? (
                      <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <PenTool className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{c.title}</p>
                    <p className="text-[10px] text-muted-foreground">{c.category} • {c.summary.slice(0, 60)}...</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ConceptExplainer;
