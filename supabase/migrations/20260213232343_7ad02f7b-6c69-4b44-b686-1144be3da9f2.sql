
-- Add exam_type column to profiles (sat, psat, act)
ALTER TABLE public.profiles 
ADD COLUMN exam_type TEXT NOT NULL DEFAULT 'sat'
CHECK (exam_type IN ('sat', 'psat', 'act'));

-- Index for filtering
CREATE INDEX idx_profiles_exam_type ON public.profiles(exam_type);
