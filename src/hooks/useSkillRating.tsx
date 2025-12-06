import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { calculateNewRating } from '@/utils/eloRating';

export interface SkillRatings {
  mathRating: number;
  englishRating: number;
  overallRating: number;
  mathQuestionsAnswered: number;
  englishQuestionsAnswered: number;
}

export function useSkillRating() {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<SkillRatings | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current ratings
  const fetchRatings = useCallback(async () => {
    if (!user) {
      setRatings(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('skill_ratings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching ratings:', error);
        return;
      }

      if (data) {
        setRatings({
          mathRating: data.math_rating,
          englishRating: data.english_rating,
          overallRating: data.overall_rating,
          mathQuestionsAnswered: data.math_questions_answered,
          englishQuestionsAnswered: data.english_questions_answered,
        });
      } else {
        // Create initial ratings for existing user
        const { error: insertError } = await supabase
          .from('skill_ratings')
          .insert({
            user_id: user.id,
            math_rating: 1200,
            english_rating: 1200,
            overall_rating: 1200,
          });

        if (!insertError) {
          setRatings({
            mathRating: 1200,
            englishRating: 1200,
            overallRating: 1200,
            mathQuestionsAnswered: 0,
            englishQuestionsAnswered: 0,
          });
        }
      }
    } catch (err) {
      console.error('Error in fetchRatings:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // Update rating after answering a question
  const updateRating = useCallback(async (
    questionType: 'math' | 'english',
    questionDifficulty: number,
    wasCorrect: boolean,
    questionId: string
  ) => {
    if (!user || !ratings) return null;

    const currentRating = questionType === 'math' ? ratings.mathRating : ratings.englishRating;
    const questionsAnswered = questionType === 'math' 
      ? ratings.mathQuestionsAnswered 
      : ratings.englishQuestionsAnswered;

    // Calculate new rating
    const { newRating, change } = calculateNewRating(
      currentRating,
      questionDifficulty,
      wasCorrect,
      questionsAnswered
    );

    // Calculate new overall rating (weighted average)
    const newMathRating = questionType === 'math' ? newRating : ratings.mathRating;
    const newEnglishRating = questionType === 'english' ? newRating : ratings.englishRating;
    const newMathCount = questionType === 'math' ? questionsAnswered + 1 : ratings.mathQuestionsAnswered;
    const newEnglishCount = questionType === 'english' ? questionsAnswered + 1 : ratings.englishQuestionsAnswered;
    
    // Weighted average based on questions answered
    const totalQuestions = newMathCount + newEnglishCount;
    const newOverallRating = totalQuestions > 0
      ? Math.round((newMathRating * newMathCount + newEnglishRating * newEnglishCount) / totalQuestions)
      : 1200;

    try {
      // Update ratings in database
      const { error: updateError } = await supabase
        .from('skill_ratings')
        .update({
          math_rating: newMathRating,
          english_rating: newEnglishRating,
          overall_rating: newOverallRating,
          math_questions_answered: newMathCount,
          english_questions_answered: newEnglishCount,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating ratings:', updateError);
        return null;
      }

      // Record rating history
      await supabase.from('rating_history').insert({
        user_id: user.id,
        rating_type: questionType,
        old_rating: currentRating,
        new_rating: newRating,
        question_id: questionId,
        question_difficulty: questionDifficulty,
        was_correct: wasCorrect,
        rating_change: change,
      });

      // Update local state
      setRatings({
        mathRating: newMathRating,
        englishRating: newEnglishRating,
        overallRating: newOverallRating,
        mathQuestionsAnswered: newMathCount,
        englishQuestionsAnswered: newEnglishCount,
      });

      return { newRating, change, newOverallRating };
    } catch (err) {
      console.error('Error in updateRating:', err);
      return null;
    }
  }, [user, ratings]);

  return {
    ratings,
    loading,
    updateRating,
    refetch: fetchRatings,
  };
}
