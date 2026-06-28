import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireUser } from "../_shared/auth.ts";

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

  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;

  const admin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // admin role check
  const { data: roleRow } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", auth.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!roleRow) return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const body = await req.json().catch(() => ({}));
  const items: Array<{ source: string; dest: string; contentType?: string }> = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0 || items.length > 600) {
    return new Response(JSON.stringify({ error: "items 1..600" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const results: Array<{ dest: string; ok: boolean; error?: string }> = [];
  // sequential to be gentle; ~5/sec
  for (const it of items) {
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