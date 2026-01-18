-- Create rate limiting table for email endpoints
CREATE TABLE IF NOT EXISTS public.email_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_email_rate_limits_lookup ON public.email_rate_limits (email, endpoint, created_at);

-- Auto-cleanup old records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.email_rate_limits WHERE created_at < now() - interval '1 hour';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER cleanup_rate_limits_trigger
  AFTER INSERT ON public.email_rate_limits
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.cleanup_old_rate_limits();

-- No RLS needed - this table is only accessed by service role in edge functions

-- Create a public view for profiles that excludes email
CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
  SELECT 
    id,
    username,
    avatar_url,
    avatar_emoji,
    theme_color,
    created_at,
    updated_at
  FROM public.profiles;

-- Drop the problematic SELECT policy that exposes email to friends/battle participants
DROP POLICY IF EXISTS "Users can view relevant profiles" ON public.profiles;

-- The existing "Users can view own profile" policy remains - users can only view their own full profile
-- For other users' public info (username, avatar), they must use profiles_public view

-- Grant access to the view for authenticated users
GRANT SELECT ON public.profiles_public TO authenticated;