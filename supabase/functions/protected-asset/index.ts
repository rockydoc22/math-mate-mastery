import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const ALLOWED_PREFIXES = ["k12/", "ai/", "questions/"];
const MAX_PATH_LEN = 256;
const BUCKET = "protected-content";

const CONTENT_TYPES: Record<string, string> = {
  json: "application/json; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  svg: "image/svg+xml",
  txt: "text/plain; charset=utf-8",
};

function contentTypeFor(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

function isAllowed(path: string): boolean {
  if (!path || path.length > MAX_PATH_LEN) return false;
  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) return false;
  return ALLOWED_PREFIXES.some((p) => path.startsWith(p));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;

  const url = new URL(req.url);
  const path = url.searchParams.get("path") ?? "";

  if (!isAllowed(path)) {
    return new Response(JSON.stringify({ error: "invalid_path" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const { data, error } = await admin.storage.from(BUCKET).download(path);
  if (error || !data) {
    return new Response(JSON.stringify({ error: "not_found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(data, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": contentTypeFor(path),
      "Cache-Control": "private, max-age=3600",
      "X-Robots-Tag": "noindex",
      "Content-Disposition": "inline",
    },
  });
});