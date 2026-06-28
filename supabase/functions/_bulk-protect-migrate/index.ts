import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BUCKET = "protected-content";
const SOURCE_BASE = "https://40squared.club";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("method", { status: 405, headers: corsHeaders });

  // One-shot migration: hard-coded constraint that dest must be under ai/ or questions/
  // and source must be a relative path on the public site. Function is deleted after use.

  const admin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const body = await req.json().catch(() => ({}));
  const items: Array<{ source: string; dest: string; contentType?: string }> = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0 || items.length > 600) {
    return new Response(JSON.stringify({ error: "items 1..600" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const results: Array<{ dest: string; ok: boolean; error?: string }> = [];
  // sequential to be gentle; ~5/sec
  for (const it of items) {
    if (!it.dest.startsWith("ai/") && !it.dest.startsWith("questions/")) {
      results.push({ dest: it.dest, ok: false, error: "bad_prefix" }); continue;
    }
    if (!it.source.startsWith("/data/") && !it.source.startsWith("/questions/")) {
      results.push({ dest: it.dest, ok: false, error: "bad_source" }); continue;
    }
    try {
      const r = await fetch(`${SOURCE_BASE}${it.source}`);
      if (!r.ok) { results.push({ dest: it.dest, ok: false, error: `fetch_${r.status}` }); continue; }
      const buf = new Uint8Array(await r.arrayBuffer());
      const ct = it.contentType ?? r.headers.get("content-type") ?? "application/octet-stream";
      const up = await admin.storage.from(BUCKET).upload(it.dest, buf, { contentType: ct, upsert: true });
      if (up.error) results.push({ dest: it.dest, ok: false, error: up.error.message });
      else results.push({ dest: it.dest, ok: true });
    } catch (e) {
      results.push({ dest: it.dest, ok: false, error: (e as Error).message });
    }
  }

  const ok = results.filter(r => r.ok).length;
  return new Response(JSON.stringify({ uploaded: ok, total: results.length, failures: results.filter(r => !r.ok) }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});