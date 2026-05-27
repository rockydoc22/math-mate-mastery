import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MODULE_PROMPTS: Record<string, string> = {
  upgrade_thesis: `You are an AP essay thesis coach. The student has written a thesis for the given prompt. Improve it to be more defensible, specific, and arguable while keeping the student's core idea.

Return JSON:
{
  "upgraded_thesis": "the improved thesis sentence",
  "explanation": "1-2 sentences explaining what changed and why",
  "tips": ["tip1", "tip2"]
}`,

  suggest_commentary: `You are an AP essay writing coach. The student has evidence (a quote or document reference) that lacks commentary connecting it to their argument. Write ONE commentary sentence that explains how this evidence supports the thesis.

Return JSON:
{
  "suggested_commentary": "the commentary sentence",
  "explanation": "why this connects evidence to argument",
  "pattern": "because|therefore|this_shows|suggests"
}`,

  suggest_reorder: `You are an AP essay structure coach. Given the student's thesis and paragraph summaries, suggest an improved order and provide ONE bridging/transition sentence for the weakest transition.

Return JSON:
{
  "suggested_order": [0, 1, 2, ...],
  "bridging_sentence": "transition sentence text",
  "bridging_position": 0,
  "explanation": "why this order strengthens the argument"
}`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { action, prompt_text, response_text, thesis_text, evidence_text, paragraphs } = await req.json();

    if (!action || !MODULE_PROMPTS[action]) {
      return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let userMessage = "";
    if (prompt_text) userMessage += `ESSAY PROMPT: ${prompt_text}\n\n`;
    if (thesis_text) userMessage += `STUDENT THESIS: ${thesis_text}\n\n`;
    if (evidence_text) userMessage += `EVIDENCE SPAN: ${evidence_text}\n\n`;
    if (response_text) userMessage += `FULL RESPONSE:\n${response_text}\n\n`;
    if (paragraphs) userMessage += `PARAGRAPHS:\n${JSON.stringify(paragraphs)}\n\n`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: MODULE_PROMPTS[action] },
          { role: "user", content: userMessage },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "Failed to parse AI response", raw: content }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(jsonMatch[0], {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("writing-modules error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
