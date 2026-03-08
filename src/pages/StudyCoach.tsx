import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, Sparkles, BookOpen, Target, Loader2, MessageCircle, ListChecks, Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const COACH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/study-coach`;

type CoachMode = "recap" | "explain" | "plan" | "next";

interface RecentStats {
  answered: number;
  correct: number;
  accuracy: number;
  timeSpent: string;
}

interface MissedQuestion {
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  userAnswer: string;
  domain: string;
  skill: string;
}

export default function StudyCoach() {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState<CoachMode | null>(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentStats, setRecentStats] = useState<RecentStats | null>(null);
  const [weakSkills, setWeakSkills] = useState<string[]>([]);
  const [strongSkills, setStrongSkills] = useState<string[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  // Load recent performance data
  useEffect(() => {
    if (!user) {
      setLoadingStats(false);
      return;
    }

    const loadStats = async () => {
      try {
        // Get recent question attempts (last 50)
        const { data: attempts } = await supabase
          .from("question_attempts")
          .select("is_correct, skill, domain, time_taken_ms")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50);

        if (attempts && attempts.length > 0) {
          const correct = attempts.filter(a => a.is_correct).length;
          const totalTime = attempts.reduce((sum, a) => sum + (a.time_taken_ms || 0), 0);
          const mins = Math.round(totalTime / 60000);

          setRecentStats({
            answered: attempts.length,
            correct,
            accuracy: Math.round((correct / attempts.length) * 100),
            timeSpent: `${mins} minutes`,
          });

          // Compute weak/strong skills
          const skillMap: Record<string, { correct: number; total: number }> = {};
          for (const a of attempts) {
            const key = a.skill || a.domain || "unknown";
            if (!skillMap[key]) skillMap[key] = { correct: 0, total: 0 };
            skillMap[key].total++;
            if (a.is_correct) skillMap[key].correct++;
          }

          const skills = Object.entries(skillMap)
            .filter(([_, v]) => v.total >= 3)
            .map(([k, v]) => ({ skill: k, accuracy: v.correct / v.total }));

          setWeakSkills(skills.filter(s => s.accuracy < 0.5).map(s => s.skill).slice(0, 5));
          setStrongSkills(skills.filter(s => s.accuracy >= 0.75).map(s => s.skill).slice(0, 5));
        }
      } catch (e) {
        console.error("Failed to load stats:", e);
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, [user]);

  const streamCoach = async (mode: CoachMode) => {
    if (!user) {
      toast.error("Please sign in to use the Study Coach.");
      return;
    }

    setActiveMode(mode);
    setResponse("");
    setIsLoading(true);

    try {
      const resp = await fetch(COACH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          mode,
          recentStats,
          weakSkills,
          strongSkills,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) { toast.error("Too many requests. Wait a moment."); return; }
        if (resp.status === 402) { toast.error("AI credits exhausted."); return; }
        if (resp.status === 401) { toast.error("Please sign in first."); return; }
        throw new Error("Failed to get coach response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setResponse(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Study coach error:", error);
      toast.error("Failed to get coach response");
    } finally {
      setIsLoading(false);
    }
  };

  const modes: { id: CoachMode; icon: typeof Brain; label: string; desc: string; color: string }[] = [
    { id: "recap", icon: MessageCircle, label: "Session Recap", desc: "Get a summary of how you did", color: "text-blue-500" },
    { id: "plan", icon: ListChecks, label: "Study Plan", desc: "Get a personalized 10-15 min plan", color: "text-green-500" },
    { id: "next", icon: Target, label: "Next Best Activity", desc: "What should I do right now?", color: "text-purple-500" },
    { id: "explain", icon: Lightbulb, label: "Explain My Mistakes", desc: "Understand your weak areas", color: "text-amber-500" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto text-center mt-20">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">AI Study Coach</h1>
          <p className="text-muted-foreground mb-6">Sign in to get personalized coaching based on your performance.</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              AI Study Coach
            </h1>
            <p className="text-sm text-muted-foreground">Personalized guidance powered by AI</p>
          </div>
        </div>

        {/* Stats summary */}
        {loadingStats ? (
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading your performance data...
            </div>
          </Card>
        ) : recentStats ? (
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{recentStats.accuracy}%</p>
                <p className="text-xs text-muted-foreground">Recent Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{recentStats.answered}</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{recentStats.timeSpent}</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            </div>
            {weakSkills.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Needs work:</p>
                <div className="flex flex-wrap gap-1">
                  {weakSkills.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card className="p-4 mb-6">
            <p className="text-sm text-muted-foreground">No recent practice data yet. Complete some questions first!</p>
          </Card>
        )}

        {/* Mode buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => streamCoach(m.id)}
              disabled={isLoading}
              className={`text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                activeMode === m.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
              <p className="font-semibold text-sm text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Response area */}
        <AnimatePresence>
          {(isLoading || response) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {modes.find(m => m.id === activeMode)?.label || "Coach"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading && !response && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </div>
                  )}
                  {response && (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
