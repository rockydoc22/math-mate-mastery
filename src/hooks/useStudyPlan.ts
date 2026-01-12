import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { calculateWorkplan, WorkplanEstimate } from "@/utils/workplanCalculator";

interface StudyPlan {
  id: string;
  exam_date: string;
  daily_minutes: number;
  baseline_score: number;
  target_score: number;
  created_at: string;
  last_reminder_shown: string | null;
}

export const useStudyPlan = () => {
  const { user } = useAuth();
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("study_plans")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setActivePlan(data);
          
          // Check if we should show reminder (once per session/day)
          const lastShown = data.last_reminder_shown 
            ? new Date(data.last_reminder_shown) 
            : null;
          const now = new Date();
          
          // Show reminder if never shown or last shown was more than 8 hours ago
          if (!lastShown || (now.getTime() - lastShown.getTime()) > 8 * 60 * 60 * 1000) {
            setShowReminder(true);
          }
        }
      } catch (error) {
        console.error("Error fetching study plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [user]);

  const dismissReminder = async () => {
    setShowReminder(false);
    
    if (activePlan && user) {
      await supabase
        .from("study_plans")
        .update({ last_reminder_shown: new Date().toISOString() })
        .eq("id", activePlan.id);
    }
  };

  const daysUntilExam = activePlan 
    ? Math.max(0, Math.ceil((new Date(activePlan.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const weeksUntilExam = Math.ceil(daysUntilExam / 7);

  // Calculate workplan if we have an active plan
  const workplan: WorkplanEstimate | null = activePlan 
    ? calculateWorkplan(
        activePlan.baseline_score || 1000,
        activePlan.target_score || 1600,
        weeksUntilExam,
        activePlan.daily_minutes
      )
    : null;

  return {
    activePlan,
    loading,
    showReminder,
    dismissReminder,
    daysUntilExam,
    weeksUntilExam,
    workplan,
  };
};
