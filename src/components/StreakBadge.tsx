import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
}

export const StreakBadge = ({ streak, size = "md" }: StreakBadgeProps) => {
  const sizes = {
    sm: { container: "px-2 py-1 text-xs gap-1", icon: "w-3 h-3" },
    md: { container: "px-3 py-1.5 text-sm gap-1.5", icon: "w-4 h-4" },
    lg: { container: "px-4 py-2 text-base gap-2", icon: "w-5 h-5" },
  };

  if (streak === 0) return null;

  const getFlameColor = () => {
    if (streak >= 30) return "text-purple-500";
    if (streak >= 7) return "text-orange-500";
    if (streak >= 3) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 font-bold ${sizes[size].container}`}
    >
      <Flame className={`${sizes[size].icon} ${getFlameColor()} animate-pulse`} />
      <span>{streak}</span>
    </div>
  );
};
