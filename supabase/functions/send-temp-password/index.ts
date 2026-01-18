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
  email: string;
  username?: string; // Optional username for additional verification
}

const RATE_LIMIT_MAX = 2; // Stricter limit for password changes - max 2 per hour
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
    const { email, username }: SendTempPasswordRequest = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit - stricter for this sensitive endpoint
    const allowed = await checkRateLimit(supabase, email, "send-temp-password");
    if (!allowed) {
      console.log("Rate limit exceeded for:", email);
      return new Response(
        JSON.stringify({ error: "Too many password reset attempts. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Find the user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error listing users:", userError);
      throw new Error("Failed to look up user");
    }
    
    const user = userData?.users?.find(u => u.email?.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Don't reveal if user exists - return success anyway
      console.log("User not found, but returning success to prevent enumeration");
      // Still record the request to prevent brute force
      await recordRequest(supabase, email, "send-temp-password");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // If username is provided, verify it matches for additional security
    if (username) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      
      if (profileData?.username?.toLowerCase() !== username.toLowerCase()) {
        console.log("Username mismatch, but returning success to prevent enumeration");
        await recordRequest(supabase, email, "send-temp-password");
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Record this request before making the password change
    await recordRequest(supabase, email, "send-temp-password");

    // Generate temporary password
    const tempPassword = generateTempPassword();
    console.log("Generated temp password for user:", user.id);

    // Update user's password using admin API
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: tempPassword }
    );

    if (updateError) {
      console.error("Error updating password:", updateError);
      throw new Error("Failed to set temporary password");
    }

    console.log("Password updated successfully, sending email...");

    // Send email with temporary password
    await sendEmail(
      email,
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