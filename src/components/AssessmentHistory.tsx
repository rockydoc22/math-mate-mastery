import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface AssessmentResult {
  id: string;
  assessment_type: string;
  result_type: string;
  raw_scores: Record<string, number>;
  result_data: Record<string, unknown>;
  completed_at: string;
}

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  mbti: { label: "MBTI", icon: "🧠" },
  disc: { label: "DISC", icon: "🎯" },
  enneagram: { label: "Enneagram", icon: "🔢" },
  strengths: { label: "CliftonStrengths", icon: "💪" },
  big_five: { label: "Big Five", icon: "⭐" },
  eq: { label: "Emotional Intelligence", icon: "❤️" },
  learning: { label: "Learning Style", icon: "📚" },
};

export const AssessmentHistory = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("personality_results")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(20);
      setResults((data as AssessmentResult[]) || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("personality_results").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    } else {
      setResults((r) => r.filter((x) => x.id !== id));
      toast({ title: "Result deleted" });
    }
  };

  if (loading) return null;

  const meta = (type: string) => TYPE_LABELS[type] || { label: type, icon: "📋" };

  return (
    <Card className="p-6">
      <h3 className="font-semibold flex items-center gap-2 mb-4">
        <ScrollText className="w-5 h-5 text-primary" />
        Assessment History ({results.length})
      </h3>
      {results.length === 0 ? (
        <p className="text-sm text-muted-foreground">No assessments completed yet. Take a personality quiz to see your results here!</p>
      ) : (
        <div className="space-y-3">
          {results.map((r) => {
            const m = meta(r.assessment_type);
            return (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.label}</p>
                  <p className="text-xs text-muted-foreground">
                    Result: <span className="font-medium text-foreground">{r.result_type}</span>
                    {" · "}
                    {format(new Date(r.completed_at), "MMM d, yyyy")}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(r.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
