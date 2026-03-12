import { Slider } from "@/components/ui/slider";

interface Props {
  questionId: number;
  text: string;
  value: number;
  onChange: (id: number, value: number) => void;
}

const LABELS = [
  { pos: 0, label: "Strongly Disagree" },
  { pos: 25, label: "Disagree" },
  { pos: 50, label: "Neutral" },
  { pos: 75, label: "Agree" },
  { pos: 100, label: "Strongly Agree" },
];

export const DISCSliderQuestion = ({ questionId, text, value, onChange }: Props) => {
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <p className="text-sm font-medium text-foreground">{questionId}. {text}</p>
      <div className="px-2 space-y-2">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(questionId, v)}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {LABELS.map((l) => (
            <span key={l.pos} className="text-center w-16">{l.label}</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center font-medium">
        Your position: <span className="text-foreground">{
          value <= 15 ? "Strongly Disagree" :
          value <= 35 ? "Disagree" :
          value <= 65 ? "Neutral" :
          value <= 85 ? "Agree" : "Strongly Agree"
        }</span>
      </p>
    </div>
  );
};
