import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiExplosionProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  shape: "square" | "circle" | "triangle";
}

const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#FFD700", // Gold
  "#FF6B6B", // Coral
  "#4ECDC4", // Teal
  "#45B7D1", // Sky
  "#96E6A1", // Mint
  "#F7DC6F", // Yellow
];

export function ConfettiExplosion({
  active,
  duration = 2000,
  particleCount = 50,
  spread = 360,
  origin = { x: 0.5, y: 0.5 },
  colors = DEFAULT_COLORS,
  onComplete,
}: ConfettiExplosionProps) {
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      // Generate particles
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
        const angle = (Math.random() * spread * Math.PI) / 180 - (spread / 2) * (Math.PI / 180);
        const velocity = 8 + Math.random() * 12;
        
        return {
          id: i,
          x: origin.x * 100,
          y: origin.y * 100,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 8,
          velocityX: Math.cos(angle - Math.PI / 2) * velocity,
          velocityY: Math.sin(angle - Math.PI / 2) * velocity,
          rotationSpeed: (Math.random() - 0.5) * 20,
          shape: ["square", "circle", "triangle"][Math.floor(Math.random() * 3)] as Particle["shape"],
        };
      });

      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, particleCount, spread, origin, colors, duration, onComplete]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {particlesRef.current.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              scale: 0,
              rotate: particle.rotation,
              opacity: 1,
            }}
            animate={{
              left: `${particle.x + particle.velocityX * 10}%`,
              top: `${particle.y + particle.velocityY * 15 + 30}%`,
              scale: [0, 1, 1, 0.5],
              rotate: particle.rotation + particle.rotationSpeed * 20,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: duration / 1000,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: particle.shape === "circle" ? "50%" : particle.shape === "triangle" ? "0" : "2px",
              clipPath: particle.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Mini confetti for inline celebrations (correct answer burst)
export function MiniConfetti({ active, className }: { active: boolean; className?: string }) {
  if (!active) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
            left: "50%",
            top: "50%",
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 60 - 20,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.02,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
