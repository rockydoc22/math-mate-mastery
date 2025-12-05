import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Streak {
  current_streak: number;
  longest_streak: number;
  last_practice_date: string | null;
}

interface Achievement {
  achievement_type: string;
  unlocked_at: string;
}

const ACHIEVEMENT_DEFS = {
  first_quiz: { name: "First Steps", icon: "🎯", desc: "Complete your first quiz" },
  perfect_score: { name: "Perfectionist", icon: "💯", desc: "Score 100% on any quiz" },
  streak_3: { name: "On Fire", icon: "🔥", desc: "3 day practice streak" },
  streak_7: { name: "Dedicated", icon: "⭐", desc: "7 day practice streak" },
  streak_30: { name: "Legend", icon: "👑", desc: "30 day practice streak" },
  score_10: { name: "Getting Started", icon: "📊", desc: "Complete 10 quizzes" },
  score_50: { name: "Regular", icon: "📈", desc: "Complete 50 quizzes" },
  score_100: { name: "Veteran", icon: "🏆", desc: "Complete 100 quizzes" },
  math_master: { name: "Math Master", icon: "🧮", desc: "Score 90%+ on 10 math quizzes" },
  english_ace: { name: "English Ace", icon: "📚", desc: "Score 90%+ on 10 english quizzes" },
};

export const useGameStats = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quizCount, setQuizCount] = useState(0);

  const fetchStats = async () => {
    if (!user) return;

    const [streakRes, achievementsRes, scoresRes] = await Promise.all([
      supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("achievements").select("*").eq("user_id", user.id),
      supabase.from("quiz_scores").select("id").eq("user_id", user.id),
    ]);

    if (streakRes.data) setStreak(streakRes.data);
    if (achievementsRes.data) setAchievements(achievementsRes.data);
    if (scoresRes.data) setQuizCount(scoresRes.data.length);
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  const updateStreak = async () => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    const { data: current } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!current) return;

    const lastDate = current.last_practice_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    let newStreak = current.current_streak;
    
    if (lastDate === today) {
      // Already practiced today
      return;
    } else if (lastDate === yesterday) {
      // Continuing streak
      newStreak = current.current_streak + 1;
    } else {
      // Streak broken or first time
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, current.longest_streak);

    await supabase
      .from("streaks")
      .update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_practice_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    // Check streak achievements
    if (newStreak >= 3) await unlockAchievement("streak_3");
    if (newStreak >= 7) await unlockAchievement("streak_7");
    if (newStreak >= 30) await unlockAchievement("streak_30");

    fetchStats();
  };

  const unlockAchievement = async (type: string) => {
    if (!user || achievements.some(a => a.achievement_type === type)) return false;

    const { error } = await supabase
      .from("achievements")
      .insert({ user_id: user.id, achievement_type: type });

    if (!error) {
      fetchStats();
      return true;
    }
    return false;
  };

  const recordScore = async (subject: string, score: number, total: number) => {
    if (!user) return;

    const percentage = (score / total) * 100;

    await supabase.from("quiz_scores").insert({
      user_id: user.id,
      subject,
      score,
      total_questions: total,
      percentage,
    });

    await updateStreak();

    // First quiz achievement
    await unlockAchievement("first_quiz");

    // Perfect score achievement
    if (percentage === 100) {
      await unlockAchievement("perfect_score");
    }

    // Quiz count achievements
    const newCount = quizCount + 1;
    if (newCount >= 10) await unlockAchievement("score_10");
    if (newCount >= 50) await unlockAchievement("score_50");
    if (newCount >= 100) await unlockAchievement("score_100");

    fetchStats();
  };

  return {
    streak,
    achievements,
    quizCount,
    recordScore,
    unlockAchievement,
    achievementDefs: ACHIEVEMENT_DEFS,
    fetchStats,
  };
};
