import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
  adminEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { questionId, questionType, issueType, notes, adminEmail }: FlagNotificationRequest = await req.json();

    const issueLabels: Record<string, string> = {
      incorrect_answer: 'Incorrect Answer',
      typo: 'Typo or Grammar Error',
      unclear: 'Unclear Wording',
      offensive: 'Offensive Content',
      other: 'Other Issue',
    };

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed; margin-bottom: 20px;">🚩 New Flagged Question</h1>
        
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Question ID:</strong> ${questionId}</p>
          <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${questionType.toUpperCase()}</p>
          <p style="margin: 0 0 10px 0;"><strong>Issue:</strong> ${issueLabels[issueType] || issueType}</p>
          ${notes ? `<p style="margin: 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
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
        to: [adminEmail],
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
