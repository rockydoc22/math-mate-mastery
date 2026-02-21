import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakCalendarProps {
  /** Array of ISO date strings (YYYY-MM-DD) the user practiced */
  practiceDates: string[];
  currentStreak: number;
  longestStreak: number;
}

export const StreakCalendar = ({ practiceDates, currentStreak, longestStreak }: StreakCalendarProps) => {
  const { weeks, months } = useMemo(() => {
    const today = new Date();
    const dayMs = 86400000;
    const totalDays = 84;
    const startDate = new Date(today.getTime() - (totalDays - 1) * dayMs);
    
    // Helper: local date string without UTC conversion
    const toLocalDate = (d: Date) => 
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    const dateSet = new Set(practiceDates);
    const todayStr = toLocalDate(today);
    
    const days: { date: string; practiced: boolean; isToday: boolean }[] = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate.getTime() + i * dayMs);
      const dateStr = toLocalDate(d);
      days.push({
        date: dateStr,
        practiced: dateSet.has(dateStr),
        isToday: dateStr === todayStr,
      });
    }

    // Group into weeks (columns)
    const weeks: typeof days[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Get month labels
    const monthSet = new Map<number, string>();
    days.forEach((d, i) => {
      const date = new Date(d.date);
      if (date.getDate() <= 7) {
        const weekIdx = Math.floor(i / 7);
        monthSet.set(weekIdx, date.toLocaleDateString("en-US", { month: "short" }));
      }
    });

    return { weeks, months: monthSet };
  }, [practiceDates]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" /> Practice Activity
        </h3>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>🔥 {currentStreak} day streak</span>
          <span>Best: {longestStreak}</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mb-1 pl-0">
        {weeks.map((_, i) => (
          <div key={i} className="w-[14px] text-center">
            <span className="text-[9px] text-muted-foreground">
              {months.get(i) || ""}
            </span>
          </div>
        ))}
      </div>

      {/* Grid: 7 rows (days) x N columns (weeks) */}
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}${day.practiced ? " ✓" : ""}`}
                className={`w-[14px] h-[14px] rounded-[3px] transition-colors ${
                  day.isToday
                    ? day.practiced
                      ? "bg-emerald-500 ring-2 ring-emerald-400/50"
                      : "bg-muted ring-2 ring-primary/30"
                    : day.practiced
                      ? "bg-emerald-500/80"
                      : "bg-muted/50"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-2 justify-end">
        <span className="text-[10px] text-muted-foreground">Less</span>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-muted/50" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/80" />
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>
    </Card>
  );
};
