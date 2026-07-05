
-- 1) Revoke column-level access to class_code from regular users
REVOKE SELECT (class_code) ON public.classrooms FROM authenticated;
REVOKE SELECT (class_code) ON public.classrooms FROM anon;

-- 2) Harden onboarding_events SELECT policy: authenticated role only, require non-null user_id
DROP POLICY IF EXISTS "users can view own onboarding events" ON public.onboarding_events;
CREATE POLICY "users can view own onboarding events"
ON public.onboarding_events
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND auth.uid() = user_id);
