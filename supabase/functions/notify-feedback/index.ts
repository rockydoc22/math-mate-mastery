import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feedbackType, message, email: userEmail } = await req.json();

    if (!feedbackType || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get admin emails
    const { data: adminRoles } = await serviceClient
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (!adminRoles || adminRoles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No admins to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const adminEmails: string[] = ["rockydoc@gmail.com"];
    for (const admin of adminRoles) {
      const { data: userData } = await serviceClient.auth.admin.getUserById(admin.user_id);
      if (userData?.user?.email && !adminEmails.includes(userData.user.email)) adminEmails.push(userData.user.email);
    }

    // In-app notifications
    const notifications = adminRoles.map((admin) => ({
      user_id: admin.user_id,
      title: "💬 New User Feedback",
      message: `${feedbackType}: ${message.slice(0, 100)}${message.length > 100 ? '...' : ''}`,
      type: "info",
      link: "/admin",
    }));

    await serviceClient.from("user_notifications").insert(notifications);

    const typeEmojis: Record<string, string> = {
      suggestion: "💡",
      bug: "🐛",
      comment: "💬",
      other: "📝",
    };

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed; margin-bottom: 20px;">${typeEmojis[feedbackType] || "📝"} New User Feedback</h1>
        
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${feedbackType}</p>
          <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          ${userEmail ? `<p style="margin: 10px 0 0 0;"><strong>Reply to:</strong> ${userEmail}</p>` : ""}
        </div>
        
        <a href="https://math-mate-mastery.lovable.app/admin" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Go to Admin Dashboard
        </a>
        
        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">— 1600² SAT Prep Team</p>
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
        subject: `${typeEmojis[feedbackType] || "📝"} New Feedback: ${feedbackType}`,
        html: emailHtml,
      }),
    });

    const emailResponse = await res.json();
    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending feedback notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
