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
  // UK
  { id: "gcse", name: "GCSE", region: "UK", locale: "en-GB", description: "Secondary school qualifications (Years 10–11).", status: "coming_soon" },
  { id: "a_level", name: "A-Level", region: "UK", locale: "en-GB", description: "UK university entrance qualifications.", status: "coming_soon" },
  { id: "ucat", name: "UCAT", region: "UK/AU", locale: "en-GB", description: "Medical & dental school admissions test.", status: "coming_soon" },
  { id: "bmat", name: "BMAT", region: "UK", locale: "en-GB", description: "BioMedical Admissions Test.", status: "coming_soon" },
  { id: "11plus", name: "11+ Exam", region: "UK", locale: "en-GB", description: "Grammar school entrance exam.", status: "coming_soon" },
  // Europe
  { id: "bac_fr", name: "Baccalauréat", region: "France", locale: "fr-FR", description: "French secondary diploma.", status: "coming_soon" },
  { id: "abitur", name: "Abitur", region: "Germany", locale: "de-DE", description: "German university entrance qualification.", status: "coming_soon" },
  { id: "matura", name: "Matura", region: "Austria/CH/IT", locale: "de", description: "Central European secondary leaving exam.", status: "coming_soon" },
  { id: "selectividad", name: "Selectividad / EvAU", region: "Spain", locale: "es-ES", description: "Spanish university entrance.", status: "coming_soon" },
  { id: "cambridge_english", name: "Cambridge English (B2/C1)", region: "EU", locale: "en-GB", description: "English proficiency exams.", status: "coming_soon" },
  // Australia / NZ
  { id: "naplan", name: "NAPLAN", region: "Australia", locale: "en-AU", description: "Year 3/5/7/9 national assessments.", status: "coming_soon" },
  { id: "atar", name: "ATAR / HSC", region: "Australia", locale: "en-AU", description: "Australian tertiary admission rank exams.", status: "coming_soon" },
  { id: "ncea", name: "NCEA", region: "New Zealand", locale: "en-NZ", description: "National Certificate of Educational Achievement.", status: "coming_soon" },
  // Canada
  { id: "cael", name: "CAEL", region: "Canada", locale: "en-CA", description: "Canadian Academic English Language test.", status: "coming_soon" },
  { id: "celpip", name: "CELPIP", region: "Canada", locale: "en-CA", description: "Canadian English proficiency for immigration.", status: "coming_soon" },
  // Asia
  { id: "jee_main", name: "JEE Main", region: "India", locale: "en-IN", description: "Indian engineering admissions.", status: "coming_soon" },
  { id: "jee_advanced", name: "JEE Advanced", region: "India", locale: "en-IN", description: "IIT admissions.", status: "coming_soon" },
  { id: "neet", name: "NEET", region: "India", locale: "en-IN", description: "Indian medical admissions.", status: "coming_soon" },
  { id: "cuet", name: "CUET", region: "India", locale: "en-IN", description: "Common University Entrance Test.", status: "coming_soon" },
  { id: "gaokao", name: "Gaokao", region: "China", locale: "zh-CN", description: "Chinese national college entrance exam.", status: "coming_soon" },
  { id: "csat_kr", name: "CSAT (수능)", region: "South Korea", locale: "ko-KR", description: "Korean college scholastic ability test.", status: "coming_soon" },
  { id: "ceesa_jp", name: "Center Test / Common Test", region: "Japan", locale: "ja-JP", description: "Japanese university common test.", status: "coming_soon" },
  // Global / English proficiency
  { id: "ielts_intl", name: "IELTS (International)", region: "Global", locale: "en", description: "Academic & general English proficiency.", status: "coming_soon" },
  { id: "pte", name: "PTE Academic", region: "Global", locale: "en", description: "Pearson Test of English.", status: "coming_soon" },
  // International curricula
  { id: "ib_dp", name: "IB Diploma", region: "Global", locale: "en", description: "International Baccalaureate Diploma Programme.", status: "coming_soon" },
  { id: "igcse", name: "IGCSE", region: "Global", locale: "en", description: "International General Certificate of Secondary Education.", status: "coming_soon" },
];