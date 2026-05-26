import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Generates assessment questions via Lovable AI (structured tool-calling) and
// inserts them into public.assessment_questions using the service role.
// Admin-only: caller must have the 'admin' role in user_roles.

type GenSpec = {
  exam_family: string;
  section: string;
  domain: string;
  skill: string;
  subskill?: string | null;
  test_code?: string | null;
  count: number; // up to 25 per call to stay within token budget
  difficulty_min?: number; // 1-10
  difficulty_max?: number; // 1-10
  model?: string;
};

const SYSTEM_PROMPT = `You generate ORIGINAL, exam-realistic multiple-choice questions that mimic College Board SAT-style formatting and rigor. Strict rules:
- 4 options labeled A, B, C, D. Exactly one correct answer.
- Math: use exact values (π, radicals) where appropriate; avoid decimal approximations.
- For each WRONG option provide a short explanation of the trap (e.g., sign error, off-by-one, decoy, partial match, over-general).
- Provide a single trap_type for the whole item from: decoy | partial_match | over_general | sign_error | unit_error | off_by_one | misread_stem | distractor_keyword.
- time_target_seconds: realistic per-question pacing (English 60-75s, Math 75-110s, harder items longer).
- Difficulty 1-3 = foundation, 4-6 = core, 7-10 = exam-stretch.
- Content guardrails: no LGBTQ+/transgender, sexual, profane, alcohol, or drug content. Keep neutral, academic.
- 100% original; do not copy from any released exam.`;

const tool = {
  type: "function",
  function: {
    name: "emit_questions",
    description: "Return the generated questions in a structured array.",
    parameters: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              stem: { type: "string" },
              options: {
                type: "object",
                properties: {
                  A: { type: "string" }, B: { type: "string" },
                  C: { type: "string" }, D: { type: "string" },
                },
                required: ["A", "B", "C", "D"],
                additionalProperties: false,
              },
              correct_key: { type: "string", enum: ["A", "B", "C", "D"] },
              difficulty: { type: "integer", minimum: 1, maximum: 10 },
              trap_type: { type: "string" },
              time_target_seconds: { type: "integer", minimum: 20, maximum: 240 },
              solution_markdown: { type: "string" },
              cognitive_tags: { type: "array", items: { type: "string" } },
              wrong_answer_explanations: {
                type: "object",
                properties: {
                  A: { type: "string" }, B: { type: "string" },
                  C: { type: "string" }, D: { type: "string" },
                },
                additionalProperties: false,
              },
            },
            required: ["stem", "options", "correct_key", "difficulty", "trap_type", "time_target_seconds", "solution_markdown", "wrong_answer_explanations"],
            additionalProperties: false,
          },
        },
      },
      required: ["questions"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace("Bearer ", "");
    if (!jwt) return json({ error: "Missing auth" }, 401);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

    // Verify caller and admin role
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: `Bearer ${jwt}` } } });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const { data: isAdmin } = await userClient.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Admin role required" }, 403);

    const body = (await req.json()) as { spec: GenSpec; confirmBulk?: boolean };
    const spec = body.spec;
    if (!spec?.exam_family || !spec?.section || !spec?.domain || !spec?.skill) {
      return json({ error: "exam_family, section, domain, skill are required" }, 400);
    }
    const count = Math.min(25, Math.max(1, Number(spec.count) || 5));
    if (count >= 100 && !body.confirmBulk) {
      return json({ error: "Bulk approval required for 100+ items (confirmBulk=true)" }, 400);
    }
    const dMin = clamp(spec.difficulty_min ?? 3, 1, 10);
    const dMax = clamp(spec.difficulty_max ?? 8, dMin, 10);

    const userPrompt = `Generate ${count} ORIGINAL questions.
Exam family: ${spec.exam_family}
Section: ${spec.section}
Domain: ${spec.domain}
Skill: ${spec.skill}
${spec.subskill ? `Subskill: ${spec.subskill}\n` : ""}Difficulty range: ${dMin}-${dMax} (mix across the range)
Vary trap types across items. Return via the emit_questions tool only.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: spec.model ?? "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "emit_questions" } },
      }),
    });

    if (aiRes.status === 429) return json({ error: "Rate limited, please retry shortly." }, 429);
    if (aiRes.status === 402) return json({ error: "AI credits exhausted. Add funds in Workspace Usage." }, 402);
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      return json({ error: "AI gateway error" }, 500);
    }

    const ai = await aiRes.json();
    const call = ai.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) return json({ error: "No tool call in response" }, 502);
    let parsed: { questions: any[] };
    try {
      parsed = JSON.parse(call.function.arguments);
    } catch {
      return json({ error: "Failed to parse tool args" }, 502);
    }
    const questions = (parsed.questions ?? []).filter((q) => q?.stem && q?.options && q?.correct_key);
    if (!questions.length) return json({ error: "Model returned 0 valid questions" }, 502);

    // Insert with service role
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const rows = questions.map((q) => ({
      exam_family: spec.exam_family,
      test_code: spec.test_code ?? null,
      section: spec.section,
      domain: spec.domain,
      skill: spec.skill,
      subskill: spec.subskill ?? null,
      stem: q.stem,
      options: q.options,
      correct_key: q.correct_key,
      difficulty: clamp(Number(q.difficulty) || dMin, dMin, dMax),
      trap_type: q.trap_type ?? null,
      time_target_seconds: q.time_target_seconds ?? null,
      solution_markdown: q.solution_markdown ?? null,
      cognitive_tags: q.cognitive_tags ?? [],
      wrong_answer_explanations: q.wrong_answer_explanations ?? {},
    }));
    const { data: inserted, error: insErr } = await admin
      .from("assessment_questions").insert(rows).select("id");
    if (insErr) {
      console.error("Insert error", insErr);
      return json({ error: insErr.message }, 500);
    }

    return json({ inserted: inserted?.length ?? 0, requested: count });
  } catch (e) {
    console.error("bulk-generate error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

function clamp(n: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, n)); }
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}