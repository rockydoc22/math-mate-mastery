import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizCard } from "@/components/QuizCard";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { ArrowLeft, ArrowRight, Zap, Trophy, Calendar, Star, Flame } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";

const DAILY_QUESTIONS = 10;
const BONUS_XP_PERFECT = 50;
const BONUS_XP_GOOD = 20;

const DailyChallenge = () => {
  const { user } = useAuth();
  const { streak } = useGameStats();
  const { playCorrect, playWrong, playLevelUp } = useSoundEffects();
  const [completedToday, setCompletedToday] = useState(false);
  const [todayScore, setTodayScore] = useState<{ score: number; total: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Generate daily questions based on date (same for all users)
  const dailyQuestions = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    let seedValue = today.split("-").reduce((a, b) => a + parseInt(b), 0);
    const allQuestions = [
      ...questions.map((q) => ({ ...q, type: "math" as const })),
      ...englishQuestions.map((q) => ({ ...q, type: "english" as const })),
    ];
    
    // Seeded shuffle
    const shuffled = [...allQuestions].sort(() => {
      seedValue++;
      const x = Math.sin(seedValue) * 10000;
      return x - Math.floor(x) - 0.5;
    });
    
    return shuffled.slice(0, DAILY_QUESTIONS);
  }, []);

  const checkIfCompleted = async () => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("daily_challenges")
      .select("*")
      .eq("user_id", user.id)
      .eq("challenge_date", today)
      .maybeSingle();
    
    if (data) {
      setCompletedToday(true);
      setTodayScore({ score: data.score, total: data.total_questions });
    }
  };

  useEffect(() => {
    checkIfCompleted();
  }, [user]);

  const handleSubmit = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === dailyQuestions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playWrong();
    }
  };

  const handleNext = async () => {
    if (currentIndex < dailyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
      
      // Calculate bonus XP
      const finalScore = score + (selectedAnswer === dailyQuestions[currentIndex].correctAnswer ? 1 : 0);
      const percentage = (finalScore / DAILY_QUESTIONS) * 100;
      let bonusXP = 0;
      if (percentage === 100) bonusXP = BONUS_XP_PERFECT;
      else if (percentage >= 80) bonusXP = BONUS_XP_GOOD;

      if (percentage >= 80) playLevelUp();

      // Save to database
      if (user) {
        await supabase.from("daily_challenges").insert({
          user_id: user.id,
          score: finalScore,
          total_questions: DAILY_QUESTIONS,
          bonus_xp: bonusXP,
        });
      }
    }
  };

  const currentQuestion = dailyQuestions[currentIndex];
  const progress = ((currentIndex + 1) / dailyQuestions.length) * 100;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <Card className="p-8 text-center max-w-md">
          <Zap className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Daily Challenge</h2>
          <p className="text-muted-foreground mb-4">Sign in to compete in today's challenge!</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (completedToday && todayScore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <Card className="p-8 text-center max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
          <p className="text-4xl font-bold text-primary my-4">
            {todayScore.score}/{todayScore.total}
          </p>
          <p className="text-muted-foreground mb-6">
            You've already completed today's challenge. Come back tomorrow!
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (finished) {
    const finalScore = score;
    const percentage = (finalScore / DAILY_QUESTIONS) * 100;
    const bonusXP = percentage === 100 ? BONUS_XP_PERFECT : percentage >= 80 ? BONUS_XP_GOOD : 0;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <Card className="p-8 text-center max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Daily Challenge Complete!</h2>
          <p className="text-5xl font-bold text-primary my-4">
            {finalScore}/{DAILY_QUESTIONS}
          </p>
          {bonusXP > 0 && (
            <div className="flex items-center justify-center gap-2 text-lg text-success mb-4">
              <Star className="w-5 h-5" />
              +{bonusXP} Bonus XP!
            </div>
          )}
          <p className="text-muted-foreground mb-6">Come back tomorrow for a new challenge!</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Compounding to 1600
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {streak && streak.current_streak > 0 && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400">
                <Flame className="w-5 h-5" />
                <span className="font-bold text-lg">{streak.current_streak}</span>
              </div>
            )}
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-xl font-bold text-primary">{score}/{currentIndex + (showResult ? 1 : 0)}</p>
            </div>
          </div>
        </div>

        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between text-sm">
            <span>Question {currentIndex + 1} of {DAILY_QUESTIONS}</span>
            <span className="text-primary font-medium">🎁 Up to {BONUS_XP_PERFECT} bonus XP!</span>
          </div>
          <Progress value={progress} className="mt-2 h-2" />
        </Card>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          showResult={showResult}
          questionType={currentQuestion.type}
        />

        <div className="flex gap-3">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} size="lg" className="w-full">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentIndex < dailyQuestions.length - 1 ? (
                <>Next Question <ArrowRight className="ml-2 w-4 h-4" /></>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
