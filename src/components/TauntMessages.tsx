import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const TAUNTS = [
  "Ready to lose? 😏",
  "Hope you studied! 📚",
  "This won't take long... 💀",
  "Good luck, you'll need it 🍀",
  "Let's gooo! 🔥",
  "May the best brain win 🧠",
  "No mercy today 😈",
  "Prepare to be destroyed 💥",
  "I've been practicing... ⚡",
  "You got this! Just kidding 😂",
];

interface TauntMessagesProps {
  onSendTaunt?: (message: string) => void;
  disabled?: boolean;
}

export const TauntMessages = ({ onSendTaunt, disabled }: TauntMessagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sentTaunt, setSentTaunt] = useState<string | null>(null);

  const handleSend = (taunt: string) => {
    setSentTaunt(taunt);
    onSendTaunt?.(taunt);
    setIsOpen(false);

    setTimeout(() => setSentTaunt(null), 3000);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Taunt
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-0 right-0 min-w-[200px] p-2 rounded-lg bg-popover border border-border shadow-lg z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">Send a taunt:</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid gap-1 max-h-48 overflow-y-auto">
              {TAUNTS.map((taunt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(taunt)}
                  className="text-left text-sm p-2 rounded hover:bg-muted transition-colors"
                >
                  {taunt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sent confirmation */}
      <AnimatePresence>
        {sentTaunt && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
          >
            Sent: {sentTaunt}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Display incoming taunts
export const TauntDisplay = ({
  message,
  playerName,
  onDismiss,
}: {
  message: string | null;
  playerName?: string;
  onDismiss?: () => void;
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={onDismiss}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
        >
          <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-destructive/20 to-primary/20 border border-border backdrop-blur-sm shadow-lg">
            <p className="text-lg font-bold text-center">{message}</p>
            {playerName && (
              <p className="text-xs text-muted-foreground text-center mt-1">— {playerName}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
