import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementToastProps {
  icon: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

// Simple confetti particles
const ConfettiParticle = ({ delay }: { delay: number }) => {
  const colors = ["#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#a78bfa"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * 200 - 100;
  const rotation = Math.random() * 720 - 360;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ backgroundColor: color, top: "50%", left: "50%" }}
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={{
        opacity: 0,
        x,
        y: Math.random() * -150 - 50,
        rotate: rotation,
        scale: 0.5,
      }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
};

export const AchievementToast = ({ icon, name, isOpen, onClose }: AchievementToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-8 left-1/2 z-[100] -translate-x-1/2"
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="relative">
            {/* Confetti */}
            {Array.from({ length: 20 }).map((_, i) => (
              <ConfettiParticle key={i} delay={i * 0.05} />
            ))}

            <div className="bg-card border-2 border-amber-500/50 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3">
              <span className="text-4xl animate-bounce">{icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Achievement Unlocked!</p>
                <p className="font-bold text-lg">{name}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
