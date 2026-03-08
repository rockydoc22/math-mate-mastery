import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CalendarDays, Clock, CheckCircle2, Circle, Plus, Trash2, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInDays, format, addDays } from "date-fns";

interface DailyTask {
  id: string;
  label: string;
  type: "math" | "english" | "both" | "review" | "custom";
  completed: boolean;
  link?: string;
}

interface PlanDay {
  date: string;
  tasks: DailyTask[];
}

const TASK_TEMPLATES: Omit<DailyTask, "id" | "completed">[] = [
  { label: "10 Math Questions", type: "math", link: "/quiz?subject=math&count=10" },
  { label: "10 English Questions", type: "english", link: "/quiz?subject=english&count=10" },
  { label: "Mixed Practice (20 Q)", type: "both", link: "/quiz?subject=both&count=20" },
  { label: "Review Missed Questions", type: "review", link: "/review" },
  { label: "Daily Challenge", type: "both", link: "/daily" },
  { label: "Vocabulary Practice", type: "english", link: "/vocab" },
  { label: "Elite Practice", type: "both", link: "/elite-practice" },
  { label: "Boss Battle", type: "both", link: "/boss-battle" },
];

const StudyPlanner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [examDate, setExamDate] = useState<string>("");
  const [weekPlan, setWeekPlan] = useState<PlanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    loadPlan();
  }, [user]);

  const loadPlan = async () => {
    // Load exam date from study_plans
    if (user) {
      const { data } = await supabase
        .from("study_plans")
        .select("exam_date")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (data?.exam_date) setExamDate(data.exam_date);
    }

    // Load week plan from localStorage
    const saved = localStorage.getItem("study-planner-week");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWeekPlan(parsed);
        return;
      } catch {}
    }

    // Generate default 7-day plan
    generateDefaultPlan();
  };

  const generateDefaultPlan = () => {
    const today = new Date();
    const plan: PlanDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      const tasks: DailyTask[] = [];

      if (dayOfWeek === 0) {
        // Sunday: Light review
        tasks.push({ id: crypto.randomUUID(), label: "Review Missed Questions", type: "review", completed: false, link: "/review" });
      } else if (dayOfWeek === 6) {
        // Saturday: Full practice test
        tasks.push({ id: crypto.randomUUID(), label: "Mixed Practice (20 Q)", type: "both", completed: false, link: "/quiz?subject=both&count=20" });
        tasks.push({ id: crypto.randomUUID(), label: "Review Mistakes", type: "review", completed: false, link: "/review" });
      } else {
        // Weekdays: Alternate math/english focus
        if (i % 2 === 0) {
          tasks.push({ id: crypto.randomUUID(), label: "10 Math Questions", type: "math", completed: false, link: "/quiz?subject=math&count=10" });
          tasks.push({ id: crypto.randomUUID(), label: "5 English Questions", type: "english", completed: false, link: "/quiz?subject=english&count=5" });
        } else {
          tasks.push({ id: crypto.randomUUID(), label: "10 English Questions", type: "english", completed: false, link: "/quiz?subject=english&count=10" });
          tasks.push({ id: crypto.randomUUID(), label: "5 Math Questions", type: "math", completed: false, link: "/quiz?subject=math&count=5" });
        }
        tasks.push({ id: crypto.randomUUID(), label: "Daily Challenge", type: "both", completed: false, link: "/daily" });
      }

      plan.push({ date: format(date, "yyyy-MM-dd"), tasks });
    }

    setWeekPlan(plan);
    savePlan(plan);
  };

  const savePlan = (plan: PlanDay[]) => {
    localStorage.setItem("study-planner-week", JSON.stringify(plan));
  };

  const toggleTask = (dayIndex: number, taskId: string) => {
    const updated = [...weekPlan];
    const task = updated[dayIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setWeekPlan(updated);
      savePlan(updated);
    }
  };

  const addTask = (template: Omit<DailyTask, "id" | "completed">) => {
    const updated = [...weekPlan];
    updated[selectedDay].tasks.push({
      ...template,
      id: crypto.randomUUID(),
      completed: false,
    });
    setWeekPlan(updated);
    savePlan(updated);
    setShowTemplates(false);
  };

  const removeTask = (dayIndex: number, taskId: string) => {
    const updated = [...weekPlan];
    updated[dayIndex].tasks = updated[dayIndex].tasks.filter(t => t.id !== taskId);
    setWeekPlan(updated);
    savePlan(updated);
  };

  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  const todayCompleted = weekPlan[0]?.tasks.filter(t => t.completed).length || 0;
  const todayTotal = weekPlan[0]?.tasks.length || 0;
  const todayProgress = todayTotal > 0 ? (todayCompleted / todayTotal) * 100 : 0;

  const weekCompleted = weekPlan.reduce((sum, d) => sum + d.tasks.filter(t => t.completed).length, 0);
  const weekTotal = weekPlan.reduce((sum, d) => sum + d.tasks.length, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "math": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "english": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "review": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Study Planner</h1>
          <p className="text-xs text-muted-foreground">Your 7-day study schedule</p>
        </div>
        {daysUntilExam !== null && daysUntilExam > 0 && (
          <div className="text-right">
            <p className="text-lg font-black text-primary">{daysUntilExam}</p>
            <p className="text-[10px] text-muted-foreground">days left</p>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Today's Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-foreground">Today's Progress</h3>
              <span className="text-sm font-medium text-primary">{todayCompleted}/{todayTotal}</span>
            </div>
            <Progress value={todayProgress} className="h-2.5 mb-2" />
            {todayProgress === 100 && todayTotal > 0 && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">🎉 All done for today!</p>
            )}
          </Card>
        </motion.div>

        {/* Week Overview Bar */}
        <div className="flex gap-1">
          {weekPlan.map((day, i) => {
            const dayDate = new Date(day.date);
            const completed = day.tasks.filter(t => t.completed).length;
            const total = day.tasks.length;
            const pct = total > 0 ? (completed / total) * 100 : 0;
            const isToday = i === 0;

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 py-2 px-1 rounded-lg text-center transition-all ${
                  selectedDay === i
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <p className="text-[10px] font-medium">
                  {isToday ? "Today" : format(dayDate, "EEE")}
                </p>
                <p className="text-xs font-bold">{format(dayDate, "d")}</p>
                <div className="w-full h-1 bg-background/50 rounded-full mt-1">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Tasks */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {selectedDay === 0
                    ? "Today"
                    : format(new Date(weekPlan[selectedDay]?.date || new Date()), "EEEE, MMM d")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>

              {showTemplates && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-3 grid grid-cols-2 gap-1.5"
                >
                  {TASK_TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => addTask(t)}
                      className="text-left p-2 rounded-lg bg-muted/50 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                    >
                      {t.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div className="space-y-2">
                {weekPlan[selectedDay]?.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      task.completed
                        ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30"
                        : "bg-background border-border"
                    }`}
                  >
                    <button onClick={() => toggleTask(selectedDay, task.id)}>
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.label}
                      </p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getTypeColor(task.type)}`}>
                        {task.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {task.link && !task.completed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => navigate(task.link!)}
                        >
                          Go
                        </Button>
                      )}
                      <button
                        onClick={() => removeTask(selectedDay, task.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {weekPlan[selectedDay]?.tasks.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No tasks for this day</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowTemplates(true)}
                    >
                      Add Tasks
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Week Summary */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Week Summary
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-black text-foreground">{weekCompleted}</p>
              <p className="text-[10px] text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">{weekTotal - weekCompleted}</p>
              <p className="text-[10px] text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">
                {weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0}%
              </p>
              <p className="text-[10px] text-muted-foreground">Progress</p>
            </div>
          </div>
        </Card>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full text-xs"
          onClick={generateDefaultPlan}
        >
          🔄 Reset to Default Plan
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default StudyPlanner;
