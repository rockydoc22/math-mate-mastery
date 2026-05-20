import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuestionItem {
  id: string;
  question_type: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
}

/**
 * Heuristic pre-filter — flags suspicious items WITHOUT spending an AI call.
 * Returns reason strings; empty array means item passed heuristics.
 */
function heuristicReasons(q: QuestionItem): string[] {
  const reasons: string[] = [];
  if (!q.options || q.options.length < 2) reasons.push("too_few_options");
  if (q.options) {
    const texts = q.options.map((o) => (o.text || "").trim().toLowerCase());
    const uniq = new Set(texts);
    if (uniq.size !== texts.length) reasons.push("duplicate_options");
    const lens = texts.map((t) => t.length);
    const maxLen = Math.max(...lens);
    const minLen = Math.min(...lens);
    if (maxLen > 0 && minLen / maxLen < 0.25) reasons.push("uneven_option_lengths");
    const correct = q.options.find((o) => o.letter === q.correctAnswer);
    if (!correct) reasons.push("correct_answer_not_in_options");
    if (correct && q.explanation) {
      const exp = q.explanation.toLowerCase();
      // If explanation explicitly names a different letter as correct
      for (const o of q.options) {
        if (o.letter !== q.correctAnswer &&
            new RegExp(`answer is ${o.letter.toLowerCase()}\\b`).test(exp)) {
          reasons.push("explanation_contradicts_answer");
          break;
        }
      }
    }
  }
  if ((q.question || "").trim().length < 10) reasons.push("question_too_short");
  return reasons;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Admin check
    const { data: roleData } = await supabase
      .from("user_roles").select("role").eq("user_id", user.id);
    const isAdmin = roleData?.some((r: any) => r.role === "admin" || r.role === "moderator");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = await req.json();
    const questions: QuestionItem[] = body.questions || [];
    const useAI: boolean = body.useAI !== false;
    const maxAICalls: number = Math.min(body.maxAICalls ?? 25, 50);

    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(JSON.stringify({ error: "Provide questions[] (max 200)" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (questions.length > 200) {
      return new Response(JSON.stringify({ error: "Max 200 questions per call" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Heuristic pass
    const flagged: Array<{ id: string; question_type: string; reasons: string[]; ai_verdict?: any }> = [];
    for (const q of questions) {
      const reasons = heuristicReasons(q);
      if (reasons.length) flagged.push({ id: q.id, question_type: q.question_type, reasons });
    }

    // Optional AI verification pass on the heuristic hits (capped)
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (useAI && LOVABLE_API_KEY) {
      const toCheck = flagged.slice(0, maxAICalls);
      await Promise.all(toCheck.map(async (entry) => {
        const q = questions.find((qq) => qq.id === entry.id);
        if (!q) return;
        try {
          const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-lite",
              messages: [
                { role: "system", content: "You are a meticulous test-prep QA reviewer. Return strict JSON only." },
                { role: "user", content: `Verify this multiple-choice question. Is the marked correct answer ACTUALLY correct? Are options unambiguous? Are there factual errors?\n\nQuestion: ${q.question}\nOptions: ${q.options.map(o => `${o.letter}) ${o.text}`).join(" | ")}\nMarked correct: ${q.correctAnswer}\nExplanation: ${q.explanation || "(none)"}\n\nReply JSON: {"ok":boolean,"issue":"short reason or empty","suggested_correct":"letter or empty"}` },
              ],
            }),
          });
          const data = await r.json();
          const text = data?.choices?.[0]?.message?.content || "{}";
          const cleaned = text.replace(/```json|```/g, "").trim();
          entry.ai_verdict = JSON.parse(cleaned);
        } catch (e) {
          entry.ai_verdict = { error: String(e) };
        }
      }));
    }

    return new Response(JSON.stringify({
      total_checked: questions.length,
      flagged_count: flagged.length,
      flagged,
    }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});