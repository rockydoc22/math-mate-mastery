import { Card } from "@/components/ui/card";
import { Swords } from "lucide-react";

interface SubjectDuelCardProps {
  mathRating: number;
  englishRating: number;
}

export const SubjectDuelCard = ({ mathRating, englishRating }: SubjectDuelCardProps) => {
  const gap = Math.abs(Math.round(mathRating - englishRating));
  const mathWins = mathRating > englishRating;
  const tied = gap < 10;

  const getMessage = () => {
    if (tied) return "Your Math and English are neck and neck! 🤝";
    if (gap > 100) {
      return mathWins
        ? `Your Math is crushing English by ${gap} points. Time to close the gap! 📚`
        : `Your English is dominating Math by ${gap} points. Let's balance it out! 🧮`;
    }
    return mathWins
      ? `Math leads English by ${gap} points — close the gap! 📚`
      : `English leads Math by ${gap} points — close the gap! 🧮`;
  };

  const mathPercent = Math.round((mathRating / (mathRating + englishRating)) * 100);
  const englishPercent = 100 - mathPercent;

  return (
    <Card className="p-4 border-2 border-border">
      <div className="flex items-center gap-2 mb-3">
        <Swords className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-sm">Subject Duel</h3>
      </div>
      
      {/* Bar visualization */}
      <div className="flex rounded-full overflow-hidden h-6 mb-3">
        <div
          className="bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground transition-all duration-500"
          style={{ width: `${mathPercent}%` }}
        >
          {Math.round(mathRating)}
        </div>
        <div
          className="bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground transition-all duration-500"
          style={{ width: `${englishPercent}%` }}
        >
          {Math.round(englishRating)}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>🧮 Math</span>
        <span>📚 English</span>
      </div>

      <p className="text-xs text-muted-foreground text-center italic">{getMessage()}</p>
    </Card>
  );
};
