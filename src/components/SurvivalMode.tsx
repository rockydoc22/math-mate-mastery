import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

type SurvivalModeProps = {
  questions: Question[];
  onGameOver: (score: number, questionsAnswered: number) => void;
};

const MAX_LIVES = 3;

export default function SurvivalMode({ questions, onGameOver }: SurvivalModeProps) {
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [score, setScore] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];

  const hearts = useMemo(
    () =>
      Array.from({ length: MAX_LIVES }, (_, i) => (
        <span
          key={i}
          className={cn(
            "text-2xl transition-all duration-300",
            i < lives ? "opacity-100 scale-100" : "opacity-25 scale-75"
          )}
        >
          ❤️
        </span>
      )),
    [lives]
  );

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion || isLocked) return;
    setSelectedIndex(optionIndex);
    setIsLocked(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    window.setTimeout(() => {
      if (isCorrect) {
        const nextStreak = streak + 1;
        const multiplier = Math.min(1 + nextStreak * 0.25, 3);
        const pointsEarned = Math.round(100 * multiplier);
        setScore((prev) => prev + pointsEarned);
        setStreak(nextStreak);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
          onGameOver(score + pointsEarned, currentIndex + 1);
          return;
        }
        setCurrentIndex(nextIndex);
      } else {
        const nextLives = lives - 1;
        setStreak(0);
        if (nextLives <= 0) {
          setLives(0);
          onGameOver(score, currentIndex + 1);
          return;
        }
        setLives(nextLives);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
          onGameOver(score, currentIndex + 1);
          return;
        }
        setCurrentIndex(nextIndex);
      }
      setSelectedIndex(null);
      setIsLocked(false);
    }, 700);
  };

  if (!currentQuestion) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-card p-6 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">No questions loaded</h2>
          <p className="mt-2 text-muted-foreground">Add questions to start Survival Mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-gradient-to-b from-card to-muted/30 p-6 shadow-2xl">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted p-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Lives</div>
          <div className="mt-1 flex gap-1">{hearts}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Score</div>
          <div className="text-2xl font-bold text-foreground">{score}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">Streak</div>
          <div className="text-2xl font-bold text-primary">x{Math.max(1, streak)}</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span>{isLocked ? "Checking..." : "Choose an answer"}</span>
        </div>

        <h2 className="text-xl font-semibold leading-relaxed text-foreground">
          {currentQuestion.question}
        </h2>

        <div className="mt-6 grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = selectedIndex === index;

            return (
              <button
                key={`${currentIndex}-${index}`}
                type="button"
                disabled={isLocked}
                onClick={() => handleAnswer(index)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-3 text-left font-medium transition-all duration-200",
                  isLocked && isSelected && isCorrect && "border-green-500 bg-green-500/10",
                  isLocked && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                  isLocked && !isSelected && isCorrect && "border-green-400 bg-green-500/5",
                  !isLocked && "border-border bg-card hover:border-primary/40 hover:bg-accent",
                  isLocked && !isSelected && !isCorrect && "border-border bg-card"
                )}
              >
                <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
