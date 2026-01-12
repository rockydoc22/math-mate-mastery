import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface RulebookNote {
  id: string;
  questionId: string;
  attemptId?: string;
  errorPattern: string;
  triggerPhrase: string;
  preventionRule: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const useRulebookNotes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const saveNote = useCallback(async (
    questionId: string,
    data: {
      errorPattern?: string;
      triggerPhrase?: string;
      preventionRule?: string;
      notes?: string;
      attemptId?: string;
    }
  ): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('rulebook_notes')
        .upsert({
          user_id: user.id,
          question_id: questionId,
          attempt_id: data.attemptId || null,
          error_pattern: data.errorPattern || null,
          trigger_phrase: data.triggerPhrase || null,
          prevention_rule: data.preventionRule || null,
          notes: data.notes || null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,question_id',
        });

      if (error) throw error;
      toast.success('Rulebook note saved!');
      return true;
    } catch (error) {
      console.error('Error saving rulebook note:', error);
      toast.error('Failed to save note');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getNoteForQuestion = useCallback(async (questionId: string): Promise<RulebookNote | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('rulebook_notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('question_id', questionId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        questionId: data.question_id,
        attemptId: data.attempt_id || undefined,
        errorPattern: data.error_pattern || '',
        triggerPhrase: data.trigger_phrase || '',
        preventionRule: data.prevention_rule || '',
        notes: data.notes || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error fetching rulebook note:', error);
      return null;
    }
  }, [user]);

  const getAllNotes = useCallback(async (): Promise<RulebookNote[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('rulebook_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(d => ({
        id: d.id,
        questionId: d.question_id,
        attemptId: d.attempt_id || undefined,
        errorPattern: d.error_pattern || '',
        triggerPhrase: d.trigger_phrase || '',
        preventionRule: d.prevention_rule || '',
        notes: d.notes || '',
        createdAt: d.created_at,
        updatedAt: d.updated_at,
      }));
    } catch (error) {
      console.error('Error fetching all rulebook notes:', error);
      return [];
    }
  }, [user]);

  const deleteNote = useCallback(async (noteId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('rulebook_notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Note deleted');
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
      return false;
    }
  }, [user]);

  return {
    saveNote,
    getNoteForQuestion,
    getAllNotes,
    deleteNote,
    loading,
  };
};
