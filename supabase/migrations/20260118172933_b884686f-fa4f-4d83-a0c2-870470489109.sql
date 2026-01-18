-- Allow authenticated users to insert notifications for other users (needed for flagging)
CREATE POLICY "Users can create notifications for others"
ON public.user_notifications
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);