interface Props {
  pcts: Record<string, number>;
  primary: string;
}

const QUADRANTS = [
  { key: "D", label: "Dominance", color: "hsl(0, 72%, 51%)", pos: "top-0 left-0", emoji: "🔴" },
  { key: "I", label: "Influence", color: "hsl(45, 93%, 47%)", pos: "top-0 right-0", emoji: "🟡" },
  { key: "S", label: "Steadiness", color: "hsl(142, 71%, 45%)", pos: "bottom-0 left-0", emoji: "🟢" },
  { key: "C", label: "Conscientiousness", color: "hsl(217, 91%, 60%)", pos: "bottom-0 right-0", emoji: "🔵" },
];

export const DISCQuadrant = ({ pcts, primary }: Props) => {
  // Map percentages to position within the quadrant chart
  const dI = (pcts.D || 0) - (pcts.S || 0); // Assertive vs Passive (vertical)
  const iC = (pcts.I || 0) - (pcts.C || 0); // People vs Task (horizontal)
  
  // Normalize to 0-100 range for dot placement
  const dotX = Math.max(5, Math.min(95, 50 + iC * 0.5));
  const dotY = Math.max(5, Math.min(95, 50 - dI * 0.5));

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-foreground text-center">Your DISC Quadrant</h3>
      
      {/* Axis labels */}
      <div className="relative w-full aspect-square max-w-[280px] mx-auto">
        {/* Top label */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-medium">
          Active / Fast-Paced
        </div>
        {/* Bottom label */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-medium">
          Thoughtful / Moderate-Paced
        </div>
        {/* Left label */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 -rotate-90 text-[10px] text-muted-foreground font-medium whitespace-nowrap">
          Task-Focused
        </div>
        {/* Right label */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 text-[10px] text-muted-foreground font-medium whitespace-nowrap">
          People-Focused
        </div>

        {/* Grid */}
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 rounded-xl overflow-hidden">
          {QUADRANTS.map((q) => {
            const isPrimary = q.key === primary;
            return (
              <div
                key={q.key}
                className="flex flex-col items-center justify-center p-2 transition-all"
                style={{
                  backgroundColor: isPrimary
                    ? `${q.color.replace(")", " / 0.25)")}` 
                    : `${q.color.replace(")", " / 0.08)")}`,
                  border: isPrimary ? `2px solid ${q.color}` : "1px solid transparent",
                }}
              >
                <span className="text-2xl">{q.emoji}</span>
                <span className="text-xs font-bold mt-1" style={{ color: q.color }}>
                  {q.label}
                </span>
                <span className="text-lg font-black" style={{ color: q.color }}>
                  {pcts[q.key]}%
                </span>
              </div>
            );
          })}
        </div>

        {/* User position dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-lg z-10 -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ left: `${dotX}%`, top: `${dotY}%` }}
          title="Your position"
        />
      </div>
    </div>
  );
};
