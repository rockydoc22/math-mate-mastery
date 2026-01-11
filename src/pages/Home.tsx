import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calculator, PenTool, Trophy, Zap, Users, LogIn, User, 
  Award, Swords, ChevronRight, Flame, Bell, Play, Brain, X,
  Target, RotateCcw, BookOpen, RefreshCw
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { useStudyPlan } from "@/hooks/useStudyPlan";
import { AchievementBadge } from "@/components/AchievementBadge";
import { getSkillLevel, ratingToSATScore } from "@/utils/eloRating";
import { supabase } from "@/integrations/supabase/client";
import { usePWAUpdate, APP_VERSION } from "@/hooks/usePWAUpdate";

// Motivational messages for non-logged in or idle users
const motivationalMessages = [
  "Ready to crush the SAT? Start with 10 questions!",
  "Your future self will thank you. Practice now!",
  "Top scorers practice daily. Join them!",
  "1600 club awaits. Take the first step!",
];

interface LeaderboardEntry {
  username: string;
  total_score: number;
  avatar_emoji: string | null;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const { ratings } = useSkillRating();
  const { activePlan, showReminder, dismissReminder, daysUntilExam } = useStudyPlan();
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([]);
  const [notification, setNotification] = useState<string>("");
  const { forceUpdate, isUpdating, hasUpdate } = usePWAUpdate();

