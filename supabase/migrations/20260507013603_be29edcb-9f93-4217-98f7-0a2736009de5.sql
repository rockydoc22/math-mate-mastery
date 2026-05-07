
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS diagnostic_completed_at timestamptz;

CREATE TABLE IF NOT EXISTS public.question_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id text NOT NULL,
  question_type text NOT NULL,
  override_data jsonb NOT NULL,
  source_flag_id uuid,
  edited_by uuid,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (question_id, question_type)
);

ALTER TABLE public.question_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read overrides"
  ON public.question_overrides FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Mods/admins insert overrides"
  ON public.question_overrides FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));

CREATE POLICY "Mods/admins update overrides"
  ON public.question_overrides FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));

CREATE POLICY "Mods/admins delete overrides"
  ON public.question_overrides FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));

CREATE TRIGGER trg_question_overrides_updated_at
  BEFORE UPDATE ON public.question_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
