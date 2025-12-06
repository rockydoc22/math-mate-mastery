import { TrendingUp, Award, BookOpen, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSkillLevel, ratingToSATScore } from '@/utils/eloRating';
import { cn } from '@/lib/utils';

interface SkillRatingCardProps {
  mathRating: number;
  englishRating: number;
  overallRating: number;
  compact?: boolean;
}

function RatingBadge({ 
  rating, 
  label, 
  icon: Icon 
}: { 
  rating: number; 
  label: string; 
  icon: React.ElementType;
}) {
  const { level, color, bgColor } = getSkillLevel(rating);
  const { min, max } = ratingToSATScore(rating);

  return (
    <div className={cn("rounded-lg p-3 border", bgColor, "border-white/10")}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn("w-4 h-4", color)} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className={cn("text-2xl font-bold", color)}>{rating}</div>
      <div className="text-xs text-muted-foreground mt-1">
        {level} • SAT {min}-{max}
      </div>
    </div>
  );
}

export function SkillRatingCard({ 
  mathRating, 
  englishRating, 
  overallRating,
  compact = false 
}: SkillRatingCardProps) {
  const overallLevel = getSkillLevel(overallRating);
  const overallSAT = ratingToSATScore(overallRating);

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-card/50 rounded-lg px-4 py-2 border border-white/10">
        <Award className={cn("w-5 h-5", overallLevel.color)} />
        <div>
          <div className={cn("font-bold", overallLevel.color)}>{overallRating}</div>
          <div className="text-xs text-muted-foreground">
            {overallLevel.level}
          </div>
        </div>
        <div className="text-xs text-muted-foreground border-l border-white/20 pl-3">
          Projected SAT: {overallSAT.min}-{overallSAT.max}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-card/50 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Skill Rating
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Rating - Featured */}
        <div className={cn(
          "rounded-xl p-4 border-2 text-center",
          overallLevel.bgColor,
          "border-white/20"
        )}>
          <div className="text-xs text-muted-foreground mb-1">Overall Rating</div>
          <div className={cn("text-4xl font-bold", overallLevel.color)}>
            {overallRating}
          </div>
          <div className={cn("text-sm font-medium", overallLevel.color)}>
            {overallLevel.level}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Projected SAT: <span className="font-semibold text-foreground">{overallSAT.min}-{overallSAT.max}</span>
          </div>
        </div>

        {/* Subject Ratings */}
        <div className="grid grid-cols-2 gap-3">
          <RatingBadge rating={mathRating} label="Math" icon={Calculator} />
          <RatingBadge rating={englishRating} label="English" icon={BookOpen} />
        </div>
      </CardContent>
    </Card>
  );
}
