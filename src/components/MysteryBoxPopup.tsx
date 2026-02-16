import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MysteryReward } from "@/hooks/useMysteryBox";

interface MysteryBoxPopupProps {
  reward: MysteryReward | null;
  onDismiss: () => void;
}

export const MysteryBoxPopup = ({ reward, onDismiss }: MysteryBoxPopupProps) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reward) {
      setRevealed(false);
      const timer = setTimeout(() => setRevealed(true), 800);
      return () => clearTimeout(timer);
    }
  }, [reward]);

  return (
    <AnimatePresence>
      {reward && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-card border-2 border-primary/50 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onDismiss}
            >
              <X className="w-4 h-4" />
            </Button>

            {!revealed ? (
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8 }}
              >
                <Gift className="w-24 h-24 mx-auto text-primary mb-4" />
                <p className="text-xl font-bold">Mystery Box!</p>
                <p className="text-sm text-muted-foreground">Opening...</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <div className="text-6xl mb-4">{reward.icon}</div>
                <h3 className="text-2xl font-bold mb-1">{reward.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  {reward.type === "title" && "🏷️ New Title"}
                  {reward.type === "xp_multiplier" && "⚡ XP Boost"}
                  {reward.type === "frame" && "🖼️ Profile Frame"}
                </div>
                <Button onClick={onDismiss} className="w-full">
                  Awesome!
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
