import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type FighterBaseType = "human" | "cyborg" | "beast" | "mutant" | "psi";
export type WeaponType = "pen_sword" | "book_shield" | "calc_cannon" | "brain_staff" | null;
export type ScarOverlay = "battle_scar" | "eye_patch" | "cracked_helmet" | "burn_mark" | null;
export type HelmetStyle = "none" | "visor" | "crown" | "hood" | null;
export type AuraColor = "orange" | "blue" | "purple" | "green" | "red" | null;

export interface FighterAvatar {
  base_type: FighterBaseType;
  weapon: WeaponType;
  aura_color: AuraColor;
  scar_overlay: ScarOverlay;
  helmet_style: HelmetStyle;
}

export const FIGHTER_BASE_TYPES: Record<FighterBaseType, { name: string; emoji: string; bonus: string; description: string }> = {
  human: { name: "Human", emoji: "🧑‍🚀", bonus: "Balanced", description: "Well-rounded fighter with no weaknesses" },
  cyborg: { name: "Cyborg", emoji: "🤖", bonus: "+Math Crit", description: "Enhanced logic circuits boost math accuracy" },
  beast: { name: "Beast", emoji: "🐺", bonus: "+Endurance", description: "Raw stamina keeps you going longer" },
  mutant: { name: "Mutant", emoji: "👾", bonus: "+Crit Chance", description: "Unpredictable mutations cause random crits" },
  psi: { name: "Psi-Fighter", emoji: "🧠", bonus: "+Reading", description: "Telepathic boost to reading comprehension" },
};

export const WEAPONS: Record<NonNullable<WeaponType>, { name: string; emoji: string; requiredAchievement: string }> = {
  pen_sword: { name: "Pen Sword", emoji: "🗡️", requiredAchievement: "first_quiz" },
  book_shield: { name: "Book Shield", emoji: "📖", requiredAchievement: "score_10" },
  calc_cannon: { name: "Calculator Cannon", emoji: "🔫", requiredAchievement: "math_master" },
  brain_staff: { name: "Brain Staff", emoji: "🪄", requiredAchievement: "english_ace" },
};

export const SCARS: Record<NonNullable<ScarOverlay>, { name: string; emoji: string; requiredAchievement: string }> = {
  battle_scar: { name: "Battle Scar", emoji: "⚔️", requiredAchievement: "streak_3" },
  eye_patch: { name: "Eye Patch", emoji: "🏴‍☠️", requiredAchievement: "streak_7" },
  cracked_helmet: { name: "Cracked Helmet", emoji: "💥", requiredAchievement: "score_50" },
  burn_mark: { name: "Burn Mark", emoji: "🔥", requiredAchievement: "streak_30" },
};

export const HELMETS: Record<NonNullable<HelmetStyle>, { name: string; emoji: string; requiredAchievement: string | null }> = {
  none: { name: "None", emoji: "❌", requiredAchievement: null },
  visor: { name: "Visor", emoji: "🥽", requiredAchievement: "perfect_score" },
  crown: { name: "Crown", emoji: "👑", requiredAchievement: "score_100" },
  hood: { name: "Hood", emoji: "🎭", requiredAchievement: "streak_7" },
};

export const AURAS: Record<NonNullable<AuraColor>, { name: string; color: string }> = {
  orange: { name: "Flame", color: "#f97316" },
  blue: { name: "Ice", color: "#3b82f6" },
  purple: { name: "Void", color: "#a855f7" },
  green: { name: "Nature", color: "#22c55e" },
  red: { name: "Rage", color: "#ef4444" },
};

const DEFAULT_AVATAR: FighterAvatar = {
  base_type: "human",
  weapon: null,
  aura_color: null,
  scar_overlay: null,
  helmet_style: null,
};

export const useFighterAvatar = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<FighterAvatar>(DEFAULT_AVATAR);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("fighter_avatars")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setAvatar({
          base_type: (data.base_type as FighterBaseType) || "human",
          weapon: data.weapon as WeaponType,
          aura_color: data.aura_color as AuraColor,
          scar_overlay: data.scar_overlay as ScarOverlay,
          helmet_style: data.helmet_style as HelmetStyle,
        });
      }
      setLoading(false);
    };

    fetchAvatar();
  }, [user]);

  const saveAvatar = async (newAvatar: FighterAvatar) => {
    if (!user) return false;
    setSaving(true);

    const { error } = await supabase
      .from("fighter_avatars")
      .upsert({
        user_id: user.id,
        base_type: newAvatar.base_type,
        weapon: newAvatar.weapon,
        aura_color: newAvatar.aura_color,
        scar_overlay: newAvatar.scar_overlay,
        helmet_style: newAvatar.helmet_style,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

    setSaving(false);

    if (!error) {
      setAvatar(newAvatar);
      return true;
    }
    return false;
  };

  return { avatar, loading, saving, saveAvatar };
};
