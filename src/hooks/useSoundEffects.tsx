import { useCallback, useRef } from "react";

// Audio context singleton to avoid creating multiple contexts
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

const createBeep = (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail if audio not available
  }
};

// Create a more satisfying "ding" sound
const createDing = (baseFreq: number, duration: number, volume = 0.25) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.05);
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail
  }
};

// Create a powerful chord for milestones
const createChord = (frequencies: number[], duration: number, volume = 0.15) => {
  frequencies.forEach((freq, i) => {
    setTimeout(() => createBeep(freq, duration, "sine", volume), i * 30);
  });
};

export const useSoundEffects = () => {
  const lastComboSound = useRef(0);

  // Basic correct - satisfying double ding
  const playCorrect = useCallback(() => {
    createDing(880, 0.15);
    setTimeout(() => createDing(1100, 0.2), 100);
  }, []);

  // Wrong answer - low buzz
  const playWrong = useCallback(() => {
    createBeep(200, 0.3, "sawtooth", 0.2);
  }, []);

  // Achievement unlocked - ascending arpeggio
  const playAchievement = useCallback(() => {
    createBeep(523, 0.1, "sine");
    setTimeout(() => createBeep(659, 0.1, "sine"), 100);
    setTimeout(() => createBeep(784, 0.1, "sine"), 200);
    setTimeout(() => createBeep(1047, 0.25, "sine"), 300);
  }, []);

  // Level up - triumphant sweep
  const playLevelUp = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBeep(400 + i * 150, 0.1, "sine"), i * 80);
    }
  }, []);

  // Combo sound - escalates with combo count
  const playCombo = useCallback((comboCount: number) => {
    // Throttle to avoid overlapping sounds
    const now = Date.now();
    if (now - lastComboSound.current < 150) return;
    lastComboSound.current = now;

    // Base frequency increases with combo
    const baseFreq = 600 + Math.min(comboCount * 50, 400);
    
    if (comboCount >= 10) {
      // Godlike! Major chord burst
      createChord([523, 659, 784, 1047], 0.4, 0.2);
      setTimeout(() => createChord([587, 740, 880, 1175], 0.3, 0.15), 150);
    } else if (comboCount >= 7) {
      // On fire! Power chord
      createChord([baseFreq, baseFreq * 1.5, baseFreq * 2], 0.3);
    } else if (comboCount >= 5) {
      // Combo x5! Triple ding
      createDing(baseFreq, 0.15);
      setTimeout(() => createDing(baseFreq * 1.25, 0.15), 80);
      setTimeout(() => createDing(baseFreq * 1.5, 0.2), 160);
    } else if (comboCount >= 3) {
      // Nice combo - double ding with higher pitch
      createDing(baseFreq, 0.12);
      setTimeout(() => createDing(baseFreq * 1.2, 0.15), 100);
    }
  }, []);

  // Streak celebration (7-day, 14-day, 30-day etc.)
  const playStreakCelebration = useCallback(() => {
    // Triumphant fanfare
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        createBeep(freq, 0.2, "sine", 0.25);
        createBeep(freq * 0.5, 0.2, "sine", 0.1); // Add bass
      }, i * 100);
    });
  }, []);

  // Speed round tick (for countdown)
  const playTick = useCallback(() => {
    createBeep(800, 0.05, "square", 0.1);
  }, []);

  // Speed round warning (last 5 seconds)
  const playUrgentTick = useCallback(() => {
    createBeep(1200, 0.08, "square", 0.15);
  }, []);

  // Milestone hit (10 in a row, 100 questions, etc.)
  const playMilestone = useCallback(() => {
    // Epic chord progression
    createChord([392, 494, 587], 0.15);
    setTimeout(() => createChord([440, 554, 659], 0.15), 150);
    setTimeout(() => createChord([494, 622, 740], 0.15), 300);
    setTimeout(() => createChord([523, 659, 784, 1047], 0.4, 0.25), 450);
  }, []);

  // Button click feedback
  const playClick = useCallback(() => {
    createBeep(600, 0.03, "sine", 0.1);
  }, []);

  return { 
    playCorrect, 
    playWrong, 
    playAchievement, 
    playLevelUp,
    playCombo,
    playStreakCelebration,
    playTick,
    playUrgentTick,
    playMilestone,
    playClick,
  };
};
