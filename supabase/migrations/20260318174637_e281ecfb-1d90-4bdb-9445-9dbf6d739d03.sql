ALTER TABLE public.flagged_questions DROP CONSTRAINT flagged_questions_issue_type_check;
ALTER TABLE public.flagged_questions ADD CONSTRAINT flagged_questions_issue_type_check CHECK (issue_type = ANY (ARRAY['incorrect_answer'::text, 'typo'::text, 'unclear'::text, 'offensive'::text, 'other'::text, 'user_report'::text]));

ALTER TABLE public.flagged_questions DROP CONSTRAINT flagged_questions_question_type_check;
ALTER TABLE public.flagged_questions ADD CONSTRAINT flagged_questions_question_type_check CHECK (question_type = ANY (ARRAY['math'::text, 'english'::text, 'science'::text]));