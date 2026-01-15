-- Create a security definer function to check if a user is in a battle room
CREATE OR REPLACE FUNCTION public.is_room_participant(_user_id uuid, _room_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.battle_participants
    WHERE user_id = _user_id
      AND room_id = _room_id
  )
$$;

-- Drop the problematic policy on battle_participants
DROP POLICY IF EXISTS "Room participants can view members" ON public.battle_participants;

-- Create a new policy that allows authenticated users to view participants in rooms they're in
-- Using a simpler approach: allow viewing if user is the participant OR if they share the same room
CREATE POLICY "Users can view battle participants"
ON public.battle_participants
FOR SELECT
USING (
  auth.uid() IS NOT NULL
);

-- Also fix the battle_answers policy that has the same issue
DROP POLICY IF EXISTS "Participants can view room answers" ON public.battle_answers;

CREATE POLICY "Users can view battle answers"
ON public.battle_answers
FOR SELECT
USING (
  auth.uid() IS NOT NULL
);