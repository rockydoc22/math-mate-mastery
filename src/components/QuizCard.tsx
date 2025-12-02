import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  showResult: boolean;
}

export const QuizCard = ({ question, selectedAnswer, onSelectAnswer, showResult }: QuizCardProps) => {
  return (
    <Card className="p-8 shadow-xl border-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            {question.domain} • {question.skill}
          </p>
          <h2 className="text-xl font-bold leading-relaxed whitespace-pre-wrap">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.letter;
            const isCorrect = option.letter === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={option.letter}
                onClick={() => !showResult && onSelectAnswer(option.letter)}
                disabled={showResult}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all
                  ${!showResult && !isSelected ? 'border-border hover:border-primary hover:bg-primary/5' : ''}
                  ${!showResult && isSelected ? 'border-primary bg-primary/10' : ''}
                  ${showCorrect ? 'border-success bg-success/10' : ''}
                  ${showWrong ? 'border-destructive bg-destructive/10' : ''}
                  ${showResult ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className={`
                    font-bold text-lg min-w-[2rem]
                    ${showCorrect ? 'text-success' : ''}
                    ${showWrong ? 'text-destructive' : ''}
                    ${!showResult && isSelected ? 'text-primary' : ''}
                  `}>
                    {option.letter}.
                  </span>
                  <span className="flex-1 text-base">{option.text}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-2 text-foreground">Explanation:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
