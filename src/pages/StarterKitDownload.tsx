import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const starterKit = {
  name: "Language Learning Starter Kit",
  version: "1.0",
  description: "Complete starter kit for building a language learning app with authentication, gamification, and spaced repetition",
  database: {
    migrations: `-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '📚',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Streaks table
CREATE TABLE public.streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_practice_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own streak" ON public.streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own streak" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);

-- Achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  achievement_type TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own achievements" ON public.achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz scores table
CREATE TABLE public.quiz_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own scores" ON public.quiz_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON public.quiz_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Question attempts for spaced repetition
CREATE TABLE public.question_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  question_id TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'vocabulary',
  domain TEXT NOT NULL DEFAULT 'general',
  skill TEXT NOT NULL DEFAULT 'recall',
  is_correct BOOLEAN NOT NULL,
  review_count INTEGER NOT NULL DEFAULT 0,
  next_review_at TIMESTAMP WITH TIME ZONE,
  first_missed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, question_id)
);
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own attempts" ON public.question_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON public.question_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attempts" ON public.question_attempts FOR UPDATE USING (auth.uid() = user_id);

-- Leaderboard view
CREATE OR REPLACE VIEW public.leaderboard_scores AS
SELECT p.username, p.avatar_emoji,
  COALESCE(SUM(qs.score), 0) as total_score,
  COUNT(qs.id) as quiz_count,
  COALESCE(AVG(qs.percentage), 0) as avg_percentage
FROM public.profiles p
LEFT JOIN public.quiz_scores qs ON p.user_id = qs.user_id
GROUP BY p.id, p.username, p.avatar_emoji
ORDER BY total_score DESC;

-- Auto-create profile and streak on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'Player'));
  INSERT INTO public.streaks (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`
  },
  files: {
    "src/hooks/useAuth.tsx": `import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}`,
    "src/hooks/useGameStats.tsx": `import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const ACHIEVEMENT_DEFS = [
  { id: 'first_quiz', name: 'First Steps', desc: 'Complete your first quiz', icon: '🎯' },
  { id: 'streak_3', name: 'On Fire', desc: '3 day streak', icon: '🔥' },
  { id: 'streak_7', name: 'Week Warrior', desc: '7 day streak', icon: '⚔️' },
  { id: 'perfect_score', name: 'Perfection', desc: 'Get 100% on a quiz', icon: '💯' },
  { id: 'quiz_10', name: 'Dedicated', desc: 'Complete 10 quizzes', icon: '📚' },
];

export function useGameStats() {
  const { user } = useAuth();
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [achievements, setAchievements] = useState<string[]>([]);
  const [quizCount, setQuizCount] = useState(0);

  const fetchStats = async () => {
    if (!user) return;
    
    const [streakRes, achieveRes, quizRes] = await Promise.all([
      supabase.from('streaks').select('*').eq('user_id', user.id).single(),
      supabase.from('achievements').select('achievement_type').eq('user_id', user.id),
      supabase.from('quiz_scores').select('id', { count: 'exact' }).eq('user_id', user.id)
    ]);

    if (streakRes.data) setStreak({ current: streakRes.data.current_streak, longest: streakRes.data.longest_streak });
    if (achieveRes.data) setAchievements(achieveRes.data.map(a => a.achievement_type));
    if (quizRes.count) setQuizCount(quizRes.count);
  };

  const updateStreak = async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase.from('streaks').select('*').eq('user_id', user.id).single();
    
    if (data) {
      const lastDate = data.last_practice_date;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let newStreak = data.current_streak;
      if (lastDate === yesterday) newStreak += 1;
      else if (lastDate !== today) newStreak = 1;
      
      const longest = Math.max(newStreak, data.longest_streak);
      
      await supabase.from('streaks').update({
        current_streak: newStreak,
        longest_streak: longest,
        last_practice_date: today
      }).eq('user_id', user.id);
      
      setStreak({ current: newStreak, longest });
      if (newStreak >= 3) unlockAchievement('streak_3');
      if (newStreak >= 7) unlockAchievement('streak_7');
    }
  };

  const unlockAchievement = async (type: string) => {
    if (!user || achievements.includes(type)) return;
    await supabase.from('achievements').insert({ user_id: user.id, achievement_type: type });
    setAchievements(prev => [...prev, type]);
  };

  const recordScore = async (subject: string, score: number, total: number) => {
    if (!user) return;
    const percentage = (score / total) * 100;
    await supabase.from('quiz_scores').insert({ user_id: user.id, subject, score, total_questions: total, percentage });
    
    await updateStreak();
    if (quizCount === 0) unlockAchievement('first_quiz');
    if (quizCount + 1 >= 10) unlockAchievement('quiz_10');
    if (percentage === 100) unlockAchievement('perfect_score');
    setQuizCount(prev => prev + 1);
  };

  useEffect(() => { fetchStats(); }, [user]);

  return { streak, achievements, quizCount, updateStreak, unlockAchievement, recordScore, ACHIEVEMENT_DEFS };
}`,
    "src/components/StreakBadge.tsx": `import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  currentStreak: number;
  className?: string;
}

export function StreakBadge({ currentStreak, className = '' }: StreakBadgeProps) {
  const getColor = () => {
    if (currentStreak >= 30) return 'text-purple-500';
    if (currentStreak >= 14) return 'text-orange-500';
    if (currentStreak >= 7) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <div className={\`flex items-center gap-1 \${className}\`}>
      <Flame className={\`w-5 h-5 \${getColor()}\`} />
      <span className="font-bold">{currentStreak}</span>
    </div>
  );
}`,
    "src/components/QuizCard.tsx": `import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  domain: string;
  skill: string;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, questionId: string) => void;
  showExplanation?: boolean;
}

export function QuizCard({ question, onAnswer, showExplanation = true }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    onAnswer(index === question.correctAnswer, question.id);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <p className="text-lg font-medium mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, idx) => (
            <Button
              key={idx}
              variant={answered ? (idx === question.correctAnswer ? 'default' : idx === selected ? 'destructive' : 'outline') : 'outline'}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleSelect(idx)}
              disabled={answered}
            >
              <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
              {option}
              {answered && idx === question.correctAnswer && <Check className="ml-auto w-4 h-4" />}
              {answered && idx === selected && idx !== question.correctAnswer && <X className="ml-auto w-4 h-4" />}
            </Button>
          ))}
        </div>
        {answered && showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}`,
    "src/data/questions.ts": `import { Question } from '@/components/QuizCard';

export const questions: Question[] = [
  {
    id: 'sp-1',
    question: 'How do you say "Hello" in Spanish?',
    options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
    correctAnswer: 1,
    explanation: '"Hola" is the Spanish word for "Hello". "Adiós" means goodbye.',
    domain: 'Greetings',
    skill: 'Basic Vocabulary'
  },
  {
    id: 'sp-2',
    question: 'What is "Thank you" in Spanish?',
    options: ['De nada', 'Por favor', 'Gracias', 'Lo siento'],
    correctAnswer: 2,
    explanation: '"Gracias" means "Thank you". "De nada" means "You\\'re welcome".',
    domain: 'Courtesy',
    skill: 'Basic Vocabulary'
  },
  {
    id: 'sp-3',
    question: 'How do you say "Good morning" in Spanish?',
    options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
    correctAnswer: 1,
    explanation: '"Buenos días" means "Good morning". "Buenas tardes" is "Good afternoon".',
    domain: 'Greetings',
    skill: 'Time-based Greetings'
  }
];`
  },
  spacedRepetition: {
    intervals: [1, 4, 24, 72, 168, 336],
    description: "Hours between reviews: 1h, 4h, 1d, 3d, 1w, 2w"
  },
  dependencies: [
    "@supabase/supabase-js",
    "lucide-react",
    "react-router-dom",
    "shadcn/ui components"
  ],
  setup: [
    "1. Run the SQL migration in your Supabase project",
    "2. Create the hook files in src/hooks/",
    "3. Create the component files in src/components/",
    "4. Wrap your App with AuthProvider",
    "5. Add your questions to src/data/questions.ts"
  ]
};

export default function StarterKitDownload() {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(starterKit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'language-learning-starter-kit.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-2xl font-bold">Language Learning Starter Kit</h1>
        <p className="text-muted-foreground">
          Complete starter kit with database schema, authentication, gamification hooks, and quiz components.
        </p>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Download Starter Kit
        </Button>
      </div>
    </div>
  );
}