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

  // Section-level scores
  const mathSection = examType === 'act' ? mathDisplay : Math.round(mathDisplay / 2);
  const englishSection = examType === 'act' ? englishDisplay : Math.round(englishDisplay / 2);

  const combined = mathSection + englishSection;
  const gap = totalMax - combined;

  // Percentages of the total max score
  const mathPct = Math.round((mathSection / totalMax) * 100);
  const englishPct = Math.round((englishSection / totalMax) * 100);
  const gapPct = Math.max(0, 100 - mathPct - englishPct);

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

      {/* Single-line bar: Math | Gap | English */}
      <div className="flex rounded-full overflow-hidden h-6 mb-3">
        <div
          className="bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground transition-all duration-500"
          style={{ width: `${mathPct}%` }}
        >
          {mathPct > 15 && `${mathSection}`}
        </div>
        {gapPct > 0 && (
          <div
            className="bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground transition-all duration-500"
            style={{ width: `${gapPct}%` }}
          >
            {gapPct > 10 && `+${gap}`}
          </div>
        )}
        <div
          className="bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground transition-all duration-500"
          style={{ width: `${englishPct}%` }}
        >
          {englishPct > 15 && `${englishSection}`}
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>🧮 Math ({mathSection}/{sectionMax})</span>
        <span>📚 English ({englishSection}/{sectionMax})</span>
      </div>

      <p className="text-xs text-muted-foreground text-center italic">{getMessage()}</p>
    </Card>
  );
};
