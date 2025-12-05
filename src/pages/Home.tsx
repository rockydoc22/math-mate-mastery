import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, PenTool, Shuffle, Trophy, Flame, Award, LogIn, LogOut, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { StreakBadge } from "@/components/StreakBadge";
import { XPBar } from "@/components/XPBar";
import { AchievementBadge } from "@/components/AchievementBadge";

const totalMath = questions.length + visualMathQuestions.length + moreMathVisualQuestions.length;
const totalEnglish = englishQuestions.length + visualEnglishQuestions.length + moreEnglishVisualQuestions.length;

type Subject = "math" | "english" | "both";
type QuestionCount = 10 | 25 | 50;

const Home = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const [subject, setSubject] = useState<Subject>("math");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);

  const handleStartPractice = () => {
    navigate(`/quiz?subject=${subject}&count=${questionCount}`);
  };

  const subjectOptions = [
    { value: "math" as Subject, label: "Math", icon: Calculator, color: "primary" },
    { value: "english" as Subject, label: "English", icon: PenTool, color: "secondary" },
    { value: "both" as Subject, label: "Both", icon: Shuffle, color: "accent" },
  ];

  const countOptions: QuestionCount[] = [10, 25, 50];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        {/* Header with Auth */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {user && streak && <StreakBadge streak={streak.current_streak} />}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Leaderboard</span>
              </Button>
            </Link>
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
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
          <div className="flex justify-center mb-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/30">
              <BookOpen className="w-14 h-14 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SAT Mastery
          </h1>
          <p className="text-xl text-muted-foreground">The path to 1600</p>
        </div>

        {/* Stats Row - Only for logged in users */}
        {user && (
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
              {subject === "math" && `${totalMath} questions available`}
              {subject === "english" && `${totalEnglish} questions available`}
              {subject === "both" && `${totalMath + totalEnglish} questions available`}
            </p>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Number of Questions</h3>
            <RadioGroup
              value={String(questionCount)}
              onValueChange={(v) => setQuestionCount(Number(v) as QuestionCount)}
              className="flex gap-4"
            >
              {countOptions.map((count) => (
                <div key={count} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(count)} id={`count-${count}`} />
                  <Label htmlFor={`count-${count}`} className="cursor-pointer">
                    {count} Questions
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button size="lg" className="w-full text-lg py-6" onClick={handleStartPractice}>
            🚀 Start Practice
          </Button>
        </Card>

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
      </div>
    </div>
  );
};

export default Home;
