import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AchievementBadgeProps {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const AchievementBadge = ({
  icon,
  name,
  description,
  unlocked,
  unlockedAt,
}: AchievementBadgeProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`
            w-14 h-14 rounded-xl flex items-center justify-center text-2xl
            transition-all duration-300 cursor-pointer
            ${
              unlocked
                ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg shadow-primary/20 hover:scale-110"
                : "bg-muted/50 border border-border opacity-40 grayscale"
            }
          `}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        {unlocked && unlockedAt && (
          <p className="text-xs text-primary mt-1">
            Unlocked {new Date(unlockedAt).toLocaleDateString()}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
