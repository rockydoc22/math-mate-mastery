import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAIAssistant, disableAIAssistantForSession } from "@/hooks/useAIAssistant";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function K12AIAssistantCard({ onOpen }: { onOpen: () => void }) {
  const { enabled, disableForSession, sessionDisabled } = useAIAssistant();
  if (!enabled) return null;
  return (
    <Card
      className="p-4 border-2 transition-all hover:border-primary/30 hover:shadow-md bg-gradient-to-r from-primary/5 to-accent/5"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary shrink-0" />
        <div className="flex-1 cursor-pointer" onClick={onOpen}>
          <h3 className="font-bold text-sm">AI Assistant <span className="text-[10px] font-normal text-muted-foreground">(optional)</span></h3>
          <p className="text-[10px] text-muted-foreground">Hints & adaptive difficulty. Skip any time.</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60 gap-2">
        <button
          type="button"
          className="text-[10px] text-muted-foreground hover:text-foreground underline"
          onClick={disableForSession}
          disabled={sessionDisabled}
        >
          {sessionDisabled ? "Off for this session ✓" : "Turn off for this test"}
        </button>
        <Link to="/settings#ai-assistant" className="text-[10px] text-primary hover:underline">
          Turn off in Settings
        </Link>
      </div>
    </Card>
  );
}
import { ArrowLeft, Clock, CheckCircle2, XCircle, RotateCcw, Filter, Flag, Brain, Target } from "lucide-react";
import { getK12Exam } from "@/utils/k12ExamConfig";
import { loadK12ExamQuestions, getK12QuestionsBySubject } from "@/data/k12Questions";
import { Question } from "@/data/questions";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { DesmosCalculator } from "@/components/DesmosCalculator";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";

const QUIZ_SIZE = 10;
// Diagnostic pulls a wider sample so we can spot strengths/weaknesses across
// every subject in one sitting without turning it into a full mock exam.
const DIAGNOSTIC_SIZE = 20;

/** A subject is "math-y" when the calculator should surface automatically. */
function isMathSubject(domain: string | undefined | null): boolean {
  if (!domain) return false;
  const k = domain.toLowerCase();
  return k.includes('math') || k.includes('algebra') || k.includes('geometry') || k.includes('quant');
}

