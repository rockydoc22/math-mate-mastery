-- Add explicit RLS policies to email_rate_limits table
-- These policies deny all direct access from end users
-- Only backend/edge functions using service role key can access this table

-- Deny all SELECT access to authenticated users
CREATE POLICY "No direct select access"
ON public.email_rate_limits
FOR SELECT
TO authenticated
USING (false);

-- Deny all SELECT access to anonymous users
CREATE POLICY "No anonymous select access"
ON public.email_rate_limits
FOR SELECT
TO anon
USING (false);

-- Deny all INSERT access to authenticated users
CREATE POLICY "No direct insert access"
ON public.email_rate_limits
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Deny all INSERT access to anonymous users
CREATE POLICY "No anonymous insert access"
ON public.email_rate_limits
FOR INSERT
TO anon
WITH CHECK (false);

-- Deny all UPDATE access to authenticated users
CREATE POLICY "No direct update access"
ON public.email_rate_limits
FOR UPDATE
TO authenticated
USING (false);

-- Deny all UPDATE access to anonymous users
CREATE POLICY "No anonymous update access"
ON public.email_rate_limits
FOR UPDATE
TO anon
USING (false);

-- Deny all DELETE access to authenticated users
CREATE POLICY "No direct delete access"
ON public.email_rate_limits
FOR DELETE
TO authenticated
USING (false);

-- Deny all DELETE access to anonymous users
CREATE POLICY "No anonymous delete access"
ON public.email_rate_limits
FOR DELETE
TO anon
USING (false);