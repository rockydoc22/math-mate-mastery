import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Lightbulb, Flag, CheckCircle2, XCircle, Brain, TrendingUp, BookOpen } from "lucide-react";
import { K12_EXAMS, getK12Exam } from "@/utils/k12ExamConfig";
import { loadK12ExamQuestions } from "@/data/k12Questions";
import { Question } from "@/data/questions";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";

interface HintTemplate {
  skill_id: string;
  subject: string;
  difficulty: string;
  hint_sequence: string[];
}

interface SkillTaxonomy {
  skill_id: string;
  subject: string;
  name: string;
  grade_band: string;
  difficulty_progression: string[];
  mastery_thresholds: { struggling: number; developing: number; proficient: number; advanced: number };
  student_friendly_description: string;
}

interface MasteryState {
  skill: string;
  correct: number;
  total: number;
  level: "struggling" | "developing" | "proficient" | "advanced";
}

const MASTERY_THRESHOLDS = { struggling: 0, developing: 0.55, proficient: 0.75, advanced: 0.9 };

function getMasteryLevel(correct: number, total: number): MasteryState["level"] {
  if (total === 0) return "struggling";
  const pct = correct / total;
  if (pct >= MASTERY_THRESHOLDS.advanced) return "advanced";
  if (pct >= MASTERY_THRESHOLDS.proficient) return "proficient";
  if (pct >= MASTERY_THRESHOLDS.developing) return "developing";
  return "struggling";
}

const LEVEL_COLORS: Record<string, string> = {
  struggling: "text-red-500",
  developing: "text-amber-500",
  proficient: "text-emerald-500",
  advanced: "text-primary",
};

const LEVEL_EMOJIS: Record<string, string> = {
  struggling: "🔴",
  developing: "🟡",
  proficient: "🟢",
  advanced: "⭐",
};

