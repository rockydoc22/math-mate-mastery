// Searchable catalog of every test, course and practice flow in the app.
// Used by /tests (TestCatalog page) and the home search bar.

export type TestType =
  | "standardized"   // SAT / ACT / PSAT / GED / HiSET / TASC / state tests
  | "ap"             // AP exams
  | "professional"   // MCAT, GRE, LSAT, etc.
  | "subject"        // Subject-specific practice (math, english, vocab…)
  | "course"         // Multi-chapter courses / downloadable books
  | "assessment"     // IQ, MBTI, DISC, cognitive
  | "game"           // Battles, arcade, survival, etc.
  | "tool";          // Coaches, planners, solvers

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  type: TestType;
  /** e.g. ["6","7","8","9-12","college","adult"] */
  grades: string[];
  /** Suggested age range, inclusive */
  ageMin: number;
  ageMax: number;
  /** App route OR external href (PDF, etc.) */
  href: string;
  /** Open href in a new tab (downloads / external) */
  external?: boolean;
  /** Extra search keywords */
  keywords?: string[];
  icon?: string;
}

export const TEST_CATALOG: CatalogItem[] = [
  // ───────── Downloadable courses / books ─────────
  {
    id: "aops-prealgebra",
    title: "Pre-Algebra Mastery Test (90 Q)",
    description:
      "10 moderately hard questions per chapter across 9 Pre-Algebra chapters, with instant feedback, full answer key, and an AI-powered weakness report.",
    type: "course",
    grades: ["5", "6", "7", "8"],
    ageMin: 10, ageMax: 14,
    href: "/aops-prealgebra",
    external: false,
    icon: "📐",
    keywords: ["prealgebra", "pre-algebra", "math", "fractions", "ratios", "percents", "statistics"],
  },

  // ───────── Standardized high-school exams ─────────
  { id: "sat",  title: "SAT Practice",  description: "Digital SAT math + reading/writing practice with adaptive difficulty.", type: "standardized", grades: ["10","11","12"], ageMin: 15, ageMax: 18, href: "/quiz", icon: "🎓", keywords: ["sat","digital sat","college board"] },
  { id: "act",  title: "ACT Practice",  description: "Full ACT-style practice across English, Math, Reading, Science.", type: "standardized", grades: ["10","11","12"], ageMin: 15, ageMax: 18, href: "/quiz?exam=act", icon: "📘", keywords: ["act"] },
  { id: "psat", title: "PSAT Practice", description: "PSAT/NMSQT prep with section scoring.", type: "standardized", grades: ["9","10","11"], ageMin: 14, ageMax: 17, href: "/quiz?exam=psat", icon: "📗", keywords: ["psat","nmsqt"] },
  { id: "math", title: "Math Practice", description: "Math-only adaptive quiz across all topics.", type: "subject", grades: ["8","9","10","11","12"], ageMin: 13, ageMax: 18, href: "/math", icon: "🧮", keywords: ["math","algebra","geometry","trig"] },
  { id: "english", title: "English / Reading & Writing", description: "Reading comprehension, grammar, and writing practice.", type: "subject", grades: ["8","9","10","11","12"], ageMin: 13, ageMax: 18, href: "/english", icon: "📖", keywords: ["english","reading","writing","grammar"] },
  { id: "vocab", title: "Vocabulary Trainer", description: "Spaced-repetition vocabulary for SAT/ACT.", type: "subject", grades: ["7","8","9","10","11","12"], ageMin: 12, ageMax: 18, href: "/vocab", icon: "🔤", keywords: ["vocab","vocabulary","words"] },
  { id: "elite", title: "Elite Practice (Hardest Tier)", description: "Hardest 8–10 difficulty questions for top scorers.", type: "subject", grades: ["10","11","12"], ageMin: 15, ageMax: 18, href: "/elite-practice", icon: "👑", keywords: ["1600","elite","hard"] },
  { id: "practice-test", title: "Full Practice Test", description: "Timed full-length practice exam.", type: "standardized", grades: ["10","11","12"], ageMin: 15, ageMax: 18, href: "/practice-test", icon: "📝", keywords: ["full length","mock exam"] },
  { id: "endurance", title: "Endurance Run", description: "Endless quiz with 3 lives — build stamina.", type: "game", grades: ["9","10","11","12"], ageMin: 14, ageMax: 18, href: "/endurance", icon: "🏃", keywords: ["endless","stamina"] },
  { id: "rapid-facts", title: "Rapid Facts Challenge", description: "60-second MCQ challenge with review.", type: "game", grades: ["6","7","8","9","10","11","12"], ageMin: 11, ageMax: 18, href: "/rapid-facts", icon: "⚡", keywords: ["timed","speed"] },
  { id: "speed-drill", title: "Speed Drill", description: "Quick-fire skill drills.", type: "game", grades: ["7","8","9","10","11","12"], ageMin: 12, ageMax: 18, href: "/speed-drill", icon: "🔥" },
  { id: "survival", title: "Survival Mode", description: "Wrong answers cost lives.", type: "game", grades: ["8","9","10","11","12"], ageMin: 13, ageMax: 18, href: "/survival", icon: "💀" },
  { id: "boss", title: "Boss Battle", description: "Defeat themed bosses with question streaks.", type: "game", grades: ["6","7","8","9","10","11","12"], ageMin: 11, ageMax: 18, href: "/boss-battle", icon: "🐉" },
  { id: "battle", title: "Multiplayer Battle", description: "8-player live matchmaking duels.", type: "game", grades: ["7","8","9","10","11","12"], ageMin: 12, ageMax: 18, href: "/battle", icon: "⚔️" },

  // ───────── AP & professional ─────────
  { id: "ap", title: "AP Exam Practice", description: "Free practice across every AP subject.", type: "ap", grades: ["10","11","12"], ageMin: 15, ageMax: 18, href: "/ap-tests", icon: "🧪", keywords: ["ap","advanced placement","college board"] },
  { id: "pro", title: "Pro Exams (MCAT/GRE/LSAT…)", description: "Original prep for MCAT, GRE, LSAT, GMAT and more.", type: "professional", grades: ["college","adult"], ageMin: 18, ageMax: 99, href: "/pro-exams", icon: "🎯", keywords: ["mcat","gre","lsat","gmat","graduate"] },

  // ───────── K-12 / homeschool ─────────
  { id: "k12", title: "K-12 & Homeschool Exams", description: "MAP Growth, GED, HiSET, TASC, Iowa, Stanford-10, TerraNova, PSSA, Regents and more.", type: "standardized", grades: ["K","1","2","3","4","5","6","7","8","9","10","11","12"], ageMin: 5, ageMax: 18, href: "/k12-exams", icon: "🏫", keywords: ["k12","homeschool","map","ged","hiset","tasc","iowa","stanford","terranova","pssa","regents","star"] },
  { id: "k12-daily", title: "K-12 Daily Challenge", description: "Daily unique K-12 question set.", type: "standardized", grades: ["K","1","2","3","4","5","6","7","8"], ageMin: 5, ageMax: 14, href: "/k12-daily", icon: "📅" },
  { id: "ged", title: "GED Practice", description: "General Educational Development practice.", type: "standardized", grades: ["adult"], ageMin: 16, ageMax: 99, href: "/k12-exam/ged", icon: "📖", keywords: ["ged","high school equivalency"] },
  { id: "hiset", title: "HiSET Practice", description: "High School Equivalency Test practice.", type: "standardized", grades: ["adult"], ageMin: 16, ageMax: 99, href: "/k12-exam/hiset", icon: "📝", keywords: ["hiset"] },

  // ───────── Daily / coaching tools ─────────
  { id: "daily", title: "Daily Challenge", description: "Curated daily practice set.", type: "tool", grades: ["6","7","8","9","10","11","12"], ageMin: 11, ageMax: 18, href: "/daily", icon: "🗓️" },
  { id: "coach", title: "AI Study Coach", description: "Personalized study plan and recap.", type: "tool", grades: ["6","7","8","9","10","11","12"], ageMin: 11, ageMax: 18, href: "/coach", icon: "🤖" },
  { id: "study-guide", title: "Personal Study Guide", description: "One-page guide built from your weak spots.", type: "tool", grades: ["8","9","10","11","12"], ageMin: 13, ageMax: 18, href: "/study-guide", icon: "📋" },
  { id: "booster", title: "Booster Test", description: "Targets your weakest skills first.", type: "tool", grades: ["8","9","10","11","12"], ageMin: 13, ageMax: 18, href: "/booster", icon: "🚀" },
  { id: "homework", title: "Homework Solver", description: "Photo → step-by-step solutions.", type: "tool", grades: ["5","6","7","8","9","10","11","12"], ageMin: 10, ageMax: 18, href: "/homework-solver", icon: "📷" },
  { id: "flashcards", title: "Flashcards (SRS)", description: "Spaced-repetition flashcards.", type: "tool", grades: ["6","7","8","9","10","11","12"], ageMin: 11, ageMax: 18, href: "/flashcards", icon: "🃏" },
  { id: "mistakes", title: "Mistake Journal", description: "Review and re-practice past mistakes.", type: "tool", grades: ["7","8","9","10","11","12"], ageMin: 12, ageMax: 18, href: "/mistake-journal", icon: "🗒️" },
  { id: "skill-map", title: "Skill Graph", description: "Mastery map with prerequisites.", type: "tool", grades: ["7","8","9","10","11","12"], ageMin: 12, ageMax: 18, href: "/skill-map", icon: "🕸️" },

  // ───────── Assessments ─────────
  { id: "iq", title: "IQ Test", description: "25-question, 15-minute IQ assessment.", type: "assessment", grades: ["7","8","9","10","11","12","adult"], ageMin: 12, ageMax: 99, href: "/iq-test", icon: "🧠" },
  { id: "mbti", title: "MBTI Personality", description: "16-type personality assessment (non-clinical).", type: "assessment", grades: ["9","10","11","12","adult"], ageMin: 14, ageMax: 99, href: "/personality-mbti", icon: "🪞" },
  { id: "disc", title: "DISC Profile", description: "Behavioral DISC self-assessment.", type: "assessment", grades: ["9","10","11","12","adult"], ageMin: 14, ageMax: 99, href: "/personality-disc", icon: "🎭" },
  { id: "enneagram", title: "Enneagram", description: "9-type Enneagram self-assessment.", type: "assessment", grades: ["9","10","11","12","adult"], ageMin: 14, ageMax: 99, href: "/personality-enneagram", icon: "♾️" },
  { id: "strengths", title: "Strengths Finder", description: "Identify your top strengths.", type: "assessment", grades: ["9","10","11","12","adult"], ageMin: 14, ageMax: 99, href: "/personality-strengths", icon: "💪" },
  { id: "cognitive", title: "Cognitive Skills", description: "Age-banded cognitive tracks.", type: "assessment", grades: ["3","4","5","6","7","8","9","10","11","12","adult"], ageMin: 8, ageMax: 99, href: "/cognitive", icon: "🧩" },
];

