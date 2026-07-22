import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Wind, Brain, Clock, CheckCircle2, Heart, Shield, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

interface Tip {
  title: string;
  emoji: string;
  content: string;
  details?: string[];
}

interface TipSection {
  category: string;
  icon: React.ReactNode;
  color: string;
  tips: Tip[];
}

const TIP_SECTIONS: TipSection[] = [
  {
    category: "Before the Test",
    icon: <Clock className="w-4 h-4" />,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    tips: [
      { title: "Sleep 8+ Hours", emoji: "😴", content: "Your brain consolidates memory during sleep. Cramming the night before hurts more than it helps.", details: ["Go to bed at your normal time", "Set 2 alarms to avoid stress", "No screens 30 min before bed"] },
      { title: "Eat a Good Breakfast", emoji: "🍳", content: "Protein + complex carbs = sustained energy. Avoid sugar crashes.", details: ["Eggs, oatmeal, fruit are great choices", "Avoid sugary cereals or energy drinks", "Bring a water bottle and snack"] },
      { title: "Arrive Early", emoji: "🏫", content: "Being rushed increases anxiety. Arrive 15-20 minutes early to settle in.", details: ["Know your testing room location", "Bring your ID and admission ticket", "Pack supplies the night before"] },
      { title: "Light Review Only", emoji: "📝", content: "The morning of, only do light review. Your brain needs to be fresh, not exhausted.", details: ["Glance at your cheat sheet or notes", "Don't try to learn new concepts", "Focus on formulas you tend to forget"] },
    ],
  },
  {
    category: "During the Test",
    icon: <Brain className="w-4 h-4" />,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    tips: [
      { title: "Read Every Word", emoji: "👀", content: "Most mistakes come from misreading the question. Underline key words.", details: ["Look for NOT, EXCEPT, LEAST", "Circle what they're actually asking", "Re-read before selecting your answer"] },
      { title: "Skip & Return", emoji: "⏭️", content: "Stuck on a question? Mark it and move on. Come back with fresh eyes.", details: ["Don't spend >90 seconds on any question", "Your subconscious works on it while you move on", "Easy points first, hard points last"] },
      { title: "Eliminate Wrong Answers", emoji: "✂️", content: "Cross out obviously wrong choices. Even eliminating 1 option improves your odds.", details: ["Look for extreme words (always, never)", "Check for answers that don't match the question type", "If two answers are very similar, one is likely correct"] },
      { title: "Watch the Clock", emoji: "⏰", content: "Pace yourself. Know how many minutes per question you have.", details: ["SAT: ~1.5 min per question", "Check time at the halfway point", "Save 2-3 minutes to review flagged questions"] },
      { title: "Trust Your First Instinct", emoji: "💡", content: "Studies show your first answer is usually right. Only change if you find a clear error.", details: ["Don't second-guess without a reason", "If you're torn between two, go with your gut", "Overthinking leads to wrong changes"] },
    ],
  },
  {
    category: "Anxiety Management",
    icon: <Heart className="w-4 h-4" />,
    color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    tips: [
      { title: "Box Breathing", emoji: "🫁", content: "4-4-4-4 breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Repeat 3-4 times.", details: ["Use during the test if you feel panicked", "Takes only 1 minute", "Proven to lower cortisol levels"] },
      { title: "Positive Self-Talk", emoji: "💪", content: "Replace 'I can't do this' with 'I've prepared for this. I can handle it.'", details: ["Write an affirmation on your scratch paper", "Remember: anxiety means you care", "You've answered harder questions in practice"] },
      { title: "Ground Yourself", emoji: "🌍", content: "5-4-3-2-1 technique: Name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.", details: ["Takes 30 seconds", "Pulls you out of spiral thinking", "Do this before the test starts"] },
      { title: "It's Just One Test", emoji: "🎯", content: "You can retake it. Colleges see your best score. This is practice for life, not a final verdict.", details: ["Most students take the SAT 2-3 times", "Score improvements of 100+ points are common", "This test doesn't define your worth"] },
    ],
  },
  {
    category: "Strategy Reminders",
    icon: <Shield className="w-4 h-4" />,
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    tips: [
      { title: "Answer Every Question", emoji: "✅", content: "No penalty for wrong answers on the SAT/PSAT. Never leave a question blank!", details: ["Even a random guess has 25% chance", "Mark your best guess before time runs out", "Bubble in answers as you go, not at the end"] },
      { title: "Use Your Calculator Wisely", emoji: "🔢", content: "Not every math question needs a calculator. Mental math is often faster.", details: ["Type carefully — calculator errors are common", "Use it for complex arithmetic only", "Estimate first, then verify"] },
      { title: "Mark Up the Passage", emoji: "📖", content: "On reading sections, annotate as you read. Underline main ideas and circle key details.", details: ["Write 2-3 word summaries per paragraph", "Note the author's tone and purpose", "Star evidence that supports the main argument"] },
      { title: "Check Units & Signs", emoji: "⚠️", content: "Many math errors come from wrong units, signs, or misread numbers.", details: ["Does the answer make sense?", "Did you account for negatives?", "Is the answer in the right units (cm vs m)?"] },
    ],
  },
];

