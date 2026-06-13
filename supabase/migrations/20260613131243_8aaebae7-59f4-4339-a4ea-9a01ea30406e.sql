DROP POLICY IF EXISTS "Scoped realtime subscriptions" ON realtime.messages;
CREATE POLICY "Scoped realtime subscriptions" ON realtime.messages
FOR SELECT TO authenticated
USING (
  CASE
    WHEN realtime.topic() LIKE 'battle:%' THEN public.is_room_participant(auth.uid(), NULLIF(split_part(realtime.topic(), ':', 2), '')::uuid)
    WHEN realtime.topic() LIKE 'user:%' THEN split_part(realtime.topic(), ':', 2) = auth.uid()::text
    WHEN realtime.topic() LIKE 'admin:%' THEN public.has_role(auth.uid(), 'admin'::public.app_role)
    ELSE false
  END
);