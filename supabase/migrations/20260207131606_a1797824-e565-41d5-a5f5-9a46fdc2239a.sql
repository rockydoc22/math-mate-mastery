-- Allow viewing profiles that have opted into leaderboards
CREATE POLICY "Public profiles visible on leaderboard"
ON public.profiles
FOR SELECT
TO authenticated
USING (show_on_leaderboards = true);

-- Allow viewing quiz scores for users who opted into leaderboards
CREATE POLICY "Leaderboard scores are visible"
ON public.quiz_scores
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = quiz_scores.user_id 
    AND profiles.show_on_leaderboards = true
  )
);