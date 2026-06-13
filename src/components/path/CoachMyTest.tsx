import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ListChecks, Loader2, Wand2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { NationalTest } from "@/data/usaNationalTests";

const COACH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/study-coach`;

interface Props {
  target: NationalTest;
  daysUntil: number | null;
  focus: string;
}

export default function CoachMyTest({ target, daysUntil, focus }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<"plan" | "next" | null>(null);
  const [output, setOutput] = useState("");

  const run = async (mode: "plan" | "next") => {
    if (!user) {
      toast.error("Sign in to use the AI Coach");
      return;
    }
    setLoading(mode);
    setOutput("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(COACH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          mode,
          recentStats: { answered: 0, correct: 0, accuracy: 0, timeSpent: "n/a" },
          weakSkills: [`${target.shortName} weak areas (auto-detect)`],
          strongSkills: [],
          missedQuestion: null,
          // extra context the prompt-builder ignores but logs accept
          context: {
            target: target.name,
            shortName: target.shortName,
            stage: target.stage,
            daysUntil,
            focus,
          },
        }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
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
            if (delta) setOutput((o) => o + delta);
          } catch {}
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Coach unavailable");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="p-4 border-accent/40 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <div className="text-sm font-bold flex items-center gap-1">
            <Wand2 className="w-4 h-4 text-primary" /> Coach My {target.shortName}
          </div>
          <div className="text-xs text-muted-foreground">
            AI-personalized to your test{daysUntil !== null ? ` · ${daysUntil} days out` : ""}.
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={loading !== null} onClick={() => run("next")}>
            {loading === "next" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            <span className="ml-1">Next step</span>
          </Button>
          <Button size="sm" disabled={loading !== null} onClick={() => run("plan")}>
            {loading === "plan" ? <Loader2 className="w-3 h-3 animate-spin" /> : <ListChecks className="w-3 h-3" />}
            <span className="ml-1">Plan my week</span>
          </Button>
        </div>
      </div>
      {output && (
        <div className="text-sm whitespace-pre-wrap bg-background/60 rounded-md p-3 border border-border max-h-72 overflow-auto">
          {output}
        </div>
      )}
    </Card>
  );
}