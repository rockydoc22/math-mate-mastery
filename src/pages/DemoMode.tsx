import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, GraduationCap } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { QuizCard } from "@/components/QuizCard";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Demo mode - easy questions only (difficulty 1-5)
const DemoMode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "math";
  const { playCorrect, playWrong } = useSoundEffects();

  // Get only easy questions (difficulty 1-5)
  const easyQuestions = useMemo(() => {
    let pool: any[] = [];
    
    if (subject === "math" || subject === "both") {
      pool = [...pool, ...questions.filter(q => (q.difficultyRating || 5) <= 5).map(q => ({ ...q, type: "math" as const }))];
    }
    if (subject === "english" || subject === "both") {
      pool = [...pool, ...englishQuestions.filter(q => (q.difficultyRating || 5) <= 5).map(q => ({ ...q, type: "english" as const }))];
    }

    // Shuffle and take 10
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [subject]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = easyQuestions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!selectedAnswer || !currentQuestion) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      playCorrect();
    } else {
      playWrong();
    }
  }, [selectedAnswer, currentQuestion, playCorrect, playWrong]);

  const handleNext = () => {
    if (currentQuestionIndex < easyQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (easyQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No easy questions available for this subject.</p>
        </Card>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Card className="max-w-lg mx-auto p-8 text-center space-y-6">
          <GraduationCap className="w-16 h-16 mx-auto text-green-500" />
          <h1 className="text-2xl font-bold">Demo Complete!</h1>
          <p className="text-4xl font-bold text-primary">
            {score} / {easyQuestions.length}
          </p>
          <p className="text-muted-foreground">
            {score === easyQuestions.length 
              ? "Perfect score! You're ready for harder questions!" 
              : "Great practice session!"}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
              Home
            </Button>
            <Button onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setFinished(false);
            }}>
              <Play className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <GraduationCap className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">Demo Mode</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {easyQuestions.length}</span>
          <span>Score: {score}</span>
        </div>

        {/* Difficulty indicator */}
        <div className="text-xs text-center text-muted-foreground">
          Difficulty: {currentQuestion?.difficultyRating || "?"}/13 (Easy Mode)
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            showResult={showResult}
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIndex < easyQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoMode;
