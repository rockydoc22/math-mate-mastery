
CREATE OR REPLACE FUNCTION public.get_home_dashboard_stats(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
  total_count bigint;
  recent_correct bigint;
  profile_row record;
  practice_dates_arr text[];
  week_ago timestamptz := now() - interval '7 days';
  cal_start timestamptz := now() - interval '84 days';
BEGIN
  -- Total questions answered
  SELECT count(*) INTO total_count
  FROM question_attempts WHERE user_id = p_user_id;

  -- Recent correct (last 7 days)
  SELECT count(*) INTO recent_correct
  FROM question_attempts
  WHERE user_id = p_user_id AND is_correct = true AND created_at >= week_ago;

  -- Profile
  SELECT username, avatar_emoji, pinned_subjects
  INTO profile_row
  FROM profiles WHERE id = p_user_id;

  -- Practice dates (last 84 days)
  SELECT array_agg(DISTINCT created_at::date::text)
  INTO practice_dates_arr
  FROM question_attempts
  WHERE user_id = p_user_id AND created_at >= cal_start;

  SELECT json_build_object(
    'total_questions', COALESCE(total_count, 0),
    'recent_correct', COALESCE(recent_correct, 0),
    'username', COALESCE(profile_row.username, 'Fighter'),
    'avatar_emoji', COALESCE(profile_row.avatar_emoji, '🧑‍🚀'),
    'pinned_subjects', COALESCE(profile_row.pinned_subjects, ARRAY[]::text[]),
    'practice_dates', COALESCE(practice_dates_arr, ARRAY[]::text[])
  ) INTO result;

  RETURN result;
END;
$$;
