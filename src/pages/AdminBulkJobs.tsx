import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Loader2, Play, RefreshCw, Clock } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

type Job = {
  id: string;
  preset_key: string;
  priority: number;
  label: string;
  target: number;
  inserted: number;
  status: "queued" | "running" | "completed" | "failed" | "paused";
  failures: number;
  last_error: string | null;
  batches_run: number;
  total_runtime_ms: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

const PRESET_TITLES: Record<string, string> = {
  psat: "PSAT / NMSQT",
  "act-science": "ACT Science",
  "ap-frq": "AP Free-Response",
  "state-tests": "State Tests",
};

const PRESET_ORDER = ["psat", "act-science", "ap-frq", "state-tests"];

function formatDuration(ms: number) {
  if (!ms || ms <= 0) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m < 60) return `${m}m ${rem}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

// Rolling-window throughput per job. We sample (timestamp, inserted) on each
// poll and keep the last WINDOW_MS of samples to estimate items/sec recently.
const WINDOW_MS = 15 * 60 * 1000; // 15 min of recent activity
type Sample = { t: number; inserted: number };

function rateRange(samples: Sample[]): { mid: number; lo: number; hi: number; n: number } {
  if (!samples || samples.length < 2) return { mid: 0, lo: 0, hi: 0, n: samples?.length ?? 0 };
  // Per-interval rates (items / sec) between consecutive samples that show progress.
  const rates: number[] = [];
  for (let i = 1; i < samples.length; i++) {
    const dt = (samples[i].t - samples[i - 1].t) / 1000;
    const di = samples[i].inserted - samples[i - 1].inserted;
    if (dt > 0 && di >= 0) rates.push(di / dt);
  }
  if (rates.length === 0) return { mid: 0, lo: 0, hi: 0, n: samples.length };
  const sorted = [...rates].sort((a, b) => a - b);
  const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))))];
  // Overall recent rate uses first/last sample so idle gaps count as slow.
  const first = samples[0];
  const last = samples[samples.length - 1];
  const dtAll = (last.t - first.t) / 1000;
  const diAll = last.inserted - first.inserted;
  const mid = dtAll > 0 ? Math.max(0, diAll / dtAll) : 0;
  return { mid, lo: q(0.25), hi: q(0.75), n: rates.length };
}

function statusVariant(s: Job["status"]) {
  switch (s) {
    case "completed": return "default" as const;
    case "running": return "secondary" as const;
    case "failed": return "destructive" as const;
    default: return "outline" as const;
  }
}

export default function AdminBulkJobs() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticking, setTicking] = useState(false);
  // Per-job rolling samples kept across polls (not persisted).
  const samplesRef = useRef<Record<string, Sample[]>>({});

  useEffect(() => {
    (async () => {
      if (!user) { setIsAdmin(false); return; }
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
    })();
  }, [user]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bulk_generate_jobs")
      .select("*")
      .order("priority", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) toast.error(error.message);
    const list = (data as Job[]) ?? [];
    const now = Date.now();
    const next = samplesRef.current;
    for (const j of list) {
      const arr = (next[j.id] ||= []);
      const last = arr[arr.length - 1];
      if (!last || last.inserted !== j.inserted || now - last.t > 30_000) {
        arr.push({ t: now, inserted: j.inserted });
      }
      // Trim old samples beyond the window (keep at least 2).
      while (arr.length > 2 && now - arr[0].t > WINDOW_MS) arr.shift();
    }
    setJobs(list);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      load();
      const id = setInterval(load, 15000);
      return () => clearInterval(id);
    }
  }, [isAdmin]);

  const grouped = useMemo(() => {
    const map: Record<string, Job[]> = {};
    for (const j of jobs) {
      (map[j.preset_key] ||= []).push(j);
    }
    return map;
  }, [jobs]);

  const callOrchestrator = async (action: "tick" | "seed" | "reset") => {
    setTicking(true);
    try {
      const { data, error } = await supabase.functions.invoke("bulk-generate-orchestrator", { body: { action } });
      if (error) throw error;
      const msg = action === "tick"
        ? `Ran batch · ${data?.batch_inserted ?? 0} new items`
        : action === "seed" ? `Seeded ${data?.inserted ?? 0} jobs` : "Reset failed jobs";
      toast.success(msg);
      await load();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally {
      setTicking(false);
    }
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-dvh grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold mb-2">Admin only</h1>
          <Button asChild variant="outline"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Home</Link></Button>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return <div className="min-h-dvh grid place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  const overall = jobs.reduce(
    (acc, j) => {
      acc.target += j.target;
      acc.inserted += j.inserted;
      acc.batches += j.batches_run;
      acc.runtime += j.total_runtime_ms;
      return acc;
    },
    { target: 0, inserted: 0, batches: 0, runtime: 0 },
  );
  const overallPct = overall.target > 0 ? Math.min(100, Math.round((overall.inserted / overall.target) * 100)) : 0;

  return (
    <div className="min-h-dvh bg-background">
      <SEO title="Bulk generation jobs" description="Phase 2 content generation progress." />
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm"><Link to="/admin"><ArrowLeft className="mr-2 h-4 w-4" />Admin</Link></Button>
          <h1 className="font-semibold">Bulk generation jobs</h1>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />Refresh
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div>
              <div className="text-sm text-muted-foreground">Overall progress</div>
              <div className="text-2xl font-bold">{overall.inserted.toLocaleString()} / {overall.target.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {overall.batches} batches · {formatDuration(overall.runtime)} total runtime
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => callOrchestrator("seed")} disabled={ticking}>Seed presets</Button>
              <Button size="sm" variant="outline" onClick={() => callOrchestrator("reset")} disabled={ticking}>Retry failed</Button>
              <Button size="sm" onClick={() => callOrchestrator("tick")} disabled={ticking}>
                {ticking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                Run one batch now
              </Button>
            </div>
          </div>
          <Progress value={overallPct} />
          <div className="text-xs text-muted-foreground mt-2">
            Nightly cron runs every 15 min from 10pm–6am ET. You don&apos;t need to keep this tab open.
          </div>
        </Card>

        {PRESET_ORDER.map((key) => {
          const list = grouped[key];
          if (!list || list.length === 0) return null;
          const pTarget = list.reduce((a, j) => a + j.target, 0);
          const pInserted = list.reduce((a, j) => a + j.inserted, 0);
          const pPct = pTarget > 0 ? Math.min(100, Math.round((pInserted / pTarget) * 100)) : 0;
          return (
            <section key={key}>
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-lg font-semibold">{PRESET_TITLES[key] ?? key}</h2>
                <div className="text-sm text-muted-foreground">{pInserted} / {pTarget} ({pPct}%)</div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {list.map((j) => {
                  const pct = j.target > 0 ? Math.min(100, Math.round((j.inserted / j.target) * 100)) : 0;
                  const remaining = Math.max(0, j.target - j.inserted);
                  // Recent throughput from rolling samples, with confidence range.
                  const samples = samplesRef.current[j.id] ?? [];
                  const { mid, lo, hi, n } = rateRange(samples);
                  // Fallback to lifetime average if no recent data yet.
                  const avgItemsPerSec = j.inserted > 0 && j.total_runtime_ms > 0
                    ? j.inserted / (j.total_runtime_ms / 1000)
                    : 0;
                  const useRecent = mid > 0;
                  const etaMid = useRecent && mid > 0 ? (remaining / mid) * 1000
                    : avgItemsPerSec > 0 ? (remaining / avgItemsPerSec) * 1000 : 0;
                  const etaLo = hi > 0 ? (remaining / hi) * 1000 : etaMid;
                  const etaHi = lo > 0 ? (remaining / lo) * 1000 : etaMid;
                  const showRange = useRecent && n >= 2 && hi > lo && remaining > 0;
                  const confidence = n >= 4 ? "high" : n >= 2 ? "med" : "low";
                  return (
                    <Card key={j.id} className="p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="text-sm font-medium leading-snug">{j.label}</div>
                        <Badge variant={statusVariant(j.status)} className="capitalize shrink-0">{j.status}</Badge>
                      </div>
                      <Progress value={pct} className="h-2" />
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div><span className="text-foreground font-medium">{j.inserted}</span> / {j.target}</div>
                        <div>{j.batches_run} batches</div>
                        <div className="flex items-center gap-1" title={useRecent ? `Recent rate ${(mid * 60).toFixed(1)} items/min (${n} samples, ${confidence} confidence)` : "Using lifetime average"}>
                          <Clock className="h-3 w-3" />
                          {remaining === 0 ? "Done" : showRange
                            ? <>ETA {formatDuration(etaLo)}–{formatDuration(etaHi)}</>
                            : <>ETA {formatDuration(etaMid)}{useRecent ? "" : "*"}</>}
                        </div>
                      </div>
                      {remaining > 0 && (
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          {useRecent
                            ? <>~{(mid * 60).toFixed(1)} items/min recent · {confidence} confidence</>
                            : <>* lifetime average — recent rate not yet sampled</>}
                        </div>
                      )}
                      {j.last_error && (
                        <div className="mt-2 text-xs text-destructive line-clamp-2" title={j.last_error}>
                          {j.failures} fail{j.failures === 1 ? "" : "s"} · {j.last_error}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {jobs.length === 0 && !loading && (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No jobs yet. Tap <span className="font-medium text-foreground">Seed presets</span> to queue Phase 2 work, or wait for tonight&apos;s cron.
          </Card>
        )}
      </main>
    </div>
  );
}