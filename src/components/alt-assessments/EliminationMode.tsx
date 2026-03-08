import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  onAnswer: (correct: boolean) => void;
  explanation?: string;
}

export const EliminationMode = ({ question, options, correctAnswer, onAnswer, explanation }: Props) => {
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleEliminate = (letter: string) => {
    if (submitted) return;
    if (selected === letter) return; // can't eliminate selected
    const next = new Set(eliminated);
    if (next.has(letter)) {
      next.delete(letter);
    } else {
      next.add(letter);
    }
    setEliminated(next);
  };

  const selectAnswer = (letter: string) => {
    if (submitted || eliminated.has(letter)) return;
    setSelected(letter);
  };

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{question}</h3>
      <p className="text-xs text-muted-foreground">
        ✕ Tap the X to eliminate wrong answers • Tap the option to select your final answer
      </p>

      <div className="space-y-2">
        {options.map(opt => {
          const isEliminated = eliminated.has(opt.letter);
          const isSelected = selected === opt.letter;
          const isRight = submitted && opt.letter === correctAnswer;
          const isWrong = submitted && isSelected && !isCorrect;

          return (
            <motion.div
              key={opt.letter}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isEliminated
                  ? "opacity-40 border-border bg-muted line-through"
                  : submitted
                  ? isRight
                    ? "border-success bg-success/10"
                    : isWrong
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card"
                  : isSelected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {/* Eliminate button */}
              {!submitted && (
                <button
                  onClick={() => toggleEliminate(opt.letter)}
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isEliminated ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Option body */}
              <button
                onClick={() => selectAnswer(opt.letter)}
                disabled={submitted || isEliminated}
                className="flex-1 text-left text-sm text-foreground"
              >
                <span className="font-bold mr-2">{opt.letter}.</span>
                {opt.text}
              </button>

              {submitted && isRight && <Check className="w-5 h-5 text-success flex-shrink-0" />}
            </motion.div>
          );
        })}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg text-sm ${isCorrect ? "bg-success/10 text-success" : "bg-destructive/10"}`}
        >
          {isCorrect ? (
            <p className="font-semibold">✓ Correct!</p>
          ) : (
            <p className="text-foreground">{explanation || `The correct answer is ${correctAnswer}.`}</p>
          )}
          {eliminated.size > 0 && (
            <p className="text-muted-foreground text-xs mt-1">
              You eliminated {eliminated.size} option{eliminated.size > 1 ? "s" : ""} before answering.
            </p>
          )}
        </motion.div>
      )}

      {!submitted && (
        <Button onClick={handleSubmit} disabled={!selected} className="w-full" size="lg">
          Submit Answer
        </Button>
      )}
    </div>
  );
};
