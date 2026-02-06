-- Fix: Replace overly permissive feedback insert policy
-- This addresses SUPA_rls_policy_always_true warning

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.user_feedback;

-- Create a more secure policy that:
-- 1. Allows anonymous users to submit feedback with NULL user_id
-- 2. Requires authenticated users to use their own user_id
CREATE POLICY "Validate user_id on feedback submission"
ON public.user_feedback
FOR INSERT
WITH CHECK (
  (auth.uid() IS NULL AND user_id IS NULL)
  OR (auth.uid() IS NOT NULL AND (user_id IS NULL OR user_id = auth.uid()))
);