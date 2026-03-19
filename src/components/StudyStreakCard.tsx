import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStreakSummary, StreakProgress } from "@/lib/streakRewards";

export type StudyStreakCardProps = {
  progress: StreakProgress;
  onLogStudy?: () => void;
};

export default function StudyStreakCard({ progress, onLogStudy }: StudyStreakCardProps) {
  const summary = useMemo(() => getStreakSummary(progress), [progress]);
  const weekDots = Array.from({ length: 7 }, (_, i) => i < progress.daysStudiedThisWeek);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Study Streak</h2>
          <p className="mt-1 text-sm text-muted-foreground">Consistency over intensity.</p>
        </div>
        <Badge variant="secondary" className="text-orange-700 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-300">
          🔥 {progress.currentStreak} day streak
        </Badge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="text-xs text-muted-foreground">Current</div>
          <div className="mt-1 text-2xl font-bold">{progress.currentStreak}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="text-xs text-muted-foreground">Longest</div>
          <div className="mt-1 text-2xl font-bold">{progress.longestStreak}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="text-xs text-muted-foreground">Next milestone</div>
          <div className="mt-1 text-2xl font-bold">{summary.nextMilestone}</div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border p-4">
        <div className="text-sm font-semibold text-foreground">Weekly Goal</div>
        <div className="mt-3 flex gap-2">
          {weekDots.map((done, index) => (
            <div key={index} className={`h-4 flex-1 rounded-full ${done ? "bg-green-500" : "bg-muted"}`} />
          ))}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {summary.weeklyGoalRemaining === 0
            ? "Weekly goal completed."
            : `${summary.weeklyGoalRemaining} study day(s) left to hit this week's goal.`}
        </div>
      </div>

      {summary.reward && (
        <div className="mt-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
          <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">Milestone Reward Unlocked</div>
          <div className="mt-2 text-lg font-bold text-amber-900 dark:text-amber-200">
            {summary.reward.badge} {summary.reward.title}
          </div>
          <div className="mt-1 text-sm text-amber-800 dark:text-amber-300">{summary.reward.description}</div>
          <div className="mt-2 text-sm font-semibold text-amber-900 dark:text-amber-200">+{summary.reward.coins} coins</div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <p className="max-w-xl text-sm text-muted-foreground">{summary.encouragement}</p>
        <Button onClick={onLogStudy}>Log Study</Button>
      </div>
    </Card>
  );
}
