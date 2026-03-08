import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader ?? "" } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { mode, recentStats, weakSkills, strongSkills, missedQuestion } = body;

    if (!mode || !["recap", "explain", "plan", "next"].includes(mode)) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "recap") {
      systemPrompt = `You are an expert study coach. Given a student's recent session stats, provide a brief, encouraging recap. Include:
1. What went well (be specific)
2. One area to focus on next
3. A recommended next activity
4. One small actionable tip
Keep it to 3-4 short paragraphs. Use supportive, motivating language for a high school student.`;

      userPrompt = `Session stats:
- Questions answered: ${recentStats?.answered || 0}
- Correct: ${recentStats?.correct || 0}
- Accuracy: ${recentStats?.accuracy || 0}%
- Time spent: ${recentStats?.timeSpent || "unknown"}
- Weak areas: ${(weakSkills || []).join(", ") || "none identified"}
- Strong areas: ${(strongSkills || []).join(", ") || "none identified"}

Give me a personalized session recap.`;
    } else if (mode === "explain") {
      systemPrompt = `You are an expert tutor. Analyze why a student got a question wrong and provide:
1. The most likely reason they missed it (content gap, misread, trap answer, careless error, or time pressure)
2. A clear explanation of the correct approach
3. One concrete tip to avoid this mistake next time
Keep it concise (2-3 paragraphs). Be encouraging.`;

      const q = missedQuestion || {};
      userPrompt = `Question: ${q.question || "Unknown"}
Options: ${(q.options || []).map((o: any) => `${o.letter}. ${o.text}`).join(" | ")}
Correct answer: ${q.correctAnswer || "Unknown"}
Student chose: ${q.userAnswer || "Unknown"}
Domain: ${q.domain || "Unknown"}
Skill: ${q.skill || "Unknown"}

Explain why they likely got this wrong and how to fix it.`;
    } else if (mode === "plan") {
      systemPrompt = `You are an expert study coach. Create a focused study plan based on the student's performance data. Include:
1. A warm-up activity (confidence builder)
2. 2-3 targeted practice items for weak areas
3. A cool-down review or challenge
Format as a numbered list of specific activities with time estimates. Total should be 10-15 minutes. Use encouraging language.`;

      userPrompt = `Student performance:
- Recent accuracy: ${recentStats?.accuracy || 0}%
- Weak skills: ${(weakSkills || []).join(", ") || "none"}
- Strong skills: ${(strongSkills || []).join(", ") || "none"}
- Questions attempted: ${recentStats?.answered || 0}

Create a focused 10-15 minute study plan.`;
    } else if (mode === "next") {
      systemPrompt = `You are an expert study coach. Based on performance data, recommend the single best next activity. Be specific:
- Name the exact type of practice (e.g., "5 reading inference questions", "timed algebra drill")
- Explain briefly why this is the best next step
- Give an estimated time
Keep it to 2-3 sentences max.`;

      userPrompt = `Student data:
- Recent accuracy: ${recentStats?.accuracy || 0}%
- Weak skills: ${(weakSkills || []).join(", ") || "none"}
- Strong skills: ${(strongSkills || []).join(", ") || "none"}

What should they do next?`;
    }

    console.log(`Study coach request from user ${user.id}, mode: ${mode}`);

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
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Study coach error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
