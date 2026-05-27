import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { question, options, correctAnswer, studentApproach, competitionType } = await req.json();

    if (!question || !studentApproach) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert competition problem-solving coach who analyzes HOW students solve problems, not just whether they got the right answer.

When a student shares their approach to solving a competition problem, you must:

1. **Rate their approach** on three dimensions (each 1-5 stars):
   - ⚡ **Efficiency**: How quickly/directly does it reach the answer? Fewer steps = higher score.
   - 🎨 **Creativity**: Does it use an unexpected or clever insight?
   - ✨ **Elegance**: Is it clean, generalizable, and mathematically/logically beautiful?

2. **Evaluate their method**: Explain what was good about their approach and any weaknesses.

3. **Suggest 1-2 alternative approaches** that are different from theirs. For each alternative:
   - Give it a short name (e.g., "Algebraic Shortcut", "Visual/Geometric Method")
   - Briefly outline the key steps (3-5 bullet points)
   - Explain why it might be better or offer a different perspective

4. **Pick the "Best Path"**: State which approach (theirs or an alternative) you'd recommend for a competition setting and why (usually speed matters most).

Keep it encouraging. Competition context: ${competitionType || "general academic competition"}.
Use clear formatting with headers and bullet points. Be concise — this is for students who want actionable insight, not a lecture.`;

    const userPrompt = `**Problem:**
${question}

${options ? `**Answer choices:**\n${options.map((o: any) => `${o.letter}. ${o.text}`).join("\n")}` : ""}

${correctAnswer ? `**Correct answer:** ${correctAnswer}` : ""}

**Student's approach:**
${studentApproach}

Analyze this solution path.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
