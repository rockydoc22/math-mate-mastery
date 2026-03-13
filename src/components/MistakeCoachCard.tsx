import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CoachFeedback } from "@/hooks/useMistakeCoach";

interface MistakeCoachCardProps {
  feedback: CoachFeedback | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function MistakeCoachCard({ feedback, onRetry, onDismiss, className }: MistakeCoachCardProps) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          className={cn(
            "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4",
            className,
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-sm font-bold text-foreground">{feedback.headline}</span>
          </div>

          {/* Body */}
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {feedback.body}
          </p>

          {/* Skill tag */}
          {feedback.pattern && (
            <div className="flex items-center gap-1.5 mb-3">
              <Lightbulb className="w-3 h-3 text-primary" />
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                Focus: {feedback.pattern.followUpSkill.replace(/_/g, " ")}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                className="text-xs h-7 gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                {feedback.retryPrompt.length > 30 ? "Try again with hint" : feedback.retryPrompt}
              </Button>
            )}
            {onDismiss && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
                className="text-xs h-7 text-muted-foreground"
              >
                Dismiss
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
