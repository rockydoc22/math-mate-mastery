import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Flame, Trophy, Bell, Heart, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import DailyReminderSetup from "@/components/DailyReminderSetup";

interface KidRow {
  id: string;
  display_name: string;
  avatar_emoji: string | null;
  grade_level: string | null;
}

interface KidWeek {
  kidId: string;
  attempts: number;
  correct: number;
  daysActive: number;
}

export default function FamilyHub() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [kids, setKids] = useState<KidRow[]>([]);
  const [stats, setStats] = useState<Record<string, KidWeek>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const { data: kidRows } = await supabase
        .from("kid_profiles")
        .select("id, display_name, avatar_emoji, grade_level")
        .eq("parent_id", user.id)
        .order("created_at");
      const list = (kidRows || []) as KidRow[];
      setKids(list);

      const since = new Date(Date.now() - 7 * 86400000).toISOString();
      const map: Record<string, KidWeek> = {};
      await Promise.all(list.map(async (k) => {
        const { data } = await supabase
          .from("question_attempts")
          .select("is_correct, created_at")
          .eq("kid_profile_id", k.id)
          .gte("created_at", since);
        const rows = data || [];
        const days = new Set(rows.map((r: any) => r.created_at.slice(0, 10))).size;
        map[k.id] = {
          kidId: k.id,
          attempts: rows.length,
          correct: rows.filter((r: any) => r.is_correct).length,
          daysActive: days,
        };
      }));
      setStats(map);
      setLoading(false);
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 text-center max-w-sm">
          <p className="mb-4">Sign in to view your Family Hub.</p>
          <Link to="/auth"><Button>Sign in</Button></Link>
        </Card>
      </div>
    );
  }

  const max = Math.max(1, ...Object.values(stats).map(s => s.attempts));

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO title="Family Hub — AlphaOmega" description="Side-by-side weekly progress for everyone in your family." path="/family" />
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <Users className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold">Family Hub</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> Family-safe content
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Heart className="w-3 h-3" /> No ads, no tracking
          </span>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : kids.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="mb-3">No kids added yet.</p>
            <Link to="/parent"><Button>Add kids in Parent Dashboard</Button></Link>
          </Card>
        ) : (
          <>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">This week — side by side</h2>
            <div className="space-y-3 mb-8">
              {kids.map(k => {
                const s = stats[k.id] || { attempts: 0, correct: 0, daysActive: 0, kidId: k.id };
                const acc = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
                return (
                  <Card key={k.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{k.avatar_emoji || "🧑‍🎓"}</span>
                        <div>
                          <div className="font-semibold">{k.display_name}</div>
                          {k.grade_level && <div className="text-xs text-muted-foreground">{k.grade_level}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500" />{s.daysActive}d</span>
                        <span className="inline-flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" />{acc}%</span>
                      </div>
                    </div>
                    <Progress value={(s.attempts / max) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{s.attempts} questions answered</div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-4 mb-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-semibold mb-1">Family Challenge of the Week</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Every family member completes at least <strong>3 days</strong> of practice. Highest combined accuracy wins bragging rights.
              </p>
              <Link to="/path"><Button size="sm">Start today's session</Button></Link>
            </Card>
          </>
        )}

        <div className="mt-2">
          <DailyReminderSetup />
        </div>
      </div>
    </div>
  );
}