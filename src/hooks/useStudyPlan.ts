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

export interface AdaptiveRecommendation {
  type: 'weak_skill' | 'review_needed' | 'strength' | 'time_management';
  title: string;
  description: string;
  action: string;
  actionRoute?: string;
  priority: 'high' | 'medium' | 'low';
}

export const useStudyPlan = () => {
  const { user } = useAuth();
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReminder, setShowReminder] = useState(false);
  const [acceleratorCredits, setAcceleratorCredits] = useState<AcceleratorSummary>({ totalCredits: 0, recentCredits: 0 });
  const [pendingReviewCount, setPendingReviewCount] = useState(0);
  const [recommendations, setRecommendations] = useState<AdaptiveRecommendation[]>([]);

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
          
          const lastShown = data.last_reminder_shown 
            ? new Date(data.last_reminder_shown) 
            : null;
          const now = new Date();
          
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

        // Fetch pending review count
        const { count: reviewCount } = await supabase
          .from("question_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_correct", false);

        setPendingReviewCount(reviewCount || 0);

        // Generate adaptive recommendations from recent attempts
        const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
        const { data: recentAttempts } = await supabase
          .from("question_attempts")
          .select("skill, domain, is_correct, question_type")
          .eq("user_id", user.id)
          .gte("created_at", twoWeeksAgo);

        if (recentAttempts && recentAttempts.length > 0) {
          const recs = generateRecommendations(recentAttempts, reviewCount || 0);
          setRecommendations(recs);
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

  const workplan: WorkplanEstimate | null = activePlan 
    ? calculateWorkplan(
        activePlan.baseline_score || 1000,
        activePlan.target_score || 1600,
        weeksUntilExam,
        activePlan.daily_minutes
      )
    : null;

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
    recommendations,
  };
};

function generateRecommendations(
  attempts: { skill: string; domain: string; is_correct: boolean; question_type: string }[],
  pendingReviewCount: number
): AdaptiveRecommendation[] {
  const recs: AdaptiveRecommendation[] = [];

  // Analyze skill accuracy
  const skillStats: Record<string, { correct: number; total: number }> = {};
  const domainStats: Record<string, { correct: number; total: number }> = {};

  for (const a of attempts) {
    if (!skillStats[a.skill]) skillStats[a.skill] = { correct: 0, total: 0 };
    skillStats[a.skill].total++;
    if (a.is_correct) skillStats[a.skill].correct++;

    if (!domainStats[a.domain]) domainStats[a.domain] = { correct: 0, total: 0 };
    domainStats[a.domain].total++;
    if (a.is_correct) domainStats[a.domain].correct++;
  }

  // Find weakest skills (< 50% accuracy with at least 3 attempts)
  const weakSkills = Object.entries(skillStats)
    .filter(([, s]) => s.total >= 3 && (s.correct / s.total) < 0.5)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .slice(0, 2);

  for (const [skill, stats] of weakSkills) {
    const accuracy = Math.round((stats.correct / stats.total) * 100);
    recs.push({
      type: 'weak_skill',
      title: `Focus on: ${skill}`,
      description: `Your accuracy is ${accuracy}% (${stats.correct}/${stats.total}). This skill needs more practice.`,
      action: 'Practice Now',
      actionRoute: '/quiz',
      priority: accuracy < 30 ? 'high' : 'medium',
    });
  }

  // Find strongest skills (> 85% accuracy, 5+ attempts)
  const strongSkills = Object.entries(skillStats)
    .filter(([, s]) => s.total >= 5 && (s.correct / s.total) > 0.85)
    .sort((a, b) => (b[1].correct / b[1].total) - (a[1].correct / a[1].total))
    .slice(0, 1);

  for (const [skill, stats] of strongSkills) {
    const accuracy = Math.round((stats.correct / stats.total) * 100);
    recs.push({
      type: 'strength',
      title: `Strong at: ${skill}`,
      description: `${accuracy}% accuracy — consider moving to harder difficulty or focusing elsewhere.`,
      action: 'Try Elite Mode',
      actionRoute: '/elite-practice',
      priority: 'low',
    });
  }

  // Review recommendation
  if (pendingReviewCount >= 10) {
    recs.push({
      type: 'review_needed',
      title: `${pendingReviewCount} questions to review`,
      description: 'Reviewing missed questions is the fastest way to improve your score.',
      action: 'Review Mistakes',
      actionRoute: '/saved-questions',
      priority: 'high',
    });
  }

  // Time management check — if overall accuracy is above 70% but low volume
  const totalAttempts = attempts.length;
  const totalCorrect = attempts.filter(a => a.is_correct).length;
  const overallAccuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;

  if (overallAccuracy > 0.7 && totalAttempts < 20) {
    recs.push({
      type: 'time_management',
      title: 'Increase practice volume',
      description: `You're accurate (${Math.round(overallAccuracy * 100)}%) but only ${totalAttempts} questions in 2 weeks. Try to practice more consistently.`,
      action: 'Daily Challenge',
      actionRoute: '/daily-challenge',
      priority: 'medium',
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
