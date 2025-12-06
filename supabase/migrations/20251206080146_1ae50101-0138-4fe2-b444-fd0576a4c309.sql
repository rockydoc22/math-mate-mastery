-- 1. Fix battle_rooms: Restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view battle rooms" ON public.battle_rooms;
CREATE POLICY "Authenticated users can view battle rooms" 
  ON public.battle_rooms FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- 2. Fix battle_participants: Restrict to room participants only
DROP POLICY IF EXISTS "Anyone can view participants" ON public.battle_participants;
CREATE POLICY "Room participants can view members" 
  ON public.battle_participants FOR SELECT 
  USING (
    auth.uid() IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM battle_participants bp 
      WHERE bp.room_id = battle_participants.room_id 
      AND bp.user_id = auth.uid()
    )
  );

-- 3. Fix quiz_scores: Restrict to own scores only
DROP POLICY IF EXISTS "Authenticated users can view quiz scores" ON public.quiz_scores;
CREATE POLICY "Users can view own quiz scores" 
  ON public.quiz_scores FOR SELECT 
  USING (auth.uid() = user_id);

-- 4. Remove reporter_ip column (unnecessary PII storage)
ALTER TABLE public.flagged_questions DROP COLUMN IF EXISTS reporter_ip;