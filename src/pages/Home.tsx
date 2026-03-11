import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { LazyInlineMath } from '@/components/LazyKaTeX';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calculator, PenTool, Trophy, Zap, Users, LogIn, User, 
  Award, Swords, ChevronRight, Flame, Brain, X,
  Target, RotateCcw, BookOpen, RefreshCw, FileText, Crown, GraduationCap,
  Clock, Sparkles, Download, Lightbulb, Play, Skull, Settings, Gamepad2,
  Smartphone, Map, Star, Eye, UserPlus, ClipboardList, Building2, Heart,
  Bell, MessageCircle, FolderOpen, Coins, Timer, Layers, UsersRound,
  Calendar, CircleDot, BookMarked, FileBarChart, TrendingUp, CalendarDays, FileQuestion, Bolt, HeartPulse, GitCompareArrows, NotebookPen, Microscope, TextQuote, Wand2, BookOpenCheck, Route
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
import { ExamSelector } from "@/components/ExamSelector";
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS, ratingToExamScore, ratingToSectionScore } from "@/utils/examConfig";
import { SubjectDuelCard } from "@/components/SubjectDuelCard";
import { RevengeModeBanner } from "@/components/RevengeModeBanner";
import { PerfectStreakDisplay } from "@/components/PerfectStreakDisplay";
import { usePerfectStreak } from "@/hooks/usePerfectStreak";
import { PlayerLevelBadge } from "@/components/PlayerLevelBadge";
import { BottomNav } from "@/components/BottomNav";
import { WelcomeModal } from "@/components/WelcomeModal";
import { SubjectPinManager } from "@/components/SubjectPinManager";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pin } from "lucide-react";

// Motivational messages for non-logged in or idle users
const motivationalMessages = [
  "Ready to crush the SAT? Start with 10 questions!",
  "Top scorers practice daily. Join them!",
  "1600 club awaits. Take the first step!",
];

// Official exam test dates by type
const upcomingSATDates = [
  new Date("2026-03-14"),
  new Date("2026-05-02"),
  new Date("2026-06-06"),
  new Date("2026-08-22"),
  new Date("2026-09-12"),
  new Date("2026-10-03"),
];

const upcomingACTDates = [
  new Date("2026-04-11"),
  new Date("2026-06-13"),
  new Date("2026-07-11"),
];

