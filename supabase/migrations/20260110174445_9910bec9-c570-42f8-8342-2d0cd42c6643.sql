-- Recreate the view with security_invoker = true to use querying user's permissions
DROP VIEW IF EXISTS public.leaderboard_scores;

CREATE VIEW public.leaderboard_scores 
WITH (security_invoker = true) AS
SELECT 
  p.username,
  p.avatar_emoji,
  COALESCE(SUM(qs.score), 0) as total_score,
  COUNT(qs.id) as quiz_count,
  COALESCE(ROUND(AVG(qs.percentage)), 0) as avg_percentage
FROM public.profiles p
LEFT JOIN public.quiz_scores qs ON p.id = qs.user_id 
  AND qs.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.id, p.username, p.avatar_emoji
HAVING COUNT(qs.id) > 0
ORDER BY total_score DESC
LIMIT 10;

-- Grant access to the view
GRANT SELECT ON public.leaderboard_scores TO anon, authenticated;