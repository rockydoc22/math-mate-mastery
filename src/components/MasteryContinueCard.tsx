import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMasteryGoals } from "@/hooks/useMasteryGoals";

export function MasteryContinueCard() {
  const navigate = useNavigate();
  const { activeGoals, removeGoal, loading } = useMasteryGoals();
  if (loading || !activeGoals.length) return null;

  const startDose = (skill: string, domain: string | null, dose: number) => {
    const params = new URLSearchParams();
    params.set("subject", domain === "english" ? "english" : domain === "science" ? "science" : "math");
    params.set("skill", skill);
    params.set("count", String(dose));
    params.set("mastery", "1");
    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <Card className="p-4 mb-4 border-2 border-primary/40 bg-primary/5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-sm">Continue Mastery</h3>
        <span className="ml-auto text-[10px] text-muted-foreground">{activeGoals.length} active</span>
      </div>
      <div className="space-y-3">
        {activeGoals.slice(0, 3).map(g => {
          const pct = Math.min(100, Math.round((g.correct_count / Math.max(1, g.target)) * 100));
          return (
            <div key={g.id} className="rounded-lg bg-background p-3 border">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{g.skill}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {g.correct_count} / {g.target} correct · {g.daily_dose}/day
                  </p>
                </div>
                <button
                  onClick={() => removeGoal(g.id)}
                  className="text-muted-foreground hover:text-foreground p-1"
                  aria-label="Remove goal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <Progress value={pct} className="h-1.5 mb-2" />
              <Button size="sm" className="w-full" onClick={() => startDose(g.skill, g.domain, g.daily_dose)}>
                Start today's dose · {g.daily_dose} questions
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}