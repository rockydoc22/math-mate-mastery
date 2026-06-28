import { useState, useEffect, useMemo } from "react";
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
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS } from "@/utils/examConfig";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/data/questions";

const MathQuiz = () => {
  const [searchParams] = useSearchParams();
  const { examType } = useExamType();
  const examParam = (searchParams.get("exam") || "").toLowerCase();
  const overrideLabels: Record<string, string> = {
    ged: "GED", hiset: "HiSET", ap: "AP", act: "ACT", psat: "PSAT", sat: "SAT",
    gre: "GRE", gmat: "GMAT", lsat: "LSAT", mcat: "MCAT", teas: "TEAS",
  };
  const examLabel =
    overrideLabels[examParam] ||
    EXAM_CONFIGS[examType as keyof typeof EXAM_CONFIGS]?.shortName ||
    "SAT";
  // Map URL `?exam=` (or stored exam preference) to an exam_family in the
  // assessment_questions table. SAT stays on the bundled bank — every other
  // exam reads its dedicated AI-generated bank so the SAT pool isn't reused.
  const examFamilyForBank = (() => {
    const e = (examParam || examType || "").toLowerCase();
    if (["act","ged","hiset","ap","psat","state"].includes(e)) return e;
    return null;
  })();
  const [bankQuestions, setBankQuestions] = useState<Question[] | null>(null);
  const [bankLoading, setBankLoading] = useState<boolean>(!!examFamilyForBank);
  useEffect(() => {
    if (!examFamilyForBank) { setBankQuestions(null); setBankLoading(false); return; }
    let cancelled = false;
    (async () => {
      setBankLoading(true);
      const { data } = await supabase
        .from("assessment_questions")
        .select("id, stem, options, correct_key, skill, domain, difficulty, explanation")
        .eq("exam_family", examFamilyForBank)
        .eq("section", "math")
        .gte("difficulty", 5)
        .limit(50);
      if (cancelled) return;
      const mapped: Question[] = (data ?? [])
        .map((row: any) => {
          const opts = Array.isArray(row.options)
            ? row.options
            : (row.options && typeof row.options === "object" ? Object.entries(row.options).map(([letter, text]) => ({ letter, text })) : []);
          const normalized = opts.map((o: any, i: number) =>
            typeof o === "string"
              ? { letter: "ABCD"[i] ?? String(i+1), text: o }
              : { letter: String(o.letter ?? "ABCD"[i] ?? i+1), text: String(o.text ?? o.value ?? "") }
          );
          if (normalized.length < 2) return null;
          return {
            id: String(row.id),
            question: row.stem ?? "",
            options: normalized,
            correctAnswer: String(row.correct_key ?? ""),
            explanation: row.explanation ?? "",
            difficulty: String(row.difficulty ?? ""),
            domain: row.domain ?? "",
            skill: row.skill ?? "",
            difficultyRating: typeof row.difficulty === "number" ? row.difficulty : undefined,
          } as Question;
        })
        .filter(Boolean) as Question[];
      // Light shuffle for variety
      for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
      }
      setBankQuestions(mapped);
      setBankLoading(false);
    })();
    return () => { cancelled = true; };
  }, [examFamilyForBank]);

  const activeQuestions: Question[] = useMemo(
    () => (examFamilyForBank && bankQuestions ? bankQuestions : (questions as Question[])),
    [examFamilyForBank, bankQuestions]
  );
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

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const progress = activeQuestions.length
    ? ((currentQuestionIndex + 1) / activeQuestions.length) * 100
    : 0;

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
    if (currentQuestionIndex < activeQuestions.length - 1) {
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
          totalQuestions={activeQuestions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  if (examFamilyForBank && bankLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading {examLabel} Math questions…
      </div>
    );
  }
  if (examFamilyForBank && bankQuestions && bankQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-bold">{examLabel} Math bank is still filling up</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Our overnight generator is building this bank now. Try again later, or pick another section in the meantime.
        </p>
        <Link to="/"><Button>Back to home</Button></Link>
      </div>
    );
  }

  return (
    <ScreenShakeWrapper shake={screenShake} intensity={getComboIntensity(combo.count) === "ultra" ? "high" : getComboIntensity(combo.count) === "high" ? "medium" : "low"}>
      <SEO
        title={`Free ${examLabel} Math Practice Questions`}
        description={`Sharpen your ${examLabel} Math skills with adaptive practice questions, instant explanations, and a built-in graphing calculator.`}
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
            <h1 className="text-2xl font-bold text-primary">{examLabel} Math Practice</h1>
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
