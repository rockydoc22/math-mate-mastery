import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { IQItem } from "@/pages/CognitiveSkills";

interface Props {
  item: IQItem;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

const LETTERS = ["A", "B", "C", "D"];

export const IQQuestionCard = ({ item, selectedAnswer, onSelect }: Props) => {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-0.5 rounded-full bg-muted capitalize">
          {item.domain.replace(/_/g, " ")}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-muted capitalize">
          {item.difficulty}
        </span>
      </div>

      <p className="text-lg font-medium leading-relaxed text-foreground">
        {item.prompt}
      </p>

      <RadioGroup value={selectedAnswer || ""} onValueChange={onSelect}>
        <div className="space-y-3">
          {item.options.map((option, idx) => (
            <Label
              key={idx}
              htmlFor={`option-${idx}`}
              className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                selectedAnswer === option
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
            >
              <RadioGroupItem value={option} id={`option-${idx}`} />
              <span className="text-xs font-bold text-muted-foreground w-5">
                {LETTERS[idx]}
              </span>
              <span className="text-sm text-foreground">{option}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
};
