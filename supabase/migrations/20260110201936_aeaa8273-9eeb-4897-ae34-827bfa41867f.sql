-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view profiles for leaderboard" ON public.profiles;

-- Create a restrictive policy: users can only view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create a security definer function to get leaderboard profile data
-- This only exposes username and avatar_emoji, not full profile
CREATE OR REPLACE FUNCTION public.get_leaderboard_profile(profile_id uuid)
RETURNS TABLE(username text, avatar_emoji text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.username, p.avatar_emoji
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;

-- Drop and recreate leaderboard_scores view using the security definer function
DROP VIEW IF EXISTS public.leaderboard_scores;

CREATE VIEW public.leaderboard_scores AS
SELECT 
  lp.username,
  lp.avatar_emoji,
  COALESCE(sum(qs.score), 0::bigint) AS total_score,
  count(qs.id) AS quiz_count,
  COALESCE(round(avg(qs.percentage)), 0::numeric) AS avg_percentage
FROM quiz_scores qs
CROSS JOIN LATERAL public.get_leaderboard_profile(qs.user_id) lp
WHERE qs.created_at >= (now() - '30 days'::interval)
GROUP BY lp.username, lp.avatar_emoji
HAVING count(qs.id) > 0
ORDER BY COALESCE(sum(qs.score), 0::bigint) DESC
LIMIT 10;

-- Drop and recreate streak_leaderboard view using the security definer function
DROP VIEW IF EXISTS public.streak_leaderboard;

CREATE VIEW public.streak_leaderboard AS
SELECT 
  lp.username,
  lp.avatar_emoji,
  s.current_streak,
  s.longest_streak
FROM streaks s
CROSS JOIN LATERAL public.get_leaderboard_profile(s.user_id) lp
WHERE s.current_streak > 0
ORDER BY s.current_streak DESC, s.longest_streak DESC
LIMIT 20;