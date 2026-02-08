import { useState, useCallback, useRef } from "react";

export interface ComboState {
  count: number;
  isActive: boolean;
  justIncreased: boolean;
  justBroke: boolean;
  maxCombo: number;
}

const COMBO_MESSAGES = [
  "", // 0
  "Nice!", // 1
  "Good!", // 2
  "Great!", // 3
  "Awesome!", // 4
  "COMBO x5!", // 5
  "COMBO x6!", // 6
  "ON FIRE! 🔥", // 7
  "UNSTOPPABLE! 🔥", // 8
  "LEGENDARY! 🔥", // 9
  "GODLIKE! 💥", // 10+
];

export function useComboSystem() {
  const [combo, setCombo] = useState<ComboState>({
    count: 0,
    isActive: false,
    justIncreased: false,
    justBroke: false,
    maxCombo: 0,
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const registerCorrect = useCallback(() => {
    // Clear any pending reset
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setCombo((prev) => {
      const newCount = prev.count + 1;
      return {
        count: newCount,
        isActive: true,
        justIncreased: true,
        justBroke: false,
        maxCombo: Math.max(prev.maxCombo, newCount),
      };
    });

    // Reset justIncreased flag after animation
    timeoutRef.current = setTimeout(() => {
      setCombo((prev) => ({ ...prev, justIncreased: false }));
    }, 600);
  }, []);

  const registerIncorrect = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCombo((prev) => {
      if (prev.count === 0) {
        return prev; // No combo to break
      }
      return {
        ...prev,
        count: 0,
        isActive: false,
        justIncreased: false,
        justBroke: true,
      };
    });

    // Reset justBroke flag after animation
    timeoutRef.current = setTimeout(() => {
      setCombo((prev) => ({ ...prev, justBroke: false }));
    }, 800);
  }, []);

  const resetCombo = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCombo({
      count: 0,
      isActive: false,
      justIncreased: false,
      justBroke: false,
      maxCombo: 0,
    });
  }, []);

  const getComboMessage = useCallback((count: number): string => {
    if (count >= 10) return COMBO_MESSAGES[10];
    return COMBO_MESSAGES[count] || "";
  }, []);

  const getComboIntensity = useCallback((count: number): "none" | "low" | "medium" | "high" | "ultra" => {
    if (count >= 10) return "ultra";
    if (count >= 7) return "high";
    if (count >= 5) return "medium";
    if (count >= 3) return "low";
    return "none";
  }, []);

  return {
    combo,
    registerCorrect,
    registerIncorrect,
    resetCombo,
    getComboMessage,
    getComboIntensity,
  };
}
