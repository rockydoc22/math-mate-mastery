import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Check, X, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

interface CognitiveItem {
  id: string;
  age_range: string;
  type: string;
  prompt: string;
  answer: string;
  skill: string;
  difficulty: string;
}

const AGE_RANGES = [
  { id: "6-8", label: "Ages 6–8", emoji: "🧒", file: "cognitive_items_age_6_8.json" },
  { id: "9-12", label: "Ages 9–12", emoji: "👦", file: "cognitive_items_age_9_12.json" },
  { id: "13-17", label: "Ages 13–17", emoji: "🧑", file: "cognitive_items_age_13_17.json" },
  { id: "18+", label: "Ages 18+", emoji: "🧑‍🎓", file: "cognitive_items_age_18_plus.json" },
];

const FILE_IMPORTERS: Record<string, () => Promise<any>> = {
  "cognitive_items_age_6_8.json": () => import("@/data/cognitive_items_age_6_8.json"),
  "cognitive_items_age_9_12.json": () => import("@/data/cognitive_items_age_9_12.json"),
  "cognitive_items_age_13_17.json": () => import("@/data/cognitive_items_age_13_17.json"),
  "cognitive_items_age_18_plus.json": () => import("@/data/cognitive_items_age_18_plus.json"),
};

type Mode = "select" | "playing" | "results";

const CognitiveSkills = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("select");
  const [items, setItems] = useState<CognitiveItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const loadItems = async (file: string) => {
    const importer = FILE_IMPORTERS[file];
    if (!importer) return;
    const mod = await importer();
    const data = (mod.default || mod) as CognitiveItem[];
    // Shuffle and take 10
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
    setItems(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer("");
    setShowFeedback(null);
    setStartTime(Date.now());
    setMode("playing");
  };

  const checkAnswer = () => {
    const item = items[currentIndex];
    const isCorrect = userAnswer.trim().toLowerCase() === item.answer.toLowerCase();
    if (isCorrect) setScore((s) => s + 1);
    setShowFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setShowFeedback(null);
      setUserAnswer("");
      if (currentIndex < items.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setTotalTime(Math.round((Date.now() - startTime) / 1000));
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
          <p className="font-bold">Sign in to play</p>
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
            <Brain className="w-5 h-5 text-primary" /> Cognitive Skills
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "select" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Choose your age group for tailored cognitive challenges
            </p>
            {AGE_RANGES.map((range) => (
              <Card
                key={range.id}
                className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => loadItems(range.file)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{range.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold">{range.label}</h3>
                    <p className="text-xs text-muted-foreground">
                      Pattern recognition, logic, analogies & more
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {mode === "playing" && currentItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">
                {currentIndex + 1}/{items.length}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {score} ✓
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-muted">{currentItem.type.replace(/_/g, " ")}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted">{currentItem.skill}</span>
                  </div>
                  <p className="text-lg font-medium leading-relaxed">{currentItem.prompt}</p>

                  {showFeedback ? (
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${showFeedback === "correct" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-destructive/10 text-destructive"}`}>
                      {showFeedback === "correct" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      <span className="font-medium">
                        {showFeedback === "correct" ? "Correct!" : `Answer: ${currentItem.answer}`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer..."
                        onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && checkAnswer()}
                        autoFocus
                      />
                      <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                        Check
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {mode === "results" && (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold">{score}/{items.length}</h2>
              <p className="text-sm text-muted-foreground">
                {Math.round((score / items.length) * 100)}% correct
              </p>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {totalTime}s total
              </div>
            </Card>

            <Button className="w-full" onClick={() => setMode("select")}>
              Try Another Level
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CognitiveSkills;
