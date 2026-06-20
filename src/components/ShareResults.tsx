import { Button } from "@/components/ui/button";
import { Twitter, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useParentalGate } from "@/hooks/useParentalGate";

interface ShareResultsProps {
  score: number;
  total: number;
  percentage: number;
  subject: string;
}

export const ShareResults = ({ score, total, percentage, subject }: ShareResultsProps) => {
  const [copied, setCopied] = useState(false);
  const { guard, gate } = useParentalGate();

  const getMessage = () => {
    const emoji = percentage === 100 ? "🏆" : percentage >= 80 ? "🔥" : percentage >= 60 ? "💪" : "📚";
    return `${emoji} Just scored ${score}/${total} (${percentage}%) on SAT ${subject} practice!\n\nGrinding for that 1600 💯\n\n#SAT #SATPrep #CollegeAdmissions`;
  };

  const shareToTwitter = () => guard(() => {
    const text = encodeURIComponent(getMessage());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }, { reason: "Posting to X opens another website. A parent must continue." });

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getMessage());
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={shareToTwitter} className="gap-2">
        <Twitter className="w-4 h-4" />
        Tweet
      </Button>
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        Copy
      </Button>
      {gate}
    </div>
  );
};
