-- Create flagged_questions table
CREATE TABLE public.flagged_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('math', 'english')),
  issue_type TEXT NOT NULL CHECK (issue_type IN ('incorrect_answer', 'typo', 'unclear', 'offensive', 'other')),
  notes TEXT,
  reporter_ip TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.flagged_questions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (flag a question)
CREATE POLICY "Anyone can flag questions"
ON public.flagged_questions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view flagged questions (for admin)
CREATE POLICY "Authenticated users can view flagged questions"
ON public.flagged_questions
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update status
CREATE POLICY "Authenticated users can update flagged questions"
ON public.flagged_questions
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete flagged questions"
ON public.flagged_questions
FOR DELETE
TO authenticated
USING (true);