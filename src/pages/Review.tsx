import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw, Loader2, CheckCircle, XCircle, Sparkles, Zap } from "lucide-react";
import { questions } from "@/data/questions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { additionalMathQuestions } from "@/data/additionalMathQuestions";
import { englishQuestions } from "@/data/englishQuestions";
import { hardEnglishQuestions } from "@/data/hardEnglishQuestions";
import { importedSATMathQuestions } from "@/data/importedSATQuestions";
import { actScienceQuestions } from "@/data/actScienceQuestions";
import { QuestionVisual } from "@/components/QuestionVisual";
import { AITutorExplanation } from "@/components/AITutorExplanation";
import { useAcceleratorCredits } from "@/hooks/useAcceleratorCredits";
import { getSpacedRepetitionMultiplier } from "@/utils/acceleratorCalculator";
import { MissReason } from "@/utils/topicMastery";
import { MissReasonSelector } from "@/components/MissReasonSelector";

interface ReviewQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  skill: string;
  visual?: any;
  reviewCount: number;
  attemptId: string;
  firstMissedAt: string | null;
  difficultyRating?: number;
}

// Spaced repetition intervals (in hours)
const INTERVALS = [1, 4, 24, 72, 168, 336]; // 1h, 4h, 1d, 3d, 1w, 2w

