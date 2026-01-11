-- Add DELETE policy for battle_participants so users can leave rooms
CREATE POLICY "Users can leave battle rooms" 
ON public.battle_participants 
FOR DELETE 
USING (auth.uid() = user_id);