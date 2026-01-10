import { Crown, Skull } from "lucide-react";
import { motion } from "framer-motion";

interface Fighter {
  username: string;
  avatar_emoji: string;
  score: number;
  answersCorrect: number;
  totalQuestions: number;
  isWinner: boolean;
  isEliminated?: boolean;
}

interface BattleResultsFighterProps {
  fighters: Fighter[];
  battleMode: string;
}

export const BattleResultsFighter = ({ fighters, battleMode }: BattleResultsFighterProps) => {
  const winner = fighters.find(f => f.isWinner);
  const losers = fighters.filter(f => !f.isWinner);
  
  // Calculate damage level based on missed questions (0-1 scale)
  const getDamageLevel = (correct: number, total: number) => {
    const missed = total - correct;
    return Math.min(missed / total, 1);
  };

  const getWinnerState = (fighter: Fighter) => {
    const damage = getDamageLevel(fighter.answersCorrect, fighter.totalQuestions);
    if (damage === 0) return "perfect"; // No damage
    if (damage < 0.3) return "light"; // Light scratches
    if (damage < 0.5) return "moderate"; // Bruised
    return "heavy"; // Bloodied
  };

  const getLoserState = (fighter: Fighter) => {
    const damage = getDamageLevel(fighter.answersCorrect, fighter.totalQuestions);
    if (fighter.isEliminated) return "eliminated";
    if (damage < 0.3) return "knocked";
    if (damage < 0.6) return "beaten";
    return "destroyed";
  };

  return (
    <div className="relative py-8 px-4">
      {/* Ring/Arena Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 via-background to-destructive/20 rounded-xl" />
      
      <div className="relative z-10">
        {/* Title */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-black text-destructive uppercase tracking-wider">
            {battleMode === "sudden_death" ? "💀 SUDDEN DEATH 💀" : "🥊 FIGHT OVER 🥊"}
          </h2>
        </motion.div>

        {/* Winner - Standing Victorious */}
        {winner && (
          <motion.div 
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <div className="relative">
              {/* Crown */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <Crown className="w-12 h-12 text-yellow-500 drop-shadow-lg" />
              </motion.div>
              
              {/* Fighter Avatar */}
              <div className={`relative text-8xl p-4 rounded-full border-4 ${
                getWinnerState(winner) === "perfect" 
                  ? "border-yellow-500 bg-yellow-500/20" 
                  : getWinnerState(winner) === "light"
                    ? "border-yellow-500/80 bg-yellow-500/10"
                    : getWinnerState(winner) === "moderate"
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-red-500 bg-red-500/10"
              }`}>
                <span className="filter drop-shadow-xl">{winner.avatar_emoji || "🥊"}</span>
                
                {/* Damage indicators */}
                {getWinnerState(winner) === "moderate" && (
                  <span className="absolute -top-1 -right-1 text-2xl">🩹</span>
                )}
                {getWinnerState(winner) === "heavy" && (
                  <>
                    <span className="absolute -top-1 -right-1 text-2xl">🩸</span>
                    <span className="absolute -bottom-1 -left-1 text-xl">🩹</span>
                  </>
                )}
              </div>
              
              {/* Victory pose lines */}
              <motion.div 
                className="absolute -left-8 top-1/2 text-4xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                ✊
              </motion.div>
              <motion.div 
                className="absolute -right-8 top-1/2 text-4xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                ✊
              </motion.div>
            </div>
            
            {/* Winner Name & Score */}
            <motion.div 
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-2xl font-black text-yellow-500">{winner.username}</p>
              <p className="text-lg font-bold text-primary">{winner.score} pts</p>
              <p className="text-sm text-muted-foreground">
                {winner.answersCorrect}/{winner.totalQuestions} correct
                {getWinnerState(winner) === "perfect" && " 🎯 FLAWLESS!"}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Losers - On the ground */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {losers.map((loser, idx) => {
            const state = getLoserState(loser);
            return (
              <motion.div
                key={idx}
                className="flex flex-col items-center p-4"
                initial={{ opacity: 0, rotate: idx % 2 === 0 ? -15 : 15 }}
                animate={{ opacity: 1, rotate: idx % 2 === 0 ? -8 : 8 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                <div className={`relative text-5xl p-2 rounded-full ${
                  state === "eliminated" 
                    ? "bg-destructive/30 grayscale" 
                    : state === "destroyed"
                      ? "bg-red-500/20"
                      : state === "beaten"
                        ? "bg-orange-500/20"
                        : "bg-muted"
                }`}>
                  <span className={state === "eliminated" ? "opacity-50" : ""}>{loser.avatar_emoji || "😵"}</span>
                  
                  {/* Damage indicators for losers */}
                  {state === "eliminated" && (
                    <Skull className="absolute -top-2 -right-2 w-6 h-6 text-destructive" />
                  )}
                  {state === "destroyed" && (
                    <>
                      <span className="absolute -top-1 -right-1 text-lg">🩸</span>
                      <span className="absolute -bottom-1 -right-1 text-lg">🦷</span>
                    </>
                  )}
                  {state === "beaten" && (
                    <span className="absolute -top-1 -right-1 text-lg">🩸</span>
                  )}
                  {state === "knocked" && (
                    <span className="absolute -top-1 right-0 text-sm">💫</span>
                  )}
                </div>
                
                <p className={`text-sm font-medium mt-2 ${
                  state === "eliminated" ? "line-through text-muted-foreground" : "text-foreground"
                }`}>
                  {loser.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {loser.answersCorrect}/{loser.totalQuestions}
                  {state === "eliminated" && " (KO'd)"}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floor effect */}
        <div className="mt-6 h-2 bg-gradient-to-r from-transparent via-muted to-transparent rounded-full" />
      </div>
    </div>
  );
};
