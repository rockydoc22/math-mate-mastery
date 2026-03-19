import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rankChallengeMode, ChallengeMode, UserPerformance } from "@/lib/weeklyChallengeEngine";

export type ChallengeModeCardProps = {
  users: UserPerformance[];
};

const modeLabels: Record<ChallengeMode, string> = {
  beat_your_best: "Beat Your Best",
  accuracy_challenge: "Accuracy Challenge",
  speed_run: "Speed Run",
  survival_weekend: "Survival Weekend",
  improvement_race: "Improvement Race",
};

export default function ChallengeModeCard({ users }: ChallengeModeCardProps) {
  const [mode, setMode] = useState<ChallengeMode>("improvement_race");
  const ranked = useMemo(() => rankChallengeMode(mode, users).slice(0, 10), [mode, users]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Challenge Leaderboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multiple ways to compete.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(modeLabels).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value as ChallengeMode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                mode === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {ranked.map((entry) => (
          <div key={entry.userId} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold">
                #{entry.rank}
              </div>
              <div className="text-2xl">{entry.avatarEmoji ?? "🎓"}</div>
              <div>
                <div className="font-semibold text-foreground">{entry.username}</div>
                <div className="text-xs text-muted-foreground">
                  Score {entry.totalScore} · Accuracy {Math.round(entry.accuracy * 100)}%
                </div>
              </div>
            </div>
            <Badge variant="secondary">{entry.displayScore} {entry.label}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
