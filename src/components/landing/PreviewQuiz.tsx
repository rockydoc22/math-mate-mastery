import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

type SampleQ = {
  category: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
};

const SAMPLES: SampleQ[] = [
  {
    category: "SAT Math",
    question:
      "In the xy-plane, the line y = 2x − 5 intersects the parabola y = x² − 4x + 3 at two points. What is the sum of the x-coordinates of those points?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "4" },
      { letter: "C", text: "6" },
      { letter: "D", text: "8" },
    ],
    correctAnswer: "C",
    explanation:
      "Set 2x − 5 = x² − 4x + 3 → x² − 6x + 8 = 0. By Vieta's, the sum of the roots is 6.",
  },
  {
    category: "SAT Reading",
    question:
      'In context, the author uses the phrase "a quiet revolution" most nearly to suggest that the change was —',
    options: [
      { letter: "A", text: "violent and sudden" },
      { letter: "B", text: "gradual but transformative" },
      { letter: "C", text: "loud and disruptive" },
      { letter: "D", text: "temporary and superficial" },
    ],
    correctAnswer: "B",
    explanation:
      '"Quiet" rules out A and C; "revolution" implies a real, lasting change, ruling out D. B fits both words.',
  },
  {
    category: "General Trivia",
    question: "Which planet in our solar system has the most moons that have been confirmed and named?",
    options: [
      { letter: "A", text: "Jupiter" },
      { letter: "B", text: "Saturn" },
      { letter: "C", text: "Uranus" },
      { letter: "D", text: "Neptune" },
    ],
    correctAnswer: "B",
    explanation: "Saturn currently leads the count of confirmed named moons, surpassing Jupiter.",
  },
];

export const PreviewQuiz = () => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = SAMPLES[idx];

  const submit = () => {
    if (!selected) return;
    if (selected === q.correctAnswer) setScore((s) => s + 1);
    setShowResult(true);
  };

  const next = () => {
    if (idx + 1 >= SAMPLES.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setIdx(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setDone(false);
  };

  return (
    <section className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3" /> TRY IT — 30 SECONDS, NO SIGNUP
          </span>
          <h2 className="text-xl font-bold mt-3">3 sample questions. See how it feels.</h2>
        </div>

        <Card className="p-5 border-2 shadow-md">
          {done ? (
            <div className="text-center space-y-4 py-4">
              <div className="text-4xl font-bold text-primary">
                {score} / {SAMPLES.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Ready for the full experience? Create your free account.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link to="/auth?mode=signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2">
                    Create my free account
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" onClick={restart}>
                  Try again
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {q.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {idx + 1} / {SAMPLES.length}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-relaxed mb-4 whitespace-pre-wrap">
                {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSel = selected === opt.letter;
                  const isCor = opt.letter === q.correctAnswer;
                  const showCorrect = showResult && isCor;
                  const showWrong = showResult && isSel && !isCor;
                  return (
                    <button
                      key={`${idx}-${opt.letter}`}
                      onClick={() => !showResult && setSelected(opt.letter)}
                      disabled={showResult}
                      className={`w-full p-3 rounded-lg border-2 text-left text-sm transition-all
                        ${!showResult && !isSel ? "border-border hover:border-primary hover:bg-primary/5" : ""}
                        ${!showResult && isSel ? "border-primary bg-primary/10" : ""}
                        ${showCorrect ? "border-success bg-success/10" : ""}
                        ${showWrong ? "border-destructive bg-destructive/10" : ""}
                      `}
                    >
                      <span className="font-bold mr-2">{opt.letter}.</span>
                      {opt.text}
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-success inline ml-2" />}
                      {showWrong && <XCircle className="w-4 h-4 text-destructive inline ml-2" />}
                    </button>
                  );
                })}
              </div>
              {showResult && (
                <p className="mt-3 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                  {q.explanation}
                </p>
              )}
              <div className="mt-4">
                {!showResult ? (
                  <Button onClick={submit} className="w-full" size="lg" disabled={!selected}>
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={next} className="w-full" size="lg">
                    {idx + 1 >= SAMPLES.length ? "See my score" : "Next question"}
                  </Button>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

export default PreviewQuiz;