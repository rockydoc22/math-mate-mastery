import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate a random temporary password
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Ensure it meets requirements: add a number, uppercase, lowercase
  return password + "1Aa";
}

async function sendEmail(to: string, subject: string, html: string) {
  console.log("Sending email to:", to);
  console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
  console.log("RESEND_API_KEY length:", RESEND_API_KEY?.length || 0);
  
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Math Mate <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error("Resend API error:", error);
    throw new Error(`Failed to send email: ${error}`);
  }
  return res.json();
}

interface SendTempPasswordRequest {
  email?: string;
  username?: string;
}

const RATE_LIMIT_MAX = 5; // Allow 5 per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

async function checkRateLimit(supabase: any, key: string, endpoint: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  const { count, error } = await supabase
    .from("email_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("email", key.toLowerCase())
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart);
  
  if (error) {
    console.error("Error checking rate limit:", error);
    return false; // Allow on error to not block legitimate requests
  }
  
  return (count || 0) < RATE_LIMIT_MAX;
}

async function recordRequest(supabase: any, key: string, endpoint: string): Promise<void> {
  const { error } = await supabase
    .from("email_rate_limits")
    .insert({
      email: key.toLowerCase(),
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
    const { email, username }: SendTempPasswordRequest = await req.json();

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

    const rateLimitKey = (email || username || "").toLowerCase();

    // Check rate limit - stricter for this sensitive endpoint
    const allowed = await checkRateLimit(supabase, rateLimitKey, "send-temp-password");
    if (!allowed) {
      console.log("Rate limit exceeded for:", rateLimitKey);
      return new Response(
        JSON.stringify({ error: "Too many password reset attempts. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Resolve user from either email or username (without revealing whether they exist)
    let userId: string | null = null;
    let toEmail: string | null = null;

    if (email) {
      // listUsers() is the only available admin path; keep responses anti-enumeration.
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      if (userError) {
        console.error("Error listing users:", userError);
        throw new Error("Failed to look up user");
      }
      const user = userData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      if (user?.id && user.email) {
        userId = user.id;
        toEmail = user.email;
      }
    } else if (username) {
      // Look up user_id from public profiles (no email stored here)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .ilike("username", username)
        .limit(1)
        .maybeSingle();

      if (profileError) {
        console.error("Error looking up profile by username:", profileError);
      }

      if (profile?.id) {
        userId = profile.id;
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(profile.id);
        if (authError) {
          console.error("Error getting auth user by id:", authError);
        }
        toEmail = authUser?.user?.email ?? null;
      }
    }

    // Always record attempt (even if user doesn't exist) to slow brute force.
    await recordRequest(supabase, rateLimitKey, "send-temp-password");

    // Don't reveal if user exists
    if (!userId || !toEmail) {
      console.log("Temp-password requested for unknown account (anti-enumeration):", rateLimitKey);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate temporary password
    const tempPassword = generateTempPassword();
    console.log("Generated temp password for user:", userId);

    // Update user's password using admin API
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      { password: tempPassword }
    );

    if (updateError) {
      console.error("Error updating password:", updateError);
      throw new Error("Failed to set temporary password");
    }

    console.log("Password updated successfully, sending email...");

    // Send email with temporary password
    await sendEmail(
      toEmail,
      "Your Temporary Password",
      `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Temporary Password</h1>
          <p style="color: #666; text-align: center;">Use this temporary password to sign in:</p>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; font-weight: bold; text-align: center; padding: 20px; border-radius: 10px; letter-spacing: 2px; margin: 20px 0; font-family: monospace;">
            ${tempPassword}
          </div>
          <p style="color: #666; text-align: center; font-size: 14px;">
            <strong>Important:</strong> After signing in, go to Settings to change your password.
          </p>
          <p style="color: #999; text-align: center; font-size: 12px;">If you didn't request this, your password has been changed. Please contact support immediately.</p>
        </div>
      `
    );

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-temp-password:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);