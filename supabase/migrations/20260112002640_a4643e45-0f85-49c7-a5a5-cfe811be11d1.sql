-- Add error categorization to question_attempts
ALTER TABLE public.question_attempts 
ADD COLUMN IF NOT EXISTS miss_reason TEXT CHECK (miss_reason IN ('careless', 'concept_gap', 'timing', 'trap_answer', 'guessed')),
ADD COLUMN IF NOT EXISTS miss_reason_noted_at TIMESTAMP WITH TIME ZONE;

-- Create topic_mastery table to track 90% thresholds per skill
CREATE TABLE public.topic_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL, -- 'math' or 'english'
  topic_key TEXT NOT NULL, -- e.g., 'linear_equations', 'comma_rules'
  topic_name TEXT NOT NULL, -- Display name
  questions_attempted INTEGER NOT NULL DEFAULT 0,
  questions_correct INTEGER NOT NULL DEFAULT 0,
  accuracy_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  is_mastered BOOLEAN NOT NULL DEFAULT false,
  mastered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_key)
);

-- Enable RLS
ALTER TABLE public.topic_mastery ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own mastery"
ON public.topic_mastery FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mastery"
ON public.topic_mastery FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mastery"
ON public.topic_mastery FOR UPDATE
USING (auth.uid() = user_id);

-- Index for efficient queries
CREATE INDEX idx_topic_mastery_user_id ON public.topic_mastery(user_id);
CREATE INDEX idx_topic_mastery_subject ON public.topic_mastery(subject);