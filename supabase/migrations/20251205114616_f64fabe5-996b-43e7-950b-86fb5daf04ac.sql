-- Create a leaderboard view that aggregates scores and joins with profiles
-- This exposes only necessary data (username, scores) without raw user_ids
CREATE OR REPLACE VIEW public.leaderboard_scores AS
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

-- Update the quiz_scores SELECT policy to authenticated users only
DROP POLICY IF EXISTS "Anyone can view quiz scores" ON public.quiz_scores;

CREATE POLICY "Authenticated users can view quiz scores" 
ON public.quiz_scores 
FOR SELECT 
USING (auth.uid() IS NOT NULL);