import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Target, Plus, Check, Trash2, Trophy, Flame,
  BookOpen, Brain, Zap, RotateCcw, Edit2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  completed: boolean;
}

const GOAL_TEMPLATES = [
  { title: "Answer questions", target: 50, unit: "questions", icon: "📝" },
  { title: "Practice daily", target: 5, unit: "days", icon: "🔥" },
  { title: "Review missed questions", target: 10, unit: "reviews", icon: "🔄" },
  { title: "Master a new topic", target: 1, unit: "topics", icon: "👑" },
  { title: "Complete boss battles", target: 3, unit: "battles", icon: "💀" },
  { title: "Study time", target: 120, unit: "minutes", icon: "⏱️" },
  { title: "Improve accuracy to 80%+", target: 80, unit: "%", icon: "🎯" },
  { title: "Complete flashcard sessions", target: 5, unit: "sessions", icon: "📚" },
];

const WeeklyGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<WeeklyGoal[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customTarget, setCustomTarget] = useState("");
  const [customUnit, setCustomUnit] = useState("questions");
  const [showCustom, setShowCustom] = useState(false);
  const [weekStart, setWeekStart] = useState("");

  useEffect(() => {
    // Calculate current week start (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    const weekKey = monday.toISOString().split('T')[0];
    setWeekStart(weekKey);

    // Load saved goals
    const saved = localStorage.getItem(`weekly_goals_${weekKey}_${user?.id || 'anon'}`);
    if (saved) {
      setGoals(JSON.parse(saved));
    }

    // Auto-calculate progress from DB
    if (user) loadProgress(weekKey);
  }, [user]);

  const loadProgress = async (weekKey: string) => {
    if (!user) return;

    const weekStart = new Date(weekKey);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    // Get question count this week
    const { count: questionCount } = await supabase
      .from('question_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', weekStart.toISOString())
      .lt('created_at', weekEnd.toISOString());

    // Get streak
    const { data: streak } = await supabase
      .from('streaks')
      .select('current_streak')
      .eq('user_id', user.id)
      .maybeSingle();

    // Update goals with real progress
    setGoals(prev => {
      const updated = prev.map(g => {
        if (g.unit === 'questions') return { ...g, current: questionCount || 0, completed: (questionCount || 0) >= g.target };
        if (g.unit === 'days') return { ...g, current: streak?.current_streak || 0, completed: (streak?.current_streak || 0) >= g.target };
        return g;
      });
      localStorage.setItem(`weekly_goals_${weekKey}_${user?.id || 'anon'}`, JSON.stringify(updated));
      return updated;
    });
  };

  const saveGoals = (newGoals: WeeklyGoal[]) => {
    setGoals(newGoals);
    localStorage.setItem(`weekly_goals_${weekStart}_${user?.id || 'anon'}`, JSON.stringify(newGoals));
  };

  const addGoalFromTemplate = (template: typeof GOAL_TEMPLATES[0]) => {
    const newGoal: WeeklyGoal = {
      id: `goal-${Date.now()}`,
      title: template.title,
      target: template.target,
      current: 0,
      unit: template.unit,
      icon: template.icon,
      completed: false,
    };
    saveGoals([...goals, newGoal]);
    setShowTemplates(false);
    toast({ title: "Goal added!", description: template.title });
  };

  const addCustomGoal = () => {
    if (!customTitle.trim() || !customTarget) return;
    const newGoal: WeeklyGoal = {
      id: `goal-${Date.now()}`,
      title: customTitle,
      target: parseInt(customTarget),
      current: 0,
      unit: customUnit,
      icon: "🎯",
      completed: false,
    };
    saveGoals([...goals, newGoal]);
    setCustomTitle("");
    setCustomTarget("");
    setShowCustom(false);
    toast({ title: "Custom goal added!" });
  };

  const removeGoal = (id: string) => {
    saveGoals(goals.filter(g => g.id !== id));
  };

  const incrementGoal = (id: string) => {
    saveGoals(goals.map(g => {
      if (g.id !== id) return g;
      const newCurrent = Math.min(g.current + 1, g.target);
      return { ...g, current: newCurrent, completed: newCurrent >= g.target };
    }));
  };

  const resetGoals = () => {
    saveGoals([]);
    toast({ title: "Goals reset for this week" });
  };

  const completedCount = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;

  // Days remaining in the week
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysLeft = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Weekly Goals</h1>
          <Target className="w-6 h-6 text-primary ml-auto" />
        </div>

        {/* Week summary */}
        <Card className="p-5 mb-6 border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Week of {weekStart}</p>
              <p className="font-bold text-lg">{completedCount}/{totalGoals} Goals Complete</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{overallProgress}%</p>
              <p className="text-xs text-muted-foreground">{daysLeft} days left</p>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </Card>

        {/* Goals list */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {goals.map((goal, idx) => (
              <motion.div
                key={goal.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`p-4 ${goal.completed ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{goal.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-medium text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </p>
                        {goal.completed && <Check className="w-4 h-4 text-green-500 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={(goal.current / goal.target) * 100} className="h-2 flex-1" />
                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!goal.completed && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => incrementGoal(goal.id)}>
                          <Plus className="w-4 h-4 text-primary" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeGoal(goal.id)}>
                        <Trash2 className="w-3 h-3 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {goals.length === 0 && (
            <div className="text-center py-10">
              <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No goals set yet</p>
              <p className="text-muted-foreground text-xs">Add goals to track your weekly progress</p>
            </div>
          )}
        </div>

        {/* Add goal buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => { setShowTemplates(!showTemplates); setShowCustom(false); }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Goal from Templates
          </Button>

          {showTemplates && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-2">
              {GOAL_TEMPLATES.filter(t => !goals.some(g => g.title === t.title)).map(t => (
                <Card
                  key={t.title}
                  className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => addGoalFromTemplate(t)}
                >
                  <span className="text-xl">{t.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">Target: {t.target} {t.unit}</p>
                  </div>
                  <Plus className="w-4 h-4 text-primary" />
                </Card>
              ))}
            </motion.div>
          )}

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => { setShowCustom(!showCustom); setShowTemplates(false); }}
          >
            <Edit2 className="w-4 h-4 mr-2" /> Create Custom Goal
          </Button>

          {showCustom && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
              <Card className="p-4 space-y-3">
                <Input placeholder="Goal title..." value={customTitle} onChange={e => setCustomTitle(e.target.value)} />
                <div className="flex gap-2">
                  <Input type="number" placeholder="Target" value={customTarget} onChange={e => setCustomTarget(e.target.value)} className="flex-1" />
                  <Input placeholder="Unit" value={customUnit} onChange={e => setCustomUnit(e.target.value)} className="flex-1" />
                </div>
                <Button className="w-full" onClick={addCustomGoal} disabled={!customTitle.trim() || !customTarget}>
                  Add Goal
                </Button>
              </Card>
            </motion.div>
          )}

          {goals.length > 0 && (
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={resetGoals}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset All Goals
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default WeeklyGoals;
