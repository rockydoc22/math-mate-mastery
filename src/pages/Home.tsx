import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, PenTool, Shuffle, Trophy, Zap, Users, BookMarked, LogIn, User, Award, Swords, Target, Brain, RefreshCw } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { StreakBadge } from "@/components/StreakBadge";
import { XPBar } from "@/components/XPBar";
import { AchievementBadge } from "@/components/AchievementBadge";
import { SkillRatingCard } from "@/components/SkillRatingCard";
import { DifficultyRange, filterByDifficulty } from "@/utils/difficultyRating";

// Get counts by difficulty range
const allMathQuestions = [...questions, ...visualMathQuestions, ...moreMathVisualQuestions];
const allEnglishQuestions = [...englishQuestions, ...visualEnglishQuestions, ...moreEnglishVisualQuestions];

type Subject = "math" | "english" | "both";
type QuestionCount = 10 | 25 | 50 | 98;

const Home = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const { ratings } = useSkillRating();
  const [subject, setSubject] = useState<Subject>("math");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [difficultyRange, setDifficultyRange] = useState<DifficultyRange>("all");

  // Calculate available questions based on filters
  const availableCounts = useMemo(() => {
    const mathFiltered = filterByDifficulty(allMathQuestions, difficultyRange);
    const englishFiltered = filterByDifficulty(allEnglishQuestions, difficultyRange);
    return {
      math: mathFiltered.length,
      english: englishFiltered.length,
      both: mathFiltered.length + englishFiltered.length
    };
  }, [difficultyRange]);

  // Calculate counts per difficulty level
  const countsPerLevel = useMemo(() => {
    const allQuestions = [...allMathQuestions, ...allEnglishQuestions];
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 10; i++) {
      counts[i] = allQuestions.filter(q => (q.difficultyRating || 5) === i).length;
    }
    return counts;
  }, []);

  const handleStartPractice = () => {
    navigate(`/quiz?subject=${subject}&count=${questionCount}&difficulty=${difficultyRange}`);
  };

  const subjectOptions = [
    { value: "math" as Subject, label: "Math", icon: Calculator, color: "primary" },
    { value: "english" as Subject, label: "English", icon: PenTool, color: "secondary" },
    { value: "both" as Subject, label: "Both", icon: Shuffle, color: "accent" },
  ];

  const countOptions: { value: QuestionCount; label: string }[] = [
    { value: 10, label: "10 Questions" },
    { value: 25, label: "25 Questions" },
    { value: 50, label: "50 Questions" },
    { value: 98, label: "Full SAT (98 Q)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        {/* Header with Auth */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {user && streak && <StreakBadge streak={streak.current_streak} />}
          </div>
          <div className="flex items-center gap-1">
            <Link to="/battle">
              <Button variant="ghost" size="sm" className="gap-1 text-destructive">
                <Swords className="w-4 h-4" />
                <span className="hidden sm:inline">Battle</span>
              </Button>
            </Link>
            <Link to="/daily">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Daily</span>
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Ranks</span>
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/study">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <BookMarked className="w-4 h-4" />
                    <span className="hidden sm:inline">Study</span>
                  </Button>
                </Link>
                <Link to="/friends">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Friends</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Hero */}
        <div className="text-center space-y-4 py-6">
          {/* Math expressions floating around */}
          <div className="relative flex justify-center items-center mb-6">
            {/* Left expression */}
            <span className="absolute -left-2 md:left-8 top-0 text-sm md:text-base font-mono text-primary/60 animate-pulse">
              40²
            </span>
            
            {/* Top expression - Sigma notation */}
            <span className="absolute -top-6 text-xs md:text-sm font-mono text-accent/70" style={{ animationDelay: '0.5s' }}>
              <span className="inline-flex flex-col items-center leading-none">
                <span className="text-[8px]">40</span>
                <span className="text-base">Σ</span>
                <span className="text-[8px]">k=1</span>
              </span>
              <span className="align-middle">(2k-1)</span>
            </span>
            
            {/* Center - Main icon area with prime factorization */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/30">
              <span className="text-2xl md:text-3xl font-bold text-primary-foreground font-mono">
                2⁶×5²
              </span>
            </div>
            
            {/* Right expression */}
            <span className="absolute -right-2 md:right-8 bottom-0 text-sm md:text-base font-mono text-secondary/60 animate-pulse" style={{ animationDelay: '1s' }}>
              √2560000
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            1600
          </h1>
          <p className="text-xl text-muted-foreground">SAT Mastery</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/practice-test">
            <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer h-full">
              <Target className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Practice Test</h3>
              <p className="text-xs text-muted-foreground">Full SAT simulation</p>
            </Card>
          </Link>
          <Link to="/insights">
            <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer h-full">
              <Brain className="w-6 h-6 text-purple-500 mb-2" />
              <h3 className="font-semibold text-sm">Insights</h3>
              <p className="text-xs text-muted-foreground">Track weak areas</p>
            </Card>
          </Link>
          <Link to="/review">
            <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer h-full">
              <RefreshCw className="w-6 h-6 text-green-500 mb-2" />
              <h3 className="font-semibold text-sm">Review</h3>
              <p className="text-xs text-muted-foreground">Spaced repetition</p>
            </Card>
          </Link>
          <Link to="/battle">
            <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer h-full">
              <Swords className="w-6 h-6 text-destructive mb-2" />
              <h3 className="font-semibold text-sm">Battle</h3>
              <p className="text-xs text-muted-foreground">Challenge friends</p>
            </Card>
          </Link>
        </div>

        {/* Sign up prompt for non-logged in users */}
        {!user && (
          <Card className="p-4 border-2 border-dashed border-primary/30 bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/auth" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>{" "}
              to track your progress, earn achievements, and compete on leaderboards! 🎮
            </p>
          </Card>
        )}

        {/* Stats Row - Only for logged in users */}
        {user && (
          <div className="space-y-4">
            {/* Skill Rating - Featured */}
            {ratings && (
              <SkillRatingCard
                mathRating={ratings.mathRating}
                englishRating={ratings.englishRating}
                overallRating={ratings.overallRating}
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-2 border-border">
                <XPBar quizCount={quizCount} />
              </Card>
              <Card className="p-4 border-2 border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Achievements
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {achievements.length}/{Object.keys(achievementDefs).length}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(achievementDefs).slice(0, 6).map(([key, def]) => {
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
            </div>
          </div>
        )}

        {/* Main Card */}
        <Card className="p-6 md:p-8 border-2 border-border text-left space-y-6">
          {/* Subject Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Subject</h3>
            <div className="grid grid-cols-3 gap-3">
              {subjectOptions.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setSubject(value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    subject === value
                      ? `border-${color} bg-${color}/10 shadow-lg shadow-${color}/20`
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${subject === value ? `text-${color}` : "text-muted-foreground"}`} />
                    <span className={`font-medium ${subject === value ? "" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {availableCounts[subject]} questions available
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Difficulty Level</h3>
            
            {/* Quick Range Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { value: 'all' as DifficultyRange, label: 'All', color: 'bg-muted' },
                { value: 'easy' as DifficultyRange, label: '1-3', sublabel: 'Easy', color: 'bg-green-500/20' },
                { value: 'medium' as DifficultyRange, label: '4-5', sublabel: 'Medium', color: 'bg-yellow-500/20' },
                { value: 'hard' as DifficultyRange, label: '6-8', sublabel: 'Hard', color: 'bg-orange-500/20' },
                { value: 'veryhard' as DifficultyRange, label: '9-10', sublabel: 'Expert', color: 'bg-red-500/20' },
              ].map(({ value, label, sublabel, color }) => (
                <button
                  key={value}
                  onClick={() => setDifficultyRange(value)}
                  className={`p-2 rounded-lg border-2 transition-all text-center ${
                    difficultyRange === value
                      ? `${color} border-primary shadow-md`
                      : 'border-border hover:border-muted-foreground/50'
                  }`}
                >
                  <span className="font-bold text-sm">{label}</span>
                  {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
                </button>
              ))}
            </div>

            {/* Question counts per level */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">Questions:</span>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <div
                  key={level}
                  className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs min-w-[36px] ${
                    level <= 3 ? 'bg-green-500/10 text-green-700'
                    : level <= 5 ? 'bg-yellow-500/10 text-yellow-700'
                    : level <= 8 ? 'bg-orange-500/10 text-orange-700'
                    : 'bg-red-500/10 text-red-700'
                  }`}
                >
                  <span className="font-bold">{level}</span>
                  <span className="text-[10px] opacity-70">{countsPerLevel[level]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Number of Questions</h3>
            <RadioGroup
              value={String(questionCount)}
              onValueChange={(v) => setQuestionCount(Number(v) as QuestionCount)}
              className="flex flex-wrap gap-4"
            >
              {countOptions.map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(value)} id={`count-${value}`} />
                  <Label htmlFor={`count-${value}`} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button size="lg" className="w-full text-lg py-6" onClick={handleStartPractice}>
            🚀 Start Practice
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Home;
