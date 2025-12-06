-- Create skill ratings table for tracking student progress
CREATE TABLE public.skill_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  math_rating INTEGER NOT NULL DEFAULT 1200,
  english_rating INTEGER NOT NULL DEFAULT 1200,
  overall_rating INTEGER NOT NULL DEFAULT 1200,
  math_questions_answered INTEGER NOT NULL DEFAULT 0,
  english_questions_answered INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

-- Create rating history table for tracking progress over time
CREATE TABLE public.rating_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating_type TEXT NOT NULL CHECK (rating_type IN ('math', 'english', 'overall')),
  old_rating INTEGER NOT NULL,
  new_rating INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  question_difficulty INTEGER NOT NULL,
  was_correct BOOLEAN NOT NULL,
  rating_change INTEGER NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rating_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skill_ratings
CREATE POLICY "Users can view their own ratings"
  ON public.skill_ratings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ratings"
  ON public.skill_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON public.skill_ratings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for rating_history
CREATE POLICY "Users can view their own rating history"
  ON public.rating_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rating history"
  ON public.rating_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for efficient querying
CREATE INDEX idx_rating_history_user_date ON public.rating_history(user_id, recorded_at DESC);

-- Modify handle_new_user to also create initial skill ratings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'username', 'Student_' || LEFT(new.id::text, 8)));
  
  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (new.id, 0, 0);
  
  INSERT INTO public.skill_ratings (user_id, math_rating, english_rating, overall_rating)
  VALUES (new.id, 1200, 1200, 1200);
  
  RETURN new;
END;
$$;