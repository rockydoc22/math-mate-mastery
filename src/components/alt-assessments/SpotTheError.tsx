import { useState } from "react";
import { SpotTheErrorQuestion } from "@/data/alternativeAssessmentQuestions";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  question: SpotTheErrorQuestion;
  onAnswer: (correct: boolean) => void;
}

export const SpotTheError = ({ question, onAnswer }: Props) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const errorStep = question.workedSolution.find(s => s.isError);

  const handleSubmit = () => {
    if (selectedStep === null) return;
    const correct = question.workedSolution[selectedStep]?.isError === true;
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{question.prompt}</h3>
      <p className="text-sm text-muted-foreground">Tap the step that contains the error.</p>

      <div className="space-y-2">
        {question.workedSolution.map((step, index) => {
          const isSelected = selectedStep === index;
          const showCorrectError = submitted && step.isError;
          const showWrongPick = submitted && isSelected && !step.isError;

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.98 }}
              onClick={() => !submitted && setSelectedStep(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                submitted
                  ? showCorrectError
                    ? "border-destructive bg-destructive/10"
                    : showWrongPick
                    ? "border-orange-400 bg-orange-400/10"
                    : "border-border bg-card"
                  : isSelected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {step.step}
                </span>
                <span className="text-sm text-foreground flex-1">{step.text}</span>
                {submitted && showCorrectError && (
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
                {submitted && !step.isError && isSelected && (
                  <span className="text-xs text-orange-500 font-medium">Not the error</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-sm ${
            isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? <Check className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            <div>
              <p className="font-semibold">{isCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-1 text-foreground/80">{question.correctAnswer}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!submitted && (
        <Button onClick={handleSubmit} disabled={selectedStep === null} className="w-full" size="lg">
          Submit Answer
        </Button>
      )}
    </div>
  );
};
