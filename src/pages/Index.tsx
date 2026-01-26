import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleStart = () => {
    setStarted(true);
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  const handleDownloadEnglish = () => {
    let content = `SAT English Question Bank Export\n`;
    content += `Total Questions: ${englishQuestions.length}\n`;
    content += `Generated: ${new Date().toISOString()}\n`;
    content += `${"=".repeat(80)}\n\n`;

    englishQuestions.forEach((q, index) => {
      content += `Question ${index + 1} - ID: ${q.id}\n`;
      content += `Difficulty: ${q.difficulty} | Rating: ${q.difficultyRating || "N/A"} | Domain: ${q.domain} | Skill: ${q.skill}\n`;
      content += `${"-".repeat(60)}\n`;
      content += `${q.question}\n\n`;
      
      q.options.forEach(opt => {
        const isCorrect = opt.letter === q.correctAnswer;
        content += `  ${opt.letter}. ${opt.text}${isCorrect ? " ✓ CORRECT" : ""}\n`;
      });
      
      content += `\nCorrect Answer: ${q.correctAnswer}\n`;
      content += `Explanation: ${q.explanation}\n`;
      content += `\n${"=".repeat(80)}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `english-questions-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-500">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SAT Math Practice
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Test your algebra skills with {questions.length} challenging SAT Math questions
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-xl border-2 border-border space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">{questions.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Questions</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-3xl font-bold text-secondary">Hard</p>
                <p className="text-sm text-muted-foreground mt-1">Difficulty</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-3xl font-bold text-accent">Algebra</p>
                <p className="text-sm text-muted-foreground mt-1">Topic</p>
              </div>
            </div>

            <Button 
              onClick={handleStart}
              size="lg"
              className="w-full text-lg h-14"
            >
              Start Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button 
              onClick={handleDownloadEnglish}
              variant="outline"
              size="lg"
              className="w-full text-lg h-12"
            >
              <Download className="mr-2 w-5 h-5" />
              Download English Questions ({englishQuestions.length})
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <QuizResults 
          score={score} 
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showResult={showResult}
        />

        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              size="lg"
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              ) : (
                "View Results"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
