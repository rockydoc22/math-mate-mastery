
ALTER TABLE public.question_attempts 
ADD COLUMN kid_profile_id uuid REFERENCES public.kid_profiles(id) ON DELETE SET NULL;

CREATE INDEX idx_question_attempts_kid_profile_id ON public.question_attempts(kid_profile_id);
