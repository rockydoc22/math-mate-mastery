import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { DeepExplanationsPanel, type AnsweredItem } from "@/components/DeepExplanationsPanel";

type Cluster = {
  exam_family: string; section: string; domain: string; skill: string;
  accuracy: number; attempts_count: number; priority_score: number;
};
type AQ = {
  id: string; stem: string; options: any; correct_key: string;
  skill: string; domain: string; section: string; exam_family: string;
  trap_type: string | null; wrong_answer_explanations: any;
  time_target_seconds: number | null;
};
type Phase = "loading" | "diagnosis" | "quiz" | "rediagnosing" | "summary";

const TOP_CLUSTERS = 3;
const PER_CLUSTER = 4;

const normalizeOptions = (raw: any): { letter: string; text: string }[] => {
  if (Array.isArray(raw)) {
    return raw.map((o: any, i: number) =>
      typeof o === "string"
        ? { letter: String.fromCharCode(65 + i), text: o }
        : { letter: o.letter ?? String.fromCharCode(65 + i), text: o.text ?? String(o) }
    );
  }
  if (raw && typeof raw === "object") {
    return Object.entries(raw).map(([k, v]) => ({ letter: k, text: String(v) }));
  }
  return [];
};

const WeaknessRetest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("loading");
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [items, setItems] = useState<AQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questionStartedAt, setQuestionStartedAt] = useState<number>(0);
  const [answers, setAnswers] = useState<AnsweredItem[]>([]);
  const [updatedClusters, setUpdatedClusters] = useState<Cluster[] | null>(null);

  const loadClusters = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("adaptive_weakness_clusters")
      .select("exam_family, section, domain, skill, accuracy, attempts_count, priority_score")
      .eq("user_id", user.id)
      .gte("attempts_count", 3)
      .order("priority_score", { ascending: false })
      .limit(TOP_CLUSTERS);
    return (data as Cluster[]) ?? [];
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      const c = await loadClusters();
      setClusters(c ?? []);
      setPhase("diagnosis");
    })();
    // eslint-disable-next-line
  }, [user]);

  const start = async () => {
    if (!clusters.length) return;
    setPhase("loading");
    const all: AQ[] = [];
    for (const c of clusters) {
      const { data } = await supabase
        .from("assessment_questions")
        .select("id, stem, options, correct_key, skill, domain, section, exam_family, trap_type, wrong_answer_explanations, time_target_seconds")
        .eq("exam_family", c.exam_family)
        .eq("skill", c.skill)
        .limit(PER_CLUSTER * 3);
      const picked = ((data as AQ[]) ?? []).sort(() => Math.random() - 0.5).slice(0, PER_CLUSTER);
      all.push(...picked);
    }
    if (all.length === 0) {
      toast.error("No assessment questions found for your weak skills yet.");
      setPhase("diagnosis");
      return;
    }
    setItems(all.sort(() => Math.random() - 0.5));
    setIdx(0);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setUpdatedClusters(null);
    setQuestionStartedAt(Date.now());
    setPhase("quiz");
  };

  const current = items[idx];
  const currentOpts = useMemo(() => (current ? normalizeOptions(current.options) : []), [current]);
  const isCorrect = current && selected != null && selected === current.correct_key;

  const submit = async () => {
    if (!current || selected == null || !user) return;
    const elapsed = Math.max(1, Math.round((Date.now() - questionStartedAt) / 1000));
    setShowResult(true);
    try {
      await supabase.from("student_attempts").insert({
        user_id: user.id,
        question_id: current.id,
        chosen_key: selected,
        is_correct: !!isCorrect,
        time_seconds: elapsed,
      });
    } catch {}
    setAnswers((a) => [
      ...a,
      {
        id: current.id,
        stem: current.stem,
        options: currentOpts,
        correctKey: current.correct_key,
        chosenKey: selected,
        isCorrect: !!isCorrect,
        skill: current.skill,
        domain: current.domain,
        trapType: current.trap_type,
        wrongExplanations: current.wrong_answer_explanations || null,
      },
    ]);
  };

  const next = async () => {
    if (idx + 1 >= items.length) {
      setPhase("rediagnosing");
      try {
        await supabase.functions.invoke("adaptive-diagnose", { body: { scope: {} } });
      } catch {}
      const c = await loadClusters();
      setUpdatedClusters(c ?? []);
      setPhase("summary");
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
    setShowResult(false);
    setQuestionStartedAt(Date.now());
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 max-w-md text-center">
          <p className="mb-4">Sign in to start a weakness retest.</p>
          <Link to="/auth"><Button>Sign in</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Weakness Retest — Adaptive Diagnosis" description="Adaptive retest built from your top weakness clusters with elaborate AI breakdowns and re-diagnosis." path="/weakness-retest" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        {phase === "loading" && (
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
            <p className="mt-3 text-muted-foreground">Building your retest…</p>
          </Card>
        )}

        {phase === "diagnosis" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Weakness Retest</h1>
            </div>
            {clusters.length === 0 ? (
              <Card className="p-6">
                <p className="text-muted-foreground">
                  We don't have enough adaptive data yet. Run a few quizzes, then come back.
                </p>
                <Link to="/quiz"><Button className="mt-4">Take a quick quiz</Button></Link>
              </Card>
            ) : (
              <>
                <Card className="p-5">
                  <h2 className="font-semibold mb-3">Top weakness clusters</h2>
                  <div className="space-y-3">
                    {clusters.map((c) => (
                      <div key={`${c.exam_family}-${c.skill}`} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{c.skill}</div>
                            <div className="text-xs text-muted-foreground">
                              {c.exam_family.toUpperCase()} · {c.section} · {c.domain}
                            </div>
                          </div>
                          <Badge variant="destructive">Priority {c.priority_score.toFixed(2)}</Badge>
                        </div>
                        <Progress className="mt-2" value={Math.round((c.accuracy ?? 0) * 100)} />
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.round((c.accuracy ?? 0) * 100)}% accuracy · {c.attempts_count} attempts
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-primary/5 border-primary/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-1" />
                    <div className="text-sm text-muted-foreground">
                      We'll pull up to {TOP_CLUSTERS * PER_CLUSTER} questions from these {clusters.length} skill{clusters.length > 1 ? "s" : ""}, log your answers, and re-run diagnosis so your weakness map updates instantly.
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={start}>Start retest</Button>
                    <Link to="/study-guide"><Button variant="outline">Open study guide</Button></Link>
                    <Link to="/adaptive"><Button variant="ghost">Adaptive dashboard</Button></Link>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {phase === "quiz" && current && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Question {idx + 1} of {items.length}</span>
              <Badge variant="secondary">{current.skill}</Badge>
            </div>
            <Progress value={((idx + 1) / items.length) * 100} />
            <Card className="p-5">
              <p className="whitespace-pre-wrap">{current.stem}</p>
              <div className="mt-4 space-y-2">
                {currentOpts.map((o) => {
                  const isPicked = selected === o.letter;
                  const isAns = o.letter === current.correct_key;
                  const tone = !showResult
                    ? isPicked ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                    : isAns ? "border-emerald-500 bg-emerald-500/10"
                    : isPicked ? "border-rose-500 bg-rose-500/10"
                    : "border-border opacity-60";
                  return (
                    <button
                      key={o.letter}
                      disabled={showResult}
                      onClick={() => setSelected(o.letter)}
                      className={`w-full text-left rounded-lg border p-3 transition ${tone}`}
                    >
                      <span className="font-semibold mr-2">{o.letter}.</span>{o.text}
                    </button>
                  );
                })}
              </div>
            </Card>
            {!showResult ? (
              <Button disabled={!selected} onClick={submit} className="w-full">Submit</Button>
            ) : (
              <Button onClick={next} className="w-full">
                {idx + 1 >= items.length ? "Finish & re-diagnose" : "Next question"}
              </Button>
            )}
          </div>
        )}

        {phase === "rediagnosing" && (
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
            <p className="mt-3 text-muted-foreground">Re-running adaptive diagnosis…</p>
          </Card>
        )}

        {phase === "summary" && (
          <div className="space-y-4">
            <Card className="p-6 text-center">
              <h2 className="text-2xl font-bold">Retest complete</h2>
              <p className="mt-2 text-muted-foreground">
                {correctCount} of {items.length} correct ({Math.round((correctCount / items.length) * 100)}%)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button onClick={start}><RefreshCw className="w-4 h-4 mr-1" /> Run another retest</Button>
                <Link to="/adaptive"><Button variant="outline">Open adaptive dashboard</Button></Link>
                <Link to="/study-guide"><Button variant="ghost">Updated study guide</Button></Link>
              </div>
            </Card>

            {updatedClusters && (
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Updated weakness map</h3>
                <div className="space-y-2">
                  {updatedClusters.map((c) => (
                    <div key={`u-${c.skill}`} className="flex items-center justify-between text-sm">
                      <span>{c.skill}</span>
                      <span className="text-muted-foreground">
                        {Math.round((c.accuracy ?? 0) * 100)}% · priority {c.priority_score.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <DeepExplanationsPanel items={answers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaknessRetest;