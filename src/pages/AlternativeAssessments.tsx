import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Shuffle, ListOrdered, Search, PenTool, Crosshair, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OrderingChallenge } from "@/components/alt-assessments/OrderingChallenge";
import { SpotTheError } from "@/components/alt-assessments/SpotTheError";
import { FillTheGap } from "@/components/alt-assessments/FillTheGap";
import { ConfidenceRating } from "@/components/alt-assessments/ConfidenceRating";
import { EliminationMode } from "@/components/alt-assessments/EliminationMode";
import {
  allAltQuestions,
  AltQuestion,
  orderingQuestions,
  spotTheErrorQuestions,
  fillTheGapQuestions,
} from "@/data/alternativeAssessmentQuestions";
import { questions } from "@/data/questions";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "menu" | "ordering" | "spot_the_error" | "fill_the_gap" | "elimination" | "confidence" | "mixed";

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

const modeCards: { id: Mode; icon: React.ReactNode; title: string; desc: string }[] = [
  { id: "ordering", icon: <ListOrdered className="w-6 h-6" />, title: "Ordering Challenge", desc: "Arrange steps in the correct order" },
  { id: "spot_the_error", icon: <Search className="w-6 h-6" />, title: "Spot the Error", desc: "Find the mistake in a worked solution" },
  { id: "fill_the_gap", icon: <PenTool className="w-6 h-6" />, title: "Fill the Gap", desc: "Complete the missing reasoning step" },
  { id: "elimination", icon: <Crosshair className="w-6 h-6" />, title: "Answer Elimination", desc: "Cross out wrong answers, then pick" },
  { id: "confidence", icon: <Brain className="w-6 h-6" />, title: "Confidence Rating", desc: "Answer MCQ then rate your confidence" },
  { id: "mixed", icon: <Shuffle className="w-6 h-6" />, title: "Mixed Challenge", desc: "Random mix of all assessment types" },
];

const QUESTION_COUNT = 8;

