import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Trophy, Timer, RotateCcw, Brain, BookOpen, PenTool, Lightbulb, FlaskConical, ChevronDown, ChevronUp, XCircle, Flag } from "lucide-react";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { satFacts, SATFact, ExamType } from "@/data/satFacts";

type Category = "all" | "math" | "vocab" | "grammar" | "strategy" | "science";

const CHALLENGE_DURATION = 60;
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
  science: { label: "Science", icon: FlaskConical, color: "text-cyan-500" },
};

const examOptions: { key: ExamType; label: string }[] = [
  { key: "sat", label: "SAT" },
  { key: "psat", label: "PSAT" },
  { key: "act", label: "ACT" },
];

type MissedQuestion = { fact: SATFact; userAnswer: string };
type AnsweredQuestion = { fact: SATFact; userAnswer: string; correct: boolean };

const RapidFacts = () => {
  const [examFilter, setExamFilter] = useState<ExamType>("sat");
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
  const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>([]);
  const [allAnswered, setAllAnswered] = useState<AnsweredQuestion[]>([]);
  const [expandedMissed, setExpandedMissed] = useState<Set<string>>(new Set());
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showMissed, setShowMissed] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? JSON.parse(stored) as Record<string, number> : {};
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentFact = queue[currentIndex] as SATFact | undefined;

  // Filter facts by exam type
  const getFilteredFacts = useCallback(() => {
    let pool = satFacts.filter(f => f.exam?.includes(examFilter));
    if (category !== "all") pool = pool.filter(f => f.category === category);
    // Hide science for SAT/PSAT
    if (examFilter !== "act") pool = pool.filter(f => f.category !== "science");
    return pool;
  }, [examFilter, category]);

  // Available categories for current exam
  const availableCategories = (() => {
    const cats = new Set(satFacts.filter(f => f.exam?.includes(examFilter)).map(f => f.category));
    return Object.entries(categoryConfig).filter(([key]) => cats.has(key as Exclude<Category, "all">)) as [Exclude<Category, "all">, typeof categoryConfig["math"]][];
  })();

  const startChallenge = useCallback(() => {
    const pool = getFilteredFacts();
    if (pool.length === 0) return;
    const shuffled = shuffleArray(pool);
    setQueue(shuffled);
    setCurrentIndex(0);
    setChoices(buildChoices(shuffled[0]));
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(CHALLENGE_DURATION);
    setSelectedAnswer(null);
    setMissedQuestions([]);
    setAllAnswered([]);
    setExpandedMissed(new Set());
    setShowMissed(false);
    setPhase("playing");
  }, [getFilteredFacts]);

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

  // Save high score
  useEffect(() => {
    if (phase === "results") {
      const key = `${examFilter}_${category}`;
      const prev = highScore[key] || 0;
      if (score > prev) {
        const updated = { ...highScore, [key]: score };
        setHighScore(updated);
        localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(updated));
      }
    }
  }, [phase, score, category, examFilter, highScore]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const correct = answer === currentFact?.correctAnswer;
    
    // Track all answered questions for review
    if (currentFact) {
      setAllAnswered(prev =>
        prev.find(a => a.fact.id === currentFact.id)
          ? prev
          : [...prev, { fact: currentFact, userAnswer: answer, correct }]
      );
    }
    
    if (correct) {
      const newStreak = streak + 1;
      const bonus = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore(s => s + bonus);
      setStreak(newStreak);
      setBestStreak(bs => Math.max(bs, newStreak));
    } else {
      setStreak(0);
      // Track missed question (avoid duplicates by id)
      if (currentFact) {
        setMissedQuestions(prev =>
          prev.find(m => m.fact.id === currentFact.id)
            ? prev
            : [...prev, { fact: currentFact, userAnswer: answer }]
        );
      }
    }
    setTimeout(() => {
      const next = currentIndex + 1;
      if (next >= queue.length) {
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

  // ── MENU ──
  if (phase === "menu") {
    const factCount = getFilteredFacts().length;
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
            {/* Exam selector */}
            <div>
              <h2 className="font-semibold text-center mb-2">Select Test</h2>
              <div className="flex gap-2 justify-center">
                {examOptions.map(opt => (
                  <Button
                    key={opt.key}
                    variant={examFilter === opt.key ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => { setExamFilter(opt.key); setCategory("all"); }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category selector */}
            <div>
              <h2 className="font-semibold text-center mb-2">Choose Category</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={category === "all" ? "default" : "outline"}
                  className="h-auto py-3 flex flex-col gap-1"
                  onClick={() => setCategory("all")}
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">All Topics</span>
                </Button>
                {availableCategories.map(([key, cfg]) => (
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
            </div>

            {/* Fact count */}
            <p className="text-xs text-center text-muted-foreground">{factCount} facts available</p>

            {/* High scores */}
            {Object.keys(highScore).length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center mb-2 flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-500" /> High Scores
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  {Object.entries(highScore).map(([k, v]) => (
                    <div key={k} className="p-2 bg-muted rounded-lg">
                      <span className="capitalize font-medium">{k.replace("_", " ")}</span>: <span className="text-primary font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button size="lg" className="w-full gap-2 text-lg font-bold" onClick={startChallenge} disabled={factCount === 0}>
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
    const key = `${examFilter}_${category}`;
    const prevHigh = highScore[key] || 0;
    const isNewRecord = score >= prevHigh && score > 0;

    const toggleExpanded = (id: string) => {
      setExpandedMissed(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 py-8">
        <div className="max-w-md mx-auto space-y-4">
          <Card className="p-8 text-center space-y-6">
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

            {/* Review all questions CTA */}
            <button
              onClick={() => setShowMissed(v => !v)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20 text-left hover:bg-primary/15 transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold text-primary">
                <BookOpen className="w-4 h-4" />
                Review All {allAnswered.length} Questions
                {missedQuestions.length > 0 && (
                  <span className="text-xs text-destructive">({missedQuestions.length} missed)</span>
                )}
              </span>
              {showMissed ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
            </button>
            {missedQuestions.length === 0 && (
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">🎯 Perfect run — no missed questions!</p>
            )}

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

          {/* Full question review */}
          {showMissed && allAnswered.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2 px-1">
                <BookOpen className="w-5 h-5 text-primary" />
                All Questions ({allAnswered.filter(a => a.correct).length} ✓ / {allAnswered.filter(a => !a.correct).length} ✗)
              </h3>
              {allAnswered.map(({ fact, userAnswer, correct }) => {
                const cfg = categoryConfig[fact.category] || categoryConfig.strategy;
                const isOpen = expandedMissed.has(fact.id);
                return (
                  <Card key={fact.id} className={`overflow-hidden ${correct ? 'border-emerald-500/20' : 'border-destructive/20'}`}>
                    <button
                      className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-muted/50 transition-colors"
                      onClick={() => toggleExpanded(fact.id)}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className={`text-lg shrink-0 ${correct ? '' : ''}`}>{correct ? '✓' : '✗'}</span>
                        <span className="font-medium text-sm leading-snug">{fact.question}</span>
                      </div>
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
                        : <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-2 border-t pt-3">
                        <div className="flex items-start gap-2 text-sm">
                          <span className={`font-semibold shrink-0 ${correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                            {correct ? '✓ Your answer:' : '✗ Your answer:'}
                          </span>
                          <span className={correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}>{userAnswer}</span>
                        </div>
                        {!correct && (
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold shrink-0 text-emerald-600 dark:text-emerald-400">✓ Correct:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{fact.correctAnswer}</span>
                          </div>
                        )}
                        <div className="pt-1 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            <cfg.icon className={`w-3 h-3 mr-1 ${cfg.color}`} />
                            {cfg.label}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }


  // ── PLAYING ──
  if (!currentFact) return null;
  const catCfg = categoryConfig[currentFact.category] || categoryConfig.strategy;
  const timerPct = (timeLeft / CHALLENGE_DURATION) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-lg mx-auto space-y-4">
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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <catCfg.icon className={`w-4 h-4 ${catCfg.color}`} />
              <span className={`text-xs font-medium uppercase tracking-wide ${catCfg.color}`}>{catCfg.label}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setIsFlagModalOpen(true)} title="Report issue">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
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

        {currentFact && (
          <FlagQuestionModal
            isOpen={isFlagModalOpen}
            onClose={() => setIsFlagModalOpen(false)}
            questionId={currentFact.id}
            questionType="math"
            questionData={{ question: currentFact.question, options: choices.map((c, i) => ({ letter: String.fromCharCode(65 + i), text: c })), correctAnswer: currentFact.correctAnswer, explanation: '' }}
          />
        )}
      </div>
    </div>
  );
};

export default RapidFacts;
