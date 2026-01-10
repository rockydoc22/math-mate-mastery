import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Ebbinghaus forgetting curve vs spaced repetition
const data = [
  { day: 0, forgetting: 100, spaced: 100 },
  { day: 1, forgetting: 40, spaced: 90 },
  { day: 2, forgetting: 30, spaced: 85 },
  { day: 3, forgetting: 25, spaced: 92 }, // Review bump
  { day: 4, forgetting: 22, spaced: 88 },
  { day: 5, forgetting: 20, spaced: 85 },
  { day: 6, forgetting: 18, spaced: 82 },
  { day: 7, forgetting: 17, spaced: 90 }, // Review bump
  { day: 10, forgetting: 15, spaced: 88 },
  { day: 14, forgetting: 12, spaced: 92 }, // Review bump
  { day: 21, forgetting: 10, spaced: 90 },
  { day: 30, forgetting: 8, spaced: 88 },
];

export const ForgettingCurveChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="day" 
            label={{ value: "Days", position: "insideBottom", offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 100]} 
            label={{ value: "% Retained", angle: -90, position: "insideLeft" }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border p-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Day {label}</p>
                    {payload.map((entry: any, index: number) => (
                      <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name === "forgetting" ? "No review" : "Spaced review"}: {entry.value}%
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            formatter={(value) => value === "forgetting" ? "Without Review" : "With Spaced Review"}
          />
          <Line 
            type="monotone" 
            dataKey="forgetting" 
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "hsl(var(--destructive))", strokeWidth: 1, r: 3 }}
            name="forgetting"
          />
          <Line 
            type="monotone" 
            dataKey="spaced" 
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            name="spaced"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
