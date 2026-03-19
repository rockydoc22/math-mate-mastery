import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AdaptiveQuestion,
  createInitialAdaptiveSessionState,
  getAdaptiveSessionSummary,
  recordAdaptiveAnswer,
  selectNextAdaptiveQuestion,
} from "@/lib/adaptivePracticeSessionEngine";

export type AdaptivePracticeSessionProps = {
  questions: AdaptiveQuestion[];
  skillFocus?: string[];
  targetQuestionCount?: number;
  onComplete?: (result: { correctCount: number; wrongCount: number; accuracy: number; suggestedNextStep: string }) => void;
};

export default function AdaptivePracticeSession({
  questions,
  skillFocus = [],
  targetQuestionCount = 10,
  onComplete,
}: AdaptivePracticeSessionProps) {
  const [sessionState, setSessionState] = useState(() => createInitialAdaptiveSessionState(skillFocus));
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null);
  const [coachMessage, setCoachMessage] = useState("Loading your personalized set...");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const result = selectNextAdaptiveQuestion({
      questionBank: questions,
      state: createInitialAdaptiveSessionState(skillFocus),
      config: { targetQuestionCount },
    });
    setSessionState(result.updatedState);
    setCurrentQuestion(result.nextQuestion);
    setCoachMessage(result.coachMessage);
    setIsComplete(result.sessionComplete);
  }, [questions, skillFocus, targetQuestionCount]);

  const progress = useMemo(() => {
    const totalAnswered = sessionState.correctCount + sessionState.wrongCount;
    return Math.min(100, Math.round((totalAnswered / targetQuestionCount) * 100));
  }, [sessionState, targetQuestionCount]);

  const handleAnswer = (index: number) => {
    if (!currentQuestion || selectedIndex !== null) return;
    setSelectedIndex(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!currentQuestion || selectedIndex === null) return;
    const wasCorrect = selectedIndex === currentQuestion.correctIndex;
    const recorded = recordAdaptiveAnswer(sessionState, wasCorrect);
    const next = selectNextAdaptiveQuestion({ questionBank: questions, state: recorded, config: { targetQuestionCount } });

    setSessionState(next.updatedState);
    setCurrentQuestion(next.nextQuestion);
    setCoachMessage(next.coachMessage);
    setSelectedIndex(null);
    setShowExplanation(false);
    setIsComplete(next.sessionComplete);

    if (next.sessionComplete) {
      const summary = getAdaptiveSessionSummary(recorded);
      onComplete?.({ correctCount: recorded.correctCount, wrongCount: recorded.wrongCount, accuracy: summary.accuracy, suggestedNextStep: summary.suggestedNextStep });
    }
  };

  if (isComplete || !currentQuestion) {
    const summary = getAdaptiveSessionSummary(sessionState);
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground">Adaptive Session Complete</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="text-xs text-muted-foreground">Correct</div>
            <div className="mt-1 text-2xl font-bold">{sessionState.correctCount}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="text-xs text-muted-foreground">Wrong</div>
            <div className="mt-1 text-2xl font-bold">{sessionState.wrongCount}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="text-xs text-muted-foreground">Accuracy</div>
            <div className="mt-1 text-2xl font-bold">{Math.round(summary.accuracy * 100)}%</div>
          </div>
        </div>
        <div className="mt-5 rounded-lg border p-4 text-sm text-muted-foreground">{summary.suggestedNextStep}</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Adaptive Practice</h2>
          <p className="mt-1 text-xs text-muted-foreground">Questions adjust as you perform.</p>
        </div>
        <Badge variant="secondary">{sessionState.currentDifficulty}</Badge>
      </div>

      <Progress value={progress} className="mt-5" />

      <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">{coachMessage}</div>

      <div className="mt-5 rounded-lg border p-6">
        <div className="text-xs text-muted-foreground">{currentQuestion.subject} · {currentQuestion.skill}</div>
        <div className="mt-3 text-lg font-semibold text-foreground">{currentQuestion.prompt}</div>

        <div className="mt-5 grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = index === selectedIndex;

            let className = "w-full rounded-lg border px-4 py-3 text-left font-medium transition text-sm ";
            if (selectedIndex === null) {
              className += "border-border hover:bg-muted/50";
            } else if (isSelected && isCorrect) {
              className += "border-green-500 bg-green-50 dark:bg-green-950/30";
            } else if (isSelected && !isCorrect) {
              className += "border-destructive bg-destructive/10";
            } else if (isCorrect) {
              className += "border-green-300 bg-green-50 dark:bg-green-950/20";
            } else {
              className += "border-border opacity-70";
            }

            return (
              <button key={index} type="button" disabled={selectedIndex !== null} onClick={() => handleAnswer(index)} className={className}>
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-5 rounded-lg bg-muted/50 p-4">
            <div className="text-xs font-semibold text-foreground">Explanation</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {currentQuestion.explanation ?? "Review the concept and identify why the correct answer fits best."}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <Button onClick={handleNext} disabled={!showExplanation}>Next Question</Button>
      </div>
    </Card>
  );
}
