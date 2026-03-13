import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swords, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function QuickDuelEntry() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  const handleQuickDuel = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setStarting(true);
    try {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));

      const { data: room, error: roomError } = await supabase
        .from("battle_rooms")
        .insert({
          host_id: user.id,
          room_code: code,
          subject: "both",
          question_count: 3,
          max_players: 2,
          time_limit_seconds: 45,
          battle_mode: "quick_duel",
          is_solo: true,
          status: "in_progress",
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (roomError) throw roomError;

      await supabase.from("battle_participants").insert({
        room_id: room.id,
        user_id: user.id,
      });

      navigate(`/battle/${code}`);
    } catch (e) {
      console.error("Quick Duel error:", e);
      toast.error("Failed to start Quick Duel");
    } finally {
      setStarting(false);
    }
  };

  return (
    <Card className="p-3 mb-4 border-2 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
      <button
        onClick={handleQuickDuel}
        disabled={starting}
        className="w-full flex items-center gap-3 text-left"
      >
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shrink-0">
          <Swords className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold text-foreground">Quick Duel</p>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground">3 questions · 45 sec · instant match</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0" disabled={starting}>
          {starting ? "..." : "Go"}
        </Button>
      </button>
    </Card>
  );
}
