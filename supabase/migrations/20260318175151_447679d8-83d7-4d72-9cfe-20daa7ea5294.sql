-- Kid profiles table: kids under a parent account (no separate auth needed)
CREATE TABLE public.kid_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  display_name text NOT NULL,
  avatar_emoji text DEFAULT '🧑‍🎓',
  grade_level text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.kid_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can manage their kids"
  ON public.kid_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- Add is_parent and num_kids to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_parent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS num_kids integer NOT NULL DEFAULT 0;

-- Trigger for updated_at
CREATE TRIGGER update_kid_profiles_updated_at
  BEFORE UPDATE ON public.kid_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();