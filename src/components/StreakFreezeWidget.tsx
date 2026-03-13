import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Snowflake } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function StreakFreezeWidget() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState(0);
  const [streakAtRisk, setStreakAtRisk] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [using, setUsing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("streaks")
      .select("current_streak, last_practice_date, freeze_tokens, freezes_used_this_month, freeze_month")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!data) { setLoaded(true); return; }

    // Reset monthly count if new month
    const currentMonth = new Date().toISOString().slice(0, 7);
    let availableTokens = data.freeze_tokens;
    if (data.freeze_month !== currentMonth) {
      availableTokens = 2; // Reset
      await supabase.from("streaks").update({
        freeze_tokens: 2,
        freezes_used_this_month: 0,
        freeze_month: currentMonth,
      }).eq("user_id", user.id);
    }

    setTokens(availableTokens);
    setCurrentStreak(data.current_streak);

    // Check if streak is at risk (>24h since last practice)
    if (data.current_streak > 0 && data.last_practice_date) {
      const hoursSince = (Date.now() - new Date(data.last_practice_date).getTime()) / 3600000;
      setStreakAtRisk(hoursSince > 24);
    }
    setLoaded(true);
  };

  const useFreeze = async () => {
    if (!user || tokens <= 0) return;
    setUsing(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { error } = await supabase
        .from("streaks")
        .update({
          freeze_tokens: tokens - 1,
          freezes_used_this_month: tokens <= 1 ? 2 : 1,
          last_practice_date: today,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      setTokens(t => t - 1);
      setStreakAtRisk(false);
      toast.success("Streak freeze used! Your streak is protected.");
    } catch (e) {
      toast.error("Failed to use freeze");
    } finally {
      setUsing(false);
    }
  };

  if (!loaded || currentStreak === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Snowflake className="w-3.5 h-3.5 text-blue-400" />
        <span>{tokens} freeze{tokens !== 1 ? "s" : ""}</span>
      </div>
      {streakAtRisk && tokens > 0 && (
        <Button
          size="sm"
          variant="outline"
          className="h-6 text-[10px] px-2 gap-1 border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
          onClick={useFreeze}
          disabled={using}
        >
          <Shield className="w-3 h-3" />
          Protect streak
        </Button>
      )}
    </div>
  );
}
