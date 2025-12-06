import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { questions, Question } from "@/data/questions";
import { englishQuestions, EnglishQuestion } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, VisualQuestion, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useSearchParams } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { DifficultyRange, filterByDifficulty, getDifficultyColor } from "@/utils/difficultyRating";
import { RatingChangePopup } from "@/components/RatingChangePopup";
import { SkillRatingCard } from "@/components/SkillRatingCard";

type CombinedQuestion = (Question | EnglishQuestion | VisualQuestion) & { type: "math" | "english"; difficultyRating?: number };

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "math";
  const count = Number(searchParams.get("count")) || 10;
  const difficulty = (searchParams.get("difficulty") || "all") as DifficultyRange;
  const { playCorrect, playWrong } = useSoundEffects();
  const { user } = useAuth();
  const { recordScore } = useGameStats();
  const { ratings, updateRating } = useSkillRating();

  const quizQuestions = useMemo(() => {
    let pool: CombinedQuestion[] = [];

    if (subject === "math" || subject === "both") {
      pool = [...pool, ...questions.map((q) => ({ ...q, type: "math" as const }))];
      pool = [...pool, ...visualMathQuestions.map((q) => ({ ...q, type: "math" as const }))];
      pool = [...pool, ...moreMathVisualQuestions.map((q) => ({ ...q, type: "math" as const }))];
    }
    if (subject === "english" || subject === "both") {
      pool = [...pool, ...englishQuestions.map((q) => ({ ...q, type: "english" as const }))];
      pool = [...pool, ...visualEnglishQuestions.map((q) => ({ ...q, type: "english" as const }))];
      pool = [...pool, ...moreEnglishVisualQuestions.map((q) => ({ ...q, type: "english" as const }))];
    }

    // Apply difficulty filter
    const filtered = filterByDifficulty(pool, difficulty);
    const shuffled = shuffleArray(filtered);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, [subject, count, difficulty]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [scoreRecorded, setScoreRecorded] = useState(false);
  const [ratingChange, setRatingChange] = useState<{ show: boolean; change: number; newRating: number }>({
    show: false,
    change: 0,
    newRating: 0,
  });

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playWrong();
    }

    // Update skill rating
    if (user && currentQuestion.difficultyRating) {
      const result = await updateRating(
        currentQuestion.type,
        currentQuestion.difficultyRating,
        isCorrect,
        currentQuestion.id
      );
      if (result) {
        setRatingChange({
          show: true,
          change: result.change,
          newRating: result.newRating,
        });
        // Hide popup after 2 seconds
        setTimeout(() => {
          setRatingChange(prev => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
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
    setScoreRecorded(false);
  };

  // Record score when quiz finishes
  useEffect(() => {
    if (finished && user && !scoreRecorded) {
      recordScore(subject, score, quizQuestions.length);
      setScoreRecorded(true);
    }
  }, [finished, user, scoreRecorded, recordScore, subject, score, quizQuestions.length]);

  const getSubjectLabel = () => {
    if (subject === "both") return "Mixed";
    if (subject === "english") return "English";
    return "Math";
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="w-full max-w-xl space-y-6">
          <QuizResults
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
            subject={getSubjectLabel()}
          />
          {ratings && (
            <SkillRatingCard
              mathRating={ratings.mathRating}
              englishRating={ratings.englishRating}
              overallRating={ratings.overallRating}
              compact
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">SAT {getSubjectLabel()} Practice</h1>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </h2>
              {subject === "both" && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestion.type === "math" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary/10 text-secondary"
                }`}>
                  {currentQuestion.type === "math" ? "Math" : "English"}
                </span>
              )}
              {currentQuestion.difficultyRating && (
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getDifficultyColor(currentQuestion.difficultyRating)}`}>
                  {currentQuestion.difficultyRating}/10
                </span>
              )}
            </div>
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
          questionType={currentQuestion.type}
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
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestionIndex < quizQuestions.length - 1 ? (
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

      {/* Rating Change Popup */}
      <RatingChangePopup
        show={ratingChange.show}
        change={ratingChange.change}
        newRating={ratingChange.newRating}
      />
    </div>
  );
};

export default Quiz;
