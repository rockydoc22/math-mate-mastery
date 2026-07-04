import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const EXAMS = [
  { id: "sat", name: "SAT", category: "College Admissions" },
  { id: "psat", name: "PSAT", category: "College Admissions" },
  { id: "act", name: "ACT", category: "College Admissions" },
  { id: "clt", name: "CLT", category: "College Admissions" },
  { id: "ap", name: "AP Exams (Biology, Calculus, Chemistry, Physics, US History, etc.)", category: "Advanced Placement" },
  { id: "ib", name: "IB", category: "International" },
  { id: "toefl", name: "TOEFL", category: "Language" },
  { id: "gmat", name: "GMAT", category: "Graduate Admissions" },
  { id: "lsat", name: "LSAT", category: "Graduate Admissions" },
  { id: "nclex", name: "NCLEX", category: "Professional" },
  { id: "teas", name: "TEAS", category: "Professional" },
  { id: "dat", name: "DAT", category: "Professional" },
  { id: "oat", name: "OAT", category: "Professional" },
  { id: "accuplacer", name: "ACCUPLACER", category: "Placement" },
  { id: "map", name: "MAP Growth", category: "K-12" },
  { id: "iowa", name: "Iowa / Stanford 10", category: "K-12" },
  { id: "terranova", name: "TerraNova", category: "K-12" },
];

export default defineTool({
  name: "list_exams",
  title: "List supported exams",
  description: "List all standardized exams and test categories supported by AlphaOmega.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EXAMS, null, 2) }],
    structuredContent: { exams: EXAMS },
  }),
});