import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { requireUser } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { question, options, correctAnswer, studentAnswer, skill, domain } = await req.json();
    if (!question || !correctAnswer) {
      return new Response(JSON.stringify({ error: 'question and correctAnswer required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const optionsText = Array.isArray(options)
      ? options.map((o: any) => `${o.letter}. ${o.text}`).join('\n')
      : '';

    const system = `You are a patient expert tutor. The student JUST missed a question on a weakness retest, so they need an ELABORATE breakdown — not a one-line hint. Write in Markdown with these sections, each as an H3:\n### Why the correct answer works\n### Why your answer was tempting (the trap)\n### Concept refresher (one short paragraph)\n### Fast 3-step strategy for next time\n### One similar question to try on your own\nKeep total under 350 words. Be concrete, no platitudes.`;

    const userPrompt = `Skill: ${skill || 'unknown'} (${domain || 'general'})\n\nQuestion:\n${question}\n\nOptions:\n${optionsText}\n\nCorrect answer: ${correctAnswer}\nStudent chose: ${studentAnswer || '(skipped)'}\n\nWrite the elaborate breakdown now.`;

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
    const explanation = data?.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ explanation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});