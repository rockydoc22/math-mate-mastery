import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Target, Clock, Skull, Swords, Flame, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface NextAction {
  label: string;
  description: string;
  path: string;
  icon: typeof Zap;
  gradient: string;
}

export function NextBestActionWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [action, setAction] = useState<NextAction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    computeAction();
  }, [user]);

  const computeAction = async () => {
    if (!user) return;

    try {
      // 1. Check daily challenge
      const today = new Date().toISOString().split("T")[0];
      const { data: dailyDone } = await supabase
        .from("daily_challenges")
        .select("id")
        .eq("user_id", user.id)
        .eq("challenge_date", today)
        .maybeSingle();

      if (!dailyDone) {
        setAction({
          label: "Start Daily Challenge",
          description: "Complete today's 10-question challenge for bonus XP",
          path: "/daily",
          icon: Zap,
          gradient: "from-amber-500 to-orange-500",
        });
        setLoading(false);
        return;
      }

      // 2. Check weakest topic
      const { data: weakTopic } = await supabase
        .from("topic_mastery")
        .select("topic_name, subject, accuracy_percentage")
        .eq("user_id", user.id)
        .eq("is_mastered", false)
        .gt("questions_attempted", 0)
        .order("accuracy_percentage", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (weakTopic && weakTopic.accuracy_percentage < 50) {
        setAction({
          label: `Practice: ${weakTopic.topic_name}`,
          description: `${Math.round(weakTopic.accuracy_percentage)}% accuracy — targeted practice will help`,
          path: `/quiz?subject=${weakTopic.subject}&count=5&difficulty=all&timer=false`,
          icon: Target,
          gradient: "from-red-500 to-rose-500",
        });
        setLoading(false);
        return;
      }

      // 3. Check if exam is near / study plan active
      const { data: plan } = await supabase
        .from("study_plans")
        .select("exam_date")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (plan) {
        const daysUntil = Math.ceil((new Date(plan.exam_date).getTime() - Date.now()) / 86400000);
        if (daysUntil <= 14 && daysUntil > 0) {
          setAction({
            label: "Take Adaptive Exam Check",
            description: `${daysUntil} days to exam — quick readiness pulse check`,
            path: "/exam-simulator",
            icon: Clock,
            gradient: "from-violet-500 to-purple-500",
          });
          setLoading(false);
          return;
        }
      }

      // 4. Check recent accuracy for momentum high → boss battle
      const { data: recent } = await supabase
        .from("question_attempts")
        .select("is_correct")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (recent && recent.length >= 5) {
        const acc = recent.filter(a => a.is_correct).length / recent.length;
        if (acc >= 0.8) {
          setAction({
            label: "Try a Boss Battle",
            description: "Momentum is high — challenge yourself!",
            path: "/boss-battle",
            icon: Skull,
            gradient: "from-rose-500 to-red-600",
          });
          setLoading(false);
          return;
        }
      }

      // 5. Quick Duel opportunity
      setAction({
        label: "Quick Duel",
        description: "3-question lightning sprint — test your speed",
        path: "/battle?mode=quick_duel",
        icon: Swords,
        gradient: "from-blue-500 to-cyan-500",
      });

      // 6. Check streak at risk
      const { data: streak } = await supabase
        .from("streaks")
        .select("current_streak, last_practice_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (streak && streak.current_streak > 0 && streak.last_practice_date) {
        const lastDate = new Date(streak.last_practice_date);
        const hoursSince = (Date.now() - lastDate.getTime()) / 3600000;
        if (hoursSince > 20) {
          setAction({
            label: "Save Your Streak!",
            description: `${streak.current_streak}-day streak at risk — do 5 quick questions`,
            path: "/quiz?subject=both&count=5&difficulty=easy&timer=false",
            icon: Flame,
            gradient: "from-orange-500 to-red-500",
          });
        }
      }
    } catch (e) {
      console.error("NextBestAction error:", e);
      setAction({
        label: "Practice 10 Questions",
        description: "Jump in and keep building your skills",
        path: "/quiz?subject=both&count=10&difficulty=all&timer=true",
        icon: Play,
        gradient: "from-primary to-primary/80",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !action) return null;

  const Icon = action.icon;

  return (
    <Card className="mb-4 overflow-hidden">
      <button
        onClick={() => navigate(action.path)}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} text-white shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Next Best Action</p>
          <p className="text-sm font-bold text-foreground">{action.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
        </div>
        <div className="text-muted-foreground">›</div>
      </button>
    </Card>
  );
}
