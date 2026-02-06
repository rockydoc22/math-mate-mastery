import { useState, useCallback, useMemo } from "react";

/**
 * Hook to track correctly answered questions within a session
 * to avoid showing them again until all other questions are exhausted.
 */
export function useSessionQuestions<T extends { id: string }>(allQuestions: T[]) {
  // IDs of questions answered correctly in this session
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<string>>(new Set());

  // Mark a question as correctly answered
  const markCorrect = useCallback((questionId: string) => {
    setAnsweredCorrectly((prev) => new Set([...prev, questionId]));
  }, []);

  // Get questions that haven't been answered correctly yet
  const availableQuestions = useMemo(() => {
    const available = allQuestions.filter((q) => !answeredCorrectly.has(q.id));
    // If all questions have been answered correctly, reset and return all
    if (available.length === 0 && allQuestions.length > 0) {
      return allQuestions;
    }
    return available;
  }, [allQuestions, answeredCorrectly]);

  // Check if we've cycled through all questions
  const hasCompletedCycle = useMemo(() => {
    return answeredCorrectly.size >= allQuestions.length;
  }, [answeredCorrectly.size, allQuestions.length]);

  // Reset the session (e.g., when starting a new quiz)
  const resetSession = useCallback(() => {
    setAnsweredCorrectly(new Set());
  }, []);

  return {
    answeredCorrectly,
    markCorrect,
    availableQuestions,
    hasCompletedCycle,
    resetSession,
    correctCount: answeredCorrectly.size,
    totalCount: allQuestions.length,
  };
}
