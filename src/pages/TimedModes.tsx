import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Zap, Timer, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Question } from "@/data/questions";
import { useTimedMode, TimedMode } from "@/hooks/useTimedMode";

type PageMode = "menu" | "playing" | "results";

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

const timedModeCards = [
  {
    id: "per_question" as TimedMode,
    icon: <Timer className="w-6 h-6" />,
    title: "Per-Question Timer",
    desc: "45 seconds per question. Strict but fair.",
    seconds: 45,
    questions: 10,
  },
  {
    id: "section" as TimedMode,
    icon: <Clock className="w-6 h-6" />,
    title: "Section Timer",
    desc: "8 minutes for 10 questions. Pace yourself.",
    seconds: 480,
    questions: 10,
  },
  {
    id: "sprint" as TimedMode,
    icon: <Zap className="w-6 h-6" />,
    title: "Sprint Rounds",
    desc: "3 rounds × 90s. How many can you answer?",
    seconds: 90,
    questions: 30,
    rounds: 3,
  },
];

const TimedModes = () => {
  const [pageMode, setPageMode] = useState<PageMode>("menu");
  const [selectedMode, setSelectedMode] = useState<TimedMode>("per_question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [roundScores, setRoundScores] = useState<number[]>([]);

  const config = timedModeCards.find(c => c.id === selectedMode)!;

  const gameQuestions = useMemo(() => {
    if (pageMode !== "playing") return [];
    return shuffleArray([...questions]).slice(0, config.questions);
  }, [pageMode, selectedMode]);

  const timer = useTimedMode(
    selectedMode === "per_question"
      ? { mode: "per_question", secondsPerQuestion: config.seconds, onTimeUp: () => autoAdvance() }
      : selectedMode === "section"
      ? { mode: "section", totalSeconds: config.seconds, onTimeUp: () => finishGame() }
      : {
          mode: "sprint",
          rounds: config.rounds || 3,
          secondsPerRound: config.seconds,
          onTimeUp: () => handleSprintRoundEnd(),
        }
  );

  const currentQ = gameQuestions[currentIndex];
  const progress = gameQuestions.length > 0 ? ((currentIndex + 1) / gameQuestions.length) * 100 : 0;

  const autoAdvance = () => {
    if (currentIndex + 1 >= gameQuestions.length) {
      finishGame();
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      timer.nextQuestion();
    }
  };

  const finishGame = () => {
    setPageMode("results");
    timer.pause();
  };

  const handleSprintRoundEnd = () => {
    setRoundScores(prev => [...prev, timer.questionsAnswered]);
    if (timer.currentRound >= (config.rounds || 3)) {
      finishGame();
    } else {
      timer.nextRound();
      setCurrentIndex(i => i); // stay in same flow
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQ) return;
    const correct = selectedAnswer === currentQ.correctAnswer;
    if (correct) setScore(s => s + 1);
    setShowResult(true);
    timer.recordAnswer();

    setTimeout(() => {
      if (currentIndex + 1 >= gameQuestions.length) {
        finishGame();
      } else {
        setCurrentIndex(i => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        if (selectedMode === "per_question") timer.nextQuestion();
      }
    }, 800);
  };

  const startMode = (mode: TimedMode) => {
    setSelectedMode(mode);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setRoundScores([]);
    setPageMode("playing");
  };

  const restart = () => {
    setPageMode("menu");
    setCurrentIndex(0);
    setScore(0);
    setRoundScores([]);
    timer.reset();
  };

  // MENU
  if (pageMode === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
            <h1 className="text-2xl font-bold text-primary">Timed Modes</h1>
          </div>
          <p className="text-muted-foreground text-sm">Practice under real test pressure with different timing formats.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timedModeCards.map(card => (
              <motion.button
                key={card.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startMode(card.id)}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all text-center"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">{card.icon}</div>
                <p className="font-semibold text-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (pageMode === "results") {
    const pct = gameQuestions.length > 0 ? Math.round((score / gameQuestions.length) * 100) : 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-6 bg-card rounded-2xl border border-border shadow-lg space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold text-primary">{pct}%</h2>
          <p className="text-lg text-foreground">{score} correct</p>

          {/* Pacing feedback */}
          {selectedMode === "section" && (
            <p className="text-sm text-muted-foreground">
              Pace: ~{timer.questionsAnswered > 0 ? Math.round(config.seconds / timer.questionsAnswered) : 0}s per question
              {timer.pacing === "ahead" && " — Ahead of pace! 🚀"}
              {timer.pacing === "behind" && " — Need to speed up ⚡"}
              {timer.pacing === "on_track" && " — Right on track ✅"}
            </p>
          )}

          {roundScores.length > 0 && (
            <div className="text-left space-y-1">
              <p className="text-sm font-semibold text-foreground">Sprint Rounds:</p>
              {roundScores.map((s, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  Round {i + 1}: {s} questions answered
                </p>
              ))}
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
            <h1 className="text-xl font-bold text-primary">{config.title}</h1>
          </div>

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
            {selectedMode === "sprint" && (
              <span className="text-xs opacity-70">R{timer.currentRound}/{timer.totalRounds}</span>
            )}
            {timer.isRunning ? <Pause className="w-3 h-3 opacity-50" /> : <Play className="w-3 h-3 opacity-50" />}
          </button>
        </div>

        {/* Pacing indicator for section mode */}
        {selectedMode === "section" && (
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full font-medium ${
              timer.pacing === "ahead" ? "bg-success/20 text-success" :
              timer.pacing === "behind" ? "bg-destructive/20 text-destructive" :
              "bg-primary/10 text-primary"
            }`}>
              {timer.pacing === "ahead" ? "🚀 Ahead" : timer.pacing === "behind" ? "⚡ Behind" : "✅ On Track"}
            </span>
            <span className="text-muted-foreground">{timer.questionsAnswered} answered</span>
          </div>
        )}

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-foreground">Q{currentIndex + 1}</span>
            <span className="text-muted-foreground">Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        {currentQ && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">{currentQ.question}</h3>
              <div className="space-y-2">
                {currentQ.options.map(opt => {
                  const isSelected = selectedAnswer === opt.letter;
                  const isCorrect = showResult && opt.letter === currentQ.correctAnswer;
                  const isWrong = showResult && isSelected && opt.letter !== currentQ.correctAnswer;

                  return (
                    <button
                      key={opt.letter}
                      onClick={() => !showResult && setSelectedAnswer(opt.letter)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
                        showResult
                          ? isCorrect
                            ? "border-success bg-success/10"
                            : isWrong
                            ? "border-destructive bg-destructive/10"
                            : "border-border bg-card"
                          : isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="font-bold mr-2">{opt.letter}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {!showResult && (
                <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full" size="lg">
                  Submit
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TimedModes;
