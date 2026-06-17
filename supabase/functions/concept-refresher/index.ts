import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { requireUser } from "../_shared/auth.ts";

/**
 * Returns a three-tier concept refresher for a given question + a YouTube
 * search query the client can embed. Single AI call, JSON output.
 *  - quick:   <= 25 words. The single most useful nudge.
 *  - short:   <= 180 words. Plain-English explanation with one worked micro-example.
 *  - youtubeQuery: 3-6 words, suitable for YouTube's listType=search embed.
 * The "deep dive" tier is intentionally deferred to a second click so we don't
 * burn tokens by default.
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { question, skill, domain, deep } = await req.json();
    if (!question) {
      return new Response(JSON.stringify({ error: 'question required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const system = deep
      ? `You are a patient SAT/ACT tutor. Write a deep-dive concept lesson in Markdown, max 450 words. Sections (H3):\n### Core idea\n### Worked example\n### Common traps\n### Quick checklist\nBe concrete, no fluff.`
      : `You are a patient SAT/ACT tutor. Respond ONLY with strict JSON (no prose, no code fences) matching this shape:\n{"quick": string, "short": string, "youtubeQuery": string}\nRules:\n- "quick" <= 25 words. The single most useful nudge to solve THIS question.\n- "short" <= 180 words. Plain-English concept refresher with ONE tiny worked example. Use \\n for line breaks.\n- "youtubeQuery" 3-6 words, the search you'd type on YouTube to find the clearest 5-minute video on this concept (e.g. "linear equations slope intercept SAT").\nNo platitudes. No "in this article we will". Get straight to it.`;

    const userPrompt = `Skill: ${skill || 'unknown'} (${domain || 'general'})\n\nQuestion:\n${question}`;

    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
        ...(deep ? {} : { response_format: { type: 'json_object' } }),
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      const status = resp.status === 402 || resp.status === 429 ? resp.status : 500;
      return new Response(JSON.stringify({ error: 'AI gateway error', detail: text }), {
        status, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? '';

    if (deep) {
      return new Response(JSON.stringify({ deep: content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Best-effort JSON parse with fence stripping
    let parsed: any = null;
    try {
      parsed = JSON.parse(content);
    } catch {
      const cleaned = content.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
      try { parsed = JSON.parse(cleaned); } catch { parsed = null; }
    }
    if (!parsed?.quick || !parsed?.short) {
      return new Response(JSON.stringify({
        quick: 'Re-read the question and identify what is being asked first.',
        short: content?.slice(0, 800) || 'No refresher available.',
        youtubeQuery: `${skill || domain || 'SAT'} concept explained`,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});