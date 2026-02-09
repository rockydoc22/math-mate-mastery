import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SoundSettings {
  effectsEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
}

interface SoundContextType {
  settings: SoundSettings;
  toggleEffects: () => void;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
}

const defaultSettings: SoundSettings = {
  effectsEnabled: true,
  musicEnabled: true,
  volume: 0.7,
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SoundSettings>(() => {
    const saved = localStorage.getItem("soundSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("soundSettings", JSON.stringify(settings));
  }, [settings]);

  const toggleEffects = () => {
    setSettings((prev) => ({ ...prev, effectsEnabled: !prev.effectsEnabled }));
  };

  const toggleMusic = () => {
    setSettings((prev) => ({ ...prev, musicEnabled: !prev.musicEnabled }));
  };

  const setVolume = (volume: number) => {
    setSettings((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  return (
    <SoundContext.Provider value={{ settings, toggleEffects, toggleMusic, setVolume }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundSettings = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundSettings must be used within a SoundProvider");
  }
  return context;
};
