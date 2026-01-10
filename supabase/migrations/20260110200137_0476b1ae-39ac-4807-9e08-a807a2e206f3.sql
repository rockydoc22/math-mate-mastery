-- Drop and recreate views with security_invoker = true
DROP VIEW IF EXISTS public.leaderboard_scores;
DROP VIEW IF EXISTS public.streak_leaderboard;

-- Recreate leaderboard_scores view with security_invoker for authenticated access
CREATE VIEW public.leaderboard_scores 
WITH (security_invoker = true)
AS
SELECT 
  p.username,
  p.avatar_emoji,
  COALESCE(sum(qs.score), 0::bigint) AS total_score,
  count(qs.id) AS quiz_count,
  COALESCE(round(avg(qs.percentage)), 0::numeric) AS avg_percentage
FROM profiles p
LEFT JOIN quiz_scores qs ON p.id = qs.user_id AND qs.created_at >= (now() - '30 days'::interval)
GROUP BY p.id, p.username, p.avatar_emoji
HAVING count(qs.id) > 0
ORDER BY COALESCE(sum(qs.score), 0::bigint) DESC
LIMIT 10;

-- Recreate streak_leaderboard view with security_invoker for authenticated access
CREATE VIEW public.streak_leaderboard
WITH (security_invoker = true)
AS
SELECT 
  p.username,
  p.avatar_emoji,
  s.current_streak,
  s.longest_streak
FROM streaks s
JOIN profiles p ON p.id = s.user_id
WHERE s.current_streak > 0
ORDER BY s.current_streak DESC, s.longest_streak DESC
LIMIT 20;

-- Add RLS policy on profiles to allow authenticated users to view username/avatar for leaderboard
-- (Only expose non-sensitive leaderboard fields)
CREATE POLICY "Authenticated users can view profiles for leaderboard"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Add RLS policy on quiz_scores to allow authenticated users to view scores for leaderboard
CREATE POLICY "Authenticated users can view scores for leaderboard"
ON public.quiz_scores
FOR SELECT
TO authenticated
USING (true);

-- Add RLS policy on streaks to allow authenticated users to view streaks for leaderboard
CREATE POLICY "Authenticated users can view streaks for leaderboard"
ON public.streaks
FOR SELECT
TO authenticated
USING (true);