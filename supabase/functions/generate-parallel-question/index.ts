import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { requireUser } from "../_shared/auth.ts";

// Returns ONE original same-skill MCQ for a "try a similar one" retry after a
// wrong answer. Stateless — does NOT write to the question bank.

const SYSTEM = `You generate ONE original, exam-realistic multiple-choice question that tests the SAME underlying skill as the source question, at the SAME or slightly easier difficulty. Strict rules:
- 4 options A/B/C/D, exactly one correct.
- Different surface (different numbers/wording/context) — must not be a paraphrase.
- Math: exact values (π, radicals) over decimals.
- No LGBTQ+, sexual, profane, alcohol, or drug content.
- Respond ONLY with strict JSON (no prose, no fences):
{"question": string, "options": [{"letter":"A","text":string},{"letter":"B","text":string},{"letter":"C","text":string},{"letter":"D","text":string}], "correctAnswer": "A"|"B"|"C"|"D", "explanation": string}
- "explanation" <= 80 words, shows the key step.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { sourceQuestion, skill, domain, difficulty } = await req.json();
    if (!sourceQuestion) {
      return new Response(JSON.stringify({ error: 'sourceQuestion required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    const user = `Skill: ${skill || 'unknown'} (${domain || 'general'})\nDifficulty: ${difficulty ?? 'same as source'}\n\nSource question:\n${sourceQuestion}\n\nGenerate the parallel question now.`;
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
    try { parsed = JSON.parse(raw); } catch {
      return new Response(JSON.stringify({ error: 'Could not parse AI response' }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});