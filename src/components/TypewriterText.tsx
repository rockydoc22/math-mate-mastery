import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
  wordByWord?: boolean;
}

export function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  className,
  onComplete,
  cursor = true,
  wordByWord = false,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      if (wordByWord) {
        // Word by word animation
        const words = text.split(" ");
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex < words.length) {
            setDisplayedText(words.slice(0, currentIndex + 1).join(" "));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            onComplete?.();
          }
        }, speed * 4);
        
        return () => clearInterval(interval);
      } else {
        // Character by character animation
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            onComplete?.();
          }
        }, speed);
        
        return () => clearInterval(interval);
      }
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, wordByWord, onComplete]);

  return (
    <span className={cn("inline", className)}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

// Animated text reveal - each word fades in
export function WordReveal({
  text,
  delay = 0,
  staggerDelay = 0.1,
  className,
}: {
  text: string;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * staggerDelay,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Dramatic headline reveal
export function DramaticHeadline({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 200 }}
      className={cn(
        "flex items-center justify-center gap-3 text-2xl md:text-4xl font-black",
        "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
        "drop-shadow-lg",
        className
      )}
    >
      {icon && <span className="text-3xl md:text-5xl animate-bounce">{icon}</span>}
      <span>{text}</span>
    </motion.div>
  );
}
