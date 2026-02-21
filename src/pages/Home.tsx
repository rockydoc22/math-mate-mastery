import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calculator, PenTool, Trophy, Zap, Users, LogIn, User, 
  Award, Swords, ChevronRight, Flame, Brain, X,
  Target, RotateCcw, BookOpen, RefreshCw, FileText, Crown, GraduationCap,
  Clock, Sparkles, Download, Lightbulb, Play, Skull, Settings
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
import { PWAUpdateButton } from "@/components/PWAUpdateButton";
import { SATBossArena } from "@/components/SATBossArena";
import { LandingPage } from "@/components/LandingPage";
import { SATMasteryLogo } from "@/components/SATMasteryLogo";
import { StreakCalendar } from "@/components/StreakCalendar";
import { WordOfTheDay } from "@/components/WordOfTheDay";
import { ExamSelector } from "@/components/ExamSelector";
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS, ratingToExamScore, ratingToSectionScore } from "@/utils/examConfig";
import { SubjectDuelCard } from "@/components/SubjectDuelCard";
import { SpeedDemonCard } from "@/components/SpeedDemonCard";
import { AchievementChains } from "@/components/AchievementChains";
import { RevengeModeBanner } from "@/components/RevengeModeBanner";
import { PerfectStreakDisplay } from "@/components/PerfectStreakDisplay";
import { usePerfectStreak } from "@/hooks/usePerfectStreak";

// Motivational messages for non-logged in or idle users
const motivationalMessages = [
  "Ready to crush the SAT? Start with 10 questions!",
  "Top scorers practice daily. Join them!",
  "1600 club awaits. Take the first step!",
];

// Official exam test dates by type
// SAT: https://satsuite.collegeboard.org/sat/dates-deadlines
const upcomingSATDates = [
  new Date("2026-03-14"),
  new Date("2026-05-02"),
  new Date("2026-06-06"),
  new Date("2026-08-22"),
  new Date("2026-09-12"),
  new Date("2026-10-03"),
];

// ACT: https://www.act.org/content/act/en/products-and-services/the-act/registration/test-dates.html
const upcomingACTDates = [
  new Date("2026-04-11"),
  new Date("2026-06-13"),
  new Date("2026-07-11"),
];

// PSAT/NMSQT: https://satsuite.collegeboard.org/psat-nmsqt/test-dates
// PSAT 10: https://satsuite.collegeboard.org/psat-10/test-dates
const upcomingPSATDates = [
  new Date("2026-10-01"), // PSAT/NMSQT window: October 1–30, 2026
];

function getNextExamDate(examType: string): { date: Date; daysUntil: number } {
  const dates = examType === 'act' ? upcomingACTDates
    : examType === 'psat' ? upcomingPSATDates
    : upcomingSATDates;
  
  const now = new Date();
  for (const examDate of dates) {
    if (examDate > now) {
      const daysUntil = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { date: examDate, daysUntil };
    }
  }
  // Fallback to last date if all passed
  const last = dates[dates.length - 1];
  return { date: last, daysUntil: 0 };
}

interface LeaderboardEntry {
  username: string;
  total_score: number;
  avatar_emoji: string | null;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const { ratings } = useSkillRating();
  const { activePlan, showReminder, dismissReminder, daysUntilExam, weeksUntilExam, workplan, pendingReviewCount, showReviewAlert } = useStudyPlan();
  const { examType, needsSelection, setExamType } = useExamType();
  const examConfig = EXAM_CONFIGS[examType];
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([]);
  const [notification, setNotification] = useState<string>("");
  const { forceUpdate, isUpdating, hasUpdate } = usePWAUpdate();
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [recentCorrectAnswers, setRecentCorrectAnswers] = useState(0);
  const [playerAvatar, setPlayerAvatar] = useState("🧑‍🚀");
  const [playerUsername, setPlayerUsername] = useState("Fighter");
  const [practiceDates, setPracticeDates] = useState<string[]>([]);
  const { streak: perfectStreak } = usePerfectStreak();

  // Next SAT date countdown
  const nextSAT = getNextExamDate(examType);

  // Fetch player stats for Boss Arena
  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (!user) return;
      
