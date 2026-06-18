ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS weekly_summary_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS summary_email text;