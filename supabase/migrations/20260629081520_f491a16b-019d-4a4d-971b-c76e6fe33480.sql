-- =========================================================
-- content_repair_jobs: queue rows for the nightly repair cron
-- =========================================================
CREATE TABLE IF NOT EXISTS public.content_repair_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fix_number integer NOT NULL,
  section text NOT NULL,                       -- 'A_regenerate' | 'B_complete' | 'C_new' | 'D_schema' | 'E_difficulty' | 'F_answer_balance' | 'G_hedging' | 'H_missing_explanation' | 'I_review'
  job_type text NOT NULL,                      -- 'rewrite_file' | 'regen_explanations' | 'complete_file' | 'new_file' | 'normalize_schema' | 'recalibrate_difficulty' | 'rebalance_answers' | 'strip_hedging' | 'fill_missing_explanation' | 'review'
  label text NOT NULL,
  source_path text,                            -- src/data path or storage key
  target_count integer NOT NULL DEFAULT 0,
  processed_count integer NOT NULL DEFAULT 0,
  spec jsonb NOT NULL DEFAULT '{}'::jsonb,
  priority integer NOT NULL DEFAULT 100,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','running','completed','failed','paused','needs_review')),
  failures integer NOT NULL DEFAULT 0,
  last_error text,
  batches_run integer NOT NULL DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.content_repair_jobs TO authenticated;
GRANT ALL ON public.content_repair_jobs TO service_role;
ALTER TABLE public.content_repair_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read repair jobs"
  ON public.content_repair_jobs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS content_repair_jobs_status_priority_idx
  ON public.content_repair_jobs (status, priority, created_at);

CREATE TRIGGER content_repair_jobs_set_updated_at
  BEFORE UPDATE ON public.content_repair_jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- question_explanation_overrides: runtime patches for bundled banks
-- =========================================================
CREATE TABLE IF NOT EXISTS public.question_explanation_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_file text NOT NULL,                  -- e.g. 'ap_mega_bank_v2.json'
  question_id text NOT NULL,
  explanation text,
  difficulty integer,
  patch jsonb,                                -- additional field patches (option text, correct_key, etc.)
  source_job_id uuid REFERENCES public.content_repair_jobs(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_file, question_id)
);

GRANT SELECT ON public.question_explanation_overrides TO anon, authenticated;
GRANT ALL ON public.question_explanation_overrides TO service_role;
ALTER TABLE public.question_explanation_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read explanation overrides"
  ON public.question_explanation_overrides FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS qeo_source_file_idx
  ON public.question_explanation_overrides (source_file);

CREATE TRIGGER qeo_set_updated_at
  BEFORE UPDATE ON public.question_explanation_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Seed all audit fixes as queued jobs
