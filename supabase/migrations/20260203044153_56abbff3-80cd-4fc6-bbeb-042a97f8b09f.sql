-- Fix security issues: Respect user privacy preferences in leaderboard views

-- 1. Drop and recreate leaderboard_scores view to respect show_on_leaderboards preference
DROP VIEW IF EXISTS public.leaderboard_scores;

CREATE VIEW public.leaderboard_scores
WITH (security_invoker=on) AS
SELECT 
    p.username,
    p.avatar_emoji,
    SUM(qs.score) as total_score,
    COUNT(qs.id) as quiz_count,
    ROUND(AVG(qs.percentage), 1) as avg_percentage
FROM public.quiz_scores qs
INNER JOIN public.profiles p ON qs.user_id = p.id
WHERE p.show_on_leaderboards = true
  AND qs.created_at >= (NOW() - INTERVAL '30 days')
GROUP BY p.id, p.username, p.avatar_emoji
ORDER BY total_score DESC
LIMIT 20;

-- 2. Drop and recreate streak_leaderboard view to respect show_on_leaderboards preference
DROP VIEW IF EXISTS public.streak_leaderboard;

CREATE VIEW public.streak_leaderboard
WITH (security_invoker=on) AS
SELECT 
    p.username,
    p.avatar_emoji,
    s.current_streak,
    s.longest_streak
FROM public.streaks s
INNER JOIN public.profiles p ON s.user_id = p.id
WHERE p.show_on_leaderboards = true
  AND s.current_streak > 0
ORDER BY s.current_streak DESC, s.longest_streak DESC
LIMIT 20;

-- 3. Drop and recreate profiles_public view to only show users who opted in
DROP VIEW IF EXISTS public.profiles_public;

CREATE VIEW public.profiles_public
WITH (security_invoker=on) AS
SELECT 
    id,
    username,
    avatar_emoji,
    avatar_url,
    theme_color,
    created_at,
    updated_at
FROM public.profiles
WHERE show_on_leaderboards = true;

-- 4. Remove the overly permissive quiz_scores policy that exposes all scores
DROP POLICY IF EXISTS "Authenticated users can view scores for leaderboard" ON public.quiz_scores;

-- 5. Remove the overly permissive streaks policy that exposes all streaks
DROP POLICY IF EXISTS "Authenticated users can view streaks for leaderboard" ON public.streaks;