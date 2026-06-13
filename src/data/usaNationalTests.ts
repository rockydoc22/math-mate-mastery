// Comprehensive registry of major USA national tests
// Day 1 of "AlphaOmega Path" — single source of truth for the Test Picker.

export type TestStage =
  | "k8"
  | "high_school"
  | "college_admissions"
  | "advanced_placement"
  | "graduate"
  | "professional"
  | "career";

export interface NationalTest {
  id: string;
  name: string;
  shortName: string;
  stage: TestStage;
  ageRange: [number, number];
  description: string;
  route?: string; // best entry route inside the app
  status: "live" | "beta" | "coming_soon";
  coverage?: string; // free-text "what's covered"
}

export const USA_NATIONAL_TESTS: NationalTest[] = [
  // K-8
  { id: "map_growth", name: "NWEA MAP Growth", shortName: "MAP", stage: "k8", ageRange: [6, 14], description: "Adaptive K-8 growth assessment.", route: "/k12-exams", status: "beta" },
  { id: "iready", name: "i-Ready Diagnostic", shortName: "i-Ready", stage: "k8", ageRange: [6, 14], description: "Reading & math diagnostic.", route: "/k12-exams", status: "beta" },
  { id: "star", name: "STAR Assessments", shortName: "STAR", stage: "k8", ageRange: [6, 14], description: "Reading/math benchmarks.", route: "/k12-exams", status: "beta" },
  { id: "itbs", name: "Iowa Assessments (ITBS)", shortName: "ITBS", stage: "k8", ageRange: [6, 14], description: "Iowa Tests of Basic Skills.", route: "/k12-exams", status: "beta" },
  { id: "terranova", name: "TerraNova", shortName: "TerraNova", stage: "k8", ageRange: [6, 14], description: "K-12 standardized achievement.", route: "/k12-exams", status: "beta" },
  { id: "stanford10", name: "Stanford 10", shortName: "SAT-10", stage: "k8", ageRange: [6, 14], description: "Stanford Achievement Test.", route: "/k12-exams", status: "beta" },

  // High school
  { id: "psat", name: "PSAT/NMSQT", shortName: "PSAT", stage: "high_school", ageRange: [13, 17], description: "National Merit qualifier.", route: "/quiz?exam=psat", status: "live" },
  { id: "psat89", name: "PSAT 8/9", shortName: "PSAT 8/9", stage: "high_school", ageRange: [12, 15], description: "Early college-prep checkpoint.", route: "/quiz?exam=psat89", status: "beta" },
  { id: "pssa", name: "PSSA", shortName: "PSSA", stage: "high_school", ageRange: [8, 14], description: "PA state assessment.", route: "/k12-exams", status: "beta" },
  { id: "regents", name: "NY Regents Exams", shortName: "Regents", stage: "high_school", ageRange: [13, 18], description: "NY state graduation exams.", route: "/k12-exams", status: "beta" },
  { id: "ged", name: "GED", shortName: "GED", stage: "high_school", ageRange: [16, 99], description: "High-school equivalency.", route: "/pro-exams", status: "beta" },
  { id: "hiset", name: "HiSET", shortName: "HiSET", stage: "high_school", ageRange: [16, 99], description: "HS equivalency alternative.", route: "/pro-exams", status: "beta" },
  { id: "tasc", name: "TASC", shortName: "TASC", stage: "high_school", ageRange: [16, 99], description: "Test Assessing Secondary Completion.", route: "/pro-exams", status: "beta" },

  // College admissions
  { id: "sat", name: "Digital SAT", shortName: "SAT", stage: "college_admissions", ageRange: [13, 19], description: "College Board admissions test (40²).", route: "/quiz?exam=sat", status: "live", coverage: "Reading & Writing + Math, full retired bank." },
  { id: "act", name: "ACT", shortName: "ACT", stage: "college_admissions", ageRange: [13, 19], description: "English, Math, Reading, Science.", route: "/quiz?exam=act", status: "live" },
  { id: "clt", name: "CLT", shortName: "CLT", stage: "college_admissions", ageRange: [14, 19], description: "Classic Learning Test.", route: "/pro-exams", status: "coming_soon" },
  { id: "accuplacer", name: "ACCUPLACER", shortName: "Accuplacer", stage: "college_admissions", ageRange: [16, 99], description: "Community college placement.", route: "/pro-exams", status: "beta" },

  // AP
  { id: "ap", name: "AP Exams (38 subjects)", shortName: "AP", stage: "advanced_placement", ageRange: [14, 19], description: "Advanced Placement subject exams.", route: "/ap-tests", status: "live" },

  // Graduate
  { id: "gre", name: "GRE General", shortName: "GRE", stage: "graduate", ageRange: [19, 99], description: "Graduate admissions.", route: "/pro-exams", status: "beta" },
  { id: "gmat", name: "GMAT Focus", shortName: "GMAT", stage: "graduate", ageRange: [19, 99], description: "MBA admissions.", route: "/pro-exams", status: "beta" },
  { id: "lsat", name: "LSAT", shortName: "LSAT", stage: "graduate", ageRange: [19, 99], description: "Law school admissions.", route: "/pro-exams", status: "beta" },
  { id: "mcat", name: "MCAT", shortName: "MCAT", stage: "graduate", ageRange: [19, 99], description: "Medical school admissions.", route: "/pro-exams", status: "beta" },
  { id: "dat", name: "DAT", shortName: "DAT", stage: "graduate", ageRange: [19, 99], description: "Dental admissions.", route: "/pro-exams", status: "beta" },
  { id: "oat", name: "OAT", shortName: "OAT", stage: "graduate", ageRange: [19, 99], description: "Optometry admissions.", route: "/pro-exams", status: "coming_soon" },
  { id: "pcat", name: "PCAT", shortName: "PCAT", stage: "graduate", ageRange: [19, 99], description: "Pharmacy admissions.", route: "/pro-exams", status: "coming_soon" },

  // Professional licensing
  { id: "nclex_rn", name: "NCLEX-RN", shortName: "NCLEX-RN", stage: "professional", ageRange: [19, 99], description: "Registered Nurse licensure.", route: "/pro-exams", status: "beta" },
  { id: "nclex_pn", name: "NCLEX-PN", shortName: "NCLEX-PN", stage: "professional", ageRange: [19, 99], description: "Practical Nurse licensure.", route: "/pro-exams", status: "coming_soon" },
  { id: "usmle1", name: "USMLE Step 1", shortName: "USMLE 1", stage: "professional", ageRange: [21, 99], description: "Medical licensure step 1.", route: "/pro-exams", status: "coming_soon" },
  { id: "usmle2", name: "USMLE Step 2 CK", shortName: "USMLE 2", stage: "professional", ageRange: [22, 99], description: "Medical licensure step 2.", route: "/pro-exams", status: "coming_soon" },
  { id: "bar", name: "Bar Exam (UBE)", shortName: "Bar", stage: "professional", ageRange: [22, 99], description: "Uniform Bar Exam.", route: "/pro-exams", status: "coming_soon" },
  { id: "cpa", name: "CPA", shortName: "CPA", stage: "professional", ageRange: [21, 99], description: "Certified Public Accountant.", route: "/pro-exams", status: "coming_soon" },
  { id: "cfa1", name: "CFA Level I", shortName: "CFA I", stage: "professional", ageRange: [20, 99], description: "Chartered Financial Analyst.", route: "/pro-exams", status: "coming_soon" },
  { id: "praxis", name: "Praxis Core", shortName: "Praxis", stage: "professional", ageRange: [19, 99], description: "Teacher certification.", route: "/pro-exams", status: "beta" },

  // Career & military
  { id: "asvab", name: "ASVAB", shortName: "ASVAB", stage: "career", ageRange: [16, 35], description: "Military entrance.", route: "/pro-exams", status: "beta" },
  { id: "toefl", name: "TOEFL iBT", shortName: "TOEFL", stage: "career", ageRange: [14, 99], description: "English proficiency.", route: "/pro-exams", status: "beta" },
  { id: "ielts", name: "IELTS Academic", shortName: "IELTS", stage: "career", ageRange: [14, 99], description: "English proficiency.", route: "/pro-exams", status: "coming_soon" },
  { id: "citizenship", name: "US Citizenship Test", shortName: "Citizenship", stage: "career", ageRange: [16, 99], description: "USCIS naturalization civics.", route: "/pro-exams", status: "coming_soon" },
];

export const STAGE_LABELS: Record<TestStage, string> = {
  k8: "K-8 Grade-School",
  high_school: "High School",
  college_admissions: "College Admissions",
  advanced_placement: "Advanced Placement",
  graduate: "Graduate School",
  professional: "Professional Licensing",
  career: "Career & Language",
};

export function testsForAge(age: number): NationalTest[] {
  return USA_NATIONAL_TESTS.filter((t) => age >= t.ageRange[0] && age <= t.ageRange[1]);
}

export function getTest(id: string): NationalTest | undefined {
  return USA_NATIONAL_TESTS.find((t) => t.id === id);
}