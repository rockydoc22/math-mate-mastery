import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  type FighterAvatar,
  FIGHTER_BASE_TYPES,
  WEAPONS,
  SCARS,
  HELMETS,
  AURAS,
} from "@/hooks/useFighterAvatar";

interface FighterVisualProps {
  avatar: FighterAvatar;
  size?: "sm" | "md" | "lg";
  showAura?: boolean;
  animate?: boolean;
  className?: string;
  playerHP?: number;
}

export function FighterVisual({ 
  avatar, 
  size = "md", 
  showAura = false, 
  animate = false,
  className,
  playerHP,
}: FighterVisualProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };
  
  const emojiSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };
  
  const overlaySize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl",
  };

  const baseType = FIGHTER_BASE_TYPES[avatar.base_type];
  const auraColor = avatar.aura_color ? AURAS[avatar.aura_color].color : null;
  
  // Determine border color based on HP
  const getBorderStyle = () => {
    if (playerHP !== undefined) {
      if (playerHP < 30) return "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      if (playerHP > 70) return "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
    }
    return "border-primary/50";
  };

  return (
    <motion.div
      className={cn("relative", className)}
      animate={animate ? { y: [0, -3, 0] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {/* Aura effect */}
      {showAura && auraColor && (
        <motion.div
          className={cn("absolute inset-0 rounded-xl", sizeClasses[size])}
          style={{ 
            boxShadow: `0 0 25px ${auraColor}66, 0 0 50px ${auraColor}33`,
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Main avatar container */}
      <div className={cn(
        "relative rounded-xl flex items-center justify-center",
        "bg-gradient-to-br from-primary/20 to-accent/20 border-2",
        sizeClasses[size],
        getBorderStyle(),
      )}>
        {/* Base emoji */}
        <span className={cn(emojiSizes[size], "filter drop-shadow-lg z-10")}>
          {baseType.emoji}
        </span>
        
        {/* Helmet overlay */}
        {avatar.helmet_style && HELMETS[avatar.helmet_style] && (
          <span className={cn(
            "absolute -top-1 left-1/2 -translate-x-1/2 z-20",
            overlaySize[size]
          )}>
            {HELMETS[avatar.helmet_style].emoji}
          </span>
        )}
        
        {/* Scar overlay */}
        {avatar.scar_overlay && SCARS[avatar.scar_overlay] && (
          <motion.span 
            className={cn(
              "absolute -top-1 -right-1 z-20",
              overlaySize[size]
            )}
            animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {SCARS[avatar.scar_overlay].emoji}
          </motion.span>
        )}
        
        {/* Weapon */}
        {avatar.weapon && WEAPONS[avatar.weapon] && (
          <motion.span 
            className={cn(
              "absolute -bottom-1 -right-1 z-20",
              overlaySize[size]
            )}
            animate={animate ? { rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {WEAPONS[avatar.weapon].emoji}
          </motion.span>
        )}
        
        {/* Low HP warning pulse */}
        {playerHP !== undefined && playerHP < 30 && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-red-500"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
