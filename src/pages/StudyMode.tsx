import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, XCircle, Bookmark, Trash2 } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";

interface SavedQuestion {
  id: string;
  question_id: string;
  question_type: string;
  was_wrong: boolean;
  created_at: string;
}

const StudyMode = () => {
  const { user } = useAuth();
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedQuestions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_questions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSavedQuestions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedQuestions();
  }, [user]);

  const removeQuestion = async (id: string) => {
    await supabase.from("saved_questions").delete().eq("id", id);
    setSavedQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const getQuestionDetails = (questionId: string, type: string) => {
    if (type === "math") {
      return questions.find((q) => q.id === questionId);
    }
    return englishQuestions.find((q) => q.id === questionId);
  };

  const wrongQuestions = savedQuestions.filter((q) => q.was_wrong);
  const bookmarked = savedQuestions.filter((q) => !q.was_wrong);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <Card className="p-8 text-center max-w-md">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Study Mode</h2>
          <p className="text-muted-foreground mb-4">
            Sign in to save questions and review your mistakes
          </p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </Card>
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
              <BookOpen className="w-8 h-8 text-primary" />
              Study Mode
            </h1>
            <p className="text-muted-foreground">Review saved questions and mistakes</p>
          </div>
        </div>

        <Tabs defaultValue="wrong" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wrong" className="gap-2">
              <XCircle className="w-4 h-4" /> Wrong Answers ({wrongQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="w-4 h-4" /> Bookmarked ({bookmarked.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wrong" className="mt-4 space-y-4">
            {loading ? (
              <Card className="p-8 text-center text-muted-foreground">Loading...</Card>
            ) : wrongQuestions.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <XCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No wrong answers to review yet.</p>
                <p className="text-sm mt-2">Keep practicing and your mistakes will appear here!</p>
              </Card>
            ) : (
              wrongQuestions.map((sq) => {
                const q = getQuestionDetails(sq.question_id, sq.question_type);
                if (!q) return null;
                return (
                  <Card key={sq.id} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          sq.question_type === "math" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}>
                          {sq.question_type}
                        </span>
                        <p className="mt-2 text-sm line-clamp-3">{q.question}</p>
                        <p className="text-xs text-success mt-2">Answer: {q.correctAnswer}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeQuestion(sq.id)}>
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-4 space-y-4">
            {loading ? (
              <Card className="p-8 text-center text-muted-foreground">Loading...</Card>
            ) : bookmarked.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookmarked questions yet.</p>
                <p className="text-sm mt-2">Save questions during quizzes to review later!</p>
              </Card>
            ) : (
              bookmarked.map((sq) => {
                const q = getQuestionDetails(sq.question_id, sq.question_type);
                if (!q) return null;
                return (
                  <Card key={sq.id} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          sq.question_type === "math" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}>
                          {sq.question_type}
                        </span>
                        <p className="mt-2 text-sm line-clamp-3">{q.question}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeQuestion(sq.id)}>
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyMode;
