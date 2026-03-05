import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RUBRICS: Record<string, { systemPrompt: string; maxScore: number }> = {
  apush_dbq: {
    maxScore: 7,
    systemPrompt: `You are an expert AP US History DBQ grader. Grade the student's DBQ essay using the official College Board 7-point rubric:

1. THESIS (0-1): Historically defensible claim that responds to the prompt. Must be in intro or conclusion.
2. CONTEXTUALIZATION (0-1): Broader historical context relevant to the prompt. Must be more than a phrase.
3. EVIDENCE - Documents (0-2): 1 pt for using content of 3+ docs to address the topic. 2 pts for using 6+ docs to SUPPORT the argument.
4. EVIDENCE - Beyond Documents (0-1): Specific historical evidence beyond the provided documents, relevant to the argument.
5. ANALYSIS & REASONING (0-2): 1 pt for HIPP sourcing (Historical situation, Intended audience, Purpose, or Point of view) for 3+ docs. 2 pts for demonstrating complex understanding (multiple variables, across time periods, corroboration, qualification).

Return your response as JSON with this exact structure:
{
  "thesis": { "score": 0|1, "feedback": "..." },
  "contextualization": { "score": 0|1, "feedback": "..." },
  "evidence_documents": { "score": 0|1|2, "feedback": "..." },
  "evidence_beyond": { "score": 0|1, "feedback": "..." },
  "analysis_reasoning": { "score": 0|1|2, "feedback": "..." },
  "total_score": 0-7,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2", "actionable tip 3"]
}`,
  },
  ap_lang_rhetorical: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader. Grade the student's Rhetorical Analysis essay using the official College Board 6-point rubric:

1. THESIS (0-1): Defensible thesis that responds to the prompt with a claim about rhetorical choices.
2. EVIDENCE & COMMENTARY (0-4):
   - 1 pt: Provides evidence (specific, relevant)
   - 2 pts: Provides evidence AND explains how it supports the line of reasoning
   - 3 pts: Supports a line of reasoning with multiple pieces of specific evidence and commentary
   - 4 pts: Consistently explains how multiple rhetorical choices contribute to the writer's argument or purpose
3. SOPHISTICATION (0-1): Demonstrates nuance/complexity through counterargument, broader context, rhetorical style control, or qualifying claims.

Return your response as JSON with this exact structure:
{
  "thesis": { "score": 0|1, "feedback": "..." },
  "evidence_commentary": { "score": 0|1|2|3|4, "feedback": "..." },
  "sophistication": { "score": 0|1, "feedback": "..." },
  "total_score": 0-6,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2", "actionable tip 3"]
}`,
  },
  ap_lang_synthesis: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader. Grade the student's Synthesis essay using the official College Board 6-point rubric:

1. THESIS (0-1): Defensible thesis that takes a position on the prompt.
2. EVIDENCE & COMMENTARY (0-4):
   - 1 pt: Provides evidence from sources
   - 2 pts: Uses evidence from 3+ sources to support the argument
   - 3 pts: Explains how evidence supports the line of reasoning
   - 4 pts: Consistently explains how evidence from sources contributes to the argument with clear reasoning
3. SOPHISTICATION (0-1): Demonstrates complexity through counterargument, nuance, broader context, or style control.

Return your response as JSON with this exact structure:
{
  "thesis": { "score": 0|1, "feedback": "..." },
  "evidence_commentary": { "score": 0|1|2|3|4, "feedback": "..." },
  "sophistication": { "score": 0|1, "feedback": "..." },
  "total_score": 0-6,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2", "actionable tip 3"]
}`,
  },
  ap_lang_argument: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader. Grade the student's Argument essay using the official College Board 6-point rubric:

1. THESIS (0-1): Defensible thesis that takes a clear position.
2. EVIDENCE & COMMENTARY (0-4):
   - 1 pt: Provides relevant evidence
   - 2 pts: Provides evidence that supports the line of reasoning
   - 3 pts: Explains how evidence supports the argument with commentary
   - 4 pts: Consistently provides specific evidence with insightful commentary that advances the argument
3. SOPHISTICATION (0-1): Demonstrates complexity through counterargument, qualification, broader context, or effective rhetorical style.

Return your response as JSON with this exact structure:
{
  "thesis": { "score": 0|1, "feedback": "..." },
  "evidence_commentary": { "score": 0|1|2|3|4, "feedback": "..." },
  "sophistication": { "score": 0|1, "feedback": "..." },
  "total_score": 0-6,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2", "actionable tip 3"]
}`,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { essay, rubric_type, prompt_text } = await req.json();

    if (!essay || !rubric_type) {
      return new Response(JSON.stringify({ error: "Missing essay or rubric_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rubric = RUBRICS[rubric_type];
    if (!rubric) {
      return new Response(JSON.stringify({ error: `Unknown rubric_type: ${rubric_type}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userMessage = prompt_text
      ? `PROMPT: ${prompt_text}\n\nSTUDENT ESSAY:\n${essay}`
      : `STUDENT ESSAY:\n${essay}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: rubric.systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI grading service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "Failed to parse grading response", raw: content }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const grading = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ grading, max_score: rubric.maxScore }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-essay error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
