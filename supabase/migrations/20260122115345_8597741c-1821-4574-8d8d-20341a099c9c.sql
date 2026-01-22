-- Remove email PII from profiles table and harden auth-related RPCs / leaderboards

BEGIN;

-- 1) Remove unsafe SECURITY DEFINER lookup functions that enable enumeration
DROP FUNCTION IF EXISTS public.get_email_by_username(text);
DROP FUNCTION IF EXISTS public.get_username_by_email(text);

-- 2) Remove email column from profiles (emails should stay only in auth system)
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS email;

-- 3) Update new-user trigger to stop copying emails into profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'username', 'Student_' || LEFT(new.id::text, 8))
  );

  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (new.id, 0, 0);

  INSERT INTO public.skill_ratings (user_id, math_rating, english_rating, overall_rating)
  VALUES (new.id, 1200, 1200, 1200);

  RETURN new;
END;
$$;

-- 4) Leaderboard opt-out preference
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS show_on_leaderboards boolean NOT NULL DEFAULT true;

-- Recreate views to respect opt-out. Views use security invoker to respect caller RLS.
CREATE OR REPLACE VIEW public.leaderboard_scores
WITH (security_invoker=on)
AS
SELECT lp.username,
       lp.avatar_emoji,
       COALESCE(sum(qs.score), (0)::bigint) AS total_score,
       count(qs.id) AS quiz_count,
       COALESCE(round(avg(qs.percentage)), (0)::numeric) AS avg_percentage
  FROM quiz_scores qs
  JOIN public.profiles p ON p.id = qs.user_id
  CROSS JOIN LATERAL get_leaderboard_profile(qs.user_id) lp(username, avatar_emoji)
 WHERE qs.created_at >= (now() - '30 days'::interval)
   AND p.show_on_leaderboards = true
 GROUP BY lp.username, lp.avatar_emoji
HAVING count(qs.id) > 0
 ORDER BY COALESCE(sum(qs.score), (0)::bigint) DESC
 LIMIT 10;

CREATE OR REPLACE VIEW public.streak_leaderboard
WITH (security_invoker=on)
AS
SELECT lp.username,
       lp.avatar_emoji,
       s.current_streak,
       s.longest_streak
  FROM streaks s
  JOIN public.profiles p ON p.id = s.user_id
  CROSS JOIN LATERAL get_leaderboard_profile(s.user_id) lp(username, avatar_emoji)
 WHERE s.current_streak > 0
   AND p.show_on_leaderboards = true
 ORDER BY s.current_streak DESC, s.longest_streak DESC
 LIMIT 20;

-- 5) Tighten user_notification_settings visibility (only owner can read)
DROP POLICY IF EXISTS "Admins can read notification settings" ON public.user_notification_settings;

CREATE POLICY "Users can view their own notification settings"
ON public.user_notification_settings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

COMMIT;