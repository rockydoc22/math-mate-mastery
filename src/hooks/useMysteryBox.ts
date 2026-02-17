import { useState, useCallback, useEffect } from "react";

const MYSTERY_BOX_COUNTER_KEY = "sat_mystery_box_counter";
const MYSTERY_BOX_INTERVAL = 15; // Every 15 questions

export interface MysteryReward {
  type: "xp_multiplier" | "title" | "frame";
  name: string;
  icon: string;
  description: string;
  value: string;
}

const REWARD_POOL: MysteryReward[] = [
  { type: "title", name: "Night Owl", icon: "🦉", description: "Study at midnight? This one's for you.", value: "night_owl" },
  { type: "title", name: "Speed Demon", icon: "⚡", description: "Lightning fast answers.", value: "speed_demon" },
  { type: "title", name: "Brain Surgeon", icon: "🧠", description: "Precision under pressure.", value: "brain_surgeon" },
  { type: "title", name: "Math Wizard", icon: "🧙", description: "Numbers fear you.", value: "math_wizard" },
  { type: "title", name: "Word Smith", icon: "✍️", description: "English is your domain.", value: "word_smith" },
  { type: "title", name: "Iron Will", icon: "🛡️", description: "Nothing stops your grind.", value: "iron_will" },
  { type: "xp_multiplier", name: "Double XP", icon: "⭐", description: "Your next quiz counts double!", value: "2x" },
  { type: "xp_multiplier", name: "1.5x XP Boost", icon: "🚀", description: "50% bonus on your next quiz!", value: "1.5x" },
  { type: "frame", name: "Golden Frame", icon: "🖼️", description: "A golden profile frame.", value: "gold" },
  { type: "frame", name: "Fire Frame", icon: "🔥", description: "Your profile is on fire.", value: "fire" },
  { type: "frame", name: "Diamond Frame", icon: "💎", description: "Rare and prestigious.", value: "diamond" },
  { type: "frame", name: "Neon Frame", icon: "💜", description: "Stand out in style.", value: "neon" },
];

const EARNED_REWARDS_KEY = "sat_mystery_rewards";

export function getEarnedRewards(): MysteryReward[] {
  try {
    const stored = localStorage.getItem(EARNED_REWARDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReward(reward: MysteryReward) {
  const current = getEarnedRewards();
  // Don't add duplicates
  if (!current.find(r => r.value === reward.value && r.type === reward.type)) {
    current.push(reward);
    localStorage.setItem(EARNED_REWARDS_KEY, JSON.stringify(current));
  }
}

export function useMysteryBox() {
  const [counter, setCounter] = useState(0);
  const [pendingReward, setPendingReward] = useState<MysteryReward | null>(null);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(MYSTERY_BOX_COUNTER_KEY) || "0", 10);
      setCounter(stored);
    } catch {
      setCounter(0);
    }
  }, []);

  const recordQuestion = useCallback(() => {
    setCounter(prev => {
      const next = prev + 1;
      localStorage.setItem(MYSTERY_BOX_COUNTER_KEY, String(next));
      
      if (next >= MYSTERY_BOX_INTERVAL && next % MYSTERY_BOX_INTERVAL === 0) {
        // Award a random reward, preferring ones not yet earned
        const earned = getEarnedRewards();
        const unearnedPool = REWARD_POOL.filter(
          r => !earned.find(e => e.value === r.value && e.type === r.type)
        );
        const pool = unearnedPool.length > 0 ? unearnedPool : REWARD_POOL;
        const reward = pool[Math.floor(Math.random() * pool.length)];
        saveReward(reward);
        setPendingReward(reward);
      }
      return next;
    });
  }, []);

  const dismissReward = useCallback(() => {
    setPendingReward(null);
  }, []);

  const questionsUntilBox = MYSTERY_BOX_INTERVAL - (counter % MYSTERY_BOX_INTERVAL);

  return { counter, questionsUntilBox, pendingReward, recordQuestion, dismissReward };
}
