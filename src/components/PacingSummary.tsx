import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Timing = {
  questionIndex: number;
  timeMs: number;
  isCorrect: boolean;
};

type PacingSummaryProps = {
  timings: Timing[];
  totalTimeMs: number;
};

type ChartRow = {
  label: string;
  seconds: number;
  isCorrect: boolean;
  paceTag: "rushed" | "slow" | "normal";
};

function getRecommendation(avgSeconds: number, rushedCount: number, slowCount: number): string {
  if (rushedCount >= 3 && rushedCount > slowCount) {
    return "You may be rushing. Slow down slightly and double-check key details before answering.";
  }
  if (slowCount >= 3 && slowCount > rushedCount) {
    return "You may be spending too long on tough questions. Practice making faster decisions and moving on.";
  }
  if (avgSeconds >= 30 && avgSeconds <= 75) {
    return "Your pace looks balanced overall. Keep aiming for steady timing and avoid big swings.";
  }
  if (avgSeconds < 30) {
    return "Your average pace is very fast. Great speed, but make sure accuracy stays high.";
  }
  return "Your average pace is on the slower side. Try setting mini time goals per question.";
}

export default function PacingSummary({ timings, totalTimeMs }: PacingSummaryProps) {
  const { chartData, avgSeconds, rushedCount, slowCount, recommendation } = useMemo(() => {
    const chartData: ChartRow[] = timings.map((t) => {
      const seconds = t.timeMs / 1000;
      const paceTag: ChartRow["paceTag"] =
        seconds < 15 ? "rushed" : seconds > 120 ? "slow" : "normal";
      return {
        label: `Q${t.questionIndex + 1}`,
        seconds,
        isCorrect: t.isCorrect,
        paceTag,
      };
    });
    const avgSeconds = timings.length > 0 ? totalTimeMs / timings.length / 1000 : 0;
    const rushedCount = chartData.filter((d) => d.paceTag === "rushed").length;
    const slowCount = chartData.filter((d) => d.paceTag === "slow").length;
    const recommendation = getRecommendation(avgSeconds, rushedCount, slowCount);
    return { chartData, avgSeconds, rushedCount, slowCount, recommendation };
  }, [timings, totalTimeMs]);

  return (
    <div className="space-y-4 rounded-3xl bg-card p-6 shadow-xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Pacing Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review where you moved too quickly, spent too long, and how steady your pace was.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-muted p-4">
          <div className="text-sm text-muted-foreground">Average Pace</div>
          <div className="mt-1 text-xl font-bold text-foreground">{avgSeconds.toFixed(1)} sec/question</div>
        </div>
        <div className="rounded-2xl bg-muted p-4">
          <div className="text-sm text-muted-foreground">Rushed Questions</div>
          <div className="mt-1 text-xl font-bold text-foreground">{rushedCount}</div>
        </div>
        <div className="rounded-2xl bg-muted p-4">
          <div className="text-sm text-muted-foreground">Slow Questions</div>
          <div className="mt-1 text-xl font-bold text-foreground">{slowCount}</div>
        </div>
      </div>

      <div className="h-80 w-full rounded-2xl bg-muted p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" className="text-muted-foreground" />
            <YAxis unit="s" className="text-muted-foreground" />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number, _name: string, payload: any) => {
                const row = payload?.payload as ChartRow | undefined;
                const tag = row?.paceTag === "rushed" ? "Rushed" : row?.paceTag === "slow" ? "Slow" : "Normal";
                return [`${value.toFixed(1)}s (${tag})`, "Time"];
              }}
            />
            <Bar dataKey="seconds" radius={[10, 10, 0, 0]}>
              <LabelList
                dataKey="paceTag"
                position="top"
                formatter={(value: ChartRow["paceTag"]) =>
                  value === "normal" ? "" : value === "rushed" ? "⚡" : "🐢"
                }
              />
              {chartData.map((entry, index) => {
                let fill = entry.isCorrect ? "#22c55e" : "#ef4444";
                if (entry.paceTag === "rushed") fill = entry.isCorrect ? "#16a34a" : "#dc2626";
                if (entry.paceTag === "slow") fill = entry.isCorrect ? "#15803d" : "#b91c1c";
                return <Cell key={`cell-${index}`} fill={fill} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-border bg-muted p-4">
        <div className="text-sm font-semibold text-foreground">Recommendation</div>
        <p className="mt-2 text-muted-foreground">{recommendation}</p>
      </div>
    </div>
  );
}
