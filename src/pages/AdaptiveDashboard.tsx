import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Cluster = {
  id: string;
  exam_family: string;
  section: string;
  domain: string;
  skill: string;
  attempts_count: number;
  accuracy: number;
  avg_time_ratio: number;
  trap_susceptibility: number;
  mastery_level: number;
  priority_score: number;
  last_attempt_at: string | null;
};

type TeachingSection = {
  id: string;
  exam_family: string;
  section: string;
  skill: string;
  markdown_body: string;
  generated_at: string;
};

const masteryLabel = (n: number) =>
  ["Not started", "Emerging", "Developing", "Proficient", "Advanced", "Mastered"][n] ?? "—";

const masteryTone = (n: number) =>
  n >= 4 ? "bg-emerald-500/15 text-emerald-700" :
  n === 3 ? "bg-blue-500/15 text-blue-700" :
  n === 2 ? "bg-amber-500/15 text-amber-700" :
  "bg-rose-500/15 text-rose-700";

const AdaptiveDashboard = () => {
  const { user } = useAuth();
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [teaching, setTeaching] = useState<TeachingSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [examFamily, setExamFamily] = useState<string>("all");

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const cQ = supabase
      .from("adaptive_weakness_clusters")
      .select("*")
      .eq("user_id", user.id)
      .order("priority_score", { ascending: false })
      .limit(20);
    const tQ = supabase
      .from("adaptive_teaching_sections")
      .select("*")
      .eq("user_id", user.id)
      .order("generated_at", { ascending: false })
      .limit(10);
    const [{ data: c }, { data: t }] = await Promise.all([cQ, tQ]);
    setClusters((c as Cluster[]) ?? []);
    setTeaching((t as TeachingSection[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const runDiagnose = async () => {
    if (!user) return;
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("adaptive-diagnose", {
        body: { user_id: user.id, exam_family: examFamily === "all" ? null : examFamily },
      });
      if (error) throw error;
      toast.success(`Diagnosed ${data?.clusters?.length ?? 0} skill clusters`);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Diagnose failed");
    } finally {
      setRunning(false);
    }
  };

  const families = Array.from(new Set(clusters.map((c) => c.exam_family)));
  const filtered = examFamily === "all" ? clusters : clusters.filter((c) => c.exam_family === examFamily);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="w-7 h-7 text-primary" /> Adaptive Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Your weakest skill clusters ranked by priority</p>
            </div>
          </div>
          <Button onClick={runDiagnose} disabled={running}>
            {running ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Re-diagnose
          </Button>
        </div>

        {families.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setExamFamily("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${examFamily === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >All</button>
            {families.map((f) => (
              <button
                key={f}
                onClick={() => setExamFamily(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${examFamily === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >{f.toUpperCase()}</button>
            ))}
          </div>
        )}

        {loading ? (
          <Card className="p-8 text-center text-muted-foreground">Loading…</Card>
        ) : filtered.length === 0 ? (
          <Card className="p-8 text-center space-y-3">
            <p className="text-muted-foreground">No weakness data yet. Finish a quiz, then click <strong>Re-diagnose</strong>.</p>
            <Link to="/booster"><Button variant="outline">Start a Booster Test</Button></Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((c, i) => {
              const accuracyPct = Math.round((c.accuracy ?? 0) * 100);
              const priorityPct = Math.min(100, Math.round((c.priority_score ?? 0) * 33));
              return (
                <Card key={c.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-primary">#{i + 1}</span>
                        <span>{c.exam_family.toUpperCase()}</span>
                        <span>·</span>
                        <span>{c.section}</span>
                        <span>·</span>
                        <span>{c.domain}</span>
                      </div>
                      <h3 className="font-semibold mt-1 truncate">{c.skill}</h3>
                    </div>
                    <Badge className={masteryTone(c.mastery_level)}>{masteryLabel(c.mastery_level)}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3 text-center">
                    <div>
                      <div className="text-lg font-bold">{accuracyPct}%</div>
                      <div className="text-[10px] uppercase text-muted-foreground">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{Number(c.avg_time_ratio).toFixed(2)}×</div>
                      <div className="text-[10px] uppercase text-muted-foreground">Time vs target</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{c.attempts_count}</div>
                      <div className="text-[10px] uppercase text-muted-foreground">Attempts</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Priority score</span>
                      <span className="font-semibold">{Number(c.priority_score).toFixed(2)}</span>
                    </div>
                    <Progress value={priorityPct} />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {teaching.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Recent micro-lessons</h2>
            {teaching.slice(0, 3).map((t) => (
              <Card key={t.id} className="p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  {t.exam_family.toUpperCase()} · {t.section} · {t.skill}
                </div>
                <pre className="whitespace-pre-wrap text-sm font-sans">{t.markdown_body}</pre>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdaptiveDashboard;