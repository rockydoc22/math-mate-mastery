-- Create a separate admin-only table for user notification settings
-- This table stores sensitive PII (email addresses) that should not be queryable by regular users
CREATE TABLE public.user_notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  reminder_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_notification_settings ENABLE ROW LEVEL SECURITY;

-- Users can ONLY insert their own record (no read access to prevent email harvesting)
CREATE POLICY "Users can insert their own notification settings" 
ON public.user_notification_settings 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own record (to change email)
CREATE POLICY "Users can update their own notification settings" 
ON public.user_notification_settings 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Only admins/moderators can read notification settings (for sending emails)
CREATE POLICY "Admins can read notification settings" 
ON public.user_notification_settings 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

-- Also grant service_role full access for edge functions to read emails
GRANT ALL ON public.user_notification_settings TO service_role;

-- Migrate existing reminder_email data from study_plans
INSERT INTO public.user_notification_settings (user_id, reminder_email)
SELECT DISTINCT ON (user_id) user_id, reminder_email 
FROM public.study_plans 
WHERE reminder_email IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET reminder_email = EXCLUDED.reminder_email;

-- Remove the reminder_email column from study_plans (no longer needed here)
ALTER TABLE public.study_plans DROP COLUMN IF EXISTS reminder_email;