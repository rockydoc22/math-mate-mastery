import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Admin-only batched runner. Calls bulk-generate-assessment-questions in
// 25-item chunks until `target_count` is reached, with throttling and a
// hard cap. Returns a per-batch report.
//
// Body: { spec: GenSpec (without count), target_count: number, batch_size?: number, delay_ms?: number, confirmBulk: true }

const HARD_CAP = 600; // safety net per single invocation

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const jwt = authHeader.replace('Bearer ', '');
    if (!jwt) return json({ error: 'Missing auth' }, 401);

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: `Bearer ${jwt}` } } });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: 'Unauthorized' }, 401);
    const { data: isAdmin } = await userClient.rpc('has_role', { _user_id: userData.user.id, _role: 'admin' });
    if (!isAdmin) return json({ error: 'Admin role required' }, 403);

    const body = await req.json();
    const spec = body?.spec;
    const target = Math.min(HARD_CAP, Math.max(1, Number(body?.target_count) || 0));
    const batchSize = Math.min(25, Math.max(1, Number(body?.batch_size) || 25));
    const delayMs = Math.max(0, Number(body?.delay_ms) || 500);
    if (!spec || !target || !body?.confirmBulk) {
      return json({ error: 'spec, target_count, confirmBulk=true required' }, 400);
    }

    const batches: any[] = [];
    let total = 0;
    let consecFails = 0;
    while (total < target && consecFails < 3) {
      const remaining = target - total;
      const count = Math.min(batchSize, remaining);
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/bulk-generate-assessment-questions`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ spec: { ...spec, count } }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          consecFails++;
          batches.push({ ok: false, status: resp.status, error: data?.error || 'unknown' });
          if (resp.status === 402 || resp.status === 429) break;
        } else {
          consecFails = 0;
          const inserted = Number(data?.inserted) || 0;
          total += inserted;
          batches.push({ ok: true, requested: count, inserted });
          if (inserted === 0) consecFails++;
        }
      } catch (e) {
        consecFails++;
        batches.push({ ok: false, error: String(e) });
      }
      if (total < target) await new Promise((r) => setTimeout(r, delayMs));
    }

    return json({ target_count: target, inserted_total: total, batches });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Unknown' }, 500);
  }
});

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}