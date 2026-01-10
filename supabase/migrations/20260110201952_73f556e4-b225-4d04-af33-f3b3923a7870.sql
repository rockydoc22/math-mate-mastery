-- The views themselves are not SECURITY DEFINER, they just call a SECURITY DEFINER function
-- which is the correct pattern. However, the linter may be confused.
-- Let's explicitly set the views to use SECURITY INVOKER (the default) to be clear

DROP VIEW IF EXISTS public.leaderboard_scores;
DROP VIEW IF EXISTS public.streak_leaderboard;

-- Recreate with explicit security_invoker = true
CREATE VIEW public.leaderboard_scores
WITH (security_invoker = true)
AS
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

CREATE VIEW public.streak_leaderboard
WITH (security_invoker = true)
AS
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