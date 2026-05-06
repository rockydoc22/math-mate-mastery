import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProgressiveHintPanelProps {
  hints: string[];
  revealedCount: number;
  allShown: boolean;
  onRevealNext: () => void;
  disabled?: boolean;
  compact?: boolean;
}

/** Inline hint button + revealed-hint card. Drop into any quiz UI. */
export function ProgressiveHintPanel({
  hints,
  revealedCount,
  allShown,
  onRevealNext,
  disabled,
  compact,
}: ProgressiveHintPanelProps) {
  if (!hints || hints.length === 0) return null;
  const revealed = hints.slice(0, revealedCount);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <Button
        type="button"
        variant="outline"
        size={compact ? "sm" : "default"}
        onClick={onRevealNext}
        disabled={disabled || allShown}
        className="gap-2 border-amber-500/40 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
      >
        <Lightbulb className="w-4 h-4" />
        {revealedCount === 0
          ? "Need a hint?"
          : allShown
          ? `All hints shown (${hints.length})`
          : `Next hint (${revealedCount}/${hints.length})`}
      </Button>

      {revealed.length > 0 && (
        <Card className="p-3 border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10 space-y-1.5">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> Hints ({revealedCount}/{hints.length})
          </p>
          {revealed.map((h, i) => (
            <p key={i} className="text-xs text-amber-800 dark:text-amber-300 leading-snug">
              <span className="font-semibold">{i + 1}.</span> {h}
            </p>
          ))}
        </Card>
      )}
    </div>
  );
}
