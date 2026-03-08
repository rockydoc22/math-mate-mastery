import { useState, useCallback } from "react";
import { OrderingQuestion } from "@/data/alternativeAssessmentQuestions";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  question: OrderingQuestion;
  onAnswer: (correct: boolean) => void;
}

export const OrderingChallenge = ({ question, onAnswer }: Props) => {
  const [items, setItems] = useState(() => [...question.steps]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveItem = useCallback((index: number, direction: -1 | 1) => {
    if (submitted) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  }, [items, submitted]);

  const handleSubmit = () => {
    const correct = items.every((item, i) => item === question.correctOrder[i]);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{question.prompt}</h3>
      <p className="text-sm text-muted-foreground">Drag or use arrows to reorder the steps.</p>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const isCorrectPos = submitted && item === question.correctOrder[index];
            const isWrongPos = submitted && item !== question.correctOrder[index];

            return (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                  submitted
                    ? isCorrectPos
                      ? "border-success bg-success/10"
                      : "border-destructive bg-destructive/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="flex-1 text-sm text-foreground">{item}</span>
                {!submitted && (
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 1)}
                      disabled={index === items.length - 1}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {submitted && (
                  isCorrectPos
                    ? <Check className="w-5 h-5 text-success flex-shrink-0" />
                    : <X className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {submitted && !isCorrect && question.explanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-3 rounded-lg bg-muted text-sm text-muted-foreground"
        >
          <strong>Correct order:</strong>
          <ol className="list-decimal ml-5 mt-1 space-y-1">
            {question.correctOrder.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          {question.explanation && <p className="mt-2">{question.explanation}</p>}
        </motion.div>
      )}

      {!submitted && (
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Submit Order
        </Button>
      )}
    </div>
  );
};
