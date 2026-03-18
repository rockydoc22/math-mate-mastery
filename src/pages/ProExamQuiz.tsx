import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Clock, CheckCircle2, XCircle, RotateCcw, Filter, Flag } from "lucide-react";
import { getProExam } from "@/utils/proExamConfig";
import { loadProExamQuestions, getQuestionsBySection } from "@/data/proExamQuestions";
import { Question } from "@/data/questions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";

const QUIZ_SIZE = 10;

const ProExamQuiz = () => {
  const { examId } = useParams<{ examId: string }>();
  const [searchParams] = useSearchParams();
  const sectionFilter = searchParams.get('section');
  const navigate = useNavigate();
  const { user } = useAuth();
  const exam = getProExam(examId || '');

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
    loadProExamQuestions(exam.jsonFiles).then(qs => {
      setAllQuestions(qs);
      setLoading(false);
    });
  }, [exam]);

  const sections = useMemo(() => {
    const counts: Record<string, number> = {};
    allQuestions.forEach(q => {
      counts[q.domain] = (counts[q.domain] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [allQuestions]);

  const startQuiz = useCallback((section?: string) => {
    let pool = section ? getQuestionsBySection(allQuestions, section) : allQuestions;
    // Shuffle and pick
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, QUIZ_SIZE);
    if (shuffled.length === 0) {
      toast({ title: "No questions available", description: "This section has no questions yet." });
      return;
    }
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

  // Timer
  useEffect(() => {
    if (!quizActive || showExplanation || quizComplete) return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, quizActive, showExplanation, quizComplete]);

  const handleAnswer = (letter: string | null) => {
    if (showExplanation) return;
    const q = quizQuestions[currentIndex];
    const correct = letter === q.correctAnswer;
    if (correct) setScore(s => s + 1);
    setSelectedAnswer(letter);
    setShowExplanation(true);
    setAnswered(a => a + 1);

    // Record attempt
    if (user) {
      const kidId = sessionStorage.getItem(`kid_selected_${user.id}`);
      supabase.from('question_attempts').insert({
        user_id: user.id,
        question_id: q.id,
        question_type: `pro-${examId}`,
        is_correct: correct,
        domain: q.domain,
        skill: q.skill || q.domain,
        time_taken_ms: (exam!.timePerQuestion - timeLeft) * 1000,
        kid_profile_id: kidId && kidId !== 'parent' ? kidId : null,
      } as any).then(() => {});
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= quizQuestions.length) {
      setQuizComplete(true);
      // Save quiz score
      if (user) {
        supabase.from('quiz_scores').insert({
          user_id: user.id,
          score,
          total_questions: quizQuestions.length,
          percentage: Math.round((score / quizQuestions.length) * 100),
          subject: `pro-${examId}`,
        }).then(() => {});
      }
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(exam!.timePerQuestion);
  };

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-lg font-bold">Exam not found</p>
          <Link to="/pro-exams"><Button>Back to Exams</Button></Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading {exam.shortName} questions…</p>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizComplete) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center space-y-4">
          <div className="text-5xl">{exam.icon}</div>
          <h2 className="text-2xl font-bold">{exam.shortName} Results</h2>
          <div className="text-6xl font-bold text-primary">{pct}%</div>
          <p className="text-muted-foreground">{score}/{quizQuestions.length} correct</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => startQuiz(sectionFilter || undefined)} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
            <Button variant="outline" onClick={() => setQuizActive(false)}>
              Section Select
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz active
  if (quizActive) {
    const q = quizQuestions[currentIndex];
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setQuizActive(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="font-bold">{exam.shortName}</span>
              <span className="text-xs text-muted-foreground">
                Q{currentIndex + 1}/{quizQuestions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-destructive' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-mono ${timeLeft <= 10 ? 'text-destructive font-bold' : ''}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {score}/{answered}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <div className="text-xs text-muted-foreground font-medium">{q.domain}</div>
          <p className="text-base font-medium leading-relaxed whitespace-pre-line">{q.question}</p>

          <div className="space-y-2">
            {q.options.map(opt => {
              let style = "border-border hover:border-primary/50 cursor-pointer";
              if (showExplanation) {
                if (opt.letter === q.correctAnswer) {
                  style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                } else if (opt.letter === selectedAnswer && opt.letter !== q.correctAnswer) {
                  style = "border-destructive bg-destructive/10";
                } else {
                  style = "border-border opacity-50";
                }
              } else if (selectedAnswer === opt.letter) {
                style = "border-primary bg-primary/5";
              }

              return (
                <Card
                  key={opt.letter}
                  className={`p-3 border-2 transition-all ${style}`}
                  onClick={() => !showExplanation && handleAnswer(opt.letter)}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                      {opt.letter}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                    {showExplanation && opt.letter === q.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-auto" />
                    )}
                    {showExplanation && opt.letter === selectedAnswer && opt.letter !== q.correctAnswer && (
                      <XCircle className="w-5 h-5 text-destructive shrink-0 ml-auto" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {showExplanation && (
            <Card className="p-4 bg-muted/50 border-primary/20 space-y-2">
              <p className="text-sm font-medium text-primary">Explanation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
              <Button onClick={nextQuestion} className="w-full mt-2 gap-2">
                {currentIndex + 1 >= quizQuestions.length ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Section select screen
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/pro-exams">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span>{exam.icon}</span> {exam.name}
            </h1>
            <p className="text-xs text-muted-foreground">{allQuestions.length} questions available</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* All sections */}
        <Card
          className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group"
          onClick={() => startQuiz()}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">All Sections</h3>
              <p className="text-xs text-muted-foreground">{allQuestions.length} questions • Mixed practice</p>
            </div>
            <Button size="sm" className="gap-1">
              Start <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Filter className="w-4 h-4" /> By Section
        </h3>

        {sections.map(([section, count]) => (
          <Card
            key={section}
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40"
            onClick={() => startQuiz(section)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">{section}</h3>
                <p className="text-xs text-muted-foreground">{count} questions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExamQuiz;
