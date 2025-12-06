import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingChangePopupProps {
  show: boolean;
  change: number;
  newRating: number;
  onComplete?: () => void;
}

export function RatingChangePopup({ 
  show, 
  change, 
  newRating,
  onComplete 
}: RatingChangePopupProps) {
  const isPositive = change >= 0;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-24 right-4 z-50 rounded-xl px-4 py-3 shadow-lg border",
            isPositive 
              ? "bg-green-500/20 border-green-500/40" 
              : "bg-red-500/20 border-red-500/40"
          )}
        >
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <div>
              <div className={cn(
                "font-bold text-lg",
                isPositive ? "text-green-400" : "text-red-400"
              )}>
                {isPositive ? '+' : ''}{change}
              </div>
              <div className="text-xs text-muted-foreground">
                Rating: {newRating}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
