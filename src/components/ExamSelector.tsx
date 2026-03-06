import { Card } from "@/components/ui/card";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { GraduationCap, FlaskConical, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExamSelectorProps {
  onSelect: (examType: ExamType) => void;
  isModal?: boolean;
}

const examOrder: ExamType[] = ['sat', 'psat', 'act'];

export const ExamSelector = ({ onSelect, isModal = false }: ExamSelectorProps) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${!isModal ? 'bg-gradient-to-br from-background via-primary/5 to-accent/10' : ''}`}>
      <div className="max-w-md w-full space-y-6 animate-in fade-in duration-500">
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">What are you studying for?</h1>
          <p className="text-sm text-muted-foreground">
            Choose your exam. You can switch anytime in Settings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* SAT, PSAT, ACT */}
          {examOrder.map((key) => {
            const config = EXAM_CONFIGS[key];
            return (
              <Card
                key={key}
                className="p-4 cursor-pointer border-2 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 flex flex-col items-center text-center gap-2"
                onClick={() => onSelect(key)}
              >
                <span className="text-4xl">{config.icon}</span>
                <h3 className="font-bold text-lg">{config.name}</h3>
                <p className="text-xs text-muted-foreground">{config.tagline}</p>
                <p className="text-[10px] text-muted-foreground">
                  {config.scoreRange.min}–{config.scoreRange.max}
                </p>
              </Card>
            );
          })}

          {/* AP Tests */}
          <Card
            className="p-4 cursor-pointer border-2 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 flex flex-col items-center text-center gap-2"
            onClick={() => navigate("/ap-tests")}
          >
            <span className="text-4xl">🧪</span>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-lg">AP Tests</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                NEW
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Physics, Bio, Calc & more</p>
            <p className="text-[10px] text-muted-foreground">
              Score range: 1–5
            </p>
          </Card>

          {/* French Competition */}
          <Card
            className="p-4 cursor-pointer border-2 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 flex flex-col items-center text-center gap-2 col-span-2"
            onClick={() => navigate("/french-competition")}
          >
            <span className="text-4xl">🇫🇷</span>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-lg">French Competition</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                NEW
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Grammar, culture, listening & elite phrases</p>
            <p className="text-[10px] text-muted-foreground">
              CCFF-style practice
            </p>
          </Card>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          SAT and PSAT share the same question bank. ACT includes Science-specific content.
        </p>
      </div>
    </div>
  );
};
