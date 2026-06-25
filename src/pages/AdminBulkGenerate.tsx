import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

type Spec = {
  exam_family: string;
  test_code?: string | null;
  section: string;
  domain: string;
  skill: string;
  subskill?: string | null;
  difficulty_min?: number;
  difficulty_max?: number;
};

type Job = { label: string; spec: Spec; target: number };

type Preset = { key: string; title: string; description: string; jobs: Job[] };

// Curated jobs — each becomes one bulk-generate-runner invocation.
const PRESETS: Preset[] = [
  {
    key: "psat",
    title: "PSAT / NMSQT",
    description: "300 items — Math + Reading/Writing split across the core PSAT domains.",
    jobs: [
      { label: "Math · Algebra (linear eq + systems)", target: 40, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "algebra", skill: "linear equations and systems", difficulty_min: 2, difficulty_max: 7 } },
      { label: "Math · Advanced math (quadratics, functions)", target: 40, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "advanced-math", skill: "quadratics and nonlinear functions", difficulty_min: 3, difficulty_max: 8 } },
      { label: "Math · Problem solving & data", target: 40, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "problem-solving-data", skill: "ratios, rates, percents, units", difficulty_min: 2, difficulty_max: 7 } },
      { label: "Math · Geometry & trig", target: 30, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "geometry-trig", skill: "angles, triangles, circles", difficulty_min: 3, difficulty_max: 8 } },
      { label: "R/W · Information & ideas", target: 40, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "information-ideas", skill: "central idea and supporting evidence", difficulty_min: 2, difficulty_max: 7 } },
      { label: "R/W · Craft & structure", target: 40, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "craft-structure", skill: "words in context and text structure", difficulty_min: 3, difficulty_max: 8 } },
      { label: "R/W · Standard English conventions", target: 35, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "standard-english", skill: "boundaries, form, structure, sense", difficulty_min: 2, difficulty_max: 7 } },
      { label: "R/W · Expression of ideas", target: 35, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "expression-ideas", skill: "rhetorical synthesis and transitions", difficulty_min: 3, difficulty_max: 8 } },
    ],
  },
  {
    key: "act-science",
    title: "ACT Science",
    description: "150 passage-style items across the three ACT Science formats.",
    jobs: [
      { label: "Data Representation", target: 60, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "data-representation", skill: "reading tables, graphs, and figures", difficulty_min: 3, difficulty_max: 8 } },
      { label: "Research Summaries", target: 60, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "research-summaries", skill: "experimental design and results", difficulty_min: 4, difficulty_max: 9 } },
      { label: "Conflicting Viewpoints", target: 30, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "conflicting-viewpoints", skill: "comparing scientific hypotheses", difficulty_min: 5, difficulty_max: 9 } },
    ],
  },
  {
    key: "ap-frq",
    title: "AP Free-Response (top 5)",
    description: "100 FRQ-style items across the highest-traffic AP subjects.",
    jobs: [
      { label: "AP Calculus AB · FRQ", target: 20, spec: { exam_family: "ap", test_code: "ap-calc-ab", section: "frq", domain: "calculus", skill: "derivatives, integrals, applications", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Biology · FRQ", target: 20, spec: { exam_family: "ap", test_code: "ap-bio", section: "frq", domain: "biology", skill: "interpret data and design experiments", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP US History · FRQ (SAQ/LEQ)", target: 20, spec: { exam_family: "ap", test_code: "ap-apush", section: "frq", domain: "history", skill: "short-answer and long-essay prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP English Lang · FRQ (rhetoric/argument)", target: 20, spec: { exam_family: "ap", test_code: "ap-eng-lang", section: "frq", domain: "rhetoric", skill: "rhetorical analysis and argument prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Psychology · FRQ", target: 20, spec: { exam_family: "ap", test_code: "ap-psych", section: "frq", domain: "psychology", skill: "apply concepts to scenarios", difficulty_min: 3, difficulty_max: 8 } },
    ],
  },
  {
    key: "state-tests",
    title: "State Tests (PSSA · Regents · STAAR)",
    description: "600 items — 200 per state test, math + ELA mix.",
    jobs: [
      { label: "PSSA · Math (grade 8)", target: 100, spec: { exam_family: "state", test_code: "pssa-g8", section: "math", domain: "grade-8-math", skill: "expressions, equations, functions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSSA · ELA (grade 8)", target: 100, spec: { exam_family: "state", test_code: "pssa-g8", section: "ela", domain: "grade-8-ela", skill: "reading comprehension and writing conventions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "NY Regents · Algebra I", target: 100, spec: { exam_family: "state", test_code: "regents-alg1", section: "math", domain: "algebra-1", skill: "linear, quadratic, exponential models", difficulty_min: 3, difficulty_max: 8 } },
      { label: "NY Regents · ELA", target: 100, spec: { exam_family: "state", test_code: "regents-ela", section: "ela", domain: "ela", skill: "passage analysis and source-based argument", difficulty_min: 3, difficulty_max: 8 } },
      { label: "STAAR · Math (grade 8)", target: 100, spec: { exam_family: "state", test_code: "staar-g8-math", section: "math", domain: "grade-8-math", skill: "proportional reasoning and functions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "STAAR · Reading (grade 8)", target: 100, spec: { exam_family: "state", test_code: "staar-g8-read", section: "ela", domain: "grade-8-reading", skill: "literary and informational comprehension", difficulty_min: 2, difficulty_max: 7 } },
    ],
  },
];

type JobStatus = { state: "pending" | "running" | "done" | "error"; inserted: number; target: number; message?: string };

const AdminBulkGenerate = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("psat");
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>({});
  const [runningKey, setRunningKey] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!user) return setIsAdmin(false);
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
    })();
  }, [user]);

  const runPreset = async (preset: Preset) => {
    const total = preset.jobs.reduce((a, j) => a + j.target, 0);
    const ok = window.confirm(`Generate ${total} items across ${preset.jobs.length} jobs for "${preset.title}"?\n\nThis will consume AI credits and run sequentially.`);
    if (!ok) return;
    setRunningKey(preset.key);
    // Seed pending
    setStatuses((s) => {
      const next = { ...s };
      preset.jobs.forEach((j) => { next[`${preset.key}::${j.label}`] = { state: "pending", inserted: 0, target: j.target }; });
      return next;
    });

    for (const job of preset.jobs) {
      const key = `${preset.key}::${job.label}`;
      setStatuses((s) => ({ ...s, [key]: { ...s[key], state: "running" } }));
      try {
        const { data, error } = await supabase.functions.invoke("bulk-generate-runner", {
          body: { spec: job.spec, target_count: job.target, batch_size: 25, delay_ms: 600, confirmBulk: true },
        });
        if (error) throw error;
        if ((data as any)?.error) throw new Error((data as any).error);
        const inserted = Number((data as any)?.inserted_total) || 0;
        setStatuses((s) => ({ ...s, [key]: { state: inserted >= job.target ? "done" : "error", inserted, target: job.target, message: inserted < job.target ? `Inserted ${inserted}/${job.target}` : undefined } }));
      } catch (e: any) {
        setStatuses((s) => ({ ...s, [key]: { state: "error", inserted: 0, target: job.target, message: e?.message || "failed" } }));
        toast.error(`${job.label}: ${e?.message || "failed"}`);
      }
    }
    setRunningKey(null);
    toast.success(`${preset.title}: queue finished`);
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
      <SEO title="Bulk Generate — Admin" description="Run curated bulk-generate jobs for PSAT, ACT, AP, and state tests." path="/admin/bulk-generate" />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        <Link to="/admin"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Admin</Button></Link>
        <div className="flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Bulk Generate — Curated Jobs</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Each preset queues a sequence of AI generation jobs through <code>bulk-generate-runner</code>. Items insert into <code>assessment_questions</code>.
          Generation runs in your browser session — keep this tab open until finished.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto">
            {PRESETS.map((p) => <TabsTrigger key={p.key} value={p.key}>{p.title}</TabsTrigger>)}
          </TabsList>

          {PRESETS.map((preset) => {
            const total = preset.jobs.reduce((a, j) => a + j.target, 0);
            const done = preset.jobs.reduce((a, j) => a + (statuses[`${preset.key}::${j.label}`]?.inserted ?? 0), 0);
            const isRunning = runningKey === preset.key;
            return (
              <TabsContent key={preset.key} value={preset.key} className="space-y-4">
                <Card className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-lg">{preset.title}</h2>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Total target: <b>{total}</b> items across {preset.jobs.length} jobs</p>
                    </div>
                    <Button onClick={() => runPreset(preset)} disabled={!!runningKey}>
                      {isRunning ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Running…</> : <><Rocket className="w-4 h-4 mr-1" /> Start {preset.title}</>}
                    </Button>
                  </div>
                  {isRunning && <Progress value={Math.round((done / total) * 100)} />}
                  <div className="space-y-2">
                    {preset.jobs.map((job) => {
                      const st = statuses[`${preset.key}::${job.label}`];
                      const variant: any = st?.state === "done" ? "default" : st?.state === "error" ? "destructive" : st?.state === "running" ? "secondary" : "outline";
                      return (
                        <div key={job.label} className="flex items-center justify-between border rounded-md px-3 py-2 text-sm">
                          <div className="min-w-0">
                            <div className="font-medium truncate">{job.label}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {job.spec.exam_family} · {job.spec.section} · {job.spec.skill}
                            </div>
                            {st?.message && <div className="text-xs text-destructive mt-1">{st.message}</div>}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {st?.state === "running" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                            <Badge variant={variant}>
                              {st ? `${st.inserted}/${st.target}` : `target ${job.target}`}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBulkGenerate;