import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizCard } from "@/components/QuizCard";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { allFillerQuestions } from "@/data/levelFillerQuestions";
import { importedSATMathQuestions } from "@/data/importedSATQuestions";
import { ArrowRight, ArrowLeft, Crown, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useSearchParams } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAuth } from "@/hooks/useAuth";
import { useSkillRating } from "@/hooks/useSkillRating";
import { getTierById, ELITE_TIERS, EliteTier } from "@/utils/eliteTiers";
import { PacingAlert } from "@/components/PacingAlert";
import { SolvingForPrompt } from "@/components/SolvingForPrompt";
import { DeepReviewPrompt } from "@/components/DeepReviewPrompt";
import { RulebookNoteEditor } from "@/components/RulebookNoteEditor";
import { MissReasonSelector } from "@/components/MissReasonSelector";
import { MissReason } from "@/utils/topicMastery";
import { supabase } from "@/integrations/supabase/client";
import { EliteTierCard } from "@/components/EliteTierCard";
import { QuizResults } from "@/components/QuizResults";
import { RatingChangePopup } from "@/components/RatingChangePopup";
import { getDifficultyColor } from "@/utils/difficultyRating";

type CombinedQuestion = {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficultyRating?: number;
  domain?: string;
  skill?: string;
  type: "math" | "english";
  visual?: any;
};

const ElitePractice = () => {
  const [searchParams] = useSearchParams();
  const tierId = searchParams.get("tier");
  const { playCorrect, playWrong } = useSoundEffects();
  const { user } = useAuth();
  const { updateRating } = useSkillRating();

  const tier = tierId ? getTierById(tierId) : null;

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  // Elite features state
  const [showSolvingPrompt, setShowSolvingPrompt] = useState(true);
  const [showDeepReview, setShowDeepReview] = useState(false);
  const [showMissReason, setShowMissReason] = useState(false);
  const [showRulebook, setShowRulebook] = useState(false);
  const [ratingChange, setRatingChange] = useState<{ show: boolean; change: number; newRating: number }>({
    show: false,
    change: 0,
    newRating: 0,
  });

  // Filter questions based on tier difficulty
  const quizQuestions = useMemo(() => {
    if (!tier) return [];

    let pool: CombinedQuestion[] = [];

    // Add all math questions
    pool = [
      ...questions.map((q) => ({ ...q, type: "math" as const })),
      ...visualMathQuestions.map((q) => ({ ...q, type: "math" as const })),
      ...moreMathVisualQuestions.map((q) => ({ ...q, type: "math" as const })),
      ...allFillerQuestions.map((q) => ({ ...q, type: "math" as const })),
      ...importedSATMathQuestions.map((q) => ({ ...q, type: "math" as const })),
    ];

    // Add english questions
    pool = [
      ...pool,
      ...englishQuestions.map((q) => ({ ...q, type: "english" as const })),
      ...visualEnglishQuestions.map((q) => ({ ...q, type: "english" as const })),
      ...moreEnglishVisualQuestions.map((q) => ({ ...q, type: "english" as const })),
    ];

    // Remove duplicates
    const seenIds = new Set<string>();
    const dedupedPool = pool.filter((q) => {
      if (seenIds.has(q.id)) return false;
      seenIds.add(q.id);
      return true;
    });

    // Filter by tier difficulty range
    const filtered = dedupedPool.filter((q) => {
      const rating = q.difficultyRating || 5;
      return rating >= tier.difficultyRange.min && rating <= tier.difficultyRange.max;
    });

    // Shuffle and limit
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  }, [tier]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;

  // Reset question timer on new question
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setShowSolvingPrompt(true);
  }, [currentQuestionIndex]);

  const handleSolvingPromptConfirm = useCallback(() => {
    setShowSolvingPrompt(false);
  }, []);

  const handleSubmit = async () => {
    if (!currentQuestion) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playWrong();
      // For elite tiers, show deep review on wrong answers
      if (tier?.id === '1600_club' || tier?.id === 'elite_1500') {
        setShowDeepReview(true);
      }
      setShowMissReason(true);
    }

    // Record attempt and update rating
    if (user && currentQuestion.difficultyRating) {
      const timeTakenMs = Date.now() - questionStartTime;
      
      // Record attempt
      await supabase.from("question_attempts").upsert({
        user_id: user.id,
        question_id: currentQuestion.id,
        question_type: currentQuestion.type,
        is_correct: isCorrect,
        difficulty_rating: currentQuestion.difficultyRating,
        time_taken_ms: timeTakenMs,
        domain: currentQuestion.domain || "",
        skill: currentQuestion.skill || "",
        first_missed_at: !isCorrect ? new Date().toISOString() : null,
      }, {
        onConflict: 'user_id,question_id',
      });

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
        setTimeout(() => {
          setRatingChange(prev => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  const handleMissReason = async (reason: MissReason) => {
    if (!user || !currentQuestion) return;
    
    await supabase
      .from("question_attempts")
      .update({
        miss_reason: reason,
        miss_reason_noted_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("question_id", currentQuestion.id);

    setShowMissReason(false);
    setShowRulebook(true);
  };

  const handleDeepReviewComplete = () => {
    setShowDeepReview(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowDeepReview(false);
      setShowMissReason(false);
      setShowRulebook(false);
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

  const handleSkip = () => {
    handleNext();
  };

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case '1600_club':
        return <Crown className="w-6 h-6 text-amber-400" />;
      case 'elite_1500':
        return <Target className="w-6 h-6 text-purple-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  // Tier selection screen
  if (!tier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Elite Practice</h1>
              <p className="text-sm text-muted-foreground">Choose your tier based on current score</p>
            </div>
          </div>

          <div className="space-y-4">
            {ELITE_TIERS.map((t) => (
              <EliteTierCard key={t.id} tier={t} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="w-full max-w-xl space-y-6">
          <QuizResults
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
            subject={tier.name}
          />
          <Link to="/elite-practice">
            <Button variant="outline" className="w-full">
              Try Different Tier
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No questions found for this difficulty range. Try a different tier.
            </p>
            <Link to="/elite-practice">
              <Button>Choose Different Tier</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      {/* Pacing Alert */}
      <PacingAlert
        startTime={questionStartTime}
        onSkip={handleSkip}
        isVisible={!showResult && !showSolvingPrompt}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/elite-practice">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              {getTierIcon(tier.id)}
              <h1 className={`text-xl font-bold ${tier.color}`}>
                {tier.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </h2>
              <span className={`text-xs px-2 py-1 rounded-full ${
                currentQuestion.type === "math" 
                  ? "bg-primary/10 text-primary" 
                  : "bg-secondary/10 text-secondary"
              }`}>
                {currentQuestion.type === "math" ? "Math" : "English"}
              </span>
              {currentQuestion.difficultyRating && (
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getDifficultyColor(currentQuestion.difficultyRating)}`}>
                  {Math.min(currentQuestion.difficultyRating, 10)}/10
                </span>
              )}
            </div>
            <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Solving For Prompt (Math only, before showing question) */}
        {showSolvingPrompt && currentQuestion.type === 'math' && !showResult && (
          <SolvingForPrompt
            onConfirm={handleSolvingPromptConfirm}
            questionType={currentQuestion.type}
          />
        )}

        {/* Question */}
        {(!showSolvingPrompt || currentQuestion.type === 'english') && (
          <QuizCard
            question={currentQuestion as any}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            showResult={showResult}
            questionType={currentQuestion.type}
          />
        )}

        {/* Deep Review (for wrong answers) */}
        {showResult && showDeepReview && selectedAnswer !== currentQuestion.correctAnswer && (
          <DeepReviewPrompt
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            userAnswer={selectedAnswer || ''}
            onComplete={handleDeepReviewComplete}
          />
        )}

        {/* Miss Reason Selector */}
        {showResult && showMissReason && selectedAnswer !== currentQuestion.correctAnswer && (
          <MissReasonSelector onSelect={handleMissReason} />
        )}

        {/* Rulebook Note Editor (after miss reason) */}
        {showResult && showRulebook && selectedAnswer !== currentQuestion.correctAnswer && (
          <RulebookNoteEditor
            questionId={currentQuestion.id}
            compact={false}
          />
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer || showSolvingPrompt}
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
              disabled={showDeepReview}
            >
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

export default ElitePractice;
