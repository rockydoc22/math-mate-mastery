import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Download, Copy, Check } from "lucide-react";
import { getRank } from "@/lib/ranks";

interface ShareResultCardProps {
  score: number;
  total: number;
  subject: string;
  questionsAnswered?: number;
  streak?: number;
}

export const ShareResultCard = ({
  score,
  total,
  subject,
  questionsAnswered = 0,
  streak = 0,
}: ShareResultCardProps) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const percentage = Math.round((score / total) * 100);
  const rank = getRank(questionsAnswered);

  const getGrade = () => {
    if (percentage >= 90) return { letter: "A+", color: "text-emerald-500" };
    if (percentage >= 80) return { letter: "A", color: "text-emerald-500" };
    if (percentage >= 70) return { letter: "B", color: "text-blue-500" };
    if (percentage >= 60) return { letter: "C", color: "text-yellow-500" };
    return { letter: "D", color: "text-red-500" };
  };

  const grade = getGrade();

  const shareText = `🎯 I scored ${score}/${total} (${percentage}%) on SAT ${subject}!

${rank.emoji} Rank: ${rank.name} ${rank.tier}
🔥 Streak: ${streak} days

Practice with me at 40² SAT Prep! 📚`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My SAT Score - 40² SAT Prep",
          text: shareText,
          url: window.location.origin,
        });
      } catch (e) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Result
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Share Your Score</DialogTitle>
        </DialogHeader>

        {/* Preview Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-background to-accent/20 border border-border p-6"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

          <div className="relative z-10 text-center space-y-4">
            {/* Logo */}
            <div className="text-2xl font-bold">40²</div>

            {/* Score */}
            <div>
              <div className={`text-6xl font-black ${grade.color}`}>
                {grade.letter}
              </div>
              <div className="text-lg font-semibold mt-1">
                {score}/{total} ({percentage}%)
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {subject} Quiz
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold">{rank.emoji}</div>
                <div className="text-xs text-muted-foreground">
                  {rank.name} {rank.tier}
                </div>
              </div>
              {streak > 0 && (
                <div className="text-center">
                  <div className="font-bold">🔥 {streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="pt-2 text-xs text-muted-foreground">
              Practice with me at <span className="font-semibold text-primary">40² SAT Prep</span>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-2">
          <Button onClick={shareNative} className="flex-1 gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button onClick={copyToClipboard} variant="outline" className="gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
