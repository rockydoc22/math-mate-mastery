import { defineMcp } from "@lovable.dev/mcp-js";
import listExamsTool from "./tools/list_exams";
import getStudyTipTool from "./tools/get_study_tip";
import generatePracticePromptTool from "./tools/generate_practice_prompt";

export default defineMcp({
  name: "alphaomega-mcp",
  title: "AlphaOmega Test Prep",
  version: "0.1.0",
  instructions:
    "Tools for AlphaOmega — a free test prep platform covering SAT, ACT, AP, IB, PSAT, GMAT, LSAT, NCLEX, TEAS, and 40+ K-12 and professional exams. Use `list_exams` to discover supported exams, `get_study_tip` for exam-specific tips, and `generate_practice_prompt` to build a prompt for producing an original practice question in AlphaOmega's style.",
  tools: [listExamsTool, getStudyTipTool, generatePracticePromptTool],
});