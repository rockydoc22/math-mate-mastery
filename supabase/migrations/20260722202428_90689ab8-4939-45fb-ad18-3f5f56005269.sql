ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age_band text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS self_ratings jsonb NOT NULL DEFAULT '{}'::jsonb;