import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComboState } from "@/hooks/useComboSystem";

interface ComboDisplayProps {
  combo: ComboState;
  message: string;
  intensity: "none" | "low" | "medium" | "high" | "ultra";
  className?: string;
}

const INTENSITY_CONFIG = {
  none: {
    bg: "bg-transparent",
    text: "text-muted-foreground",
    icon: null,
    shake: false,
    particles: 0,
    glow: "",
  },
  low: {
    bg: "bg-green-500/20",
    text: "text-green-500",
    icon: Zap,
    shake: false,
    particles: 3,
    glow: "",
  },
  medium: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-500",
    icon: Flame,
    shake: true,
    particles: 5,
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.4)]",
  },
  high: {
    bg: "bg-orange-500/20",
    text: "text-orange-500",
    icon: Star,
    shake: true,
    particles: 8,
    glow: "shadow-[0_0_25px_rgba(249,115,22,0.5)]",
  },
  ultra: {
    bg: "bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30",
    text: "text-red-500",
    icon: Crown,
    shake: true,
    particles: 12,
    glow: "shadow-[0_0_35px_rgba(239,68,68,0.6)]",
  },
};

// Particle burst effect
function ComboParticles({ count, intensity }: { count: number; intensity: string }) {
  if (count === 0) return null;
  
  const colors = {
    low: ["#22c55e", "#4ade80"],
    medium: ["#eab308", "#facc15"],
    high: ["#f97316", "#fb923c"],
    ultra: ["#ef4444", "#f97316", "#eab308"],
  };
  
  const particleColors = colors[intensity as keyof typeof colors] || colors.low;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: particleColors[i % particleColors.length],
            left: "50%",
            top: "50%",
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 80 - 20,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.03,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function ComboDisplay({ combo, message, intensity, className }: ComboDisplayProps) {
  const config = INTENSITY_CONFIG[intensity];
  const Icon = config.icon;
  
  return (
    <AnimatePresence mode="wait">
      {combo.count >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: combo.justIncreased ? [1, 1.2, 1] : 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className={cn(
            "relative flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold",
            config.bg,
            config.text,
            config.glow,
            config.shake && combo.justIncreased && "animate-combo-shake",
            className
          )}
        >
          {/* Particle burst on increase */}
          {combo.justIncreased && (
            <ComboParticles count={config.particles} intensity={intensity} />
          )}
          
          {/* Icon */}
          {Icon && (
            <motion.div
              animate={combo.justIncreased ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Icon className={cn("w-5 h-5", intensity === "ultra" && "animate-pulse")} />
            </motion.div>
          )}
          
          {/* Combo text */}
          <motion.span
            key={combo.count}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg tracking-wide"
          >
            {message}
          </motion.span>
          
          {/* Combo count badge for high combos */}
          {combo.count >= 5 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                "bg-primary text-primary-foreground"
              )}
            >
              {combo.count}
            </motion.span>
          )}
        </motion.div>
      )}
      
      {/* Combo break effect */}
      {combo.justBroke && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          exit={{ opacity: 0 }}
          className="text-red-500 font-bold text-lg"
        >
          💔 Combo Lost!
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Screen shake wrapper component
export function ScreenShakeWrapper({ 
  children, 
  shake,
  intensity = "medium" 
}: { 
  children: React.ReactNode; 
  shake: boolean;
  intensity?: "low" | "medium" | "high";
}) {
  const shakeClass = {
    low: "animate-shake-low",
    medium: "animate-shake-medium", 
    high: "animate-shake-high",
  };

  return (
    <motion.div
      className={cn(shake && shakeClass[intensity])}
    >
      {children}
    </motion.div>
  );
}
