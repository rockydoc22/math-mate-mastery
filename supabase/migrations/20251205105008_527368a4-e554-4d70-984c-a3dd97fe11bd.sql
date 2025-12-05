-- Study Mode: Save questions for later review
CREATE TABLE public.saved_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  question_type TEXT NOT NULL,
  was_wrong BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, question_id)
);

ALTER TABLE public.saved_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their saved questions" ON public.saved_questions
  FOR ALL USING (auth.uid() = user_id);

-- Daily Challenges tracking
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  challenge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 10,
  bonus_xp INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_date)
);

ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all daily challenges" ON public.daily_challenges
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own daily challenges" ON public.daily_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Friends system
CREATE TABLE public.friendships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their friendships" ON public.friendships
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Users can send friend requests" ON public.friendships
  FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update friend requests they received" ON public.friendships
  FOR UPDATE USING (auth.uid() = addressee_id);

-- Add avatar and theme to profiles
ALTER TABLE public.profiles 
ADD COLUMN avatar_emoji TEXT DEFAULT '😎',
ADD COLUMN theme_color TEXT DEFAULT 'purple';