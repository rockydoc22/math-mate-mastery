import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { GraduationCap } from "lucide-react";

interface ExamSelectorProps {
  onSelect: (examType: ExamType) => void;
  isModal?: boolean;
}

const examOrder: ExamType[] = ['sat', 'psat', 'act'];

export const ExamSelector = ({ onSelect, isModal = false }: ExamSelectorProps) => {
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

        <div className="space-y-3">
          {examOrder.map((key) => {
            const config = EXAM_CONFIGS[key];
            const isACT = key === 'act';
            return (
              <Card
                key={key}
                className={`p-5 cursor-pointer border-2 transition-all hover:scale-[1.02] hover:shadow-lg ${
                  isACT ? 'opacity-80 border-dashed' : 'hover:border-primary/50'
                }`}
                onClick={() => !isACT && onSelect(key)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{config.name}</h3>
                      {isACT && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{config.tagline}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score range: {config.scoreRange.min}–{config.scoreRange.max} • {config.sections.join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          SAT and PSAT share the same question bank. ACT will include Science-specific content.
        </p>
      </div>
    </div>
  );
};
