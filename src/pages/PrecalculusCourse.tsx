import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import {
  PRECALC_CHAPTERS,
  PRECALC_QUESTIONS_PER_CHAPTER,
  type PrecalcChapter,
  type PrecalcQuestion,
} from "@/data/precalcCourse";

type QuizState = {
  chapter: PrecalcChapter;
  questions: PrecalcQuestion[];
  idx: number;
  answers: (number | null)[];
  finished: boolean;
};

export default function PrecalculusCourse() {
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  const start = (chapter: PrecalcChapter) => {
    const questions = chapter.build(PRECALC_QUESTIONS_PER_CHAPTER);
    setQuiz({ chapter, questions, idx: 0, answers: Array(questions.length).fill(null), finished: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <SEO
        title="Free Precalculus Course — Chapters & Quizzes"
        description="A free precalculus course with 10 chapters covering functions, polynomials, trig, logs, matrices, conics, and series. Chapter quizzes with instant feedback."
        path="/precalc"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Precalculus",
          description: "Free precalculus course with chapter-by-chapter practice quizzes.",
          provider: { "@type": "Organization", name: "AlphaOmega" },
        }}
      />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => (quiz ? setQuiz(null) : window.history.back())}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Precalculus</h1>
        </div>

        {!quiz ? <ChapterList onStart={start} /> : <ChapterQuiz quiz={quiz} setQuiz={setQuiz} />}
      </main>
    </div>
  );
}

function ChapterList({ onStart }: { onStart: (c: PrecalcChapter) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground">
        Ten chapters. Each chapter has a fresh {PRECALC_QUESTIONS_PER_CHAPTER}-question practice quiz with instant explanations.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {PRECALC_CHAPTERS.map((c, i) => (
          <Card key={c.id} className="p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{c.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Chapter {i + 1}</div>
                <h2 className="font-bold text-lg leading-tight">{c.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{c.summary}</p>
                <Button size="sm" className="mt-3" onClick={() => onStart(c)}>
                  Start quiz <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChapterQuiz({ quiz, setQuiz }: { quiz: QuizState; setQuiz: (q: QuizState | null) => void }) {
  const q = quiz.questions[quiz.idx];
  const chosen = quiz.answers[quiz.idx];
  const [revealed, setRevealed] = useState(false);

  const score = useMemo(
    () => quiz.answers.reduce((s: number, a, i) => s + (a === quiz.questions[i].correctIndex ? 1 : 0), 0),
    [quiz]
  );

  const pick = (i: number) => {
    if (chosen !== null) return;
    const answers = [...quiz.answers];
    answers[quiz.idx] = i;
    setQuiz({ ...quiz, answers });
    setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (quiz.idx + 1 >= quiz.questions.length) {
      setQuiz({ ...quiz, finished: true });
    } else {
      setQuiz({ ...quiz, idx: quiz.idx + 1 });
    }
  };

  if (quiz.finished) {
    const total = quiz.questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <Card className="p-6 text-center space-y-3">
        <div className="text-5xl">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪"}</div>
        <h2 className="text-2xl font-bold">{quiz.chapter.title} — {score}/{total}</h2>
        <p className="text-muted-foreground">{pct}% correct</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => setQuiz(null)}>Back to chapters</Button>
          <Button onClick={() => {
            const questions = quiz.chapter.build(PRECALC_QUESTIONS_PER_CHAPTER);
            setQuiz({ chapter: quiz.chapter, questions, idx: 0, answers: Array(questions.length).fill(null), finished: false });
          }}>New quiz</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{quiz.chapter.title}</span>
        <span className="tabular-nums">Q {quiz.idx + 1} / {quiz.questions.length}</span>
      </div>
      <Card className="p-5 space-y-4">
        <p className="text-lg font-semibold">{q.stem}</p>
        <div className="grid gap-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isChosen = chosen === i;
            let cls = "border-border hover:border-primary/40";
            if (revealed) {
              if (isCorrect) cls = "border-emerald-500 bg-emerald-500/10";
              else if (isChosen) cls = "border-destructive bg-destructive/10";
              else cls = "border-border opacity-60";
            }
            return (
              <button
                key={i}
                disabled={chosen !== null}
                onClick={() => pick(i)}
                className={`text-left px-3 py-2 rounded-md border-2 transition-colors ${cls}`}
              >
                <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {revealed && isCorrect && <CheckCircle2 className="w-4 h-4 inline ml-2 text-emerald-600" />}
                {revealed && isChosen && !isCorrect && <XCircle className="w-4 h-4 inline ml-2 text-destructive" />}
              </button>
            );
          })}
        </div>
        {revealed && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <span className="font-semibold">Explanation: </span>{q.explanation}
          </div>
        )}
        {revealed && (
          <Button onClick={next} className="w-full">
            {quiz.idx + 1 >= quiz.questions.length ? "See results" : "Next question"}
          </Button>
        )}
      </Card>
    </div>
  );
}