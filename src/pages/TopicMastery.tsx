import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calculator, PenTool, Trophy, Target, Loader2, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTopicMastery } from "@/hooks/useTopicMastery";
import { TopicMasteryCard } from "@/components/TopicMasteryCard";
import { MASTERY_THRESHOLD } from "@/utils/topicMastery";

const TopicMastery = () => {
  const { user } = useAuth();
  const { 
    mathProgress, 
    englishProgress, 
    loading, 
    totalMastered,
    weakestMathTopics,
    weakestEnglishTopics,
  } = useTopicMastery();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to track mastery</h1>
          <p className="text-muted-foreground mb-4">Topic mastery requires tracking your progress</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalTopics = mathProgress.length + englishProgress.length;
  const totalMasteredCount = totalMastered.math + totalMastered.english;
  const overallProgress = totalTopics > 0 ? (totalMasteredCount / totalTopics) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Topic Mastery</h1>
            <p className="text-sm text-muted-foreground">Master the Core 25 topics for maximum score gains</p>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="p-4 mb-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-semibold">Overall Mastery</span>
            </div>
            <span className="text-lg font-bold text-primary">
              {totalMasteredCount}/{totalTopics} Topics
            </span>
          </div>
          <Progress value={overallProgress} className="h-3 mb-2" />
          <p className="text-xs text-muted-foreground">
            Reach {MASTERY_THRESHOLD}% accuracy on {totalTopics - totalMasteredCount} more topics to maximize your score
          </p>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-3 text-center">
            <Calculator className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-blue-500">{totalMastered.math}/{mathProgress.length}</p>
            <p className="text-xs text-muted-foreground">Math Mastered</p>
          </Card>
          <Card className="p-3 text-center">
            <PenTool className="w-6 h-6 text-purple-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-purple-500">{totalMastered.english}/{englishProgress.length}</p>
            <p className="text-xs text-muted-foreground">English Mastered</p>
          </Card>
        </div>

        {/* Weak Areas Alert */}
        {(weakestMathTopics.length > 0 || weakestEnglishTopics.length > 0) && (
          <Card className="p-4 mb-6 border-2 border-orange-500/30 bg-orange-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Focus Areas</span>
              <span className="text-xs text-muted-foreground">(drill these for fastest gains)</span>
            </div>
            <div className="space-y-2">
              {[...weakestMathTopics.slice(0, 2), ...weakestEnglishTopics.slice(0, 2)].map((topic) => (
                <div key={topic.topic.key} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    {topic.topic.subject === 'math' ? (
                      <Calculator className="w-3 h-3 text-blue-500" />
                    ) : (
                      <PenTool className="w-3 h-3 text-purple-500" />
                    )}
                    {topic.topic.name}
                  </span>
                  <span className="text-orange-500 font-medium">{Math.round(topic.accuracy)}%</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Topics by Subject */}
        <Tabs defaultValue="math" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="math" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Math ({totalMastered.math}/{mathProgress.length})
            </TabsTrigger>
            <TabsTrigger value="english" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              English ({totalMastered.english}/{englishProgress.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="math" className="space-y-3">
            {mathProgress.map((topic) => (
              <TopicMasteryCard key={topic.topic.key} topic={topic} />
            ))}
          </TabsContent>

          <TabsContent value="english" className="space-y-3">
            {englishProgress.map((topic) => (
              <TopicMasteryCard key={topic.topic.key} topic={topic} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card className="p-4 mt-6 bg-muted/50">
          <h3 className="font-semibold mb-2">💡 Mastery Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Focus on one topic at a time until you hit 90%</li>
            <li>• Do 15-25 questions per topic for reliable accuracy</li>
            <li>• Weakest topics first = fastest overall score gains</li>
            <li>• Mastered topics earn 1.5x accelerator credits</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TopicMastery;
