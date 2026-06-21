
-- 1) Realtime: drop the catch-all SELECT policy so only the scoped policy applies
DROP POLICY IF EXISTS "Authenticated can use realtime" ON realtime.messages;

-- 2) accelerator_credits: remove client INSERT; provide a SECURITY DEFINER RPC that validates inputs
DROP POLICY IF EXISTS "Users can insert their own credits" ON public.accelerator_credits;

CREATE OR REPLACE FUNCTION public.award_accelerator_credits(
  _credit_type text,
  _base_questions integer DEFAULT 1,
  _question_id text DEFAULT NULL,
  _source_id text DEFAULT NULL,
  _days_since_miss integer DEFAULT NULL,
  _difficulty_rating integer DEFAULT NULL,
  _metadata jsonb DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_multiplier numeric;
  v_credits numeric;
  v_id uuid;
  v_base integer := GREATEST(1, LEAST(COALESCE(_base_questions, 1), 100));
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  IF _credit_type NOT IN (
    'hard_question','spaced_repetition','master_weakness',
    'fight_club_participation','fight_club_win',
    'prediction_test','prediction_test_completion'
  ) THEN
    RAISE EXCEPTION 'invalid credit_type: %', _credit_type;
  END IF;

  v_multiplier := CASE _credit_type
    WHEN 'hard_question' THEN CASE WHEN COALESCE(_difficulty_rating, 0) >= 12 THEN 1.75 ELSE 1.5 END
    WHEN 'master_weakness' THEN 1.5
    WHEN 'fight_club_participation' THEN 1.1
    WHEN 'fight_club_win' THEN 1.3
    WHEN 'prediction_test' THEN 1.5
    WHEN 'prediction_test_completion' THEN 1.0
    WHEN 'spaced_repetition' THEN
      CASE
        WHEN COALESCE(_days_since_miss, 0) < 7 THEN 0
        WHEN _days_since_miss >= 21 THEN 2.0
        WHEN _days_since_miss >= 14 THEN 1.5
        ELSE 1.0 + ((_days_since_miss - 7)::numeric / 7) * 0.5
      END
  END;

  IF v_multiplier IS NULL OR v_multiplier = 0 THEN
    RETURN NULL;
  END IF;

  v_credits := v_base * v_multiplier;

  INSERT INTO public.accelerator_credits
    (user_id, credit_type, question_id, source_id, base_questions, multiplier, earned_credits, metadata)
  VALUES (v_user, _credit_type, _question_id, _source_id, v_base, v_multiplier, v_credits, _metadata)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.award_accelerator_credits(text, integer, text, text, integer, integer, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.award_accelerator_credits(text, integer, text, text, integer, integer, jsonb) TO authenticated;

-- 3) question_attempts: enforce kid_profile_id ownership in INSERT WITH CHECK
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.question_attempts;
CREATE POLICY "Users can insert their own attempts"
ON public.question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    kid_profile_id IS NULL
    OR EXISTS (
      SELECT 1 FROM public.kid_profiles
      WHERE id = kid_profile_id AND parent_id = auth.uid()
    )
  )
);

-- 4) profiles.summary_email: revoke column-level read; expose own value via RPC
REVOKE SELECT (summary_email) ON public.profiles FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_my_email_prefs()
RETURNS TABLE(weekly_summary_enabled boolean, summary_email text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT weekly_summary_enabled, summary_email
  FROM public.profiles
  WHERE id = auth.uid();
$$;

REVOKE ALL ON FUNCTION public.get_my_email_prefs() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_my_email_prefs() TO authenticated;
