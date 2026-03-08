
CREATE TABLE public.user_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  consent_type text NOT NULL,
  consent_key text NOT NULL,
  agreed_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  UNIQUE(user_id, consent_type, consent_key)
);

ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own consents" ON public.user_consents
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own consents" ON public.user_consents
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
