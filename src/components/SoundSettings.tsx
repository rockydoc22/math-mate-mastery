import { Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSoundSettings } from "@/contexts/SoundContext";

export const SoundSettingsPanel = () => {
  const { settings, toggleEffects, toggleMusic, setVolume } = useSoundSettings();

  return (
    <div className="space-y-4 p-4 rounded-lg bg-muted/50 border border-border">
      <h3 className="font-semibold text-sm">Sound Settings</h3>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="effects" className="flex items-center gap-2 text-sm">
          <Volume2 className="w-4 h-4" />
          Sound Effects
        </Label>
        <Switch
          id="effects"
          checked={settings.effectsEnabled}
          onCheckedChange={toggleEffects}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="music" className="flex items-center gap-2 text-sm">
          <Music className="w-4 h-4" />
          Background Music
        </Label>
        <Switch
          id="music"
          checked={settings.musicEnabled}
          onCheckedChange={toggleMusic}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Volume: {Math.round(settings.volume * 100)}%</Label>
        <Slider
          value={[settings.volume * 100]}
          onValueChange={([v]) => setVolume(v / 100)}
          max={100}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  );
};

// Compact toggle for header/toolbar
export const SoundToggle = () => {
  const { settings, toggleEffects } = useSoundSettings();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleEffects}
      className="h-9 w-9"
    >
      {settings.effectsEnabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="sr-only">Toggle sound</span>
    </Button>
  );
};
