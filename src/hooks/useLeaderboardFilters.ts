import { useCallback, useEffect, useMemo, useState } from "react";

export type LeaderboardPeriod = "week" | "month" | "all";

export type LeaderboardEntry = {
  user_id: string;
  username: string;
  avatar_emoji: string | null;
  subject: string;
  total_score: number;
};

export type SupabaseClientLike = {
  from: (table: string) => { select: (columns: string) => any };
};

function getPeriodStart(period: LeaderboardPeriod): string | null {
  if (period === "all") return null;
  const now = new Date();
  const start = new Date(now);
  if (period === "week") start.setDate(now.getDate() - 7);
  if (period === "month") start.setMonth(now.getMonth() - 1);
  return start.toISOString();
}

export function useLeaderboardFilters(supabase: SupabaseClientLike) {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [period, setPeriod] = useState<LeaderboardPeriod>("week");
  const [subject, setSubject] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedSubject = useMemo(() => subject.trim(), [subject]);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("quiz_scores")
        .select(`user_id, score, subject, created_at, profiles:user_id ( username, avatar_emoji )`);

      const periodStart = getPeriodStart(period);
      if (periodStart) query = query.gte("created_at", periodStart);
      if (normalizedSubject !== "all") query = query.eq("subject", normalizedSubject);

      const { data: rows, error: queryError } = await query;
      if (queryError) throw queryError;

      const grouped = new Map<string, LeaderboardEntry>();

      for (const row of rows ?? []) {
        const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
        const key = `${row.user_id}:${row.subject}`;
        const existing = grouped.get(key);

        if (existing) {
          existing.total_score += Number(row.score ?? 0);
        } else {
          grouped.set(key, {
            user_id: row.user_id,
            username: profile?.username ?? "Unknown",
            avatar_emoji: profile?.avatar_emoji ?? null,
            subject: row.subject ?? "General",
            total_score: Number(row.score ?? 0),
          });
        }
      }

      const next = [...grouped.values()].sort((a, b) => b.total_score - a.total_score).slice(0, 20);
      setData(next);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, [normalizedSubject, period, supabase]);

  useEffect(() => {
    void fetchLeaderboard();
  }, [fetchLeaderboard]);

  return { data, period, setPeriod, subject, setSubject, loading, error, refresh: fetchLeaderboard };
}
