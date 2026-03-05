// Unified FRQ data loaders for all AP subjects
// Lazily loads JSON packs to keep bundle small

export interface FRQPart {
  part: string;
  task: string;
}

export interface ScoringGuideline {
  point: number;
  criteria: string;
}

export interface FRQQuestion {
  id: string;
  type: string;
  course: string;
  prompt: string;
  parts: FRQPart[];
  scoring_guidelines: ScoringGuideline[];
  stimulus?: any;
  stimulus_type?: string;
  calculator_allowed?: boolean;
  sample_solution_outline?: string[];
}

export interface SAQQuestion {
  id: string;
  type: string;
  course: string;
  unit: number;
  stimulus: { type: string; text: string; note?: string };
  questions: { part: string; prompt: string }[];
  scoring_guidance: { per_part: string; common_pitfalls: string[] };
}

export interface DBQQuestion {
  id: string;
  type: string;
  course: string;
  unit_range: string;
  prompt: string;
  documents: { doc_id: string; type: string; description: string }[];
  rubric_7pt: Record<string, number>;
}

export interface LEQQuestion {
  id: string;
  type: string;
  course: string;
  prompt: string;
  rubric_6pt: Record<string, number>;
  time_recommendation_minutes: number;
}

export interface EssayPrompt {
  id: string;
  type: string;
  course: string;
  variant: string;
  prompt: string;
  rubric_6pt: Record<string, number>;
}

export interface ScoredAnchor {
  id: string;
  type: string;
  course: string;
  variant: string;
  score: number;
  excerpt: string;
  rubric_breakdown: Record<string, number>;
  examiner_notes: string;
}

export interface CSPPlanningPrompt {
  id: string;
  type: string;
  prompt: string;
}

export interface CSPChecklist {
  id: string;
  type: string;
  category: string;
  items: { label: string; help_text: string }[];
}

// ─── History FRQ loaders ───

let historiesPack: any = null;
async function loadHistoriesPack() {
  if (!historiesPack) {
    historiesPack = (await import("@/data/ap_histories_frq_pack.json")).default;
  }
  return historiesPack;
}

export async function loadHistorySAQs(course: string): Promise<SAQQuestion[]> {
  const data = await loadHistoriesPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  if (!courseData?.units) return [];
  const saqs: SAQQuestion[] = [];
  for (const unit of courseData.units) {
    for (const saq of (unit.saq || [])) {
      saqs.push({ ...saq, unit: unit.unit });
    }
  }
  return saqs;
}

export async function loadHistoryDBQs(course: string): Promise<DBQQuestion[]> {
  const data = await loadHistoriesPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.dbqs || [];
}

export async function loadHistoryLEQs(course: string): Promise<LEQQuestion[]> {
  const data = await loadHistoriesPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.leqs || [];
}

// ─── English essay loaders ───

let englishPack: any = null;
async function loadEnglishPack() {
  if (!englishPack) {
    englishPack = (await import("@/data/ap_english_essays_and_anchors.json")).default;
  }
  return englishPack;
}

export async function loadEssayPrompts(course: string): Promise<EssayPrompt[]> {
  const data = await loadEnglishPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.prompts || [];
}

export async function loadScoredAnchors(course: string): Promise<ScoredAnchor[]> {
  const data = await loadEnglishPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.scored_anchors || [];
}

// ─── STEM FRQ loaders ───

let calcPack: any = null;
async function loadCalcPack() {
  if (!calcPack) {
    calcPack = (await import("@/data/ap_calc_ab_bc_frq_pack.json")).default;
  }
  return calcPack;
}

export async function loadCalcFRQs(course: string): Promise<FRQQuestion[]> {
  const data = await loadCalcPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.frqs || [];
}

let chemStatsPack: any = null;
async function loadChemStatsPack() {
  if (!chemStatsPack) {
    chemStatsPack = (await import("@/data/ap_chem_stats_apes_frq_pack.json")).default;
  }
  return chemStatsPack;
}

export async function loadSTEMFRQs(course: string): Promise<FRQQuestion[]> {
  const data = await loadChemStatsPack();
  const courseData = data.courses?.find((c: any) => c.course === course);
  return courseData?.frqs || [];
}

// ─── CSP loaders ───

let cspPack: any = null;
async function loadCSPPack() {
  if (!cspPack) {
    cspPack = (await import("@/data/ap_csp_create_task_pack.json")).default;
  }
  return cspPack;
}

export async function loadCSPPrompts(): Promise<CSPPlanningPrompt[]> {
  const data = await loadCSPPack();
  return data.modules?.planning_prompts || [];
}

export async function loadCSPChecklists(): Promise<CSPChecklist[]> {
  const data = await loadCSPPack();
  return data.modules?.rubric_checklists || [];
}

// ─── Unified FRQ getter by subject ───

export type FRQSubjectConfig = {
  course: string;
  types: ('saq' | 'dbq' | 'leq' | 'frq' | 'essay' | 'csp')[];
};

export const FRQ_SUBJECT_MAP: Record<string, FRQSubjectConfig> = {
  'ap-us-history': { course: 'AP US History', types: ['saq', 'dbq', 'leq'] },
  'ap-world-history': { course: 'AP World History', types: ['saq', 'dbq', 'leq'] },
  'ap-euro-history': { course: 'AP European History', types: ['saq', 'dbq', 'leq'] },
  'ap-calculus-ab': { course: 'AP Calculus AB', types: ['frq'] },
  'ap-calculus-bc': { course: 'AP Calculus BC', types: ['frq'] },
  'ap-chemistry': { course: 'AP Chemistry', types: ['frq'] },
  'ap-statistics': { course: 'AP Statistics', types: ['frq'] },
  'ap-environmental-science': { course: 'AP Environmental Science', types: ['frq'] },
  'ap-lang': { course: 'AP English Language', types: ['essay'] },
  'ap-english-lit': { course: 'AP English Literature', types: ['essay'] },
  'ap-csp': { course: 'AP Computer Science Principles', types: ['csp'] },
};