const K12AdaptiveTutor = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const exam = getK12Exam(examId || "");

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryState>>({});
  const [hints, setHints] = useState<HintTemplate[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("easy");
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());

  // Load questions + hints + mastery data
  useEffect(() => {
    if (!exam) return;
    const load = async () => {
      const { fetchProtectedJson } = await import("@/lib/protectedAsset");
      const [qs, hintsRes] = await Promise.all([
        loadK12ExamQuestions(exam.examKeys, exam.legacyJsonFiles),
        fetchProtectedJson<any>("ai/tutor_and_hint_system.json").catch(() => ({ hint_templates: [] })),
      ]);
      setAllQuestions(qs);
      setHints(hintsRes.hint_templates || []);

      // Load mastery from DB
      if (user) {
        const { data } = await supabase
          .from("question_attempts")
          .select("skill, is_correct")
          .eq("user_id", user.id)
          .like("question_type", `k12-${examId}%`)
          .order("created_at", { ascending: false })
          .limit(500);

        if (data) {
          const map: Record<string, MasteryState> = {};
          data.forEach((a) => {
            if (!map[a.skill]) map[a.skill] = { skill: a.skill, correct: 0, total: 0, level: "struggling" };
            map[a.skill].total++;
            if (a.is_correct) map[a.skill].correct++;
          });
          Object.values(map).forEach((s) => {
            s.level = getMasteryLevel(s.correct, s.total);
          });
          setMasteryMap(map);
        }
      }

      setLoading(false);
    };
    load();
  }, [exam, user, examId]);

  // Select next question adaptively
  const selectNextQuestion = useCallback(() => {
    if (allQuestions.length === 0) return;

    // Find weakest skills
    const skills = Object.values(masteryMap).sort((a, b) => {
      const aRate = a.total > 0 ? a.correct / a.total : 0;
      const bRate = b.total > 0 ? b.correct / b.total : 0;
      return aRate - bRate;
    });

    const weakSkills = skills.filter((s) => s.level === "struggling" || s.level === "developing");
    const targetSkills = weakSkills.length > 0 ? weakSkills.map((s) => s.skill) : null;

    // Determine difficulty based on recent performance
    let targetDifficulty: string;
    if (sessionTotal >= 3) {
      const recentRate = sessionScore / sessionTotal;
      if (recentRate >= 0.8) targetDifficulty = "Hard";
      else if (recentRate >= 0.5) targetDifficulty = "Medium";
      else targetDifficulty = "Easy";
    } else {
      targetDifficulty = currentDifficulty === "easy" ? "Easy" : currentDifficulty === "hard" ? "Hard" : "Medium";
    }

    setCurrentDifficulty(targetDifficulty.toLowerCase());

    // Filter pool
    let pool = allQuestions.filter((q) => !answeredIds.has(q.id));
    if (targetSkills) {
      const skillPool = pool.filter((q) => targetSkills.includes(q.skill));
      if (skillPool.length > 0) pool = skillPool;
    }

    const diffPool = pool.filter((q) => q.difficulty === targetDifficulty);
    const finalPool = diffPool.length >= 3 ? diffPool : pool;

    const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
    if (selected) {
      const [shuffled] = shuffleAllQuestionOptions([selected]);
      setCurrentQuestion(shuffled);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHints(false);
      setCurrentHintIndex(0);
    }
  }, [allQuestions, masteryMap, sessionScore, sessionTotal, currentDifficulty, answeredIds]);

  // Start first question when loaded
  useEffect(() => {
    if (!loading && allQuestions.length > 0 && !currentQuestion) {
      selectNextQuestion();
    }
  }, [loading, allQuestions, currentQuestion, selectNextQuestion]);

  // Get hints for current question
  const currentHints = useMemo(() => {
    if (!currentQuestion) return [];
    const match = hints.find(
      (h) => h.difficulty === currentDifficulty || h.difficulty === currentQuestion.difficulty.toLowerCase()
    );
    return match?.hint_sequence || [
      "Read the question carefully — what is it really asking?",
      "Try to eliminate obviously wrong answers first.",
      "Look for key words that point to the concept being tested.",
      "If stuck, try working backwards from the answer choices.",
    ];
  }, [currentQuestion, hints, currentDifficulty]);

  const handleAnswer = useCallback(
    (letter: string) => {
      if (showExplanation || !currentQuestion) return;
      const isCorrect = letter === currentQuestion.correctAnswer;
      setSelectedAnswer(letter);
      setShowExplanation(true);
      setSessionTotal((t) => t + 1);
      if (isCorrect) setSessionScore((s) => s + 1);
      setAnsweredIds((prev) => new Set(prev).add(currentQuestion.id));

      // Update mastery
      setMasteryMap((prev) => {
        const skill = currentQuestion.skill;
        const existing = prev[skill] || { skill, correct: 0, total: 0, level: "struggling" as const };
        const updated = {
          ...existing,
          correct: existing.correct + (isCorrect ? 1 : 0),
          total: existing.total + 1,
          level: getMasteryLevel(existing.correct + (isCorrect ? 1 : 0), existing.total + 1),
        };
        return { ...prev, [skill]: updated };
      });

      if (user) {
        supabase
          .from("question_attempts")
          .insert({
            user_id: user.id,
            question_id: currentQuestion.id,
            question_type: `k12-${examId}-tutor`,
            is_correct: isCorrect,
            domain: currentQuestion.domain,
            skill: currentQuestion.skill,
          })
          .then();
      }
    },
    [showExplanation, currentQuestion, user, examId]
  );

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Exam not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <Brain className="w-10 h-10 mx-auto animate-pulse text-primary" />
          <p className="text-sm text-muted-foreground">Loading adaptive tutor…</p>
        </div>
      </div>
    );
  }

  const masteryEntries = Object.values(masteryMap).sort((a, b) => {
    const aR = a.total > 0 ? a.correct / a.total : 0;
    const bR = b.total > 0 ? b.correct / b.total : 0;
    return aR - bR;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4 animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/k12-exam/${examId}`)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          <span className="text-sm font-medium text-primary">
            {sessionScore}/{sessionTotal}
          </span>
        </div>

        {/* Mastery Overview */}
        {masteryEntries.length > 0 && (
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold">Skill Mastery</span>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {masteryEntries.slice(0, 6).map((m) => (
                <div key={m.skill} className="flex items-center gap-2 text-xs">
                  <span>{LEVEL_EMOJIS[m.level]}</span>
                  <span className="flex-1 truncate">{m.skill}</span>
                  <span className={`font-medium ${LEVEL_COLORS[m.level]}`}>
                    {m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Difficulty Indicator */}
        <div className="text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            Difficulty: {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} · Auto-adjusting
          </span>
        </div>

        {/* Question */}
        {currentQuestion && (
          <>
            <Card className="p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="text-[10px] text-muted-foreground">
                  {currentQuestion.domain} · {currentQuestion.skill} · {currentQuestion.difficulty}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFlagModalOpen(true)}
                  className="text-muted-foreground hover:text-destructive p-1 -mt-1"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
              <p className="font-medium text-sm leading-relaxed">{currentQuestion.question}</p>
            </Card>

            {/* Hint System */}
            {!showExplanation && (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 text-xs"
                onClick={() => {
                  if (showHints && currentHintIndex < currentHints.length - 1) {
                    setCurrentHintIndex((i) => i + 1);
                  } else {
                    setShowHints(true);
                  }
                }}
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {showHints
                  ? currentHintIndex < currentHints.length - 1
                    ? "Next Hint"
                    : "No More Hints"
                  : "Need a Hint?"}
              </Button>
            )}

            {showHints && !showExplanation && (
              <Card className="p-3 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                <div className="space-y-2">
                  {currentHints.slice(0, currentHintIndex + 1).map((hint, i) => (
                    <p key={i} className="text-xs text-amber-900 dark:text-amber-100">
                      <span className="font-bold">Hint {i + 1}:</span> {hint}
                    </p>
                  ))}
                </div>
              </Card>
            )}

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((opt) => {
                let classes = "p-4 border-2 cursor-pointer transition-all text-left w-full";
                if (showExplanation) {
                  if (opt.letter === currentQuestion.correctAnswer)
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

            {/* Explanation */}
            {showExplanation && (
              <Card className="p-4 border-primary/20 bg-primary/5 animate-in fade-in">
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-bold text-sm">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "Correct!"
                      : `Incorrect — Answer: ${currentQuestion.correctAnswer}`}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{currentQuestion.explanation}</p>
                <Button className="w-full" size="sm" onClick={selectNextQuestion}>
                  Next Question →
                </Button>
              </Card>
            )}
          </>
        )}
      </div>

      {currentQuestion && (
        <FlagQuestionModal
          isOpen={isFlagModalOpen}
          onClose={() => setIsFlagModalOpen(false)}
          questionId={currentQuestion.id}
          questionType="math"
          questionData={{ ...currentQuestion }}
          onFlagged={() => selectNextQuestion()}
        />
      )}
      <BottomNav />
    </div>
  );
};

export default K12AdaptiveTutor;
