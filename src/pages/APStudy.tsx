import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain } from "lucide-react";
import { getAPSubject } from "@/utils/apConfig";

const APStudy = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = subjectId ? getAPSubject(subjectId) : undefined;

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold">Subject Not Found</h2>
          <p className="text-muted-foreground text-sm">This AP subject doesn't exist or hasn't been added yet.</p>
          <Button onClick={() => navigate("/ap-tests")}>Back to AP Tests</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/ap-tests")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl">{subject.icon}</span>
              {subject.name}
            </h1>
            <p className="text-sm text-muted-foreground">{subject.description}</p>
          </div>
        </div>

        {/* Coming soon placeholder */}
        <Card className="p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Questions Coming Soon!</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We're building the {subject.name} question bank. This will include multiple-choice practice
            questions aligned to the College Board AP curriculum.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Score range: {subject.scoreRange.min}–{subject.scoreRange.max}</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/ap-tests")}>
            ← Browse Other AP Subjects
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default APStudy;