const K12ExamQuiz = () => {
  const { examId } = useParams<{ examId: string }>();
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get('subject');
  const navigate = useNavigate();
  const { user } = useAuth();
  const exam = getK12Exam(examId || '');

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  useEffect(() => {
    if (!exam) return;
    loadK12ExamQuestions(exam.examKeys, exam.legacyJsonFiles).then(qs => {
      setAllQuestions(qs);
      setLoading(false);
    });
  }, [exam]);

  const subjects = useMemo(() => {
    const counts: Record<string, number> = {};
    allQuestions.forEach(q => {
      counts[q.domain] = (counts[q.domain] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [allQuestions]);

  const startQuiz = useCallback((subject?: string, difficulty?: string, opts?: { diagnostic?: boolean }) => {
    const diagnostic = !!opts?.diagnostic;
    let pool = subject ? getK12QuestionsBySubject(allQuestions, subject) : allQuestions;
    if (difficulty) {
      pool = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    // Extra safety: strip any near-duplicate prompts that slipped through the
    // loader-level dedupe (protects against the "DNA question twice" bug).
    const seenText = new Set<string>();
    pool = pool.filter(q => {
      const k = q.question.trim().toLowerCase().replace(/\s+/g, ' ');
      if (seenText.has(k)) return false;
      seenText.add(k);
      return true;
    });
    const size = diagnostic ? DIAGNOSTIC_SIZE : QUIZ_SIZE;
    let selected: Question[];
    if (diagnostic && !subject) {
      // General diagnostic — round-robin across subjects so we cover every
      // domain roughly evenly instead of getting a Math-heavy random pull.
      const byDomain: Record<string, Question[]> = {};
      for (const q of pool) (byDomain[q.domain] ||= []).push(q);
      Object.values(byDomain).forEach(arr => arr.sort(() => Math.random() - 0.5));
      const domains = Object.keys(byDomain);
      const picked: Question[] = [];
      let i = 0;
      while (picked.length < size && domains.some(d => byDomain[d].length)) {
        const d = domains[i % domains.length];
        const q = byDomain[d].shift();
        if (q) picked.push(q);
        i++;
      }
      selected = picked;
    } else {
      selected = [...pool].sort(() => Math.random() - 0.5).slice(0, size);
    }
    if (selected.length === 0) {
      toast({ title: "No questions available", description: "No questions match that filter." });
      return;
    }
    const shuffled = shuffleAllQuestionOptions(selected);
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(0);
    setQuizComplete(false);
    setTimeLeft(exam!.timePerQuestion);
    setQuizActive(true);
  }, [allQuestions, exam]);

  useEffect(() => {
    if (!quizActive || showExplanation || quizComplete) return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, quizActive, showExplanation, quizComplete]);

  const handleAnswer = useCallback((letter: string | null) => {
    if (showExplanation) return;
    const current = quizQuestions[currentIndex];
    const isCorrect = letter === current.correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    setSelectedAnswer(letter);
    setShowExplanation(true);
    setAnswered(a => a + 1);

    if (user) {
      const kidId = sessionStorage.getItem(`kid_selected_${user.id}`);
      supabase.from('question_attempts').insert({
        user_id: user.id,
        question_id: current.id,
        question_type: `k12-${examId}`,
        is_correct: isCorrect,
        domain: current.domain,
        skill: current.skill,
        kid_profile_id: kidId && kidId !== 'parent' ? kidId : null,
      } as any).then();
    }
  }, [showExplanation, quizQuestions, currentIndex, user, examId]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= quizQuestions.length) {
      setQuizComplete(true);
      if (user) {
        supabase.from('quiz_scores').insert({
          user_id: user.id,
          score,
          total_questions: quizQuestions.length,
          percentage: Math.round((score / quizQuestions.length) * 100),
          subject: `k12-${examId}`,
        }).then();
      }
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(exam!.timePerQuestion);
  }, [currentIndex, quizQuestions.length, score, user, examId, exam]);

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
          <div className="text-4xl animate-bounce">{exam.icon}</div>
          <p className="text-sm text-muted-foreground">Loading {exam.shortName} questions…</p>
        </div>
      </div>
    );
  }

  // Quiz complete screen
  if (quizComplete) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6 pt-8 animate-in fade-in">
          <div className="text-center space-y-3">
            <div className="text-6xl">{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}</div>
            <h2 className="text-2xl font-bold">{exam.shortName} Quiz Complete!</h2>
            <p className="text-4xl font-bold text-primary">{score}/{quizQuestions.length}</p>
            <p className="text-muted-foreground">{pct}% correct</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => startQuiz(subjectFilter || undefined)} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
            <Button variant="outline" onClick={() => setQuizActive(false)}>
              Back to Subjects
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Active quiz
  if (quizActive && quizQuestions.length > 0) {
    const current = quizQuestions[currentIndex];
    const showCalculator = isMathSubject(current.domain);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setQuizActive(false)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Exit
            </Button>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium">{currentIndex + 1}/{quizQuestions.length}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" /> {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsFlagModalOpen(true)} className="text-muted-foreground hover:text-destructive p-1">
                <Flag className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-primary">{score} ✓</span>
            </div>
          </div>

          <Card className="p-5">
            <p className="text-[10px] text-muted-foreground mb-2">{current.domain} · {current.difficulty}</p>
            <p className="font-medium text-sm leading-relaxed">{current.question}</p>
          </Card>

          <div className="space-y-2">
            {current.options.map(opt => {
              let classes = "p-4 border-2 cursor-pointer transition-all text-left w-full";
              if (showExplanation) {
                if (opt.letter === current.correctAnswer) classes += " border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
                else if (opt.letter === selectedAnswer) classes += " border-red-500 bg-red-50 dark:bg-red-950/30";
                else classes += " opacity-50";
              } else {
                classes += " hover:border-primary/50";
              }
              return (
                <Card key={opt.letter} className={classes} onClick={() => !showExplanation && handleAnswer(opt.letter)}>
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
                  {selectedAnswer === current.correctAnswer ? 'Correct!' : `Incorrect — Answer: ${current.correctAnswer}`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{current.explanation}</p>
              <Button className="w-full mt-3" size="sm" onClick={nextQuestion}>
                {currentIndex + 1 >= quizQuestions.length ? 'See Results' : 'Next Question →'}
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
        {/* Calculator FAB — auto-mounts on math prompts. Students asked for
            this on MAP Growth math items that need multi-step arithmetic. */}
        {showCalculator && <DesmosCalculator />}
        <BottomNav />
      </div>
    );
  }

  // Subject selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
      <div className="max-w-lg mx-auto space-y-5 animate-in fade-in">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/k12-exams")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-2">
          <span className="text-4xl">{exam.icon}</span>
          <h1 className="text-2xl font-bold">{exam.name}</h1>
          <p className="text-sm text-muted-foreground">{allQuestions.length.toLocaleString()} questions available</p>
        </div>

        {/* AI Assistant card — hidden entirely when the user has turned it
            off globally in Settings. */}
        <K12AIAssistantCard onOpen={() => navigate(`/k12-tutor/${examId}`)} />

        {/* Diagnostic — a single 20-question pull that spans every subject so
            students get a fast strengths/weaknesses read before drilling into
            any one topic. Per-subject diagnostics live below each subject. */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" /> Diagnostic Assessment
          </h3>
          <Card
            className="p-4 cursor-pointer border-2 transition-all hover:border-primary/50 hover:shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20"
            onClick={() => startQuiz(undefined, undefined, { diagnostic: true })}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">General diagnostic</h4>
                <p className="text-[11px] text-muted-foreground">
                  {DIAGNOSTIC_SIZE} questions across every subject · timed · shows where you're strong and weak
                </p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {DIAGNOSTIC_SIZE}q
              </span>
            </div>
          </Card>
        </div>

        {/* Difficulty filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">🎯 Difficulty</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'All', value: undefined, emoji: '🎲' },
              { label: 'Easy', value: 'Easy', emoji: '🟢' },
              { label: 'Medium', value: 'Medium', emoji: '🟡' },
              { label: 'Hard', value: 'Hard', emoji: '🔴' },
            ].map(d => (
              <Card
                key={d.label}
                className="p-3 cursor-pointer border-2 hover:border-primary/50 transition-all text-center"
                onClick={() => startQuiz(undefined, d.value)}
              >
                <span className="text-lg">{d.emoji}</span>
                <p className="text-xs font-medium mt-1">{d.label}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4" /> By Subject
          </h3>
          <p className="text-[11px] text-muted-foreground -mt-1">
            Each subject pick runs {QUIZ_SIZE} timed questions · {exam.timePerQuestion}s each.
            Tap "Diagnose" for a wider {DIAGNOSTIC_SIZE}-question read on that subject.
          </p>
          {subjects.map(([subject, count]) => (
            <Card
              key={subject}
              className="p-4 border-2 hover:border-primary/50 transition-all"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-sm">{subject}</h4>
                  <p className="text-[10px] text-muted-foreground">
                    {count} questions available · {QUIZ_SIZE} per quiz · {exam.timePerQuestion}s each
                  </p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <Button size="sm" className="h-7 px-2 text-[11px]" onClick={() => startQuiz(subject)}>
                    Practice ({QUIZ_SIZE})
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-[11px]"
                    onClick={() => startQuiz(subject, undefined, { diagnostic: true })}
                  >
                    Diagnose ({DIAGNOSTIC_SIZE})
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default K12ExamQuiz;
