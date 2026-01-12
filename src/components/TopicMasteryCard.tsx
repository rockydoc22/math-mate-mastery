import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp } from "lucide-react";
import { TopicProgress } from "@/hooks/useTopicMastery";
import { MASTERY_THRESHOLD, MIN_QUESTIONS_FOR_MASTERY } from "@/utils/topicMastery";

interface TopicMasteryCardProps {
  topic: TopicProgress;
  compact?: boolean;
}

export const TopicMasteryCard = ({ topic, compact = false }: TopicMasteryCardProps) => {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= MASTERY_THRESHOLD) return 'text-green-500';
    if (accuracy >= 70) return 'text-yellow-500';
    if (accuracy >= 50) return 'text-orange-500';
    return 'text-destructive';
  };

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= MASTERY_THRESHOLD) return 'bg-green-500';
    if (accuracy >= 70) return 'bg-yellow-500';
    if (accuracy >= 50) return 'bg-orange-500';
    return 'bg-destructive';
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {topic.isMastered ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <Target className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-sm font-medium truncate">{topic.topic.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-sm font-bold ${getAccuracyColor(topic.accuracy)}`}>
            {topic.attempted > 0 ? `${Math.round(topic.accuracy)}%` : '-'}
          </span>
          {topic.isMastered && (
            <Badge variant="outline" className="text-green-500 border-green-500/50 text-xs">
              ✓
            </Badge>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={`p-4 ${topic.isMastered ? 'border-green-500/30 bg-green-500/5' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {topic.isMastered ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Target className="w-5 h-5 text-muted-foreground" />
            )}
            <h4 className="font-semibold">{topic.topic.name}</h4>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{topic.topic.description}</p>
        </div>
        {topic.isMastered && (
          <Badge className="bg-green-500 text-white">Mastered</Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {topic.correct}/{topic.attempted} correct
          </span>
          <span className={`font-bold ${getAccuracyColor(topic.accuracy)}`}>
            {topic.attempted > 0 ? `${Math.round(topic.accuracy)}%` : 'No attempts'}
          </span>
        </div>
        
        <Progress 
          value={topic.accuracy} 
          className="h-2"
        />

        {!topic.isMastered && topic.attempted > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            {topic.questionsNeeded > 0 ? (
              <span>Need {topic.questionsNeeded} more questions at {MASTERY_THRESHOLD}%+ to master</span>
            ) : (
              <span>Reach {MASTERY_THRESHOLD}% accuracy to master</span>
            )}
          </div>
        )}

        {topic.isMastered && topic.masteredAt && (
          <p className="text-xs text-green-600">
            Mastered on {new Date(topic.masteredAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
};
