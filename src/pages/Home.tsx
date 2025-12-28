import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calculator, PenTool, Trophy, Zap, Users, LogIn, User, 
  Award, Swords, ChevronRight, Flame, Bell, Play
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { AchievementBadge } from "@/components/AchievementBadge";
import { getSkillLevel, ratingToSATScore } from "@/utils/eloRating";
import { supabase } from "@/integrations/supabase/client";

// Motivational messages for non-logged in or idle users
const motivationalMessages = [
  "Ready to crush the SAT? Start with 10 questions!",
  "Your future self will thank you. Practice now!",
  "Every question counts. Let's do this!",
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
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([]);
  const [notification, setNotification] = useState<string>("");

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
      setNotification("Sign in to track your progress and compete!");
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
        
        {/* Compact Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <span className="text-lg font-bold text-primary-foreground font-mono">40²</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/battle">
              <Button variant="ghost" size="sm" className="text-destructive">
                <Swords className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/daily">
              <Button variant="ghost" size="sm" className="text-primary">
                <Zap className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm">
                <Trophy className="w-4 h-4" />
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/friends">
                  <Button variant="ghost" size="sm">
                    <Users className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-1">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </header>

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
          <h2 className="font-semibold mb-3">Quick Practice</h2>
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
          <Link to="/practice-test" className="block mt-3">
            <Button variant="outline" className="w-full gap-2">
              <Play className="w-4 h-4" />
              Full Practice Test
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
          </Link>
        </Card>

        {/* Gamification Row */}
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

        {/* Quick Links - Minimal */}
        <div className="flex gap-2 justify-center mt-auto pb-4">
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
      </div>
    </div>
  );
};

export default Home;