const TestDayTips = () => {
  const navigate = useNavigate();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<"idle" | "inhale" | "hold1" | "exhale" | "hold2">("idle");
  const [breathCount, setBreathCount] = useState(0);
  const [breathTimer, setBreathTimer] = useState(0);
  const breathRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTip = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const startBreathing = () => {
    setBreathPhase("inhale");
    setBreathCount(0);
    setBreathTimer(4);
    runBreathCycle("inhale", 0);
  };

  const stopBreathing = () => {
    if (breathRef.current) clearInterval(breathRef.current);
    setBreathPhase("idle");
    setBreathCount(0);
  };

  const runBreathCycle = (phase: string, count: number) => {
    if (breathRef.current) clearInterval(breathRef.current);

    let currentPhase = phase;
    let currentCount = count;
    let timer = 4;
    setBreathTimer(4);

    breathRef.current = setInterval(() => {
      timer--;
      setBreathTimer(timer);

      if (timer <= 0) {
        if (currentPhase === "inhale") {
          currentPhase = "hold1";
        } else if (currentPhase === "hold1") {
          currentPhase = "exhale";
        } else if (currentPhase === "exhale") {
          currentPhase = "hold2";
        } else if (currentPhase === "hold2") {
          currentCount++;
          if (currentCount >= 4) {
            if (breathRef.current) clearInterval(breathRef.current);
            setBreathPhase("idle");
            setBreathCount(4);
            return;
          }
          currentPhase = "inhale";
        }
        timer = 4;
        setBreathTimer(4);
        setBreathPhase(currentPhase as any);
        setBreathCount(currentCount);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, []);

  const getBreathLabel = () => {
    switch (breathPhase) {
      case "inhale": return "Breathe In";
      case "hold1": return "Hold";
      case "exhale": return "Breathe Out";
      case "hold2": return "Hold";
      default: return "Ready";
    }
  };

  const getBreathScale = () => {
    if (breathPhase === "inhale") return 1 + ((4 - breathTimer) / 4) * 0.5;
    if (breathPhase === "hold1") return 1.5;
    if (breathPhase === "exhale") return 1.5 - ((4 - breathTimer) / 4) * 0.5;
    if (breathPhase === "hold2") return 1;
    return 1;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Test Day Tips</h1>
          <p className="text-xs text-muted-foreground">Maximize your performance</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Breathing Exercise Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Wind className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Box Breathing Exercise</h2>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: getBreathScale() }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-4"
              >
                {breathPhase !== "idle" ? (
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary">{breathTimer}</p>
                    <p className="text-[10px] text-primary/70">{getBreathLabel()}</p>
                  </div>
                ) : (
                  <Wind className="w-8 h-8 text-primary" />
                )}
              </motion.div>

              {breathPhase !== "idle" && (
                <p className="text-xs text-muted-foreground mb-2">Cycle {breathCount + 1} of 4</p>
              )}

              {breathCount === 4 && breathPhase === "idle" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">✨ Great job! Feel calmer?</p>
              )}

              <Button
                variant={breathPhase === "idle" ? "default" : "outline"}
                size="sm"
                onClick={breathPhase === "idle" ? startBreathing : stopBreathing}
              >
                {breathPhase === "idle" ? "Start Breathing" : "Stop"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tip Sections */}
        {TIP_SECTIONS.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${section.color}`}>
                {section.icon}
              </div>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">{section.category}</h2>
            </div>

            <div className="space-y-2">
              {section.tips.map((tip, ti) => {
                const tipId = `${si}-${ti}`;
                const isExpanded = expandedTip === tipId;

                return (
                  <Card key={ti} className="overflow-hidden">
                    <button
                      onClick={() => toggleTip(tipId)}
                      className="w-full text-left p-3 flex items-start gap-3"
                    >
                      <span className="text-lg shrink-0">{tip.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground">{tip.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tip.content}</p>
                      </div>
                      {tip.details && (
                        <span className="shrink-0 text-muted-foreground mt-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && tip.details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 ml-9 space-y-1">
                            {tip.details.map((detail, di) => (
                              <div key={di} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                <p className="text-xs text-muted-foreground">{detail}</p>
                              </div>
                            ))}
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

        {/* Quick Checklist */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Test Day Checklist
          </h3>
          <div className="space-y-2">
            {[
              "✅ Photo ID / Admission ticket",
              "✅ #2 pencils (at least 2)",
              "✅ Approved calculator with fresh batteries",
              "✅ Watch (no smart watches)",
              "✅ Water bottle & snack",
              "✅ Comfortable layers of clothing",
              "✅ Positive attitude 💪",
            ].map((item, i) => (
              <p key={i} className="text-xs text-foreground">{item}</p>
            ))}
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default TestDayTips;
