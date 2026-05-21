CREATE TABLE IF NOT EXISTS public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_family TEXT NOT NULL,
  test_code TEXT,
  section TEXT NOT NULL,
  domain TEXT NOT NULL,
  skill TEXT NOT NULL,
  subskill TEXT,
  difficulty SMALLINT NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  cognitive_tags TEXT[] DEFAULT '{}',
  trap_type TEXT,
  time_target_seconds INTEGER,
  stem TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_key TEXT NOT NULL,
  solution_markdown TEXT,
  wrong_answer_explanations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_aq_scope ON public.assessment_questions (exam_family, section, domain, skill);
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions readable by authed" ON public.assessment_questions FOR SELECT TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.student_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id UUID NOT NULL REFERENCES public.assessment_questions(id) ON DELETE CASCADE,
  session_id UUID,
  chosen_key TEXT,
  is_correct BOOLEAN NOT NULL,
  time_seconds INTEGER NOT NULL DEFAULT 0,
  confidence SMALLINT CHECK (confidence BETWEEN 1 AND 4),
  flagged BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sa_user_created ON public.student_attempts (user_id, created_at DESC);
ALTER TABLE public.student_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own attempts" ON public.student_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own attempts" ON public.student_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.adaptive_weakness_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exam_family TEXT NOT NULL,
  section TEXT NOT NULL,
  domain TEXT NOT NULL,
  skill TEXT NOT NULL,
  attempts_count INTEGER NOT NULL DEFAULT 0,
  accuracy NUMERIC(4,3) NOT NULL DEFAULT 0,
  avg_time_ratio NUMERIC(5,2) NOT NULL DEFAULT 1,
  trap_susceptibility NUMERIC(4,3) NOT NULL DEFAULT 0,
  mastery_level SMALLINT NOT NULL DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 4),
  priority_score NUMERIC(6,3) NOT NULL DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, exam_family, section, domain, skill)
);
ALTER TABLE public.adaptive_weakness_clusters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own clusters" ON public.adaptive_weakness_clusters FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.adaptive_teaching_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exam_family TEXT NOT NULL,
  section TEXT NOT NULL,
  skill TEXT NOT NULL,
  markdown_body TEXT NOT NULL,
  example_problems JSONB DEFAULT '[]'::jsonb,
  model TEXT NOT NULL DEFAULT 'google/gemini-2.5-flash',
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, exam_family, section, skill)
);
ALTER TABLE public.adaptive_teaching_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own teaching" ON public.adaptive_teaching_sections FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.recompute_weakness_clusters(_user_id UUID, _exam_family TEXT DEFAULT NULL)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_count INTEGER := 0;
BEGIN
  WITH recent AS (
    SELECT sa.*, q.exam_family, q.section, q.domain, q.skill, q.time_target_seconds, q.trap_type
    FROM public.student_attempts sa JOIN public.assessment_questions q ON q.id = sa.question_id
    WHERE sa.user_id = _user_id AND (_exam_family IS NULL OR q.exam_family = _exam_family)
      AND sa.created_at > now() - interval '90 days'
  ), agg AS (
    SELECT exam_family, section, domain, skill, COUNT(*)::int AS attempts_count,
      AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END)::numeric(4,3) AS accuracy,
      AVG(CASE WHEN COALESCE(time_target_seconds,0) > 0 THEN LEAST(5.0, time_seconds::numeric / time_target_seconds) ELSE 1.0 END)::numeric(5,2) AS avg_time_ratio,
      AVG(CASE WHEN NOT is_correct AND trap_type IS NOT NULL THEN 1.0 ELSE 0.0 END)::numeric(4,3) AS trap_susceptibility,
      MAX(created_at) AS last_attempt_at
    FROM recent GROUP BY exam_family, section, domain, skill
  )
  INSERT INTO public.adaptive_weakness_clusters (user_id, exam_family, section, domain, skill, attempts_count, accuracy, avg_time_ratio, trap_susceptibility, mastery_level, priority_score, last_attempt_at, updated_at)
  SELECT _user_id, exam_family, section, domain, skill, attempts_count, accuracy, avg_time_ratio, trap_susceptibility,
    CASE WHEN attempts_count < 3 THEN 0 WHEN accuracy >= 0.90 THEN 4 WHEN accuracy >= 0.80 THEN 3 WHEN accuracy >= 0.65 THEN 2 WHEN accuracy >= 0.40 THEN 1 ELSE 0 END,
    ((1.0 - accuracy) * 2.0 + GREATEST(0, avg_time_ratio - 1.0) * 0.5 + trap_susceptibility * 1.0) * LEAST(1.0, attempts_count / 5.0),
    last_attempt_at, now()
  FROM agg
  ON CONFLICT (user_id, exam_family, section, domain, skill) DO UPDATE SET
    attempts_count = EXCLUDED.attempts_count, accuracy = EXCLUDED.accuracy,
    avg_time_ratio = EXCLUDED.avg_time_ratio, trap_susceptibility = EXCLUDED.trap_susceptibility,
    mastery_level = EXCLUDED.mastery_level, priority_score = EXCLUDED.priority_score,
    last_attempt_at = EXCLUDED.last_attempt_at, updated_at = now();
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END; $$;