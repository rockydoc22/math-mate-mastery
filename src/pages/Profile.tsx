import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { useExamType } from "@/hooks/useExamType";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Palette, Save, Swords, Wrench } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { XPBar } from "@/components/XPBar";
import { AchievementBadge } from "@/components/AchievementBadge";
import { StreakBadge } from "@/components/StreakBadge";

import { PWAUpdateButton } from "@/components/PWAUpdateButton";
import { FighterCustomizer } from "@/components/FighterCustomizer";
import { FighterVisual } from "@/components/FighterVisual";
import { useFighterAvatar } from "@/hooks/useFighterAvatar";
import { AssessmentHistory } from "@/components/AssessmentHistory";
import { SEO } from "@/components/SEO";

const AVATAR_OPTIONS = ["😎", "🧑‍🎓", "🦊", "🐱", "🐶", "🦁", "🐼", "🦄", "🚀", "⭐", "🔥", "💎", "👑", "🎯", "🧠", "💪"];
const THEME_OPTIONS = [
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Pink", value: "pink", class: "bg-pink-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Cyan", value: "cyan", class: "bg-cyan-500" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { streak, achievements, quizCount, achievementDefs } = useGameStats();
  const { ratings } = useSkillRating();
  const { avatar: fighterAvatar } = useFighterAvatar();
  const { examType } = useExamType();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    avatar_emoji: "😎",
    theme_color: "purple",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_emoji, theme_color")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data) {
        setProfile({
          username: data.username || "",
          avatar_emoji: data.avatar_emoji || "😎",
          theme_color: data.theme_color || "purple",
        });
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
        avatar_emoji: profile.avatar_emoji,
        theme_color: profile.theme_color,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      toast({ title: "Error saving profile", variant: "destructive" });
    } else {
      toast({ title: "Profile saved!" });
    }
  };

  const handleRepairApp = async () => {
    try {
      toast({
        title: "Repairing app…",
        description: "Clearing cached data and reloading.",
      });

      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.map((n) => caches.delete(n)));
      }

      // Reload to fetch fresh HTML + assets
      window.location.reload();
    } catch (e) {
      console.error("Repair app failed", e);
      toast({
        title: "Repair failed",
        description: "Open Quick Fix for iPhone steps.",
        variant: "destructive",
      });
      window.location.href = "/quick-fix.html";
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <SEO
        title="Your Profile — Stats, Streaks, Avatar"
        description="Manage your AlphaOmega profile: avatar, theme, streaks, skill ratings, and achievements across every test you're studying."
        path="/profile"
        noindex
      />
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="w-8 h-8 text-primary" />
              Profile
            </h1>
          </div>
          <Button variant="ghost" onClick={signOut}>Sign Out</Button>
        </div>

        {/* Stats Overview */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <FighterVisual avatar={fighterAvatar} size="lg" showAura={true} animate={true} />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              <div className="flex items-center gap-2 mt-1">
                {streak && <StreakBadge streak={streak.current_streak} size="sm" />}
                <span className="text-sm text-muted-foreground">{quizCount} quizzes completed</span>
              </div>
            </div>
          </div>
          <XPBar quizCount={quizCount} />
        </Card>

        {/* Fighter customization moved to Battle Mode — kept out of Profile to reduce clutter. */}

        {/* Assessment History */}
        <AssessmentHistory />


        {/* Achievements */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Achievements ({achievements.length}/{Object.keys(achievementDefs).length})</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(achievementDefs).map(([key, def]) => {
              const unlocked = achievements.find((a) => a.achievement_type === key);
              return (
                <AchievementBadge
                  key={key}
                  icon={def.icon}
                  name={def.name}
                  description={def.desc}
                  unlocked={!!unlocked}
                  unlockedAt={unlocked?.unlocked_at}
                />
              );
            })}
          </div>
        </Card>

        {/* Customization */}
        <Card className="p-6 space-y-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize
          </h3>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setProfile({ ...profile, avatar_emoji: emoji })}
                  className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                    profile.avatar_emoji === emoji
                      ? "border-primary bg-primary/10 scale-110"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Theme Color</Label>
            <div className="flex flex-wrap gap-2">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setProfile({ ...profile, theme_color: theme.value })}
                  className={`w-10 h-10 rounded-lg ${theme.class} transition-all ${
                    profile.theme_color === theme.value
                      ? "ring-2 ring-offset-2 ring-foreground scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  title={theme.name}
                />
              ))}
            </div>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Card>

        {/* App Update */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">App Settings</h3>
          <PWAUpdateButton />

          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full" onClick={handleRepairApp}>
              <Wrench className="w-4 h-4 mr-2" />
              Repair App (Fix blank screen)
            </Button>

            <a
              href="/quick-fix.html"
              className="block text-xs text-muted-foreground underline underline-offset-4"
            >
              Having trouble updating on iPhone? Open Quick Fix
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
