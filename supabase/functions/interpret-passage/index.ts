import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANG_NAMES: Record<string, string> = {
  fr: "French", es: "Spanish", de: "German", it: "Italian", pt: "Portuguese",
  la: "Latin", el: "Modern Greek", grc: "Ancient Greek", he: "Hebrew",
  ar: "Arabic", zh: "Mandarin Chinese", ja: "Japanese", ko: "Korean", ru: "Russian",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

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
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { language, text } = await req.json();
    if (!text || typeof text !== "string" || text.length > 4000) {
      return new Response(JSON.stringify({ error: "Invalid text (max 4000 chars)" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const langName = LANG_NAMES[language] || language || "the source language";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const systemPrompt = `You are a patient language tutor teaching reading through INTERPRETATION (not bare translation).

For the ${langName} passage given, produce a structured response with these sections in markdown:

1. **Word-by-word gloss** — a table-like list, each line: \`source word → literal meaning (part of speech, root if helpful)\`.
2. **Grammar & idiom notes** — 2–4 bullets explaining tricky constructions, cases, tenses, or idioms.
3. **Natural English rendering** — one clean, flowing English version.
4. **Cultural / context note** — 1–2 sentences when relevant; otherwise omit.

CONTENT GUARDRAILS: Keep output family-friendly for all ages. Do NOT reference LGBTQ+, transgender, sexually explicit, profane, alcohol, or drug content. If the source text contains such material, politely decline with a single sentence asking for a different passage.`;

    const userPrompt = `Source language: ${langName}\n\nPassage:\n${text}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      return new Response(JSON.stringify({ error: `AI gateway error: ${resp.status}`, detail: t }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const json = await resp.json();
    const interpretation = json?.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ interpretation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});