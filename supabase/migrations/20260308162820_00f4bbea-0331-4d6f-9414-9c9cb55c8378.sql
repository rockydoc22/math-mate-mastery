CREATE TABLE public.solution_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  question_id TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'math',
  question_text TEXT NOT NULL,
  student_approach TEXT NOT NULL,
  ai_analysis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.solution_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own analyses" ON public.solution_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analyses" ON public.solution_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON public.solution_analyses
  FOR DELETE USING (auth.uid() = user_id);