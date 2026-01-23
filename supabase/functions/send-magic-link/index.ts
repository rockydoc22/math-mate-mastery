import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MagicLinkRequest {
  email?: string;
  username?: string;
  redirectTo?: string;
}

const RATE_LIMIT_MAX = 3; // Max requests per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

async function checkRateLimit(supabase: any, email: string, endpoint: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  const { count, error } = await supabase
    .from("email_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart);
  
  if (error) {
    console.error("Error checking rate limit:", error);
    return false; // Allow on error to not block legitimate requests
  }
  
  return (count || 0) < RATE_LIMIT_MAX;
}

async function recordRequest(supabase: any, email: string, endpoint: string): Promise<void> {
  const { error } = await supabase
    .from("email_rate_limits")
    .insert({
      email: email.toLowerCase(),
      endpoint: endpoint,
    });
  
  if (error) {
    console.error("Error recording rate limit:", error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, username, redirectTo }: MagicLinkRequest = await req.json();
    
    if (!email && !username) {
      return new Response(
        JSON.stringify({ error: "Email or username is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Resolve email from username if needed
    let resolvedEmail = email?.toLowerCase();
    
    if (!resolvedEmail && username) {
      // Look up user by username in profiles table, then get email from auth.users
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();
      
      if (profile?.id) {
        const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
        resolvedEmail = authUser?.user?.email?.toLowerCase();
      }
    }

    // Always return success to prevent enumeration
    if (!resolvedEmail) {
      console.log("User not found for identifier:", username || email);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check rate limit
    const allowed = await checkRateLimit(supabase, resolvedEmail, "send-magic-link");
    if (!allowed) {
      console.log("Rate limit exceeded for:", resolvedEmail);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Record this request
    await recordRequest(supabase, resolvedEmail, "send-magic-link");

    // Generate magic link using Supabase Auth
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: resolvedEmail,
      options: {
        redirectTo: redirectTo || `${req.headers.get("origin")}/`,
      },
    });

    if (error) {
      console.error("Error generating magic link:", error);
      // Don't reveal if user exists
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Magic link generated for:", resolvedEmail);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-magic-link:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);