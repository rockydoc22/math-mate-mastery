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
  const totalMax = config.scoreRange.max;

  const mathScore = ratingToExamScore(mathRating, examType);
  const englishScore = ratingToExamScore(englishRating, examType);
  const mathDisplay = Math.round((mathScore.min + mathScore.max) / 2);
  const englishDisplay = Math.round((englishScore.min + englishScore.max) / 2);

  // Section-level scores (SAT/PSAT: half of total, ACT: same as composite)
  const mathSection = examType === 'act' ? mathDisplay : Math.round(mathDisplay / 2);
  const englishSection = examType === 'act' ? englishDisplay : Math.round(englishDisplay / 2);

  const combined = mathSection + englishSection;
  const gap = totalMax - combined;

  const mathPercent = Math.round((mathSection / (mathSection + englishSection)) * 100);
  const englishPercent = 100 - mathPercent;

  const getMessage = () => {
    if (gap <= 0) return "You're at the top! Keep it up! 🏆";
    const mathGap = sectionMax - mathSection;
    const englishGap = sectionMax - englishSection;
    if (mathGap > englishGap + (examType === 'act' ? 2 : 30)) {
      return `Math has more room to grow (+${mathGap}). Focus there! 🧮`;
    } else if (englishGap > mathGap + (examType === 'act' ? 2 : 30)) {
      return `English has more room to grow (+${englishGap}). Focus there! 📚`;
    }
    return "Your Math and English are neck and neck! 🤝";
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

      {/* Single-line bar */}
      <div className="flex rounded-full overflow-hidden h-6 mb-3">
        <div
          className="bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground transition-all duration-500"
          style={{ width: `${mathPercent}%` }}
        >
          {mathSection}/{sectionMax}
        </div>
        <div
          className="bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground transition-all duration-500"
          style={{ width: `${englishPercent}%` }}
        >
          {englishSection}/{sectionMax}
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>🧮 Math</span>
        <span>📚 English</span>
      </div>

      {gap > 0 && (
        <div className="text-center text-xs text-muted-foreground mb-1">
          <span className="font-semibold text-primary">+{gap}</span> to reach {totalMax}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center italic">{getMessage()}</p>
    </Card>
  );
};
