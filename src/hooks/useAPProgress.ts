import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useAPProgress = () => {
  const { user } = useAuth();

  const recordProgress = useCallback(async (
    subjectId: string,
    unitId: string,
    correct: boolean
  ) => {
    if (!user) return;

    // Upsert: increment counters
    const { data: existing } = await supabase
      .from('ap_subject_progress' as any)
      .select('id, questions_attempted, questions_correct')
      .eq('user_id', user.id)
      .eq('subject_id', subjectId)
      .eq('unit_id', unitId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('ap_subject_progress' as any)
        .update({
          questions_attempted: (existing as any).questions_attempted + 1,
          questions_correct: (existing as any).questions_correct + (correct ? 1 : 0),
          last_practiced_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', (existing as any).id);
    } else {
      await supabase
        .from('ap_subject_progress' as any)
        .insert({
          user_id: user.id,
          subject_id: subjectId,
          unit_id: unitId,
          questions_attempted: 1,
          questions_correct: correct ? 1 : 0,
        });
    }
  }, [user]);

  const getProgress = useCallback(async (subjectId: string) => {
    if (!user) return [];

    const { data } = await supabase
      .from('ap_subject_progress' as any)
      .select('*')
      .eq('user_id', user.id)
      .eq('subject_id', subjectId);

    return (data || []) as unknown as Array<{
      unit_id: string;
      questions_attempted: number;
      questions_correct: number;
      last_practiced_at: string;
    }>;
  }, [user]);

  const getAllProgress = useCallback(async () => {
    if (!user) return [];

    const { data } = await supabase
      .from('ap_subject_progress' as any)
      .select('*')
      .eq('user_id', user.id);

    return (data || []) as unknown as Array<{
      subject_id: string;
      unit_id: string;
      questions_attempted: number;
      questions_correct: number;
      last_practiced_at: string;
    }>;
  }, [user]);

  return { recordProgress, getProgress, getAllProgress };
};
