-- Recreate the view with explicit SECURITY INVOKER (recommended)
DROP VIEW IF EXISTS public.leaderboard_scores;

CREATE VIEW public.leaderboard_scores 
WITH (security_invoker = true) AS
SELECT 
  p.username,
  p.avatar_emoji,
  COUNT(qs.id) as quiz_count,
  SUM(qs.score) as total_score,
  ROUND(AVG(qs.percentage)) as avg_percentage
FROM public.quiz_scores qs
JOIN public.profiles p ON p.id = qs.user_id
GROUP BY p.id, p.username, p.avatar_emoji
ORDER BY total_score DESC
LIMIT 100;

-- Grant public access to the view
GRANT SELECT ON public.leaderboard_scores TO anon, authenticated;