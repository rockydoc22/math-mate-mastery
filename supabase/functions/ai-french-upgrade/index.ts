import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sentence } = await req.json();

    if (!sentence || typeof sentence !== "string") {
      return new Response(JSON.stringify({ error: "Missing sentence" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a French language coach preparing students for the CCFF (Congrès de la Culture Française en Floride) competition. 

When given a simple French sentence, upgrade it to competition-level by:
1. Adding sophisticated connectors (en effet, néanmoins, par conséquent, d'ailleurs, certes, etc.)
2. Using more precise vocabulary 
3. Adding subjunctive or conditional where appropriate
4. Making it sound natural and authentic (like a native French speaker)
5. Keeping the original meaning intact

Respond with ONLY the upgraded sentence followed by a brief explanation in English of what you changed and why. Format:

UPGRADED: [the upgraded sentence]

WHY: [1-2 sentence explanation of improvements]`,
          },
          {
            role: "user",
            content: `Upgrade this French sentence to competition level: "${sentence}"`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Could not generate upgrade.";

    return new Response(JSON.stringify({ upgraded: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
