-- 1) question_explanation_overrides: restrict SELECT to authenticated only
DROP POLICY IF EXISTS "Anyone can read explanation overrides" ON public.question_explanation_overrides;

CREATE POLICY "Authenticated can read explanation overrides"
ON public.question_explanation_overrides
FOR SELECT
TO authenticated
USING (true);

REVOKE SELECT ON public.question_explanation_overrides FROM anon;

-- 2) question_overrides: hide moderator-only columns (notes, edited_by) from regular authenticated users.
REVOKE SELECT ON public.question_overrides FROM authenticated;

GRANT SELECT (id, question_id, question_type, override_data, source_flag_id, created_at, updated_at)
  ON public.question_overrides TO authenticated;

-- Ensure service_role and any admin/mod paths still get everything
GRANT ALL ON public.question_overrides TO service_role;