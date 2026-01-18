-- Enable RLS on email_rate_limits table
-- Note: This table is only accessed by service role key in edge functions,
-- so we enable RLS but don't need policies (service role bypasses RLS)
ALTER TABLE public.email_rate_limits ENABLE ROW LEVEL SECURITY;