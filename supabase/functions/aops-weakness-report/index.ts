import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const ADMIN_EMAIL = "rockydoc@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ChapterStat {
  chapter: string;
  total: number;
  correct: number;
  missed: { num: number; prompt: string; chosen: string; correct: string; explanation: string }[];
}

interface RequestBody {
  studentName?: string;
  score: number;
  total: number;
  weakChapters: string[];
  chapterStats: ChapterStat[];
  /** when true: also generate fresh follow-up questions for weak chapters */
  generateFollowUps?: boolean;
}

async function generateFollowUps(weakChapters: string[]) {
  if (!LOVABLE_API_KEY || weakChapters.length === 0) return [];

  const prompt = `You are an AoPS Pre-Algebra tutor. Generate 5 multiple-choice follow-up practice questions for EACH of these weak chapters: ${weakChapters.join(", ")}.
Each question must be moderately challenging, original, and align with the chapter topic. Provide 4 distinct options A-D, a single correct answer letter, and a 1-2 sentence explanation.
Return JSON via the tool call only.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: "You output only via the tool call." },
        { role: "user", content: prompt },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "emit_followups",
            description: "Return follow-up MCQ practice questions.",
            parameters: {
              type: "object",
              properties: {
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      chapter: { type: "string" },
                      prompt: { type: "string" },
                      A: { type: "string" },
                      B: { type: "string" },
                      C: { type: "string" },
                      D: { type: "string" },
                      answer: { type: "string", enum: ["A", "B", "C", "D"] },
                      explanation: { type: "string" },
                    },
                    required: ["chapter", "prompt", "A", "B", "C", "D", "answer", "explanation"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["questions"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "emit_followups" } },
    }),
  });

  if (!res.ok) {
    console.error("AI gateway error", res.status, await res.text());
    return [];
  }
  const data = await res.json();
  const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!args) return [];
  try {
    return JSON.parse(args).questions ?? [];
  } catch {
    return [];
  }
}

function buildEmailHtml(body: RequestBody, followUps: any[]): string {
  const pct = Math.round((body.score / body.total) * 100);
  const studentLabel = body.studentName ? escapeHtml(body.studentName) : "Anonymous student";

  const chapterRows = body.chapterStats
    .map((c) => {
      const cPct = Math.round((c.correct / c.total) * 100);
      const color = cPct >= 80 ? "#16a34a" : cPct >= 60 ? "#ca8a04" : "#dc2626";
      return `<tr>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(c.chapter)}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${c.correct}/${c.total}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;text-align:right;color:${color};font-weight:600;">${cPct}%</td>
      </tr>`;
    })
    .join("");

  const missedBlocks = body.chapterStats
    .filter((c) => c.missed.length > 0)
    .map(
      (c) => `
      <h3 style="margin:18px 0 6px;color:#7c3aed;">${escapeHtml(c.chapter)}</h3>
      <ul style="margin:0;padding-left:18px;color:#374151;font-size:13px;">
        ${c.missed
          .map(
            (m) =>
              `<li style="margin-bottom:8px;"><strong>Q${m.num}.</strong> ${escapeHtml(
                m.prompt,
              )}<br/><span style="color:#dc2626;">Chose ${escapeHtml(m.chosen)}</span> &middot; <span style="color:#16a34a;">Correct ${escapeHtml(m.correct)}</span><br/><em>${escapeHtml(m.explanation)}</em></li>`,
          )
          .join("")}
      </ul>`,
    )
    .join("");

  const followUpBlock =
    followUps.length > 0
      ? `<h2 style="color:#7c3aed;margin-top:30px;">🎯 AI-Generated Follow-Up Practice</h2>
         <p style="color:#6b7280;font-size:13px;">Fresh questions targeting the weak chapters above.</p>
         ${followUps
           .map(
             (q, i) => `
           <div style="border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin:10px 0;">
             <div style="font-size:11px;color:#7c3aed;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">${escapeHtml(q.chapter)}</div>
             <div style="margin:6px 0;font-weight:600;">${i + 1}. ${escapeHtml(q.prompt)}</div>
             <div style="font-size:13px;color:#374151;">
               A) ${escapeHtml(q.A)}<br/>
               B) ${escapeHtml(q.B)}<br/>
               C) ${escapeHtml(q.C)}<br/>
               D) ${escapeHtml(q.D)}
             </div>
             <div style="margin-top:6px;font-size:12px;color:#16a34a;"><strong>Answer:</strong> ${escapeHtml(q.answer)} &mdash; ${escapeHtml(q.explanation)}</div>
           </div>`,
           )
           .join("")}`
      : "";

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:680px;margin:0 auto;padding:20px;color:#111827;">
    <h1 style="color:#7c3aed;margin:0 0 6px;">📊 AoPS Pre-Algebra — Mastery Report</h1>
    <p style="margin:0 0 16px;color:#6b7280;">${studentLabel} &middot; Score <strong>${body.score}/${body.total}</strong> (${pct}%)</p>

    <h2 style="color:#111827;margin-top:24px;">Chapter Breakdown</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead><tr style="background:#f3f4f6;">
        <th style="padding:6px 10px;text-align:left;">Chapter</th>
        <th style="padding:6px 10px;text-align:right;">Score</th>
        <th style="padding:6px 10px;text-align:right;">%</th>
      </tr></thead>
      <tbody>${chapterRows}</tbody>
    </table>

    ${
      body.weakChapters.length > 0
        ? `<h2 style="color:#dc2626;margin-top:24px;">⚠️ Weak Areas</h2>
           <p style="margin:0;color:#374151;">${body.weakChapters.map(escapeHtml).join(", ")}</p>`
        : `<p style="margin-top:24px;color:#16a34a;font-weight:600;">🎉 No weak chapters — solid mastery across the board!</p>`
    }

    ${missedBlocks ? `<h2 style="color:#111827;margin-top:24px;">Missed Questions</h2>${missedBlocks}` : ""}

    ${followUpBlock}

    <p style="color:#9ca3af;font-size:12px;margin-top:30px;">— AlphaOmega Mastery Report</p>
  </div>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as RequestBody;

    if (!body || typeof body.score !== "number" || typeof body.total !== "number" || !Array.isArray(body.chapterStats)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let followUps: any[] = [];
    if (body.generateFollowUps && body.weakChapters.length > 0) {
      try {
        followUps = await generateFollowUps(body.weakChapters);
      } catch (e) {
        console.error("Follow-up generation failed:", e);
      }
    }

    const html = buildEmailHtml(body, followUps);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return new Response(JSON.stringify({ error: "Email not configured", followUps }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AlphaOmega <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `📊 AoPS Pre-Algebra Report — ${body.studentName || "Student"} scored ${body.score}/${body.total}`,
        html,
      }),
    });

    const emailJson = await emailRes.json();
    console.log("Weakness report email:", emailRes.status, emailJson);

    return new Response(JSON.stringify({ ok: true, followUps, email: emailJson }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("aops-weakness-report error:", error);
    return new Response(JSON.stringify({ error: error?.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});