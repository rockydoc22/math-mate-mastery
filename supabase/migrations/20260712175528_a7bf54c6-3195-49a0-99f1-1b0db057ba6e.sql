-- Tighten battle_rooms SELECT: only host or joined participants
DROP POLICY IF EXISTS "Authenticated users can view battle rooms" ON public.battle_rooms;

CREATE POLICY "Host or participants can view battle rooms"
ON public.battle_rooms
FOR SELECT
TO authenticated
USING (
  auth.uid() = host_id
  OR public.is_room_participant(auth.uid(), id)
);

-- Secure RPC: join a battle by code without exposing all rooms
CREATE OR REPLACE FUNCTION public.join_battle_by_code(_code text)
RETURNS TABLE (
  id uuid,
  room_code text,
  status text,
  battle_mode text,
  subject text,
  question_count integer,
  max_players integer,
  time_limit_seconds integer,
  is_solo boolean,
  host_id uuid,
  already_joined boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_room public.battle_rooms%ROWTYPE;
  v_count integer;
  v_existing boolean;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  SELECT * INTO v_room
  FROM public.battle_rooms
  WHERE room_code = upper(trim(_code));

  IF v_room.id IS NULL THEN
    RAISE EXCEPTION 'room_not_found';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.battle_participants
    WHERE room_id = v_room.id AND user_id = v_user
  ) INTO v_existing;

  IF NOT v_existing THEN
    IF v_room.status NOT IN ('waiting') THEN
      RAISE EXCEPTION 'battle_already_started';
    END IF;

    SELECT count(*) INTO v_count
    FROM public.battle_participants
    WHERE room_id = v_room.id;

    IF v_count >= v_room.max_players THEN
      RAISE EXCEPTION 'room_full';
    END IF;

    INSERT INTO public.battle_participants (room_id, user_id)
    VALUES (v_room.id, v_user);
  END IF;

  RETURN QUERY
  SELECT v_room.id, v_room.room_code, v_room.status, v_room.battle_mode,
         v_room.subject, v_room.question_count, v_room.max_players,
         v_room.time_limit_seconds, v_room.is_solo, v_room.host_id,
         v_existing;
END;
$$;

REVOKE ALL ON FUNCTION public.join_battle_by_code(text) FROM public;
GRANT EXECUTE ON FUNCTION public.join_battle_by_code(text) TO authenticated;