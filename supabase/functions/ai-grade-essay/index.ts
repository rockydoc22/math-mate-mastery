import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RUBRICS: Record<string, { systemPrompt: string; maxScore: number }> = {
  apush_dbq: {
    maxScore: 7,
    systemPrompt: `You are an expert AP US History DBQ grader using the official College Board 7-point rubric.

RUBRIC DIMENSIONS:
1. THESIS (0-1): Historically defensible claim responding to the prompt. Must be in intro or conclusion. Must do more than restate the prompt.
2. CONTEXTUALIZATION (0-1): Broader historical context relevant to the prompt. Must be more than a phrase—needs a full explanation of events, trends, or developments.
3. EVIDENCE — Documents (0-2):
   - 1 pt: Uses content of 3+ documents to address the topic
   - 2 pts: Uses 6+ documents to SUPPORT the argument (not just mention)
4. EVIDENCE — Beyond Documents (0-1): Specific historical evidence beyond provided documents. Must name a specific event, policy, law, person, or movement AND link it to the argument.
5. ANALYSIS & REASONING (0-2):
   - 1 pt: Sourcing (HIPP) for 3+ documents. HIPP = Historical situation, Intended audience, Purpose, or Point of view. Each sourcing must explain HOW it's relevant to the argument.
   - 2 pts: Complex understanding — demonstrates at least ONE: multiple variables/causes, change across time periods, corroboration among sources, qualification of the argument.

HIPP COACHING GUIDANCE (use in feedback):
- H: "At the time, ___ was happening, which helps explain ___."
- I: "Because the author addressed ___, the message emphasizes ___."
- P: "The author aims to ___, so the document highlights ___."
- PoV: "From the perspective of ___, the author likely ___."

For EVIDENCE BEYOND, check the student's outside evidence against this checklist:
- Names a specific event, policy, law, person, or movement
- Correctly placed in time and place
- Explicitly linked to the argument (because/therefore)

Return JSON with this exact structure:
{
  "thesis": { "score": 0|1, "feedback": "..." },
  "contextualization": { "score": 0|1, "feedback": "..." },
  "evidence_documents": { "score": 0|1|2, "feedback": "...", "docs_identified": ["D1","D2",...], "missing_docs": ["D3",...] },
  "evidence_beyond": { "score": 0|1, "feedback": "...", "specificity_score": 0|1|2|3 },
  "analysis_reasoning": { "score": 0|1|2, "feedback": "...", "hipp_count": 0, "hipp_quality_notes": ["..."] },
  "total_score": 0-7,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2", "actionable tip 3"],
  "micro_drills": ["targeted practice suggestion 1", "targeted practice suggestion 2"]
}`,
  },
  ap_lang_rhetorical: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader for Rhetorical Analysis essays (6-point rubric).

RUBRIC:
1. THESIS (0-1): Defensible thesis responding to the prompt with a claim about rhetorical choices. Must be more than a restatement.
2. EVIDENCE & COMMENTARY (0-4):
   - 1: Provides specific, relevant evidence
   - 2: Evidence AND explains how it supports the line of reasoning
   - 3: Multiple pieces of specific evidence with commentary supporting a line of reasoning
   - 4: Consistently explains how multiple rhetorical choices contribute to the writer's argument/purpose
3. SOPHISTICATION (0-1): Complexity through counterargument, broader context, rhetorical style control, or qualifying claims.

ANALYSIS GUIDANCE for feedback:
- Evidence markers: quotation marks, paraphrase verbs, source tags
- Commentary markers: "this shows", "therefore", "because", "suggests"
- Flag quote-dumps (evidence without commentary)
- Check if each paragraph ties back to thesis

Return JSON:
{
  "thesis": { "score": 0|1, "feedback": "...", "prompt_alignment": "pass|revise" },
  "evidence_commentary": { "score": 0-4, "feedback": "...", "evidence_count": 0, "commentary_gaps": ["..."] },
  "sophistication": { "score": 0|1, "feedback": "...", "sophistication_type": "none|counterargument|broader_context|style_control|qualification" },
  "total_score": 0-6,
  "overall_feedback": "...",
  "next_steps": ["..."],
  "line_of_reasoning_check": "pass|weak|missing"
}`,
  },
  ap_lang_synthesis: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader for Synthesis essays (6-point rubric).

RUBRIC:
1. THESIS (0-1): Defensible thesis that takes a position on the prompt.
2. EVIDENCE & COMMENTARY (0-4):
   - 1: Provides evidence from sources
   - 2: Uses evidence from 3+ sources to support the argument
   - 3: Explains how evidence supports the line of reasoning
   - 4: Consistently explains how evidence from sources contributes to the argument with clear reasoning
3. SOPHISTICATION (0-1): Complexity through counterargument, nuance, broader context, or style control.

Check source integration quality: Are sources cited? Are they explained, not just dropped?

Return JSON:
{
  "thesis": { "score": 0|1, "feedback": "...", "prompt_alignment": "pass|revise" },
  "evidence_commentary": { "score": 0-4, "feedback": "...", "sources_used": 0, "commentary_gaps": ["..."] },
  "sophistication": { "score": 0|1, "feedback": "...", "sophistication_type": "none|counterargument|broader_context|style_control|qualification" },
  "total_score": 0-6,
  "overall_feedback": "...",
  "next_steps": ["..."],
  "line_of_reasoning_check": "pass|weak|missing"
}`,
  },
  ap_lang_argument: {
    maxScore: 6,
    systemPrompt: `You are an expert AP English Language grader for Argument essays (6-point rubric).

RUBRIC:
1. THESIS (0-1): Defensible thesis that takes a clear position.
2. EVIDENCE & COMMENTARY (0-4):
   - 1: Provides relevant evidence
   - 2: Evidence supports the line of reasoning
   - 3: Explains how evidence supports the argument with commentary
   - 4: Consistently provides specific evidence with insightful commentary advancing the argument
3. SOPHISTICATION (0-1): Complexity through counterargument, qualification, broader context, or effective rhetorical style.

Return JSON:
{
  "thesis": { "score": 0|1, "feedback": "...", "prompt_alignment": "pass|revise" },
  "evidence_commentary": { "score": 0-4, "feedback": "...", "evidence_count": 0, "commentary_gaps": ["..."] },
  "sophistication": { "score": 0|1, "feedback": "...", "sophistication_type": "none|counterargument|broader_context|style_control|qualification" },
  "total_score": 0-6,
  "overall_feedback": "...",
  "next_steps": ["..."],
  "line_of_reasoning_check": "pass|weak|missing"
}`,
  },
  // FRQ grading for STEM subjects
  frq_stem: {
    maxScore: 5,
    systemPrompt: `You are an expert AP exam FRQ grader. Grade the student's free-response answer using the scoring guidelines provided in the prompt.

Evaluate each part separately. For each part, determine if the student earned the point based on the criteria.

Return JSON:
{
  "parts": [
    { "part": "a", "score": 0|1, "feedback": "..." },
    { "part": "b", "score": 0|1, "feedback": "..." },
    { "part": "c", "score": 0|1, "feedback": "..." }
  ],
  "total_score": 0-N,
  "max_score": N,
  "overall_feedback": "2-3 sentences of encouragement and improvement",
  "next_steps": ["actionable tip 1", "actionable tip 2"]
}`,
  },
  // MCAT passage-based FRQ
  mcat_frq: {
    maxScore: 4,
    systemPrompt: `You are an expert MCAT tutor grading a student's free-response answer to a passage-based reasoning question. This is NOT an official MCAT question — it is original content for practice.

GRADING CRITERIA (each worth 1 point, max 4):
The rubric points for each question are provided in the prompt. Award 1 point for each rubric point the student adequately addresses.

EVALUATION APPROACH:
- Assess scientific accuracy and depth of understanding
- Check that the student uses evidence from the passage when relevant
- Evaluate logical reasoning and the ability to connect concepts
- Look for precise use of scientific terminology
- Give partial credit where appropriate — a mostly correct explanation with minor errors can still earn the point

Return JSON:
{
  "points_earned": [
    { "criterion": "description of rubric point", "earned": true|false, "feedback": "specific feedback" }
  ],
  "total_score": 0-4,
  "max_score": 4,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "strengths": ["what the student did well"],
  "improvements": ["specific areas to improve"],
  "key_concept_review": "Brief explanation of the core concept being tested"
}`,
  },
  // LSAT passage-based FRQ
  lsat_frq: {
    maxScore: 4,
    systemPrompt: `You are an expert LSAT tutor grading a student's free-response answer to a passage-based analytical reasoning question. This is NOT an official LSAT question — it is original content for practice.

GRADING CRITERIA (each worth 1 point, max 4):
The rubric points for each question are provided in the prompt. Award 1 point for each rubric point the student adequately addresses.

EVALUATION APPROACH:
- Assess logical rigor and precision of reasoning
- Check that the student identifies specific logical structures (assumptions, flaws, inferences)
- Evaluate whether conclusions follow from premises
- Look for clear, structured analysis (lawyer-like reasoning)
- For logic games: verify the student's deductions are valid and complete
- Give partial credit where appropriate

Return JSON:
{
  "points_earned": [
    { "criterion": "description of rubric point", "earned": true|false, "feedback": "specific feedback" }
  ],
  "total_score": 0-4,
  "max_score": 4,
  "overall_feedback": "2-3 sentences of encouragement and top priority improvement",
  "strengths": ["what the student did well"],
  "improvements": ["specific areas to improve"],
  "reasoning_quality": "Brief assessment of the student's logical reasoning approach"
}`,
  },
  // Generic pro-exam FRQ (for GRE, GMAT analytical writing)
  pro_exam_frq: {
    maxScore: 6,
    systemPrompt: `You are an expert grader for graduate-level analytical writing. Grade the student's essay response.

Evaluate on these dimensions:
1. Thesis clarity and defensibility (0-1)
2. Quality of reasoning and evidence (0-2)
3. Organization and coherence (0-1)
4. Language precision and style (0-1)
5. Analytical depth — counterarguments, nuance (0-1)

Return JSON:
{
  "score": 0-6,
  "max_score": 6,
  "feedback": "Overall assessment paragraph",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "dimension_scores": {
    "thesis": { "score": 0|1, "note": "..." },
    "reasoning": { "score": 0|1|2, "note": "..." },
    "organization": { "score": 0|1, "note": "..." },
    "language": { "score": 0|1, "note": "..." },
    "depth": { "score": 0|1, "note": "..." }
  }
}`,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { essay, rubric_type, prompt_text, scoring_guidelines } = await req.json();

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

    let userMessage = "";
    if (prompt_text) userMessage += `PROMPT: ${prompt_text}\n\n`;
    if (scoring_guidelines) userMessage += `SCORING GUIDELINES:\n${JSON.stringify(scoring_guidelines)}\n\n`;
    userMessage += `STUDENT RESPONSE:\n${essay}`;

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
