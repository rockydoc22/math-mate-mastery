import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingDown, Sparkles, Loader2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMasteryGoals } from "@/hooks/useMasteryGoals";

interface Cluster {
  id: string;
  exam_family: string;
  section: string | null;
  domain: string | null;
  skill: string;
  accuracy: number;
  attempts_count: number;
  priority_score: number;
  mastery_level: number;
}

interface Props {
  examFamily?: string;
  limit?: number;
  title?: string;
  compact?: boolean;
}

/**
 * Unified "Weak Areas & Practice" surface. Reads adaptive_weakness_clusters,
 * which is populated automatically after every quiz across every test.
 */
export function WeakAreasPanel({ examFamily, limit = 5, title = "Weak Areas — Practice & Master", compact }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { activeGoals, createGoal } = useMasteryGoals();
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      let q = supabase
        .from("adaptive_weakness_clusters")
        .select("id, exam_family, section, domain, skill, accuracy, attempts_count, priority_score, mastery_level")
        .eq("user_id", user.id)
        .gte("attempts_count", 3)
        .lt("mastery_level", 3)
        .order("priority_score", { ascending: false })
        .limit(limit);
      if (examFamily) q = q.eq("exam_family", examFamily);
      const { data } = await q;
      setClusters((data as Cluster[]) || []);
      setLoading(false);
    })();
  }, [user, examFamily, limit]);

  const isMastering = (skill: string, domain: string | null) =>
    activeGoals.some(g => g.skill === skill && (g.domain ?? null) === domain);

  const startPractice = (c: Cluster) => {
    const params = new URLSearchParams();
    params.set("subject", c.domain === "english" ? "english" : c.domain === "science" ? "science" : "math");
    params.set("skill", c.skill);
    params.set("count", "10");
    navigate(`/quiz?${params.toString()}`);
  };

  const startMastery = async (c: Cluster) => {
    setStarting(c.id);
    const goal = await createGoal({
      skill: c.skill, domain: c.domain, section: c.section, exam_family: c.exam_family,
      target: 50, daily_dose: 20,
    });
    setStarting(null);
    if (goal) {
      toast.success(`Mastery goal set: 50 correct on "${c.skill}"`, {
        description: "20 questions per day — you'll see a Continue Mastery card on your home screen.",
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-5 mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading weak areas…
      </Card>
    );
  }

  if (!clusters.length) {
    return compact ? null : (
      <Card className="p-5 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold">No weak areas yet</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Answer a few more questions on any test — we need 3+ attempts per skill to detect a real weakness.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingDown className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">
        {clusters.map(c => {
          const mastering = isMastering(c.skill, c.domain);
          return (
            <div key={c.id} className="rounded-lg border p-3 bg-card">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{c.skill}</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {(c.exam_family || "exam").toUpperCase()} · {c.domain || c.section || "general"} ·
                    {" "}{Math.round((c.accuracy || 0) * 100)}% over {c.attempts_count} attempts
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => startPractice(c)} className="gap-1">
                  <Target className="w-3 h-3" /> Practice 10
                </Button>
                <Button
                  size="sm"
                  variant={mastering ? "secondary" : "default"}
                  disabled={mastering || starting === c.id}
                  onClick={() => startMastery(c)}
                  className="gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  {mastering ? "Mastery active" : "Master this (50 correct)"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}