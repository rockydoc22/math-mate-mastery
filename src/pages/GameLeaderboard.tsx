import { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { useAuth } from "@/hooks/useAuth";

// Seed rivals so a solo learner still sees a real leaderboard.
// These are display-only; a Cloud-backed leaderboard can replace this later
// without changing the UI.
const SEED_RIVALS = [
  { name: "Maya",   emoji: "🦊", points: 2480, streak: 22 },
  { name: "Leo",    emoji: "🚀", points: 2115, streak: 18 },
  { name: "Nina",   emoji: "🌟", points: 1980, streak: 15 },
  { name: "Kai",    emoji: "🐉", points: 1720, streak: 12 },
  { name: "Priya",  emoji: "🦋", points: 1550, streak: 10 },
  { name: "Sam",    emoji: "🦄", points: 1420, streak: 9 },
  { name: "Zoe",    emoji: "🐼", points: 1200, streak: 8 },
  { name: "Milo",   emoji: "🐺", points: 1050, streak: 7 },
  { name: "Ava",    emoji: "🌈", points: 940, streak: 6 },
  { name: "Jax",    emoji: "🐙", points: 820, streak: 5 },
  { name: "Riley",  emoji: "🦁", points: 780, streak: 5 },
  { name: "Nova",   emoji: "🌸", points: 720, streak: 4 },
  { name: "Theo",   emoji: "🦖", points: 660, streak: 4 },
  { name: "Iris",   emoji: "🐬", points: 600, streak: 3 },
  { name: "Rex",    emoji: "🦍", points: 540, streak: 3 },
  { name: "Poppy",  emoji: "🐝", points: 480, streak: 2 },
  { name: "Finn",   emoji: "🐳", points: 420, streak: 2 },
  { name: "Lila",   emoji: "🎀", points: 360, streak: 2 },
  { name: "Otto",   emoji: "🦉", points: 300, streak: 1 },
  { name: "Eve",    emoji: "🍄", points: 260, streak: 1 },
];

const PAGE_SIZE = 10;

export default function GameLeaderboard() {
  const { stats } = useGameZoneStats();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<"points" | "streak">("points");
  const [page, setPage] = useState(0);

  const rows = useMemo(() => {
    const you = {
      name: user?.email?.split("@")[0] ?? "You",
      emoji: "🎯",
      points: stats.totalPoints,
      streak: stats.bestStreak,
      isYou: true,
    };
    const combined = [...SEED_RIVALS.map((r) => ({ ...r, isYou: false })), you];
    combined.sort((a, b) => (sortBy === "points" ? b.points - a.points : b.streak - a.streak));
    return combined;
  }, [user?.email, stats.totalPoints, stats.bestStreak, sortBy]);

  const youRank = rows.findIndex((r) => r.isYou) + 1;
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const paged = rows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <SEO title="Game Zone Leaderboard" description="See how your Game Zone points and streaks stack up. Sort by points or best streak." path="/games/leaderboard" />
            <GameZoneHeader />
      <main className="max-w-lg mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Global Leaderboard
          </h1>
        </div>

        <Card className="p-3 flex items-center justify-between text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Your rank</div>
            <div className="text-xl font-bold text-primary">#{youRank}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Points · Best streak</div>
            <div className="font-semibold tabular-nums">{stats.totalPoints} · {stats.bestStreak}</div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortBy === "points" ? "default" : "outline"}
            onClick={() => { setSortBy("points"); setPage(0); }}
          >
            By Points
          </Button>
          <Button
            size="sm"
            variant={sortBy === "streak" ? "default" : "outline"}
            onClick={() => { setSortBy("streak"); setPage(0); }}
          >
            By Streak
          </Button>
        </div>

        <Card className="divide-y">
          {paged.map((r, i) => {
            const rank = page * PAGE_SIZE + i + 1;
            const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
            return (
              <div
                key={rank}
                className={`flex items-center gap-3 p-3 ${r.isYou ? "bg-primary/10" : ""}`}
              >
                <div className="w-8 text-center text-sm font-bold tabular-nums">
                  {medal ?? `#${rank}`}
                </div>
                <div className="text-2xl">{r.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {r.name} {r.isYou && <span className="text-xs text-primary">(you)</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">Streak {r.streak}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold tabular-nums">{r.points.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">pts</div>
                </div>
              </div>
            );
          })}
        </Card>

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ← Prev
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Next →
          </Button>
        </div>
      </main>
    </div>
  );
}