import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { requireUser } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = await requireUser(req);
    if (auth instanceof Response) return auth;
    const { question, options, correctAnswer, explanation, skill, domain } = await req.json();
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

    const optionsText = Array.isArray(options)
      ? options.map((o: any) => `${o.letter}. ${o.text}`).join('\n')
      : '';

    const system = `You are an expert SAT/PSAT/AP tutor writing PROGRESSIVE HINTS for the EXACT question shown. Output strictly JSON of the form {"hints":["...","...","...","..."]} with 3-4 hints, no prose, no markdown fences.

Hint rules — each hint must be SPECIFIC to this question (reference its numbers, variables, passage details, or answer choices):
1. Hint 1: Restate what the question is really asking + the first concept/formula to use.
2. Hint 2: Set up the equation, expression, or quote the key line of evidence with the values from THIS problem plugged in.
3. Hint 3: Walk through the actual computation or reasoning step that produces the answer (show the math or quote → conclusion).
4. Hint 4 (optional, for hard items): Narrow to 2 answer choices and explain how to pick between them — but do NOT name the final letter.

NEVER output a generic study tip like "read carefully" or "eliminate wrong answers". Every hint must move the student measurably closer to the answer. Use $...$ for any math (LaTeX). Keep each hint under 220 chars.`;

    const userPrompt = `Subject/skill: ${skill || 'unknown'} (${domain || 'general'})

Question:
${question}

Answer choices:
${optionsText}

Correct answer: ${correctAnswer || '(unknown)'}
${explanation ? `\nReference explanation (for your eyes only — do not paste verbatim):\n${explanation}` : ''}

Return the JSON object now.`;

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
        response_format: { type: 'json_object' },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: 'AI gateway error', detail: text }), {
        status: resp.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';
    let hints: string[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.hints)) hints = parsed.hints.filter((h: any) => typeof h === 'string' && h.trim().length > 0);
    } catch {
      // best-effort: extract bullet-like lines
      hints = String(raw).split(/\n+/).map((s: string) => s.replace(/^[-*\d.\s]+/, '').trim()).filter(Boolean).slice(0, 4);
    }
    return new Response(JSON.stringify({ hints }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});