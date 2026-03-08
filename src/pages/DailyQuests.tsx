import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Gift, Star, Flame, CheckCircle2, Clock, Zap, Target, BookOpen, Brain, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  xpReward: number;
  route: string;
  completed: boolean;
}

// Generate daily quests based on date seed
function generateDailyQuests(dateStr: string, stats: { questionsToday: number; streakDays: number; reviewedToday: number }): Quest[] {
  const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0);
  
  const questPool: Omit<Quest, 'current' | 'completed'>[] = [
    { id: 'q-practice-10', title: 'Daily Grind', description: 'Answer 10 practice questions', icon: '📝', target: 10, xpReward: 50, route: '/quiz' },
    { id: 'q-practice-20', title: 'Double Down', description: 'Answer 20 practice questions', icon: '🔥', target: 20, xpReward: 100, route: '/quiz' },
    { id: 'q-math-5', title: 'Math Focus', description: 'Complete 5 math questions', icon: '🧮', target: 5, xpReward: 40, route: '/math' },
    { id: 'q-english-5', title: 'Word Power', description: 'Complete 5 English questions', icon: '✍️', target: 5, xpReward: 40, route: '/english' },
    { id: 'q-review-3', title: 'Learn From Mistakes', description: 'Review 3 missed questions', icon: '🔄', target: 3, xpReward: 60, route: '/review' },
    { id: 'q-streak', title: 'Keep the Fire', description: 'Maintain your daily streak', icon: '🔥', target: 1, xpReward: 30, route: '/quiz' },
    { id: 'q-boss', title: 'Boss Slayer', description: 'Complete a Boss Battle', icon: '💀', target: 1, xpReward: 75, route: '/boss-battle' },
    { id: 'q-endurance', title: 'Endurance Runner', description: 'Start an Endurance Run', icon: '🏃', target: 1, xpReward: 60, route: '/endurance' },
    { id: 'q-topic', title: 'Topic Deep Dive', description: 'Practice questions from one topic', icon: '🎯', target: 5, xpReward: 50, route: '/problems-by-topic' },
    { id: 'q-rapid', title: 'Quick Recall', description: 'Complete a Rapid Facts round', icon: '⚡', target: 1, xpReward: 35, route: '/rapid-facts' },
    { id: 'q-vocab', title: 'Vocab Builder', description: 'Learn 5 vocabulary words', icon: '📚', target: 5, xpReward: 40, route: '/vocab' },
    { id: 'q-mastery', title: 'Skill Check', description: 'Check your topic mastery', icon: '📊', target: 1, xpReward: 25, route: '/mastery' },
  ];

  // Select 3 quests deterministically from the pool using the date seed
  const selected: typeof questPool = [];
  const indices = new Set<number>();
  let s = seed;
  while (selected.length < 3 && indices.size < questPool.length) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % questPool.length;
    if (!indices.has(idx)) {
      indices.add(idx);
      selected.push(questPool[idx]);
    }
  }

  return selected.map(q => {
    let current = 0;
    if (q.id.includes('practice')) current = stats.questionsToday;
    else if (q.id === 'q-math-5') current = Math.floor(stats.questionsToday / 2);
    else if (q.id === 'q-english-5') current = Math.floor(stats.questionsToday / 2);
    else if (q.id === 'q-review-3') current = stats.reviewedToday;
    else if (q.id === 'q-streak') current = stats.streakDays > 0 ? 1 : 0;

    return {
      ...q,
      current: Math.min(current, q.target),
      completed: current >= q.target,
    };
  });
}

const DailyQuests = () => {
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      const today = new Date().toISOString().split('T')[0];
      let questionsToday = 0;
      let streakDays = 0;
      let reviewedToday = 0;

      if (user) {
        // Count today's question attempts
        const { count: attemptCount } = await supabase
          .from('question_attempts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', `${today}T00:00:00`);
        questionsToday = attemptCount || 0;

        // Get streak
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .maybeSingle();
        streakDays = streakData?.current_streak || 0;

        // Count today's reviews (re-attempts on previously missed)
        const { count: reviewCount } = await supabase
          .from('question_attempts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gt('review_count', 0)
          .gte('created_at', `${today}T00:00:00`);
        reviewedToday = reviewCount || 0;
      }

      const dailyQuests = generateDailyQuests(today, { questionsToday, streakDays, reviewedToday });
      setQuests(dailyQuests);
      setTotalXPEarned(dailyQuests.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0));
      setLoading(false);
    };

    loadStats();
  }, [user]);

  const totalXPAvailable = quests.reduce((sum, q) => sum + q.xpReward, 0);
  const completedCount = quests.filter(q => q.completed).length;

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
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Daily Quests</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
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
          <Progress value={(completedCount / quests.length) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {completedCount === quests.length 
              ? '🎉 All quests completed! Come back tomorrow for new ones.' 
              : `${totalXPAvailable - totalXPEarned} XP remaining to earn today`
            }
          </p>
        </Card>

        {/* Quest cards */}
        {quests.map(quest => (
          <Link key={quest.id} to={quest.route}>
            <Card className={`p-4 transition-all hover:shadow-md ${quest.completed ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'hover:border-primary/40'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${quest.completed ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-primary/10'}`}>
                  {quest.completed ? '✅' : quest.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${quest.completed ? 'text-emerald-700 dark:text-emerald-400 line-through' : ''}`}>
                      {quest.title}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(quest.current / quest.target) * 100} 
                      className={`h-2 flex-1 ${quest.completed ? '[&>div]:bg-emerald-500' : ''}`} 
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
            Complete all 3 daily quests to earn a streak bonus! Consecutive days with all quests completed multiply your XP rewards.
          </p>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default DailyQuests;
