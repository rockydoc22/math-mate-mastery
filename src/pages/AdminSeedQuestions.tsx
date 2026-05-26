import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Loader2, Sparkles, Database } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

type Row = { exam_family: string; section: string; skill: string; count: number };

const AdminSeedQuestions = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [coverage, setCoverage] = useState<Row[]>([]);

  const [examFamily, setExamFamily] = useState("sat");
  const [section, setSection] = useState("math");
  const [domain, setDomain] = useState("algebra");
  const [skill, setSkill] = useState("");
  const [subskill, setSubskill] = useState("");
  const [testCode, setTestCode] = useState("");
  const [batchSize, setBatchSize] = useState(10);
  const [totalTarget, setTotalTarget] = useState(30);
  const [dMin, setDMin] = useState(3);
  const [dMax, setDMax] = useState(8);

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) { setIsAdmin(false); return; }
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
    })();
  }, [user]);

  const loadCoverage = async () => {
    const { data } = await supabase
      .from("assessment_questions")
      .select("exam_family, section, skill")
      .limit(5000);
    const map = new Map<string, Row>();
    (data ?? []).forEach((r: any) => {
      const k = `${r.exam_family}|${r.section}|${r.skill}`;
      const cur = map.get(k) ?? { exam_family: r.exam_family, section: r.section, skill: r.skill, count: 0 };
      cur.count++; map.set(k, cur);
    });
    setCoverage(Array.from(map.values()).sort((a, b) => a.count - b.count));
  };
  useEffect(() => { if (isAdmin) loadCoverage(); }, [isAdmin]);

  const append = (s: string) => setLog((l) => [...l, s]);

  const run = async () => {
    if (!skill.trim()) { toast.error("Skill is required."); return; }
    if (totalTarget >= 100) {
      const ok = window.confirm(`You're about to generate ${totalTarget} items. Per content policy, confirm bulk generation 100+.`);
      if (!ok) return;
    }
    setRunning(true); setProgress(0); setLog([]);
    const calls = Math.ceil(totalTarget / batchSize);
    let made = 0;
    for (let i = 0; i < calls; i++) {
      const count = Math.min(batchSize, totalTarget - made);
      append(`Batch ${i + 1}/${calls} — requesting ${count}…`);
      try {
        const { data, error } = await supabase.functions.invoke("bulk-generate-assessment-questions", {
          body: {
            spec: {
              exam_family: examFamily, section, domain, skill,
              subskill: subskill || null, test_code: testCode || null,
              count, difficulty_min: dMin, difficulty_max: dMax,
            },
            confirmBulk: totalTarget >= 100,
          },
        });
        if (error) throw error;
        if ((data as any)?.error) throw new Error((data as any).error);
        const inserted = (data as any)?.inserted ?? 0;
        made += inserted;
        append(`  ✓ inserted ${inserted}`);
      } catch (e: any) {
        append(`  ✗ ${e?.message || "failed"}`);
        toast.error(e?.message || "Batch failed");
        break;
      }
      setProgress(Math.round((made / totalTarget) * 100));
      // small delay to avoid rate limit
      await new Promise((r) => setTimeout(r, 800));
    }
    setRunning(false);
    toast.success(`Done — inserted ${made}/${totalTarget}`);
    loadCoverage();
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 max-w-md text-center">
          <p className="mb-4">Admin role required.</p>
          <Link to="/"><Button>Home</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Seed Assessment Questions — Admin" description="Bulk AI generation of original assessment questions for adaptive testing." path="/admin/seed-questions" />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
        <Link to="/admin"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Admin</Button></Link>
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Seed Assessment Questions</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Generates 100% original items via Lovable AI with structured output. Content guardrails enforced server-side. Items insert into <code>assessment_questions</code>.
        </p>

        <Card className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Exam family</Label><Input value={examFamily} onChange={(e) => setExamFamily(e.target.value.toLowerCase())} placeholder="sat, psat, act, pro-gre…" /></div>
            <div><Label>Test code (optional)</Label><Input value={testCode} onChange={(e) => setTestCode(e.target.value)} placeholder="sat-2024-spring" /></div>
            <div><Label>Section</Label><Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="math, reading-writing…" /></div>
            <div><Label>Domain</Label><Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="algebra, geometry, craft-structure…" /></div>
            <div><Label>Skill *</Label><Input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="linear equations" /></div>
            <div><Label>Subskill (optional)</Label><Input value={subskill} onChange={(e) => setSubskill(e.target.value)} /></div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label>Total to generate: <b>{totalTarget}</b></Label>
              <Slider value={[totalTarget]} min={5} max={200} step={5} onValueChange={(v) => setTotalTarget(v[0])} className="mt-2" />
            </div>
            <div>
              <Label>Batch size: <b>{batchSize}</b></Label>
              <Slider value={[batchSize]} min={3} max={25} step={1} onValueChange={(v) => setBatchSize(v[0])} className="mt-2" />
            </div>
            <div>
              <Label>Difficulty: <b>{dMin}–{dMax}</b></Label>
              <div className="flex gap-2 mt-2">
                <Slider value={[dMin]} min={1} max={10} step={1} onValueChange={(v) => setDMin(Math.min(v[0], dMax))} />
                <Slider value={[dMax]} min={1} max={10} step={1} onValueChange={(v) => setDMax(Math.max(v[0], dMin))} />
              </div>
            </div>
          </div>

          {totalTarget >= 100 && (
            <div className="text-xs rounded-md border border-amber-400/40 bg-amber-400/10 p-2">
              Bulk policy: 100+ items requires explicit approval. You'll see a confirm dialog before generation starts.
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={run} disabled={running}>
              {running ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4 mr-1" /> Start generation</>}
            </Button>
            <Button variant="outline" onClick={loadCoverage} disabled={running}>Refresh coverage</Button>
          </div>

          {running && <Progress value={progress} />}
          {log.length > 0 && (
            <pre className="text-xs bg-muted rounded p-3 max-h-60 overflow-auto">{log.join("\n")}</pre>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-3">Current coverage (lowest first)</h2>
          {coverage.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assessment questions yet — bank is empty.</p>
          ) : (
            <div className="space-y-1 max-h-80 overflow-auto">
              {coverage.slice(0, 40).map((r) => (
                <div key={`${r.exam_family}-${r.section}-${r.skill}`} className="flex items-center justify-between text-sm border-b py-1">
                  <span>{r.exam_family.toUpperCase()} · {r.section} · <b>{r.skill}</b></span>
                  <Badge variant={r.count < 10 ? "destructive" : r.count < 25 ? "secondary" : "default"}>{r.count}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminSeedQuestions;