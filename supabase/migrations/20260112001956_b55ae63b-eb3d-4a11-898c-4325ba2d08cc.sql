-- Add first_missed_at column to track when a question was first missed
-- This is used for spaced repetition accelerator calculation
ALTER TABLE public.question_attempts ADD COLUMN IF NOT EXISTS first_missed_at TIMESTAMP WITH TIME ZONE;