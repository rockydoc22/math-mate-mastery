import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap, Check, X, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import { INTL_SAMPLE_BANKS, type IntlSampleQ } from "@/data/intlSampleQuestions";

function pickThree(): IntlSampleQ[] {
  const all = Object.values(INTL_SAMPLE_BANKS).flat();
  const out: IntlSampleQ[] = [];
  const used = new Set<number>();
  while (out.length < 3 && used.size < all.length) {
    const i = Math.floor(Math.random() * all.length);
    if (used.has(i)) continue;
    used.add(i);
    out.push(all[i]);
  }
  return out;
}

export default function Warmup() {
  const navigate = useNavigate();
  const questions = useMemo(() => pickThree(), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    const perfect = score === questions.length;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <SEO title="Warmup complete — AlphaOmega" description="Quick 3-question warmup." path="/warmup" />
        <Card className="p-6 text-center max-w-sm w-full space-y-4">
          <Sparkles className="w-10 h-10 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">{perfect ? "Perfect warmup!" : "Warmup done!"}</h1>
          <p className="text-muted-foreground">You got <strong>{score}/{questions.length}</strong>. Streak reignited 🔥</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={() => navigate("/path")}>Keep going</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>Another warmup</Button>
          </div>
        </Card>
      </div>
    );
  }

  const q = questions[idx];
  const correct = picked !== null && picked === q.correctIndex;

  return (
    <div className="min-h-screen bg-background pb-16">
      <SEO title="3-Question Warmup — AlphaOmega" description="A quick warmup to reignite your streak." path="/warmup" />
      <div className="max-w-xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-amber-500" />
          <h1 className="text-2xl font-bold">Warmup</h1>
          <span className="ml-auto text-sm text-muted-foreground">Q {idx + 1} of {questions.length}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Just 3 quick questions to get back in the groove.</p>

        <Card className="p-5 space-y-4">
          <p className="text-base font-medium">{q.prompt}</p>
          <div className="space-y-2">
            {q.choices.map((c, i) => {
              const isPicked = picked === i;
              const isAnswer = i === q.correctIndex;
              const showState = picked !== null;
              return (
                <button
                  key={i}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i);
                    if (i === q.correctIndex) setScore((s) => s + 1);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                    showState && isAnswer
                      ? "border-emerald-500 bg-emerald-500/10"
                      : showState && isPicked
                      ? "border-red-500 bg-red-500/10"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {showState && isAnswer && <Check className="w-4 h-4 text-emerald-600" />}
                    {showState && isPicked && !isAnswer && <X className="w-4 h-4 text-red-600" />}
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="space-y-3 pt-2 border-t">
              <p className={`text-sm ${correct ? "text-emerald-600" : "text-amber-600"}`}>
                {correct ? "Nice!" : "Close — here's why:"} {q.explanation}
              </p>
              <Button
                className="w-full"
                onClick={() => {
                  if (idx + 1 >= questions.length) setDone(true);
                  else { setIdx(idx + 1); setPicked(null); }
                }}
              >
                {idx + 1 >= questions.length ? "Finish" : "Next question"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}