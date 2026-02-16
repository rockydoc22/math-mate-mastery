
-- Fix: Restrict battle_participants SELECT to room participants only
DROP POLICY IF EXISTS "Users can view battle participants" ON public.battle_participants;
CREATE POLICY "Users can view battle participants"
ON public.battle_participants
FOR SELECT
TO authenticated
USING (is_room_participant(room_id, auth.uid()));

-- Fix: Restrict battle_answers SELECT to room participants only
DROP POLICY IF EXISTS "Users can view battle answers" ON public.battle_answers;
CREATE POLICY "Users can view battle answers"
ON public.battle_answers
FOR SELECT
TO authenticated
USING (is_room_participant(room_id, auth.uid()));
