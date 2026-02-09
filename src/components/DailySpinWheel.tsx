import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift, Sparkles, Star, Zap, Trophy, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpinReward {
  id: string;
  name: string;
  icon: React.ReactNode;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  color: string;
}

const REWARDS: SpinReward[] = [
  { id: "xp_10", name: "+10 XP", icon: <Star className="w-6 h-6" />, rarity: "common", color: "text-yellow-500" },
  { id: "xp_25", name: "+25 XP", icon: <Star className="w-6 h-6" />, rarity: "common", color: "text-yellow-500" },
  { id: "xp_50", name: "+50 XP", icon: <Zap className="w-6 h-6" />, rarity: "uncommon", color: "text-blue-500" },
  { id: "xp_100", name: "+100 XP", icon: <Zap className="w-6 h-6" />, rarity: "rare", color: "text-purple-500" },
  { id: "streak_shield", name: "Streak Shield", icon: <Trophy className="w-6 h-6" />, rarity: "uncommon", color: "text-emerald-500" },
  { id: "double_xp", name: "2x XP (1hr)", icon: <Sparkles className="w-6 h-6" />, rarity: "rare", color: "text-amber-500" },
  { id: "mystery_box", name: "Mystery Box", icon: <Gift className="w-6 h-6" />, rarity: "rare", color: "text-pink-500" },
  { id: "legendary_frame", name: "Gold Frame", icon: <Crown className="w-6 h-6" />, rarity: "legendary", color: "text-yellow-400" },
];

const SPIN_KEY = "lastSpinDate";

export const useDailySpin = () => {
  const [canSpin, setCanSpin] = useState(false);
  const [timeUntilSpin, setTimeUntilSpin] = useState("");

  useEffect(() => {
    const checkSpinAvailability = () => {
      const lastSpin = localStorage.getItem(SPIN_KEY);
      if (!lastSpin) {
        setCanSpin(true);
        return;
      }

      const lastSpinDate = new Date(lastSpin);
      const now = new Date();
      const tomorrow = new Date(lastSpinDate);
      tomorrow.setHours(24, 0, 0, 0);

      if (now >= tomorrow) {
        setCanSpin(true);
      } else {
        setCanSpin(false);
        const diff = tomorrow.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilSpin(`${hours}h ${mins}m`);
      }
    };

    checkSpinAvailability();
    const interval = setInterval(checkSpinAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const markSpinUsed = () => {
    localStorage.setItem(SPIN_KEY, new Date().toISOString());
    setCanSpin(false);
  };

  return { canSpin, timeUntilSpin, markSpinUsed };
};

export const DailySpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState<SpinReward | null>(null);
  const { canSpin, timeUntilSpin, markSpinUsed } = useDailySpin();

  const spin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setReward(null);

    // Weighted random selection (common more likely)
    const weights = { common: 40, uncommon: 30, rare: 20, legendary: 10 };
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    let selectedRarity: SpinReward["rarity"] = "common";
    for (const [rarity, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) {
        selectedRarity = rarity as SpinReward["rarity"];
        break;
      }
    }

    const possibleRewards = REWARDS.filter((r) => r.rarity === selectedRarity);
    const selectedReward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];

    // Calculate rotation to land on reward
    const rewardIndex = REWARDS.findIndex((r) => r.id === selectedReward.id);
    const segmentAngle = 360 / REWARDS.length;
    const targetRotation = 360 * 5 + (360 - rewardIndex * segmentAngle - segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setReward(selectedReward);
      markSpinUsed();
    }, 4000);
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "rare": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "uncommon": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default: return "bg-gradient-to-r from-slate-500 to-slate-600";
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={canSpin ? "default" : "outline"}
        size="sm"
        className={`gap-2 ${canSpin ? "animate-pulse" : ""}`}
        disabled={!canSpin && !isOpen}
      >
        <Gift className="w-4 h-4" />
        {canSpin ? "Daily Spin!" : `Spin in ${timeUntilSpin}`}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Daily Spin Wheel
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            {/* Wheel */}
            <div className="relative w-64 h-64">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary" />
              </div>

              {/* Wheel */}
              <motion.div
                className="w-full h-full rounded-full border-4 border-primary overflow-hidden"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformOrigin: "center center" }}
              >
                {REWARDS.map((r, i) => {
                  const angle = (360 / REWARDS.length) * i;
                  return (
                    <div
                      key={r.id}
                      className={`absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center ${getRarityBg(r.rarity)}`}
                      style={{
                        transform: `rotate(${angle}deg) skewY(${90 - 360 / REWARDS.length}deg)`,
                        transformOrigin: "100% 100%",
                        left: 0,
                        top: 0,
                      }}
                    >
                      <span
                        className="text-white text-xs font-bold"
                        style={{
                          transform: `skewY(-${90 - 360 / REWARDS.length}deg) rotate(${180 / REWARDS.length}deg)`,
                        }}
                      >
                        {r.icon}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Spin Button / Result */}
            <AnimatePresence mode="wait">
              {reward ? (
                <motion.div
                  key="reward"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getRarityBg(reward.rarity)} text-white font-bold`}>
                    {reward.icon}
                    {reward.name}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 capitalize">
                    {reward.rarity} reward!
                  </p>
                  <Button onClick={() => setIsOpen(false)} className="mt-4">
                    Claim & Close
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="spin">
                  <Button
                    onClick={spin}
                    disabled={!canSpin || isSpinning}
                    size="lg"
                    className="gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {isSpinning ? "Spinning..." : canSpin ? "SPIN!" : `Come back in ${timeUntilSpin}`}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