  // Fetch top 3 leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('leaderboard_scores')
        .select('username, total_score, avatar_emoji')
        .order('total_score', { ascending: false })
        .limit(3);
      if (data) setTopPlayers(data);
    };
    fetchLeaderboard();
  }, []);

  // Set notification message
  useEffect(() => {
    if (!user) {
      const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setNotification(randomMsg);
    } else if (streak && streak.current_streak === 0) {
      setNotification("Start your streak today! Complete a practice session.");
    } else if (streak && streak.current_streak > 0) {
      setNotification(`🔥 ${streak.current_streak} day streak! Keep it going!`);
    } else {
      const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setNotification(randomMsg);
    }
  }, [user, streak]);

  const handleQuickStart = (subject: string) => {
    navigate(`/quiz?subject=${subject}&count=10&difficulty=all&timer=true`);
  };

  const projectedScore = ratings ? ratingToSATScore(ratings.overallRating) : null;
  const skillLevel = ratings ? getSkillLevel(ratings.overallRating) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1 animate-in fade-in duration-300">
        
        {/* Hero Header */}
        <header className="flex flex-col items-center text-center mb-6 pt-4">
          {/* Sign In / Profile at top */}
          <div className="flex items-center gap-2 mb-4">
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm">
                <Trophy className="w-5 h-5" />
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/friends">
                  <Button variant="ghost" size="sm">
                    <Users className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-bold text-lg px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Large 40² Logo */}
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 shadow-lg">
            <span className="text-4xl font-bold text-primary-foreground font-mono">40²</span>
          </div>
          
          {/* Tagline */}
          <h1 className="text-xl font-bold text-foreground mb-3">Be one of the 3 in 10,000 who Crush the SAT</h1>
          
          {/* Fight Club - Centered */}
          <Link to="/battle" className="mb-3">
            <Button variant="destructive" size="lg" className="font-bold gap-2">
              <Swords className="w-5 h-5" />
              Fight Club
            </Button>
          </Link>
          
          {/* (20+20)² Prediction Test */}
          <Link to="/practice-test" className="mb-4">
            <Button variant="outline" size="lg" className="font-mono font-bold gap-2 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              (20+20)² Prediction Test
            </Button>
          </Link>
          
          {/* Compounding to 1600 */}
          <Link to="/daily">
            <Button size="lg" className="font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
              <Zap className="w-5 h-5" />
              Compounding to 1600
            </Button>
          </Link>
        </header>

        {/* Study Plan Reminder */}
        {showReminder && activePlan && (
          <Card className="p-4 mb-4 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-start gap-3">
              <Brain className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-primary">Brain Building Program Active!</p>
                <p className="text-sm text-muted-foreground">
                  {daysUntilExam} days until exam • {activePlan.daily_minutes} min/day goal
                </p>
                <Link to="/daily">
                  <Button size="sm" className="mt-2">Start Today's Practice</Button>
                </Link>
              </div>
              <Button variant="ghost" size="icon" onClick={dismissReminder} className="flex-shrink-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Notification Banner */}
        <Card className="p-3 mb-4 border-primary/30 bg-primary/5 flex items-center gap-3">
          <Bell className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{notification}</p>
        </Card>

        {/* Personalized Stats - Only for logged in users */}
        {user && ratings && (
          <Card className="p-4 mb-4 border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl font-bold text-primary font-mono">
                    {Math.round(ratings.overallRating)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Skill Rating</p>
                    <p className="text-sm font-medium">{skillLevel?.level}</p>
                  </div>
                </div>
                {projectedScore && (
                  <p className="text-sm text-muted-foreground">
                    Projected SAT: <span className="font-semibold text-foreground">{projectedScore.min}-{projectedScore.max}</span>
                  </p>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {streak && streak.current_streak > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="font-bold">{streak.current_streak}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{quizCount} sessions</span>
                </div>
              </div>
            </div>
            
            {/* Mini progress bars for Math/English */}
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Math</span>
                    <span className="font-medium">{Math.round(ratings.mathRating)}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min((ratings.mathRating / 2000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-secondary" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>English</span>
                    <span className="font-medium">{Math.round(ratings.englishRating)}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all"
                      style={{ width: `${Math.min((ratings.englishRating / 2000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Start - Primary CTA */}
        <Card className="p-5 mb-4 border-2 border-border">
          <h2 className="font-semibold mb-3 text-center">Quick Practice</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              size="lg" 
              className="h-16 text-lg gap-2"
              onClick={() => handleQuickStart('math')}
            >
              <Calculator className="w-5 h-5" />
              Math
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="h-16 text-lg gap-2"
              onClick={() => handleQuickStart('english')}
            >
              <PenTool className="w-5 h-5" />
              English
            </Button>
          </div>
        </Card>

        {/* Study Modes */}
        <Card className="p-4 mb-4 border-2 border-border">
          <div className="flex flex-col gap-3">
            <Link to="/study?mode=weakness" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <Target className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-sm font-medium">Master Your Weakness</span>
              </Button>
            </Link>
            <Link to="/review" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <RotateCcw className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm font-medium">Master What You Missed</span>
              </Button>
            </Link>
            <Link to="/problems-by-topic" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Problems by Topic</span>
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Achievements Mini */}
          <Card className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">Badges</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {achievements.length}/{Object.keys(achievementDefs).length}
              </span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {Object.entries(achievementDefs).slice(0, 4).map(([key, def]) => {
                const unlocked = achievements.find((a) => a.achievement_type === key);
                return (
                  <AchievementBadge
                    key={key}
                    icon={def.icon}
                    name={def.name}
                    description={def.desc}
                    unlocked={!!unlocked}
                    unlockedAt={unlocked?.unlocked_at}
                  />
                );
              })}
            </div>
          </Card>

          {/* Leaderboard Mini */}
          <Card className="p-3">
            <Link to="/leaderboard" className="flex items-center justify-between mb-2 hover:text-primary transition-colors">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium">Top Players</span>
              </div>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <div className="space-y-1">
              {topPlayers.slice(0, 3).map((player, idx) => (
                <div key={player.username} className="flex items-center gap-2 text-xs">
                  <span className={`font-bold ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-gray-400' : 'text-orange-400'}`}>
                    {idx + 1}
                  </span>
                  <span className="truncate flex-1">{player.avatar_emoji || '👤'} {player.username}</span>
                  <span className="text-muted-foreground">{player.total_score}</span>
                </div>
              ))}
              {topPlayers.length === 0 && (
                <p className="text-xs text-muted-foreground">No scores yet</p>
              )}
            </div>
          </Card>
        </div>

        {/* Bottom Tagline */}
        <p className="text-center text-sm text-muted-foreground italic mb-4">
          Your future self will thank you.
        </p>

        {/* Quick Links - Minimal */}
        <div className="flex gap-2 justify-center flex-wrap mt-auto pb-2">
          <Link to="/why-it-works">
            <Button variant="ghost" size="sm" className="text-xs text-primary font-medium">
              Why 1600² Works
            </Button>
          </Link>
          <Link to="/insights">
            <Button variant="ghost" size="sm" className="text-xs">
              Insights
            </Button>
          </Link>
          <Link to="/review">
            <Button variant="ghost" size="sm" className="text-xs">
              Review
            </Button>
          </Link>
          <Link to="/problems-by-topic">
            <Button variant="ghost" size="sm" className="text-xs">
              By Topic
            </Button>
          </Link>
        </div>

        {/* Update Button & Version */}
        <div className="flex items-center justify-center gap-3 pb-4">
          <span className="text-xs text-muted-foreground">v{APP_VERSION}</span>
          <Button
            onClick={forceUpdate}
            disabled={isUpdating}
            variant={hasUpdate ? "default" : "ghost"}
            size="sm"
            className="text-xs gap-1 h-7"
          >
            <RefreshCw className={`w-3 h-3 ${isUpdating ? "animate-spin" : ""}`} />
            {isUpdating ? "Updating..." : hasUpdate ? "Update" : "Refresh"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
