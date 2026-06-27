import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { englishQuestions } from "@/data/englishQuestions";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useProgressiveHints } from "@/hooks/useProgressiveHints";
import { ProgressiveHintPanel } from "@/components/ProgressiveHintPanel";
import { SEO } from "@/components/SEO";

const EnglishQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = englishQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / englishQuestions.length) * 100;

  const hints = useProgressiveHints({
    questionKey: currentQuestion?.id,
    subject: "Reading",
    difficulty: (currentQuestion as any)?.difficultyRating,
    skillId: (currentQuestion as any)?.skill,
    question: currentQuestion?.question,
    options: currentQuestion?.options as any,
    correctAnswer: currentQuestion ? String(currentQuestion.correctAnswer) : undefined,
    explanation: (currentQuestion as any)?.explanation,
  });

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showResult) return;
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < englishQuestions.length - 1) {
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
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <QuizResults 
          score={score} 
          totalQuestions={englishQuestions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <SEO
        title="Free SAT Reading & Writing Practice"
        description="Practice authentic SAT Reading and Writing passages with instant feedback and detailed answer explanations."
        path="/english"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-secondary">SAT Reading & Writing Practice</h1>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Question {currentQuestionIndex + 1} of {englishQuestions.length}
            </h2>
            <span className="text-sm font-medium px-4 py-2 bg-secondary/10 text-secondary rounded-full">
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
          questionType="english"
        />

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
              {currentQuestionIndex < englishQuestions.length - 1 ? (
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
  );
};

export default EnglishQuiz;