export const TEST_TYPE_LABELS: Record<TestType, string> = {
  standardized: "Standardized Tests",
  ap: "AP",
  professional: "Professional Exams",
  subject: "Subject Practice",
  course: "Courses & Books",
  assessment: "Assessments",
  game: "Game Modes",
  tool: "Tools & Coaching",
};

export const GRADE_BUCKETS: { id: string; label: string; grades: string[] }[] = [
  { id: "elementary",  label: "Elementary (K–5)",   grades: ["K","1","2","3","4","5"] },
  { id: "middle",      label: "Middle (6–8)",       grades: ["6","7","8"] },
  { id: "high",        label: "High School (9–12)", grades: ["9","10","11","12"] },
  { id: "college",     label: "College",            grades: ["college"] },
  { id: "adult",       label: "Adult Learner",      grades: ["adult"] },
];

export const AGE_BUCKETS: { id: string; label: string; min: number; max: number }[] = [
  { id: "u10",   label: "Under 10",     min: 0,  max: 9 },
  { id: "10-13", label: "10–13",        min: 10, max: 13 },
  { id: "14-17", label: "14–17",        min: 14, max: 17 },
  { id: "18p",   label: "18+",          min: 18, max: 99 },
];

export function searchCatalog(
  query: string,
  filters: { types?: TestType[]; gradeBucket?: string; ageBucket?: string } = {},
): CatalogItem[] {
  const q = query.trim().toLowerCase();
  const gradeIds = filters.gradeBucket
    ? GRADE_BUCKETS.find(g => g.id === filters.gradeBucket)?.grades ?? []
    : [];
  const age = filters.ageBucket
    ? AGE_BUCKETS.find(a => a.id === filters.ageBucket)
    : undefined;

  return TEST_CATALOG.filter(item => {
    if (filters.types && filters.types.length > 0 && !filters.types.includes(item.type)) return false;
    if (gradeIds.length > 0 && !item.grades.some(g => gradeIds.includes(g))) return false;
    if (age && !(item.ageMax >= age.min && item.ageMin <= age.max)) return false;
    if (!q) return true;
    const hay = [
      item.title, item.description, item.type,
      ...(item.keywords ?? []), ...item.grades,
    ].join(" ").toLowerCase();
    return q.split(/\s+/).every(tok => hay.includes(tok));
  });
}