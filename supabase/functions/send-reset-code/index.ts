import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

async function sendEmail(to: string, subject: string, html: string) {
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
    throw new Error(`Failed to send email: ${error}`);
  }
  return res.json();
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendCodeRequest {
  email: string;
}

const RATE_LIMIT_MAX = 3; // Max requests per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateNumericCode(digits: number): string {
  const max = 10 ** digits;
  const min = 10 ** (digits - 1);
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(min + (buf[0] % (max - min)));
}

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
    const { email }: SendCodeRequest = await req.json();
    
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

    // Check rate limit
    const allowed = await checkRateLimit(supabase, email, "send-reset-code");
    if (!allowed) {
      console.log("Rate limit exceeded for:", email);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Record this request
    await recordRequest(supabase, email, "send-reset-code");

    // Check if user exists
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    const userExists = userData?.users?.some(u => u.email?.toLowerCase() === email.toLowerCase());
    
    if (!userExists) {
      // Don't reveal if user exists - return success anyway
      console.log("User not found, but returning success to prevent enumeration");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate cryptographically secure 6-digit code
    const code = generateNumericCode(6);
    const codeHash = await sha256Hex(code);

    // Delete any existing unused codes for this email
    await supabase
      .from("password_reset_codes")
      .delete()
      .eq("email", email.toLowerCase())
      .eq("used", false);

    // Insert new code (store SHA-256 hash, never the plaintext)
    const { error: insertError } = await supabase
      .from("password_reset_codes")
      .insert({
        email: email.toLowerCase(),
        code: codeHash,
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      });

    if (insertError) {
      console.error("Error inserting code:", insertError);
      throw new Error("Failed to generate reset code");
    }

    // Send email with code
    const emailResponse = await sendEmail(
      email,
      "Your Password Reset Code",
      `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Password Reset Code</h1>
          <p style="color: #666; text-align: center;">Use this code to reset your password:</p>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 10px; letter-spacing: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #999; text-align: center; font-size: 12px;">This code expires in 15 minutes.</p>
          <p style="color: #999; text-align: center; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    );

    console.log("Reset code email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-reset-code:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);