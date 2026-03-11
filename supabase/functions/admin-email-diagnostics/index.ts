import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailDiagnostic {
  recipientEmail: string;
  templateName: string;
  latestStatus: string;
  lastError: string | null;
  lastAttemptAt: string;
  attempts: number;
  lastMessageId: string | null;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: adminRole, error: roleError } = await serviceClient
      .from("user_roles")
      .select("id")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError) {
      console.error("Error checking admin role:", roleError);
      return new Response(JSON.stringify({ error: "Failed to validate admin access" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!adminRole) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const requestedLimit = Number(body?.limit ?? 50);
    const limit = Math.max(1, Math.min(Number.isFinite(requestedLimit) ? requestedLimit : 50, 100));
    const fetchLimit = Math.min(limit * 5, 500);

    const { data: logs, error: logsError } = await serviceClient
      .from("email_send_log")
      .select("recipient_email, template_name, status, error_message, created_at, message_id")
      .order("created_at", { ascending: false })
      .limit(fetchLimit);

    if (logsError) {
      console.error("Error loading email send log:", logsError);
      return new Response(JSON.stringify({ error: "Failed to load email diagnostics" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const grouped = new Map<string, EmailDiagnostic>();

    for (const log of logs ?? []) {
      const key = `${log.recipient_email}::${log.template_name}`;
      const existing = grouped.get(key);

      if (!existing) {
        grouped.set(key, {
          recipientEmail: log.recipient_email,
          templateName: log.template_name,
          latestStatus: log.status,
          lastError: log.error_message,
          lastAttemptAt: log.created_at,
          attempts: 1,
          lastMessageId: log.message_id,
        });
        continue;
      }

      existing.attempts += 1;
      if (!existing.lastError && log.error_message) {
        existing.lastError = log.error_message;
      }
    }

    return new Response(
      JSON.stringify({ diagnostics: Array.from(grouped.values()).slice(0, limit) }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin-email-diagnostics:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
