import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { imageBase64, textInput, subject } = await req.json();

    if (!imageBase64 && !textInput) {
      return new Response(JSON.stringify({ error: "Provide an image or text input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages: any[] = [
      {
        role: "system",
        content: `You are a brilliant, patient tutor who solves homework problems step-by-step.

CONTENT GUARDRAILS — STRICTLY ENFORCED:
- Do NOT generate, reference, or discuss any content related to: LGBTQ+ topics, transgender issues, sexually explicit material, profanity, vulgar language, alcohol, drugs, tobacco, or any age-inappropriate content.
- If a problem or topic touches on these areas, politely decline and redirect to academic content.
- Keep all examples and analogies family-friendly and appropriate for K-12 students.

Your response MUST follow this exact structure:

## 📋 Problem
Restate the problem clearly.

## 🧠 Key Concepts
List the 2-3 key concepts/formulas needed.

## 📝 Step-by-Step Solution
Number each step. Show all work. Use LaTeX for math (e.g. $x^2$).

## ✅ Final Answer
State the answer clearly, boxed if mathematical.

## 💡 Why It Works
1-2 sentence conceptual explanation of why this approach works.

## 🎯 Practice Challenge
Give ONE similar problem for the student to try on their own.

Subject context: ${subject || "general"}`,
      },
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
          },
          {
            type: "text",
            text: "Please solve this homework problem step-by-step. Extract the text/equation from the image first, then solve it thoroughly.",
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: `Please solve this homework problem step-by-step:\n\n${textInput}`,
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("homework-solver error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
