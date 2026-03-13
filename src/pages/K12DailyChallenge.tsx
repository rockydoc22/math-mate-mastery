import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, Flame, Trophy, Zap } from "lucide-react";
import { K12_EXAMS, getK12Exam } from "@/utils/k12ExamConfig";
import { loadK12ExamQuestions } from "@/data/k12Questions";
import { Question } from "@/data/questions";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { Flag } from "lucide-react";

const DAILY_QUESTIONS = 10;

function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const K12DailyChallenge = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(false);
  const [todayScore, setTodayScore] = useState<{ score: number; total: number } | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [weakSkills, setWeakSkills] = useState<string[]>([]);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  // Check if already completed today
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().slice(0, 10);
    supabase
      .from("daily_challenges")
      .select("score, total_questions")
      .eq("user_id", user.id)
      .eq("challenge_date", today)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setCompletedToday(true);
          setTodayScore({ score: data.score, total: data.total_questions });
        }
      });
  }, [user]);

  // Find weak skills from recent attempts
  useEffect(() => {
    if (!user) return;
    supabase
      .from("question_attempts")
      .select("skill, is_correct")
      .eq("user_id", user.id)
      .like("question_type", "k12-%")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const skillStats: Record<string, { correct: number; total: number }> = {};
        data.forEach((a) => {
          if (!skillStats[a.skill]) skillStats[a.skill] = { correct: 0, total: 0 };
          skillStats[a.skill].total++;
          if (a.is_correct) skillStats[a.skill].correct++;
        });
        const weak = Object.entries(skillStats)
          .filter(([, s]) => s.total >= 3 && s.correct / s.total < 0.6)
          .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
          .map(([skill]) => skill);
        setWeakSkills(weak);
      });
  }, [user]);

  // Load questions
  useEffect(() => {
    const load = async () => {
      // Load from all K12 exams
      const allQs: Question[] = [];
      for (const exam of K12_EXAMS) {
        const qs = await loadK12ExamQuestions(exam.examKeys, exam.legacyJsonFiles);
        allQs.push(...qs);
      }

      // Deduplicate
      const seen = new Set<string>();
      const unique = allQs.filter((q) => {
        if (seen.has(q.id)) return false;
        seen.add(q.id);
        return true;
      });

      // Prioritize weak skills
      const seed = getDailySeed();
      let pool: Question[];
      if (weakSkills.length > 0) {
        const weakPool = unique.filter((q) => weakSkills.includes(q.skill));
        const otherPool = unique.filter((q) => !weakSkills.includes(q.skill));
        const weakCount = Math.min(Math.ceil(DAILY_QUESTIONS * 0.6), weakPool.length);
        const otherCount = DAILY_QUESTIONS - weakCount;
        pool = [
          ...seededShuffle(weakPool, seed).slice(0, weakCount),
          ...seededShuffle(otherPool, seed + 1).slice(0, otherCount),
        ];
      } else {
        pool = seededShuffle(unique, seed).slice(0, DAILY_QUESTIONS);
      }

      const shuffled = shuffleAllQuestionOptions(pool);
      setQuizQuestions(shuffled);
      setLoading(false);
    };
    load();
  }, [weakSkills]);

  const handleAnswer = useCallback(
    (letter: string) => {
      if (showExplanation) return;
      const current = quizQuestions[currentIndex];
      const isCorrect = letter === current.correctAnswer;
      if (isCorrect) setScore((s) => s + 1);
      setSelectedAnswer(letter);
      setShowExplanation(true);

      if (user) {
        supabase
          .from("question_attempts")
          .insert({
            user_id: user.id,
            question_id: current.id,
            question_type: "k12-daily",
            is_correct: isCorrect,
            domain: current.domain,
            skill: current.skill,
          })
          .then();
      }
    },
    [showExplanation, quizQuestions, currentIndex, user]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= quizQuestions.length) {
      setQuizComplete(true);
      if (user) {
        const today = new Date().toISOString().slice(0, 10);
        supabase
          .from("daily_challenges")
          .insert({
            user_id: user.id,
            score,
            total_questions: quizQuestions.length,
            challenge_date: today,
            bonus_xp: score === quizQuestions.length ? 50 : score >= quizQuestions.length * 0.8 ? 20 : 0,
          })
          .then();
      }
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentIndex, quizQuestions.length, score, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="text-4xl animate-bounce">📅</div>
          <p className="text-sm text-muted-foreground">Loading today's challenge…</p>
        </div>
      </div>
    );
  }

  if (completedToday && todayScore) {
    const pct = Math.round((todayScore.score / todayScore.total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6 pt-8 animate-in fade-in">
          <Button variant="ghost" size="sm" onClick={() => navigate("/k12-exams")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="text-center space-y-3">
            <div className="text-6xl">✅</div>
            <h2 className="text-2xl font-bold">Today's Challenge Complete!</h2>
            <p className="text-4xl font-bold text-primary">
              {todayScore.score}/{todayScore.total}
            </p>
            <p className="text-muted-foreground">{pct}% — Come back tomorrow!</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (quizComplete) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6 pt-8 animate-in fade-in">
          <div className="text-center space-y-3">
            <div className="text-6xl">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "📚"}</div>
            <h2 className="text-2xl font-bold">Daily Challenge Complete!</h2>
            <p className="text-4xl font-bold text-primary">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-muted-foreground">{pct}% correct</p>
            {weakSkills.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Today's focus: {weakSkills.slice(0, 3).join(", ")}
              </p>
            )}
          </div>
          <Button className="w-full" onClick={() => navigate("/k12-exams")}>
            Back to K12 Exams
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const current = quizQuestions[currentIndex];
  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/k12-exams")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">
              {currentIndex + 1}/{quizQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFlagModalOpen(true)}
              className="text-muted-foreground hover:text-destructive p-1"
            >
              <Flag className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-primary">{score} ✓</span>
          </div>
        </div>

        <div className="text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-medium">
            📅 Daily K12 Challenge
            {weakSkills.length > 0 && " — Targeting Your Weak Areas"}
          </span>
        </div>

        <Card className="p-5">
          <p className="text-[10px] text-muted-foreground mb-2">
            {current.domain} · {current.difficulty}
          </p>
          <p className="font-medium text-sm leading-relaxed">{current.question}</p>
        </Card>

        <div className="space-y-2">
          {current.options.map((opt) => {
            let classes = "p-4 border-2 cursor-pointer transition-all text-left w-full";
            if (showExplanation) {
              if (opt.letter === current.correctAnswer)
                classes += " border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
              else if (opt.letter === selectedAnswer)
                classes += " border-red-500 bg-red-50 dark:bg-red-950/30";
              else classes += " opacity-50";
            } else {
              classes += " hover:border-primary/50";
            }
            return (
              <Card
                key={opt.letter}
                className={classes}
                onClick={() => !showExplanation && handleAnswer(opt.letter)}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-sm min-w-[1.5rem]">{opt.letter}.</span>
                  <span className="text-sm">{opt.text}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {showExplanation && (
          <Card className="p-4 border-primary/20 bg-primary/5 animate-in fade-in">
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === current.correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-bold text-sm">
                {selectedAnswer === current.correctAnswer
                  ? "Correct!"
                  : `Incorrect — Answer: ${current.correctAnswer}`}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{current.explanation}</p>
            <Button className="w-full mt-3" size="sm" onClick={nextQuestion}>
              {currentIndex + 1 >= quizQuestions.length ? "See Results" : "Next Question →"}
            </Button>
          </Card>
        )}
      </div>

      <FlagQuestionModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        questionId={current.id}
        questionType="math"
        questionData={{ ...current }}
        onFlagged={() => nextQuestion()}
      />
      <BottomNav />
    </div>
  );
};

export default K12DailyChallenge;
