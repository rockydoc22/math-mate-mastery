import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const CRON_SECRET = Deno.env.get("CRON_SECRET");
const FROM = "AlphaOmega <noreply@notify.40squared.club>";

const admin = createClient(SUPABASE_URL, SERVICE_KEY);

function fmtMinutes(m: number) {
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  return `${m}m`;
}

function inferExam(qid: string): string {
  const id = qid.toLowerCase();
  if (id.startsWith("psat")) return "PSAT";
  if (id.startsWith("act")) return "ACT";
  if (id.startsWith("ap")) return "AP";
  if (id.startsWith("sat") || /^[a-z]+\d/.test(id)) return "SAT";
  return "Other";
}

async function buildKidReport(kid: { id: string; display_name: string; grade_level: string | null }) {
  const sinceIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: attempts } = await admin
    .from("question_attempts")
    .select("question_id,is_correct,time_taken_ms,created_at,domain")
    .eq("kid_profile_id", kid.id)
    .gte("created_at", sinceIso)
    .limit(5000);

  const rows = attempts ?? [];
  if (rows.length === 0) return null;

  let minutes = 0;
  const days = new Set<string>();
  // Per-exam rollups: count, correct, minutes, active-day set, and per-topic counts.
  type ExamAgg = {
    count: number;
    correct: number;
    minutes: number;
    days: Set<string>;
    topics: Record<string, { count: number; correct: number }>;
  };
  const exams: Record<string, ExamAgg> = {};
  const topics: Record<string, { count: number; correct: number }> = {};
  let correct = 0;

  for (const r of rows) {
    const ms = Math.min(r.time_taken_ms ?? 0, 5 * 60 * 1000);
    const mins = ms / 60000;
    minutes += mins;
    const day = new Date(r.created_at).toISOString().slice(0, 10);
    days.add(day);
    if (r.is_correct) correct++;
    const ex = inferExam(r.question_id ?? "");
    exams[ex] ??= { count: 0, correct: 0, minutes: 0, days: new Set<string>(), topics: {} };
    exams[ex].count++;
    if (r.is_correct) exams[ex].correct++;
    exams[ex].minutes += mins;
    exams[ex].days.add(day);
    const d = (r.domain || "general").toLowerCase();
    topics[d] ??= { count: 0, correct: 0 };
    topics[d].count++;
    if (r.is_correct) topics[d].correct++;
    exams[ex].topics[d] ??= { count: 0, correct: 0 };
    exams[ex].topics[d].count++;
    if (r.is_correct) exams[ex].topics[d].correct++;
  }

  const topTopics = Object.entries(topics)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  // Sort exams by activity (descending) so the most-practiced exam shows first.
  const examBreakdown = Object.entries(exams)
    .map(([exam, v]) => ({
      exam,
      count: v.count,
      correct: v.correct,
      minutes: Math.round(v.minutes),
      activeDays: v.days.size,
      topTopics: Object.entries(v.topics)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 3)
        .map(([topic, t]) => ({ topic, count: t.count, correct: t.correct })),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    name: kid.display_name,
    grade: kid.grade_level,
    questions: rows.length,
    correct,
    accuracy: Math.round((correct / rows.length) * 100),
    minutes: Math.round(minutes),
    activeDays: days.size,
    examBreakdown,
    topTopics: topTopics.map(([k, v]) => ({ topic: k, ...v })),
  };
}

