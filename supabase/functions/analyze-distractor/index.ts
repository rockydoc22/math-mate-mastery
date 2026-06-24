import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { requireUser } from "../_shared/auth.ts";

// Labels the misconception behind a student's wrong choice on an MCQ.
// Returns { label, oneLineFix, confidence }. Pure analysis — caller decides
// whether to surface it or write to the mistake journal.

const SYSTEM = `You are a diagnostic tutor. A student picked a WRONG option on a multiple-choice question. Identify the most likely misconception that produced THAT specific wrong choice (not a generic list).
Respond ONLY with strict JSON, no prose, no code fences:
{"label": string, "oneLineFix": string, "category": string, "confidence": "high"|"medium"|"low"}
Rules:
- "label" <= 10 words, names the misconception (e.g. "Confused mean with median", "Sign flip when distributing negative").
- "oneLineFix" <= 20 words, the single corrective rule.
- "category" one of: content_gap | misread_prompt | trap_answer | careless_execution | time_pressure.
- "confidence" reflects evidence strength.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { question, options, correctAnswer, studentAnswer, skill, domain } = await req.json();
    if (!question || !correctAnswer || !studentAnswer) {
      return new Response(JSON.stringify({ error: 'question, correctAnswer, studentAnswer required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

    const opts = Array.isArray(options)
      ? options.map((o: any) => `${o.letter ?? o.key ?? ''}. ${o.text ?? o}`).join('\n')
      : '';

    const user = `Skill: ${skill || 'unknown'} (${domain || 'general'})\n\nQuestion:\n${question}\n\nOptions:\n${opts}\n\nCorrect: ${correctAnswer}\nStudent picked: ${studentAnswer}\n\nReturn the JSON now.`;

    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
        response_format: { type: 'json_object' },
      }),
    });
    if (resp.status === 429) return new Response(JSON.stringify({ error: 'Rate limited' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: 'AI credits exhausted' }), { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (!resp.ok) {
      const t = await resp.text();
      return new Response(JSON.stringify({ error: 'AI gateway error', detail: t }), { status: resp.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';
    let parsed: any = {};
    try { parsed = JSON.parse(raw); } catch { parsed = { label: 'Could not parse', oneLineFix: raw.slice(0, 120), category: 'content_gap', confidence: 'low' }; }
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});