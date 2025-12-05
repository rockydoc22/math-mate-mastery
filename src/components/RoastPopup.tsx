import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import roastData from "@/data/roasts.json";

interface RoastPopupProps {
  percentage: number;
  isOpen: boolean;
  onClose: () => void;
}

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const RoastPopup = ({ percentage, isOpen, onClose }: RoastPopupProps) => {
  const [roast, setRoast] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const scoreRanges = roastData.score_ranges as Record<string, { title: string; messages: string[] }>;
      
      let rangeKey: string;
      
      // Special case: all wrong (0%)
      if (percentage === 0) {
        const allWrong = roastData.special_situations.all_wrong;
        setRoast({
          title: allWrong.title,
          message: getRandomItem(allWrong.messages),
        });
        return;
      }
      
      // Determine score range
      if (percentage <= 30) {
        rangeKey = "0-30";
      } else if (percentage <= 50) {
        rangeKey = "31-50";
      } else if (percentage <= 69) {
        rangeKey = "51-69";
      } else if (percentage <= 79) {
        rangeKey = "70-79";
      } else if (percentage <= 89) {
        rangeKey = "80-89";
      } else if (percentage <= 94) {
        rangeKey = "90-94";
      } else if (percentage <= 99) {
        rangeKey = "95-99";
      } else {
        rangeKey = "100";
      }
      
      const range = scoreRanges[rangeKey];
      if (range) {
        setRoast({
          title: range.title,
          message: getRandomItem(range.messages),
        });
      }
    }
  }, [isOpen, percentage]);

  if (!roast) return null;

  const getBackgroundStyle = () => {
    if (percentage === 100) return "from-yellow-500/20 to-amber-500/20";
    if (percentage >= 95) return "from-purple-500/20 to-pink-500/20";
    if (percentage >= 90) return "from-blue-500/20 to-cyan-500/20";
    if (percentage >= 80) return "from-green-500/20 to-emerald-500/20";
    if (percentage >= 70) return "from-yellow-500/20 to-orange-500/20";
    if (percentage >= 51) return "from-orange-500/20 to-red-500/20";
    return "from-red-500/20 to-rose-500/20";
  };

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 95) return "💎";
    if (percentage >= 90) return "🌟";
    if (percentage >= 80) return "🎯";
    if (percentage >= 70) return "📊";
    if (percentage >= 51) return "🔧";
    if (percentage >= 31) return "🪙";
    return "🤦";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md bg-gradient-to-br ${getBackgroundStyle()}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <span className="text-3xl">{getEmoji()}</span>
            {roast.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-4 text-foreground/80 leading-relaxed">
            {roast.message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button onClick={onClose} variant="outline" className="min-w-[120px]">
            I Deserve This
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
