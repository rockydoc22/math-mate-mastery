import { useCallback, useRef } from 'react';

/**
 * Lightweight synthesized sound effects for arcade games.
 * Uses Web Audio API oscillators — no external files needed.
 */
export function useGameSounds() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const tone = useCallback((freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.25) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  }, [getCtx]);

  const playLaser = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, [getCtx]);

  const playExplosion = useCallback(() => {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(ctx.currentTime);
  }, [getCtx]);

  const playMiss = useCallback(() => {
    tone(300, 0.3, 'sawtooth', 0.2);
    setTimeout(() => tone(150, 0.4, 'sawtooth', 0.15), 100);
  }, [tone]);

  const playCorrect = useCallback(() => {
    tone(880, 0.1, 'sine', 0.2);
    setTimeout(() => tone(1100, 0.15, 'sine', 0.2), 80);
  }, [tone]);

  const playWrong = useCallback(() => {
    tone(200, 0.25, 'sawtooth', 0.2);
  }, [tone]);

  const playVictory = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => tone(f, 0.25, 'sine', 0.2), i * 120);
    });
  }, [tone]);

  const playDefeat = useCallback(() => {
    [400, 350, 300, 200].forEach((f, i) => {
      setTimeout(() => tone(f, 0.3, 'sawtooth', 0.15), i * 150);
    });
  }, [tone]);

  const playCombo = useCallback((count: number) => {
    const freqs = [440, 550, 660, 880, 1100];
    const n = Math.min(count, freqs.length);
    freqs.slice(0, n).forEach((f, i) => {
      setTimeout(() => tone(f, 0.08, 'sine', 0.15), i * 60);
    });
  }, [tone]);

  const playChessMove = useCallback(() => {
    tone(600, 0.06, 'sine', 0.15);
  }, [tone]);

  const playChessCapture = useCallback(() => {
    tone(500, 0.05, 'square', 0.15);
    setTimeout(() => tone(700, 0.1, 'sine', 0.2), 60);
  }, [tone]);

  return {
    playLaser, playExplosion, playMiss,
    playCorrect, playWrong, playVictory, playDefeat, playCombo,
    playChessMove, playChessCapture,
  };
}
