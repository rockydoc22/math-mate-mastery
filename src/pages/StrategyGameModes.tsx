import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Crosshair, Zap, Brain, Swords, Clock, Pause, Play, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Question } from "@/data/questions";
import { EliminationMode } from "@/components/alt-assessments/EliminationMode";
import { ConfidenceRating } from "@/components/alt-assessments/ConfidenceRating";
import { useTimedMode } from "@/hooks/useTimedMode";

type GameMode = "menu" | "elimination_lab" | "time_attack" | "confidence_meter" | "boss_battle";

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

const QUESTION_COUNT = 10;

const modeCards = [
  {
    id: "elimination_lab" as GameMode,
    icon: <Crosshair className="w-6 h-6" />,
    title: "Elimination Lab",
    desc: "Cross out distractors to earn bonus points. Better elimination = higher score.",
    color: "text-destructive",
  },
  {
    id: "time_attack" as GameMode,
    icon: <Zap className="w-6 h-6" />,
    title: "Time Attack",
    desc: "30 seconds per question. Speed + accuracy = max points.",
    color: "text-orange-500",
  },
  {
    id: "confidence_meter" as GameMode,
    icon: <Brain className="w-6 h-6" />,
    title: "Confidence Meter",
    desc: "Rate your confidence after each answer. Build metacognition.",
    color: "text-secondary",
  },
  {
    id: "boss_battle" as GameMode,
    icon: <Swords className="w-6 h-6" />,
    title: "Boss Battle Review",
    desc: "Face your hardest missed questions. Defeat the boss to level up.",
    color: "text-primary",
  },
];

