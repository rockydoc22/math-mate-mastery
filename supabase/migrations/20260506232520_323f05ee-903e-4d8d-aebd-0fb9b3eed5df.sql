
CREATE TABLE public.onboarding_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  event TEXT NOT NULL,
  step_index INTEGER,
  stage TEXT,
  goal TEXT,
  exam TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert onboarding events"
  ON public.onboarding_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "users can view own onboarding events"
  ON public.onboarding_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX idx_onboarding_events_user ON public.onboarding_events(user_id, created_at DESC);
CREATE INDEX idx_onboarding_events_event ON public.onboarding_events(event, created_at DESC);
