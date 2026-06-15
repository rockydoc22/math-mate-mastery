
-- 1. accelerator_credits: cap per-row earned_credits
ALTER TABLE public.accelerator_credits
  DROP CONSTRAINT IF EXISTS accelerator_credits_earned_bounds;
ALTER TABLE public.accelerator_credits
  ADD CONSTRAINT accelerator_credits_earned_bounds
  CHECK (earned_credits >= -10000 AND earned_credits <= 500);

-- 2. quiz_scores: internal consistency
ALTER TABLE public.quiz_scores
  DROP CONSTRAINT IF EXISTS quiz_scores_bounds,
  DROP CONSTRAINT IF EXISTS quiz_scores_percentage_consistent;
ALTER TABLE public.quiz_scores
  ADD CONSTRAINT quiz_scores_bounds
  CHECK (
    total_questions BETWEEN 1 AND 500
    AND score >= 0
    AND score <= total_questions
    AND percentage >= 0 AND percentage <= 100
  );
ALTER TABLE public.quiz_scores
  ADD CONSTRAINT quiz_scores_percentage_consistent
  CHECK ( abs(percentage - round((score::numeric / total_questions) * 100)) <= 1 );

-- 3. rating_history: bound per-event changes
ALTER TABLE public.rating_history
  DROP CONSTRAINT IF EXISTS rating_history_bounds;
ALTER TABLE public.rating_history
  ADD CONSTRAINT rating_history_bounds
  CHECK (
    rating_change BETWEEN -100 AND 100
    AND new_rating BETWEEN 100 AND 3000
    AND old_rating BETWEEN 100 AND 3000
  );

-- 4. skill_ratings: validation trigger limiting delta per update + bounds
CREATE OR REPLACE FUNCTION public.validate_skill_rating_change()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Allow service_role (backend) to bypass guardrails
  IF current_setting('request.jwt.claim.role', true) = 'service_role'
     OR auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- Bound absolute ratings
  IF NEW.math_rating    < 100 OR NEW.math_rating    > 3000
  OR NEW.english_rating < 100 OR NEW.english_rating > 3000
  OR NEW.overall_rating < 100 OR NEW.overall_rating > 3000 THEN
    RAISE EXCEPTION 'skill_ratings out of allowed range (100-3000)';
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF abs(NEW.math_rating    - OLD.math_rating)    > 100
    OR abs(NEW.english_rating - OLD.english_rating) > 100
    OR abs(NEW.overall_rating - OLD.overall_rating) > 100 THEN
      RAISE EXCEPTION 'skill_ratings change too large (>100 per update)';
    END IF;

    -- Question counters may only increase, by at most 1 per update
    IF NEW.math_questions_answered < OLD.math_questions_answered
    OR NEW.english_questions_answered < OLD.english_questions_answered
    OR (NEW.math_questions_answered    - OLD.math_questions_answered)    > 1
    OR (NEW.english_questions_answered - OLD.english_questions_answered) > 1 THEN
      RAISE EXCEPTION 'skill_ratings question counters can only increment by 1';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_skill_rating_change_trigger ON public.skill_ratings;
CREATE TRIGGER validate_skill_rating_change_trigger
BEFORE INSERT OR UPDATE ON public.skill_ratings
FOR EACH ROW EXECUTE FUNCTION public.validate_skill_rating_change();
