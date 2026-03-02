import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swords, Share2, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChallengeAFriendProps {
  score: number;
  totalQuestions: number;
  subject: string;
  percentage: number;
}

export function ChallengeAFriend({ score, totalQuestions, subject, percentage }: ChallengeAFriendProps) {
  const [copied, setCopied] = useState(false);

  const challengeText = `🏆 I scored ${score}/${totalQuestions} (${percentage}%) on ${subject}! Can you beat me?\n\nTry it free: ${window.location.origin}/quiz?subject=${subject.toLowerCase()}&count=${totalQuestions}&difficulty=all&timer=true`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SAT Challenge: Beat my ${percentage}%!`,
          text: challengeText,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(challengeText);
    setCopied(true);
    toast({ title: "Challenge link copied!", description: "Send it to a friend!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-orange-500/10 border border-destructive/20">
      <div className="flex items-center gap-2 mb-1">
        <Swords className="w-5 h-5 text-destructive" />
        <span className="font-bold text-foreground">Challenge a Friend!</span>
      </div>
      <p className="text-xs text-muted-foreground text-center mb-2">
        Think your score is unbeatable? Prove it.
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleShare}
          className="gap-2 bg-destructive hover:bg-destructive/90"
        >
          <Share2 className="w-4 h-4" />
          Share Challenge
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
}
