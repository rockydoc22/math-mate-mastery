import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const ADMIN_EMAIL = "rockydoc@gmail.com";

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
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get all pending flagged questions
    const { data: pendingFlags, error: flagError } = await serviceClient
      .from("flagged_questions")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (flagError) throw flagError;

    if (!pendingFlags || pendingFlags.length === 0) {
      return new Response(
        JSON.stringify({ message: "No pending flags to review" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resolvedFlags: string[] = [];
    const aiSuggestions: { id: string; questionId: string; suggestion: string }[] = [];

    // For each flag, try AI auto-analysis
    for (const flag of pendingFlags.slice(0, 20)) {
      try {
        if (LOVABLE_API_KEY && flag.ai_suggested_fix) {
          // Already has AI fix, mark as reviewed
          resolvedFlags.push(flag.id);
          aiSuggestions.push({
            id: flag.id,
            questionId: flag.question_id,
            suggestion: typeof flag.ai_suggested_fix === 'string' 
              ? flag.ai_suggested_fix 
              : JSON.stringify(flag.ai_suggested_fix),
          });
        } else if (LOVABLE_API_KEY) {
          // Generate AI analysis
          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                {
                  role: "system",
                  content: "You are a question quality reviewer for a K-12 and SAT prep platform. Analyze the flagged question and provide a brief assessment and suggested fix. Be concise.",
                },
                {
                  role: "user",
                  content: `Question ID: ${flag.question_id}\nType: ${flag.question_type}\nIssue reported: ${flag.issue_type}\nNotes: ${flag.notes || 'No notes'}\n\nPlease analyze this flag and suggest whether the question should be fixed, removed, or kept as-is. Provide a brief recommendation.`,
                },
              ],
            }),
          });

          if (aiResponse.ok) {
            const aiData = await aiResponse.json();
            const suggestion = aiData.choices?.[0]?.message?.content || "Unable to analyze";
            
            await serviceClient
              .from("flagged_questions")
              .update({
                ai_suggested_fix: { analysis: suggestion, auto_reviewed: true },
                ai_fix_generated_at: new Date().toISOString(),
              })
              .eq("id", flag.id);

            aiSuggestions.push({ id: flag.id, questionId: flag.question_id, suggestion });
          }
        }
      } catch (err) {
        console.error(`AI review failed for flag ${flag.id}:`, err);
      }
    }

    // Build digest email
    const flagRows = pendingFlags.map(f => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${f.question_id}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${f.question_type}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${f.issue_type}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${f.notes || '-'}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${new Date(f.created_at).toLocaleDateString()}</td>
      </tr>
    `).join("");

    const aiSection = aiSuggestions.length > 0 ? `
      <h2 style="color:#7c3aed;margin-top:30px;">🤖 AI Analysis</h2>
      ${aiSuggestions.map(s => `
        <div style="background:#f3f4f6;border-radius:8px;padding:15px;margin:10px 0;">
          <p><strong>Question:</strong> ${s.questionId}</p>
          <p>${s.suggestion.slice(0, 500)}</p>
        </div>
      `).join("")}
    ` : "";

    const emailHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
        <h1 style="color:#7c3aed;">📋 Daily Flag Digest</h1>
        <p style="color:#6b7280;">${pendingFlags.length} pending flag(s) as of ${new Date().toLocaleDateString()}</p>
        
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:8px;text-align:left;">Question ID</th>
              <th style="padding:8px;text-align:left;">Type</th>
              <th style="padding:8px;text-align:left;">Issue</th>
              <th style="padding:8px;text-align:left;">Notes</th>
              <th style="padding:8px;text-align:left;">Date</th>
            </tr>
          </thead>
          <tbody>${flagRows}</tbody>
        </table>

        ${aiSection}

        <a href="https://math-mate-mastery.lovable.app/admin" 
           style="display:inline-block;background:#7c3aed;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:15px;">
          Review in Admin Dashboard
        </a>
        
        <p style="color:#9ca3af;font-size:12px;margin-top:30px;">— 1600² Automated Review System</p>
      </div>
    `;

    // Send digest email
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "1600² SAT Prep <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `📋 Daily Flag Digest: ${pendingFlags.length} pending flags`,
          html: emailHtml,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        message: "Daily review complete",
        pendingCount: pendingFlags.length,
        aiAnalyzed: aiSuggestions.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Daily flag review error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
