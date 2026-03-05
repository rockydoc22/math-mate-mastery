import { useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useWritingLabAnalytics = () => {
  const { user } = useAuth();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const startSession = useCallback(async (module: string, essayType: string) => {
    if (!user) return;
    startTimeRef.current = Date.now();

    const { data } = await supabase
      .from('writing_lab_sessions' as any)
      .insert({
        user_id: user.id,
        module,
        essay_type: essayType,
      })
      .select('id')
      .single();

    if (data) {
      sessionIdRef.current = (data as any).id;
    }
  }, [user]);

  const trackAIFeature = useCallback(async (featureName: string) => {
    if (!user || !sessionIdRef.current) return;

    // Read current array and append
    const { data } = await supabase
      .from('writing_lab_sessions' as any)
      .select('ai_features_used')
      .eq('id', sessionIdRef.current)
      .single();

    if (data) {
      const current = ((data as any).ai_features_used || []) as string[];
      if (!current.includes(featureName)) {
        await supabase
          .from('writing_lab_sessions' as any)
          .update({ ai_features_used: [...current, featureName] })
          .eq('id', sessionIdRef.current!);
      }
    }
  }, [user]);

  const completeSession = useCallback(async () => {
    if (!user || !sessionIdRef.current) return;

    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    await supabase
      .from('writing_lab_sessions' as any)
      .update({
        completed: true,
        time_spent_seconds: elapsed,
      })
      .eq('id', sessionIdRef.current);

    sessionIdRef.current = null;
  }, [user]);

  return { startSession, trackAIFeature, completeSession };
};
