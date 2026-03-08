import { motion } from "framer-motion";

interface Props {
  onRate: (level: "high" | "medium" | "low") => void;
}

const levels = [
  { key: "high" as const, label: "😎 High", desc: "I'm sure", color: "bg-success/20 border-success text-success hover:bg-success/30" },
  { key: "medium" as const, label: "🤔 Medium", desc: "Somewhat sure", color: "bg-orange-400/20 border-orange-400 text-orange-500 hover:bg-orange-400/30" },
  { key: "low" as const, label: "😰 Low", desc: "Guessing", color: "bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30" },
];

export const ConfidenceRating = ({ onRate }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <p className="text-sm font-semibold text-foreground text-center">How confident are you?</p>
      <div className="flex gap-2 justify-center">
        {levels.map(l => (
          <button
            key={l.key}
            onClick={() => onRate(l.key)}
            className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all ${l.color}`}
          >
            <span className="text-lg font-bold">{l.label}</span>
            <span className="text-xs opacity-80">{l.desc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
