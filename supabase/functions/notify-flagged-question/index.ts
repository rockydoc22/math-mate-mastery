import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FlagNotificationRequest {
  questionId: string;
  questionType: string;
  issueType: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse request body (no longer accepting adminEmail from client)
    const { questionId, questionType, issueType, notes }: FlagNotificationRequest = await req.json();

    // Validate required fields
    if (!questionId || !questionType || !issueType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: questionId, questionType, issueType" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Look up admin emails from the database
    const { data: adminRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (rolesError) {
      console.error("Error fetching admin roles:", rolesError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch admin list" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!adminRoles || adminRoles.length === 0) {
      console.warn("No admins found in the system");
      return new Response(
        JSON.stringify({ message: "No admins to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get admin emails from profiles table
    const adminUserIds = adminRoles.map((r) => r.user_id);
    const { data: adminProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("email")
      .in("id", adminUserIds);

    if (profilesError) {
      console.error("Error fetching admin profiles:", profilesError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch admin emails" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const adminEmails = adminProfiles
      ?.map((p) => p.email)
      .filter((email): email is string => Boolean(email));

    if (!adminEmails || adminEmails.length === 0) {
      console.warn("No admin emails found");
      return new Response(
        JSON.stringify({ message: "No admin emails to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const issueLabels: Record<string, string> = {
      incorrect_answer: "Incorrect Answer",
      typo: "Typo or Grammar Error",
      unclear: "Unclear Wording",
      offensive: "Offensive Content",
      other: "Other Issue",
    };

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed; margin-bottom: 20px;">🚩 New Flagged Question</h1>
        
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Question ID:</strong> ${questionId}</p>
          <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${questionType.toUpperCase()}</p>
          <p style="margin: 0 0 10px 0;"><strong>Issue:</strong> ${issueLabels[issueType] || issueType}</p>
          ${notes ? `<p style="margin: 0;"><strong>Notes:</strong> ${notes}</p>` : ""}
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          A student has reported an issue with this question. Please review it in the admin dashboard.
        </p>
        
        <a href="https://math-mate-mastery.lovable.app/admin" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px;">
          Go to Admin Dashboard
        </a>
        
        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
          — 1600² SAT Prep Team
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "1600² SAT Prep <onboarding@resend.dev>",
        to: adminEmails,
        subject: `🚩 New Flagged Question: ${questionId}`,
        html: emailHtml,
      }),
    });

    const emailResponse = await res.json();
    console.log("Flag notification email sent:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending flag notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
