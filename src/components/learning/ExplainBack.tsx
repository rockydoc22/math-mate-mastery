import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COACH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/study-coach`;

interface Props {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  domain?: string;
  skill?: string;
  options?: { letter: string; text: string }[];
  onClose?: () => void;
}

/**
 * Explain-Back: after a wrong answer, ask the student to type *why* they think
 * they missed it. Sends both the question context and their self-explanation
 * to the coach for targeted feedback. Massive retention lift vs. just reading
 * a static explanation.
 */
export default function ExplainBack({ question, correctAnswer, userAnswer, domain, skill, options, onClose }: Props) {
  const { user } = useAuth();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const submit = async () => {
    if (!user) {
      toast.error("Sign in to use Explain-Back");
      return;
    }
    if (reason.trim().length < 5) {
      toast.error("Tell me in a sentence why you think you missed it");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(COACH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          mode: "explain",
          missedQuestion: {
            question: `${question}\n\n(Student's own reasoning: ${reason})`,
            options: options ?? [],
            correctAnswer,
            userAnswer,
            domain,
            skill,
          },
        }),
      });
      if (!res.ok || !res.body) throw new Error("Coach unavailable");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) setFeedback((f) => f + delta);
          } catch {}
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Could not reach coach");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 border-accent/40 bg-accent/5 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-accent-foreground" />
        <div className="text-sm font-bold">Why do you think you missed this?</div>
      </div>
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="One sentence — guess the type of mistake (misread, content gap, time pressure, trap answer, careless)…"
        rows={2}
        disabled={loading || !!feedback}
      />
      {!feedback && (
        <div className="flex gap-2 justify-end">
          {onClose && <Button size="sm" variant="ghost" onClick={onClose}>Skip</Button>}
          <Button size="sm" onClick={submit} disabled={loading}>
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            <span className="ml-1">Get coached</span>
          </Button>
        </div>
      )}
      {feedback && (
        <div className="text-sm whitespace-pre-wrap bg-background/80 rounded-md p-3 border border-border">
          {feedback}
        </div>
      )}
    </Card>
  );
}