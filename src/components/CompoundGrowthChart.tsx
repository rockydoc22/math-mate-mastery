import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// Data showing the hockey stick effect - slow start, then acceleration
const data = [
  { week: 0, score: 1200, label: "Start" },
  { week: 1, score: 1210 },
  { week: 2, score: 1225 },
  { week: 3, score: 1240 },
  { week: 4, score: 1260 },
  { week: 5, score: 1285 },
  { week: 6, score: 1320, label: "Acceleration begins" },
  { week: 7, score: 1365 },
  { week: 8, score: 1420, label: "Hockey stick!" },
  { week: 9, score: 1465 },
  { week: 10, score: 1500 },
  { week: 11, score: 1530 },
  { week: 12, score: 1550 },
];

export const CompoundGrowthChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="week" 
            label={{ value: "Weeks", position: "insideBottom", offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[1150, 1600]} 
            label={{ value: "SAT Score", angle: -90, position: "insideLeft" }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border p-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Week {label}</p>
                    <p className="text-lg font-bold text-primary">{payload[0].value}</p>
                    {payload[0].payload.label && (
                      <p className="text-xs text-muted-foreground">{payload[0].payload.label}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine 
            x={6} 
            stroke="hsl(var(--primary))" 
            strokeDasharray="5 5"
            label={{ value: "6-8 week mark", position: "top", fontSize: 10 }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
