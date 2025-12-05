import { useCallback } from "react";

const createBeep = (frequency: number, duration: number, type: OscillatorType = "sine") => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const useSoundEffects = () => {
  const playCorrect = useCallback(() => {
    createBeep(880, 0.15, "sine");
    setTimeout(() => createBeep(1100, 0.2, "sine"), 100);
  }, []);

  const playWrong = useCallback(() => {
    createBeep(200, 0.3, "sawtooth");
  }, []);

  const playAchievement = useCallback(() => {
    createBeep(523, 0.1, "sine");
    setTimeout(() => createBeep(659, 0.1, "sine"), 100);
    setTimeout(() => createBeep(784, 0.1, "sine"), 200);
    setTimeout(() => createBeep(1047, 0.25, "sine"), 300);
  }, []);

  const playLevelUp = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBeep(400 + i * 150, 0.1, "sine"), i * 80);
    }
  }, []);

  return { playCorrect, playWrong, playAchievement, playLevelUp };
};
