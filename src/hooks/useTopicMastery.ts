import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  ALL_TOPICS, 
  TopicDefinition, 
  MASTERY_THRESHOLD, 
  MIN_QUESTIONS_FOR_MASTERY,
  getTopicForSkill,
  calculateMasteryStatus
} from "@/utils/topicMastery";

export interface TopicProgress {
  topic: TopicDefinition;
  attempted: number;
  correct: number;
  accuracy: number;
  isMastered: boolean;
  masteredAt: string | null;
  questionsNeeded: number;
}

export const useTopicMastery = () => {
  const { user } = useAuth();
  const [mathProgress, setMathProgress] = useState<TopicProgress[]>([]);
  const [englishProgress, setEnglishProgress] = useState<TopicProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMastered, setTotalMastered] = useState({ math: 0, english: 0 });

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch existing mastery records
      const { data: masteryData } = await supabase
        .from("topic_mastery")
        .select("*")
        .eq("user_id", user.id);

      // Fetch question attempts to calculate current stats
      const { data: attempts } = await supabase
        .from("question_attempts")
        .select("skill, question_type, is_correct")
        .eq("user_id", user.id);

      // Calculate progress for each topic
      const mathTopics: TopicProgress[] = [];
      const englishTopics: TopicProgress[] = [];

      ALL_TOPICS.forEach(topic => {
        // Find matching attempts based on skills
        const topicAttempts = (attempts || []).filter(a => {
          const matchesSubject = (topic.subject === 'math' && a.question_type === 'math') ||
                                  (topic.subject === 'english' && a.question_type === 'english');
          if (!matchesSubject) return false;
          
          return topic.skills.some(s => 
            a.skill?.toLowerCase().includes(s.toLowerCase()) || 
            s.toLowerCase().includes(a.skill?.toLowerCase() || '')
          );
        });

        const attempted = topicAttempts.length;
        const correct = topicAttempts.filter(a => a.is_correct).length;
        const { accuracy, isMastered, questionsNeeded } = calculateMasteryStatus(attempted, correct);

        // Check if we have a saved mastery record
        const savedMastery = masteryData?.find(m => m.topic_key === topic.key);

        const progress: TopicProgress = {
          topic,
          attempted,
          correct,
          accuracy,
          isMastered: savedMastery?.is_mastered || isMastered,
          masteredAt: savedMastery?.mastered_at || null,
          questionsNeeded,
        };

        if (topic.subject === 'math') {
          mathTopics.push(progress);
        } else {
          englishTopics.push(progress);
        }

        // Update mastery in database if newly mastered
        if (isMastered && !savedMastery?.is_mastered) {
          updateMasteryRecord(topic, attempted, correct, accuracy, true);
        }
      });

      // Sort by accuracy (lowest first to prioritize weak areas)
      mathTopics.sort((a, b) => a.accuracy - b.accuracy);
      englishTopics.sort((a, b) => a.accuracy - b.accuracy);

      setMathProgress(mathTopics);
      setEnglishProgress(englishTopics);
      setTotalMastered({
        math: mathTopics.filter(t => t.isMastered).length,
        english: englishTopics.filter(t => t.isMastered).length,
      });
    } catch (error) {
      console.error("Error fetching topic mastery:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateMasteryRecord = async (
    topic: TopicDefinition,
    attempted: number,
    correct: number,
    accuracy: number,
    isMastered: boolean
  ) => {
    if (!user) return;

    await supabase
      .from("topic_mastery")
      .upsert({
        user_id: user.id,
        subject: topic.subject,
        topic_key: topic.key,
        topic_name: topic.name,
        questions_attempted: attempted,
        questions_correct: correct,
        accuracy_percentage: accuracy,
        is_mastered: isMastered,
        mastered_at: isMastered ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,topic_key',
      });
  };

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Get weakest topics (for focused drilling)
  const weakestMathTopics = mathProgress.filter(t => !t.isMastered && t.attempted > 0).slice(0, 3);
  const weakestEnglishTopics = englishProgress.filter(t => !t.isMastered && t.attempted > 0).slice(0, 3);

  // Get next topics to work on (not mastered, low attempts)
  const nextMathTopics = mathProgress.filter(t => !t.isMastered).slice(0, 3);
  const nextEnglishTopics = englishProgress.filter(t => !t.isMastered).slice(0, 3);

  return {
    mathProgress,
    englishProgress,
    loading,
    totalMastered,
    weakestMathTopics,
    weakestEnglishTopics,
    nextMathTopics,
    nextEnglishTopics,
    refetch: fetchProgress,
    masteryThreshold: MASTERY_THRESHOLD,
    minQuestions: MIN_QUESTIONS_FOR_MASTERY,
  };
};
