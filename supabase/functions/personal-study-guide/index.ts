import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const { weakAreas, examType, recentAccuracy } = await req.json();
    if (!Array.isArray(weakAreas) || weakAreas.length === 0) {
      return new Response(JSON.stringify({ error: 'weakAreas required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const system = `You are an elite ${examType || 'SAT/ACT'} tutor writing a ONE-PAGE personalized study guide for a single student. Use Markdown. Be concise, specific, and tactical — no fluff, no generic study tips. For each weak skill provide: (1) a 1-sentence diagnosis of why students miss it, (2) a 2–3 step "fast strategy", (3) two common trap patterns, (4) one mini worked example, (5) a mastery target ("you'll know you've got it when..."). End with a 5-day micro plan tailored to the top 3 weak skills. Keep total under 700 words.`;

    const userPrompt = `Student weak areas (sorted worst first):\n${weakAreas
      .slice(0, 6)
      .map((w: any, i: number) => `${i + 1}. ${w.skill} (${w.domain || w.subject || 'general'}) — accuracy ${Math.round((w.accuracy || 0) * 100)}% over ${w.attempts || 0} attempts`)
      .join('\n')}\n\nOverall recent accuracy: ${Math.round((recentAccuracy || 0) * 100)}%.\n\nWrite the one-page guide now.`;

    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: 'AI gateway error', detail: text }), {
        status: resp.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const data = await resp.json();
    const guide = data?.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ guide }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});