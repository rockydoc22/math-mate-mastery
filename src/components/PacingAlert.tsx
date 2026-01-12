import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACING } from "@/utils/topicMastery";

interface PacingAlertProps {
  startTime: number;
  onSkip?: () => void;
  isVisible: boolean;
  warningThresholdMs?: number;
  dangerThresholdMs?: number;
}

export const PacingAlert = ({ 
  startTime, 
  onSkip, 
  isVisible,
  warningThresholdMs = PACING.WARNING_THRESHOLD_MS,
  dangerThresholdMs = PACING.DANGER_THRESHOLD_MS,
}: PacingAlertProps) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [alertLevel, setAlertLevel] = useState<'none' | 'warning' | 'danger'>('none');

  useEffect(() => {
    if (!isVisible) {
      setElapsedMs(0);
      setAlertLevel('none');
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedMs(elapsed);

      if (elapsed >= dangerThresholdMs) {
        setAlertLevel('danger');
      } else if (elapsed >= warningThresholdMs) {
        setAlertLevel('warning');
      } else {
        setAlertLevel('none');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isVisible, warningThresholdMs, dangerThresholdMs]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {alertLevel !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            fixed top-4 left-1/2 -translate-x-1/2 z-50 
            px-4 py-2 rounded-lg shadow-lg border-2
            flex items-center gap-3
            ${alertLevel === 'danger' 
              ? 'bg-destructive/90 border-destructive text-destructive-foreground' 
              : 'bg-orange-500/90 border-orange-500 text-white'
            }
          `}
        >
          <Clock className="w-4 h-4 animate-pulse" />
          <div className="text-sm">
            {alertLevel === 'danger' ? (
              <span className="font-semibold">⚠️ {Math.floor(elapsedMs / 1000)}s - Consider skipping!</span>
            ) : (
              <span>{Math.floor(elapsedMs / 1000)}s - Don't get stuck!</span>
            )}
          </div>
          {onSkip && (
            <Button
              size="sm"
              variant="secondary"
              onClick={onSkip}
              className="h-7 px-2 text-xs"
            >
              <SkipForward className="w-3 h-3 mr-1" />
              Skip
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
