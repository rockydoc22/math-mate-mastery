
-- 1. user_notifications: remove permissive insert
DROP POLICY IF EXISTS "Users can create notifications for others" ON public.user_notifications;

-- 2. onboarding_events: require auth + ownership
DROP POLICY IF EXISTS "anyone can insert onboarding events" ON public.onboarding_events;
CREATE POLICY "Users insert own onboarding events"
  ON public.onboarding_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 3. Fix is_room_participant argument order in policies
DROP POLICY IF EXISTS "Users can view battle participants" ON public.battle_participants;
CREATE POLICY "Users can view battle participants"
  ON public.battle_participants FOR SELECT TO authenticated
  USING (public.is_room_participant(auth.uid(), room_id));

DROP POLICY IF EXISTS "Users can view battle answers" ON public.battle_answers;
CREATE POLICY "Users can view battle answers"
  ON public.battle_answers FOR SELECT TO authenticated
  USING (public.is_room_participant(auth.uid(), room_id));

-- 4. Allow users to read their own role
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 5. Lock down admin-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.get_admin_user_stats() FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_admin_user_stats() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.recompute_weakness_clusters(uuid, text) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated, PUBLIC;

-- 6. Remove study_plans from realtime publication (not used live)
ALTER PUBLICATION supabase_realtime DROP TABLE public.study_plans;

-- 7. Baseline realtime.messages RLS: require auth to subscribe
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated can use realtime" ON realtime.messages;
CREATE POLICY "Authenticated can use realtime"
  ON realtime.messages FOR SELECT TO authenticated
  USING (true);
