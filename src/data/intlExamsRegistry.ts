// International exam registry (stub for future expansion).
// Day-5 rail: keep the shape parallel to USA_NATIONAL_TESTS so the same
// AlphaPath UI can render both once banks land.

export interface IntlExam {
  id: string;
  name: string;
  region: string;
  locale: string;
  description: string;
  status: "coming_soon";
}

export const INTL_EXAMS: IntlExam[] = [
  { id: "gcse", name: "GCSE", region: "UK", locale: "en-GB", description: "Secondary school qualifications.", status: "coming_soon" },
  { id: "a_level", name: "A-Level", region: "UK", locale: "en-GB", description: "UK university entrance.", status: "coming_soon" },
  { id: "ucat", name: "UCAT", region: "UK/AU", locale: "en-GB", description: "Medical school admissions.", status: "coming_soon" },
  { id: "cael", name: "CAEL", region: "Canada", locale: "en-CA", description: "Academic English (Canada).", status: "coming_soon" },
  { id: "naplan", name: "NAPLAN", region: "Australia", locale: "en-AU", description: "Year 3/5/7/9 assessments.", status: "coming_soon" },
  { id: "jee_main", name: "JEE Main", region: "India", locale: "en-IN", description: "Engineering admissions.", status: "coming_soon" },
  { id: "neet", name: "NEET", region: "India", locale: "en-IN", description: "Medical admissions.", status: "coming_soon" },
  { id: "cambridge_english", name: "Cambridge English (B2/C1)", region: "EU", locale: "en-GB", description: "English proficiency.", status: "coming_soon" },
  { id: "ielts_intl", name: "IELTS (International)", region: "Global", locale: "en", description: "English proficiency.", status: "coming_soon" },
  { id: "bac_fr", name: "Baccalauréat", region: "France", locale: "fr-FR", description: "French secondary diploma.", status: "coming_soon" },
];