      // Get total questions answered
      const { count: totalCount } = await supabase
        .from("question_attempts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      setTotalQuestionsAnswered(totalCount || 0);
      
      // Get recent correct answers (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { count: recentCount } = await supabase
        .from("question_attempts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_correct", true)
        .gte("created_at", weekAgo.toISOString());
      
      setRecentCorrectAnswers(recentCount || 0);
      
      // Get player profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_emoji")
        .eq("id", user.id)
        .maybeSingle();
      
      if (profile) {
        setPlayerUsername(profile.username || "Fighter");
        setPlayerAvatar(profile.avatar_emoji || "🧑‍🚀");
      }

      // Fetch practice dates for streak calendar (last 84 days)
      const calStart = new Date();
      calStart.setDate(calStart.getDate() - 84);
      const { data: dateRows } = await supabase
        .from("question_attempts")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", calStart.toISOString());
      if (dateRows) {
        const uniqueDates = [...new Set(dateRows.map(r => r.created_at.split("T")[0]))];
        setPracticeDates(uniqueDates);
      }
    };
    
    fetchPlayerStats();
  }, [user]);

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

  const handleTry3Questions = () => {
    navigate(`/quiz?subject=both&count=3&difficulty=easy&timer=false`);
  };

  const handle40SquaredClick = () => {
    navigate("/battle");
  };

  const projectedScore = ratings ? ratingToExamScore(ratings.overallRating, examType) : null;
  const skillLevel = ratings ? getSkillLevel(ratings.overallRating) : null;

  // Show landing page for guests - MUST BE AFTER ALL HOOKS
  if (!user) {
    return <LandingPage />;
  }

  // Show exam selector for first-time users
  if (needsSelection) {
    return <ExamSelector onSelect={setExamType} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex flex-col">
      {/* PWA Update Banner - Top */}
      {hasUpdate && (
        <div className="px-4 py-2 bg-primary/10 text-center">
          <Button
            onClick={forceUpdate}
            disabled={isUpdating}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            {isUpdating ? "Updating..." : "Update PWA"}
          </Button>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1 animate-in fade-in duration-300">
        
        {/* Hero Header - Simplified */}
        <header className="flex flex-col items-center text-center mb-6 pt-4 relative">
          {/* Update button at top left */}
          <div className="absolute top-4 left-0">
            <Button
              onClick={forceUpdate}
              disabled={isUpdating}
              variant={hasUpdate ? "default" : "ghost"}
              size="sm"
              className={`gap-1 text-[10px] h-7 px-2 ${hasUpdate ? 'animate-pulse bg-emerald-500 hover:bg-emerald-600 text-white' : ''}`}
            >
              <RefreshCw className={`w-3 h-3 ${isUpdating ? "animate-spin" : ""}`} />
              {isUpdating ? "..." : hasUpdate ? "🆕 Update" : `v${APP_VERSION}`}
            </Button>
          </div>

          {/* Sign In / Profile at top right */}
          <div className="absolute top-4 right-0 flex flex-col items-end gap-1">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <Link to="/leaderboard">
                    <Button variant="ghost" size="sm">
                      <Trophy className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[10px] text-muted-foreground">
                    {playerAvatar} <span className="font-semibold text-foreground">{playerUsername}</span>
                  </p>
                  <Link to="/settings">
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                      <Settings className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Logo - dynamic per exam type */}
          <div className="mb-4 mt-14 pt-2">
            <SATMasteryLogo 
              size="xl" 
              clickable 
              onClick={handle40SquaredClick}
            examType={examType}
              showTagline
              taglineText={examConfig.tagline}
            />
          </div>


          {/* Exam badge - tappable switcher */}
          <div className="flex items-center gap-1 mb-2">
            {(['sat', 'psat', 'act'] as const).map((type) => {
              const cfg = EXAM_CONFIGS[type];
              const isActive = examType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setExamType(type);
                    toast({ title: `Switched to ${cfg.name} mode ${cfg.icon}` });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer'
                  }`}
                >
                  {cfg.icon} {cfg.shortName}
                </button>
              );
            })}
          </div>

          {/* SAT Countdown - Single Clear CTA */}
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Next {examConfig.shortName}: {nextSAT.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="text-3xl font-bold text-primary">{nextSAT.daysUntil} days</div>
          </div>

          {/* PRIMARY CTA - Try 3 Questions (for non-logged in users) */}
          {!user && (
            <Button 
              size="lg" 
              onClick={handleTry3Questions}
              className="mb-4 gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-pulse"
            >
              <Sparkles className="w-5 h-5" />
              Try 3 Questions Now — No Signup
            </Button>
          )}
          
          {/* Carpe Diem Daily Challenge */}
          <Link to="/daily">
            <Button size="lg" className="font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
              <Zap className="w-5 h-5" />
              Carpe Diem: 10 Daily Questions
            </Button>
          </Link>
        </header>

        {/* SAT Boss Arena - The Epic Countdown */}
        {user && activePlan && daysUntilExam > 0 && (
          <div className="mb-4">
            <SATBossArena
              daysUntilExam={daysUntilExam}
              currentStreak={streak?.current_streak || 0}
              pendingReviewCount={pendingReviewCount}
              totalQuestionsAnswered={totalQuestionsAnswered}
              recentCorrectAnswers={recentCorrectAnswers}
              playerAvatar={playerAvatar}
              playerUsername={playerUsername}
              lastPracticeDate={streak?.last_practice_date}
            />
          </div>
        )}

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

        {/* Master What You Missed Alert */}
        {user && showReviewAlert && (
          <Card className="p-4 mb-4 border-2 border-destructive/50 bg-destructive/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-destructive/20">
                  <RotateCcw className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-destructive">Review Backlog Alert!</p>
                  <p className="text-xs text-muted-foreground">
                    {pendingReviewCount} missed questions waiting for review
                  </p>
                </div>
              </div>
              <Link to="/review">
                <Button size="sm" variant="destructive">
                  Review Now
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Workplan Progress - For users with active study plan */}
        {activePlan && workplan && (
          <Card className="p-4 mb-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold">Your Path to {activePlan.target_score || 1600}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{weeksUntilExam} weeks left</p>
              </div>
            </div>

            {/* Key metrics grid - with accelerators */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <p className="text-lg font-bold text-primary">{workplan.adjustedDailyQuestions}</p>
                <p className="text-[10px] text-muted-foreground">Q/day (6 days)</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-500/10 text-center">
                <p className="text-lg font-bold text-orange-500">{workplan.recommendedPracticeTests}</p>
                <p className="text-[10px] text-muted-foreground">Practice Tests</p>
              </div>
              <div className="p-2 rounded-lg bg-green-500/10 text-center">
                <p className="text-lg font-bold text-green-500">{workplan.adjustedTotalQuestions?.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Questions Left</p>
              </div>
            </div>

            {/* Accelerator Credits Summary */}
            {workplan.creditsEarned > 0 && (
              <div className="p-2 mb-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-medium">Accelerator Credits Earned</span>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">{Math.round(workplan.creditsEarned).toLocaleString()}</span>
                </div>
                {workplan.recentCredits > 0 && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    +{Math.round(workplan.recentCredits).toLocaleString()} this week from hard questions, reviews & battles
                  </p>
                )}
              </div>
            )}

            {/* Difficulty breakdown */}
            <div className="space-y-1 text-xs">
              {workplan.breakdown.map((band, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {band.range}
                    {band.multiplier > 1 && (
                      <span className="ml-1 text-orange-500">({band.multiplier}x)</span>
                    )}
                  </span>
                  <span className="font-medium">{band.questions.toLocaleString()} Q</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
              ⚡ Earn accelerators: Hard Q (1.5x), Spaced Review (up to 2x), Battles, Prediction Tests
            </p>
          </Card>
        )}
        {/* Personalized Stats - Only for logged in users WITH data for this exam */}
        {user && ratings && (ratings.mathQuestionsAnswered + ratings.englishQuestionsAnswered > 0) && (
          <Card className="p-4 mb-4 border-2 border-primary/20">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-bold text-primary font-mono">
                  {projectedScore ? `${projectedScore.min}-${projectedScore.max}` : '—'}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Projected {examConfig.shortName}</p>
                  <p className="text-sm font-medium">{skillLevel?.level}</p>
                </div>
              </div>
              {examType !== 'act' && (
                <p className="text-xs text-muted-foreground mb-2">
                  Skill Rating: <span className="font-semibold text-foreground">{Math.round(ratings.overallRating)}</span>
                </p>
              )}
              <div className="flex items-center justify-center gap-4">
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
          </Card>
        )}

        {/* Revenge Mode Banner */}
        <div className="mb-4">
          <RevengeModeBanner />
        </div>

        {/* Perfect Streak */}
        {perfectStreak.best > 0 && (
          <div className="mb-4">
            <PerfectStreakDisplay current={perfectStreak.current} best={perfectStreak.best} compact />
          </div>
        )}

        {/* Subject Duel - only for exams with data */}
        {ratings && ratings.mathQuestionsAnswered > 0 && ratings.englishQuestionsAnswered > 0 && (
          <div className="mb-4">
            <SubjectDuelCard mathRating={ratings.mathRating} englishRating={ratings.englishRating} examType={examType} />
          </div>
        )}

        {/* Tagline - exam-specific */}
        <h2 className="text-lg font-bold text-foreground text-center mb-4">
          Be one of the <InlineMath math={examConfig.branding.mathTaglineKatex} /> {examConfig.branding.mathTaglineLabel}
        </h2>
        {/* Extra math flair for ACT/PSAT */}
        {examConfig.branding.extraMathFlair && examConfig.branding.extraMathFlair.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-4">
            {examConfig.branding.extraMathFlair.map((expr, i) => (
              <span key={i} className="text-sm text-muted-foreground font-mono opacity-70">
                <InlineMath math={expr} />
              </span>
            ))}
          </div>
        )}

        {/* Main Practice Actions - Reorganized */}
        <Card className="p-4 mb-4 border-2 border-border">
          <div className="flex flex-col gap-3 items-center">
            {/* Battle Your Friends - First */}
            <Link to="/battle" className="w-full max-w-xs">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-center bg-destructive/10 border-destructive/30 hover:bg-destructive/20">
                <Swords className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-sm font-medium">Battle Your Friends</span>
              </Button>
            </Link>
            
            {/* Prediction Test - Second */}
            <Link to="/practice-test" className="w-full max-w-xs">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-center border-emerald-500/30 hover:bg-emerald-500/10">
                <Target className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium font-mono">{examConfig.predictionTest.testName}</span>
              </Button>
            </Link>

            {/* Practice 10 Questions - Combined */}
            <Button 
              variant="outline"
              className="w-full max-w-xs h-auto py-3 flex items-center gap-3 justify-center border-primary/30 hover:bg-primary/10"
              onClick={() => navigate('/quiz?subject=both&count=10&difficulty=all&timer=true')}
            >
              <Play className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium">Practice 10 Questions</span>
            </Button>

            {/* Rapid Fire Facts Challenge */}
            <Link to="/rapid-facts" className="w-full max-w-xs">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-center bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-400/30 hover:border-amber-400/50">
                <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">⚡ Rapid Fire Facts Challenge</span>
                  <span className="text-[10px] text-muted-foreground">60s timed quiz • {examConfig.shortName}</span>
                </div>
              </Button>
            </Link>

            {/* Quick Practice - Math, English & Science (ACT) */}
            <div className={`grid ${examType === 'act' ? 'grid-cols-3' : 'grid-cols-2'} gap-3 w-full max-w-xs`}>
              <Button 
                variant="outline"
                className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-primary/10"
                onClick={() => handleQuickStart('math')}
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Math</span>
                </div>
                {ratings && ratings.mathQuestionsAnswered > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ~{ratingToSectionScore(ratings.mathRating, examType)}/{examConfig.sectionScoreRange.max}
                  </span>
                )}
              </Button>
              <Button 
                variant="outline"
                className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-secondary/10"
                onClick={() => handleQuickStart('english')}
              >
                <div className="flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">English</span>
                </div>
                {ratings && ratings.englishQuestionsAnswered > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ~{ratingToSectionScore(ratings.englishRating, examType)}/{examConfig.sectionScoreRange.max}
                  </span>
                )}
              </Button>
              {examType === 'act' && (
                <Button 
                  variant="outline"
                  className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-cyan-500/10 border-cyan-500/30"
                  onClick={() => handleQuickStart('science')}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium">Science</span>
                  </div>
                  <span className="text-xs text-muted-foreground">263 Q</span>
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Study Modes */}
        <Card className="p-4 mb-4 border-2 border-border">
          <div className="flex flex-col gap-3">
            <Link to="/practice-test?mode=full" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <FileText className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium">Take a Full Length Test</span>
              </Button>
            </Link>
            <Link to="/mastery" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-sm font-medium">Study Priorities & Progress</span>
              </Button>
            </Link>
            <Link to="/problems-by-topic" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Master by Topic</span>
              </Button>
            </Link>
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
            <Link to="/insights" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start">
                <Brain className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm font-medium">Insights</span>
              </Button>
            </Link>
            <Link to="/key-principles" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start border-amber-400/30 hover:border-amber-400/50">
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-medium">Key {examConfig.shortName} Principles</span>
              </Button>
            </Link>
            <Link to="/boss-battle" className="w-full">
              <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start border-destructive/30 hover:bg-destructive/10">
                <Skull className="w-5 h-5 text-destructive flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Daily Boss Battle</span>
                  <span className="text-[10px] text-muted-foreground">One ultra-hard question. One shot.</span>
                </div>
              </Button>
            </Link>
            {/* Elite Practice - 3 Tiers */}
            <div className="w-full space-y-2">
              <Link to="/elite-practice?tier=1600_club" className="w-full block">
                <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/40 hover:border-amber-400/60">
                  <Crown className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-amber-400">Elite Practice: Sleight of Hand</span>
                    <span className="text-[10px] text-muted-foreground">1500 → 1600 • Difficulty 12-13 • 45s pacing</span>
                  </div>
                </Button>
              </Link>
              <Link to="/elite-practice?tier=elite_1500" className="w-full block">
                <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/40 hover:border-purple-400/60">
                  <Target className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-purple-400">Elite Practice: Breaking Through</span>
                    <span className="text-[10px] text-muted-foreground">1400 → 1500 • Difficulty 10-12 • 55s pacing</span>
                  </div>
                </Button>
              </Link>
              <Link to="/elite-practice?tier=breakthrough_1400" className="w-full block">
                <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-start bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/40 hover:border-blue-400/60">
                  <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-blue-400">Elite Practice: Foundation Force</span>
                    <span className="text-[10px] text-muted-foreground">1300 → 1400 • Difficulty 8-11 • 65s pacing</span>
                  </div>
                </Button>
              </Link>
            </div>
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

        {/* Word of the Day */}
        <div className="mb-4">
          <WordOfTheDay />
        </div>

        {/* Streak Calendar */}
        {streak && (
          <div className="mb-4">
            <StreakCalendar
              practiceDates={practiceDates}
              currentStreak={streak.current_streak}
              longestStreak={streak.longest_streak}
            />
          </div>
        )}

        {/* Speed Demon Challenges */}
        <div className="mb-4">
          <SpeedDemonCard examType={examType} />
        </div>

        {/* Achievement Chains */}
        <div className="mb-4">
          <AchievementChains
            questionsAnswered={totalQuestionsAnswered}
            dailyStreak={streak?.current_streak || 0}
            compact={false}
          />
        </div>

        {/* Friend Link */}
        <div className="mb-4">
          <Link to="/friends">
            <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-center">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Friend Link</span>
            </Button>
          </Link>
        </div>

        {/* Bottom Tagline */}
        <p className="text-center text-sm text-muted-foreground italic mb-4">
          Your future self thanks you!
        </p>

        {/* Quick Links - Mobile optimized grid */}
        <div className="grid grid-cols-3 gap-4 mt-auto pb-2 px-4">
          <Link to="/why-it-works" className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-primary">
              <Zap className="w-5 h-5" />
            </Button>
            <span className="text-xs text-primary font-medium text-center leading-tight">Why</span>
          </Link>
          <a 
            href="/study-strategy-1600.txt" 
            download="SAT-1600-Study-Strategy.txt"
            className="flex flex-col items-center"
          >
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-amber-500">
              <Download className="w-5 h-5" />
            </Button>
            <span className="text-xs text-amber-500 font-medium text-center leading-tight">1600 Guide</span>
          </a>
          <Link to="/demo" className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-green-500">
              <GraduationCap className="w-5 h-5" />
            </Button>
            <span className="text-xs text-green-500 font-medium text-center leading-tight">Demo</span>
          </Link>
        </div>

        {/* Version */}
        <div className="flex flex-col items-center gap-2 pb-4">
          <p className="text-xs text-muted-foreground">v{APP_VERSION}</p>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Home;
