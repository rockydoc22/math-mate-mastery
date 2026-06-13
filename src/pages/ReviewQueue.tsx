import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Repeat, Calendar, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getTest } from "@/data/usaNationalTests";

interface MissRow {
  question_id: string;
  domain: string | null;
  skill: string | null;
  created_at: string;
  is_correct: boolean;
}

interface Bucket {
  key: string;
  label: string;
  domain: string;
  skill: string;
  count: number;
  oldestDays: number;
}

function loadTargetTest(): string | null {
  try {
    const raw = localStorage.getItem("alpha_path_v1");
    if (!raw) return null;
    return JSON.parse(raw).targetTestId ?? null;
  } catch { return null; }
}

/**
 * Cross-mode spaced-repetition queue. Pulls every wrong answer in the last
 * 60 days, buckets by (domain, skill), and prioritises the bucket with the
 * most misses whose oldest miss is at least 3 days old (the classic SM-2
 * "due for review" interval). Test-date crunch shortens the interval.
 */
export default function ReviewQueue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<MissRow[]>([]);
  const [loading, setLoading] = useState(true);
  const targetId = loadTargetTest();
  const target = targetId ? getTest(targetId) : undefined;

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const since = new Date(Date.now() - 60 * 86400000).toISOString();
      const { data } = await supabase
        .from("question_attempts")
        .select("question_id, domain, skill, created_at, is_correct")
        .eq("user_id", user.id)
        .eq("is_correct", false)
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(500);
      setRows((data as MissRow[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  // Test-date-aware: if test is within 14 days, queue everything (interval=0).
  const minIntervalDays = useMemo(() => {
    try {
      const raw = localStorage.getItem("alpha_path_v1");
      const date = raw ? JSON.parse(raw).testDate : null;
      if (!date) return 3;
      const days = Math.round((new Date(date + "T00:00:00").getTime() - Date.now()) / 86400000);
      if (days <= 7) return 0;
      if (days <= 14) return 1;
      return 3;
    } catch { return 3; }
  }, []);

  const buckets: Bucket[] = useMemo(() => {
    const map = new Map<string, Bucket>();
    const now = Date.now();
    for (const r of rows) {
      const domain = r.domain ?? "general";
      const skill = r.skill ?? "mixed";
      const key = `${domain}::${skill}`;
      const ageDays = Math.floor((now - new Date(r.created_at).getTime()) / 86400000);
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
        existing.oldestDays = Math.max(existing.oldestDays, ageDays);
      } else {
        map.set(key, {
          key,
          label: `${domain}${skill !== "mixed" ? ` · ${skill}` : ""}`,
          domain, skill,
          count: 1,
          oldestDays: ageDays,
        });
      }
    }
    return Array.from(map.values())
      .filter((b) => b.oldestDays >= minIntervalDays)
      .sort((a, b) => b.count - a.count || b.oldestDays - a.oldestDays);
  }, [rows, minIntervalDays]);

  const totalDue = buckets.reduce((n, b) => n + b.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-20">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Go back" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Repeat className="w-6 h-6 text-primary" /> Review Queue
            </h1>
            <p className="text-sm text-muted-foreground">
              Spaced repetition across every mode you've played.
              {target && <> Tuned to <strong>{target.shortName}</strong>.</>}
            </p>
          </div>
        </div>

        <Card className="p-4 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Due today</div>
              <div className="text-3xl font-extrabold">{totalDue}</div>
              <div className="text-xs text-muted-foreground">
                Interval: every {minIntervalDays || "<1"} day{minIntervalDays === 1 ? "" : "s"}
                {minIntervalDays === 0 && " · crunch mode"}
              </div>
            </div>
            <Calendar className="w-10 h-10 text-primary/60" />
          </div>
        </Card>

        {loading && <Card className="p-6 text-center text-sm text-muted-foreground">Loading your misses…</Card>}

        {!loading && buckets.length === 0 && (
          <Card className="p-6 text-center text-sm text-muted-foreground space-y-3">
            <Brain className="w-8 h-8 mx-auto text-primary" />
            <div>Nothing is due. Keep playing — we'll re-surface misses after they cool down.</div>
            <Button asChild size="sm"><Link to="/path">Back to my Path</Link></Button>
          </Card>
        )}

        {!loading && buckets.length > 0 && (
          <div className="space-y-2">
            {buckets.slice(0, 12).map((b, i) => (
              <Card key={b.key} className="p-3 flex items-center gap-3 hover:border-primary/60 transition">
                <div className="text-xs font-bold w-6 text-muted-foreground">#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{b.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {b.count} miss{b.count === 1 ? "" : "es"} · oldest {b.oldestDays}d ago
                  </div>
                </div>
                <Badge variant={b.count >= 5 ? "destructive" : "secondary"} className="text-[10px]">
                  {b.count >= 5 ? "High priority" : "Review"}
                </Badge>
                <Button asChild size="sm">
                  <Link to="/weakness-retest">Drill</Link>
                </Button>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground pt-4">
          Misses get queued from <em>every</em> mode — daily, duels, full quizzes, AP, K-12, pro exams.
        </div>
      </div>
    </div>
  );
}