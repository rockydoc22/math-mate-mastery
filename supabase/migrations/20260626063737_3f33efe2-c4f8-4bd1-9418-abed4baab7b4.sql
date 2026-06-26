
-- 1. Column-level grants on profiles: revoke broad SELECT, re-grant only non-sensitive cols
REVOKE SELECT ON public.profiles FROM authenticated;
REVOKE SELECT ON public.profiles FROM anon;

GRANT SELECT (
  id, username, avatar_url, created_at, updated_at,
  avatar_emoji, theme_color, show_on_leaderboards, exam_type,
  pinned_subjects, grade_level, primary_goal, is_parent, num_kids,
  diagnostic_completed_at
) ON public.profiles TO authenticated;

-- Owner still needs to read their own sensitive prefs; do it via RPC get_my_email_prefs
-- (already exists in DB). No column grant needed for summary_email/weekly_summary_enabled.

GRANT ALL ON public.profiles TO service_role;

-- 2. fighter_avatars: allow battle opponents to view each other's avatars
CREATE POLICY "Opponents can view fighter avatar in active battle"
ON public.fighter_avatars
FOR SELECT
TO authenticated
USING (public.is_in_same_battle(auth.uid(), user_id));
