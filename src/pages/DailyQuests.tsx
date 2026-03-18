import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Zap, Trophy, RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { selectDailyQuests, type DailyQuest } from "@/lib/dailyQuestEngine";
import { questTemplates } from "@/data/questTemplates";

// Map quest IDs to emoji icons & routes
const questMeta: Record<string, { icon: string; route: string }> = {
  "q-practice-10": { icon: "📝", route: "/quiz" },
  "q-practice-20": { icon: "🔥", route: "/quiz" },
  "q-math-5": { icon: "🧮", route: "/math" },
  "q-english-5": { icon: "✍️", route: "/english" },
  "q-review-3": { icon: "🔄", route: "/review" },
  "q-streak": { icon: "🔥", route: "/quiz" },
  "q-boss": { icon: "💀", route: "/boss-battle" },
  "q-endurance": { icon: "🏃", route: "/endurance" },
  "q-topic": { icon: "🎯", route: "/problems-by-topic" },
  "q-rapid": { icon: "⚡", route: "/rapid-facts" },
  "q-vocab": { icon: "📚", route: "/vocab" },
  "q-mastery": { icon: "📊", route: "/mastery" },
  "q-survival": { icon: "💀", route: "/survival" },
  "q-speed-drill": { icon: "⏱️", route: "/speed-drill" },
  "q-flashcards": { icon: "🃏", route: "/flashcards" },
};

// Derive quest target from goal text
function extractTarget(goal: string): number {
  const match = goal.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

interface QuestWithProgress extends DailyQuest {
  icon: string;
  route: string;
  target: number;
  current: number;
  completed: boolean;
}

const DailyQuests = () => {
  const { user } = useAuth();
  const [quests, setQuests] = useState<QuestWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];

      // Fetch user profile for grade-level
      let gradeNum = 9;
      let recentDomains: string[] = [];

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("grade_level")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.grade_level) {
          const parsed = parseInt(profile.grade_level, 10);
          if (!isNaN(parsed)) gradeNum = parsed;
        }

        // Recent activity domains (last 7 days)
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { data: recentAttempts } = await supabase
          .from("question_attempts")
          .select("domain")
          .eq("user_id", user.id)
          .gte("created_at", weekAgo.toISOString())
          .limit(100);

        if (recentAttempts) {
          recentDomains = [...new Set(recentAttempts.map((a) => a.domain.toLowerCase()))];
        }
      }

      // Select quests via engine
      const selected = selectDailyQuests({
        profile: { age: gradeNum + 5, grade: gradeNum, recentActivityDomains: recentDomains },
        today,
        templates: questTemplates,
      });

      // Load progress for each quest
      let questionsToday = 0;
      let streakDays = 0;
      let reviewedToday = 0;

      if (user) {
        const { count: attemptCount } = await supabase
          .from("question_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", `${todayStr}T00:00:00`);
        questionsToday = attemptCount || 0;

        const { data: streakData } = await supabase
          .from("streaks")
          .select("current_streak")
          .eq("user_id", user.id)
          .maybeSingle();
        streakDays = streakData?.current_streak || 0;

        const { count: reviewCount } = await supabase
          .from("question_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gt("review_count", 0)
          .gte("created_at", `${todayStr}T00:00:00`);
        reviewedToday = reviewCount || 0;
      }

      const withProgress: QuestWithProgress[] = selected.map((q) => {
        const meta = questMeta[q.id] || { icon: "🎯", route: "/quiz" };
        const target = extractTarget(q.goal);

        let current = 0;
        if (q.id.includes("practice")) current = questionsToday;
        else if (q.id === "q-math-5") current = Math.floor(questionsToday / 2);
        else if (q.id === "q-english-5") current = Math.floor(questionsToday / 2);
        else if (q.id === "q-review-3") current = reviewedToday;
        else if (q.id === "q-streak") current = streakDays > 0 ? 1 : 0;

        return {
          ...q,
          icon: meta.icon,
          route: meta.route,
          target,
          current: Math.min(current, target),
          completed: current >= target,
        };
      });

      setQuests(withProgress);
      setLoading(false);
    };

    load();
  }, [user]);

  const totalXPEarned = quests.filter((q) => q.completed).reduce((s, q) => s + q.reward_coins, 0);
  const totalXPAvailable = quests.reduce((s, q) => s + q.reward_coins, 0);
  const completedCount = quests.filter((q) => q.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Daily Quests</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{totalXPEarned} XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Progress overview */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-bold">Today's Progress</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {completedCount}/{quests.length} done
            </span>
          </div>
          <Progress value={quests.length > 0 ? (completedCount / quests.length) * 100 : 0} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {completedCount === quests.length
              ? "🎉 All quests completed! Come back tomorrow for new ones."
              : `${totalXPAvailable - totalXPEarned} XP remaining to earn today`}
          </p>
        </Card>

        {/* Quest cards */}
        {quests.map((quest) => (
          <Link key={quest.id} to={quest.route}>
            <Card
              className={`p-4 transition-all hover:shadow-md ${
                quest.completed
                  ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                  : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    quest.completed ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-primary/10"
                  }`}
                >
                  {quest.completed ? "✅" : quest.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-bold text-sm ${
                        quest.completed ? "text-emerald-700 dark:text-emerald-400 line-through" : ""
                      }`}
                    >
                      {quest.name}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      +{quest.reward_coins} coins
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        quest.difficulty === "hard"
                          ? "bg-destructive/10 text-destructive"
                          : quest.difficulty === "medium"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {quest.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{quest.goal}</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(quest.current / quest.target) * 100}
                      className={`h-2 flex-1 ${quest.completed ? "[&>div]:bg-emerald-500" : ""}`}
                    />
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {quest.current}/{quest.target}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {/* Bonus info */}
        <Card className="p-4 bg-muted/30 border-dashed">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold">Bonus Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Quests are personalized to your grade level and recent activity. Complete all daily quests to earn a streak bonus!
          </p>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default DailyQuests;