const AlternativeAssessments = () => {
  const [mode, setMode] = useState<Mode>("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [awaitingConfidence, setAwaitingConfidence] = useState(false);
  const [confidenceLog, setConfidenceLog] = useState<{ confidence: string; correct: boolean }[]>([]);

  // Build question set per mode
  const questionSet = useMemo(() => {
    if (mode === "ordering") return shuffleArray(orderingQuestions).slice(0, QUESTION_COUNT);
    if (mode === "spot_the_error") return shuffleArray(spotTheErrorQuestions).slice(0, QUESTION_COUNT);
    if (mode === "fill_the_gap") return shuffleArray(fillTheGapQuestions).slice(0, QUESTION_COUNT);
    if (mode === "mixed") return shuffleArray(allAltQuestions).slice(0, QUESTION_COUNT);
    return [];
  }, [mode]);

  // For elimination and confidence modes, use regular MCQ questions
  const mcqQuestions = useMemo(() => {
    if (mode === "elimination" || mode === "confidence") {
      return shuffleArray(questions).slice(0, QUESTION_COUNT);
    }
    return [];
  }, [mode]);

  const totalQuestions = mode === "elimination" || mode === "confidence" ? mcqQuestions.length : questionSet.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(s => s + 1);

    if (mode === "confidence") {
      // After answering, show confidence prompt before moving to next
      setAwaitingConfidence(true);
      return;
    }

    setTimeout(() => advance(correct), 1200);
  };

  const handleConfidence = (level: "high" | "medium" | "low") => {
    // Log confidence vs correctness
    const lastCorrect = score > (confidenceLog.length > 0 ? confidenceLog.filter(c => c.correct).length : score - 1);
    setConfidenceLog(prev => [...prev, { confidence: level, correct: lastCorrect }]);
    setAwaitingConfidence(false);
    advance(lastCorrect);
  };

  const advance = (_correct?: boolean) => {
    if (currentIndex + 1 >= totalQuestions) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const restart = () => {
    setMode("menu");
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setAwaitingConfidence(false);
    setConfidenceLog([]);
  };

  // MENU
  if (mode === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Alternative Assessments</h1>
          </div>
          <p className="text-muted-foreground text-sm">Go beyond multiple choice. Build deeper reasoning skills.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modeCards.map(card => (
              <motion.button
                key={card.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(card.id)}
                className="flex items-start gap-3 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all text-left"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">{card.icon}</div>
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

  // FINISHED
  if (finished) {
    const pct = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-6 bg-card rounded-2xl border border-border shadow-lg space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold text-primary">{pct}%</h2>
          <p className="text-lg text-foreground">
            {score}/{totalQuestions} correct
          </p>
          <p className="text-sm text-muted-foreground">
            {pct >= 80 ? "Excellent work! 🔥" : pct >= 50 ? "Good effort! Keep practicing." : "Keep at it — practice builds mastery!"}
          </p>

          {confidenceLog.length > 0 && (
            <div className="text-left space-y-1 mt-3">
              <p className="text-sm font-semibold text-foreground">Confidence Breakdown:</p>
              {["high", "medium", "low"].map(level => {
                const entries = confidenceLog.filter(c => c.confidence === level);
                if (!entries.length) return null;
                const accuracy = Math.round((entries.filter(e => e.correct).length / entries.length) * 100);
                return (
                  <p key={level} className="text-xs text-muted-foreground">
                    {level === "high" ? "😎" : level === "medium" ? "🤔" : "😰"} {level}: {accuracy}% accurate ({entries.length} Qs)
                  </p>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button onClick={restart} variant="outline" className="flex-1">Try Again</Button>
            <Link to="/" className="flex-1"><Button className="w-full">Home</Button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // QUIZ FLOW
  const currentAltQ = questionSet[currentIndex] as AltQuestion | undefined;
  const currentMCQ = mcqQuestions[currentIndex];

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
          <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
            Score: {score}/{currentIndex + 1}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-foreground">Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Content */}
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
            ) : mode === "ordering" && currentAltQ?.type === "ordering" ? (
              <OrderingChallenge question={currentAltQ} onAnswer={handleAnswer} />
            ) : mode === "spot_the_error" && currentAltQ?.type === "spot_the_error" ? (
              <SpotTheError question={currentAltQ} onAnswer={handleAnswer} />
            ) : mode === "fill_the_gap" && currentAltQ?.type === "fill_the_gap" ? (
              <FillTheGap question={currentAltQ} onAnswer={handleAnswer} />
            ) : mode === "mixed" && currentAltQ ? (
              currentAltQ.type === "ordering" ? (
                <OrderingChallenge question={currentAltQ} onAnswer={handleAnswer} />
              ) : currentAltQ.type === "spot_the_error" ? (
                <SpotTheError question={currentAltQ} onAnswer={handleAnswer} />
              ) : currentAltQ.type === "fill_the_gap" ? (
                <FillTheGap question={currentAltQ} onAnswer={handleAnswer} />
              ) : null
            ) : mode === "elimination" && currentMCQ ? (
              <EliminationMode
                question={currentMCQ.question}
                options={currentMCQ.options}
                correctAnswer={currentMCQ.correctAnswer}
                onAnswer={handleAnswer}
                explanation={currentMCQ.explanation}
              />
            ) : mode === "confidence" && currentMCQ ? (
              <EliminationMode
                question={currentMCQ.question}
                options={currentMCQ.options}
                correctAnswer={currentMCQ.correctAnswer}
                onAnswer={handleAnswer}
                explanation={currentMCQ.explanation}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Next button after answer */}
        {(mode === "elimination" || mode === "confidence") && !awaitingConfidence && (
          <div className="text-center text-xs text-muted-foreground">
            Answer submitted — advancing automatically
          </div>
        )}
      </div>
    </div>
  );
};

export default AlternativeAssessments;
