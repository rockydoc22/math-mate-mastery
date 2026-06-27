import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { questions } from "@/data/questions";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useComboSystem } from "@/hooks/useComboSystem";
import { ComboDisplay, ScreenShakeWrapper } from "@/components/ComboDisplay";
import { MiniConfetti } from "@/components/ConfettiExplosion";
import { MilestoneCelebration } from "@/components/MilestoneCelebration";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { DesmosCalculator } from "@/components/DesmosCalculator";
import { useProgressiveHints } from "@/hooks/useProgressiveHints";
import { ProgressiveHintPanel } from "@/components/ProgressiveHintPanel";
import { SEO } from "@/components/SEO";

const MathQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const { combo, registerCorrect, registerIncorrect, getComboMessage, getComboIntensity, resetCombo } = useComboSystem();
  const { playCorrect, playWrong, playCombo } = useSoundEffects();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const hints = useProgressiveHints({
    questionKey: currentQuestion?.id,
    subject: "Math",
    difficulty: (currentQuestion as any)?.difficultyRating,
    skillId: (currentQuestion as any)?.skill,
    question: currentQuestion?.question,
    options: (currentQuestion as any)?.options,
    correctAnswer: currentQuestion ? String(currentQuestion.correctAnswer) : undefined,
    explanation: (currentQuestion as any)?.explanation,
  });

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showResult) return;
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const isFlagged = flaggedQuestions.has(currentQuestionIndex);
    
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
      registerCorrect();
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 600);
      
      const newComboCount = combo.count + 1;
      if (newComboCount >= 3) {
        playCombo(newComboCount);
      }
      if (newComboCount === 5) {
        setTimeout(() => setActiveMilestone("combo_5"), 400);
      } else if (newComboCount === 10) {
        setTimeout(() => setActiveMilestone("combo_10"), 400);
      }
      
      if (combo.count >= 2) {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 300);
      }
    } else if (isFlagged) {
      // No penalty for flagged questions - don't register as incorrect
      // Just move on without affecting combo or score
    } else {
      playWrong();
      registerIncorrect();
    }
  };

  const handleFlagged = () => {
    // Mark current question as flagged (no penalty) and skip to next
    setFlaggedQuestions(prev => new Set(prev).add(currentQuestionIndex));
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    resetCombo();
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <QuizResults 
          score={score} 
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <ScreenShakeWrapper shake={screenShake} intensity={getComboIntensity(combo.count) === "ultra" ? "high" : getComboIntensity(combo.count) === "high" ? "medium" : "low"}>
      <SEO
        title="Free SAT Math Practice Questions"
        description="Sharpen your SAT Math skills with adaptive practice questions, instant explanations, and a built-in graphing calculator."
        path="/math"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8 pb-28 sm:pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">SAT Math Practice</h1>
            {/* Combo Display */}
            <div className="ml-auto">
              <ComboDisplay 
                combo={combo}
                message={getComboMessage(combo.count)}
                intensity={getComboIntensity(combo.count)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
                Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Quiz Card with confetti */}
          <div className="relative">
            <MiniConfetti active={showConfetti} />
            <QuizCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              showResult={showResult}
              questionType="math"
              onFlagged={handleFlagged}
            />
          </div>

          {!showResult && (
            <ProgressiveHintPanel
              hints={hints.hints}
              revealedCount={hints.revealedCount}
              allShown={hints.allShown}
              onRevealNext={hints.revealNext}
              loading={hints.loading}
              compact
            />
          )}

          <div className="flex gap-3">
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full"
                aria-disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  "View Results"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Milestone celebration */}
      <MilestoneCelebration 
        milestone={activeMilestone}
        onComplete={() => setActiveMilestone(null)}
      />

      {/* Desmos Calculator */}
      <DesmosCalculator />
    </ScreenShakeWrapper>
  );
};

export default MathQuiz;
