import { Card } from "@/components/ui/card";
import { Swords } from "lucide-react";
import { ratingToExamScore, EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";

interface SubjectDuelCardProps {
  mathRating: number;
  englishRating: number;
  examType?: ExamType;
}

export const SubjectDuelCard = ({ mathRating, englishRating, examType = 'sat' }: SubjectDuelCardProps) => {
  const config = EXAM_CONFIGS[examType];
  const sectionMax = config.sectionScoreRange.max;
  const sectionMin = config.sectionScoreRange.min;
  const totalMax = config.scoreRange.max;

  // Convert ELO ratings to section-level exam scores
  const mathScore = ratingToExamScore(mathRating, examType);
  const englishScore = ratingToExamScore(englishRating, examType);
  const mathDisplay = Math.round((mathScore.min + mathScore.max) / 2);
  const englishDisplay = Math.round((englishScore.min + englishScore.max) / 2);

  // For ACT, each section is out of 36 (composite), but section score range is 1-36
  // For SAT/PSAT, each section is out of 800/760
  const mathSection = examType === 'act' ? mathDisplay : Math.round(mathDisplay / 2);
  const englishSection = examType === 'act' ? englishDisplay : Math.round(englishDisplay / 2);

  const mathPercent = Math.round(((mathSection - sectionMin) / (sectionMax - sectionMin)) * 100);
  const englishPercent = Math.round(((englishSection - sectionMin) / (sectionMax - sectionMin)) * 100);

  const combined = mathSection + englishSection;
  const gap = totalMax - combined;

  const getMessage = () => {
    if (gap <= 0) return "You're projected at the top! Keep it up! 🏆";
    const mathGap = sectionMax - mathSection;
    const englishGap = sectionMax - englishSection;
    if (mathGap > englishGap) {
      return `Math has the most room to grow (+${mathGap}). Focus there! 🧮`;
    } else if (englishGap > mathGap) {
      return `English has the most room to grow (+${englishGap}). Focus there! 📚`;
    }
    return `Both subjects are even — keep pushing both! 💪`;
  };

  return (
    <Card className="p-4 border-2 border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">Subject Duel</h3>
        </div>
        <span className="text-xs font-bold text-primary">
          {combined} / {totalMax}
        </span>
      </div>

      {/* Math bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium">🧮 Math</span>
          <span className="text-muted-foreground">{mathSection} / {sectionMax}</span>
        </div>
        <div className="h-5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${Math.max(mathPercent, 5)}%` }}
          >
            {mathPercent > 20 && (
              <span className="text-[10px] font-bold text-primary-foreground">{mathSection}</span>
            )}
          </div>
        </div>
      </div>

      {/* English bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium">📚 English</span>
          <span className="text-muted-foreground">{englishSection} / {sectionMax}</span>
        </div>
        <div className="h-5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${Math.max(englishPercent, 5)}%` }}
          >
            {englishPercent > 20 && (
              <span className="text-[10px] font-bold text-secondary-foreground">{englishSection}</span>
            )}
          </div>
        </div>
      </div>

      {/* Gap indicator */}
      {gap > 0 && (
        <div className="text-center text-xs text-muted-foreground mb-2">
          <span className="font-semibold text-primary">+{gap}</span> points to reach {totalMax}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center italic">{getMessage()}</p>
    </Card>
  );
};
