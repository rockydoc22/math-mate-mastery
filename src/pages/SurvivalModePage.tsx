import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Trophy, Skull } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import SurvivalMode from "@/components/SurvivalMode";

type SurvivalQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

function convertQuestions(): SurvivalQuestion[] {
  const all = [...questions, ...englishQuestions];
  // Shuffle
  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.map((q) => {
    const opts = q.options.map((o) => o.text);
    const correctIdx = q.options.findIndex((o) => o.letter === q.correctAnswer);
    return {
      question: q.question,
      options: opts,
      correctIndex: correctIdx >= 0 ? correctIdx : 0,
    };
  });
}

export default function SurvivalModePage() {
  const navigate = useNavigate();
  const [gameKey, setGameKey] = useState(0);
  const [result, setResult] = useState<{ score: number; answered: number } | null>(null);

  const survivalQuestions = useMemo(() => convertQuestions(), [gameKey]);

  const handleGameOver = (score: number, questionsAnswered: number) => {
    setResult({ score, answered: questionsAnswered });
  };

  const restart = () => {
    setResult(null);
    setGameKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Skull className="h-6 w-6 text-destructive" />
              Survival Mode
            </h1>
            <p className="text-sm text-muted-foreground">3 lives. Streak multipliers. How far can you go?</p>
          </div>
        </div>

        {result ? (
          /* Game Over Screen */
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
            <Trophy className="mx-auto h-16 w-16 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Game Over!</h2>
            <p className="text-muted-foreground mb-6">
              You answered {result.answered} question{result.answered !== 1 ? "s" : ""}
            </p>
            <div className="mb-8 rounded-2xl bg-muted p-6">
              <div className="text-sm font-medium text-muted-foreground">Final Score</div>
              <div className="text-5xl font-bold text-primary">{result.score.toLocaleString()}</div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={restart} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Play Again
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Home
              </Button>
            </div>
          </div>
        ) : (
          <SurvivalMode key={gameKey} questions={survivalQuestions} onGameOver={handleGameOver} />
        )}
      </div>
    </div>
  );
}
