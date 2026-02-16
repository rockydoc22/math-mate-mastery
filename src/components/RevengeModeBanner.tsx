import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skull, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const RevengeModeBanner = () => {
  const { user } = useAuth();
  const [missedCount, setMissedCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    const fetchMissed = async () => {
      // Get questions missed in the last session (last 24 hours)
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("question_attempts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_correct", false)
        .gte("created_at", dayAgo);
      
      setMissedCount(count || 0);
    };

    fetchMissed();
  }, [user]);

  if (!user || missedCount === 0) return null;

  return (
    <Card className="p-4 border-2 border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-destructive/20">
            <Skull className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <p className="font-semibold text-sm text-destructive">Revenge Mode</p>
            <p className="text-xs text-muted-foreground">
              {missedCount} questions to avenge from your last session
            </p>
          </div>
        </div>
        <Link to="/review">
          <Button size="sm" variant="destructive" className="gap-1">
            Avenge
            <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
