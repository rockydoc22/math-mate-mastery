
CREATE TABLE public.game_zone_stats (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  rounds_played INTEGER NOT NULL DEFAULT 0,
  fastest_solve_ms INTEGER,
  per_game JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.game_zone_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.game_zone_stats TO authenticated;
GRANT ALL ON public.game_zone_stats TO service_role;

ALTER TABLE public.game_zone_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read game zone stats"
  ON public.game_zone_stats FOR SELECT
  USING (true);

CREATE POLICY "Users manage own game zone stats insert"
  ON public.game_zone_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own game zone stats update"
  ON public.game_zone_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own game zone stats"
  ON public.game_zone_stats FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER game_zone_stats_updated_at
  BEFORE UPDATE ON public.game_zone_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.game_zone_rounds (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  solve_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX game_zone_rounds_user_created_idx
  ON public.game_zone_rounds (user_id, created_at DESC);

GRANT SELECT, INSERT ON public.game_zone_rounds TO authenticated;
GRANT ALL ON public.game_zone_rounds TO service_role;

ALTER TABLE public.game_zone_rounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own rounds"
  ON public.game_zone_rounds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own rounds"
  ON public.game_zone_rounds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
