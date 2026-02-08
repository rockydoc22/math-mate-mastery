import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Zap, Flame, Shield, Clock, AlertTriangle, Target, Heart, Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import { FighterVisual } from "@/components/FighterVisual";
import { useFighterAvatar, type FighterAvatar, FIGHTER_BASE_TYPES } from "@/hooks/useFighterAvatar";

interface SATBossArenaProps {
  daysUntilExam: number;
  currentStreak: number;
  pendingReviewCount: number;
  totalQuestionsAnswered: number;
  recentCorrectAnswers: number;
  playerAvatar?: string;
  playerUsername?: string;
  lastPracticeDate?: string | null;
  fighterAvatar?: FighterAvatar;
  // New props for live battle feedback
  lastAnswerCorrect?: boolean | null;
  showBattleAnimation?: boolean;
}

// Calculate player HP based on streak and recent activity
function calculatePlayerHP(streak: number, recentCorrect: number, missedReviews: number): number {
  let hp = 40; // Base HP
  hp += Math.min(streak * 5, 30); // Streak bonus (max +30)
  hp += Math.min(recentCorrect * 2, 20); // Recent correct answers (max +20)
  hp -= Math.min(missedReviews, 20); // Penalty for missed reviews
  return Math.max(10, Math.min(100, hp)); // Clamp between 10-100
}

// Calculate SAT Boss HP based on progress
function calculateBossHP(daysLeft: number, questionsAnswered: number): number {
  const baseBossHP = 100;
  // Boss loses HP based on questions answered
  const damageDealt = Math.min(questionsAnswered * 0.05, 70); // Max 70% damage
  // Boss regains slight HP as exam approaches (pressure)
  const pressureBonus = daysLeft < 14 ? (14 - daysLeft) : 0;
  return Math.max(15, baseBossHP - damageDealt + pressureBonus);
}

// Get damage status based on streak
function getDamageStatus(streak: number): { text: string; color: string; multiplier: number } {
  if (streak >= 7) return { text: "RAGE MODE", color: "text-red-500", multiplier: 2.5 };
  if (streak >= 5) return { text: "COMBO x5", color: "text-orange-500", multiplier: 2.0 };
  if (streak >= 3) return { text: "COMBO x3", color: "text-yellow-500", multiplier: 1.5 };
  if (streak >= 1) return { text: "LOCKED IN", color: "text-green-500", multiplier: 1.0 };
  return { text: "IDLE", color: "text-muted-foreground", multiplier: 0 };
}