const Review = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showMissReason, setShowMissReason] = useState(false);
  const [creditsEarned, setCreditsEarned] = useState(0);
  const { awardSpacedRepetitionCredits } = useAcceleratorCredits();

  // All questions lookup - defined outside callback to avoid infinite re-render
  const allQuestions = useMemo(() => [
    ...questions,
    ...visualMathQuestions,
    ...moreMathVisualQuestions,
    ...additionalMathQuestions,
    ...englishQuestions,
    ...visualEnglishQuestions,
    ...moreEnglishVisualQuestions,
  ], []);

  const fetchReviewQuestions = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    // Get questions that are due for review or were answered incorrectly
    const now = new Date().toISOString();
    
    const { data: attempts } = await supabase
      .from("question_attempts")
      .select("*")
      .eq("user_id", user.id)
      .or(`is_correct.eq.false,next_review_at.lte.${now}`)
      .order("created_at", { ascending: false })
      .limit(100);

    if (!attempts || attempts.length === 0) {
      setReviewQuestions([]);
      setLoading(false);
      return;
    }

    // Get unique questions (prioritize wrong answers and due reviews)
    const uniqueQuestions = new Map<string, typeof attempts[0]>();
    
    // First add wrong answers
    attempts.filter(a => !a.is_correct).forEach(a => {
      if (!uniqueQuestions.has(a.question_id)) {
        uniqueQuestions.set(a.question_id, a);
      }
    });

    // Then add due reviews
    attempts.filter(a => a.is_correct && a.next_review_at && new Date(a.next_review_at) <= new Date())
      .forEach(a => {
        if (!uniqueQuestions.has(a.question_id)) {
          uniqueQuestions.set(a.question_id, a);
        }
      });

    // Match with actual question data
    const reviewList: ReviewQuestion[] = [];
    uniqueQuestions.forEach((attempt) => {
      const questionData = allQuestions.find(q => q.id === attempt.question_id);
      if (questionData) {
        reviewList.push({
          ...questionData,
          reviewCount: attempt.review_count,
          attemptId: attempt.id,
          firstMissedAt: (attempt as any).first_missed_at || attempt.created_at,
          difficultyRating: (questionData as any).difficultyRating,
        });
      }
    });

    // Shuffle and limit to 10 questions per session
    const shuffled = reviewList.sort(() => Math.random() - 0.5).slice(0, 10);
    setReviewQuestions(shuffled);
    setLoading(false);
  }, [user, allQuestions]);

  useEffect(() => {
    fetchReviewQuestions();
  }, [fetchReviewQuestions]);

  const handleAnswer = async (letter: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(letter);
    setIsAnswered(true);

    const currentQuestion = reviewQuestions[currentIndex];
    const isCorrect = letter === currentQuestion.correctAnswer;

    // Calculate next review time based on spaced repetition
    let nextReviewAt: Date | null = null;
    const newReviewCount = isCorrect ? currentQuestion.reviewCount + 1 : 0;

    if (isCorrect && newReviewCount < INTERVALS.length) {
      nextReviewAt = new Date();
      nextReviewAt.setHours(nextReviewAt.getHours() + INTERVALS[newReviewCount]);
    }

    // Update the attempt record
    if (user) {
      await supabase
        .from("question_attempts")
        .update({
          is_correct: isCorrect,
          review_count: newReviewCount,
          next_review_at: nextReviewAt?.toISOString() || null,
        })
        .eq("id", currentQuestion.attemptId);

      // Award spaced repetition credits for correct answers
      if (isCorrect && currentQuestion.firstMissedAt) {
        const daysSinceMiss = Math.floor(
          (Date.now() - new Date(currentQuestion.firstMissedAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysSinceMiss >= 7) {
          const credit = await awardSpacedRepetitionCredits(
            currentQuestion.id,
            daysSinceMiss,
            currentQuestion.difficultyRating
          );
          if (credit) {
            const multiplier = getSpacedRepetitionMultiplier(daysSinceMiss);
            setCreditsEarned(prev => prev + multiplier);
            toast.success(`⚡ +${multiplier.toFixed(1)}x Spaced Rep Credit!`, {
              description: `${daysSinceMiss} days since first miss`
            });
          }
        }
      }
    }

    // Show miss reason selector for wrong answers
    if (!isCorrect) {
      setShowMissReason(true);
    }
  };

  const handleMissReason = async (reason: MissReason) => {
    if (!user) return;
    
    const currentQuestion = reviewQuestions[currentIndex];
    
    await supabase
      .from("question_attempts")
      .update({
        miss_reason: reason,
        miss_reason_noted_at: new Date().toISOString(),
      })
      .eq("id", currentQuestion.attemptId);

    setShowMissReason(false);
    toast.success("Pattern logged! We'll help you fix this.");
  };

  const handleNext = () => {
    if (currentIndex < reviewQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowAITutor(false);
      setShowMissReason(false);
    } else {
      setCompleted(true);
    }
  };

  const currentQuestion = reviewQuestions[currentIndex];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <RefreshCw className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to review</h1>
          <p className="text-muted-foreground mb-4">Spaced repetition requires tracking your progress</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (reviewQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">All caught up!</h1>
              <p className="text-muted-foreground mb-4">
                No questions due for review. Keep practicing to build your review queue!
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/quiz?subject=both&count=10">
                  <Button variant="outline">Quick Quiz</Button>
                </Link>
                <Link to="/practice-test">
                  <Button>Practice Test</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Mastery Complete!</h1>
              <p className="text-muted-foreground mb-4">
                Great job reinforcing your knowledge. Come back later for more spaced repetition.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  setCompleted(false);
                  setCurrentIndex(0);
                  fetchReviewQuestions();
                }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Review More
                </Button>
                <Link to="/">
                  <Button>Back Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Master What You Missed</h1>
              <p className="text-sm text-muted-foreground">Question {currentIndex + 1} of {reviewQuestions.length}</p>
            </div>
          </div>
        </div>

        {currentQuestion && (
          <>
            <Card className="mb-6">
              <CardContent className="p-6">
                {currentQuestion.visual && (
                  <div className="mb-4">
                    <QuestionVisual visual={currentQuestion.visual} />
                  </div>
                )}
                <p className="text-lg mb-6">{currentQuestion.question}</p>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.letter;
                    const isCorrect = option.letter === currentQuestion.correctAnswer;
                    
                    let buttonClass = "w-full text-left p-4 rounded-lg border transition-all ";
                    if (isAnswered) {
                      if (isCorrect) {
                        buttonClass += "bg-green-500/20 border-green-500";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "bg-destructive/20 border-destructive";
                      } else {
                        buttonClass += "bg-muted/50 border-border opacity-50";
                      }
                    } else {
                      buttonClass += "hover:bg-muted/50 border-border";
                    }

                    return (
                      <button
                        key={option.letter}
                        onClick={() => handleAnswer(option.letter)}
                        disabled={isAnswered}
                        className={buttonClass}
                      >
                        <span className="font-medium mr-2">{option.letter}.</span>
                        {option.text}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="mt-6 space-y-4">
                    <div className={`p-4 rounded-lg ${selectedAnswer === currentQuestion.correctAnswer ? "bg-green-500/10" : "bg-destructive/10"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className="font-semibold">
                          {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}
                        </span>
                        {selectedAnswer === currentQuestion.correctAnswer && creditsEarned > 0 && (
                          <span className="ml-auto flex items-center gap-1 text-yellow-500 text-sm">
                            <Zap className="w-4 h-4" />
                            +{creditsEarned.toFixed(1)} credits
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>

                    {/* Miss Reason Selector for wrong answers */}
                    {showMissReason && selectedAnswer !== currentQuestion.correctAnswer && (
                      <MissReasonSelector onSelect={handleMissReason} />
                    )}

                    {!showAITutor && (
                      <Button variant="outline" onClick={() => setShowAITutor(true)} className="w-full gap-2">
                        <Sparkles className="w-4 h-4" />
                        Get AI Tutor Explanation
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {showAITutor && (
              <div className="mb-6">
                <AITutorExplanation
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  correctAnswer={currentQuestion.correctAnswer}
                  userAnswer={selectedAnswer || ""}
                  explanation={currentQuestion.explanation}
                  onClose={() => setShowAITutor(false)}
                />
              </div>
            )}

            {isAnswered && (
              <Button onClick={handleNext} className="w-full">
                {currentIndex < reviewQuestions.length - 1 ? "Next Question" : "Finish Review"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
