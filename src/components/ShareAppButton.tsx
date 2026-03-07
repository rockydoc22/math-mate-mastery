import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const APP_URL = "https://math-mate-mastery.lovable.app";
const SHARE_TEXT = "Check out this free test prep app for SAT, PSAT, ACT & AP — 15,000+ questions, AI practice & multiplayer battles!";

export const ShareAppButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "40² Test Prep", text: SHARE_TEXT, url: APP_URL });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  const shareToX = () => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(APP_URL)}`, "_blank");
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + APP_URL)}`, "_blank");
  };

  const shareToReddit = () => {
    window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(APP_URL)}&title=${encodeURIComponent("Free SAT Prep App - 2000+ Questions, AI Practice & Multiplayer")}`, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share App
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem onClick={handleNativeShare} className="gap-2 cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share...
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToX} className="gap-2 cursor-pointer">
          <span className="w-4 h-4 text-center font-bold text-sm">𝕏</span>
          Post on X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToWhatsApp} className="gap-2 cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToReddit} className="gap-2 cursor-pointer">
          <span className="w-4 h-4 text-center font-bold text-xs">R</span>
          Reddit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
