import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, CheckCircle2, XCircle, Sparkles, Trophy } from "lucide-react";
import { FRENCH_CATEGORIES, loadFrenchQuestions, frenchQuestionsByCategory, type FrenchCategory } from "@/data/frenchCompetitionQuestions";
import { Question } from "@/data/questions";
import { AITutorExplanation } from "@/components/AITutorExplanation";

type ViewState =
  | { mode: "categories" }
  | { mode: "quiz"; category: FrenchCategory; questions: Question[]; currentIndex: number; selectedAnswer: string | null; showResult: boolean; score: number; answered: number }
  | { mode: "results"; category: FrenchCategory; score: number; total: number };

const FrenchCompetition = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>({ mode: "categories" });
  const [showAITutor, setShowAITutor] = useState(false);
  const [questions, setQuestions] = useState<Record<string, Question[]>>(frenchQuestionsByCategory);

  useEffect(() => {
    loadFrenchQuestions().then(setQuestions);
  }, []);

  const startQuiz = (cat: FrenchCategory) => {
    const qs = questions[cat.id] || [];
    if (qs.length === 0) return;
    // Shuffle
    const shuffled = [...qs].sort(() => Math.random() - 0.5);
    setView({ mode: "quiz", category: cat, questions: shuffled, currentIndex: 0, selectedAnswer: null, showResult: false, score: 0, answered: 0 });
    setShowAITutor(false);
  };

  const handleSelectAnswer = (letter: string) => {
    if (view.mode !== "quiz" || view.showResult) return;
    setView({ ...view, selectedAnswer: letter });
  };

  const handleConfirm = () => {
    if (view.mode !== "quiz" || !view.selectedAnswer) return;
    const isCorrect = view.selectedAnswer === view.questions[view.currentIndex].correctAnswer;
    setView({ ...view, showResult: true, score: view.score + (isCorrect ? 1 : 0), answered: view.answered + 1 });
    setShowAITutor(false);
  };

  const handleNext = () => {
    if (view.mode !== "quiz") return;
    const nextIndex = view.currentIndex + 1;
    if (nextIndex >= view.questions.length) {
      setView({ mode: "results", category: view.category, score: view.score, total: view.questions.length });
    } else {
      setView({ ...view, currentIndex: nextIndex, selectedAnswer: null, showResult: false });
      setShowAITutor(false);
    }
  };

  // ─── Categories list ───
  if (view.mode === "categories") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                🇫🇷 French Competition
              </h1>
              <p className="text-sm text-muted-foreground">CCFF-style practice — grammar, culture, listening & more</p>
            </div>
          </div>

          <div className="grid gap-3">
            {FRENCH_CATEGORIES.map(cat => {
              const qs = questions[cat.id] || [];
              const count = qs.length;
              return (
                <Card
                  key={cat.id}
                  className={`p-4 transition-all ${count > 0 ? "cursor-pointer hover:scale-[1.01] hover:shadow-md hover:border-primary/40" : "opacity-50 cursor-not-allowed border-dashed"}`}
                  onClick={() => count > 0 && startQuiz(cat)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{count} Q{count !== 1 ? "s" : ""}</span>
                      {count > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Bonne chance ce soir! 🍀 Questions are shuffled & deduplicated each session.
          </p>
        </div>
      </div>
    );
  }

  // ─── Results ───
  if (view.mode === "results") {
    const pct = Math.round((view.score / view.total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6 pt-8">
          <Card className="p-8 text-center space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-primary" />
            <h2 className="text-2xl font-bold">{view.category.name} Complete!</h2>
            <p className="text-lg font-semibold text-primary">{view.score} / {view.total} correct ({pct}%)</p>
            <p className="text-sm text-muted-foreground">{pct >= 80 ? "Magnifique! 🌟" : pct >= 60 ? "Bien joué! 👏" : "Continue à pratiquer! 💪"}</p>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => setView({ mode: "categories" })}>Back to Categories</Button>
              <Button onClick={() => startQuiz(view.category)}>Retry</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── Quiz ───
  const q = view.questions[view.currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView({ mode: "categories" })} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Categories
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            {view.category.icon} {view.category.name} • Q{view.currentIndex + 1}/{view.questions.length}
          </div>
          <div className="text-sm font-semibold text-primary">{view.score}/{view.answered}</div>
        </div>

        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((view.currentIndex + (view.showResult ? 1 : 0)) / view.questions.length) * 100}%` }} />
        </div>

        <Card className="p-5 sm:p-6 shadow-xl border-2 space-y-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">{q.skill}</p>
          <h2 className="text-base sm:text-lg font-bold leading-relaxed whitespace-pre-wrap">{q.question}</h2>

          <div className="space-y-2">
            {q.options.map(option => {
              const isSelected = view.selectedAnswer === option.letter;
              const isCorrect = option.letter === q.correctAnswer;
              const showCorrect = view.showResult && isCorrect;
              const showWrong = view.showResult && isSelected && !isCorrect;

              return (
                <button
                  key={option.letter}
                  onClick={() => handleSelectAnswer(option.letter)}
                  disabled={view.showResult}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    !view.showResult && !isSelected ? "border-border hover:border-primary hover:bg-primary/5" : ""
                  } ${!view.showResult && isSelected ? "border-primary bg-primary/10" : ""} ${
                    showCorrect ? "border-green-500 bg-green-500/10" : ""
                  } ${showWrong ? "border-destructive bg-destructive/10" : ""} ${
                    view.showResult ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-base min-w-[1.5rem] ${showCorrect ? "text-green-600" : ""} ${showWrong ? "text-destructive" : ""} ${!view.showResult && isSelected ? "text-primary" : ""}`}>
                      {option.letter}.
                    </span>
                    <span className="flex-1 text-sm">{option.text}</span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                    {showWrong && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {view.showResult && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-semibold mb-1 text-foreground">Explanation:</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
              </div>
              {!showAITutor && (
                <Button variant="outline" size="sm" onClick={() => setShowAITutor(true)} className="gap-2 w-full">
                  <Sparkles className="w-4 h-4" /> Ask AI Tutor for deeper explanation
                </Button>
              )}
            </div>
          )}
        </Card>

        {showAITutor && view.showResult && (
          <AITutorExplanation
            question={q.question}
            options={q.options}
            correctAnswer={q.correctAnswer}
            userAnswer={view.selectedAnswer || ""}
            explanation={q.explanation}
            onClose={() => setShowAITutor(false)}
          />
        )}

        <div className="flex justify-end gap-3">
          {!view.showResult ? (
            <Button onClick={handleConfirm} disabled={!view.selectedAnswer} className="min-w-[120px]">Check Answer</Button>
          ) : (
            <Button onClick={handleNext} className="min-w-[120px]">
              {view.currentIndex + 1 >= view.questions.length ? "See Results" : "Next →"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrenchCompetition;
