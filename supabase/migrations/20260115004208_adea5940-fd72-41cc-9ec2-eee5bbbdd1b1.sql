-- Create user_notifications table for notifying users about resolved flags
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications"
  ON public.user_notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications"
  ON public.user_notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can insert notifications for any user
CREATE POLICY "Admins can insert notifications"
  ON public.user_notifications
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add resolved_at column to flagged_questions to track when issues were fixed
ALTER TABLE public.flagged_questions 
ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS resolution_notes TEXT;