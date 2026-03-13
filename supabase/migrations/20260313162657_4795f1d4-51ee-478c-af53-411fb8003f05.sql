
-- Add onboarding fields to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS grade_level text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS primary_goal text;

-- Add streak freeze tokens to streaks table
ALTER TABLE public.streaks ADD COLUMN IF NOT EXISTS freeze_tokens integer NOT NULL DEFAULT 2;
ALTER TABLE public.streaks ADD COLUMN IF NOT EXISTS freezes_used_this_month integer NOT NULL DEFAULT 0;
ALTER TABLE public.streaks ADD COLUMN IF NOT EXISTS freeze_month text;
