import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Brain, Zap, Target, RotateCcw, Flame, BookOpen, Sparkles, Trophy, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { SEO } from "@/components/SEO";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

const AdaptiveLearning = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    generateRecommendations();
  }, [user]);

  const generateRecommendations = async () => {
    if (!user) return;
    const recs: Recommendation[] = [];

    // 1. Check streak
    const { data: streak } = await supabase
      .from('streaks')
      .select('current_streak, last_practice_date')
      .eq('user_id', user.id)
      .maybeSingle();

    const today = new Date().toISOString().split('T')[0];
    const lastPractice = streak?.last_practice_date;
    const hasStudiedToday = lastPractice === today;

    if (!hasStudiedToday) {
      recs.push({
        id: 'streak', title: 'Keep Your Streak Alive!', icon: '🔥',
        description: `${streak?.current_streak || 0} day streak — don't break it!`,
        route: '/quiz', priority: 'high',
        reason: 'You haven\'t practiced today',
      });
    }

    // 2. Check for missed questions to review
    const { count: missedCount } = await supabase
      .from('question_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_correct', false)
      .eq('review_count', 0);

    if ((missedCount || 0) > 3) {
      recs.push({
        id: 'review', title: 'Review Missed Questions', icon: '🔄',
        description: `${missedCount} questions waiting for review`,
        route: '/review', priority: 'high',
        reason: 'Spaced repetition boosts retention by 2-3x',
      });
    }

    // 3. Find weakest domains
    const { data: recentAttempts } = await supabase
      .from('question_attempts')
      .select('domain, is_correct')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200);

    if (recentAttempts && recentAttempts.length > 10) {
      const domainStats: Record<string, { total: number; correct: number }> = {};
      recentAttempts.forEach((a: any) => {
        if (!domainStats[a.domain]) domainStats[a.domain] = { total: 0, correct: 0 };
        domainStats[a.domain].total++;
        if (a.is_correct) domainStats[a.domain].correct++;
      });

      const weakest = Object.entries(domainStats)
        .map(([domain, s]) => ({ domain, accuracy: (s.correct / s.total) * 100, total: s.total }))
        .filter(d => d.total >= 5)
        .sort((a, b) => a.accuracy - b.accuracy);

      if (weakest.length > 0 && weakest[0].accuracy < 65) {
        recs.push({
          id: 'weakness', title: `Focus on ${weakest[0].domain}`, icon: '🎯',
          description: `${Math.round(weakest[0].accuracy)}% accuracy — needs improvement`,
          route: '/study?mode=weakness', priority: 'high',
          reason: 'Targeted practice on weak areas has the highest score impact',
        });
      }

      const strongest = weakest[weakest.length - 1];
      if (strongest && strongest.accuracy > 85) {
        recs.push({
          id: 'challenge', title: `Challenge: ${strongest.domain}`, icon: '💪',
          description: `${Math.round(strongest.accuracy)}% accuracy — push harder!`,
          route: '/elite-practice', priority: 'low',
          reason: 'You\'re strong here — try harder questions to solidify mastery',
        });
      }
    }

    // 4. Check total question count for milestones
    const { count: totalAnswered } = await supabase
      .from('question_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const total = totalAnswered || 0;
    if (total < 50) {
      recs.push({
        id: 'warmup', title: 'Build Your Foundation', icon: '📝',
        description: `${total}/50 questions — keep going!`,
        route: '/quiz', priority: 'medium',
        reason: 'The first 50 questions help calibrate your skill level',
      });
    } else if (total < 200) {
      recs.push({
        id: 'consistency', title: 'Stay Consistent', icon: '📈',
        description: `${total} questions answered — aim for 200`,
        route: '/daily-quests', priority: 'medium',
        reason: 'Students who pass 200 questions see significant score jumps',
      });
    }

    // 5. Suggest daily quests
    recs.push({
      id: 'quests', title: 'Daily Quests', icon: '⭐',
      description: 'Complete today\'s quests for bonus XP',
      route: '/daily-quests', priority: 'medium',
      reason: 'Structured daily goals improve consistency',
    });

    // 6. Suggest skill map if hasn't checked
    recs.push({
      id: 'skillmap', title: 'Check Your Skill Map', icon: '🗺️',
      description: 'See your progress across all topics',
      route: '/skill-map', priority: 'low',
      reason: 'Visual progress tracking increases motivation',
    });

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    setRecommendations(recs.slice(0, 5));
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Analyzing your learning patterns…</p>
        </div>
      </div>
    );
  }

  const priorityColors = {
    high: 'border-l-4 border-l-destructive',
    medium: 'border-l-4 border-l-primary',
    low: 'border-l-4 border-l-muted-foreground/30',
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title="What to Study Next — Adaptive Plan"
        description="Personalized next-step recommendations based on your streaks, weak areas, and recent quiz performance across every test."
        path="/next-steps"
      />
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" /> What to Study Next
            </h1>
            <p className="text-xs text-muted-foreground">AI-powered recommendations based on your data</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-3">
        <p className="text-sm text-muted-foreground">
          Based on your recent performance, here's your personalized study plan:
        </p>

        {recommendations.map((rec, idx) => (
          <Link key={rec.id} to={rec.route}>
            <Card className={`p-4 hover:shadow-md transition-all hover:border-primary/40 ${priorityColors[rec.priority]}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {idx === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-bold">#1 Priority</span>}
                    <h3 className="font-bold text-sm">{rec.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{rec.description}</p>
                  <p className="text-[10px] text-muted-foreground/70 italic">💡 {rec.reason}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </Card>
          </Link>
        ))}

        <Card className="p-4 bg-muted/30 border-dashed mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">How it works</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommendations update automatically based on your accuracy, streak, missed questions, and study patterns. The more you practice, the smarter the suggestions become.
          </p>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default AdaptiveLearning;
