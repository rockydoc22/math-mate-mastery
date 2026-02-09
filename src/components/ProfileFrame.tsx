import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface FrameStyle {
  id: string;
  name: string;
  className: string;
  unlockRequirement?: string;
}

export const PROFILE_FRAMES: FrameStyle[] = [
  { id: "none", name: "None", className: "" },
  { id: "basic", name: "Basic", className: "ring-2 ring-border" },
  { id: "bronze", name: "Bronze", className: "ring-2 ring-amber-600 shadow-lg shadow-amber-600/20" },
  { id: "silver", name: "Silver", className: "ring-2 ring-slate-400 shadow-lg shadow-slate-400/30" },
  { id: "gold", name: "Gold", className: "ring-3 ring-yellow-500 shadow-lg shadow-yellow-500/40", unlockRequirement: "Answer 500 questions" },
  { id: "platinum", name: "Platinum", className: "ring-3 ring-cyan-400 shadow-xl shadow-cyan-400/40", unlockRequirement: "Answer 2000 questions" },
  { id: "diamond", name: "Diamond", className: "ring-4 ring-blue-400 shadow-xl shadow-blue-400/50 animate-pulse", unlockRequirement: "Answer 5000 questions" },
  { id: "rainbow", name: "Rainbow", className: "ring-4 ring-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-padding p-[3px]", unlockRequirement: "Win 50 battles" },
  { id: "fire", name: "Fire", className: "ring-4 ring-orange-500 shadow-xl shadow-orange-500/60 animate-pulse", unlockRequirement: "30-day streak" },
  { id: "legendary", name: "Legendary", className: "ring-4 ring-purple-500 shadow-2xl shadow-purple-500/70", unlockRequirement: "Reach SAT Legend rank" },
];

const FRAME_KEY = "profileFrame";

export const useProfileFrame = () => {
  const [selectedFrame, setSelectedFrame] = useState<string>("none");

  useEffect(() => {
    const saved = localStorage.getItem(FRAME_KEY);
    if (saved) setSelectedFrame(saved);
  }, []);

  const selectFrame = (frameId: string) => {
    localStorage.setItem(FRAME_KEY, frameId);
    setSelectedFrame(frameId);
  };

  const getFrame = () => PROFILE_FRAMES.find((f) => f.id === selectedFrame) || PROFILE_FRAMES[0];

  return { selectedFrame, selectFrame, getFrame };
};

interface ProfileAvatarProps {
  emoji?: string;
  size?: "sm" | "md" | "lg" | "xl";
  frameId?: string;
  className?: string;
}

export const ProfileAvatar = ({
  emoji = "😀",
  size = "md",
  frameId,
  className,
}: ProfileAvatarProps) => {
  const { getFrame } = useProfileFrame();
  const frame = frameId
    ? PROFILE_FRAMES.find((f) => f.id === frameId) || PROFILE_FRAMES[0]
    : getFrame();

  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
    xl: "w-24 h-24 text-5xl",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-muted flex items-center justify-center",
        sizeClasses[size],
        frame.className,
        className
      )}
    >
      <span>{emoji}</span>
    </div>
  );
};

interface FrameSelectorProps {
  unlockedFrames?: string[];
  onSelect?: (frameId: string) => void;
}

export const FrameSelector = ({
  unlockedFrames = ["none", "basic", "bronze", "silver"],
  onSelect,
}: FrameSelectorProps) => {
  const { selectedFrame, selectFrame } = useProfileFrame();

  const handleSelect = (frameId: string) => {
    selectFrame(frameId);
    onSelect?.(frameId);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Profile Frame</h3>
      <div className="grid grid-cols-5 gap-3">
        {PROFILE_FRAMES.map((frame) => {
          const isUnlocked = unlockedFrames.includes(frame.id);
          return (
            <button
              key={frame.id}
              onClick={() => isUnlocked && handleSelect(frame.id)}
              disabled={!isUnlocked}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2 rounded-lg border transition-all",
                selectedFrame === frame.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground",
                !isUnlocked && "opacity-50 cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg",
                  frame.className
                )}
              >
                😀
              </div>
              <span className="text-[10px] text-muted-foreground truncate max-w-full">
                {frame.name}
              </span>
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <span className="text-xs">🔒</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
