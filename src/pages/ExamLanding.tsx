import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface SampleQ { stem: string; options: string[]; correct: number; explanation: string; }
interface ExamPage {
  slug: string;
  brand: string;         // e.g. "ACT"
  title: string;         // <60 char SEO title
  description: string;   // <160 char meta description
  h1: string;
  intro: string;
  ctaHref: string;
  ctaLabel: string;
  bullets: string[];
  samples: SampleQ[];
}

const EXAMS: Record<string, ExamPage> = {
  act: {
    slug: "act", brand: "ACT",
    title: "Free ACT Practice Questions & Prep",
    description: "Free ACT practice: English, Math, Reading & Science questions with instant explanations. No signup required to try samples.",
    h1: "Free ACT Practice — Every Section, Every Time",
    intro: "Practice English, Math, Reading, and Science ACT questions built the way the real test asks them — with instant explanations and adaptive drills.",
    ctaHref: "/quiz", ctaLabel: "Start ACT practice",
    bullets: [
      "Full ACT English, Math, Reading, and Science coverage",
      "Instant, worked-out explanations for every answer",
      "Adaptive weak-area drills that focus on what you miss",
      "Free daily plays — no credit card, no paywall",
    ],
    samples: [
      { stem: "If 3x − 7 = 20, what is x?", options: ["7", "9", "13/3", "27/3"], correct: 1,
        explanation: "Add 7: 3x = 27. Divide by 3: x = 9." },
      { stem: "Which sentence is grammatically correct?",
        options: ["Neither the coach nor the players was ready.", "Neither the coach nor the players were ready.", "Neither the coach or the players were ready.", "Neither of the players were ready."], correct: 1,
        explanation: "With 'neither...nor', the verb agrees with the nearest subject ('players' → 'were')." },
      { stem: "A car travels 180 miles in 3 hours. Its average speed is",
        options: ["50 mph", "55 mph", "60 mph", "65 mph"], correct: 2,
        explanation: "180 ÷ 3 = 60 mph." },
    ],
  },
  lsat: {
    slug: "lsat", brand: "LSAT",
    title: "Free LSAT Practice Questions & Prep",
    description: "Free LSAT practice: Logical Reasoning, Reading Comprehension, and Analytical Reasoning drills with clear explanations.",
    h1: "Free LSAT Practice — Logical Reasoning, Reading, and Games",
    intro: "Practice authentic-style LSAT questions with structured explanations that teach you the argument patterns testmakers reuse.",
    ctaHref: "/pro-exams", ctaLabel: "Start LSAT practice",
    bullets: [
      "Logical Reasoning question types with common trap identification",
      "Reading Comprehension passages with question-by-question timing",
      "Analytical Reasoning (logic games) with diagramming walk-throughs",
      "Free daily plays — track your accuracy over time",
    ],
    samples: [
      { stem: "All lawyers who graduated from Ivy schools passed the bar. Sam is a lawyer who passed the bar. Which follows?",
        options: ["Sam graduated from an Ivy school.", "Sam did not graduate from an Ivy school.", "Nothing about Sam's school follows.", "Some non-Ivy graduates fail the bar."], correct: 2,
        explanation: "The stimulus says Ivy grads pass, not that only Ivy grads pass. Sam's school is unknown." },
      { stem: "Which best expresses the flaw: 'Most CEOs are men, so being male causes success.'",
        options: ["Confusing correlation with causation", "Circular reasoning", "Attacking the person", "Appeal to authority"], correct: 0,
        explanation: "The argument treats a demographic pattern as a causal explanation." },
    ],
  },
  gmat: {
    slug: "gmat", brand: "GMAT",
    title: "Free GMAT Practice Questions & Prep",
    description: "Free GMAT practice: Quant, Verbal, and Data Insights problems with clear explanations from the AlphaOmega prep team.",
    h1: "Free GMAT Practice — Quant, Verbal, and Data Insights",
    intro: "Sharpen the exact skills GMAT rewards: quick arithmetic, sentence correction, critical reasoning, and data-sufficiency instincts.",
    ctaHref: "/pro-exams", ctaLabel: "Start GMAT practice",
    bullets: [
      "Problem Solving and Data Sufficiency drills with pacing hints",
      "Sentence Correction with common trap patterns highlighted",
      "Critical Reasoning explanations you can generalize to new stems",
      "Free daily plays — track section-level accuracy over time",
    ],
    samples: [
      { stem: "If x + y = 10 and xy = 21, what is x² + y²?",
        options: ["58", "79", "100", "121"], correct: 0,
        explanation: "(x+y)² = x² + 2xy + y² = 100, so x² + y² = 100 − 2·21 = 58." },
      { stem: "Data Sufficiency: Is n even? (1) 3n is even. (2) n + 1 is odd.",
        options: ["(1) alone", "(2) alone", "Both together", "Either alone"], correct: 3,
        explanation: "(1) 3n even → n even. (2) n+1 odd → n even. Either statement alone is sufficient." },
    ],
  },
  gre: {
    slug: "gre", brand: "GRE",
    title: "Free GRE Practice Questions & Prep",
    description: "Free GRE practice: Verbal Reasoning, Quantitative Reasoning, and Analytical Writing prep with instant feedback.",
    h1: "Free GRE Practice — Verbal, Quant, and Analytical Writing",
    intro: "Drill high-frequency GRE vocab, quant patterns, and argument-analysis moves with instant explanations.",
    ctaHref: "/pro-exams", ctaLabel: "Start GRE practice",
    bullets: [
      "High-frequency GRE vocabulary in context",
      "Quantitative Comparison with the four canonical answer choices",
      "Text Completion and Sentence Equivalence drills",
      "Free daily plays — see accuracy per question type",
    ],
    samples: [
      { stem: "The politician's speech was so ______ that even his opponents applauded.",
        options: ["banal", "cogent", "insipid", "verbose"], correct: 1,
        explanation: "'Cogent' (clear and convincing) matches applause from opponents." },
      { stem: "Quantitative Comparison — Column A: 2^10. Column B: 10². Which is greater?",
        options: ["A > B", "B > A", "A = B", "Cannot determine"], correct: 0,
        explanation: "2^10 = 1024, 10² = 100. A is greater." },
    ],
  },
  mcat: {
    slug: "mcat", brand: "MCAT",
    title: "Free MCAT Practice Questions & Prep",
    description: "Free MCAT practice: Bio/Biochem, Chem/Phys, Psych/Soc, and CARS drills with clean explanations you can learn from.",
    h1: "Free MCAT Practice — Every Section, Every Time",
    intro: "Practice bite-sized MCAT-style questions across all four sections with focused, testmaker-style explanations.",
    ctaHref: "/pro-exams", ctaLabel: "Start MCAT practice",
    bullets: [
      "Bio/Biochem and Chem/Phys concept drills",
      "Psych/Soc term recall in real research contexts",
      "CARS-style passages with structured argument breakdowns",
      "Free daily plays — build stamina across all four sections",
    ],
    samples: [
      { stem: "Which enzyme unwinds DNA at the replication fork?",
        options: ["DNA polymerase", "Helicase", "Ligase", "Primase"], correct: 1,
        explanation: "Helicase breaks the hydrogen bonds between paired bases to unwind the double helix." },
      { stem: "A person attributes another driver's aggression to personality rather than traffic conditions. This is",
        options: ["Just-world hypothesis", "Fundamental attribution error", "Confirmation bias", "Cognitive dissonance"], correct: 1,
        explanation: "FAE = over-attributing others' behavior to internal traits and under-attributing to the situation." },
    ],
  },
  sat: {
    slug: "sat", brand: "SAT",
    title: "Free SAT Practice Questions & Prep (40²)",
    description: "Free SAT practice from AlphaOmega: authentic-style Reading, Writing, and Math questions with instant explanations.",
    h1: "Free SAT Practice — Every Section, Every Time",
    intro: "Practice the exact question types the digital SAT rewards, backed by authentic College Board–style items and adaptive drills.",
    ctaHref: "/quiz", ctaLabel: "Start SAT practice",
    bullets: [
      "Reading, Writing, and Math sections with instant explanations",
      "Adaptive drills that focus on your weakest skills",
      "Full-length practice tests with pacing feedback",
      "Free daily plays — no credit card, no paywall",
    ],
    samples: [
      { stem: "If f(x) = 2x + 5, what is f(3)?",
        options: ["8", "10", "11", "13"], correct: 2,
        explanation: "f(3) = 2·3 + 5 = 11." },
      { stem: "'The author's argument is _____ ; it changes based on the audience.'",
        options: ["static", "malleable", "concrete", "reproachful"], correct: 1,
        explanation: "'Malleable' means easily shaped or adjusted — matches 'changes based on audience'." },
    ],
  },
  psat: {
    slug: "psat", brand: "PSAT",
    title: "Free PSAT Practice Questions & Prep",
    description: "Free PSAT practice: Reading, Writing, and Math drills modeled on the digital PSAT with instant, worked-out explanations.",
    h1: "Free PSAT Practice — Reading, Writing, and Math",
    intro: "Warm up for the digital PSAT with realistic questions and instant explanations tuned to the test's difficulty range.",
    ctaHref: "/quiz", ctaLabel: "Start PSAT practice",
    bullets: [
      "Reading and Writing modules with vocab-in-context drills",
      "Math modules from algebra fundamentals to problem solving",
      "Adaptive weak-area drills that focus on what you miss",
      "Free daily plays — no credit card, no paywall",
    ],
    samples: [
      { stem: "Solve for x: 4x + 3 = 19.",
        options: ["3", "4", "5", "8"], correct: 1,
        explanation: "4x = 16, so x = 4." },
      { stem: "Which word best fits: 'Her explanation was _____ ; every step was easy to follow.'",
        options: ["opaque", "lucid", "verbose", "spurious"], correct: 1,
        explanation: "'Lucid' means clear and easy to understand." },
    ],
  },
};

