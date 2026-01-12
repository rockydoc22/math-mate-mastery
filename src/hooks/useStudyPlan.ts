import { useEffect, useState, useMemo } from "react";
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

interface AcceleratorSummary {
  totalCredits: number;
  recentCredits: number;
}

export const useStudyPlan = () => {
  const { user } = useAuth();
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReminder, setShowReminder] = useState(false);
  const [acceleratorCredits, setAcceleratorCredits] = useState<AcceleratorSummary>({ totalCredits: 0, recentCredits: 0 });
  const [pendingReviewCount, setPendingReviewCount] = useState(0);

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

        // Fetch accelerator credits
        const { data: creditsData } = await supabase
          .from("accelerator_credits")
          .select("earned_credits, created_at")
          .eq("user_id", user.id);

        if (creditsData) {
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          const totalCredits = creditsData.reduce((sum, c) => sum + Number(c.earned_credits), 0);
          const recentCredits = creditsData
            .filter(c => new Date(c.created_at) >= weekAgo)
            .reduce((sum, c) => sum + Number(c.earned_credits), 0);
          setAcceleratorCredits({ totalCredits, recentCredits });
        }

        // Fetch pending review count (missed questions not yet mastered)
        const { count: reviewCount } = await supabase
          .from("question_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_correct", false);

        setPendingReviewCount(reviewCount || 0);
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

  // Calculate adjusted workplan with accelerator credits
  const adjustedWorkplan = useMemo(() => {
    if (!workplan) return null;
    
    const adjustedTotal = Math.max(0, workplan.totalQuestionsNeeded - acceleratorCredits.totalCredits);
    const effectiveWeeks = Math.max(1, weeksUntilExam);
    const adjustedWeekly = Math.ceil(adjustedTotal / effectiveWeeks);
    const adjustedDaily = Math.ceil(adjustedWeekly / 6);
    
    return {
      ...workplan,
      adjustedTotalQuestions: adjustedTotal,
      adjustedWeeklyQuestions: adjustedWeekly,
      adjustedDailyQuestions: adjustedDaily,
      creditsEarned: acceleratorCredits.totalCredits,
      recentCredits: acceleratorCredits.recentCredits,
    };
  }, [workplan, acceleratorCredits, weeksUntilExam]);

  // Alert thresholds for pending reviews
  const showReviewAlert = pendingReviewCount >= 10;

  return {
    activePlan,
    loading,
    showReminder,
    dismissReminder,
    daysUntilExam,
    weeksUntilExam,
    workplan: adjustedWorkplan,
    pendingReviewCount,
    showReviewAlert,
    acceleratorCredits,
  };
};
