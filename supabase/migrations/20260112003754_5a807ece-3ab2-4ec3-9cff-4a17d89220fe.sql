-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Personal Rulebook: Notes attached to missed questions
CREATE TABLE public.rulebook_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  attempt_id UUID REFERENCES public.question_attempts(id) ON DELETE CASCADE,
  error_pattern TEXT,
  trigger_phrase TEXT,
  prevention_rule TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Enable RLS
ALTER TABLE public.rulebook_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rulebook notes"
ON public.rulebook_notes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rulebook notes"
ON public.rulebook_notes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rulebook notes"
ON public.rulebook_notes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rulebook notes"
ON public.rulebook_notes FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_rulebook_notes_updated_at
BEFORE UPDATE ON public.rulebook_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();