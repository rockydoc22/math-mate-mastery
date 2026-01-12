-- Create accelerator_credits table to track earned question credits
CREATE TABLE public.accelerator_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_type TEXT NOT NULL, -- 'hard_question', 'spaced_repetition', 'master_weakness', 'fight_club_participation', 'fight_club_win', 'prediction_test'
  question_id TEXT, -- Optional: link to specific question
  source_id TEXT, -- Optional: battle room id, test id, etc.
  base_questions INTEGER NOT NULL DEFAULT 1, -- Base question value
  multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.0, -- Accelerator multiplier
  earned_credits NUMERIC(10,2) NOT NULL, -- Actual credits earned (base * multiplier)
  metadata JSONB, -- Additional context (difficulty, days_since_miss, etc.)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.accelerator_credits ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own credits"
ON public.accelerator_credits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
ON public.accelerator_credits FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Index for efficient queries
CREATE INDEX idx_accelerator_credits_user_id ON public.accelerator_credits(user_id);
CREATE INDEX idx_accelerator_credits_created_at ON public.accelerator_credits(created_at);
CREATE INDEX idx_accelerator_credits_type ON public.accelerator_credits(credit_type);

-- Add difficulty_rating to question_attempts for tracking hard questions
ALTER TABLE public.question_attempts ADD COLUMN IF NOT EXISTS difficulty_rating INTEGER;