const StrategyGameModes = () => {
  const [mode, setMode] = useState<GameMode>("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [awaitingConfidence, setAwaitingConfidence] = useState(false);
  const [confidenceLog, setConfidenceLog] = useState<{ confidence: string; correct: boolean }[]>([]);
  const [eliminationBonuses, setEliminationBonuses] = useState(0);
  const [bossHP, setBossHP] = useState(100);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const gameQuestions = useMemo(() => {
    if (mode === "menu") return [];
    if (mode === "boss_battle") {
      // Pick harder questions (rating >= 6)
      const hard = questions.filter(q => (q.difficultyRating || 5) >= 6);
      return shuffleArray(hard).slice(0, QUESTION_COUNT);
    }
    return shuffleArray([...questions]).slice(0, QUESTION_COUNT);
  }, [mode]);

  const timer = useTimedMode({
    mode: 'per_question',
    secondsPerQuestion: mode === "time_attack" ? 30 : 999,
    onTimeUp: () => {
      if (mode === "time_attack") {
        advance();
      }
    },
  });

  const currentQ = gameQuestions[currentIndex];
  const progress = gameQuestions.length > 0 ? ((currentIndex + 1) / gameQuestions.length) * 100 : 0;

  const handleAnswer = (correct: boolean) => {
    setLastAnswerCorrect(correct);
    if (correct) setScore(s => s + 1);

    if (mode === "boss_battle" && correct) {
      setBossHP(hp => Math.max(0, hp - (100 / QUESTION_COUNT)));
    }

    if (mode === "confidence_meter") {
      setAwaitingConfidence(true);
      return;
    }

    setTimeout(() => advance(), 1000);
  };

  const handleConfidence = (level: "high" | "medium" | "low") => {
    setConfidenceLog(prev => [...prev, { confidence: level, correct: lastAnswerCorrect }]);
    setAwaitingConfidence(false);
    advance();
  };

  const advance = () => {
    if (currentIndex + 1 >= gameQuestions.length) {
      setFinished(true);
      timer.pause();
    } else {
      setCurrentIndex(i => i + 1);
      if (mode === "time_attack") timer.nextQuestion();
    }
  };

  const restart = () => {
    setMode("menu");
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setAwaitingConfidence(false);
    setConfidenceLog([]);
    setEliminationBonuses(0);
    setBossHP(100);
    timer.reset();
  };

  // MENU
  if (mode === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
            <h1 className="text-2xl font-bold text-primary">Strategy Game Modes</h1>
          </div>
          <p className="text-muted-foreground text-sm">Master test-taking strategies through gameplay.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modeCards.map(card => (
              <motion.button
                key={card.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(card.id)}
                className="flex items-start gap-3 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all text-left"
              >
                <div className={`p-2 rounded-lg bg-primary/10 ${card.color}`}>{card.icon}</div>
                <div>
                  <p className="font-semibold text-foreground">{card.title}</p>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (finished) {
    const pct = Math.round((score / gameQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-6 bg-card rounded-2xl border border-border shadow-lg space-y-4 text-center"
        >
          {mode === "boss_battle" && (
            <div className="text-4xl">{bossHP <= 0 ? "🏆" : "💀"}</div>
          )}
          <h2 className="text-3xl font-bold text-primary">{pct}%</h2>
          <p className="text-lg text-foreground">{score}/{gameQuestions.length} correct</p>

          {mode === "boss_battle" && (
            <p className={`text-sm font-semibold ${bossHP <= 0 ? "text-success" : "text-destructive"}`}>
              {bossHP <= 0 ? "Boss Defeated! 🎉" : `Boss survived with ${Math.round(bossHP)}% HP`}
            </p>
          )}

          {mode === "elimination_lab" && eliminationBonuses > 0 && (
            <p className="text-sm text-muted-foreground">Elimination bonuses earned: +{eliminationBonuses}</p>
          )}

          {confidenceLog.length > 0 && (
            <div className="text-left space-y-1 mt-3">
              <p className="text-sm font-semibold text-foreground">Confidence Analysis:</p>
              {["high", "medium", "low"].map(level => {
                const entries = confidenceLog.filter(c => c.confidence === level);
                if (!entries.length) return null;
                const accuracy = Math.round((entries.filter(e => e.correct).length / entries.length) * 100);
                const calibrated = level === "high" ? accuracy >= 80 : level === "low" ? accuracy <= 40 : true;
                return (
                  <div key={level} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{level === "high" ? "😎" : level === "medium" ? "🤔" : "😰"} {level}:</span>
                    <span>{accuracy}% accurate ({entries.length} Qs)</span>
                    <span className={calibrated ? "text-success" : "text-orange-500"}>
                      {calibrated ? "✓ Well-calibrated" : "⚠ Miscalibrated"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button onClick={restart} variant="outline" className="flex-1">Play Again</Button>
            <Link to="/" className="flex-1"><Button className="w-full">Home</Button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // PLAYING
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8 pb-28 sm:pb-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={restart}>
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Button>
            <h1 className="text-xl font-bold text-primary">
              {modeCards.find(c => c.id === mode)?.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Attack timer */}
            {mode === "time_attack" && (
              <button
                onClick={timer.toggle}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm font-bold transition-colors ${
                  timer.timeRemaining <= 5 ? "bg-destructive/20 text-destructive animate-pulse" :
                  timer.timeRemaining <= 10 ? "bg-orange-500/20 text-orange-500" :
                  "bg-primary/10 text-primary"
                }`}
              >
                <Clock className="w-4 h-4" />
                {timer.formattedTime}
                {timer.isRunning ? <Pause className="w-3 h-3 opacity-50" /> : <Play className="w-3 h-3 opacity-50" />}
              </button>
            )}

            <span className="text-sm font-medium px-3 py-1.5 bg-primary/10 text-primary rounded-full">
              {score}/{currentIndex + 1}
            </span>
          </div>
        </div>

        {/* Boss HP Bar */}
        {mode === "boss_battle" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-destructive flex items-center gap-1">
                <Swords className="w-3 h-3" /> Boss HP
              </span>
              <span className="text-muted-foreground">{Math.round(bossHP)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-destructive to-orange-500 rounded-full"
                animate={{ width: `${bossHP}%` }}
                transition={{ type: "spring", damping: 15 }}
              />
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="space-y-2">
          <span className="text-sm font-bold text-foreground">Question {currentIndex + 1} of {gameQuestions.length}</span>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-card rounded-2xl border border-border p-5 shadow-sm"
          >
            {awaitingConfidence ? (
              <ConfidenceRating onRate={handleConfidence} />
            ) : currentQ ? (
              <EliminationMode
                question={currentQ.question}
                options={currentQ.options}
                correctAnswer={currentQ.correctAnswer}
                onAnswer={handleAnswer}
                explanation={currentQ.explanation}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Pacing feedback for time attack */}
        {mode === "time_attack" && timer.timeRemaining <= 10 && timer.timeRemaining > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-orange-500 justify-center"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Hurry! {timer.timeRemaining}s remaining</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StrategyGameModes;
