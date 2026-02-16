import { motion, AnimatePresence } from "framer-motion";
import { getPerfectStreakTitle } from "@/hooks/usePerfectStreak";

interface PerfectStreakDisplayProps {
  current: number;
  best: number;
  compact?: boolean;
}

export const PerfectStreakDisplay = ({ current, best, compact = false }: PerfectStreakDisplayProps) => {
  const title = getPerfectStreakTitle(current);
  const bestTitle = getPerfectStreakTitle(best);

  if (current === 0 && best === 0) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {current > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            🎯 {current} in a row
          </span>
        )}
        {best > 0 && current !== best && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            Best: {best}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          🎯 Perfect Streak
        </h4>
        {bestTitle && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
            Best: {bestTitle}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-emerald-600 dark:text-emerald-400"
          >
            {current}
          </motion.div>
        </AnimatePresence>
        <div>
          <p className="text-sm font-medium">consecutive correct</p>
          {title && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{title}</p>
          )}
        </div>
      </div>
    </div>
  );
};
