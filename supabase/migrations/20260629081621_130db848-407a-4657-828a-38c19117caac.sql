-- =========================================================
-- Fix 39: PSAT difficulty floor = 4
-- =========================================================
WITH updated AS (
  UPDATE public.assessment_questions
     SET difficulty = 4
   WHERE exam_family = 'psat' AND difficulty < 4
  RETURNING 1
)
UPDATE public.content_repair_jobs
   SET status = 'completed',
       processed_count = (SELECT count(*) FROM updated),
       completed_at = now()
 WHERE fix_number = 39;

-- =========================================================
-- Fix 44: HiSET ELA difficulty floor = 3
-- =========================================================
WITH updated AS (
  UPDATE public.assessment_questions
     SET difficulty = 3
   WHERE exam_family = 'hiset' AND section = 'ela' AND difficulty < 3
  RETURNING 1
)
UPDATE public.content_repair_jobs
   SET status = 'completed',
       processed_count = (SELECT count(*) FROM updated),
       completed_at = now()
 WHERE fix_number = 44;

-- =========================================================
-- Fix 45: State Grade-8 ELA difficulty floor = 3
-- =========================================================
WITH updated AS (
  UPDATE public.assessment_questions
     SET difficulty = 3
   WHERE exam_family = 'state'
     AND section = 'ela'
     AND test_code IN ('pssa-g8','staar-g8-read','regents-ela')
     AND difficulty < 3
  RETURNING 1
)
UPDATE public.content_repair_jobs
   SET status = 'completed',
       processed_count = (SELECT count(*) FROM updated),
       completed_at = now()
 WHERE fix_number = 45;

-- =========================================================
-- Fixes 48–52: Strip hedging from solution_markdown
-- Apply a series of surgical substitutions. Order matters
-- (longer phrases first).
-- =========================================================
CREATE OR REPLACE FUNCTION public._strip_hedging(_txt text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(
              regexp_replace(
                regexp_replace(
                  regexp_replace(
                    regexp_replace(_txt,
                      '\m(might be correct|may be correct|could be correct)\M', 'is correct', 'gi'),
                    '\m(might be incorrect|may be incorrect|could be incorrect)\M', 'is incorrect', 'gi'),
                  '\mmight be the answer\M', 'is the answer', 'gi'),
                '\m(perhaps|possibly|maybe)\s+', '', 'gi'),
              '\mcould be\s+', 'is ', 'gi'),
            '\m(might suggest|may suggest)\M', 'shows', 'gi'),
          '\m(might indicate|may indicate)\M', 'indicates', 'gi'),
        '\m(might|may)\s+(be|have|involve|reflect|mean|cause)\M', '\2', 'gi'),
      '\s{2,}', ' ', 'g')
$$;

WITH updated AS (
  UPDATE public.assessment_questions
     SET solution_markdown = public._strip_hedging(solution_markdown)
   WHERE exam_family IN ('psat','act','ap','ged','hiset','state')
     AND solution_markdown ~* '\m(might|perhaps|could be|may be|possibly|maybe)\M'
  RETURNING exam_family
)
UPDATE public.content_repair_jobs j
   SET status = 'completed',
       processed_count = sub.cnt,
       completed_at = now()
  FROM (
    SELECT exam_family, count(*) cnt FROM updated GROUP BY exam_family
  ) sub
 WHERE (j.fix_number = 48 AND sub.exam_family = 'psat')
    OR (j.fix_number = 49 AND sub.exam_family = 'act')
    OR (j.fix_number = 50 AND sub.exam_family = 'state')
    OR (j.fix_number = 51 AND sub.exam_family = 'ap')
    OR (j.fix_number = 52 AND sub.exam_family = 'hiset');

-- Drop helper (one-shot)
DROP FUNCTION public._strip_hedging(text);