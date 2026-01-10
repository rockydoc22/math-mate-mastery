-- Add reminder settings to study_plans table
ALTER TABLE public.study_plans
ADD COLUMN reminder_email TEXT,
ADD COLUMN daily_reminder_enabled BOOLEAN DEFAULT true,
ADD COLUMN weekly_reminder_enabled BOOLEAN DEFAULT true,
ADD COLUMN reminder_time TIME DEFAULT '08:00:00',
ADD COLUMN last_daily_reminder_sent TIMESTAMP WITH TIME ZONE,
ADD COLUMN last_weekly_reminder_sent TIMESTAMP WITH TIME ZONE;

-- Create index for efficient reminder queries
CREATE INDEX idx_study_plans_active_reminders 
ON public.study_plans(is_active, daily_reminder_enabled, weekly_reminder_enabled)
WHERE is_active = true;