// Check if player missed practice
function didMissPractice(lastPracticeDate: string | null): boolean {
  if (!lastPracticeDate) return false;
  const last = new Date(lastPracticeDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays > 1;
}

export function SATBossArena({
  daysUntilExam,
  currentStreak,
  pendingReviewCount,
  totalQuestionsAnswered,
  recentCorrectAnswers,
  playerAvatar = "🧑‍🚀",
  playerUsername = "Fighter",
  lastPracticeDate,
  fighterAvatar,
  lastAnswerCorrect,
  showBattleAnimation,
}: SATBossArenaProps) {
  const { avatar: loadedAvatar } = useFighterAvatar();
  const actualFighterAvatar = fighterAvatar || loadedAvatar;
  const [showDamageFlash, setShowDamageFlash] = useState(false);
  const [bossShake, setBossShake] = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const [showPlayerDamage, setShowPlayerDamage] = useState(false);
  
  const playerHP = calculatePlayerHP(currentStreak, recentCorrectAnswers, pendingReviewCount);
  const bossHP = calculateBossHP(daysUntilExam, totalQuestionsAnswered);
  const damageStatus = getDamageStatus(currentStreak);
  const missedPractice = didMissPractice(lastPracticeDate);
  const isRedAlert = daysUntilExam <= 3;
  const isFinalWeeks = daysUntilExam <= 14;

  // Animate boss when taking damage (on mount with streak)
  useEffect(() => {
    if (currentStreak > 0 && totalQuestionsAnswered > 0) {
      setBossShake(true);
      setShowDamageFlash(true);
      setTimeout(() => {
        setBossShake(false);
        setShowDamageFlash(false);
      }, 600);
    }
  }, []);

  // Live battle animation when answering questions
  useEffect(() => {
    if (showBattleAnimation && lastAnswerCorrect !== null) {
      if (lastAnswerCorrect) {
        // Player attacks boss - boss takes damage
        setBossShake(true);
        setShowDamageFlash(true);
        setTimeout(() => {
          setBossShake(false);
          setShowDamageFlash(false);
        }, 500);
      } else {
        // Boss attacks player - player takes damage
        setBossAttacking(true);
        setTimeout(() => {
          setPlayerShake(true);
          setShowPlayerDamage(true);
          setBossAttacking(false);
        }, 300);
        setTimeout(() => {
          setPlayerShake(false);
          setShowPlayerDamage(false);
        }, 800);
      }
    }
  }, [showBattleAnimation, lastAnswerCorrect]);

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border-2 p-4",
      isRedAlert 
        ? "border-red-500/50 bg-gradient-to-br from-red-950/30 via-background to-red-900/20" 
        : "border-primary/30 bg-gradient-to-br from-slate-900/50 via-background to-primary/10"
    )}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full",
              isRedAlert ? "bg-red-500/30" : "bg-primary/20"
            )}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "100%",
              opacity: 0 
            }}
            animate={{ 
              y: "-20%",
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header - Days Countdown */}
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full font-mono font-bold text-sm",
          isRedAlert 
            ? "bg-red-500/20 text-red-400 animate-pulse" 
            : isFinalWeeks 
              ? "bg-orange-500/20 text-orange-400"
              : "bg-primary/20 text-primary"
        )}>
          <Clock className="w-4 h-4" />
          {daysUntilExam} DAYS REMAIN
        </div>
        
        {isRedAlert && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="flex items-center gap-1 text-red-500 text-xs font-bold"
          >
            <AlertTriangle className="w-4 h-4" />
            RED ALERT
          </motion.div>
        )}
      </div>

      {/* Battle Arena */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Player Side */}
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="relative"
            animate={
              playerShake 
                ? { x: [-5, 5, -5, 5, 0], opacity: [1, 0.5, 1] }
                : missedPractice 
                  ? { x: [-2, 2, -2, 0] } 
                  : {}
            }
            transition={{ duration: 0.3 }}
          >
            {/* Player Avatar - Use FighterVisual */}
            <FighterVisual 
              avatar={actualFighterAvatar} 
              size="md" 
              showAura={currentStreak >= 3}
              playerHP={playerHP}
            />
            
            {/* Damage indicator for player - on boss attack */}
            {showPlayerDamage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded font-bold"
              >
                -10 HP!
              </motion.div>
            )}
            
            {/* Damage indicator for player - missed practice */}
            {missedPractice && !showPlayerDamage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[8px] px-1 rounded font-bold"
              >
                HIT!
              </motion.div>
            )}
          </motion.div>
          
          {/* Player name and HP */}
          <p className="text-xs font-medium mt-2 truncate max-w-[80px]">{playerUsername}</p>
          
          {/* HP Bar */}
          <div className="w-full mt-1">
            <div className="flex items-center gap-1 mb-0.5">
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-[10px] text-muted-foreground">{Math.round(playerHP)}%</span>
            </div>
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  playerHP < 30 ? "bg-red-500" : playerHP < 60 ? "bg-yellow-500" : "bg-green-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${playerHP}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* VS Indicator */}
        <div className="flex flex-col items-center gap-1">
          <Swords className={cn(
            "w-6 h-6",
            showDamageFlash ? "text-yellow-500" : "text-muted-foreground"
          )} />
          <AnimatePresence>
            {showDamageFlash && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-yellow-500 font-bold text-xs"
              >
                DMG!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Boss Side */}
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="relative"
            animate={
              bossAttacking 
                ? { x: [-20, 0], scale: [1.1, 1] }
                : bossShake 
                  ? { x: [-3, 3, -3, 3, 0], rotate: [-2, 2, -2, 2, 0] } 
                  : {}
            }
            transition={{ duration: bossAttacking ? 0.3 : 0.4 }}
          >
            {/* Boss Avatar */}
            <div className={cn(
              "w-20 h-20 rounded-xl flex items-center justify-center relative",
              "bg-gradient-to-br from-red-900/40 to-purple-900/40 border-2 border-red-500/50",
              "shadow-[0_0_25px_rgba(239,68,68,0.3)]"
            )}>
              {/* Boss face - cracked clock/scantron aesthetic */}
              <div className="relative">
                <Skull className="w-10 h-10 text-red-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Skull className="w-10 h-10 text-red-400 blur-sm" />
                </motion.div>
              </div>
              
              {/* Crack overlay when damaged */}
              {bossHP < 70 && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 80 80">
                    <path
                      d="M20 10 L25 30 L15 35 L30 50 L20 70"
                      stroke="rgba(239,68,68,0.5)"
                      strokeWidth="1"
                      fill="none"
                    />
                    {bossHP < 50 && (
                      <path
                        d="M60 15 L55 40 L65 45 L50 65"
                        stroke="rgba(239,68,68,0.4)"
                        strokeWidth="1"
                        fill="none"
                      />
                    )}
                  </svg>
                </div>
              )}
            </div>
            
            {/* Boss nameplate */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-red-300 whitespace-nowrap">
              FINAL BOSS
            </div>
          </motion.div>
          
          <p className="text-xs font-bold text-red-400 mt-4">SAT</p>
          
          {/* Boss HP Bar */}
          <div className="w-full mt-1">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <span className="text-[10px] text-red-400">{Math.round(bossHP)}%</span>
              <Shield className="w-3 h-3 text-red-500" />
            </div>
            <div className="h-2 bg-red-950/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${bossHP}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs">
        {/* Buffs */}
        <div className="flex items-center gap-2">
          {currentStreak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange-500/20 text-orange-400"
            >
              <Flame className="w-3 h-3" />
              <span className="font-mono font-bold">{currentStreak}🔥</span>
            </motion.div>
          )}
          
          {damageStatus.multiplier > 1 && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className={cn("font-bold", damageStatus.color)}
            >
              {damageStatus.text}
            </motion.span>
          )}
        </div>
        
        {/* Debuffs */}
        {pendingReviewCount > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 text-red-400">
            <Target className="w-3 h-3" />
            <span className="text-[10px]">{pendingReviewCount} missed</span>
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <p className={cn(
          "text-[10px] font-medium tracking-wide uppercase",
          isRedAlert ? "text-red-400" : "text-muted-foreground"
        )}>
          {missedPractice 
            ? "MISSED PRACTICE • SAT ATTACKS" 
            : currentStreak >= 5 
              ? "CONSISTENCY IS DAMAGE" 
              : currentStreak >= 1 
                ? "YOU CONTROL THE DAMAGE"
                : "THE TEST NEVER ATTACKS FIRST"
          }
        </p>
      </div>
    </div>
  );
}
