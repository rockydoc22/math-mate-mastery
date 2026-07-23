
CREATE TABLE IF NOT EXISTS public.mastery_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_family text,
  section text,
  domain text,
  skill text NOT NULL,
  target integer NOT NULL DEFAULT 50,
  correct_count integer NOT NULL DEFAULT 0,
  daily_dose integer NOT NULL DEFAULT 20,
  status text NOT NULL DEFAULT 'active',
  last_dose_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS mastery_goals_user_skill_active_uidx
  ON public.mastery_goals (user_id, coalesce(exam_family,''), coalesce(domain,''), skill)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS mastery_goals_user_status_idx
  ON public.mastery_goals (user_id, status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mastery_goals TO authenticated;
GRANT ALL ON public.mastery_goals TO service_role;

ALTER TABLE public.mastery_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own mastery goals"
  ON public.mastery_goals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_mastery_goals_updated_at
  BEFORE UPDATE ON public.mastery_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
