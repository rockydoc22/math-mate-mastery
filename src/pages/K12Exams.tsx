import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { K12_EXAMS } from "@/utils/k12ExamConfig";

const K12Exams = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Homeschool & K-12 Exams</h1>
          <p className="text-sm text-muted-foreground">Standardized tests for homeschool and K-12 students</p>
        </div>

        <div className="space-y-3">
          {K12_EXAMS.map((exam) => (
            <Card
              key={exam.id}
              className="p-4 border-2 cursor-pointer transition-all hover:border-primary/30 hover:scale-[1.01] hover:shadow-md"
              onClick={() => navigate(`/k12-exam/${exam.id}`)}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{exam.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{exam.name}</h3>
                  <p className="text-xs text-muted-foreground">{exam.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default K12Exams;
