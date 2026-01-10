import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { skill: "Algebra", start: 45, end: 85, growth: 40, isWeak: true },
  { skill: "Geometry", start: 70, end: 90, growth: 20, isWeak: false },
  { skill: "Grammar", start: 50, end: 88, growth: 38, isWeak: true },
  { skill: "Reading", start: 75, end: 92, growth: 17, isWeak: false },
  { skill: "Data Analysis", start: 55, end: 82, growth: 27, isWeak: true },
];

export const WeaknessGrowthChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            type="number"
            domain={[0, 50]}
            label={{ value: "Points Gained", position: "insideBottom", offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            type="category"
            dataKey="skill"
            tick={{ fontSize: 12 }}
            width={100}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-card border border-border p-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">{data.skill}</p>
                    <p className="text-xs text-muted-foreground">
                      Started: {data.start}% → Now: {data.end}%
                    </p>
                    <p className="text-lg font-bold text-primary">+{data.growth} points</p>
                    {data.isWeak && (
                      <p className="text-xs text-purple-500 font-medium">📈 Weakness targeted!</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.isWeak ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Weak areas (targeted)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted-foreground" />
          <span>Strong areas</span>
        </div>
      </div>
    </div>
  );
};
