-- Fix 1: Restrict achievement visibility to own achievements only
DROP POLICY IF EXISTS "Authenticated users can view achievements" ON public.achievements;

CREATE POLICY "Users can view own achievements"
ON public.achievements FOR SELECT
USING (auth.uid() = user_id);

-- Fix 2: Require authentication for flagging questions (prevent spam)
DROP POLICY IF EXISTS "Anyone can flag questions" ON public.flagged_questions;

CREATE POLICY "Authenticated users can flag questions"
ON public.flagged_questions FOR INSERT
TO authenticated
WITH CHECK (true);