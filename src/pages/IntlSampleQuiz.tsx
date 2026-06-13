import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import { INTL_EXAMS } from "@/data/intlExamsRegistry";
import { getIntlBank } from "@/data/intlSampleQuestions";
import { cacheQuestion } from "@/lib/offlineCache";

export default function IntlSampleQuiz() {
  const { examId = "" } = useParams();
  const navigate = useNavigate();
  const exam = useMemo(() => INTL_EXAMS.find(e => e.id === examId), [examId]);
  const bank = useMemo(() => getIntlBank(examId), [examId]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  if (!exam) return <div className="p-6">Unknown exam.</div>;

  if (bank.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Card className="p-6 text-center">
            <h1 className="text-xl font-bold mb-2">{exam.name}</h1>
            <p className="text-muted-foreground mb-4">Full bank coming soon. Vote to prioritize this exam!</p>
            <Link to="/settings"><Button>Send feedback</Button></Link>
          </Card>
        </div>
      </div>
    );
  }

  const q = bank[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correctIndex) setCorrectCount(c => c + 1);
    // Cache for offline practice
    cacheQuestion({
      id: `${examId}-${q.id}`,
      prompt: q.prompt,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      subject: exam?.name,
    });
  };

  const next = () => {
    if (idx + 1 >= bank.length) { setDone(true); return; }
    setIdx(idx + 1);
    setPicked(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO title={`${exam.name} sample quiz — AlphaOmega`} description={`Try a free starter quiz for ${exam.name}.`} path={`/international/${examId}`} />
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">{exam.name} — starter quiz</h1>
          <span className="text-sm text-muted-foreground">{Math.min(idx + 1, bank.length)} / {bank.length}</span>
        </div>

        {done ? (
          <Card className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-bold mb-1">{correctCount} / {bank.length}</h2>
            <p className="text-muted-foreground mb-4">Nice work! Full adaptive bank coming soon.</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => { setIdx(0); setPicked(null); setCorrectCount(0); setDone(false); }}>Retry</Button>
              <Link to="/international"><Button>More exams</Button></Link>
            </div>
          </Card>
        ) : (
          <Card className="p-5">
            <p className="text-lg mb-4">{q.prompt}</p>
            <div className="space-y-2">
              {q.choices.map((c, i) => {
                const isCorrect = picked !== null && i === q.correctIndex;
                const isWrongPick = picked === i && i !== q.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                      isCorrect ? "border-emerald-500 bg-emerald-500/10" :
                      isWrongPick ? "border-red-500 bg-red-500/10" :
                      "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      {isWrongPick && <X className="w-4 h-4 text-red-600" />}
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                <p className="mt-4 text-sm text-muted-foreground">{q.explanation}</p>
                <Button onClick={next} className="mt-4 w-full">
                  {idx + 1 >= bank.length ? "See results" : "Next"}
                </Button>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}