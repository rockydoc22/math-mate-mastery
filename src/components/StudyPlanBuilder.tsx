import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, Target, TrendingUp, Brain, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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

  const projectedFinalScore = projectedData.length > 0 
    ? projectedData[projectedData.length - 1].score 
    : baselineScore[0];

  const totalGain = projectedFinalScore - baselineScore[0];

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

      // Create new plan
      const { error } = await supabase.from("study_plans").insert({
        user_id: user.id,
        exam_date: examDate,
        daily_minutes: dailyMinutes[0],
        baseline_score: baselineScore[0],
        target_score: projectedFinalScore,
        is_active: true,
      });

      if (error) throw error;

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

      {/* Exam Date */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-primary" />
          When is your SAT?
        </label>
        <Input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="max-w-xs"
        />
        {weeksUntilExam > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {weeksUntilExam} weeks to prepare
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
