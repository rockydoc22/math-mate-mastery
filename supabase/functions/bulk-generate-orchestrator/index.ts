import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Nightly orchestrator for Phase 2 bulk question generation.
// - Seeds priority preset jobs into bulk_generate_jobs when nothing is active.
// - Each invocation picks the highest-priority queued/running job and runs ONE
//   batch (25 items) against bulk-generate-assessment-questions, updating
//   progress. Schedule via pg_cron every ~10 minutes overnight.
// Auth: x-cron-secret header (CRON_SECRET) OR admin JWT.

const BATCH_SIZE = 25;
// Per-invocation budget: keep well under the 150s edge-function wall time.
const MAX_TICK_MS = 110_000;
// Safety: never run more than this many batches in a single tick.
const MAX_BATCHES_PER_TICK = 40;

// Priority order: lower number = higher priority.
const PRESETS: Array<{ key: string; priority: number; jobs: Array<{ label: string; spec: Record<string, unknown>; target: number }> }> = [
  {
    key: "psat",
    priority: 10,
    jobs: [
      { label: "PSAT · Math · Algebra (linear)", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "algebra", skill: "linear equations and systems", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSAT · Math · Advanced (quadratics)", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "advanced-math", skill: "quadratics and nonlinear functions", difficulty_min: 3, difficulty_max: 8 } },
      { label: "PSAT · Math · Problem solving & data", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "problem-solving-data", skill: "ratios, rates, percents, units", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSAT · Math · Geometry & trig", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "math", domain: "geometry-trig", skill: "angles, triangles, circles", difficulty_min: 3, difficulty_max: 8 } },
      { label: "PSAT · R/W · Information & ideas", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "information-ideas", skill: "central idea and supporting evidence", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSAT · R/W · Craft & structure", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "craft-structure", skill: "words in context and text structure", difficulty_min: 3, difficulty_max: 8 } },
      { label: "PSAT · R/W · Standard English", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "standard-english", skill: "boundaries, form, structure, sense", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSAT · R/W · Expression of ideas", target: 300, spec: { exam_family: "psat", test_code: "psat-nmsqt", section: "reading-writing", domain: "expression-ideas", skill: "rhetorical synthesis and transitions", difficulty_min: 3, difficulty_max: 8 } },
    ],
  },
  {
    key: "act-science",
    priority: 20,
    jobs: [
      { label: "ACT Science · Data Representation", target: 300, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "data-representation", skill: "reading tables, graphs, and figures", difficulty_min: 3, difficulty_max: 8 } },
      { label: "ACT Science · Research Summaries", target: 300, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "research-summaries", skill: "experimental design and results", difficulty_min: 4, difficulty_max: 9 } },
      { label: "ACT Science · Conflicting Viewpoints", target: 300, spec: { exam_family: "act", test_code: "act-science", section: "science", domain: "conflicting-viewpoints", skill: "comparing scientific hypotheses", difficulty_min: 5, difficulty_max: 9 } },
    ],
  },
  {
    key: "ap-frq",
    priority: 30,
    jobs: [
      { label: "AP Calc AB · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-calc-ab", section: "frq", domain: "calculus", skill: "derivatives, integrals, applications", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Biology · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-bio", section: "frq", domain: "biology", skill: "interpret data and design experiments", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP US History · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-apush", section: "frq", domain: "history", skill: "short-answer and long-essay prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Eng Lang · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-eng-lang", section: "frq", domain: "rhetoric", skill: "rhetorical analysis and argument prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Psychology · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-psych", section: "frq", domain: "psychology", skill: "apply concepts to scenarios", difficulty_min: 3, difficulty_max: 8 } },
      { label: "AP Statistics · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-stats", section: "frq", domain: "statistics", skill: "inference, probability, study design", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Env Science · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-apes", section: "frq", domain: "environmental-science", skill: "data analysis and environmental solutions", difficulty_min: 3, difficulty_max: 8 } },
      { label: "AP European History · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-euro", section: "frq", domain: "history", skill: "short-answer and long-essay prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP World History · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-world", section: "frq", domain: "history", skill: "short-answer and long-essay prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP Eng Lit · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-eng-lit", section: "frq", domain: "literature", skill: "poetry, prose, and literary argument prompts", difficulty_min: 4, difficulty_max: 9 } },
      { label: "AP CSP · FRQ", target: 300, spec: { exam_family: "ap", test_code: "ap-csp", section: "frq", domain: "computer-science", skill: "create performance task style prompts", difficulty_min: 3, difficulty_max: 8 } },
    ],
  },
  {
    key: "state-tests",
    priority: 40,
    jobs: [
      { label: "PSSA · Math G8", target: 300, spec: { exam_family: "state", test_code: "pssa-g8", section: "math", domain: "grade-8-math", skill: "expressions, equations, functions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "PSSA · ELA G8", target: 300, spec: { exam_family: "state", test_code: "pssa-g8", section: "ela", domain: "grade-8-ela", skill: "reading comprehension and writing conventions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "NY Regents · Algebra I", target: 300, spec: { exam_family: "state", test_code: "regents-alg1", section: "math", domain: "algebra-1", skill: "linear, quadratic, exponential models", difficulty_min: 3, difficulty_max: 8 } },
      { label: "NY Regents · ELA", target: 300, spec: { exam_family: "state", test_code: "regents-ela", section: "ela", domain: "ela", skill: "passage analysis and source-based argument", difficulty_min: 3, difficulty_max: 8 } },
      { label: "STAAR · Math G8", target: 300, spec: { exam_family: "state", test_code: "staar-g8-math", section: "math", domain: "grade-8-math", skill: "proportional reasoning and functions", difficulty_min: 2, difficulty_max: 7 } },
      { label: "STAAR · Reading G8", target: 300, spec: { exam_family: "state", test_code: "staar-g8-read", section: "ela", domain: "grade-8-reading", skill: "literary and informational comprehension", difficulty_min: 2, difficulty_max: 7 } },
    ],
  },
  {
    key: "ged-hiset",
    priority: 50,
    jobs: [
      { label: "GED · Math", target: 300, spec: { exam_family: "ged", test_code: "ged-math", section: "math", domain: "ged-math", skill: "algebra, geometry, data analysis", difficulty_min: 2, difficulty_max: 7 } },
      { label: "GED · RLA", target: 300, spec: { exam_family: "ged", test_code: "ged-rla", section: "rla", domain: "ged-rla", skill: "reading, language, and extended response", difficulty_min: 2, difficulty_max: 7 } },
      { label: "GED · Science", target: 300, spec: { exam_family: "ged", test_code: "ged-science", section: "science", domain: "ged-science", skill: "life, physical, and earth science reasoning", difficulty_min: 2, difficulty_max: 7 } },
      { label: "GED · Social Studies", target: 300, spec: { exam_family: "ged", test_code: "ged-social-studies", section: "social-studies", domain: "ged-social-studies", skill: "civics, US history, economics, geography", difficulty_min: 2, difficulty_max: 7 } },
      { label: "ACT · English", target: 300, spec: { exam_family: "act", test_code: "act-english", section: "english", domain: "usage-mechanics", skill: "grammar, punctuation, sentence structure, rhetoric", difficulty_min: 3, difficulty_max: 8 } },
      { label: "ACT · Reading", target: 300, spec: { exam_family: "act", test_code: "act-reading", section: "reading", domain: "reading-comprehension", skill: "literary narrative, social science, humanities, natural science passages", difficulty_min: 3, difficulty_max: 8 } },
    ],
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const CRON_SECRET = Deno.env.get("CRON_SECRET") ?? "";

    // Auth: cron secret OR admin user.
    const headerSecret = req.headers.get("x-cron-secret") ?? "";
    let isAuthorized = !!CRON_SECRET && headerSecret === CRON_SECRET;
    if (!isAuthorized) {
      const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
      if (jwt) {
        const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: `Bearer ${jwt}` } } });
        const { data: userData } = await userClient.auth.getUser();
        if (userData?.user) {
          const { data: isAdmin } = await userClient.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
          isAuthorized = !!isAdmin;
        }
      }
    }
    if (!isAuthorized) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const action = (body?.action as string) ?? "tick";
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    if (action === "seed") {
      const inserted = await seedPresets(admin);
      return json({ ok: true, action: "seed", inserted });
    }

    if (action === "reset") {
      // Mark failed jobs back to queued so they retry tonight.
      await admin.from("bulk_generate_jobs")
        .update({ status: "queued", failures: 0, last_error: null })
        .in("status", ["failed"]);
      return json({ ok: true, action: "reset" });
    }

    // Default: tick — auto-seed if nothing active, then run one batch.
    const { data: active } = await admin
      .from("bulk_generate_jobs")
      .select("id")
      .in("status", ["queued", "running"])
      .limit(1);

    let seededCount = 0;
    if (!active || active.length === 0) {
      seededCount = await seedPresets(admin);
    }

    // Drain multiple batches (and roll to the next job) within a single
    // invocation budget, so the cron actually makes meaningful progress
    // even if its cadence is slow or some ticks get skipped.
    const tickStart = Date.now();
    const report: Array<Record<string, unknown>> = [];
    let batchesThisTick = 0;
    let totalInsertedThisTick = 0;

    while (
      Date.now() - tickStart < MAX_TICK_MS &&
      batchesThisTick < MAX_BATCHES_PER_TICK
    ) {
      const { data: nextJobs } = await admin
        .from("bulk_generate_jobs")
        .select("*")
        .in("status", ["queued", "running"])
        .order("priority", { ascending: true })
        .order("created_at", { ascending: true })
        .limit(1);

      const job = nextJobs?.[0];
      if (!job) break;

      const startedAt = job.started_at ?? new Date().toISOString();
      if (job.status !== "running") {
        await admin.from("bulk_generate_jobs")
          .update({ status: "running", started_at: startedAt })
          .eq("id", job.id);
      }

      const remaining = Math.max(0, job.target - job.inserted);
      if (remaining === 0) {
        await admin.from("bulk_generate_jobs")
          .update({ status: "completed", completed_at: new Date().toISOString() })
          .eq("id", job.id);
        continue;
      }

      const count = Math.min(BATCH_SIZE, remaining);
      const t0 = Date.now();
      let inserted = 0;
      let errMsg: string | null = null;
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/bulk-generate-assessment-questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-cron-secret": CRON_SECRET,
            apikey: ANON_KEY,
          },
          body: JSON.stringify({ spec: { ...job.spec, count }, confirmBulk: true }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          errMsg = `HTTP ${resp.status}: ${data?.error ?? "unknown"}`;
        } else {
          inserted = Number(data?.inserted) || 0;
        }
      } catch (e) {
        errMsg = e instanceof Error ? e.message : String(e);
      }
      const elapsed = Date.now() - t0;

      const newInserted = job.inserted + inserted;
      const newFailures = errMsg || inserted === 0 ? (job.failures + 1) : 0;
      const isComplete = newInserted >= job.target;
      const isFailed = newFailures >= 5;

      await admin.from("bulk_generate_jobs").update({
        inserted: newInserted,
        batches_run: job.batches_run + 1,
        total_runtime_ms: job.total_runtime_ms + elapsed,
        failures: newFailures,
        last_error: errMsg,
        status: isComplete ? "completed" : isFailed ? "failed" : "running",
        completed_at: isComplete ? new Date().toISOString() : job.completed_at,
      }).eq("id", job.id);

      batchesThisTick++;
      totalInsertedThisTick += inserted;
      report.push({
        job_id: job.id,
        label: job.label,
        batch_inserted: inserted,
        total_inserted: newInserted,
        target: job.target,
        elapsed_ms: elapsed,
        error: errMsg,
        status: isComplete ? "completed" : isFailed ? "failed" : "running",
      });

      // If this job hit the failure cap, move on to the next job instead of
      // hammering it; if quota/rate-limit upstream, stop the tick entirely.
      if (errMsg && (errMsg.includes("429") || errMsg.includes("402"))) break;

      // Small breather between batches to avoid upstream rate-limits.
      await new Promise((r) => setTimeout(r, 400));
    }

    return json({
      ok: true,
      action: "tick",
      seeded: seededCount,
      batches_run: batchesThisTick,
      inserted_total: totalInsertedThisTick,
      elapsed_ms: Date.now() - tickStart,
      report,
    });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

async function seedPresets(admin: ReturnType<typeof createClient>): Promise<number> {
  let inserted = 0;
  for (const preset of PRESETS) {
    for (const j of preset.jobs) {
      // Only seed if no incomplete job with this label exists.
      const { data: existing } = await admin
        .from("bulk_generate_jobs")
        .select("id,status,inserted,target")
        .eq("preset_key", preset.key)
        .eq("label", j.label)
        .order("created_at", { ascending: false })
        .limit(1);
      const last = existing?.[0];
      const isOpen = last && (last.status === "queued" || last.status === "running" || (last.status === "completed" && last.inserted < last.target));
      if (isOpen) continue;
      const { error } = await admin.from("bulk_generate_jobs").insert({
        preset_key: preset.key,
        priority: preset.priority,
        label: j.label,
        spec: j.spec,
        target: j.target,
      });
      if (!error) inserted++;
    }
  }
  return inserted;
}

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}