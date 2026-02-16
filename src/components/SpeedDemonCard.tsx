import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SPEED_RUN_KEY = "speed_run_best_qpm";

interface SpeedDemonCardProps {
  examType?: string;
}

interface BestScores {
  [key: string]: number;
}

export const SpeedDemonCard = ({ examType = "sat" }: SpeedDemonCardProps) => {
  const [bests, setBests] = useState<BestScores>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SPEED_RUN_KEY);
      if (stored) setBests(JSON.parse(stored));
    } catch {
      setBests({});
    }
  }, []);

  const challenges = [
    { label: "Sprint 5", count: 5, time: 90, desc: "5 questions in 90s" },
    { label: "Blitz 10", count: 10, time: 150, desc: "10 questions in 2.5 min" },
    { label: "Marathon 25", count: 25, time: 450, desc: "25 questions in 7.5 min" },
  ];

  return (
    <Card className="p-4 border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-amber-500" />
        <h3 className="font-semibold text-sm">Speed Demon Challenges</h3>
      </div>

      <div className="space-y-2">
        {challenges.map(c => {
          const bestKey = `speed_${c.count}`;
          const best = bests[bestKey];
          return (
            <Link
              key={c.count}
              to={`/quiz?subject=both&count=${c.count}&difficulty=all&timer=true`}
            >
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">⚡ {c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <div className="text-right">
                  {best ? (
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-500" />
                      <span className="text-xs font-bold text-amber-500">{best} QPM</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">No record</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};
