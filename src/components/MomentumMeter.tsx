import { motion } from "framer-motion";
import { TrendingUp, Minus, TrendingDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MomentumMode } from "@/hooks/useMomentum";

interface MomentumMeterProps {
  mode: MomentumMode;
  score: number;
  label: string;
  message: string;
  className?: string;
}

const MODE_CONFIG: Record<MomentumMode, {
  icon: typeof TrendingUp;
  color: string;
  bg: string;
  barColor: string;
}> = {
  rising: {
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    barColor: "bg-emerald-500",
  },
  steady: {
    icon: Minus,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    barColor: "bg-blue-500",
  },
  slipping: {
    icon: TrendingDown,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    barColor: "bg-amber-500",
  },
  recovery: {
    icon: RotateCcw,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    barColor: "bg-purple-500",
  },
};

export function MomentumMeter({ mode, score, label, message, className }: MomentumMeterProps) {
  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border",
        config.bg,
        className,
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0", config.color)} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={cn("text-xs font-bold tracking-wide uppercase", config.color)}>
            {label}
          </span>
          <span className="text-[10px] text-muted-foreground">{score}/100</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", config.barColor)}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(score, 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <p className="text-[10px] text-muted-foreground mt-1 truncate">{message}</p>
      </div>
    </motion.div>
  );
}
