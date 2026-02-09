import { getRank, getProgressToNextRank, getNextRank } from "@/lib/ranks";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RankBadgeProps {
  questionsAnswered: number;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

export const RankBadge = ({ questionsAnswered, showProgress = false, size = "md" }: RankBadgeProps) => {
  const rank = getRank(questionsAnswered);
  const nextRank = getNextRank(questionsAnswered);
  const progress = getProgressToNextRank(questionsAnswered);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col gap-1">
            <div className={`inline-flex items-center gap-1.5 rounded-full bg-muted/50 border border-border ${sizeClasses[size]}`}>
              <span>{rank.emoji}</span>
              <span className={`font-semibold ${rank.color}`}>
                {rank.name} {rank.tier}
              </span>
            </div>
            {showProgress && nextRank && (
              <div className="w-full">
                <Progress value={progress} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground mt-0.5 text-center">
                  {Math.round(progress)}% to {nextRank.emoji} {nextRank.name} {nextRank.tier}
                </p>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{questionsAnswered.toLocaleString()} questions answered</p>
          {nextRank && (
            <p className="text-xs text-muted-foreground">
              {nextRank.minQuestions - questionsAnswered} more to {nextRank.name} {nextRank.tier}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
