import { useState } from "react";
import { FillTheGapQuestion } from "@/data/alternativeAssessmentQuestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  question: FillTheGapQuestion;
  onAnswer: (correct: boolean) => void;
}

export const FillTheGap = ({ question, onAnswer }: Props) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const trimmed = answer.trim();
    const allAccepted = [question.correctAnswer, ...(question.acceptableAnswers || [])];
    const correct = allAccepted.some(a => a.toLowerCase() === trimmed.toLowerCase());
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);
  };

  // Split template at ___ to render the input inline
  const parts = question.template.split("___");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{question.prompt}</h3>

      <div className="p-5 rounded-xl bg-card border border-border">
        <p className="text-base text-foreground leading-relaxed flex flex-wrap items-center gap-1">
          {parts[0]}
          <span className="inline-flex items-center gap-1">
            <Input
              value={answer}
              onChange={e => !submitted && setAnswer(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !submitted && handleSubmit()}
              disabled={submitted}
              className={`w-24 inline-block text-center font-bold text-lg h-9 ${
                submitted
                  ? isCorrect
                    ? "border-success bg-success/10 text-success"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : ""
              }`}
              placeholder="?"
              autoFocus
            />
            {submitted && (
              isCorrect
                ? <Check className="w-5 h-5 text-success" />
                : <X className="w-5 h-5 text-destructive" />
            )}
          </span>
          {parts[1] || ""}
        </p>
      </div>

      {submitted && !isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-muted text-sm"
        >
          <p className="text-muted-foreground">
            Correct answer: <strong className="text-foreground">{question.correctAnswer}</strong>
          </p>
          {question.explanation && <p className="mt-1 text-muted-foreground">{question.explanation}</p>}
        </motion.div>
      )}

      {submitted && isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-success/10 text-success text-sm font-semibold"
        >
          ✓ Correct!
        </motion.div>
      )}

      {!submitted && (
        <Button onClick={handleSubmit} disabled={!answer.trim()} className="w-full" size="lg">
          Submit Answer
        </Button>
      )}
    </div>
  );
};