const upcomingPSATDates = [
  new Date("2026-10-01"),
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
  
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const { ratings } = useSkillRating();
  const { activePlan, showReminder, dismissReminder, daysUntilExam, weeksUntilExam, workplan, pendingReviewCount, showReviewAlert } = useStudyPlan();
  const { examType, needsSelection, setExamType } = useExamType();
  const isMobile = useIsMobile();
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
  const [showExamSelector, setShowExamSelector] = useState(false);
  const [hasChosenExamThisSession, setHasChosenExamThisSession] = useState(false);
  const [pinnedSubjects, setPinnedSubjects] = useState<string[]>([]);
  const [showPinManager, setShowPinManager] = useState(false);

  const nextSAT = getNextExamDate(examType);

  // Require an explicit exam choice once per browser session after login
  useEffect(() => {
    if (!user) {
      setHasChosenExamThisSession(false);
      return;
    }

    const key = `exam_choice_session_${user.id}`;
    setHasChosenExamThisSession(sessionStorage.getItem(key) === "true");
  }, [user]);

  // Fetch player stats — single consolidated DB call
  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (!user) return;
      
      const { data, error } = await supabase.rpc('get_home_dashboard_stats', {
        p_user_id: user.id,
      });
      
      if (error || !data) return;
      
      const stats = data as any;
      setTotalQuestionsAnswered(stats.total_questions || 0);
      setRecentCorrectAnswers(stats.recent_correct || 0);
      setPlayerUsername(stats.username || "Fighter");
      setPlayerAvatar(stats.avatar_emoji || "🧑‍🚀");
      setPinnedSubjects(stats.pinned_subjects || []);
      setPracticeDates(stats.practice_dates || []);
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

  const handleTry10Questions = () => {
    navigate(`/quiz?subject=both&count=10&difficulty=easy&timer=false`);
  };

  const handle40SquaredClick = () => {
    setShowExamSelector(true);
  };

  const projectedScore = ratings ? ratingToExamScore(ratings.overallRating, examType) : null;
  const skillLevel = ratings ? getSkillLevel(ratings.overallRating) : null;

  // Show landing page for guests
  if (!user) {
    return <LandingPage />;
  }

  // Show exam selector on first authenticated screen, or when manually toggled
  if (needsSelection || showExamSelector || !hasChosenExamThisSession) {
    return (
      <ExamSelector
        onSelect={(type) => {
          setExamType(type);
          setShowExamSelector(false);
          setHasChosenExamThisSession(true);
          if (user) {
            sessionStorage.setItem(`exam_choice_session_${user.id}`, "true");
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex flex-col pb-16">
      {/* PWA Update Banner */}
      {hasUpdate && (
        <div className="px-4 py-2 bg-primary/10 text-center">
          <Button onClick={forceUpdate} disabled={isUpdating} variant="default" size="sm" className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            {isUpdating ? "Updating..." : "Update PWA"}
          </Button>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1 animate-in fade-in duration-300">
        
        {/* Hero Header */}
        <header className="flex flex-col items-center text-center mb-4 pt-4 relative w-full max-w-full">
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
              {isUpdating ? "..." : hasUpdate ? `🆕 Update v${APP_VERSION}` : `v${APP_VERSION}`}
            </Button>
          </div>

          {/* Profile at top right */}
          <div className="absolute top-4 right-0 flex flex-col items-end gap-1 max-w-[45%]">
            <div className="flex items-center gap-1">
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Trophy className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm text-muted-foreground truncate max-w-[120px]">
                {playerAvatar} <span className="font-semibold text-foreground">{playerUsername}</span>
              </p>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <Settings className="w-3 h-3 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="mb-4 mt-14 pt-2 w-full max-w-full overflow-hidden">
            <SATMasteryLogo
              size={isMobile ? "lg" : "xl"}
              layout={isMobile ? "stacked" : "row"}
              clickable
              onClick={handle40SquaredClick}
              examType={examType}
            />
          </div>

          {/* Current exam indicator */}
          <div className="flex items-center justify-center mb-2">
            <button
              onClick={handle40SquaredClick}
              className="text-base px-5 py-2.5 rounded-full font-bold bg-primary text-primary-foreground shadow-md"
            >
              {examConfig.icon} {examConfig.shortName} Mode
            </button>
          </div>

          {/* Exam Countdown */}
          <div className="mb-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Next {examConfig.shortName}: {nextSAT.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="text-3xl font-bold text-primary">{nextSAT.daysUntil} days</div>
          </div>
        </header>

        {/* ══════════ #1 PRIMARY CTA: Practice 10 Questions ══════════ */}
        <Card className="p-4 mb-4 border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <Button 
            size="lg"
            className="w-full gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] h-14"
            onClick={() => navigate('/quiz?subject=both&count=10&difficulty=all&timer=true')}
          >
            <Play className="w-6 h-6" />
            Practice 10 Questions
          </Button>
          {/* Quick subject buttons below */}
          <div className={`grid ${examType === 'act' ? 'grid-cols-3' : 'grid-cols-2'} gap-2 mt-3`}>
            <Button 
              variant="outline" size="sm"
              className="h-auto py-2 flex items-center gap-2 hover:bg-primary/10"
              onClick={() => handleQuickStart('math')}
            >
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">Math</span>
              {ratings && ratings.mathQuestionsAnswered > 0 && (
                <span className="text-[10px] text-muted-foreground ml-auto">
                  ~{ratingToSectionScore(ratings.mathRating, examType)}
                </span>
              )}
            </Button>
            <Button 
              variant="outline" size="sm"
              className="h-auto py-2 flex items-center gap-2 hover:bg-secondary/10"
              onClick={() => handleQuickStart('english')}
            >
              <PenTool className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium">English</span>
              {ratings && ratings.englishQuestionsAnswered > 0 && (
                <span className="text-[10px] text-muted-foreground ml-auto">
                  ~{ratingToSectionScore(ratings.englishRating, examType)}
                </span>
              )}
            </Button>
            {examType === 'act' && (
              <Button 
                variant="outline" size="sm"
                className="h-auto py-2 flex items-center gap-2 hover:bg-cyan-500/10 border-cyan-500/30"
                onClick={() => handleQuickStart('science')}
              >
                <Brain className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-medium">Science</span>
              </Button>
            )}
          </div>
        </Card>

        {/* Carpe Diem Daily Challenge */}
        <Link to="/daily" className="mb-4 block">
          <Button size="lg" className="w-full font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <Zap className="w-5 h-5" />
            Carpe Diem: 10 Daily Questions
          </Button>
        </Link>

        {/* Personalized Stats - compact */}
        {user && ratings && (ratings.mathQuestionsAnswered + ratings.englishQuestionsAnswered > 0) && (() => {
          const r = ratings.overallRating;
          const tiers = [
            { min: 0, max: 1000, label: 'Developing', next: 'Progressing' },
            { min: 1000, max: 1200, label: 'Progressing', next: 'Proficient' },
            { min: 1200, max: 1400, label: 'Proficient', next: 'Advanced' },
            { min: 1400, max: 1600, label: 'Advanced', next: 'Mastery' },
            { min: 1600, max: 2000, label: 'Mastery', next: null },
          ];
          const currentTier = tiers.find(t => r >= t.min && r < t.max) || tiers[tiers.length - 1];
          const tierRange = currentTier.max - currentTier.min;
          const tierProgress = Math.min(100, Math.round(((r - currentTier.min) / tierRange) * 100));

          return (
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
                <div className="w-full max-w-xs mb-2">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{currentTier.label}</span>
                    {currentTier.next && <span>{currentTier.next} →</span>}
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                      style={{ width: `${tierProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {tierProgress}% to {currentTier.next || 'max'}{currentTier.next ? ` · ${currentTier.max - Math.round(r)} rating pts remaining` : ''}
                  </p>
                </div>
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
          );
        })()}

        {/* SAT Boss Arena */}
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

        {/* Review Backlog Alert */}
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
                <Button size="sm" variant="destructive">Review Now</Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Workplan Progress */}
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

        {/* Player Level Badge */}
        {user && totalQuestionsAnswered > 0 && (
          <PlayerLevelBadge totalQuestions={totalQuestionsAnswered} />
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

        {/* Subject Duel */}
        {ratings && ratings.mathQuestionsAnswered > 0 && ratings.englishQuestionsAnswered > 0 && (
          <div className="mb-4">
            <SubjectDuelCard mathRating={ratings.mathRating} englishRating={ratings.englishRating} examType={examType} />
          </div>
        )}

        {/* Tagline */}
        <h2 className="text-lg font-bold text-foreground text-center mb-4">
          Be one of the <LazyInlineMath math={examConfig.branding.mathTaglineKatex} /> {examConfig.branding.mathTaglineLabel}
        </h2>
        {examConfig.branding.extraMathFlair && examConfig.branding.extraMathFlair.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-4">
            {examConfig.branding.extraMathFlair.map((expr, i) => (
              <span key={i} className="text-sm text-muted-foreground font-mono opacity-70">
                <LazyInlineMath math={expr} />
              </span>
            ))}
          </div>
        )}

        {/* Quick Actions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <Link to="/battle" className="flex-1">
            <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-2 justify-center bg-destructive/10 border-destructive/30 hover:bg-destructive/20">
              <Swords className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">Battle</span>
            </Button>
          </Link>
          <Link to="/practice-test" className="flex-1">
            <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-2 justify-center border-emerald-500/30 hover:bg-emerald-500/10">
              <Target className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-center leading-tight">{examConfig.predictionTest.testName}</span>
            </Button>
          </Link>
          <Link to="/rapid-facts" className="flex-1">
            <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-2 justify-center border-amber-400/30 hover:border-amber-400/50">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">Rapid Fire</span>
            </Button>
          </Link>
        </div>

        {/* Activities Grid - Categorized & Mobile-Gated */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Activities</h3>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground" onClick={() => setShowPinManager(true)}>
              <Pin className="w-3 h-3" />
              Customize
            </Button>
          </div>
          {(() => {
            type TileCategory = 'core' | 'study-tools' | 'social' | 'assessments' | 'advanced' | 'admin';
            const allTiles: Array<{
              id: string; icon: any; label: string; color: string; iconColor: string; to: string;
              exams: ('sat' | 'psat' | 'act')[]; category: TileCategory; mobileVisible: boolean;
            }> = [
              // CORE — always visible on mobile
              { id: 'by-topic', icon: BookOpen, label: 'By Topic', color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', to: '/problems-by-topic', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'review-missed', icon: RotateCcw, label: 'Review Missed', color: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400', to: '/review', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'weaknesses', icon: Target, label: 'Weaknesses', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', to: '/study?mode=weakness', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'full-test', icon: FileText, label: 'Full Test', color: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', to: '/practice-test?mode=full', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'study-progress', icon: Trophy, label: 'Study Progress', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', to: '/mastery', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'insights', icon: Brain, label: 'Insights', color: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', to: '/insights', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'daily-quests', icon: Star, label: 'Daily Quests', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', to: '/daily-quests', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },
              { id: 'quick-review', icon: RefreshCw, label: 'Quick Review', color: 'bg-lime-100 dark:bg-lime-900/30', iconColor: 'text-lime-600 dark:text-lime-400', to: '/quick-review', exams: ['sat', 'psat', 'act'], category: 'core', mobileVisible: true },

              // STUDY TOOLS
              { id: 'sat-vocab', icon: BookOpen, label: `${examConfig.shortName} Vocabulary`, color: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', to: '/vocab', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: true },
              { id: 'flashcards', icon: Layers, label: 'Flashcards', color: 'bg-sky-100 dark:bg-sky-900/30', iconColor: 'text-sky-600 dark:text-sky-400', to: '/flashcards', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: true },
              { id: 'key-rules', icon: Lightbulb, label: `Key ${examConfig.shortName} Rules`, color: 'bg-yellow-100 dark:bg-yellow-900/30', iconColor: 'text-yellow-600 dark:text-yellow-400', to: '/key-principles', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: true },
              { id: 'cheat-sheet', icon: FileQuestion, label: 'Cheat Sheet', color: 'bg-fuchsia-100 dark:bg-fuchsia-900/30', iconColor: 'text-fuchsia-600 dark:text-fuchsia-400', to: '/cheat-sheet', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: true },
              { id: 'word-of-day', icon: TextQuote, label: 'Word of Day', color: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400', to: '/word-of-day', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: true },
              { id: 'math-tricks', icon: Wand2, label: 'Math Tricks', color: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400', to: '/math-tricks', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: false },
              { id: 'concepts', icon: Microscope, label: 'Concepts', color: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', to: '/concepts', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: false },
              { id: 'test-day-tips', icon: HeartPulse, label: 'Test Day Tips', color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', to: '/test-day-tips', exams: ['sat', 'psat', 'act'], category: 'study-tools', mobileVisible: false },

              // SOCIAL & COMPETITIVE
              { id: 'arcade', icon: Gamepad2, label: 'Arcade', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', to: '/arcade', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: true },
              { id: 'boss-battle', icon: Skull, label: 'Boss Battle', color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', to: '/boss-battle', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: true },
              { id: 'endurance', icon: Flame, label: 'Endurance Run', color: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400', to: '/endurance', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },
              { id: 'speed-drill', icon: Bolt, label: 'Speed Drill', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', to: '/speed-drill', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },
              { id: 'elite-practice', icon: Crown, label: 'Elite Practice', color: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30', iconColor: 'text-amber-500', to: '/elite-practice', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },
              { id: 'friend-compare', icon: GitCompareArrows, label: 'Compare', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', to: '/friend-compare', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },
              { id: 'study-groups', icon: UsersRound, label: 'Study Groups', color: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', to: '/study-groups', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },
              { id: 'conversations', icon: MessageCircle, label: 'Conversations', color: 'bg-lime-100 dark:bg-lime-900/30', iconColor: 'text-lime-600 dark:text-lime-400', to: '/conversations', exams: ['sat', 'psat', 'act'], category: 'social', mobileVisible: false },

              // ASSESSMENTS & AI
              { id: 'coach', icon: Sparkles, label: 'AI Coach', color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', to: '/coach', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: true },
              { id: 'ai-tutor', icon: MessageCircle, label: 'AI Tutor', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', to: '/ai-tutor', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: true },
              { id: 'score-predictor', icon: TrendingUp, label: 'Score Predictor', color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', to: '/score-predictor', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'personality', icon: Heart, label: 'Personality', color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', to: '/personality', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'cognitive', icon: Brain, label: 'Brain Games', color: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400', to: '/cognitive', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'iq-test', icon: Brain, label: 'IQ Test', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', to: '/iq-test', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'health-screening', icon: Heart, label: 'Health Checks', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', to: '/health-screening', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'logic-games', icon: Brain, label: 'Logic Games', color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', to: '/logic-games', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: false },
              { id: 'homework-solver', icon: BookOpenCheck, label: 'HW Solver', color: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', to: '/homework-solver', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: true },
              { id: 'thinkpath', icon: Route, label: 'ThinkPath', color: 'bg-fuchsia-100 dark:bg-fuchsia-900/30', iconColor: 'text-fuchsia-600 dark:text-fuchsia-400', to: '/thinkpath', exams: ['sat', 'psat', 'act'], category: 'assessments', mobileVisible: true },

              // ADVANCED — planning, tracking, admin
              { id: 'skill-map', icon: Map, label: 'Skill Map', color: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400', to: '/skill-map', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'study-planner', icon: CalendarDays, label: 'Study Planner', color: 'bg-sky-100 dark:bg-sky-900/30', iconColor: 'text-sky-600 dark:text-sky-400', to: '/study-planner', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'streak-calendar', icon: Calendar, label: 'Calendar', color: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400', to: '/streak-calendar', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'weekly-goals', icon: CircleDot, label: 'Weekly Goals', color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', to: '/weekly-goals', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'achievements', icon: Award, label: 'Achievements', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', to: '/achievements', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'mistake-journal', icon: BookMarked, label: 'Mistake Journal', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', to: '/mistake-journal', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'progress-report', icon: FileBarChart, label: 'Report Card', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', to: '/progress-report', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'practice-log', icon: NotebookPen, label: 'Practice Log', color: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', to: '/practice-log', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'portfolio', icon: FolderOpen, label: 'Portfolio', color: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', to: '/portfolio', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'strategy', icon: Target, label: 'Strategy', color: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400', to: '/strategy', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'exam-simulator', icon: Clock, label: 'Exam Simulator', color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', to: '/exam-simulator', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },
              { id: 'next-steps', icon: Brain, label: 'What\'s Next', color: 'bg-fuchsia-100 dark:bg-fuchsia-900/30', iconColor: 'text-fuchsia-600 dark:text-fuchsia-400', to: '/next-steps', exams: ['sat', 'psat', 'act'], category: 'advanced', mobileVisible: false },

              // ADMIN — role-specific
              { id: 'pro-exams', icon: GraduationCap, label: 'Pro Exams', color: 'bg-slate-100 dark:bg-slate-900/30', iconColor: 'text-slate-600 dark:text-slate-400', to: '/pro-exams', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'teacher', icon: Users, label: 'Teacher Hub', color: 'bg-sky-100 dark:bg-sky-900/30', iconColor: 'text-sky-600 dark:text-sky-400', to: '/teacher', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'parent', icon: Eye, label: 'Parent View', color: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400', to: '/parent', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'join-class', icon: UserPlus, label: 'Join Class', color: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', to: '/join-class', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'my-assignments', icon: ClipboardList, label: 'Assignments', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', to: '/my-assignments', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'school-admin', icon: Building2, label: 'School Admin', color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', to: '/school-admin', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'shop', icon: Coins, label: 'Coin Shop', color: 'bg-yellow-100 dark:bg-yellow-900/30', iconColor: 'text-yellow-600 dark:text-yellow-400', to: '/shop', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'timer', icon: Timer, label: 'Study Timer', color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', to: '/timer', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'notifications', icon: Bell, label: 'Inbox', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', to: '/notifications', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: false },
              { id: 'install', icon: Smartphone, label: 'Install App', color: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', to: '/install', exams: ['sat', 'psat', 'act'], category: 'admin', mobileVisible: true },
            ];

            const filtered = allTiles.filter(tile => tile.exams.includes(examType as any));

            // On mobile: only show mobileVisible tiles + any pinned tiles
            const visibleTiles = isMobile
              ? filtered.filter(t => t.mobileVisible || pinnedSubjects.includes(t.id))
              : filtered;

            // Sort: pinned first
            const sorted = [...visibleTiles].sort((a, b) => {
              const aPin = pinnedSubjects.includes(a.id) ? 0 : 1;
              const bPin = pinnedSubjects.includes(b.id) ? 0 : 1;
              return aPin - bPin;
            });

            const hiddenCount = filtered.length - visibleTiles.length;

            const categoryLabels: Record<TileCategory, string> = {
              'core': '📚 Core Practice',
              'study-tools': '🔧 Study Tools',
              'social': '⚔️ Games & Social',
              'assessments': '🧠 AI & Assessments',
              'advanced': '📊 Planning & Tracking',
              'admin': '🏫 Classroom & More',
            };

            // On desktop, group by category
            if (!isMobile) {
              const categories: TileCategory[] = ['core', 'study-tools', 'social', 'assessments', 'advanced', 'admin'];
              return (
                <div className="space-y-6">
                  {categories.map(cat => {
                    const catTiles = sorted.filter(t => t.category === cat);
                    if (catTiles.length === 0) return null;
                    return (
                      <div key={cat}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{categoryLabels[cat]}</h4>
                        <div className="grid grid-cols-4 gap-3">
                          {catTiles.map((item) => (
                            <Link key={item.id} to={item.to}>
                              <div className={`${item.color} rounded-xl p-4 flex flex-col items-center text-center gap-2 aspect-square justify-center hover:scale-105 transition-transform cursor-pointer border ${pinnedSubjects.includes(item.id) ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/50'}`}>
                                <div className="w-14 h-14 rounded-full bg-background/60 flex items-center justify-center relative">
                                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                                  {pinnedSubjects.includes(item.id) && (
                                    <Pin className="w-3 h-3 text-primary absolute -top-1 -right-1" />
                                  )}
                                </div>
                                <span className="text-xs font-semibold leading-tight text-foreground">{item.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Mobile: flat grid, compact
            return (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {sorted.map((item) => (
                    <Link key={item.id} to={item.to}>
                      <div className={`${item.color} rounded-xl p-2.5 flex flex-col items-center text-center gap-1.5 justify-center hover:scale-105 transition-transform cursor-pointer border ${pinnedSubjects.includes(item.id) ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/50'}`}>
                        <div className="w-10 h-10 rounded-full bg-background/60 flex items-center justify-center relative">
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                          {pinnedSubjects.includes(item.id) && (
                            <Pin className="w-2.5 h-2.5 text-primary absolute -top-0.5 -right-0.5" />
                          )}
                        </div>
                        <span className="text-[10px] font-semibold leading-tight text-foreground">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <Card className="p-3 border-dashed border-primary/30 bg-primary/5 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-primary">
                      <Smartphone className="w-4 h-4" />
                      <span className="font-medium">{hiddenCount} more tools on desktop</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Pin favorites via Customize to access them here
                    </p>
                  </Card>
                )}
              </div>
            );
          })()}
        </div>
        {/* Mini cards row: Badges + Leaderboard */}
        <div className="grid grid-cols-2 gap-3 mb-4">
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

        {/* Friend Link */}
        <div className="mb-4">
          <Link to="/friends">
            <Button variant="outline" className="w-full h-auto py-3 flex items-center gap-3 justify-center">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Friend Link</span>
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 pb-2 px-4">
          <Link to="/why-it-works" className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-primary">
              <Zap className="w-5 h-5" />
            </Button>
            <span className="text-xs text-primary font-medium text-center leading-tight">Why</span>
          </Link>
          <a href="/study-strategy-1600.txt" download="SAT-1600-Study-Strategy.txt" className="flex flex-col items-center">
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

      {/* Welcome Modal for new users */}
      <WelcomeModal />

      {/* Subject Pin Manager */}
      <SubjectPinManager
        isOpen={showPinManager}
        onClose={() => setShowPinManager(false)}
        pinnedSubjects={pinnedSubjects}
        onSave={setPinnedSubjects}
      />

      {/* Persistent Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
