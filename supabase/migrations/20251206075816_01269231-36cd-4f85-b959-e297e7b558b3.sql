-- Restrict leaderboard_scores view to authenticated users only
-- Revoke access from anonymous/unauthenticated users
REVOKE ALL ON public.leaderboard_scores FROM anon;

-- Ensure authenticated users can still view it
GRANT SELECT ON public.leaderboard_scores TO authenticated;