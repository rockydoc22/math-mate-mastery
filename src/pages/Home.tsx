import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, PenTool, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const totalMath = questions.length + visualMathQuestions.length + moreMathVisualQuestions.length;
const totalEnglish = englishQuestions.length + visualEnglishQuestions.length + moreEnglishVisualQuestions.length;

type Subject = "math" | "english" | "both";
type QuestionCount = 10 | 25 | 50;

const Home = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject>("math");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);

  const handleStartPractice = () => {
    navigate(`/quiz?subject=${subject}&count=${questionCount}`);
  };

  const subjectOptions = [
    { value: "math" as Subject, label: "Math", icon: Calculator, color: "primary" },
    { value: "english" as Subject, label: "English", icon: PenTool, color: "secondary" },
    { value: "both" as Subject, label: "Both", icon: Shuffle, color: "accent" },
  ];

  const countOptions: QuestionCount[] = [10, 25, 50];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-20 h-20 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SAT Mastery
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            The path to 1600
          </p>
        </div>

        <Card className="p-8 border-2 border-border text-left space-y-6">
          {/* Subject Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Subject</h3>
            <div className="grid grid-cols-3 gap-3">
              {subjectOptions.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setSubject(value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    subject === value
                      ? `border-${color} bg-${color}/10`
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${subject === value ? `text-${color}` : "text-muted-foreground"}`} />
                    <span className={`font-medium ${subject === value ? "" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {subject === "math" && `${totalMath} questions available`}
              {subject === "english" && `${totalEnglish} questions available`}
              {subject === "both" && `${totalMath + totalEnglish} questions available`}
            </p>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Number of Questions</h3>
            <RadioGroup
              value={String(questionCount)}
              onValueChange={(v) => setQuestionCount(Number(v) as QuestionCount)}
              className="flex gap-4"
            >
              {countOptions.map((count) => (
                <div key={count} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(count)} id={`count-${count}`} />
                  <Label htmlFor={`count-${count}`} className="cursor-pointer">
                    {count} Questions
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button size="lg" className="w-full" onClick={handleStartPractice}>
            Start Practice
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Home;
