import { calculatePlayerLevel, getNextUnlock } from "@/utils/levelSystem";
import { Card } from "@/components/ui/card";
import { ChevronUp, Lock } from "lucide-react";

interface PlayerLevelBadgeProps {
  totalQuestions: number;
  compact?: boolean;
}

export function PlayerLevelBadge({ totalQuestions, compact = false }: PlayerLevelBadgeProps) {
  const level = calculatePlayerLevel(totalQuestions);
  const nextUnlock = getNextUnlock(level.level);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
        <span className="text-lg">{level.titleEmoji}</span>
        <span className="font-bold text-sm text-primary">Lv.{level.level}</span>
        <span className="text-xs text-muted-foreground">{level.title}</span>
      </div>
    );
  }

  return (
    <Card className="p-4 mb-4 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-primary/30">
          {level.titleEmoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Level {level.level}</span>
            <span className="text-sm text-muted-foreground">• {level.title}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {totalQuestions} questions answered
          </p>
        </div>
        {level.level < 50 && (
          <div className="flex items-center gap-1 text-primary">
            <ChevronUp className="w-4 h-4" />
            <span className="text-xs font-medium">Lv.{level.level + 1}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {level.questionsForNext !== null && (
        <div className="mb-2">
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700"
              style={{ width: `${level.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>{level.progress}%</span>
            <span>{level.questionsForNext - totalQuestions} more to Level {level.level + 1}</span>
          </div>
        </div>
      )}

      {/* Next unlock teaser */}
      {nextUnlock && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 mt-2">
          <Lock className="w-3 h-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">{nextUnlock.emoji} {nextUnlock.name}</span> unlocks at Level {nextUnlock.requiredLevel}
          </span>
        </div>
      )}
    </Card>
  );
}
