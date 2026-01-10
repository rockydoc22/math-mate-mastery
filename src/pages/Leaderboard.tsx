import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Flame, Medal, Crown } from "lucide-react";

interface LeaderboardEntry {
  username: string;
  avatar_emoji: string | null;
  total_score: number;
  quiz_count: number;
  avg_percentage: number;
}

interface StreakEntry {
  username: string;
  avatar_emoji: string | null;
  current_streak: number;
  longest_streak: number;
}

const Leaderboard = () => {
  const [scoreLeaders, setScoreLeaders] = useState<LeaderboardEntry[]>([]);
  const [streakLeaders, setStreakLeaders] = useState<StreakEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      // Fetch aggregated leaderboard data from the secure view (no user_ids exposed)
      const { data: leaderboardData } = await supabase
        .from("leaderboard_scores")
        .select("*");

      // Fetch streak leaderboard from secure view
      const { data: streakData } = await supabase
        .from("streak_leaderboard")
        .select("*");

      const scoreLeaderboard: LeaderboardEntry[] = (leaderboardData || []).map((entry: any) => ({
        username: entry.username || "Unknown",
        avatar_emoji: entry.avatar_emoji,
        total_score: Number(entry.total_score) || 0,
        quiz_count: Number(entry.quiz_count) || 0,
        avg_percentage: Number(entry.avg_percentage) || 0,
      })).slice(0, 20);

      const streakLeaderboard: StreakEntry[] = (streakData || []).map((entry: any) => ({
        username: entry.username || "Unknown",
        avatar_emoji: entry.avatar_emoji,
        current_streak: Number(entry.current_streak) || 0,
        longest_streak: Number(entry.longest_streak) || 0,
      }));

      setScoreLeaders(scoreLeaderboard);
      setStreakLeaders(streakLeaderboard);
      setLoading(false);
    };

    fetchLeaderboards();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{rank + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground">See how you stack up</p>
            <p className="text-xs text-primary font-medium mt-1">📊 Rolling 30-day Top 10</p>
          </div>
        </div>

        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scores" className="gap-2">
              <Trophy className="w-4 h-4" /> Top Scores
            </TabsTrigger>
            <TabsTrigger value="streaks" className="gap-2">
              <Flame className="w-4 h-4" /> Hot Streaks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="mt-4">
            <Card className="divide-y divide-border">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : scoreLeaders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No scores yet. Be the first! 🎯
                </div>
              ) : (
                scoreLeaders.map((entry, i) => (
                  <div
                    key={`${entry.username}-${i}`}
                    className={`flex items-center gap-4 p-4 ${i < 3 ? "bg-primary/5" : ""}`}
                  >
                    <div className="w-8 flex justify-center">{getRankIcon(i)}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{entry.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.quiz_count} quizzes • {entry.avg_percentage}% avg
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{entry.total_score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))
              )}
            </Card>
          </TabsContent>

          <TabsContent value="streaks" className="mt-4">
            <Card className="divide-y divide-border">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : streakLeaders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No streaks yet. Start practicing! 🔥
                </div>
              ) : (
                streakLeaders.map((entry, i) => (
                  <div
                    key={`${entry.username}-${i}`}
                    className={`flex items-center gap-4 p-4 ${i < 3 ? "bg-accent/5" : ""}`}
                  >
                    <div className="w-8 flex justify-center">{getRankIcon(i)}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{entry.username}</p>
                      <p className="text-sm text-muted-foreground">
                        Best: {entry.longest_streak} days
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-1">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-xl font-bold">{entry.current_streak}</span>
                    </div>
                  </div>
                ))
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
