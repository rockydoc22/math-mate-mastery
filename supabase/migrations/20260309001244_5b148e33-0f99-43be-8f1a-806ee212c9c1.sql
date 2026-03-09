-- Create personality_results table to store assessment results
CREATE TABLE public.personality_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  assessment_type TEXT NOT NULL, -- 'mbti', 'disc', 'enneagram', 'strengths'
  raw_scores JSONB NOT NULL, -- Stores raw scores for each dimension
  result_type TEXT NOT NULL, -- e.g., 'ENFP', 'Dominance', 'Type 7', etc.
  result_data JSONB NOT NULL, -- Detailed result info (percentages, descriptions, etc.)
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.personality_results ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own personality results" 
ON public.personality_results 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own personality results" 
ON public.personality_results 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own personality results" 
ON public.personality_results 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own personality results" 
ON public.personality_results 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_personality_results_updated_at
BEFORE UPDATE ON public.personality_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_personality_results_user_id ON public.personality_results(user_id);
CREATE INDEX idx_personality_results_assessment_type ON public.personality_results(assessment_type);
CREATE INDEX idx_personality_results_user_assessment ON public.personality_results(user_id, assessment_type);