import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Trophy, BarChart3, Clock, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

interface IQItem {
  id: string;
  age_range: string;
  domain: string;
  prompt: string;
  options: string[];
  answer: string;
  difficulty: string;
}

interface DomainScore {
  domain: string;
  label: string;
  correct: number;
  total: number;
  pct: number;
}

const AGE_RANGES = [
  { id: "6-8", label: "Ages 6–8", emoji: "🧒", desc: "Pattern recognition, basic reasoning, memory" },
  { id: "9-12", label: "Ages 9–12", emoji: "👦", desc: "Logic puzzles, spatial thinking, verbal analogies" },
  { id: "13-17", label: "Ages 13–17", emoji: "🧑", desc: "Abstract reasoning, advanced patterns, deduction" },
  { id: "18+", label: "Ages 18+", emoji: "🧑‍🎓", desc: "Complex logic, mathematical reasoning, paradoxes" },
];

const FILE_IMPORTERS: Record<string, () => Promise<any>> = {
  "6-8": () => import("@/data/iq_items_age_6_8.json"),
  "9-12": () => import("@/data/iq_items_age_9_12.json"),
  "13-17": () => import("@/data/iq_items_age_13_17.json"),
  "18+": () => import("@/data/iq_items_age_18_plus.json"),
};

const DOMAIN_LABELS: Record<string, string> = {
  pattern_recognition: "Pattern Recognition",
  spatial_reasoning: "Spatial Reasoning",
  verbal_reasoning: "Verbal Reasoning",
  numerical_reasoning: "Numerical Reasoning",
  logical_reasoning: "Logical Reasoning",
  memory_processing: "Working Memory",
  abstract_reasoning: "Abstract Reasoning",
};

const DIFFICULTY_WEIGHT: Record<string, number> = { easy: 1, medium: 1.5, hard: 2 };

type Mode = "select" | "quiz" | "results";

const computeIQEstimate = (
  weightedScore: number,
  maxWeighted: number,
  ageRange: string
): number => {
  const ratio = weightedScore / maxWeighted;
  // Bell curve mapping: mean=100, SD=15
  // Map ratio 0-1 to roughly 55-145 range
  const baseIQ = 55 + ratio * 90;
  // Age adjustment: younger kids get slight boost for attempting hard content
  const ageBonus = ageRange === "6-8" ? 3 : ageRange === "9-12" ? 1 : 0;
  return Math.round(Math.min(145, Math.max(55, baseIQ + ageBonus)));
};

const getIQLabel = (iq: number): { label: string; color: string; desc: string } => {
  if (iq >= 130) return { label: "Exceptionally High", color: "text-yellow-500", desc: "Top 2% — exceptional abstract reasoning and problem-solving ability." };
  if (iq >= 120) return { label: "Very High", color: "text-emerald-500", desc: "Top 10% — strong analytical and reasoning skills across domains." };
  if (iq >= 110) return { label: "Above Average", color: "text-blue-500", desc: "Above average cognitive ability with strong pattern recognition." };
  if (iq >= 90) return { label: "Average", color: "text-foreground", desc: "Solid cognitive ability — right in the typical range for your age group." };
  if (iq >= 80) return { label: "Below Average", color: "text-orange-500", desc: "Some areas may benefit from targeted practice and skill-building." };
  return { label: "Developing", color: "text-muted-foreground", desc: "Keep practicing! Cognitive skills improve significantly with regular exercise." };
};

