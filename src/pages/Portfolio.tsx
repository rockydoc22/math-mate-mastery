import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Flame, Target, Brain, BookOpen, Star, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface PortfolioStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  quizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  topicsAttempted: number;
  topicsMastered: number;
  achievementsUnlocked: number;
  totalCoins: number;
  mathRating: number;
  englishRating: number;
  overallRating: number;
  practiceTests: number;
  writingSessions: number;
}

const Portfolio = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadStats();
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    const [attemptsRes, quizRes, streakRes, topicRes, achieveRes, ratingsRes, testsRes, writingRes] = await Promise.all([
      supabase.from('question_attempts').select('id, is_correct').eq('user_id', user.id),
      supabase.from('quiz_scores').select('id').eq('user_id', user.id),
      supabase.from('streaks').select('current_streak, longest_streak').eq('user_id', user.id).maybeSingle(),
      supabase.from('topic_mastery').select('id, is_mastered').eq('user_id', user.id),
      supabase.from('achievements').select('id').eq('user_id', user.id),
      supabase.from('skill_ratings').select('math_rating, english_rating, overall_rating').eq('user_id', user.id).maybeSingle(),
      supabase.from('practice_tests').select('id').eq('user_id', user.id),
      supabase.from('writing_lab_sessions').select('id').eq('user_id', user.id),
    ]);

    const attempts = attemptsRes.data || [];
    const correct = attempts.filter(a => a.is_correct).length;
    const topics = topicRes.data || [];

    setStats({
      totalQuestions: attempts.length,
      correctAnswers: correct,
      accuracy: attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0,
      quizzesCompleted: quizRes.data?.length || 0,
      currentStreak: streakRes.data?.current_streak || 0,
      longestStreak: streakRes.data?.longest_streak || 0,
      topicsAttempted: topics.length,
      topicsMastered: topics.filter(t => t.is_mastered).length,
      achievementsUnlocked: achieveRes.data?.length || 0,
      totalCoins: correct * 2, // simple coin calc
      mathRating: ratingsRes.data?.math_rating || 1200,
      englishRating: ratingsRes.data?.english_rating || 1200,
      overallRating: ratingsRes.data?.overall_rating || 1200,
      practiceTests: testsRes.data?.length || 0,
      writingSessions: writingRes.data?.length || 0,
    });
    setLoading(false);
  };

  const StatCard = ({ icon: Icon, label, value, color, sub }: { icon: any; label: string; value: string | number; color: string; sub?: string }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4 text-center">
        <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
        {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold text-foreground">My Portfolio</h1>
        </div>

        {!user && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-3">Sign in to view your learning portfolio</p>
            <Link to="/auth"><Button>Sign In</Button></Link>
          </Card>
        )}

        {loading && user && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {stats && (
          <>
            {/* Overall Rating */}
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                <p className="text-4xl font-bold text-primary">{stats.overallRating}</p>
                <div className="flex justify-center gap-6 mt-3">
                  <div>
                    <p className="text-lg font-bold text-foreground">{stats.mathRating}</p>
                    <p className="text-xs text-muted-foreground">Math</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stats.englishRating}</p>
                    <p className="text-xs text-muted-foreground">English</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard icon={Target} label="Accuracy" value={`${stats.accuracy}%`} color="text-green-500" />
              <StatCard icon={Brain} label="Questions" value={stats.totalQuestions} color="text-blue-500" />
              <StatCard icon={Trophy} label="Quizzes" value={stats.quizzesCompleted} color="text-amber-500" />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard icon={Flame} label="Streak" value={stats.currentStreak} color="text-orange-500" sub={`Best: ${stats.longestStreak}`} />
              <StatCard icon={Award} label="Badges" value={stats.achievementsUnlocked} color="text-purple-500" />
              <StatCard icon={Star} label="Coins" value={stats.totalCoins} color="text-yellow-500" />
            </div>

            {/* Mastery Progress */}
            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-foreground">Topic Mastery</p>
                <span className="text-sm text-muted-foreground">{stats.topicsMastered}/{stats.topicsAttempted}</span>
              </div>
              <Progress value={stats.topicsAttempted > 0 ? (stats.topicsMastered / stats.topicsAttempted) * 100 : 0} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">
                {stats.topicsMastered > 0 ? `${stats.topicsMastered} topic${stats.topicsMastered > 1 ? 's' : ''} mastered` : 'Start practicing to master topics'}
              </p>
            </Card>

            {/* Activity Summary */}
            <Card className="p-4 mb-4">
              <p className="font-semibold mb-3 text-foreground">Activity Summary</p>
              <div className="space-y-3">
                {[
                  { label: "Practice Tests Completed", value: stats.practiceTests, icon: BookOpen, color: "text-emerald-500" },
                  { label: "Writing Lab Sessions", value: stats.writingSessions, icon: TrendingUp, color: "text-indigo-500" },
                  { label: "Correct Answers", value: stats.correctAnswers, icon: CheckCircle2, color: "text-green-500" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link to="/mastery"><Button variant="outline" className="w-full gap-2"><Target className="w-4 h-4" />Topic Mastery</Button></Link>
              <Link to="/skill-map"><Button variant="outline" className="w-full gap-2"><Brain className="w-4 h-4" />Skill Map</Button></Link>
              <Link to="/insights"><Button variant="outline" className="w-full gap-2"><TrendingUp className="w-4 h-4" />Insights</Button></Link>
              <Link to="/leaderboard"><Button variant="outline" className="w-full gap-2"><Trophy className="w-4 h-4" />Leaderboard</Button></Link>
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Portfolio;
