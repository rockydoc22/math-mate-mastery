
-- 1) profiles: remove broad leaderboard SELECT policy (use profiles_public view instead)
DROP POLICY IF EXISTS "Public profiles visible on leaderboard" ON public.profiles;

-- 2) accelerator_credits: explicit deny for client writes (writes go through award_accelerator_credits SECURITY DEFINER RPC)
DROP POLICY IF EXISTS "Block client inserts on accelerator_credits" ON public.accelerator_credits;
DROP POLICY IF EXISTS "Block client updates on accelerator_credits" ON public.accelerator_credits;
DROP POLICY IF EXISTS "Block client deletes on accelerator_credits" ON public.accelerator_credits;
CREATE POLICY "Block client inserts on accelerator_credits"
  ON public.accelerator_credits FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on accelerator_credits"
  ON public.accelerator_credits FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on accelerator_credits"
  ON public.accelerator_credits FOR DELETE TO authenticated USING (false);

-- 3) classrooms: hide class_code from non-teachers via column-level grants
REVOKE SELECT ON public.classrooms FROM authenticated;
GRANT SELECT (id, teacher_id, name, description, created_at, updated_at) ON public.classrooms TO authenticated;
GRANT ALL ON public.classrooms TO service_role;

-- Teachers retrieve their own class_code via SECURITY DEFINER RPC
CREATE OR REPLACE FUNCTION public.get_classroom_code(_classroom_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT class_code FROM public.classrooms
  WHERE id = _classroom_id AND teacher_id = auth.uid()
$$;

-- Students join by code via SECURITY DEFINER RPC (no need to read class_code)
CREATE OR REPLACE FUNCTION public.join_classroom_by_code(_code text)
RETURNS TABLE(id uuid, name text) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_user uuid := auth.uid();
  v_id uuid;
  v_name text;
BEGIN
  IF v_user IS NULL THEN RAISE EXCEPTION 'unauthorized'; END IF;
  SELECT c.id, c.name INTO v_id, v_name
    FROM public.classrooms c
   WHERE c.class_code = upper(trim(_code));
  IF v_id IS NULL THEN RAISE EXCEPTION 'not_found'; END IF;
  INSERT INTO public.classroom_members (classroom_id, user_id, role)
    VALUES (v_id, v_user, 'student')
    ON CONFLICT DO NOTHING;
  RETURN QUERY SELECT v_id, v_name;
END $$;
