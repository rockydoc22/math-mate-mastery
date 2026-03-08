import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, TrendingUp, TrendingDown, Target, BarChart3, Brain, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface SkillBreakdown {
  domain: string;
  skill: string;
  total: number;
  correct: number;
  pct: number;
}

interface DailyAccuracy {
  date: string;
  total: number;
  correct: number;
  pct: number;
}

interface DifficultyBand {
  label: string;
  range: string;
  total: number;
  correct: number;
  pct: number;
}

const ReviewAnalytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{ math: number; english: number } | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      const [attRes, ratRes] = await Promise.all([
        supabase.from("question_attempts").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
        supabase.from("skill_ratings").select("math_rating, english_rating").eq("user_id", user.id).single(),
      ]);
      setAttempts(attRes.data || []);
      if (ratRes.data) setRatings({ math: ratRes.data.math_rating, english: ratRes.data.english_rating });
      setLoading(false);
    };
    fetch();
  }, [user]);

  // Derived analytics
  const analytics = useMemo(() => {
    if (attempts.length === 0) return null;

    // Overall
    const total = attempts.length;
    const correct = attempts.filter(a => a.is_correct).length;
    const overallPct = Math.round((correct / total) * 100);

    // Last 7 days vs prior 7 days
    const now = Date.now();
    const weekAgo = now - 7 * 86400000;
    const twoWeeksAgo = now - 14 * 86400000;
    const thisWeek = attempts.filter(a => new Date(a.created_at).getTime() >= weekAgo);
    const lastWeek = attempts.filter(a => {
      const t = new Date(a.created_at).getTime();
      return t >= twoWeeksAgo && t < weekAgo;
    });
    const thisWeekPct = thisWeek.length > 0 ? Math.round((thisWeek.filter(a => a.is_correct).length / thisWeek.length) * 100) : 0;
    const lastWeekPct = lastWeek.length > 0 ? Math.round((lastWeek.filter(a => a.is_correct).length / lastWeek.length) * 100) : 0;
    const trend = thisWeekPct - lastWeekPct;

    // Daily accuracy (last 14 days)
    const dailyMap = new Map<string, { total: number; correct: number }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * 86400000).toISOString().split("T")[0];
      dailyMap.set(d, { total: 0, correct: 0 });
    }
    attempts.forEach(a => {
      const d = a.created_at.split("T")[0];
      if (dailyMap.has(d)) {
        const e = dailyMap.get(d)!;
        e.total++;
        if (a.is_correct) e.correct++;
      }
    });
    const daily: DailyAccuracy[] = Array.from(dailyMap.entries()).map(([date, v]) => ({
      date,
      ...v,
      pct: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
    }));

    // Skill breakdown
    const skillMap = new Map<string, { total: number; correct: number }>();
    attempts.forEach(a => {
      const key = `${a.domain}|${a.skill}`;
      if (!skillMap.has(key)) skillMap.set(key, { total: 0, correct: 0 });
      const e = skillMap.get(key)!;
      e.total++;
      if (a.is_correct) e.correct++;
    });
    const skills: SkillBreakdown[] = Array.from(skillMap.entries())
      .map(([key, v]) => {
        const [domain, skill] = key.split("|");
        return { domain, skill, ...v, pct: Math.round((v.correct / v.total) * 100) };
      })
      .sort((a, b) => a.pct - b.pct);

    // Difficulty bands
    const bands: DifficultyBand[] = [
      { label: "Easy", range: "1-3", total: 0, correct: 0, pct: 0 },
      { label: "Medium", range: "4-6", total: 0, correct: 0, pct: 0 },
      { label: "Hard", range: "7-8", total: 0, correct: 0, pct: 0 },
      { label: "Expert", range: "9-10", total: 0, correct: 0, pct: 0 },
    ];
    attempts.forEach(a => {
      const d = a.difficulty_rating || 5;
      const idx = d <= 3 ? 0 : d <= 6 ? 1 : d <= 8 ? 2 : 3;
      bands[idx].total++;
      if (a.is_correct) bands[idx].correct++;
    });
    bands.forEach(b => { b.pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0; });

    // Weakest skills (bottom 5)
    const weakest = skills.filter(s => s.total >= 3).slice(0, 5);
    // Strongest skills (top 5)
    const strongest = skills.filter(s => s.total >= 3).slice(-5).reverse();

    return { total, correct, overallPct, thisWeekPct, lastWeekPct, trend, daily, skills, bands, weakest, strongest, thisWeekCount: thisWeek.length };
  }, [attempts]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center space-y-3">
          <Brain className="w-10 h-10 text-primary mx-auto" />
          <h2 className="text-lg font-bold text-foreground">Sign in to view analytics</h2>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center space-y-3">
          <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto" />
          <h2 className="text-lg font-bold text-foreground">No data yet</h2>
          <p className="text-sm text-muted-foreground">Answer some questions to see your analytics.</p>
          <Link to="/quiz"><Button>Start Practicing</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8 pb-28 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
          <h1 className="text-2xl font-bold text-primary">Review Analytics</h1>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Overall Accuracy"
            value={`${analytics.overallPct}%`}
            sub={`${analytics.correct}/${analytics.total}`}
          />
          <StatCard
            label="This Week"
            value={`${analytics.thisWeekPct}%`}
            sub={`${analytics.thisWeekCount} Qs`}
            trend={analytics.trend}
          />
          {ratings && (
            <>
              <StatCard label="Math Rating" value={`${ratings.math}`} />
              <StatCard label="English Rating" value={`${ratings.english}`} />
            </>
          )}
        </div>

        {/* Accuracy Trend (sparkline-style bars) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Accuracy Trend (14 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-24">
              {analytics.daily.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className={`w-full rounded-t transition-all ${
                      d.total === 0 ? "bg-muted" : d.pct >= 70 ? "bg-success" : d.pct >= 40 ? "bg-orange-400" : "bg-destructive"
                    }`}
                    style={{ height: `${Math.max(4, d.total > 0 ? d.pct : 4)}%` }}
                    title={`${d.date}: ${d.pct}% (${d.correct}/${d.total})`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{analytics.daily[0]?.date.slice(5)}</span>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Bands */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4" /> Accuracy by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.bands.map(band => (
              <div key={band.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{band.label} ({band.range})</span>
                  <span className="text-muted-foreground">{band.pct}% ({band.correct}/{band.total})</span>
                </div>
                <Progress
                  value={band.pct}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weakest & Strongest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                <TrendingDown className="w-4 h-4" /> Weakest Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {analytics.weakest.length === 0 ? (
                <p className="text-xs text-muted-foreground">Need more data (3+ attempts per skill)</p>
              ) : analytics.weakest.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground truncate max-w-[200px]">{s.skill}</span>
                  <span className={`font-mono font-bold ${s.pct < 50 ? "text-destructive" : "text-orange-500"}`}>
                    {s.pct}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-success">
                <TrendingUp className="w-4 h-4" /> Strongest Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {analytics.strongest.length === 0 ? (
                <p className="text-xs text-muted-foreground">Need more data</p>
              ) : analytics.strongest.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground truncate max-w-[200px]">{s.skill}</span>
                  <span className="font-mono font-bold text-success">{s.pct}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Small stat card component
const StatCard = ({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card border border-border rounded-xl p-4 space-y-1"
  >
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="flex items-center gap-2">
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {trend !== undefined && trend !== 0 && (
        <span className={`flex items-center text-xs font-medium ${trend > 0 ? "text-success" : "text-destructive"}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
  </motion.div>
);

export default ReviewAnalytics;
