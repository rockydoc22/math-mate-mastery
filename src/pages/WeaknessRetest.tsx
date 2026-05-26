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
import ReactMarkdown from "react-markdown";
import { Printer, Share2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Cluster = {
  exam_family: string; section: string; domain: string; skill: string;
  accuracy: number; attempts_count: number; priority_score: number;
};
type AQ = {
  id: string; stem: string; options: any; correct_key: string;
  skill: string; domain: string; section: string; exam_family: string;
  trap_type: string | null; wrong_answer_explanations: any;
  time_target_seconds: number | null; difficulty: number | null;
};
type Phase = "loading" | "diagnosis" | "quiz" | "rediagnosing" | "summary";

const TOP_CLUSTERS = 3;

type Mix = { easy: number; med: number; hard: number };

// Smart picker: balance difficulty buckets (easy 1-3, med 4-6, hard 7-10) and sections,
// honoring a target ratio.
function smartPick(pool: AQ[], count: number, mix: Mix): AQ[] {
  if (pool.length <= count) return [...pool].sort(() => Math.random() - 0.5);
  const bucket = (d: number | null) => (d == null ? "med" : d <= 3 ? "easy" : d <= 6 ? "med" : "hard");
  const buckets: Record<string, AQ[]> = { easy: [], med: [], hard: [] };
  pool.forEach((q) => buckets[bucket(q.difficulty)].push(q));
  Object.values(buckets).forEach((arr) => arr.sort(() => Math.random() - 0.5));
  const order: (keyof Mix)[] = ["easy", "med", "hard"];
  const totalMix = Math.max(1, mix.easy + mix.med + mix.hard);
  const targets: Record<string, number> = {
    easy: Math.round((mix.easy / totalMix) * count),
    med: Math.round((mix.med / totalMix) * count),
    hard: Math.round((mix.hard / totalMix) * count),
  };
  // fix rounding drift
  let drift = count - (targets.easy + targets.med + targets.hard);
  while (drift !== 0) {
    const k = order[Math.abs(drift) % 3];
    targets[k] += drift > 0 ? 1 : -1;
    drift += drift > 0 ? -1 : 1;
  }
  const picked: AQ[] = [];
  const seenSections = new Set<string>();
  // Take per-bucket targets, preferring distinct sections
  for (const b of order) {
    let need = targets[b];
    while (need > 0 && buckets[b].length) {
      const idx = buckets[b].findIndex((x) => !seenSections.has(x.section));
      const q = idx >= 0 ? buckets[b].splice(idx, 1)[0] : buckets[b].shift()!;
      picked.push(q);
      seenSections.add(q.section);
      need--;
    }
  }
  // Backfill any remaining slots from whichever buckets still have items
  let i = 0;
  while (picked.length < count) {
    const b = order[i % order.length];
    const q = buckets[b].shift() || buckets[order[(i + 1) % 3]].shift() || buckets[order[(i + 2) % 3]].shift();
    if (!q) break;
    picked.push(q);
    i++;
  }
  return picked.sort(() => Math.random() - 0.5);
}

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
  const [recommended, setRecommended] = useState<any[]>([]);
  const [shareUrl, setShareUrl] = useState<string>("");
  // Smart picker settings (tunable before starting)
  const [perCluster, setPerCluster] = useState<number>(4);
  const [mixEasy, setMixEasy] = useState<number>(1);
  const [mixMed, setMixMed] = useState<number>(2);
  const [mixHard, setMixHard] = useState<number>(1);

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
        .select("id, stem, options, correct_key, skill, domain, section, exam_family, trap_type, wrong_answer_explanations, time_target_seconds, difficulty")
        .eq("exam_family", c.exam_family)
        .eq("skill", c.skill)
        .limit(perCluster * 6);
      const picked = smartPick((data as AQ[]) ?? [], perCluster, { easy: mixEasy, med: mixMed, hard: mixHard });
      all.push(...picked);
    }
    if (all.length === 0) {
      toast.error("No assessment questions found for your weak skills yet.");
      setPhase("diagnosis");
      return;
    }
    // Interleave so consecutive items aren't from the same section/skill
    const interleaved: AQ[] = [];
    const bySkill: Record<string, AQ[]> = {};
    all.forEach((q) => { (bySkill[q.skill] ||= []).push(q); });
    const skills = Object.keys(bySkill);
    while (interleaved.length < all.length) {
      for (const s of skills) {
        const q = bySkill[s].shift();
        if (q) interleaved.push(q);
      }
    }
    setItems(interleaved);
    setIdx(0);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setUpdatedClusters(null);
    setRecommended([]);
    setShareUrl("");
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
      // Load recommended practice from teaching sections for top remaining weak skills
      if (user && c && c.length) {
        const topSkills = c.slice(0, 3).map((x) => x.skill);
        const { data: recs } = await supabase
          .from("adaptive_teaching_sections")
          .select("id, exam_family, section, skill, markdown_body, generated_at")
          .eq("user_id", user.id)
          .in("skill", topSkills)
          .order("generated_at", { ascending: false })
          .limit(3);
        setRecommended(recs ?? []);
      }
      setShareUrl(`${window.location.origin}/study-guide`);
      setPhase("summary");
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
    setShowResult(false);
    setQuestionStartedAt(Date.now());
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Study guide link copied to clipboard.");
    } catch {
      toast.error("Could not copy link.");
    }
  };

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
                <Card className="p-5">
                  <h3 className="font-semibold mb-3">Retest settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Questions per weakness cluster: <b>{perCluster}</b></Label>
                      <Slider value={[perCluster]} min={2} max={10} step={1} onValueChange={(v) => setPerCluster(v[0])} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Easy weight: {mixEasy}</Label>
                        <Slider value={[mixEasy]} min={0} max={5} step={1} onValueChange={(v) => setMixEasy(v[0])} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Medium weight: {mixMed}</Label>
                        <Slider value={[mixMed]} min={0} max={5} step={1} onValueChange={(v) => setMixMed(v[0])} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Hard weight: {mixHard}</Label>
                        <Slider value={[mixHard]} min={0} max={5} step={1} onValueChange={(v) => setMixHard(v[0])} className="mt-2" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Weights set the easy/medium/hard ratio within each cluster. Set one to 0 to skip that band.
                    </p>
                  </div>
                </Card>
                <Card className="p-5 bg-primary/5 border-primary/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-1" />
                    <div className="text-sm text-muted-foreground">
                      We'll pull up to {clusters.length * perCluster} questions from these {clusters.length} skill{clusters.length > 1 ? "s" : ""}, log your answers, and re-run diagnosis so your weakness map updates instantly.
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
            <Card className="p-6 text-center print:shadow-none print:border-0">
              <h2 className="text-2xl font-bold">Retest complete</h2>
              <p className="mt-2 text-muted-foreground">
                {correctCount} of {items.length} correct ({Math.round((correctCount / items.length) * 100)}%)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 print:hidden">
                <Button onClick={start}><RefreshCw className="w-4 h-4 mr-1" /> Run another retest</Button>
                <Link to="/adaptive"><Button variant="outline">Open adaptive dashboard</Button></Link>
                <Link to="/study-guide"><Button variant="ghost">Updated study guide</Button></Link>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2 print:hidden">
                <Button size="sm" variant="outline" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-1" /> Export PDF
                </Button>
                <Button size="sm" variant="outline" onClick={copyShare}>
                  <Share2 className="w-4 h-4 mr-1" /> Copy share link
                </Button>
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

            {recommended.length > 0 && (
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Recommended practice</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Pulled from your strongest remaining weak skills — start with these prompts next.
                </p>
                <div className="space-y-4">
                  {recommended.map((r) => (
                    <div key={r.id} className="border rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-2">
                        {String(r.exam_family).toUpperCase()} · {r.section} · <b>{r.skill}</b>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{r.markdown_body}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 print:hidden">
                  <Link to="/study-guide"><Button size="sm">Open full study guide</Button></Link>
                  <Button size="sm" variant="outline" onClick={start}>Practice these now</Button>
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