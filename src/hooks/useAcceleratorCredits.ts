import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  AcceleratorType, 
  AcceleratorSummary, 
  summarizeCredits, 
  calculateCredits,
  PREDICTION_TEST_COMPLETION_BONUS 
} from "@/utils/acceleratorCalculator";

interface AcceleratorCredit {
  id: string;
  credit_type: string;
  question_id: string | null;
  source_id: string | null;
  base_questions: number;
  multiplier: number;
  earned_credits: number;
  metadata: unknown;
  created_at: string;
}

export const useAcceleratorCredits = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState<AcceleratorCredit[]>([]);
  const [summary, setSummary] = useState<AcceleratorSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingReviewCount, setPendingReviewCount] = useState(0);

  const fetchCredits = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch accelerator credits
      const { data: creditsData, error: creditsError } = await supabase
        .from("accelerator_credits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (creditsError) throw creditsError;

      // Fetch pending review questions (missed but not yet mastered)
      const { count: reviewCount, error: reviewError } = await supabase
        .from("question_attempts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_correct", false);

      if (reviewError) throw reviewError;

      setCredits(creditsData || []);
      setSummary(summarizeCredits(creditsData || []));
      setPendingReviewCount(reviewCount || 0);
    } catch (error) {
      console.error("Error fetching accelerator credits:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  /**
   * Award credits for a specific action
   */
  const awardCredits = useCallback(async (
    type: AcceleratorType,
    options?: {
      questionId?: string;
      sourceId?: string;
      baseQuestions?: number;
      daysSinceMiss?: number;
      difficultyRating?: number;
      isWin?: boolean;
      metadata?: Record<string, unknown>;
    }
  ) => {
    if (!user) return null;

    const baseQuestions = options?.baseQuestions || 1;
    const { multiplier, credits: earnedCredits } = calculateCredits(type, baseQuestions, {
      daysSinceMiss: options?.daysSinceMiss,
      difficultyRating: options?.difficultyRating,
      isWin: options?.isWin,
    });

    // Don't award if multiplier is 0 (e.g., spaced rep reviewed too soon)
    if (multiplier === 0) return null;

    const { data, error } = await supabase
      .from("accelerator_credits")
      .insert([{
        user_id: user.id,
        credit_type: type,
        question_id: options?.questionId || null,
        source_id: options?.sourceId || null,
        base_questions: baseQuestions,
        multiplier,
        earned_credits: earnedCredits,
        metadata: options?.metadata ? JSON.parse(JSON.stringify(options.metadata)) : null,
      }])
      .select()
      .single();

    if (error) {
      console.error("Error awarding credits:", error);
      return null;
    }

    // Refresh credits
    await fetchCredits();
    return data;
  }, [user, fetchCredits]);

  /**
   * Award credits for Fight Club participation/win
   */
  const awardFightClubCredits = useCallback(async (
    roomId: string,
    questionsAnswered: number,
    isWinner: boolean
  ) => {
    if (!user) return;

    // Award participation credits
    await awardCredits('fight_club_participation', {
      sourceId: roomId,
      baseQuestions: questionsAnswered,
      metadata: { questionsAnswered },
    });

    // Award win bonus if winner
    if (isWinner) {
      await awardCredits('fight_club_win', {
        sourceId: roomId,
        baseQuestions: questionsAnswered,
        metadata: { questionsAnswered },
      });
    }
  }, [user, awardCredits]);

  /**
   * Award credits for completing a prediction test
   */
  const awardPredictionTestCredits = useCallback(async (
    testId: string,
    totalQuestions: number
  ) => {
    if (!user) return;

    // Award per-question credits (all hard questions in prediction test)
    await awardCredits('prediction_test', {
      sourceId: testId,
      baseQuestions: totalQuestions,
      metadata: { totalQuestions },
    });

    // Award completion bonus
    await awardCredits('prediction_test_completion', {
      sourceId: testId,
      baseQuestions: PREDICTION_TEST_COMPLETION_BONUS,
      metadata: { totalQuestions },
    });
  }, [user, awardCredits]);

  /**
   * Award credits for spaced repetition mastery
   */
  const awardSpacedRepetitionCredits = useCallback(async (
    questionId: string,
    daysSinceMiss: number,
    difficultyRating?: number
  ) => {
    if (!user || daysSinceMiss < 7) return null;

    return await awardCredits('spaced_repetition', {
      questionId,
      daysSinceMiss,
      difficultyRating,
      metadata: { daysSinceMiss, difficultyRating },
    });
  }, [user, awardCredits]);

  return {
    credits,
    summary,
    loading,
    pendingReviewCount,
    totalCredits: summary?.totalCredits || 0,
    recentCredits: summary?.recentCredits || 0,
    awardCredits,
    awardFightClubCredits,
    awardPredictionTestCredits,
    awardSpacedRepetitionCredits,
    refetch: fetchCredits,
  };
};
