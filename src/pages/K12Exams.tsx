import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const k12Exams = [
  { name: "Iowa Assessments (ITBS)", emoji: "📋", desc: "Iowa Tests of Basic Skills & Educational Development" },
  { name: "GED", emoji: "📖", desc: "General Educational Development test" },
  { name: "HiSET", emoji: "📝", desc: "High School Equivalency Test" },
  { name: "TASC", emoji: "✅", desc: "Test Assessing Secondary Completion" },
  { name: "MAP Growth", emoji: "📊", desc: "Measures of Academic Progress" },
  { name: "STAR Assessments", emoji: "⭐", desc: "Renaissance STAR Reading & Math" },
  { name: "Stanford 10 (SAT-10)", emoji: "🏫", desc: "Stanford Achievement Test Series" },
  { name: "TerraNova (CAT/6)", emoji: "🌎", desc: "Comprehensive Tests of Basic Skills" },
  { name: "PSSA", emoji: "🔑", desc: "Pennsylvania System of School Assessment" },
  { name: "Regents Exams", emoji: "🗽", desc: "New York State Regents Examinations" },
];

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
          {k12Exams.map((exam) => (
            <Card
              key={exam.name}
              className="p-4 border-2 transition-all hover:border-primary/30 opacity-80"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{exam.emoji}</span>
                <div>
                  <h3 className="font-bold text-sm">{exam.name}</h3>
                  <p className="text-xs text-muted-foreground">{exam.desc}</p>
                  <p className="text-[10px] text-primary font-medium mt-1">Coming soon</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default K12Exams;
