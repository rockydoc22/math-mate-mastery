import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { flagId, questionData, issueType, notes } = await req.json();

    if (!flagId || !questionData) {
      return new Response(JSON.stringify({ error: "Missing flagId or questionData" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Build prompt for AI
    const issueLabels: Record<string, string> = {
      incorrect_answer: "The correct answer marked may be wrong",
      typo: "There is a typo or grammar error",
      unclear: "The wording is unclear or confusing",
      offensive: "The content may be offensive",
      other: "Other issue reported",
    };

    const prompt = `You are a SAT question editor. A student flagged the following question with the issue: "${issueLabels[issueType] || issueType}".
${notes ? `Student's note: "${notes}"` : ""}

Here is the question data:
${JSON.stringify(questionData, null, 2)}

Please analyze the issue and provide a suggested fix. Return a JSON object with:
- "analysis": Brief explanation of what's wrong (1-2 sentences)
- "suggestedFix": The corrected question data (same structure as input, with fixes applied)
- "changesSummary": Bullet list of what you changed

Return ONLY valid JSON, no markdown.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", errText);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const aiResult = await aiResponse.json();
    const aiContent = aiResult.choices?.[0]?.message?.content || "";

    // Parse AI response
    let suggestedFix;
    try {
      // Try to extract JSON from potential markdown code blocks
      const jsonMatch = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, aiContent];
      suggestedFix = JSON.parse(jsonMatch[1].trim());
    } catch {
      suggestedFix = { analysis: aiContent, suggestedFix: null, changesSummary: "Could not parse AI response" };
    }

    // Store the AI fix in the database
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await serviceClient
      .from("flagged_questions")
      .update({
        ai_suggested_fix: suggestedFix,
        ai_fix_generated_at: new Date().toISOString(),
      })
      .eq("id", flagId);

    return new Response(JSON.stringify({ success: true, suggestedFix }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("AI fix error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
