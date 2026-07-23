import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface MasteryGoal {
  id: string;
  exam_family: string | null;
  section: string | null;
  domain: string | null;
  skill: string;
  target: number;
  correct_count: number;
  daily_dose: number;
  status: "active" | "completed" | "paused";
  last_dose_at: string | null;
  completed_at: string | null;
}

export function useMasteryGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<MasteryGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) { setGoals([]); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("mastery_goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setGoals((data as MasteryGoal[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const createGoal = useCallback(async (input: {
    skill: string;
    domain?: string | null;
    section?: string | null;
    exam_family?: string | null;
    target?: number;
    daily_dose?: number;
  }) => {
    if (!user) return null;
    const payload = {
      user_id: user.id,
      skill: input.skill,
      domain: input.domain ?? null,
      section: input.section ?? null,
      exam_family: input.exam_family ?? null,
      target: input.target ?? 50,
      daily_dose: input.daily_dose ?? 20,
      status: "active" as const,
    };
    const { data, error } = await supabase
      .from("mastery_goals")
      .upsert(payload, { onConflict: "user_id,exam_family,domain,skill", ignoreDuplicates: false })
      .select()
      .maybeSingle();
    if (!error) await refresh();
    return data as MasteryGoal | null;
  }, [user, refresh]);

  const removeGoal = useCallback(async (id: string) => {
    await supabase.from("mastery_goals").delete().eq("id", id);
    await refresh();
  }, [refresh]);

  const activeGoals = goals.filter(g => g.status === "active");
  return { goals, activeGoals, loading, refresh, createGoal, removeGoal };
}