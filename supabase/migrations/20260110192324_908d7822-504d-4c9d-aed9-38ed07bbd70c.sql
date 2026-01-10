-- Drop the overly permissive SELECT policy on quiz_scores
DROP POLICY IF EXISTS "Authenticated users can view all scores for leaderboard" ON public.quiz_scores;

-- Users can only view their own quiz scores (this policy already exists, just ensuring it's the only one)
-- The leaderboard_scores view will handle aggregated data for authenticated users

-- Update leaderboard_scores view to only be accessible to authenticated users (remove anon access)
REVOKE SELECT ON public.leaderboard_scores FROM anon;

-- Update streak_leaderboard view to only be accessible to authenticated users (remove anon access)
REVOKE SELECT ON public.streak_leaderboard FROM anon;