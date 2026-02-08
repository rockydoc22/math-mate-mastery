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

const MathQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const { combo, registerCorrect, registerIncorrect, getComboMessage, getComboIntensity, resetCombo } = useComboSystem();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      registerCorrect();
      if (combo.count >= 2) {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 300);
      }
    } else {
      registerIncorrect();
    }
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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
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

          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            showResult={showResult}
            questionType="math"
          />

          <div className="flex gap-3">
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                size="lg"
                className="w-full"
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
    </ScreenShakeWrapper>
  );
};

export default MathQuiz;
