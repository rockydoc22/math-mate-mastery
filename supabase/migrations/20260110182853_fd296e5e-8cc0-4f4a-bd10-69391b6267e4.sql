-- Create a secure streak leaderboard view similar to leaderboard_scores
CREATE VIEW public.streak_leaderboard 
WITH (security_invoker = true) AS
SELECT 
  p.username,
  p.avatar_emoji,
  s.current_streak,
  s.longest_streak
FROM public.streaks s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.current_streak > 0
ORDER BY s.current_streak DESC, s.longest_streak DESC
LIMIT 20;

-- Grant access to authenticated users
GRANT SELECT ON public.streak_leaderboard TO authenticated;
GRANT SELECT ON public.streak_leaderboard TO anon;