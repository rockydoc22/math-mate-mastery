
-- Tighten write access on adaptive_teaching_sections
CREATE POLICY "Users insert own teaching"
ON public.adaptive_teaching_sections
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own teaching"
ON public.adaptive_teaching_sections
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own teaching"
ON public.adaptive_teaching_sections
FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Tighten write access on adaptive_weakness_clusters
CREATE POLICY "Users insert own clusters"
ON public.adaptive_weakness_clusters
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own clusters"
ON public.adaptive_weakness_clusters
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own clusters"
ON public.adaptive_weakness_clusters
FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Scope Realtime channel subscriptions: only allow battle channels to participants
DROP POLICY IF EXISTS "Authenticated users can subscribe to realtime" ON realtime.messages;
DROP POLICY IF EXISTS "Authenticated users can receive realtime" ON realtime.messages;

CREATE POLICY "Scoped realtime subscriptions"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  CASE
    WHEN realtime.topic() LIKE 'battle:%' THEN
      public.is_room_participant(
        auth.uid(),
        NULLIF(split_part(realtime.topic(), ':', 2), '')::uuid
      )
    WHEN realtime.topic() LIKE 'user:%' THEN
      split_part(realtime.topic(), ':', 2) = auth.uid()::text
    ELSE TRUE
  END
);
