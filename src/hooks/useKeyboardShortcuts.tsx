import { useEffect, useCallback } from "react";

interface KeyboardShortcutsOptions {
  onAnswer?: (index: number) => void; // A=0, B=1, C=2, D=3
  onContinue?: () => void; // Space or Enter
  onSkip?: () => void; // S key
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onAnswer,
  onContinue,
  onSkip,
  enabled = true,
}: KeyboardShortcutsOptions) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Answer shortcuts: A, B, C, D or 1, 2, 3, 4
      if (onAnswer) {
        if (key === "a" || key === "1") {
          e.preventDefault();
          onAnswer(0);
        } else if (key === "b" || key === "2") {
          e.preventDefault();
          onAnswer(1);
        } else if (key === "c" || key === "3") {
          e.preventDefault();
          onAnswer(2);
        } else if (key === "d" || key === "4") {
          e.preventDefault();
          onAnswer(3);
        }
      }

      // Continue: Space or Enter
      if (onContinue && (key === " " || key === "enter")) {
        e.preventDefault();
        onContinue();
      }

      // Skip: S key
      if (onSkip && key === "s") {
        e.preventDefault();
        onSkip();
      }
    },
    [enabled, onAnswer, onContinue, onSkip]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, enabled]);
};

// Helper to show keyboard hints
export const KeyboardHint = ({ letter }: { letter: string }) => (
  <kbd className="hidden sm:inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono bg-muted border border-border rounded text-muted-foreground ml-1">
    {letter}
  </kbd>
);
