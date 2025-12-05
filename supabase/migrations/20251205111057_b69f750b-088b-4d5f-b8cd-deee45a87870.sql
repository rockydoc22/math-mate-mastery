-- Track individual question attempts for weak area analysis and spaced repetition
CREATE TABLE public.question_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    question_id text NOT NULL,
    question_type text NOT NULL, -- 'math' or 'english'
    domain text NOT NULL, -- category/domain of the question
    skill text NOT NULL, -- specific skill tested
    is_correct boolean NOT NULL,
    time_taken_ms integer,
    next_review_at timestamp with time zone, -- for spaced repetition
    review_count integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for efficient queries
CREATE INDEX idx_question_attempts_user_id ON public.question_attempts(user_id);
CREATE INDEX idx_question_attempts_next_review ON public.question_attempts(user_id, next_review_at);
CREATE INDEX idx_question_attempts_domain_skill ON public.question_attempts(user_id, domain, skill);

-- Enable RLS
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own attempts" ON public.question_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own attempts" ON public.question_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own attempts" ON public.question_attempts FOR UPDATE USING (auth.uid() = user_id);

-- Practice test results table
CREATE TABLE public.practice_tests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    test_type text NOT NULL DEFAULT 'full', -- 'full', 'math_only', 'english_only'
    math_score integer,
    english_score integer,
    total_score integer,
    time_taken_seconds integer,
    completed_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.practice_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tests" ON public.practice_tests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tests" ON public.practice_tests FOR INSERT WITH CHECK (auth.uid() = user_id);