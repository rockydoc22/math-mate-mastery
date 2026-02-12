import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Zap, Trophy, Timer, RotateCcw, Brain, BookOpen, PenTool, Lightbulb } from "lucide-react";
import { satFacts, SATFact } from "@/data/satFacts";

type Category = "all" | "math" | "vocab" | "grammar" | "strategy";

const CHALLENGE_DURATION = 60; // seconds
const HIGH_SCORE_KEY = "rapid_facts_high_score";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(fact: SATFact): string[] {
  return shuffleArray([fact.correctAnswer, ...fact.wrongAnswers]);
}

const categoryConfig: Record<Exclude<Category, "all">, { label: string; icon: typeof Brain; color: string }> = {
  math: { label: "Math", icon: Brain, color: "text-primary" },
  vocab: { label: "Vocab", icon: BookOpen, color: "text-emerald-500" },
  grammar: { label: "Grammar", icon: PenTool, color: "text-purple-500" },
  strategy: { label: "Strategy", icon: Lightbulb, color: "text-amber-500" },
};

const RapidFacts = () => {
  const [category, setCategory] = useState<Category>("all");
  const [phase, setPhase] = useState<"menu" | "playing" | "results">("menu");
  const [queue, setQueue] = useState<SATFact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(() => {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? JSON.parse(stored) as Record<string, number> : {};
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentFact = queue[currentIndex] as SATFact | undefined;

  const startChallenge = useCallback(() => {
    const pool = category === "all" ? satFacts : satFacts.filter(f => f.category === category);
    const shuffled = shuffleArray(pool);
    setQueue(shuffled);
    setCurrentIndex(0);
    setChoices(buildChoices(shuffled[0]));
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(CHALLENGE_DURATION);
    setSelectedAnswer(null);
    setPhase("playing");
  }, [category]);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  // Save high score on results
  useEffect(() => {
    if (phase === "results") {
      const key = category;
      const prev = highScore[key] || 0;
      if (score > prev) {
        const updated = { ...highScore, [key]: score };
        setHighScore(updated);
        localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(updated));
      }
    }
  }, [phase, score, category, highScore]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // prevent double-tap
    setSelectedAnswer(answer);

    const correct = answer === currentFact?.correctAnswer;
    if (correct) {
      const newStreak = streak + 1;
      const bonus = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore(s => s + bonus);
      setStreak(newStreak);
      setBestStreak(bs => Math.max(bs, newStreak));
    } else {
      setStreak(0);
    }

    // Advance after brief flash
    setTimeout(() => {
      const next = currentIndex + 1;
      if (next >= queue.length) {
        // Reshuffle if we ran out
        const reshuffled = shuffleArray(queue);
        setQueue(reshuffled);
        setCurrentIndex(0);
        setChoices(buildChoices(reshuffled[0]));
      } else {
        setCurrentIndex(next);
        setChoices(buildChoices(queue[next]));
      }
      setSelectedAnswer(null);
    }, 400);
  };

  const getCategoryLabel = (fact: SATFact) => {
    const cfg = categoryConfig[fact.category];
    return cfg;
  };

  // ── MENU ──
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" /> Rapid Facts Challenge
              </h1>
              <p className="text-sm text-muted-foreground">Answer as many as you can in 60 seconds!</p>
            </div>
          </div>

          <Card className="p-6 space-y-4">
            <h2 className="font-semibold text-center">Choose Category</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={category === "all" ? "default" : "outline"}
                className="h-auto py-3 flex flex-col gap-1"
                onClick={() => setCategory("all")}
              >
                <Zap className="w-5 h-5" />
                <span className="text-sm">All Topics</span>
              </Button>
              {(Object.entries(categoryConfig) as [Exclude<Category,"all">, typeof categoryConfig["math"]][]).map(([key, cfg]) => (
                <Button
                  key={key}
                  variant={category === key ? "default" : "outline"}
                  className="h-auto py-3 flex flex-col gap-1"
                  onClick={() => setCategory(key)}
                >
                  <cfg.icon className={`w-5 h-5 ${category === key ? "" : cfg.color}`} />
                  <span className="text-sm">{cfg.label}</span>
                </Button>
              ))}
            </div>

            {/* High scores */}
            {Object.keys(highScore).length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center mb-2 flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-500" /> High Scores
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  {Object.entries(highScore).map(([k, v]) => (
                    <div key={k} className="p-2 bg-muted rounded-lg">
                      <span className="capitalize font-medium">{k}</span>: <span className="text-primary font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button size="lg" className="w-full gap-2 text-lg font-bold" onClick={startChallenge}>
              <Timer className="w-5 h-5" />
              Start 60s Challenge
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (phase === "results") {
    const prevHigh = highScore[category] || 0;
    const isNewRecord = score >= prevHigh && score > 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center space-y-6">
          <Trophy className={`w-16 h-16 mx-auto ${isNewRecord ? "text-amber-500" : "text-muted-foreground"}`} />
          {isNewRecord && <p className="text-amber-500 font-bold text-lg animate-pulse">🎉 New High Score!</p>}
          <div>
            <p className="text-5xl font-bold text-primary">{score}</p>
            <p className="text-muted-foreground">points</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-bold text-lg">{currentIndex}</p>
              <p className="text-muted-foreground">Answered</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-bold text-lg">{bestStreak}</p>
              <p className="text-muted-foreground">Best Streak</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="gap-2" onClick={startChallenge}>
              <RotateCcw className="w-4 h-4" /> Play Again
            </Button>
            <Button variant="outline" onClick={() => setPhase("menu")}>
              Change Category
            </Button>
            <Link to="/"><Button variant="ghost">Back to Home</Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  // ── PLAYING ──
  if (!currentFact) return null;

  const catCfg = getCategoryLabel(currentFact);
  const timerPct = (timeLeft / CHALLENGE_DURATION) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-lg">{score}</span>
            {streak >= 3 && (
              <span className="text-xs font-bold text-amber-500 animate-pulse">
                🔥 x{streak >= 5 ? 3 : 2}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Timer className={`w-4 h-4 ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
            <span className={`font-mono font-bold text-lg ${timeLeft <= 10 ? "text-destructive" : ""}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <Progress value={timerPct} className="h-2" />

        {/* Question Card */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <catCfg.icon className={`w-4 h-4 ${catCfg.color}`} />
            <span className={`text-xs font-medium uppercase tracking-wide ${catCfg.color}`}>{catCfg.label}</span>
          </div>
          <h2 className="text-xl font-bold mb-6">{currentFact.question}</h2>

          <div className="grid gap-3">
            {choices.map((choice, idx) => {
              let variant: "outline" | "default" | "destructive" = "outline";
              let extraClass = "hover:bg-primary/10";

              if (selectedAnswer) {
                if (choice === currentFact.correctAnswer) {
                  variant = "default";
                  extraClass = "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500";
                } else if (choice === selectedAnswer) {
                  variant = "destructive";
                  extraClass = "";
                } else {
                  extraClass = "opacity-50";
                }
              }

              return (
                <Button
                  key={idx}
                  variant={variant}
                  className={`h-auto py-3 px-4 text-left justify-start text-sm font-medium ${extraClass}`}
                  onClick={() => handleAnswer(choice)}
                  disabled={!!selectedAnswer}
                >
                  <span className="mr-2 font-bold text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                  {choice}
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RapidFacts;
