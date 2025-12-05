import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { RoastPopup } from "./RoastPopup";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const [showRoast, setShowRoast] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Show roast popup after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setShowRoast(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Keep Going! 📚";
  };

  const getColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-secondary";
    return "text-accent";
  };

  return (
    <>
      <Card className="p-8 text-center shadow-xl border-2 max-w-2xl mx-auto">
        <Trophy className={`w-20 h-20 mx-auto mb-6 ${getColor()}`} />
        
        <h2 className="text-3xl font-bold mb-2">{getMessage()}</h2>
        
        <div className="my-8">
          <div className={`text-6xl font-bold mb-2 ${getColor()}`}>
            {score}/{totalQuestions}
          </div>
          <p className="text-xl text-muted-foreground">
            {percentage}% Correct
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between p-3 bg-muted rounded-lg">
            <span className="text-muted-foreground">Questions Answered:</span>
            <span className="font-semibold">{totalQuestions}</span>
          </div>
          <div className="flex justify-between p-3 bg-muted rounded-lg">
            <span className="text-muted-foreground">Correct Answers:</span>
            <span className="font-semibold text-success">{score}</span>
          </div>
          <div className="flex justify-between p-3 bg-muted rounded-lg">
            <span className="text-muted-foreground">Wrong Answers:</span>
            <span className="font-semibold text-destructive">{totalQuestions - score}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Button 
            onClick={onRestart} 
            size="lg"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>

      <RoastPopup 
        percentage={percentage}
        isOpen={showRoast}
        onClose={() => setShowRoast(false)}
      />
    </>
  );
};
