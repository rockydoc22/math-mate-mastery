import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, Target, TrendingUp, Brain, CheckCircle, Bell, Mail, BookOpen, FileText, AlertTriangle, ChevronDown } from "lucide-react";
import { getUpcomingSATDates, getDaysUntilSAT, formatCountdown } from "@/data/satTestDates";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { calculateWorkplan, WorkplanEstimate } from "@/utils/workplanCalculator";

interface ProjectedScore {
  week: number;
  score: number;
  date: string;
}

export const StudyPlanBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [examDate, setExamDate] = useState("");
  const [dailyMinutes, setDailyMinutes] = useState([10]);
  const [baselineScore, setBaselineScore] = useState([1200]);
  const [isSaving, setIsSaving] = useState(false);
  const [planCreated, setPlanCreated] = useState(false);
  
  // Reminder settings
  const [reminderEmail, setReminderEmail] = useState("");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState("08:00");

  // Calculate weeks until exam
  const weeksUntilExam = useMemo(() => {
    if (!examDate) return 0;
    const now = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - now.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, diffWeeks);
  }, [examDate]);

  // Calculate questions per day based on minutes
  const questionsPerDay = useMemo(() => {
    // ~2 minutes per hard question including review
    return Math.floor(dailyMinutes[0] / 2);
  }, [dailyMinutes]);

  // Project score based on inputs
  const projectedData = useMemo((): ProjectedScore[] => {
    if (!examDate || weeksUntilExam === 0) return [];
    
    const start = baselineScore[0];
    const data: ProjectedScore[] = [];
    let currentScore = start;
    
    // Key assumptions:
    // - ~100 hard questions = ~40-50 point gain
    // - Diminishing returns above 1500
    // - Questions per week = questionsPerDay * 7
    const questionsPerWeek = questionsPerDay * 7;
    const pointsPerQuestion = 0.45; // ~45 points per 100 questions
    
    for (let week = 0; week <= weeksUntilExam; week++) {
      const weekDate = new Date();
      weekDate.setDate(weekDate.getDate() + week * 7);
      
      // Apply diminishing returns for high scores
      let effectiveGain = questionsPerWeek * pointsPerQuestion;
      if (currentScore > 1500) {
        effectiveGain *= 0.5; // Harder to gain points at high scores
      } else if (currentScore > 1400) {
        effectiveGain *= 0.7;
      }
      
      // Hockey stick effect - accelerate after week 6
      if (week >= 6 && week <= 10) {
        effectiveGain *= 1.3;
      }
      
      if (week > 0) {
        currentScore = Math.min(1600, currentScore + effectiveGain);
      }
      
      data.push({
        week,
        score: Math.round(currentScore),
        date: weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    }
    
    return data;
  }, [examDate, weeksUntilExam, baselineScore, questionsPerDay]);

  // Calculate detailed workplan
  const workplan = useMemo((): WorkplanEstimate | null => {
    if (!examDate || weeksUntilExam === 0) return null;
    return calculateWorkplan(baselineScore[0], 1600, weeksUntilExam, dailyMinutes[0]);
  }, [examDate, weeksUntilExam, baselineScore, dailyMinutes]);

  const projectedFinalScore = projectedData.length > 0 
    ? projectedData[projectedData.length - 1].score 
    : baselineScore[0];

  const totalGain = projectedFinalScore - baselineScore[0];
  
  // Check if current pace is sufficient
  const paceWarning = workplan && workplan.estimatedWeeksNeeded > weeksUntilExam;

  const handleSavePlan = async () => {
    if (!user) {
      toast.error("Please sign in to save your plan");
      navigate("/auth");
      return;
    }

    if (!examDate) {
      toast.error("Please select your exam date");
      return;
    }

    setIsSaving(true);
    try {
      // Deactivate any existing plans
      await supabase
        .from("study_plans")
        .update({ is_active: false })
        .eq("user_id", user.id);

      // Create new plan with reminder settings (email stored separately for security)
      const { error } = await supabase.from("study_plans").insert({
        user_id: user.id,
        exam_date: examDate,
        daily_minutes: dailyMinutes[0],
        baseline_score: baselineScore[0],
        target_score: projectedFinalScore,
        is_active: true,
        daily_reminder_enabled: dailyReminder,
        weekly_reminder_enabled: weeklyReminder,
        reminder_time: reminderTime + ":00",
      });

      if (error) throw error;

      // Store email in separate admin-only table (users can insert but not read)
      if (reminderEmail) {
        await supabase.from("user_notification_settings").upsert({
          user_id: user.id,
          reminder_email: reminderEmail,
        }, { onConflict: 'user_id' });
      }

      setPlanCreated(true);
      toast.success("Brain Building Program created! You'll see reminders on login.");
    } catch (error: any) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save plan");
    } finally {
      setIsSaving(false);
    }
  };

  if (planCreated) {
    return (
      <Card className="p-6 bg-green-500/10 border-green-500/30 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Program Created!</h3>
        <p className="text-muted-foreground mb-4">
          Your Brain Building Program is active. We'll remind you daily to keep your streak going.
        </p>
        <div className="text-2xl font-bold text-primary mb-2">
          Target: {projectedFinalScore}
        </div>
        <p className="text-sm text-muted-foreground">
          {dailyMinutes[0]} minutes/day • {questionsPerDay * 2} questions/day
        </p>
        <Button className="mt-4" onClick={() => navigate("/daily")}>
          Start Today's Practice
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!user && (
        <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
          <p className="text-sm text-center">
            <span className="font-medium">Sign in</span> to save your plan and get daily reminders!
          </p>
        </Card>
      )}

      {/* Exam Date - SAT Date Picker */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-primary" />
          When is your SAT?
        </label>
        
        {/* Quick Select Official Dates */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {getUpcomingSATDates().slice(0, 4).map((satDate) => {
              const days = getDaysUntilSAT(satDate.date);
              const isSelected = examDate === satDate.date;
              return (
                <button
                  key={satDate.date}
                  type="button"
                  onClick={() => setExamDate(satDate.date)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-muted/50 hover:bg-muted border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{satDate.label}</div>
                  <div className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {formatCountdown(days)}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Show more dates dropdown */}
          {getUpcomingSATDates().length > 4 && (
            <details className="group">
              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-1">
                <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                More dates
              </summary>
              <div className="flex flex-wrap gap-2 mt-2">
                {getUpcomingSATDates().slice(4).map((satDate) => {
                  const days = getDaysUntilSAT(satDate.date);
                  const isSelected = examDate === satDate.date;
                  return (
                    <button
                      key={satDate.date}
                      type="button"
                      onClick={() => setExamDate(satDate.date)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-muted/50 hover:bg-muted border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{satDate.label}</div>
                      <div className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {formatCountdown(days)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </details>
          )}
          
          {/* Custom date option */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>or</span>
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="max-w-[160px] h-8 text-xs"
            />
          </div>
        </div>
        
        {weeksUntilExam > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold text-primary">{weeksUntilExam} weeks</span> to prepare
          </p>
        )}
      </div>

      {/* Daily Commitment */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-orange-500" />
          Daily commitment: <span className="text-primary font-bold">{dailyMinutes[0]} minutes</span>
        </label>
        <Slider
          value={dailyMinutes}
          onValueChange={setDailyMinutes}
          min={5}
          max={20}
          step={5}
          className="max-w-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">
          ≈ {questionsPerDay * 2} questions/day (Math + English)
        </p>
      </div>

      {/* Baseline Score */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-purple-500" />
          Current/baseline score: <span className="text-primary font-bold">{baselineScore[0]}</span>
        </label>
        <Slider
          value={baselineScore}
          onValueChange={setBaselineScore}
          min={800}
          max={1500}
          step={10}
          className="max-w-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">
          From a practice test or your best estimate
        </p>
      </div>

      {/* Projected Score Chart */}
      {projectedData.length > 0 && (
        <Card className="p-4 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold">Your Projected Growth</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{projectedFinalScore}</p>
              <p className="text-xs text-green-500 font-medium">+{totalGain} points</p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[baselineScore[0] - 50, Math.min(1600, projectedFinalScore + 50)]}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border p-2 rounded-lg shadow-lg">
                          <p className="text-xs text-muted-foreground">{payload[0].payload.date}</p>
                          <p className="text-lg font-bold text-primary">{payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {weeksUntilExam >= 6 && (
                  <ReferenceLine 
                    x={projectedData[6]?.date} 
                    stroke="hsl(var(--primary))" 
                    strokeDasharray="3 3"
                  />
                )}
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Based on {dailyMinutes[0]} min/day, ~{questionsPerDay * 7} questions/week, with spaced repetition
          </p>
        </Card>
      )}

      {/* Detailed Workplan */}
      {workplan && (
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-semibold">Your Path to 1600</span>
          </div>

          {/* Warning if pace is insufficient */}
          {paceWarning && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-600">Pace Alert</p>
                <p className="text-muted-foreground">
                  At current pace, you'd need ~{workplan.estimatedWeeksNeeded} weeks, but you have {weeksUntilExam}. 
                  Consider increasing daily time or adjusting your target.
                </p>
              </div>
            </div>
          )}

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <BookOpen className="w-3 h-3" />
                Total Questions
              </div>
              <p className="text-xl font-bold text-primary">
                {workplan.totalQuestionsNeeded.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <FileText className="w-3 h-3" />
                Practice Tests
              </div>
              <p className="text-xl font-bold text-orange-500">
                {workplan.recommendedPracticeTests}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Target className="w-3 h-3" />
                Daily Goal
              </div>
              <p className="text-xl font-bold text-green-500">
                {workplan.dailyQuestionsNeeded} Q/day
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Clock className="w-3 h-3" />
                Weekly Target
              </div>
              <p className="text-xl font-bold text-purple-500">
                {workplan.weeklyQuestionsNeeded} Q/week
              </p>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          {workplan.breakdown.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Effort by Score Range</p>
              {workplan.breakdown.map((band, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {band.range} 
                    <span className="text-xs ml-1">
                      ({band.multiplier > 1 ? `${band.multiplier}x harder` : 'base'})
                    </span>
                  </span>
                  <span className="font-medium">
                    {band.questions.toLocaleString()} questions
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
            💡 Practice tests ({workplan.recommendedPracticeTests} recommended) count as {workplan.recommendedPracticeTests * 150} questions toward your total.
          </p>
        </Card>
      )}

      {/* Email Reminder Settings */}
      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <span className="font-semibold">Daily & Weekly Reminders</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="reminder-email" className="text-sm flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              Email for reminders (optional)
            </Label>
            <Input
              id="reminder-email"
              type="email"
              placeholder="your@email.com"
              value={reminderEmail}
              onChange={(e) => setReminderEmail(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
              <div>
                <p className="text-sm font-medium">Daily Reminder</p>
                <p className="text-xs text-muted-foreground">Every day at your time</p>
              </div>
              <Switch
                checked={dailyReminder}
                onCheckedChange={setDailyReminder}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
              <div>
                <p className="text-sm font-medium">Weekly Summary</p>
                <p className="text-xs text-muted-foreground">Progress report</p>
              </div>
              <Switch
                checked={weeklyReminder}
                onCheckedChange={setWeeklyReminder}
              />
            </div>
          </div>

          {(dailyReminder || weeklyReminder) && (
            <div>
              <Label htmlFor="reminder-time" className="text-sm flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Preferred reminder time
              </Label>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="max-w-[120px]"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Save Button */}
      <Button 
        onClick={handleSavePlan}
        disabled={!examDate || isSaving}
        size="lg"
        className="w-full"
      >
        <Brain className="w-4 h-4 mr-2" />
        {isSaving ? "Creating Program..." : "Create My Brain Building Program"}
      </Button>
    </div>
  );
};
