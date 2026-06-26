
ALTER TABLE public.assessment_questions
  DROP CONSTRAINT IF EXISTS assessment_questions_difficulty_check;
ALTER TABLE public.assessment_questions
  ADD CONSTRAINT assessment_questions_difficulty_check CHECK (difficulty >= 1 AND difficulty <= 10);
