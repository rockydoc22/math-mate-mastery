
-- AP progress persistence
CREATE TABLE public.ap_subject_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_id text NOT NULL,
  unit_id text NOT NULL,
  questions_attempted integer NOT NULL DEFAULT 0,
  questions_correct integer NOT NULL DEFAULT 0,
  last_practiced_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_id, unit_id)
);

ALTER TABLE public.ap_subject_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own AP progress" ON public.ap_subject_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AP progress" ON public.ap_subject_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AP progress" ON public.ap_subject_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Writing Lab analytics
CREATE TABLE public.writing_lab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module text NOT NULL,
  essay_type text NOT NULL,
  time_spent_seconds integer DEFAULT 0,
  ai_features_used text[] DEFAULT '{}',
  completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.writing_lab_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own writing sessions" ON public.writing_lab_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own writing sessions" ON public.writing_lab_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own writing sessions" ON public.writing_lab_sessions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
