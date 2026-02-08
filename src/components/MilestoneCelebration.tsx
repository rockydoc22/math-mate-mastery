import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConfettiExplosion } from "./ConfettiExplosion";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { cn } from "@/lib/utils";

interface MilestoneCelebrationProps {
  milestone: string | null;
  icon?: string;
  subtext?: string;
  onComplete?: () => void;
}

const MILESTONE_CONFIG = {
  combo_5: { icon: "🔥", text: "5 IN A ROW!", subtext: "You're heating up!", color: "from-yellow-500 to-orange-500" },
  combo_10: { icon: "💥", text: "10 IN A ROW!", subtext: "UNSTOPPABLE!", color: "from-orange-500 to-red-500" },
  combo_15: { icon: "⚡", text: "15 STREAK!", subtext: "LEGENDARY!", color: "from-red-500 to-purple-500" },
  combo_20: { icon: "👑", text: "20 COMBO!", subtext: "GODLIKE!!!", color: "from-purple-500 to-pink-500" },
  streak_7: { icon: "🔥", text: "7 DAY STREAK!", subtext: "One week strong!", color: "from-orange-400 to-red-500" },
  streak_14: { icon: "⭐", text: "14 DAY STREAK!", subtext: "Two weeks! Incredible!", color: "from-yellow-400 to-orange-500" },
  streak_30: { icon: "🏆", text: "30 DAY STREAK!", subtext: "A whole month! Legend!", color: "from-primary to-accent" },
  perfect_score: { icon: "💯", text: "PERFECT SCORE!", subtext: "Flawless victory!", color: "from-green-400 to-emerald-500" },
  questions_100: { icon: "📚", text: "100 QUESTIONS!", subtext: "Knowledge is power!", color: "from-blue-400 to-indigo-500" },
  questions_500: { icon: "🎓", text: "500 QUESTIONS!", subtext: "Scholar status!", color: "from-indigo-400 to-purple-500" },
  questions_1000: { icon: "🧠", text: "1000 QUESTIONS!", subtext: "Big brain time!", color: "from-purple-400 to-pink-500" },
  level_up: { icon: "⬆️", text: "LEVEL UP!", subtext: "New challenges await!", color: "from-cyan-400 to-blue-500" },
};

export function MilestoneCelebration({ 
  milestone, 
  icon,
  subtext,
  onComplete 
}: MilestoneCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { playMilestone } = useSoundEffects();

  const config = milestone ? MILESTONE_CONFIG[milestone as keyof typeof MILESTONE_CONFIG] : null;
  const displayIcon = icon || config?.icon || "🎉";
  const displayText = config?.text || milestone;
  const displaySubtext = subtext || config?.subtext;
  const colorClass = config?.color || "from-primary to-accent";

  useEffect(() => {
    if (milestone) {
      setShowConfetti(true);
      playMilestone();
    }
  }, [milestone, playMilestone]);

  return (
    <>
      <ConfettiExplosion 
        active={showConfetti} 
        duration={2500}
        particleCount={80}
        onComplete={() => setShowConfetti(false)}
      />
      
      <AnimatePresence>
        {milestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
            onClick={onComplete}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [10, -5, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 12,
                stiffness: 200,
              }}
              className={cn(
                "relative p-8 rounded-2xl text-center",
                "bg-gradient-to-br shadow-2xl",
                colorClass
              )}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl" />
              
              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: 2,
                  repeatType: "reverse",
                }}
                className="relative text-6xl mb-4"
              >
                {displayIcon}
              </motion.div>
              
              {/* Main text */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative text-3xl md:text-4xl font-black text-white tracking-tight mb-2"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                {displayText}
              </motion.h2>
              
              {/* Subtext */}
              {displaySubtext && (
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative text-lg text-white/90 font-medium"
                >
                  {displaySubtext}
                </motion.p>
              )}
              
              {/* Tap to dismiss */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1 }}
                className="relative text-sm text-white/70 mt-4"
              >
                Tap to continue
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Compact inline milestone badge
export function MilestoneBadge({ text, icon = "🔥" }: { text: string; icon?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: -20 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold shadow-lg"
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}
