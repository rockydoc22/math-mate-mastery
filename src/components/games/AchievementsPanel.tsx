import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";

type Achievement = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  progress: number; // 0..1
  unlocked: boolean;
  value: string;
};

export function AchievementsPanel() {
  const { stats, earnedBadges } = useGameZoneStats();

  const totalPlays = stats.roundsPlayed;
  const fastestMs = stats.fastestSolveMs;

  const items: Achievement[] = [
    {
      id: "streak-3",
      emoji: "🔥",
      name: "Warming Up",
      desc: "Answer 3 correct in a row",
      progress: Math.min(1, stats.bestStreak / 3),
      unlocked: stats.bestStreak >= 3,
      value: `${stats.bestStreak}/3`,
    },
    {
      id: "streak-10",
      emoji: "⚡",
      name: "Combo Master",
      desc: "Hit a 10-answer streak",
      progress: Math.min(1, stats.bestStreak / 10),
      unlocked: stats.bestStreak >= 10,
      value: `${stats.bestStreak}/10`,
    },
    {
      id: "plays-25",
      emoji: "🎮",
      name: "Regular",
      desc: "Play 25 total rounds",
      progress: Math.min(1, totalPlays / 25),
      unlocked: totalPlays >= 25,
      value: `${totalPlays}/25`,
    },
    {
      id: "plays-100",
      emoji: "🏅",
      name: "Century Club",
      desc: "Play 100 total rounds",
      progress: Math.min(1, totalPlays / 100),
      unlocked: totalPlays >= 100,
      value: `${totalPlays}/100`,
    },
    {
      id: "fast-5",
      emoji: "🏎️",
      name: "Quick Draw",
      desc: "Solve a word under 5 seconds",
      progress: fastestMs ? (fastestMs <= 5000 ? 1 : Math.max(0, 1 - (fastestMs - 5000) / 10000)) : 0,
      unlocked: !!fastestMs && fastestMs <= 5000,
      value: fastestMs ? `${(fastestMs / 1000).toFixed(1)}s` : "—",
    },
    {
      id: "points-500",
      emoji: "💎",
      name: "Point Collector",
      desc: "Reach 500 total points",
      progress: Math.min(1, stats.totalPoints / 500),
      unlocked: stats.totalPoints >= 500,
      value: `${stats.totalPoints}/500`,
    },
  ];

  const unlockedCount = items.filter((i) => i.unlocked).length + earnedBadges.length;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm">🎖️ Milestones</h2>
        <span className="text-xs text-muted-foreground">{unlockedCount} unlocked</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((a) => (
          <div
            key={a.id}
            className={`rounded-lg border p-2.5 text-left ${
              a.unlocked ? "border-primary/40 bg-primary/5" : "border-border opacity-90"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xl ${a.unlocked ? "" : "grayscale opacity-60"}`}>{a.emoji}</span>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{a.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{a.desc}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Progress value={a.progress * 100} className="h-1.5 flex-1" />
              <span className="text-[10px] tabular-nums text-muted-foreground">{a.value}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}