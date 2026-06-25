
CREATE TABLE public.bulk_generate_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  preset_key text NOT NULL,
  priority int NOT NULL DEFAULT 100,
  label text NOT NULL,
  spec jsonb NOT NULL,
  target int NOT NULL,
  inserted int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','running','completed','failed','paused')),
  failures int NOT NULL DEFAULT 0,
  last_error text,
  batches_run int NOT NULL DEFAULT 0,
  total_runtime_ms bigint NOT NULL DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX bulk_generate_jobs_status_priority_idx ON public.bulk_generate_jobs (status, priority, created_at);

GRANT SELECT ON public.bulk_generate_jobs TO authenticated;
GRANT ALL ON public.bulk_generate_jobs TO service_role;

ALTER TABLE public.bulk_generate_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view bulk jobs"
  ON public.bulk_generate_jobs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER bulk_generate_jobs_set_updated_at
  BEFORE UPDATE ON public.bulk_generate_jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable cron extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
