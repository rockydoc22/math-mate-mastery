import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { ExamType } from "@/utils/examConfig";

export function useExamType() {
  const { user } = useAuth();
  const [examType, setExamTypeState] = useState<ExamType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setExamTypeState(null);
      setLoading(false);
      return;
    }

    const fetchExamType = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("exam_type")
        .eq("id", user.id)
        .maybeSingle();

      setExamTypeState((data?.exam_type as ExamType) || null);
      setLoading(false);
    };

    fetchExamType();
  }, [user]);

  const setExamType = useCallback(async (type: ExamType) => {
    if (!user) return;
    setExamTypeState(type);
    await supabase
      .from("profiles")
      .update({ exam_type: type })
      .eq("id", user.id);
  }, [user]);

  // Whether the user needs to pick an exam (first time)
  const needsSelection = !loading && user && !examType;

  return { examType: examType || 'sat', loading, needsSelection, setExamType };
}
