import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Heart, Flame, Trophy, Zap, RotateCcw, Shield } from "lucide-react";
import { questions, Question } from "@/data/questions";
import { englishQuestions, EnglishQuestion } from "@/data/englishQuestions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { MathText } from "@/components/MathText";
import { ClickableText } from "@/components/ClickableText";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type RunQuestion = (Question | EnglishQuestion) & { qType: "math" | "english" };

const MAX_HEALTH = 3;
const STREAK_BONUS_THRESHOLD = 5;
const DIFFICULTY_RAMP_INTERVAL = 5; // every 5 questions, difficulty floor rises

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDifficultyPool(allQ: RunQuestion[], minDiff: number, maxDiff: number): RunQuestion[] {
  return allQ.filter(q => {
    const d = q.difficultyRating || 5;
    return d >= minDiff && d <= maxDiff;
  });
}

const PB_KEY = "endurance_run_pb";

export default function EnduranceRun() {
  const { user } = useAuth();

  // Game state
  const [phase, setPhase] = useState<"menu" | "playing" | "gameover">("menu");
  const [subject, setSubject] = useState<"math" | "english" | "mixed">("mixed");
  const [health, setHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);

  // Personal best
  const [personalBest, setPersonalBest] = useState(() => {
    const stored = localStorage.getItem(PB_KEY);
    return stored ? JSON.parse(stored) : { score: 0, questions: 0 };
  });

  // Build question pool
  const allQuestions = useMemo(() => {
    const mathQ: RunQuestion[] = questions.map(q => ({ ...q, qType: "math" as const }));
    const engQ: RunQuestion[] = englishQuestions.map(q => ({ ...q, qType: "english" as const }));
    if (subject === "math") return shuffle(mathQ);
    if (subject === "english") return shuffle(engQ);
    return shuffle([...mathQ, ...engQ]);
  }, [subject]);

  // Difficulty ramp: as you answer more questions, minimum difficulty rises
  const currentDiffFloor = Math.min(1 + Math.floor(answered / DIFFICULTY_RAMP_INTERVAL), 8);
  
  const questionPool = useMemo(() => {
    const pool = getDifficultyPool(allQuestions, currentDiffFloor, 10);
    return pool.length > 0 ? pool : allQuestions;
  }, [allQuestions, currentDiffFloor]);

  const currentQuestion = questionPool[questionIndex % questionPool.length];

  const startRun = (subj: "math" | "english" | "mixed") => {
    setSubject(subj);
    setPhase("playing");
    setHealth(MAX_HEALTH);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setQuestionIndex(0);
    setAnswered(0);
    setCorrect(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShieldActive(false);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    setAnswered(a => a + 1);

    if (isCorrect) {
      const streakBonus = streak >= STREAK_BONUS_THRESHOLD ? 2 : 1;
      const diffBonus = Math.max(1, Math.floor((currentQuestion.difficultyRating || 5) / 2));
      const points = 10 * streakBonus * diffBonus;
      setScore(s => s + points);
      setCorrect(c => c + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });

      // Grant shield at streak milestones
      if ((streak + 1) % 10 === 0 && !shieldActive) {
        setShieldActive(true);
        toast.success("🛡️ Shield earned! Your next miss is forgiven.");
      }
    } else {
      setStreak(0);
      if (shieldActive) {
        setShieldActive(false);
        toast.info("🛡️ Shield absorbed the hit!");
      } else {
        const newHealth = health - 1;
        setHealth(newHealth);
        if (newHealth <= 0) {
          // Game over after showing the result
          setTimeout(() => endRun(), 1500);
        }
      }
    }
  };

  const endRun = useCallback(() => {
    setPhase("gameover");
    // Check personal best
    if (score > personalBest.score) {
      const newPB = { score, questions: answered };
      setPersonalBest(newPB);
      localStorage.setItem(PB_KEY, JSON.stringify(newPB));
      toast.success("🏆 New Personal Best!");
    }
    // Save to DB if logged in
    if (user) {
      supabase.from("quiz_scores").insert({
        user_id: user.id,
        score,
        total_questions: answered,
        percentage: answered > 0 ? Math.round((correct / answered) * 100) : 0,
        subject: `endurance_${subject}`,
      }).then(({ error }) => {
        if (error) console.error("Failed to save endurance score:", error);
      });
    }
  }, [score, answered, correct, subject, user, personalBest]);

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestionIndex(i => i + 1);
  };

  // MENU
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-primary/10 p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                Endurance Run
              </h1>
              <p className="text-sm text-muted-foreground">How far can you go?</p>
            </div>
          </div>

          {/* Personal Best */}
          {personalBest.score > 0 && (
            <Card className="p-4 mb-6 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Personal Best</p>
                  <p className="text-xl font-bold text-foreground">{personalBest.score.toLocaleString()} pts</p>
                  <p className="text-xs text-muted-foreground">{personalBest.questions} questions survived</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2 text-foreground">Rules</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> You start with 3 lives</li>
              <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> Difficulty increases as you go</li>
              <li className="flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Streak bonuses multiply your score</li>
              <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /> Earn shields at 10-streak milestones</li>
            </ul>
          </Card>

          <h2 className="text-lg font-semibold mb-3 text-center text-foreground">Choose Your Subject</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "math" as const, emoji: "📐", label: "Math" },
              { id: "english" as const, emoji: "📝", label: "English" },
              { id: "mixed" as const, emoji: "🎯", label: "Both" },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => startRun(s.id)}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-card hover:bg-primary/10 hover:border-primary/30 transition-all hover:scale-105"
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-semibold text-foreground">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // GAME OVER
  if (phase === "gameover") {
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const isNewPB = score >= personalBest.score && score > 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-primary/10 p-4">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
            <div className="text-6xl mb-4">{isNewPB ? "🏆" : "💀"}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isNewPB ? "New Record!" : "Run Over!"}
            </h1>
          </motion.div>

          <Card className="p-6 mt-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{score.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{answered}</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">{bestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-3 mt-6">
            <Button onClick={() => startRun(subject)} className="flex-1 gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;
  const qType = currentQuestion.qType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-primary/10 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Top HUD */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_HEALTH }).map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 transition-all ${i < health ? "text-red-500 fill-red-500" : "text-muted-foreground/30"}`}
              />
            ))}
            {shieldActive && <Shield className="w-5 h-5 text-blue-500 fill-blue-200 ml-1" />}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Flame className={`w-5 h-5 ${streak >= STREAK_BONUS_THRESHOLD ? "text-orange-500 animate-pulse" : "text-muted-foreground"}`} />
              <span className="font-bold text-foreground">{streak}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{score.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Q{answered + 1} • Diff {currentDiffFloor}+</p>
            </div>
          </div>
        </div>

        {/* Streak bonus indicator */}
        {streak >= STREAK_BONUS_THRESHOLD && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-2"
          >
            <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
              🔥 {streak} STREAK — 2× POINTS!
            </span>
          </motion.div>
        )}

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-5 sm:p-6 border-2 shadow-xl">
              <div className="space-y-1 mb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {currentQuestion.domain} • {currentQuestion.skill}
                </p>
                <h2 className="text-base sm:text-lg font-bold leading-relaxed whitespace-pre-wrap">
                  {qType === "math" ? <MathText text={currentQuestion.question} /> : <ClickableText text={currentQuestion.question} />}
                </h2>
              </div>

              <div className="space-y-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.letter;
                  const isCorrect = option.letter === currentQuestion.correctAnswer;
                  let style = "border-border bg-card hover:bg-accent/50";
                  if (showResult) {
                    if (isCorrect) style = "border-green-500 bg-green-500/10";
                    else if (isSelected && !isCorrect) style = "border-red-500 bg-red-500/10";
                    else style = "border-border bg-card opacity-50";
                  } else if (isSelected) {
                    style = "border-primary bg-primary/10";
                  }
                  return (
                    <button
                      key={option.letter}
                      onClick={() => handleAnswer(option.letter)}
                      disabled={showResult}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${style}`}
                    >
                      <span className="font-bold mr-2">{option.letter}.</span>
                      {qType === "math" ? <MathText text={option.text} /> : option.text}
                    </button>
                  );
                })}
              </div>

              {/* Result feedback */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className={`p-3 rounded-lg ${isCorrectAnswer ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                    <p className={`font-bold text-sm ${isCorrectAnswer ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {isCorrectAnswer ? "✅ Correct!" : `❌ Wrong — Answer: ${currentQuestion.correctAnswer}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{currentQuestion.explanation}</p>
                  </div>
                  {health > 0 && (
                    <Button onClick={nextQuestion} className="w-full mt-3">
                      Next Question →
                    </Button>
                  )}
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
