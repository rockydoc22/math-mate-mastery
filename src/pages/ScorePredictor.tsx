import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Target, Brain, Zap, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface PredictionData {
  mathAccuracy: number;
  englishAccuracy: number;
  mathQuestions: number;
  englishQuestions: number;
  recentTrend: "improving" | "stable" | "declining";
  predictedMath: number;
  predictedEnglish: number;
  predictedTotal: number;
  confidence: "low" | "medium" | "high";
  strengths: string[];
  weaknesses: string[];
}

const ScorePredictor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadPrediction();
  }, [user]);

  const loadPrediction = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Get all attempts
      const { data: attempts } = await supabase
        .from("question_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!attempts || attempts.length === 0) {
        setPrediction(null);
        setLoading(false);
        return;
      }

      const mathAttempts = attempts.filter(a => a.question_type === "math");
      const engAttempts = attempts.filter(a => a.question_type === "english");

      const mathCorrect = mathAttempts.filter(a => a.is_correct).length;
      const engCorrect = engAttempts.filter(a => a.is_correct).length;

      const mathAccuracy = mathAttempts.length > 0 ? (mathCorrect / mathAttempts.length) * 100 : 0;
      const englishAccuracy = engAttempts.length > 0 ? (engCorrect / engAttempts.length) * 100 : 0;

      // Recent trend (last 50 vs previous 50)
      const recent = attempts.slice(0, 50);
      const older = attempts.slice(50, 100);
      const recentAcc = recent.length > 0 ? recent.filter(a => a.is_correct).length / recent.length : 0;
      const olderAcc = older.length > 0 ? older.filter(a => a.is_correct).length / older.length : 0;

      let recentTrend: "improving" | "stable" | "declining" = "stable";
      if (older.length >= 10) {
        if (recentAcc - olderAcc > 0.05) recentTrend = "improving";
        else if (olderAcc - recentAcc > 0.05) recentTrend = "declining";
      }

      // SAT score prediction (200-800 per section)
      // Base: accuracy maps roughly to score range
      const mathBase = 200 + (mathAccuracy / 100) * 600;
      const engBase = 200 + (englishAccuracy / 100) * 600;

      // Adjust for volume (more practice = more reliable, slight boost)
      const mathVolBonus = Math.min(mathAttempts.length / 200, 1) * 20;
      const engVolBonus = Math.min(engAttempts.length / 200, 1) * 20;

      // Trend bonus
      const trendBonus = recentTrend === "improving" ? 15 : recentTrend === "declining" ? -10 : 0;

      const predictedMath = Math.round(Math.min(800, Math.max(200, mathBase + mathVolBonus + trendBonus)));
      const predictedEnglish = Math.round(Math.min(800, Math.max(200, engBase + engVolBonus + trendBonus)));
      const predictedTotal = predictedMath + predictedEnglish;

      // Confidence based on data volume
      const totalQ = attempts.length;
      let confidence: "low" | "medium" | "high" = "low";
      if (totalQ >= 200) confidence = "high";
      else if (totalQ >= 50) confidence = "medium";

      // Find strengths/weaknesses by domain
      const domainStats: Record<string, { correct: number; total: number }> = {};
      attempts.forEach(a => {
        const key = `${a.question_type}:${a.domain}`;
        if (!domainStats[key]) domainStats[key] = { correct: 0, total: 0 };
        domainStats[key].total++;
        if (a.is_correct) domainStats[key].correct++;
      });

      const domainEntries = Object.entries(domainStats)
        .filter(([, v]) => v.total >= 5)
        .map(([k, v]) => ({ domain: k, accuracy: v.correct / v.total }))
        .sort((a, b) => b.accuracy - a.accuracy);

      const strengths = domainEntries.slice(0, 3).map(d => d.domain.split(":")[1] || d.domain);
      const weaknesses = domainEntries.slice(-3).reverse().map(d => d.domain.split(":")[1] || d.domain);

      setPrediction({
        mathAccuracy,
        englishAccuracy,
        mathQuestions: mathAttempts.length,
        englishQuestions: engAttempts.length,
        recentTrend,
        predictedMath,
        predictedEnglish,
        predictedTotal,
        confidence,
        strengths,
        weaknesses,
      });
    } catch (err) {
      console.error("Error loading prediction:", err);
    }

    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 700) return "text-emerald-500";
    if (score >= 600) return "text-blue-500";
    if (score >= 500) return "text-amber-500";
    return "text-red-500";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "improving") return "📈";
    if (trend === "declining") return "📉";
    return "➡️";
  };

  const getConfidenceLabel = (c: string) => {
    if (c === "high") return { text: "High Confidence", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" };
    if (c === "medium") return { text: "Medium Confidence", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" };
    return { text: "Low Confidence — Practice more!", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" };
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Score Predictor</h1>
          <p className="text-xs text-muted-foreground">AI-powered score estimation</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Analyzing your performance...</p>
          </div>
        ) : !prediction ? (
          <Card className="p-8 text-center">
            <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-2">Not Enough Data</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Complete at least a few practice sessions so we can predict your score.
            </p>
            <Button onClick={() => navigate("/quiz?subject=both&count=10")}>
              Start Practicing
            </Button>
          </Card>
        ) : (
          <>
            {/* Main Prediction */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="text-center mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Predicted SAT Score</p>
                  <p className={`text-5xl font-black ${getScoreColor(prediction.predictedTotal / 2)}`}>
                    {prediction.predictedTotal}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">out of 1600</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-background/60 rounded-lg">
                    <p className="text-[10px] text-muted-foreground uppercase">Math</p>
                    <p className={`text-2xl font-bold ${getScoreColor(prediction.predictedMath)}`}>
                      {prediction.predictedMath}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-background/60 rounded-lg">
                    <p className="text-[10px] text-muted-foreground uppercase">English</p>
                    <p className={`text-2xl font-bold ${getScoreColor(prediction.predictedEnglish)}`}>
                      {prediction.predictedEnglish}
                    </p>
                  </div>
                </div>

                <div className={`mt-4 text-center py-2 px-3 rounded-lg ${getConfidenceLabel(prediction.confidence).bg}`}>
                  <p className={`text-xs font-medium ${getConfidenceLabel(prediction.confidence).color}`}>
                    {getConfidenceLabel(prediction.confidence).text}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Stats Breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-4 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Performance Stats
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Math Accuracy</span>
                      <span className="font-medium text-foreground">{prediction.mathAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={prediction.mathAccuracy} className="h-2" />
                    <p className="text-[10px] text-muted-foreground mt-0.5">{prediction.mathQuestions} questions answered</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">English Accuracy</span>
                      <span className="font-medium text-foreground">{prediction.englishAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={prediction.englishAccuracy} className="h-2" />
                    <p className="text-[10px] text-muted-foreground mt-0.5">{prediction.englishQuestions} questions answered</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <span className="text-lg">{getTrendIcon(prediction.recentTrend)}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">{prediction.recentTrend}</p>
                      <p className="text-[10px] text-muted-foreground">Recent performance trend</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Strengths & Weaknesses */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Strengths
                </h3>
                <div className="space-y-1.5">
                  {prediction.strengths.length > 0 ? prediction.strengths.map((s, i) => (
                    <p key={i} className="text-xs text-foreground bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded capitalize">
                      {s.replace(/_/g, " ")}
                    </p>
                  )) : (
                    <p className="text-xs text-muted-foreground">Practice more to see</p>
                  )}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" /> Focus Areas
                </h3>
                <div className="space-y-1.5">
                  {prediction.weaknesses.length > 0 ? prediction.weaknesses.map((w, i) => (
                    <p key={i} className="text-xs text-foreground bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded capitalize">
                      {w.replace(/_/g, " ")}
                    </p>
                  )) : (
                    <p className="text-xs text-muted-foreground">Practice more to see</p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Score Milestones */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-4">
                <h3 className="font-bold text-foreground mb-3">Score Milestones</h3>
                {[
                  { score: 1000, label: "Average", emoji: "📊" },
                  { score: 1200, label: "Competitive", emoji: "🎯" },
                  { score: 1400, label: "Excellent", emoji: "⭐" },
                  { score: 1500, label: "Elite", emoji: "🏆" },
                  { score: 1550, label: "Ivy League", emoji: "🌟" },
                ].map(milestone => {
                  const reached = prediction.predictedTotal >= milestone.score;
                  const progress = Math.min(100, (prediction.predictedTotal / milestone.score) * 100);
                  return (
                    <div key={milestone.score} className="flex items-center gap-3 mb-2">
                      <span className="text-sm w-6">{reached ? milestone.emoji : "🔒"}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className={reached ? "font-medium text-foreground" : "text-muted-foreground"}>
                            {milestone.label}
                          </span>
                          <span className="text-muted-foreground">{milestone.score}</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </motion.div>

            {/* Action buttons */}
            <div className="space-y-2">
              <Button className="w-full gap-2" onClick={() => navigate("/study?mode=weakness")}>
                <Target className="w-4 h-4" /> Practice Weak Areas <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/progress-report")}>
                <TrendingUp className="w-4 h-4" /> View Full Report <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ScorePredictor;
