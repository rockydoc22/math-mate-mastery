import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Lock, Unlock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  useFighterAvatar,
  FIGHTER_BASE_TYPES,
  WEAPONS,
  SCARS,
  HELMETS,
  AURAS,
  type FighterAvatar,
  type FighterBaseType,
  type WeaponType,
  type ScarOverlay,
  type HelmetStyle,
  type AuraColor,
} from "@/hooks/useFighterAvatar";
import { FighterVisual } from "@/components/FighterVisual";

interface FighterCustomizerProps {
  achievements: { achievement_type: string }[];
  onSave?: () => void;
}

export function FighterCustomizer({ achievements, onSave }: FighterCustomizerProps) {
  const { avatar, loading, saving, saveAvatar } = useFighterAvatar();
  const [draft, setDraft] = useState<FighterAvatar>(avatar);
  
  useEffect(() => {
    setDraft(avatar);
  }, [avatar]);

  const hasAchievement = (type: string | null) => {
    if (!type) return true;
    return achievements.some(a => a.achievement_type === type);
  };

  const handleSave = async () => {
    const success = await saveAvatar(draft);
    if (success) {
      toast({ title: "Fighter saved!", description: "Your avatar has been updated." });
      onSave?.();
    } else {
      toast({ title: "Error saving fighter", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="animate-pulse h-96 bg-muted rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <Card className="p-6 bg-gradient-to-br from-slate-900/50 to-primary/10 border-primary/30">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">Your Fighter</p>
          <FighterVisual 
            avatar={draft} 
            size="lg" 
            showAura={true}
            animate={true}
          />
          <div className="text-center">
            <p className="font-bold text-lg">{FIGHTER_BASE_TYPES[draft.base_type].name}</p>
            <p className="text-sm text-primary">{FIGHTER_BASE_TYPES[draft.base_type].bonus}</p>
          </div>
        </div>
      </Card>

      {/* Base Type Selection */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Fighter Type
        </Label>
        <div className="grid grid-cols-5 gap-2">
          {(Object.entries(FIGHTER_BASE_TYPES) as [FighterBaseType, typeof FIGHTER_BASE_TYPES.human][]).map(([key, type]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setDraft({ ...draft, base_type: key })}
                  className={cn(
                    "w-full aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
                    draft.base_type === key
                      ? "border-primary bg-primary/20 scale-105 shadow-lg shadow-primary/20"
                      : "border-border hover:border-muted-foreground bg-card"
                  )}
                >
                  <span className="text-2xl">{type.emoji}</span>
                  <span className="text-[10px] font-medium truncate px-1">{type.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{type.name}</p>
                <p className="text-xs text-muted-foreground">{type.description}</p>
                <p className="text-xs text-primary mt-1">{type.bonus}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Weapons */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          ⚔️ Weapon
        </Label>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setDraft({ ...draft, weapon: null })}
            className={cn(
              "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
              draft.weapon === null
                ? "border-primary bg-primary/20"
                : "border-border hover:border-muted-foreground bg-card"
            )}
          >
            <span className="text-xl">❌</span>
            <span className="text-[10px]">None</span>
          </button>
          {(Object.entries(WEAPONS) as [NonNullable<WeaponType>, typeof WEAPONS.pen_sword][]).map(([key, weapon]) => {
            const unlocked = hasAchievement(weapon.requiredAchievement);
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => unlocked && setDraft({ ...draft, weapon: key })}
                    disabled={!unlocked}
                    className={cn(
                      "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all relative",
                      draft.weapon === key
                        ? "border-primary bg-primary/20"
                        : unlocked
                          ? "border-border hover:border-muted-foreground bg-card"
                          : "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="text-xl">{weapon.emoji}</span>
                    <span className="text-[10px] truncate px-1">{weapon.name}</span>
                    {!unlocked && (
                      <Lock className="absolute top-1 right-1 w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{weapon.name}</p>
                  {!unlocked && (
                    <p className="text-xs text-red-400">🔒 Requires: {weapon.requiredAchievement.replace(/_/g, " ")}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Scars */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          🩸 Battle Scars
        </Label>
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => setDraft({ ...draft, scar_overlay: null })}
            className={cn(
              "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
              draft.scar_overlay === null
                ? "border-primary bg-primary/20"
                : "border-border hover:border-muted-foreground bg-card"
            )}
          >
            <span className="text-xl">❌</span>
            <span className="text-[10px]">None</span>
          </button>
          {(Object.entries(SCARS) as [NonNullable<ScarOverlay>, typeof SCARS.battle_scar][]).map(([key, scar]) => {
            const unlocked = hasAchievement(scar.requiredAchievement);
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => unlocked && setDraft({ ...draft, scar_overlay: key })}
                    disabled={!unlocked}
                    className={cn(
                      "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all relative",
                      draft.scar_overlay === key
                        ? "border-primary bg-primary/20"
                        : unlocked
                          ? "border-border hover:border-muted-foreground bg-card"
                          : "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="text-xl">{scar.emoji}</span>
                    <span className="text-[10px] truncate px-1">{scar.name}</span>
                    {!unlocked && (
                      <Lock className="absolute top-1 right-1 w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{scar.name}</p>
                  {!unlocked && (
                    <p className="text-xs text-red-400">🔒 Requires: {scar.requiredAchievement.replace(/_/g, " ")}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Helmets */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          🪖 Helmet
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(HELMETS) as [NonNullable<HelmetStyle>, typeof HELMETS.none][]).map(([key, helmet]) => {
            const unlocked = hasAchievement(helmet.requiredAchievement);
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => unlocked && setDraft({ ...draft, helmet_style: key === "none" ? null : key })}
                    disabled={!unlocked}
                    className={cn(
                      "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all relative",
                      (key === "none" && draft.helmet_style === null) || draft.helmet_style === key
                        ? "border-primary bg-primary/20"
                        : unlocked
                          ? "border-border hover:border-muted-foreground bg-card"
                          : "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="text-xl">{helmet.emoji}</span>
                    <span className="text-[10px] truncate px-1">{helmet.name}</span>
                    {!unlocked && (
                      <Lock className="absolute top-1 right-1 w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{helmet.name}</p>
                  {!unlocked && helmet.requiredAchievement && (
                    <p className="text-xs text-red-400">🔒 Requires: {helmet.requiredAchievement.replace(/_/g, " ")}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Aura */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          ✨ Aura Color
        </Label>
        <div className="grid grid-cols-6 gap-2">
          <button
            onClick={() => setDraft({ ...draft, aura_color: null })}
            className={cn(
              "aspect-square rounded-xl border-2 flex items-center justify-center transition-all",
              draft.aura_color === null
                ? "border-primary bg-primary/20"
                : "border-border hover:border-muted-foreground bg-card"
            )}
          >
            <span className="text-xl">❌</span>
          </button>
          {(Object.entries(AURAS) as [NonNullable<AuraColor>, typeof AURAS.orange][]).map(([key, aura]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setDraft({ ...draft, aura_color: key })}
                  className={cn(
                    "aspect-square rounded-xl border-2 flex items-center justify-center transition-all",
                    draft.aura_color === key
                      ? "border-primary scale-105"
                      : "border-border hover:border-muted-foreground"
                  )}
                  style={{ backgroundColor: aura.color + "33" }}
                >
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: aura.color }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{aura.name} Aura</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <Button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full"
        size="lg"
      >
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Fighter"}
      </Button>
    </div>
  );
}
