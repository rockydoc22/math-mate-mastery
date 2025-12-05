-- Fix 1: Restrict streaks SELECT to users' own data
DROP POLICY IF EXISTS "Anyone can view streaks" ON public.streaks;
CREATE POLICY "Users can view own streaks" ON public.streaks FOR SELECT USING (auth.uid() = user_id);

-- Fix 2: Restrict profiles SELECT to authenticated users only
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fix 3: Restrict flagged_questions SELECT, UPDATE, DELETE to admins only
DROP POLICY IF EXISTS "Authenticated users can view flagged questions" ON public.flagged_questions;
DROP POLICY IF EXISTS "Authenticated users can update flagged questions" ON public.flagged_questions;
DROP POLICY IF EXISTS "Authenticated users can delete flagged questions" ON public.flagged_questions;

CREATE POLICY "Admins can view flagged questions" ON public.flagged_questions FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update flagged questions" ON public.flagged_questions FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete flagged questions" ON public.flagged_questions FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 4: Restrict battle_answers SELECT to room participants only
DROP POLICY IF EXISTS "Participants can view room answers" ON public.battle_answers;
CREATE POLICY "Participants can view room answers" ON public.battle_answers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.battle_participants 
    WHERE battle_participants.room_id = battle_answers.room_id 
    AND battle_participants.user_id = auth.uid()
  )
);