const IQTest = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("select");
  const [ageRange, setAgeRange] = useState("");
  const [items, setItems] = useState<IQItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [iqScore, setIqScore] = useState(0);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const QUESTION_COUNT = 25; // Per test session

  const loadTest = async (age: string) => {
    const mod = await FILE_IMPORTERS[age]();
    const data = (mod.default || mod) as IQItem[];
    // Stratified sampling: pick from each domain, shuffle within
    const byDomain: Record<string, IQItem[]> = {};
    data.forEach((item) => {
      if (!byDomain[item.domain]) byDomain[item.domain] = [];
      byDomain[item.domain].push(item);
    });
    // Shuffle each domain
    Object.values(byDomain).forEach((arr) => arr.sort(() => Math.random() - 0.5));

    // Round-robin pick from domains
    const selected: IQItem[] = [];
    const domains = Object.keys(byDomain);
    let di = 0;
    while (selected.length < QUESTION_COUNT && domains.some((d) => byDomain[d].length > 0)) {
      const domain = domains[di % domains.length];
      if (byDomain[domain].length > 0) {
        selected.push(byDomain[domain].shift()!);
      }
      di++;
    }

    // Shuffle final order
    selected.sort(() => Math.random() - 0.5);
    setItems(selected);
    setAgeRange(age);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowFeedback(false);
    setStartTime(Date.now());
    setMode("quiz");
  };

  const handleAnswer = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    const item = items[currentIndex];
    const newAnswers = { ...answers, [item.id]: option };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
      if (currentIndex < items.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        // Calculate results
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        setTotalTime(elapsed);

        const domainMap: Record<string, { correct: number; total: number }> = {};
        let weightedScore = 0;
        let maxWeighted = 0;

        items.forEach((it) => {
          if (!domainMap[it.domain]) domainMap[it.domain] = { correct: 0, total: 0 };
          domainMap[it.domain].total += 1;
          const weight = DIFFICULTY_WEIGHT[it.difficulty] || 1;
          maxWeighted += weight;
          if (newAnswers[it.id] === it.answer) {
            domainMap[it.domain].correct += 1;
            weightedScore += weight;
          }
        });

        const scores: DomainScore[] = Object.entries(domainMap).map(([domain, { correct, total }]) => ({
          domain,
          label: DOMAIN_LABELS[domain] || domain,
          correct,
          total,
          pct: Math.round((correct / total) * 100),
        }));

        setDomainScores(scores.sort((a, b) => b.pct - a.pct));
        setIqScore(computeIQEstimate(weightedScore, maxWeighted, ageRange));
        setMode("results");
      }
    }, 1200);
  };

  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? Math.round(((currentIndex + 1) / items.length) * 100) : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to take the IQ Assessment</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> IQ Assessment
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "select" && (
          <div className="space-y-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Non-clinical cognitive assessment.</strong> This test measures pattern recognition,
                spatial reasoning, verbal ability, numerical reasoning, logic, and working memory.
                Results are estimates for educational purposes only. Take it multiple times — questions are randomized!
              </p>
            </Card>

            <h2 className="font-bold text-lg">Select Your Age Group</h2>

            {AGE_RANGES.map((age) => (
              <Card
                key={age.id}
                className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => loadTest(age.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{age.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold">{age.label}</h3>
                    <p className="text-sm text-muted-foreground">{age.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">25 questions • ~10-15 min</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {mode === "quiz" && currentItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">
                {currentIndex + 1}/{items.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {DOMAIN_LABELS[currentItem.domain] || currentItem.domain}
              </span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                currentItem.difficulty === "hard"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : currentItem.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {currentItem.difficulty}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">
                  <p className="text-lg font-medium mb-6 leading-relaxed">
                    {currentItem.prompt}
                  </p>
                  <div className="space-y-2">
                    {currentItem.options.map((option, i) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentItem.answer;
                      let variant: "outline" | "default" | "destructive" = "outline";
                      let extraClass = "";

                      if (showFeedback) {
                        if (isCorrect) {
                          extraClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                        } else if (isSelected && !isCorrect) {
                          extraClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                        } else {
                          extraClass = "opacity-50";
                        }
                      }

                      return (
                        <Button
                          key={i}
                          variant={variant}
                          className={`w-full justify-start text-left h-auto py-3 ${extraClass}`}
                          onClick={() => handleAnswer(option)}
                          disabled={showFeedback}
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-3 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {option}
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {mode === "results" && (
          <div className="space-y-6">
            {/* IQ Score Card */}
            <Card className="p-6 text-center">
              <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Estimated IQ Score</h2>
              <p className={`text-5xl font-black ${getIQLabel(iqScore).color}`}>{iqScore}</p>
              <p className={`text-lg font-bold mt-1 ${getIQLabel(iqScore).color}`}>
                {getIQLabel(iqScore).label}
              </p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                {getIQLabel(iqScore).desc}
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(totalTime / 60)}m {totalTime % 60}s
                </span>
                <span>
                  {Object.values(answers).filter((a, i) => a === items[i]?.answer).length}/{items.length} correct
                </span>
              </div>
            </Card>

            {/* Bell Curve */}
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Where You Fall
              </h3>
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-[2%] bg-red-200 dark:bg-red-900/30" />
                  <div className="w-[14%] bg-orange-200 dark:bg-orange-900/30" />
                  <div className="w-[34%] bg-yellow-200 dark:bg-yellow-900/30" />
                  <div className="w-[34%] bg-green-200 dark:bg-green-900/30" />
                  <div className="w-[14%] bg-blue-200 dark:bg-blue-900/30" />
                  <div className="w-[2%] bg-purple-200 dark:bg-purple-900/30" />
                </div>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-primary rounded-full shadow-lg"
                  style={{ left: `${Math.min(98, Math.max(2, ((iqScore - 55) / 90) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                <span>55</span><span>70</span><span>85</span><span>100</span><span>115</span><span>130</span><span>145</span>
              </div>
            </Card>

            {/* Domain Breakdown */}
            <h3 className="font-bold text-sm">Domain Breakdown</h3>
            <div className="space-y-3">
              {domainScores.map((d) => (
                <Card key={d.domain} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm">{d.label}</h4>
                    <span className="text-xs font-mono text-muted-foreground">
                      {d.correct}/{d.total} ({d.pct}%)
                    </span>
                  </div>
                  <Progress value={d.pct} className="h-2" />
                </Card>
              ))}
            </div>

            {/* Disclaimer */}
            <Card className="p-3 bg-muted/50">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ This is a non-clinical educational estimate. Scores may vary between sessions.
                For a clinical IQ assessment, consult a licensed psychologist.
              </p>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => loadTest(ageRange)}>
                Retake Test
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => { setMode("select"); }}>
                Change Age
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IQTest;
