import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Mail, Sparkles, Loader2, RotateCcw } from "lucide-react";
import { SEO } from "@/components/SEO";
import { MathText } from "@/components/MathText";
import { AOPS_QUESTIONS, AOPS_CHAPTERS, type AopsAnswer } from "@/data/aopsPrealgebra";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Phase = "intro" | "quiz" | "results";

interface FollowUp {
  chapter: string;
  prompt: string;
  A: string; B: string; C: string; D: string;
  answer: AopsAnswer;
  explanation: string;
}

const WEAK_THRESHOLD = 0.7; // <70% = weak chapter

export default function AopsPrealgebraQuiz() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [studentName, setStudentName] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AopsAnswer>>({});
  const [reveal, setReveal] = useState(false);
  const [sending, setSending] = useState(false);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [emailSent, setEmailSent] = useState(false);

  const q = AOPS_QUESTIONS[index];
  const selected = answers[q.num];
  const progress = ((index + 1) / AOPS_QUESTIONS.length) * 100;

  const stats = useMemo(() => {
    const byCh = AOPS_CHAPTERS.map((c) => {
      const qs = AOPS_QUESTIONS.filter((x) => x.chapterId === c.id);
      const correct = qs.filter((x) => answers[x.num] === x.answer).length;
      const missed = qs
        .filter((x) => answers[x.num] && answers[x.num] !== x.answer)
        .map((x) => ({
          num: x.num,
          prompt: x.prompt,
          chosen: `${answers[x.num]}) ${x.options[answers[x.num]!]}`,
          correct: `${x.answer}) ${x.options[x.answer]}`,
          explanation: x.explanation,
        }));
      return { chapter: c.name, chapterId: c.id, total: qs.length, correct, missed };
    });
    const score = byCh.reduce((s, c) => s + c.correct, 0);
    const total = AOPS_QUESTIONS.length;
    const weak = byCh.filter((c) => c.correct / c.total < WEAK_THRESHOLD).map((c) => c.chapter);
    return { byCh, score, total, weak };
  }, [answers]);

  const select = (a: AopsAnswer) => {
    if (reveal) return;
    setAnswers((prev) => ({ ...prev, [q.num]: a }));
  };

  const submitOne = () => {
    if (!selected) return;
    setReveal(true);
  };

  const next = () => {
    setReveal(false);
    if (index < AOPS_QUESTIONS.length - 1) setIndex(index + 1);
    else setPhase("results");
  };

  const restart = () => {
    setPhase("intro");
    setIndex(0);
    setAnswers({});
    setReveal(false);
    setFollowUps([]);
    setEmailSent(false);
  };

  const sendReport = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("aops-weakness-report", {
        body: {
          studentName: studentName || undefined,
          score: stats.score,
          total: stats.total,
          weakChapters: stats.weak,
          chapterStats: stats.byCh,
          generateFollowUps: true,
        },
      });
      if (error) throw error;
      const fu = (data?.followUps ?? []) as FollowUp[];
      setFollowUps(fu);
      setEmailSent(true);
      toast.success(`Report emailed${fu.length ? ` with ${fu.length} AI follow-ups` : ""}.`);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message ?? "Could not send report");
    } finally {
      setSending(false);
    }
  };

  // ───────── Intro ─────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <SEO title="AoPS Pre-Algebra Mastery Test — Interactive" description="Take the 90-question AoPS Pre-Algebra mastery test interactively with instant feedback and an AI-powered weakness report." path="/aops-prealgebra" />
        <div className="max-w-2xl mx-auto space-y-4 pt-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Card className="p-6 space-y-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">📐 AoPS Pre-Algebra Mastery</h1>
            <p className="text-sm text-muted-foreground">
              90 multiple-choice questions across 9 chapters. Instant feedback per question, plus an AI-powered weakness report emailed to the teacher when you finish.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-primary/10 rounded-lg"><div className="text-2xl font-bold">90</div><div className="text-xs text-muted-foreground">Questions</div></div>
              <div className="p-3 bg-secondary/10 rounded-lg"><div className="text-2xl font-bold">9</div><div className="text-xs text-muted-foreground">Chapters</div></div>
              <div className="p-3 bg-accent/10 rounded-lg"><div className="text-2xl font-bold">~60</div><div className="text-xs text-muted-foreground">Minutes</div></div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Student name (optional)</label>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <Button size="lg" className="w-full" onClick={() => setPhase("quiz")}>
              Start the test <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-2">Chapters covered</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              {AOPS_CHAPTERS.map((c) => <li key={c.id}>• {c.name}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  // ───────── Quiz ─────────
  if (phase === "quiz") {
    const isCorrect = reveal && selected === q.answer;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPhase("intro")} className="gap-1">
              <ArrowLeft className="w-4 h-4" /> Exit
            </Button>
            <div className="flex-1 text-xs text-right text-muted-foreground">
              Question {index + 1} / {AOPS_QUESTIONS.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />

          <Card className="p-5 space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">{q.chapter}</div>
            <div className="text-base leading-relaxed font-medium">
              <MathText text={q.prompt} />
            </div>

            <div className="grid gap-2">
              {(["A", "B", "C", "D"] as AopsAnswer[]).map((letter) => {
                const isSel = selected === letter;
                const isAns = letter === q.answer;
                const showCorrect = reveal && isAns;
                const showWrong = reveal && isSel && !isAns;
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={reveal}
                    onClick={() => select(letter)}
                    className={`text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                      showCorrect ? "border-emerald-500 bg-emerald-500/10"
                        : showWrong ? "border-red-500 bg-red-500/10"
                        : isSel ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="font-bold text-primary shrink-0">{letter})</span>
                    <span className="flex-1 text-sm"><MathText text={q.options[letter]} /></span>
                    {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {showWrong && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {reveal && (
              <div className={`p-3 rounded-lg text-sm ${isCorrect ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200" : "bg-amber-500/10 text-amber-900 dark:text-amber-200"}`}>
                <div className="font-semibold mb-1">{isCorrect ? "✓ Correct!" : `Correct answer: ${q.answer}`}</div>
                <MathText text={q.explanation} />
              </div>
            )}

            <div className="flex gap-2">
              {!reveal ? (
                <Button onClick={submitOne} disabled={!selected} className="w-full">Submit answer</Button>
              ) : (
                <Button onClick={next} className="w-full">
                  {index < AOPS_QUESTIONS.length - 1 ? <>Next question <ArrowRight className="ml-2 w-4 h-4" /></> : "See results"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ───────── Results ─────────
  const pct = Math.round((stats.score / stats.total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <SEO title="AoPS Pre-Algebra — Results" description="Mastery results and weakness analysis." path="/aops-prealgebra" />
      <div className="max-w-2xl mx-auto space-y-4 pt-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/tests")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to tests
        </Button>

        <Card className="p-6 text-center space-y-2">
          <div className="text-5xl font-bold text-primary">{pct}%</div>
          <div className="text-sm text-muted-foreground">{stats.score} of {stats.total} correct</div>
          {stats.weak.length === 0 ? (
            <div className="text-emerald-600 font-semibold pt-2">🎉 Solid mastery across all chapters!</div>
          ) : (
            <div className="text-sm pt-2">
              <span className="font-semibold text-amber-600">Weak chapters: </span>
              <span>{stats.weak.join(", ")}</span>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Chapter breakdown</h3>
          <div className="space-y-2">
            {stats.byCh.map((c) => {
              const p = Math.round((c.correct / c.total) * 100);
              return (
                <div key={c.chapterId} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{c.chapter}</span>
                    <span className={p >= 80 ? "text-emerald-600 font-semibold" : p >= 60 ? "text-amber-600 font-semibold" : "text-red-600 font-semibold"}>
                      {c.correct}/{c.total} · {p}%
                    </span>
                  </div>
                  <Progress value={p} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> AI weakness report</h3>
          <p className="text-xs text-muted-foreground">
            Email a chapter-by-chapter breakdown with missed-question explanations and 5 AI-generated follow-up questions per weak chapter to the teacher.
          </p>
          <Button onClick={sendReport} disabled={sending || emailSent} className="w-full">
            {sending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating &amp; sending…</>
              : emailSent ? <>✓ Report sent</>
              : <><Mail className="w-4 h-4 mr-2" /> Email report &amp; generate follow-ups</>}
          </Button>
        </Card>

        {followUps.length > 0 && (
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Follow-up practice ({followUps.length})</h3>
            <p className="text-xs text-muted-foreground">Fresh AI-generated questions targeting your weak chapters.</p>
            <div className="space-y-3">
              {followUps.map((f, i) => (
                <div key={i} className="border rounded-lg p-3 bg-card">
                  <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">{f.chapter}</div>
                  <div className="font-medium text-sm mt-1"><MathText text={f.prompt} /></div>
                  <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                    {(["A","B","C","D"] as const).map(l => (
                      <div key={l}><strong>{l})</strong> <MathText text={f[l]} /></div>
                    ))}
                  </div>
                  <div className="text-xs mt-2 text-emerald-700 dark:text-emerald-400">
                    <strong>Answer: {f.answer}</strong> — <MathText text={f.explanation} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Button variant="outline" onClick={restart} className="w-full gap-2"><RotateCcw className="w-4 h-4" /> Retake the test</Button>
      </div>
    </div>
  );
}