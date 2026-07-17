import { Zap } from "lucide-react";
import { useDailyCredits } from "@/hooks/useDailyCredits";

/** Compact "N/10 plays left today" pill. Safe to render anywhere. */
export function DailyCreditsBadge({ className = "" }: { className?: string }) {
  const { credits, max, isEmpty } = useDailyCredits();
  const tone = isEmpty
    ? "bg-destructive/10 text-destructive border-destructive/30"
    : credits <= 3
    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
    : "bg-primary/10 text-primary border-primary/30";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${tone} ${className}`}
      title="Free daily plays. Resets at midnight."
    >
      <Zap className="w-3 h-3" />
      <span className="tabular-nums">{credits}</span>
      <span className="opacity-70">/ {max} plays</span>
    </span>
  );
}