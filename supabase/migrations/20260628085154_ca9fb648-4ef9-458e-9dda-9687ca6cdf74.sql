
-- protected-content bucket: no direct client access. All reads go through the
-- protected-asset edge function using the service role.
CREATE POLICY "protected-content service-role read"
  ON storage.objects FOR SELECT
  TO service_role
  USING (bucket_id = 'protected-content');

CREATE POLICY "protected-content service-role write"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'protected-content');

CREATE POLICY "protected-content service-role update"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'protected-content');

CREATE POLICY "protected-content service-role delete"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'protected-content');
