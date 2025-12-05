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
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader ?? "" } } }
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized. Please sign in to use the AI tutor." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse and validate input
    const body = await req.json();
    const { question, options, correctAnswer, userAnswer, explanation } = body;

    // Input validation
    if (!question || typeof question !== "string" || question.length > 5000) {
      return new Response(JSON.stringify({ error: "Invalid question: must be a string under 5000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(options) || options.length === 0 || options.length > 10) {
      return new Response(JSON.stringify({ error: "Invalid options: must be an array of 1-10 items" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const opt of options) {
      if (!opt || typeof opt.letter !== "string" || typeof opt.text !== "string") {
        return new Response(JSON.stringify({ error: "Invalid option format: each option must have letter and text" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (opt.text.length > 2000) {
        return new Response(JSON.stringify({ error: "Invalid option: text must be under 2000 characters" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (!correctAnswer || typeof correctAnswer !== "string" || correctAnswer.length > 10) {
      return new Response(JSON.stringify({ error: "Invalid correctAnswer" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!userAnswer || typeof userAnswer !== "string" || userAnswer.length > 10) {
      return new Response(JSON.stringify({ error: "Invalid userAnswer" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (explanation && (typeof explanation !== "string" || explanation.length > 5000)) {
      return new Response(JSON.stringify({ error: "Invalid explanation: must be under 5000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const isCorrect = userAnswer === correctAnswer;
    const correctOption = options.find((o: any) => o.letter === correctAnswer);
    const userOption = options.find((o: any) => o.letter === userAnswer);

    const systemPrompt = `You are an expert SAT tutor helping students understand questions they got ${isCorrect ? 'correct' : 'wrong'}. 
Your goal is to:
1. Explain WHY the correct answer is right
2. If the student got it wrong, explain why their choice was incorrect
3. Teach the underlying concept or skill being tested
4. Provide a memorable tip or trick for similar questions
5. Keep explanations concise but thorough (2-3 paragraphs max)
Use encouraging, supportive language appropriate for high school students.`;

    const userPrompt = `Question: ${question}

Options:
${options.map((o: any) => `${o.letter}. ${o.text}`).join('\n')}

Correct Answer: ${correctAnswer}. ${correctOption?.text}
${!isCorrect ? `Student's Answer: ${userAnswer}. ${userOption?.text}` : ''}

Original Explanation: ${explanation || 'Not provided'}

Please provide a personalized tutoring explanation for this student who ${isCorrect ? 'got this question correct' : 'got this question wrong'}.`;

    console.log(`AI tutor request from user ${user.id} for question (${question.substring(0, 50)}...)`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
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
    console.error("AI tutor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
