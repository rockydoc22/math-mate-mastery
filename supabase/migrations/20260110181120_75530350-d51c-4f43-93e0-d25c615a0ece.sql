-- Add user_id column to flagged_questions table
ALTER TABLE public.flagged_questions 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows to have null user_id (they'll need to be re-flagged or removed)
-- This is acceptable since flagged_questions is likely empty or has minimal data

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can flag questions" ON public.flagged_questions;

-- Create a proper INSERT policy that requires user_id to match the authenticated user
CREATE POLICY "Users can flag questions" 
ON public.flagged_questions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also add SELECT policy so users can view their own flags
CREATE POLICY "Users can view their own flagged questions" 
ON public.flagged_questions 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Add policy for admins/moderators to view all flags (using the has_role function if it exists)
CREATE POLICY "Moderators can view all flagged questions" 
ON public.flagged_questions 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

-- Add policy for moderators to update flag status
CREATE POLICY "Moderators can update flagged questions" 
ON public.flagged_questions 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));