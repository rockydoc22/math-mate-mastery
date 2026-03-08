import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft, Calendar, Flame, ChevronLeft, ChevronRight, Trophy, Zap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatColor(count: number): string {
  if (count === 0) return "bg-muted";
  if (count <= 5) return "bg-green-200 dark:bg-green-900/40";
  if (count <= 15) return "bg-green-400 dark:bg-green-700/60";
  if (count <= 30) return "bg-green-500 dark:bg-green-600";
  return "bg-green-700 dark:bg-green-500";
}

const StreakCalendar = () => {
  const { user } = useAuth();
  const [activityMap, setActivityMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [streakData, setStreakData] = useState({ current: 0, longest: 0 });
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    // Load question attempts for heatmap (last 365 days)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const { data: attempts } = await supabase
      .from('question_attempts')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', oneYearAgo.toISOString())
      .order('created_at', { ascending: true });

    const map: Record<string, number> = {};
    if (attempts) {
      attempts.forEach(a => {
        const day = a.created_at.split('T')[0];
        map[day] = (map[day] || 0) + 1;
      });
    }
    setActivityMap(map);

    // Load streak
    const { data: streak } = await supabase
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', user.id)
      .maybeSingle();

    if (streak) {
      setStreakData({ current: streak.current_streak, longest: streak.longest_streak });
    }

    setLoading(false);
  };

  // Generate calendar grid for current month
  const calendarGrid = useMemo(() => {
    const { year, month } = viewMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid: (string | null)[] = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      grid.push(dateStr);
    }
    return grid;
  }, [viewMonth]);

  // Generate heatmap for last 52 weeks (GitHub-style)
  const heatmapWeeks = useMemo(() => {
    const weeks: string[][] = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 364 - start.getDay());

    let currentWeek: string[] = [];
    const cursor = new Date(start);

    while (cursor <= today) {
      const dateStr = cursor.toISOString().split('T')[0];
      currentWeek.push(dateStr);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);
    return weeks;
  }, []);

  const totalQuestions = Object.values(activityMap).reduce((a, b) => a + b, 0);
  const activeDays = Object.keys(activityMap).length;

  const prevMonth = () => {
    setViewMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setViewMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Study Calendar</h1>
          <Calendar className="w-6 h-6 text-primary ml-auto" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{streakData.current}</div>
            <div className="text-[10px] text-muted-foreground">Current Streak</div>
          </Card>
          <Card className="p-3 text-center">
            <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{streakData.longest}</div>
            <div className="text-[10px] text-muted-foreground">Longest Streak</div>
          </Card>
          <Card className="p-3 text-center">
            <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-xl font-bold">{totalQuestions}</div>
            <div className="text-[10px] text-muted-foreground">Total Questions</div>
          </Card>
        </div>

        {/* GitHub-style heatmap */}
        <Card className="p-4 mb-6">
          <h3 className="text-sm font-semibold mb-3">{activeDays} active days in the last year</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[700px]">
              {heatmapWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map(dateStr => {
                    const count = activityMap[dateStr] || 0;
                    const today = new Date().toISOString().split('T')[0];
                    const isToday = dateStr === today;
                    return (
                      <div
                        key={dateStr}
                        className={`w-[12px] h-[12px] rounded-[2px] ${getHeatColor(count)} ${isToday ? 'ring-1 ring-primary' : ''} cursor-pointer transition-all hover:scale-150`}
                        title={`${dateStr}: ${count} questions`}
                        onMouseEnter={() => setHoveredDay(dateStr)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
            <span>Less</span>
            <div className="w-[12px] h-[12px] rounded-[2px] bg-muted" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-green-200 dark:bg-green-900/40" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-green-400 dark:bg-green-700/60" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-green-500 dark:bg-green-600" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-green-700 dark:bg-green-500" />
            <span>More</span>
          </div>
          {hoveredDay && (
            <p className="text-xs text-muted-foreground mt-2">
              {hoveredDay}: <strong>{activityMap[hoveredDay] || 0}</strong> questions
            </p>
          )}
        </Card>

        {/* Monthly calendar view */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="font-semibold">{MONTHS[viewMonth.month]} {viewMonth.year}</h3>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] text-muted-foreground font-medium">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarGrid.map((dateStr, idx) => {
              if (!dateStr) return <div key={`empty-${idx}`} />;
              const day = parseInt(dateStr.split('-')[2]);
              const count = activityMap[dateStr] || 0;
              const today = new Date().toISOString().split('T')[0];
              const isToday = dateStr === today;
              const isFuture = dateStr > today;

              return (
                <motion.div
                  key={dateStr}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative ${
                    isToday ? 'ring-2 ring-primary' : ''
                  } ${isFuture ? 'opacity-30' : ''} ${
                    count > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-muted/30'
                  }`}
                >
                  <span className={`font-medium ${count > 0 ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'}`}>
                    {day}
                  </span>
                  {count > 0 && (
                    <span className="text-[8px] text-green-600 dark:text-green-400 font-bold">{count}</span>
                  )}
                  {count > 0 && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default StreakCalendar;
