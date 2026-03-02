import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Crown, Timer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface TournamentEntry {
  user_id: string;
  username: string;
  avatar_emoji: string;
  correct_count: number;
  total_count: number;
}

function getWeekBounds(): { start: string; end: string; daysLeft: number } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  const daysLeft = Math.ceil((sunday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    start: monday.toISOString(),
    end: sunday.toISOString(),
    daysLeft,
  };
}

export function WeeklyTournament() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<TournamentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const week = getWeekBounds();

  useEffect(() => {
    const fetchWeeklyScores = async () => {
      // Get this week's question attempts with user profiles
      const { data } = await supabase
        .from("question_attempts")
        .select("user_id, is_correct")
        .gte("created_at", week.start)
        .lte("created_at", week.end);

      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }

      // Aggregate by user
      const userMap = new Map<string, { correct: number; total: number }>();
      for (const row of data) {
        const entry = userMap.get(row.user_id) || { correct: 0, total: 0 };
        entry.total++;
        if (row.is_correct) entry.correct++;
        userMap.set(row.user_id, entry);
      }

      // Fetch profiles for these users
      const userIds = [...userMap.keys()];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_emoji, show_on_leaderboards")
        .in("id", userIds);

      const results: TournamentEntry[] = [];
      for (const [userId, stats] of userMap.entries()) {
        const profile = profiles?.find(p => p.id === userId);
        if (profile && profile.show_on_leaderboards) {
          results.push({
            user_id: userId,
            username: profile.username,
            avatar_emoji: profile.avatar_emoji || '👤',
            correct_count: stats.correct,
            total_count: stats.total,
          });
        }
      }

      results.sort((a, b) => b.correct_count - a.correct_count);
      setEntries(results.slice(0, 10));
      setLoading(false);
    };

    fetchWeeklyScores();
  }, []);

  const myRank = entries.findIndex(e => e.user_id === user?.id) + 1;
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <Card className="p-4 mb-4 border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-foreground">Weekly Tournament</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Timer className="w-3 h-3" />
          <span>{week.daysLeft}d left</span>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-muted-foreground text-center py-4">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          No activity yet this week. Be the first to compete!
        </p>
      ) : (
        <div className="space-y-1.5">
          {entries.slice(0, 5).map((entry, idx) => {
            const isMe = entry.user_id === user?.id;
            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                  isMe ? 'bg-primary/10 border border-primary/20' : ''
                } ${idx < 3 ? 'font-medium' : ''}`}
              >
                <span className="w-6 text-center font-bold">
                  {idx < 3 ? medals[idx] : `${idx + 1}`}
                </span>
                <span className="text-base">{entry.avatar_emoji}</span>
                <span className="flex-1 truncate text-foreground">
                  {entry.username}
                  {isMe && <span className="text-xs text-primary ml-1">(you)</span>}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {entry.correct_count} ✓
                </span>
              </div>
            );
          })}
        </div>
      )}

      {myRank > 5 && (
        <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground text-center">
          Your rank: <span className="font-bold text-foreground">#{myRank}</span>
        </div>
      )}

      {myRank === 0 && entries.length > 0 && (
        <p className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground text-center">
          Answer questions this week to join the tournament!
        </p>
      )}
    </Card>
  );
}
