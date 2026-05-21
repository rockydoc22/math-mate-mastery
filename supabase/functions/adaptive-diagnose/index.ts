import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const TOP_N = 3;
const MODEL = "google/gemini-2.5-flash";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) return json({ error: "LOVABLE_API_KEY missing" }, 500);
    const client = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: authHeader } } });
    const { data: claims } = await client.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (!claims?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;
    const body = await req.json().catch(() => ({}));
    const examFamily = body?.scope?.examFamily ?? null;
    const section = body?.scope?.section ?? null;
    const { error: rpcErr } = await client.rpc("recompute_weakness_clusters", { _user_id: userId, _exam_family: examFamily });
    if (rpcErr) return json({ error: rpcErr.message }, 500);
    let q = client.from("adaptive_weakness_clusters").select("*").eq("user_id", userId).gte("attempts_count", 3).order("priority_score", { ascending: false }).limit(TOP_N);
    if (examFamily) q = q.eq("exam_family", examFamily);
    if (section) q = q.eq("section", section);
    const { data: clusters } = await q;
    const sections: any[] = [];
    for (const c of clusters ?? []) {
      const { data: wrongs } = await client.from("student_attempts")
        .select("chosen_key, time_seconds, assessment_questions!inner(stem, correct_key, trap_type, wrong_answer_explanations, skill, exam_family)")
        .eq("user_id", userId).eq("is_correct", false)
        .eq("assessment_questions.skill", c.skill).eq("assessment_questions.exam_family", c.exam_family)
        .order("created_at", { ascending: false }).limit(5);
      const wrongTxt = (wrongs ?? []).map((w: any, i: number) => {
        const qq = w.assessment_questions;
        const why = qq.wrong_answer_explanations?.[w.chosen_key] ?? "(no explanation)";
        return `${i+1}. ${qq.stem.slice(0,240)}\n   Chose ${w.chosen_key} (correct ${qq.correct_key}) trap=${qq.trap_type ?? "none"}\n   Why: ${why}\n   Time: ${w.time_seconds}s`;
      }).join("\n\n");
      const prompt = `Skill ${c.skill} (${c.exam_family}/${c.section}/${c.domain}). Accuracy ${(c.accuracy*100).toFixed(0)}% over ${c.attempts_count} attempts. Time ${c.avg_time_ratio}x target. Trap rate ${(c.trap_susceptibility*100).toFixed(0)}%.\n\nRecent wrong answers:\n${wrongTxt || "(none)"}\n\nWrite a focused teaching section (<=400 words Markdown): (1) What's going wrong, (2) The fix with worked example, (3) Trap to watch for, (4) Two practice prompts without answers. Be specific to the error pattern, no generic encouragement.`;
      const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages: [
          { role: "system", content: "You are an elite test-prep tutor. Concise, exam-specific micro-lessons in Markdown focused on the student's actual error." },
          { role: "user", content: prompt }
        ]})
      });
      if (!ai.ok) { console.error("AI error", ai.status); continue; }
      const aj = await ai.json();
      const md = aj?.choices?.[0]?.message?.content ?? "";
      const { data: saved } = await client.from("adaptive_teaching_sections").upsert({
        user_id: userId, exam_family: c.exam_family, section: c.section, skill: c.skill,
        markdown_body: md, model: MODEL, generated_at: new Date().toISOString()
      }, { onConflict: "user_id,exam_family,section,skill" }).select().single();
      sections.push(saved);
    }
    return json({ clusters, teachingSections: sections });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}