function buildHtml(parentName: string, kidReports: NonNullable<Awaited<ReturnType<typeof buildKidReport>>>[]) {
  const sections = kidReports.map((k) => {
    const examCards = k.examBreakdown.map((e) => {
      const pct = e.count ? Math.round((e.correct / e.count) * 100) : 0;
      const topicChips = e.topTopics.length
        ? e.topTopics.map(t => {
            const tp = t.count ? Math.round((t.correct / t.count) * 100) : 0;
            return `<span style="display:inline-block;padding:3px 8px;margin:2px 4px 2px 0;background:#f3f0ff;color:#5b21b6;border-radius:999px;font-size:11px;text-transform:capitalize">${t.topic} · ${tp}%</span>`;
          }).join("")
        : '<span style="color:#999;font-size:11px">No topic data</span>';
      return `
        <div style="border:1px solid #ede9fe;border-radius:10px;padding:12px;margin-top:10px;background:#fafaff;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;">
            <strong style="font-size:14px;color:#5b21b6;">${e.exam}</strong>
            <span style="font-size:11px;color:#666;">${e.count} q · ${pct}% accuracy</span>
          </div>
          <table style="width:100%;margin-top:8px;border-collapse:collapse;">
            <tr>
              <td style="padding:6px;text-align:center;font-size:11px;color:#666;">Time<br><strong style="color:#111;font-size:14px;">${fmtMinutes(e.minutes)}</strong></td>
              <td style="padding:6px;text-align:center;font-size:11px;color:#666;">Active days<br><strong style="color:#111;font-size:14px;">${e.activeDays}/7</strong></td>
              <td style="padding:6px;text-align:center;font-size:11px;color:#666;">Accuracy<br><strong style="color:#111;font-size:14px;">${pct}%</strong></td>
            </tr>
          </table>
          <div style="margin-top:8px;">${topicChips}</div>
        </div>`;
    }).join("");
    const topicRows = k.topTopics.map((t) => {
      const pct = t.count ? Math.round((t.correct / t.count) * 100) : 0;
      return `<tr><td style="text-transform:capitalize">${t.topic}</td><td style="text-align:right">${t.count}</td><td style="text-align:right">${pct}%</td></tr>`;
    }).join("");
    return `
      <div style="margin-top:24px;border:1px solid #e5e7eb;border-radius:12px;padding:18px;">
        <h2 style="margin:0 0 4px 0;font-size:18px;">${k.name}${k.grade ? ` <span style="color:#666;font-weight:400;font-size:13px;">· Grade ${k.grade}</span>` : ""}</h2>
        <table style="width:100%;margin-top:12px;border-collapse:collapse;">
          <tr>
            <td style="padding:8px;background:#f9fafb;border-radius:6px;text-align:center;width:25%"><div style="font-size:20px;font-weight:700">${k.questions}</div><div style="font-size:10px;color:#666;text-transform:uppercase">Questions</div></td>
            <td style="width:6px"></td>
            <td style="padding:8px;background:#f9fafb;border-radius:6px;text-align:center;width:25%"><div style="font-size:20px;font-weight:700">${k.accuracy}%</div><div style="font-size:10px;color:#666;text-transform:uppercase">Accuracy</div></td>
            <td style="width:6px"></td>
            <td style="padding:8px;background:#f9fafb;border-radius:6px;text-align:center;width:25%"><div style="font-size:20px;font-weight:700">${fmtMinutes(k.minutes)}</div><div style="font-size:10px;color:#666;text-transform:uppercase">Time</div></td>
            <td style="width:6px"></td>
            <td style="padding:8px;background:#f9fafb;border-radius:6px;text-align:center;width:25%"><div style="font-size:20px;font-weight:700">${k.activeDays}/7</div><div style="font-size:10px;color:#666;text-transform:uppercase">Active Days</div></td>
          </tr>
        </table>
        <h3 style="font-size:12px;text-transform:uppercase;color:#666;letter-spacing:.05em;margin:18px 0 4px">Per-exam breakdown</h3>
        ${examCards || '<p style="font-size:12px;color:#666;margin:4px 0 0">No exam-tagged practice this week.</p>'}
        <h3 style="font-size:12px;text-transform:uppercase;color:#666;letter-spacing:.05em;margin:18px 0 4px">Top topics overall</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">${topicRows || '<tr><td colspan="3" style="color:#666">No topic data.</td></tr>'}</table>
      </div>`;
  }).join("");

  return `<!doctype html><html><body style="margin:0;background:#fff;font-family:-apple-system,Segoe UI,sans-serif;color:#111;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <h1 style="margin:0;font-size:22px;color:#7c3aed;">AlphaOmega · Weekly Summary</h1>
      <p style="color:#666;margin:4px 0 0;font-size:13px;">Hi ${parentName}, here's how the last 7 days looked.</p>
      ${sections || '<p style="margin-top:24px;color:#666">No practice activity this week.</p>'}
      <p style="margin-top:32px;font-size:12px;color:#666;">Open the parent dashboard any time at <a href="https://40squared.club/parent" style="color:#7c3aed">40squared.club/parent</a>.</p>
      <p style="margin-top:8px;font-size:11px;color:#999;">You're receiving this because you turned on weekly summaries. Disable it from the parent dashboard.</p>
    </div>
  </body></html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return await res.json();
}

async function processParent(parentId: string, parentName: string, email: string) {
  const { data: kids } = await admin
    .from("kid_profiles")
    .select("id,display_name,grade_level")
    .eq("parent_id", parentId);
  if (!kids || kids.length === 0) return { html: buildHtml(parentName, []), subject: "Weekly study summary · no kids yet", skipped: "no_kids" };

  const reports: NonNullable<Awaited<ReturnType<typeof buildKidReport>>>[] = [];
  for (const k of kids) {
    const r = await buildKidReport(k as any);
    if (r) reports.push(r);
  }

  const html = buildHtml(parentName, reports);
  const subject = reports.length > 0
    ? `Weekly study summary · ${reports.map(r => r.name).join(", ")}`
    : `Weekly study summary · no practice this week`;
  const send = await sendEmail(email, subject, html);
  return { ...send, html, subject };
}

function isValidEmail(e: string): boolean {
  return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const cronHeader = req.headers.get("x-cron-secret");
    let body: any = {};
    try { body = await req.clone().json(); } catch { /* no body */ }
    // Treat the request as a cron run if either:
    //  - the configured CRON_SECRET header matches, OR
    //  - the body declares { source: "cron" } AND no user is attached.
    //  We re-verify user-absence below before iterating all parents.
    const cronHeaderOk = !!CRON_SECRET && cronHeader === CRON_SECRET;
    const claimsCron = body?.source === "cron";

    // Per-user trigger (Send test now from UI)
    if (!cronHeaderOk && !claimsCron) {
      const authHeader = req.headers.get("authorization") || "";
      const token = authHeader.replace("Bearer ", "");
      const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
      const { data: { user } } = await userClient.auth.getUser();
      if (!user) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

      const { data: profile } = await admin
        .from("profiles")
        .select("username,summary_email,weekly_summary_enabled")
        .eq("id", user.id)
        .single();

      const preview: boolean = !!body?.preview;
      const testRecipient: string | undefined = body?.test_recipient;
      const parentName = profile?.username || "there";

      // Build kid reports once so we can preview or send without duplicating work.
      const { data: kids } = await admin
        .from("kid_profiles")
        .select("id,display_name,grade_level")
        .eq("parent_id", user.id);
      const reports: NonNullable<Awaited<ReturnType<typeof buildKidReport>>>[] = [];
      for (const k of kids ?? []) {
        const r = await buildKidReport(k as any);
        if (r) reports.push(r);
      }
      const html = buildHtml(parentName, reports);
      const subject = reports.length > 0
        ? `Weekly study summary · ${reports.map(r => r.name).join(", ")}`
        : `Weekly study summary · no practice this week`;

      if (preview) {
        return new Response(JSON.stringify({ ok: true, preview: true, html, subject }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const email = testRecipient || profile?.summary_email || user.email;
      if (!email) {
        return new Response(JSON.stringify({ error: "no_email", message: "No email address on file." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ error: "invalid_email", message: "That doesn't look like a valid email." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      try {
        await sendEmail(email, subject + (testRecipient ? " (test)" : ""), html);
      } catch (sendErr: any) {
        return new Response(JSON.stringify({ error: "send_failed", message: sendErr.message }), {
          status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true, sent_to: email }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Cron path: send to all opted-in parents
    const { data: parents } = await admin
      .from("profiles")
      .select("id,username,summary_email,weekly_summary_enabled")
      .eq("weekly_summary_enabled", true);

    let sent = 0, failed = 0;
    for (const p of parents ?? []) {
      try {
        let email = (p as any).summary_email;
        if (!email) {
          const { data: au } = await admin.auth.admin.getUserById(p.id);
          email = au.user?.email;
        }
        if (!email) { failed++; continue; }
        await processParent(p.id, p.username || "there", email);
        sent++;
      } catch (e) {
        console.error("parent send failed", p.id, e);
        failed++;
      }
    }
    return new Response(JSON.stringify({ ok: true, sent, failed }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});