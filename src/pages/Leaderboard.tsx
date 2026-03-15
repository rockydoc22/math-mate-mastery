import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Flame, Medal, Crown, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaderboardEntry {
  username: string;
  avatar_emoji: string | null;
  total_score: number;
  quiz_count: number;
  avg_percentage: number;
  subject?: string;
  created_at?: string;
}

interface StreakEntry {
  username: string;
  avatar_emoji: string | null;
  current_streak: number;
  longest_streak: number;
}

type TimeFilter = "all" | "monthly" | "weekly";

const Leaderboard = () => {
  const [allScoreData, setAllScoreData] = useState<any[]>([]);
  const [streakLeaders, setStreakLeaders] = useState<StreakEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("monthly");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  useEffect(() => {
    const fetchLeaderboards = async () => {
      // Fetch raw quiz_scores with profiles for flexible filtering
      const { data: quizData } = await supabase
        .from("quiz_scores")
        .select("score, percentage, subject, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(1000);

      setAllScoreData(quizData || []);

      const { data: streakData } = await supabase
        .from("streak_leaderboard")
        .select("*");

      setStreakLeaders(
        (streakData || []).map((entry: any) => ({
          username: entry.username || "Unknown",
          avatar_emoji: entry.avatar_emoji,
          current_streak: Number(entry.current_streak) || 0,
          longest_streak: Number(entry.longest_streak) || 0,
        }))
      );

      setLoading(false);
    };

    fetchLeaderboards();
  }, []);

  // Derive filtered score leaders
  const scoreLeaders = useMemo(() => {
    let filtered = [...allScoreData];

    // Time filter
    const now = new Date();
    if (timeFilter === "weekly") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => new Date(d.created_at) >= weekAgo);
    } else if (timeFilter === "monthly") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => new Date(d.created_at) >= monthAgo);
    }

    // Subject filter
    if (subjectFilter !== "all") {
      filtered = filtered.filter(d => d.subject === subjectFilter);
    }

    // Aggregate by user_id
    const byUser: Record<string, { total_score: number; quiz_count: number; sum_pct: number; user_id: string }> = {};
    for (const row of filtered) {
      if (!byUser[row.user_id]) {
        byUser[row.user_id] = { total_score: 0, quiz_count: 0, sum_pct: 0, user_id: row.user_id };
      }
      byUser[row.user_id].total_score += Number(row.score) || 0;
      byUser[row.user_id].quiz_count += 1;
      byUser[row.user_id].sum_pct += Number(row.percentage) || 0;
    }

    return Object.values(byUser)
      .map(u => ({
        user_id: u.user_id,
        total_score: u.total_score,
        quiz_count: u.quiz_count,
        avg_percentage: u.quiz_count > 0 ? Math.round(u.sum_pct / u.quiz_count) : 0,
      }))
      .sort((a, b) => b.total_score - a.total_score)
      .slice(0, 20);
  }, [allScoreData, timeFilter, subjectFilter]);

  // Fetch usernames for the filtered leaders
  const [profileMap, setProfileMap] = useState<Record<string, { username: string; avatar_emoji: string | null }>>({});
  
  useEffect(() => {
    const userIds = scoreLeaders.map(l => l.user_id).filter(id => !profileMap[id]);
    if (userIds.length === 0) return;
    
    const fetchProfiles = async () => {
      const results: Record<string, { username: string; avatar_emoji: string | null }> = { ...profileMap };
      for (const uid of userIds) {
        const { data } = await supabase.rpc('get_leaderboard_profile', { profile_id: uid });
        if (data && data[0]) {
          results[uid] = { username: data[0].username, avatar_emoji: data[0].avatar_emoji };
        }
      }
      setProfileMap(results);
    };
    fetchProfiles();
  }, [scoreLeaders]);

  // Available subjects from data
  const subjects = useMemo(() => {
    const s = new Set(allScoreData.map(d => d.subject).filter(Boolean));
    return Array.from(s).sort();
  }, [allScoreData]);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{rank + 1}</span>;
  };

  const timeLabels: Record<TimeFilter, string> = { all: "All Time", monthly: "This Month", weekly: "This Week" };

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
          </div>
        </div>

        <Card className="p-4 bg-muted/50 border-dashed">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">How do I climb?</span>{" "}
            <Trophy className="w-3.5 h-3.5 inline text-primary" /> <strong>Top Scores</strong> ranks by total quiz points.{" "}
            <Flame className="w-3.5 h-3.5 inline text-orange-500" /> <strong>Hot Streaks</strong> ranks by consecutive days practiced.
          </p>
        </Card>

        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scores" className="gap-2">
              <Trophy className="w-4 h-4" /> Top Scores
            </TabsTrigger>
            <TabsTrigger value="streaks" className="gap-2">
              <Flame className="w-4 h-4" /> Hot Streaks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="mt-4 space-y-3">
            {/* Filters */}
            <div className="flex gap-2">
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                {(["weekly", "monthly", "all"] as TimeFilter[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      timeFilter === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {timeLabels[t]}
                  </button>
                ))}
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <Filter className="w-3 h-3 mr-1" />
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(s => (
                    <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="divide-y divide-border">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : scoreLeaders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No scores yet for this filter. Be the first! 🎯
                </div>
              ) : (
                scoreLeaders.map((entry, i) => {
                  const profile = profileMap[entry.user_id];
                  return (
                    <div
                      key={`${entry.user_id}-${i}`}
                      className={`flex items-center gap-4 p-4 ${i < 3 ? "bg-primary/5" : ""}`}
                    >
                      <div className="w-8 flex justify-center">{getRankIcon(i)}</div>
                      <div className="flex-1">
                        <p className="font-semibold">{profile?.username || "Loading..."}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.quiz_count} quizzes • {entry.avg_percentage}% avg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{entry.total_score}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  );
                })
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
