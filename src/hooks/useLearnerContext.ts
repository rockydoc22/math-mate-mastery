import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface LearnerContext {
  examType: string | null;
  dateOfBirth: string | null;
  loading: boolean;
}

/**
 * Lightweight combined lookup for signals that tailor Game Zone content:
 * the student's chosen exam and their date of birth (used only as a fallback
 * when no exam is selected).
 */
export function useLearnerContext(): LearnerContext {
  const { user } = useAuth();
  const [state, setState] = useState<LearnerContext>({
    examType: null, dateOfBirth: null, loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    if (!user) { setState({ examType: null, dateOfBirth: null, loading: false }); return; }
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("exam_type,date_of_birth")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setState({
        examType: (data?.exam_type as string) ?? null,
        dateOfBirth: (data?.date_of_birth as string) ?? null,
        loading: false,
      });
    })();
    return () => { cancelled = true; };
  }, [user]);

  return state;
}