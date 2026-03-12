import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

interface HistoryEntry {
  id: string;
  completed_at: string;
  result_type: string;
  result_data: any;
  raw_scores: any;
}

export const DISCHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("personality_results")
        .select("id, completed_at, result_type, result_data, raw_scores")
        .eq("user_id", user.id)
        .eq("assessment_type", "disc")
        .order("completed_at", { ascending: false })
        .limit(10);
      setHistory(data || []);
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  if (loading || history.length === 0) return null;

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-bold text-sm text-foreground">📊 Your DISC History (Last {history.length})</h3>
      <div className="space-y-2">
        {history.map((entry) => {
          const pcts = (entry.result_data as any)?.percentages || {};
          return (
            <div key={entry.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">
                {format(new Date(entry.completed_at), "MMM d, yyyy")}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{entry.result_type}</span>
                <div className="flex gap-1">
                  {Object.entries(pcts).map(([k, v]) => (
                    <span key={k} className="text-muted-foreground">{k}:{String(v)}%</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
