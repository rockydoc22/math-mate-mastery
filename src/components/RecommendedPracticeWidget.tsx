import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingDown, Brain, BookOpen, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  label: string;
  reason: string;
  action: string;
  icon: typeof Target;
  color: string;
}

export function RecommendedPracticeWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    computeRecommendation();
  }, [user]);

  const computeRecommendation = async () => {
    if (!user) return;

    try {
      // Fetch topic mastery for weakness detection
      const { data: mastery } = await supabase
        .from("topic_mastery")
        .select("topic_name, subject, accuracy_percentage, is_mastered, questions_attempted")
        .eq("user_id", user.id)
        .order("accuracy_percentage", { ascending: true });

      // Fetch recent attempts for mistake patterns
      const { data: recentAttempts } = await supabase
        .from("question_attempts")
        .select("skill, is_correct, question_type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);

      // Fetch skill ratings
      const { data: ratings } = await supabase
        .from("skill_ratings")
        .select("math_rating, english_rating")
        .eq("user_id", user.id)
        .maybeSingle();

      // Priority 1: Weakest unmastered topic with attempts
      const weakestTopic = mastery?.find(t => !t.is_mastered && t.questions_attempted > 0);
      if (weakestTopic && weakestTopic.accuracy_percentage < 60) {
        setRec({
          label: `Practice ${weakestTopic.topic_name}`,
          reason: `${Math.round(weakestTopic.accuracy_percentage)}% accuracy — your weakest current skill`,
          action: `/quiz?subject=${weakestTopic.subject}&count=5&difficulty=all&timer=false`,
          icon: Target,
          color: "text-red-500",
        });
        setLoading(false);
        return;
      }

      // Priority 2: Concentrated recent mistakes in one skill
      if (recentAttempts && recentAttempts.length > 5) {
        const wrongBySkill: Record<string, number> = {};
        recentAttempts.filter(a => !a.is_correct).forEach(a => {
          wrongBySkill[a.skill] = (wrongBySkill[a.skill] || 0) + 1;
        });
        const topMistake = Object.entries(wrongBySkill).sort((a, b) => b[1] - a[1])[0];
        if (topMistake && topMistake[1] >= 3) {
          setRec({
            label: `Review ${topMistake[0].replace(/_/g, " ")}`,
            reason: `${topMistake[1]} recent mistakes — focused practice recommended`,
            action: `/quiz?subject=both&count=5&difficulty=all&timer=false`,
            icon: Brain,
            color: "text-amber-500",
          });
          setLoading(false);
          return;
        }
      }

      // Priority 3: Low recent accuracy = momentum slipping
      if (recentAttempts && recentAttempts.length >= 10) {
        const recent10 = recentAttempts.slice(0, 10);
        const recentAcc = recent10.filter(a => a.is_correct).length / recent10.length;
        if (recentAcc < 0.5) {
          setRec({
            label: "Short practice burst",
            reason: "Momentum is slipping — do a quick confidence builder",
            action: "/quiz?subject=both&count=5&difficulty=easy&timer=false",
            icon: TrendingDown,
            color: "text-orange-500",
          });
          setLoading(false);
          return;
        }
      }

      // Priority 4: Weaker subject based on ratings
      if (ratings) {
        const weaker = ratings.math_rating < ratings.english_rating ? "math" : "english";
        const weakerName = weaker === "math" ? "Math" : "English";
        setRec({
          label: `Practice ${weakerName}`,
          reason: `Your ${weakerName} rating is lower — closing the gap helps overall`,
          action: `/quiz?subject=${weaker}&count=10&difficulty=all&timer=true`,
          icon: BookOpen,
          color: "text-blue-500",
        });
        setLoading(false);
        return;
      }

      // Priority 5: Near mastery topic
      const nearMastery = mastery?.find(t => !t.is_mastered && t.accuracy_percentage >= 70 && t.questions_attempted >= 3);
      if (nearMastery) {
        setRec({
          label: `Finish ${nearMastery.topic_name}`,
          reason: `You're close to mastery — one more set to lock it in`,
          action: `/quiz?subject=${nearMastery.subject}&count=5&difficulty=all&timer=false`,
          icon: Zap,
          color: "text-emerald-500",
        });
        setLoading(false);
        return;
      }

      // Fallback
      setRec({
        label: "Start a practice set",
        reason: "Keep building skills with a quick session",
        action: "/quiz?subject=both&count=10&difficulty=all&timer=true",
        icon: BookOpen,
        color: "text-primary",
      });
    } catch (e) {
      console.error("RecommendedPractice error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !rec) return null;

  const Icon = rec.icon;

  return (
    <Card className="p-4 mb-4 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-background/80 ${rec.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Recommended Practice</p>
          <p className="text-sm font-bold text-foreground">{rec.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
        </div>
        <Button size="sm" className="shrink-0" onClick={() => navigate(rec.action)}>
          Go
        </Button>
      </div>
    </Card>
  );
}