export const EXAM_LANDING_SLUGS = Object.keys(EXAMS);

export default function ExamLanding() {
  const { exam } = useParams<{ exam: string }>();
  const key = (exam ?? "").toLowerCase();
  const data = EXAMS[key];
  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <SEO
        title={data.title}
        description={data.description}
        path={`/prep/${data.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.samples.map((s) => ({
            "@type": "Question",
            name: s.stem,
            acceptedAnswer: { "@type": "Answer", text: `${s.options[s.correct]} — ${s.explanation}` },
          })),
        }}
      />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Home</Button></Link>

        <header className="space-y-3">
          <div className="inline-block text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">
            Free {data.brand} Prep
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{data.h1}</h1>
          <p className="text-lg text-muted-foreground">{data.intro}</p>
          <Button asChild size="lg"><Link to={data.ctaHref}>{data.ctaLabel} →</Link></Button>
        </header>

        <Card className="p-5">
          <h2 className="text-xl font-bold mb-3">What's inside</h2>
          <ul className="space-y-2 text-sm">
            {data.bullets.map((b, i) => (
              <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{b}</li>
            ))}
          </ul>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Sample {data.brand} questions</h2>
          <p className="text-sm text-muted-foreground">Try a few right here — every real question in the app follows the same format.</p>
          {data.samples.map((s, i) => (
            <Card key={i} className="p-4 space-y-3">
              <p className="font-semibold">{i + 1}. {s.stem}</p>
              <ol className="text-sm space-y-1">
                {s.options.map((opt, j) => (
                  <li key={j} className={j === s.correct ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                    {String.fromCharCode(65 + j)}. {opt} {j === s.correct && "✓"}
                  </li>
                ))}
              </ol>
              <details className="text-sm">
                <summary className="cursor-pointer text-primary">Show explanation</summary>
                <p className="mt-2 text-muted-foreground">{s.explanation}</p>
              </details>
            </Card>
          ))}
        </section>

        <Card className="p-6 text-center bg-primary/5 border-primary/30">
          <h2 className="text-2xl font-bold mb-2">Keep going — it's free</h2>
          <p className="text-muted-foreground mb-4">Hundreds more {data.brand} questions inside, plus adaptive drills tailored to your weak areas.</p>
          <Button asChild size="lg"><Link to={data.ctaHref}>{data.ctaLabel} →</Link></Button>
        </Card>
      </main>
    </div>
  );
}