import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Brain, Flame, BookOpen, Zap } from "lucide-react";
import WeakAreaPracticeCard from "@/components/WeakAreaPracticeCard";
import StudyStreakCard from "@/components/StudyStreakCard";
import FlashcardDeck from "@/components/FlashcardDeck";
import AdaptivePracticeSession from "@/components/AdaptivePracticeSession";
import { SkillMastery, PracticeQuestion } from "@/lib/weakAreaPracticeEngine";
import { StreakProgress } from "@/lib/streakRewards";
import { mockAdaptiveQuestions } from "@/mock/adaptivePracticeMock";
import { mockFlashcards } from "@/mock/flashcardMock";

const PracticeTools = () => {
  const { user } = useAuth();
  const [mastery, setMastery] = useState<SkillMastery[]>([]);
  const [streakProgress, setStreakProgress] = useState<StreakProgress>({
    currentStreak: 0, longestStreak: 0, daysStudiedThisWeek: 0, usedFreezeThisWeek: false,
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'adaptive'>('overview');

  useEffect(() => {
    if (!user) return;

    const fetchMastery = async () => {
      const { data } = await supabase
        .from("question_attempts")
        .select("skill, domain, question_type, is_correct")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1000);

      if (!data) return;

      const grouped = new Map<string, { correct: number; total: number; domain: string; skill: string; subject: string }>();
      for (const row of data) {
        const key = `${row.question_type}:${row.domain}:${row.skill}`;
        const existing = grouped.get(key) ?? { correct: 0, total: 0, domain: row.domain, skill: row.skill, subject: row.question_type === 'math' ? 'SAT Math' : 'SAT Reading' };
        existing.total += 1;
        if (row.is_correct) existing.correct += 1;
        grouped.set(key, existing);
      }

      const masteryData: SkillMastery[] = [...grouped.values()].map((g) => ({
        subject: g.subject,
        domain: g.domain,
        skill: g.skill,
        mastery: g.total > 0 ? Math.round((g.correct / g.total) * 100) : 50,
        recentAccuracy: g.total > 0 ? g.correct / g.total : undefined,
        recentAttempts: g.total,
      }));

      setMastery(masteryData);
    };

    const fetchStreak = async () => {
      const { data } = await supabase
        .from("streaks")
        .select("current_streak, longest_streak, freeze_tokens, freezes_used_this_month")
        .eq("user_id", user.id)
        .single();

      if (data) {
        // Count days studied this week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { count } = await supabase
          .from("question_attempts")
          .select("created_at", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", weekAgo.toISOString());

        setStreakProgress({
          currentStreak: data.current_streak,
          longestStreak: data.longest_streak,
          daysStudiedThisWeek: Math.min(7, count ?? 0),
          usedFreezeThisWeek: data.freezes_used_this_month > 0,
        });
      }
    };

    fetchMastery();
    fetchStreak();
  }, [user]);

  // Build a simple question bank from mastery data for WeakAreaPracticeCard
  const questionBank: PracticeQuestion[] = useMemo(() => {
    return mastery.slice(0, 5).map((m, i) => ({
      id: `wa-${i}`,
      subject: m.subject,
      domain: m.domain,
      skill: m.skill,
      difficulty: m.mastery < 40 ? 'easy' as const : m.mastery < 70 ? 'medium' as const : 'hard' as const,
      prompt: `Practice: ${m.skill}`,
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
    }));
  }, [mastery]);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Target },
    { id: 'adaptive' as const, label: 'Adaptive', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-7 h-7 text-primary" />
              Practice Tools
            </h1>
            <p className="text-sm text-muted-foreground">Your personalized practice hub</p>
          </div>
        </div>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <StudyStreakCard progress={streakProgress} />

            {mastery.length > 0 && (
              <WeakAreaPracticeCard
                mastery={mastery}
                questionBank={questionBank}
                onStartPractice={(ids) => console.log("Start practice with:", ids)}
              />
            )}

            <FlashcardDeck
              cards={mockFlashcards}
              onReview={(card, rating) => console.log("Reviewed:", card.term, rating)}
            />
          </div>
        )}

        {activeTab === 'adaptive' && (
          <AdaptivePracticeSession
            questions={mockAdaptiveQuestions}
            targetQuestionCount={5}
            onComplete={(result) => console.log("Session complete:", result)}
          />
        )}
      </div>
    </div>
  );
};

export default PracticeTools;
