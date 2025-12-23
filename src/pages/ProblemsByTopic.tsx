import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator, BookText, ChevronRight, GraduationCap } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { mathTopics, englishTopics, TopicCategory } from "@/data/topicCategories";
import { MathText } from "@/components/MathText";

interface TopicWithCount extends TopicCategory {
  questionCount: number;
  avgDifficulty: number;
}

const ProblemsByTopic = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<TopicWithCount | null>(null);

  // Get questions for a topic
  const getQuestionsForTopic = (topic: TopicCategory) => {
    const allQuestions = topic.type === 'math' ? questions : englishQuestions;
    
    return allQuestions.filter(q => {
      const searchText = `${q.domain} ${q.skill} ${q.question}`.toLowerCase();
      return topic.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    }).sort((a, b) => (a.difficultyRating || 1) - (b.difficultyRating || 1)); // Sort by difficulty ascending
  };

  // Calculate topic stats
  const getTopicWithStats = (topic: TopicCategory): TopicWithCount => {
    const topicQuestions = getQuestionsForTopic(topic);
    const avgDifficulty = topicQuestions.length > 0 
      ? topicQuestions.reduce((sum, q) => sum + (q.difficultyRating || 5), 0) / topicQuestions.length
      : 0;
    
    return {
      ...topic,
      questionCount: topicQuestions.length,
      avgDifficulty: Math.round(avgDifficulty * 10) / 10
    };
  };

  const mathTopicsWithStats = mathTopics.map(getTopicWithStats).filter(t => t.questionCount > 0);
  const englishTopicsWithStats = englishTopics.map(getTopicWithStats).filter(t => t.questionCount > 0);

  const handleStartPractice = (topic: TopicWithCount) => {
    // Navigate to quiz with topic filter
    const subject = topic.type === 'math' ? 'math' : 'english';
    navigate(`/quiz?subject=${subject}&topic=${topic.id}`);
  };

  const TopicCard = ({ topic }: { topic: TopicWithCount }) => (
    <Card 
      className="p-4 hover:shadow-lg transition-all cursor-pointer group border-border/50 hover:border-primary/30"
      onClick={() => setSelectedTopic(topic)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {topic.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded-full">
              {topic.questionCount} questions
            </span>
            <span className={`px-2 py-1 rounded-full ${
              topic.avgDifficulty <= 4 ? 'bg-success/10 text-success' :
              topic.avgDifficulty <= 7 ? 'bg-warning/10 text-warning' :
              'bg-destructive/10 text-destructive'
            }`}>
              Avg: {topic.avgDifficulty}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Card>
  );

  // Topic detail view with questions list
  if (selectedTopic) {
    const topicQuestions = getQuestionsForTopic(selectedTopic);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedTopic(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedTopic.name}</h1>
              <p className="text-muted-foreground">{selectedTopic.questionCount} questions • Sorted easiest to hardest</p>
            </div>
          </div>

          <Button 
            onClick={() => handleStartPractice(selectedTopic)} 
            className="w-full"
            size="lg"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Start Practice Quiz
          </Button>

          <div className="space-y-3">
            {topicQuestions.map((q, index) => (
              <Card key={q.id} className="p-4">
                <div className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    (q.difficultyRating || 5) <= 4 ? 'bg-success/10 text-success' :
                    (q.difficultyRating || 5) <= 7 ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {q.difficultyRating || 5}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <MathText text={q.question.slice(0, 200) + (q.question.length > 200 ? '...' : '')} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{q.skill}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              Problems by Topic
            </h1>
            <p className="text-muted-foreground">Practice specific areas sorted by difficulty</p>
          </div>
        </div>

        <Tabs defaultValue="math" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="math" className="gap-2">
              <Calculator className="w-4 h-4" /> Math ({mathTopicsWithStats.length})
            </TabsTrigger>
            <TabsTrigger value="english" className="gap-2">
              <BookText className="w-4 h-4" /> English ({englishTopicsWithStats.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="math" className="mt-4 space-y-3">
            {mathTopicsWithStats.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No math topics available yet.</p>
              </Card>
            ) : (
              mathTopicsWithStats.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))
            )}
          </TabsContent>

          <TabsContent value="english" className="mt-4 space-y-3">
            {englishTopicsWithStats.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <BookText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No English topics available yet.</p>
              </Card>
            ) : (
              englishTopicsWithStats.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProblemsByTopic;
