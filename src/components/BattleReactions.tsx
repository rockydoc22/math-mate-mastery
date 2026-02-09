import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Reaction {
  id: string;
  emoji: string;
  label: string;
}

const REACTIONS: Reaction[] = [
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "skull", emoji: "💀", label: "Dead" },
  { id: "angry", emoji: "😤", label: "Angry" },
  { id: "laugh", emoji: "😂", label: "Laugh" },
  { id: "shock", emoji: "😱", label: "Shock" },
  { id: "cool", emoji: "😎", label: "Cool" },
  { id: "sweat", emoji: "😅", label: "Nervous" },
  { id: "clap", emoji: "👏", label: "Clap" },
];

interface BattleReactionsProps {
  onReact?: (reaction: Reaction) => void;
  disabled?: boolean;
}

export const BattleReactions = ({ onReact, disabled }: BattleReactionsProps) => {
  const [cooldown, setCooldown] = useState(false);
  const [sentReaction, setSentReaction] = useState<Reaction | null>(null);

  const handleReact = (reaction: Reaction) => {
    if (cooldown || disabled) return;

    setCooldown(true);
    setSentReaction(reaction);
    onReact?.(reaction);

    setTimeout(() => {
      setCooldown(false);
      setSentReaction(null);
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Reaction buttons */}
      <div className="flex gap-1 flex-wrap justify-center">
        {REACTIONS.map((reaction) => (
          <Button
            key={reaction.id}
            variant="ghost"
            size="sm"
            onClick={() => handleReact(reaction)}
            disabled={cooldown || disabled}
            className="w-9 h-9 p-0 text-lg hover:scale-125 transition-transform"
          >
            {reaction.emoji}
          </Button>
        ))}
      </div>

      {/* Sent reaction animation */}
      <AnimatePresence>
        {sentReaction && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1.5, y: -50 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 text-4xl pointer-events-none"
          >
            {sentReaction.emoji}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Display incoming reactions from opponents
interface ReactionDisplayProps {
  reaction: Reaction | null;
  playerName?: string;
}

export const ReactionDisplay = ({ reaction, playerName }: ReactionDisplayProps) => {
  return (
    <AnimatePresence>
      {reaction && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/80 backdrop-blur-sm border border-border"
        >
          <span className="text-2xl">{reaction.emoji}</span>
          {playerName && (
            <span className="text-xs text-muted-foreground">{playerName}</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
