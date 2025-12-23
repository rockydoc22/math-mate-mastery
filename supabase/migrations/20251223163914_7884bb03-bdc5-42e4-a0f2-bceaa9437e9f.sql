-- Add explicit DELETE policy for saved_questions table
CREATE POLICY "Users can delete their own saved questions"
ON public.saved_questions
FOR DELETE
USING (auth.uid() = user_id);