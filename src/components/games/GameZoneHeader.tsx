import { Link } from "react-router-dom";
import { Flame, Trophy, ArrowRight, RotateCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGameZoneStats, BADGE_TIERS } from "@/hooks/useGameZoneStats";

interface Props {
  showSkipLink?: boolean;
}

export function GameZoneHeader({ showSkipLink = true }: Props) {
  const { stats, earnedBadges, nextBadge } = useGameZoneStats();
  const topBadge = earnedBadges[earnedBadges.length - 1];

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-foreground tabular-nums">{stats.totalPoints}</span>
            <span className="text-xs text-muted-foreground">pts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-foreground tabular-nums">{stats.streak}</span>
            <span className="text-xs text-muted-foreground">streak</span>
          </div>
          {topBadge && (
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {topBadge.emoji} {topBadge.name}
            </Badge>
          )}
          {nextBadge && (
            <span className="hidden md:inline text-xs text-muted-foreground">
              Next: {nextBadge.name} at {nextBadge.threshold}
            </span>
          )}
        </div>
        {showSkipLink && (
          <Link
            to="/home"
            className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            Study Dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        )}
        <button
          type="button"
          onClick={() => window.location.reload()}
          aria-label="Refresh page"
          title="Refresh page"
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export { BADGE_TIERS };