-- =========================================================
INSERT INTO public.content_repair_jobs (fix_number, section, job_type, label, source_path, target_count, priority, spec) VALUES
-- Section A — Regenerate completely (highest priority for instrument files)
(1,  'A_regenerate', 'rewrite_file',       'Learning preferences (32 unique Likert prompts)', 'src/data/learning_preferences_items_32.json', 32, 10, '{"axes":["independent_vs_collaborative","fast_vs_deep","visual_vs_verbal","structured_vs_flexible"],"per_axis":8,"format":"likert_5"}'),
(2,  'A_regenerate', 'rewrite_file',       'EQ items (50 unique Likert prompts)',             'src/data/eq_items_50.json', 50, 10, '{"axes":["self_awareness","self_regulation","empathy","social_awareness","relationship_management"],"per_axis":10,"format":"likert_5"}'),
(3,  'A_regenerate', 'rewrite_file',       'AP CSP Create Task — 100 unique planning prompts','src/data/ap_csp_create_task_pack.json', 100, 15, '{"module":"planning_prompts","rubric":"CSP Create Task"}'),
(4,  'A_regenerate', 'rewrite_file',       'SAT Math L10 — replace 8 out-of-scope items + extend to 100','src/data/sat_math_level10_100.json', 100, 20, '{"out_of_scope_ids":["SATM10_1","SATM10_2","SATM10_7","SATM10_9","SATM10_11","SATM10_12","SATM10_15","SATM10_20"],"scope":"SAT-only: advanced algebra, geometry, statistics, trig","difficulty":10}'),
(5,  'A_regenerate', 'regen_explanations', 'AP Calc AB explanations (1,200) — mega banks',    'src/data/ap_mega_bank_lovable.json,src/data/ap_mega_bank_v2.json', 1200, 30, '{"course":"ap-calc-ab","filter":"placeholder"}'),
(6,  'A_regenerate', 'regen_explanations', 'AP Calc BC explanations (1,600)',                  'src/data/ap_mega_bank_lovable.json,src/data/apcalcbc_full_question_bank.json,src/data/apcalcbc_full_question_bank_v2.json', 1600, 30, '{"course":"ap-calc-bc","filter":"placeholder"}'),
(7,  'A_regenerate', 'regen_explanations', 'AP Physics 2 — explanations + numeric difficulty', 'src/data/ap_physics_2_question_bank_lovable.json', 1800, 35, '{"course":"ap-physics-2","include_difficulty":true}'),
(8,  'A_regenerate', 'regen_explanations', 'AP Chemistry — explanations + numeric difficulty', 'src/data/ap_chem_full_question_bank.json', 2026, 35, '{"course":"ap-chem","include_difficulty":true}'),
(9,  'A_regenerate', 'regen_explanations', 'AP US History — 1,658 explanations',               'src/data/ap_mega_bank_v2.json', 1658, 35, '{"course":"ap-apush","filter":"placeholder"}'),
(10, 'A_regenerate', 'regen_explanations', 'AP European History — 231 explanations',           'src/data/ap_mega_bank_v2.json', 231, 35, '{"course":"ap-euro","filter":"placeholder"}'),
-- Section B — Complete to target count
(11, 'B_complete', 'complete_file', 'MCAT — add 296',                                  'src/data/mcat_question_bank_300_original.json', 296, 40, '{}'),
(12, 'B_complete', 'complete_file', 'LSAT — add 219',                                  'src/data/lsat_question_bank_250_original.json', 219, 40, '{}'),
(13, 'B_complete', 'complete_file', 'OAT — add 205',                                   'src/data/oat_question_bank_240_original.json', 205, 40, '{}'),
(14, 'B_complete', 'complete_file', 'DAT — add 204',                                   'src/data/dat_question_bank_240_original.json', 204, 40, '{}'),
(15, 'B_complete', 'complete_file', 'SAT starter — add 174',                           'src/data/sat_question_bank_starter_200.json', 174, 40, '{}'),
(16, 'B_complete', 'complete_file', 'SAT English L10 — add 80',                        'src/data/sat_english_level10_100.json', 80, 40, '{}'),
(17, 'B_complete', 'complete_file', 'SAT English L9 — add 70',                         'src/data/sat_english_level9_100.json', 70, 40, '{}'),
(18, 'B_complete', 'complete_file', 'SAT Math L10 — add 70 (after Fix 4)',             'src/data/sat_math_level10_100.json', 70, 45, '{"after_fix":4}'),
(19, 'B_complete', 'complete_file', 'SAT Math L9 — add 50',                            'src/data/sat_math_level9_100.json', 50, 40, '{}'),
(20, 'B_complete', 'complete_file', 'Iowa / Stanford 10 — add 135',                    'src/data/homeschool_iowa_stanford10_question_bank_220_original.json', 135, 50, '{}'),
(21, 'B_complete', 'complete_file', 'CLT — add 58',                                    'src/data/clt_question_bank_180_original.json', 58, 50, '{}'),
(22, 'B_complete', 'complete_file', 'MAP Growth — add 96',                             'src/data/map_growth_question_bank_200_original.json', 96, 50, '{}'),
(23, 'B_complete', 'complete_file', 'TerraNova — add 95',                              'src/data/terranova_question_bank_200_original.json', 95, 50, '{}'),
(24, 'B_complete', 'complete_file', 'GMAT — add 15',                                   'src/data/gmat_question_bank_200_original.json', 15, 50, '{}'),
(25, 'B_complete', 'complete_file', 'TEAS — add 37',                                   'src/data/teas_question_bank_200.json', 37, 50, '{}'),
-- Section C — New files
(26, 'C_new', 'new_file', 'ACT English — 150 questions', 'src/data/act_english_question_bank_150.json', 150, 55, '{"test":"ACT","section":"english"}'),
(27, 'C_new', 'new_file', 'ACT Math — 150 questions',    'src/data/act_math_question_bank_150.json', 150, 55, '{"test":"ACT","section":"math"}'),
(28, 'C_new', 'new_file', 'ACT Reading — 150 questions', 'src/data/act_reading_question_bank_150.json', 150, 55, '{"test":"ACT","section":"reading"}'),
(29, 'C_new', 'new_file', 'ASVAB — 300 questions',       'src/data/asvab_question_bank_300.json', 300, 60, '{"test":"ASVAB"}'),
(30, 'C_new', 'new_file', 'Big Five — 60 unique Likert', 'src/data/big_five_style_items_60.json', 60, 25, '{"axes":["openness","conscientiousness","extraversion","agreeableness","emotional_stability"],"per_axis":12,"format":"likert_5"}'),
(31, 'C_new', 'new_file', 'Homeschool Mixed — 220',      'src/data/homeschool_mixed_question_bank_220.json', 220, 60, '{"test":"Homeschool Mixed"}'),
-- Section D — Schema / format normalization
(32, 'D_schema', 'normalize_schema', 'mathQuestionsRaw schema → options[]/correct_key',     'src/data/mathQuestionsRaw.json', 399, 65, '{"convert":"optionABCD_to_options_array","expand_difficulty":true}'),
(33, 'D_schema', 'normalize_schema', 'englishQuestionsRaw schema → options[]/correct_key',  'src/data/englishQuestionsRaw.json', 100, 65, '{"convert":"optionABCD_to_options_array"}'),
(34, 'D_schema', 'normalize_schema', 'ACT Science hard — numeric difficulty + options[] + rebalance', 'src/data/act_science_hard_150.json', 150, 65, '{"convert":"choices_dict_to_options_array","map_difficulty_bucket_to_numeric":true,"rebalance_answers":true}'),
(35, 'D_schema', 'normalize_schema', 'AP mega banks — numeric difficulty (7) on every item','src/data/ap_mega_bank_lovable.json,src/data/ap_mega_bank_v2.json', 24400, 65, '{"set_difficulty":7}'),
(36, 'D_schema', 'normalize_schema', 'AP Physics 2 + AP Chem — numeric difficulty',         'src/data/ap_physics_2_question_bank_lovable.json,src/data/ap_chem_full_question_bank.json', 3826, 65, '{"include_difficulty":true}'),
(37, 'D_schema', 'normalize_schema', 'newMathQuestions — strip image refs / text-only',     'src/data/newMathQuestions.json', 50, 65, '{"strip_image_refs":true}'),
(38, 'D_schema', 'normalize_schema', 'strategy_scenario_bank — add exam tag',               'src/data/strategy_scenario_bank_300.json', 300, 65, '{"tag_exam":true}'),
-- Section E — Live DB difficulty floors
(39, 'E_difficulty', 'recalibrate_difficulty', 'PSAT live DB — raise 90 items to floor=4',  'db:assessment_questions', 90,  70, '{"exam_family":"psat","floor":4}'),
(40, 'E_difficulty', 'recalibrate_difficulty', 'NCLEX — raise 55 items to floor=5',         'src/data/nclex_question_bank_300.json', 55, 70, '{"floor":5}'),
(41, 'E_difficulty', 'recalibrate_difficulty', 'IB — raise 111 items to floor=4',           'src/data/ib_question_bank_300.json', 111, 70, '{"floor":4}'),
(42, 'E_difficulty', 'recalibrate_difficulty', 'TOEFL — raise 63 items to floor=4',         'src/data/toefl_question_bank_250.json', 63, 70, '{"floor":4}'),
(43, 'E_difficulty', 'recalibrate_difficulty', 'CLT — raise 44 items to floor=4',           'src/data/clt_question_bank_180_original.json', 44, 70, '{"floor":4}'),
(44, 'E_difficulty', 'recalibrate_difficulty', 'HiSET live DB — raise 32 ELA items to floor=3', 'db:assessment_questions', 32, 70, '{"exam_family":"hiset","section":"ela","floor":3}'),
(45, 'E_difficulty', 'recalibrate_difficulty', 'State live DB — raise 30 G8 ELA to floor=3','db:assessment_questions', 30, 70, '{"exam_family":"state","grade":8,"section":"ela","floor":3}'),
-- Section F — Answer key rebalance
(46, 'F_answer_balance', 'rebalance_answers', 'PSAT live DB — rebalance answer key (D underrepresented)', 'db:assessment_questions', 383, 75, '{"exam_family":"psat","priority_domains":["craft-structure","expression-ideas","information-ideas"]}'),
(47, 'F_answer_balance', 'rebalance_answers', 'ACT live DB — rebalance after sections added',             'db:assessment_questions', 0,   80, '{"exam_family":"act","blocked_by_fix":[26,27,28]}'),
-- Section G — Strip hedging
(48, 'G_hedging', 'strip_hedging', 'PSAT live DB — 93 items',         'db:assessment_questions', 93, 75, '{"exam_family":"psat"}'),
(49, 'G_hedging', 'strip_hedging', 'ACT live DB — 91 items',          'db:assessment_questions', 91, 75, '{"exam_family":"act"}'),
(50, 'G_hedging', 'strip_hedging', 'State live DB — 55 items',        'db:assessment_questions', 55, 75, '{"exam_family":"state"}'),
(51, 'G_hedging', 'strip_hedging', 'AP live DB — 42 items',           'db:assessment_questions', 42, 75, '{"exam_family":"ap"}'),
(52, 'G_hedging', 'strip_hedging', 'HiSET live DB — 33 items',        'db:assessment_questions', 33, 75, '{"exam_family":"hiset"}'),
(53, 'G_hedging', 'strip_hedging', 'AP Biology bank — 7 items',       'src/data/AP_Biology_question_bank_200.json', 7, 75, '{}'),
(54, 'G_hedging', 'strip_hedging', 'AP Microeconomics bank — 5',      'src/data/ap_microeconomics_question_bank.json', 5, 75, '{}'),
(55, 'G_hedging', 'strip_hedging', 'AP US Government bank — 4',       'src/data/ap_us_government_question_bank.json', 4, 75, '{}'),
(56, 'G_hedging', 'strip_hedging', 'AP Physics 1 bank — 2',           'src/data/ap_physics_1_question_bank.json', 2, 75, '{}'),
(57, 'G_hedging', 'strip_hedging', 'AP Macroeconomics bank — 2',      'src/data/ap_macroeconomics_question_bank.json', 2, 75, '{}'),
-- Section H — Missing explanations
(58, 'H_missing_explanation', 'fill_missing_explanation', 'AP Microeconomics — 1 missing',  'src/data/ap_microeconomics_question_bank.json', 1, 80, '{}'),
(59, 'H_missing_explanation', 'fill_missing_explanation', 'LSAT bank — 1 missing',          'src/data/lsat_question_bank_250_original.json', 1, 80, '{}'),
-- Section I — Policy reviews (handled in code this turn, queued for tracking)
(60, 'I_review', 'review', 'roasts.json — gate score 51–69 / 80–89 to consumer_only', 'src/data/roasts.json', 0, 5, '{"handled_in_code":true}'),
(61, 'I_review', 'review', 'IQ → "Cognitive Skills Practice" UI rename audit',         'src/components/cognitive', 0, 5, '{"handled_in_code":true}'),
(62, 'I_review', 'review', 'ACCUPLACER — expand difficulty range to 1–6',              'src/data/accuplacer_question_bank_200.json', 298, 85, '{"current_values":[3,5,7],"target_range":[1,6]}'),
(63, 'I_review', 'review', 'AP CSP — additional rubric_checklists per unit/task',      'src/data/ap_csp_create_task_pack.json', 0, 85, '{"expand_module":"rubric_checklists"}')
ON CONFLICT DO NOTHING;