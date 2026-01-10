-- Add DELETE policy for moderators to remove flags
CREATE POLICY "Moderators can delete flagged questions" 
ON public.flagged_questions 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));