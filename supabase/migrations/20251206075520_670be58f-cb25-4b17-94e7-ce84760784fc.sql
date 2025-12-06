-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

-- Create helper function to check if users are in the same active battle
CREATE OR REPLACE FUNCTION public.is_in_same_battle(_viewer_id uuid, _profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.battle_participants bp1
    JOIN public.battle_participants bp2 ON bp1.room_id = bp2.room_id
    JOIN public.battle_rooms br ON br.id = bp1.room_id
    WHERE bp1.user_id = _viewer_id
      AND bp2.user_id = _profile_id
      AND br.status IN ('waiting', 'in_progress')
  )
$$;

-- Create helper function to check if users are friends
CREATE OR REPLACE FUNCTION public.is_friend(_user_id uuid, _friend_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.friendships
    WHERE status = 'accepted'
      AND (
        (requester_id = _user_id AND addressee_id = _friend_id)
        OR (requester_id = _friend_id AND addressee_id = _user_id)
      )
  )
$$;

-- Create restrictive policy: users can only view their own profile, friends' profiles, or profiles in same battle
CREATE POLICY "Users can view relevant profiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id
  OR public.is_friend(auth.uid(), id)
  OR public.is_in_same_battle(auth.uid(), id)
);