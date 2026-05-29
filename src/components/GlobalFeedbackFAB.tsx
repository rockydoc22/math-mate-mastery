import { useState, useEffect } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, UserCircle2 } from "lucide-react";

type FeedbackType = "suggestion" | "bug" | "comment" | "content_issue" | "feature_request" | "other";

const FEEDBACK_OPTIONS: { value: FeedbackType; label: string; emoji: string }[] = [
  { value: "bug", label: "Bug Report", emoji: "🐛" },
  { value: "content_issue", label: "Content Issue", emoji: "🚩" },
  { value: "suggestion", label: "Suggestion", emoji: "💡" },
  { value: "feature_request", label: "Feature Request", emoji: "✨" },
  { value: "comment", label: "General Comment", emoji: "💬" },
  { value: "other", label: "Other", emoji: "📝" },
];

export const GlobalFeedbackFAB = () => {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("suggestion");
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [swagEmail, setSwagEmail] = useState("");
  const [wantsSwag, setWantsSwag] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const location = useLocation();

  // Fetch username for logged-in users so we can show "Submitting as @name"
  useEffect(() => {
    if (!user?.id) { setUsername(null); return; }
    let cancelled = false;
    supabase.from("profiles").select("username").eq("id", user.id).maybeSingle()
      .then(({ data }) => { if (!cancelled) setUsername(data?.username ?? null); });
    return () => { cancelled = true; };
  }, [user?.id]);

  // Don't show on landing page (it has its own feedback button)
  const isLandingPage = location.pathname === "/landing";
  // Don't show on auth page
  const isAuthPage = location.pathname === "/auth";

  if (isLandingPage || isAuthPage) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast({ title: "Message required", description: "Please enter your feedback", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const submitter = user
        ? `@${username ?? "user"} (${user.email ?? user.id})`
        : (displayName.trim() ? `Guest: ${displayName.trim().slice(0, 60)}` : "Anonymous guest");
      const swagLine = wantsSwag && swagEmail.trim()
        ? `\n🎁 SWAG ENTRY: ${swagEmail.trim().slice(0, 255)}`
        : "";
      const fullMessage =
        `[Page: ${location.pathname}] [From: ${submitter}] ${message.trim().slice(0, 1700)}${swagLine}`;
      const { error } = await supabase.from("user_feedback").insert({
        user_id: user?.id || null,
        feedback_type: feedbackType,
        message: fullMessage,
        email: (wantsSwag ? swagEmail.trim() : user?.email ?? "").slice(0, 255) || null,
      });

      if (error) throw error;

      supabase.functions.invoke("notify-feedback", {
        body: {
          feedbackType,
          message: fullMessage,
          email: (wantsSwag && swagEmail.trim()) ? swagEmail.trim() : (user?.email || undefined),
        },
      }).catch(() => {});

      toast({ title: "Thank you! 🎉", description: "Your feedback has been submitted." });
      setMessage("");
      setDisplayName("");
      setSwagEmail("");
      setWantsSwag(false);
      setFeedbackType("suggestion");
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Failed to submit", description: error.message || "Please try again", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground"
              aria-label="Send feedback"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5 text-primary" />
              Share Feedback
            </DialogTitle>
            <DialogDescription>
              Flag issues, suggest improvements, or request new features. We read every submission.
            </DialogDescription>
          </DialogHeader>

          {/* Quick type chips */}
          <div className="flex flex-wrap gap-2">
            {FEEDBACK_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFeedbackType(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  feedbackType === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="g-message">
                {feedbackType === "bug" ? "What went wrong?" :
                 feedbackType === "content_issue" ? "What's the issue with the content?" :
                 feedbackType === "feature_request" ? "What feature would you like?" :
                 "Your message"}
              </Label>
              <Textarea
                id="g-message"
                placeholder={
                  feedbackType === "bug" ? "Describe what happened and what you expected..." :
                  feedbackType === "content_issue" ? "Which question or content has an issue? What's wrong?" :
                  feedbackType === "feature_request" ? "Describe the feature you'd like to see..." :
                  "Tell us what's on your mind..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={2000}
                className="resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">
                  📍 Page: {location.pathname}
                </p>
                <p className="text-xs text-muted-foreground">{message.length}/2000</p>
              </div>
            </div>

            {/* Who's submitting */}
            {user ? (
              <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                <UserCircle2 className="h-4 w-4 text-primary" />
                <span>
                  Submitting as <strong className="text-foreground">@{username ?? "you"}</strong>
                  {" "}— no need to enter your email.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="g-name">Your name or username (optional)</Label>
                <Input
                  id="g-name"
                  type="text"
                  placeholder="e.g. Alex, or @alex123"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={60}
                />
              </div>
            )}

            {/* Swag entry — clearly separated */}
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 space-y-2">
              <button
                type="button"
                onClick={() => setWantsSwag((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Gift className="h-4 w-4 text-primary" />
                {wantsSwag ? "✓ Entered for swag review" : "Enter to qualify for swag 🎁"}
              </button>
              <p className="text-[11px] text-muted-foreground">
                Helpful, detailed reports may qualify for free AlphaOmega swag. Add an email so we can reach you if you win — separate from your account.
              </p>
              {wantsSwag && (
                <Input
                  id="g-swag-email"
                  type="email"
                  placeholder="email for swag delivery"
                  value={swagEmail}
                  onChange={(e) => setSwagEmail(e.target.value)}
                  maxLength={255}
                  className="bg-background"
                />
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !message.trim()}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
