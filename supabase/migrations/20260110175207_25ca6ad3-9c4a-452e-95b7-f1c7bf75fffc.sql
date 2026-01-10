-- Create study_plans table to store user's Brain Building Program
CREATE TABLE public.study_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    exam_date DATE NOT NULL,
    daily_minutes INTEGER NOT NULL DEFAULT 10 CHECK (daily_minutes >= 5 AND daily_minutes <= 20),
    baseline_score INTEGER DEFAULT 1200 CHECK (baseline_score >= 400 AND baseline_score <= 1600),
    target_score INTEGER DEFAULT 1600 CHECK (target_score >= 400 AND target_score <= 1600),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_reminder_shown TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, is_active) -- Only one active plan per user
);

-- Enable RLS
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own study plans"
ON public.study_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study plans"
ON public.study_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study plans"
ON public.study_plans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study plans"
ON public.study_plans FOR DELETE
USING (auth.uid() = user_id);

-- Add realtime for study plans
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_plans;