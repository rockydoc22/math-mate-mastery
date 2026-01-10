-- Drop the overly permissive SELECT policy on profiles
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

-- The "Users can view relevant profiles" policy remains, which allows:
-- - Users to view their own profile (auth.uid() = id)
-- - Users to view friends' profiles (is_friend function)
-- - Users to view battle participants' profiles (is_in_same_battle function)

-- Also ensure leaderboard views are only accessible to authenticated users (not anon/public)
-- This was already done but ensuring it's in place
REVOKE ALL ON public.leaderboard_scores FROM anon;
REVOKE ALL ON public.streak_leaderboard FROM anon;

-- Grant only to authenticated users
GRANT SELECT ON public.leaderboard_scores TO authenticated;
GRANT SELECT ON public.streak_leaderboard TO authenticated;