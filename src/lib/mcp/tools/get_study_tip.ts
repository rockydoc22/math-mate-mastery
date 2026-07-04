import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const TIPS: Record<string, string[]> = {
  sat: [
    "Pace: aim for ~82 seconds per math question and ~71 seconds per reading/writing question.",
    "For SAT Reading, always find explicit evidence in the passage before choosing.",
    "Skip and return: don't burn 3+ minutes on any single question.",
  ],
  act: [
    "ACT Science rewards fast graph/table reading — don't over-read the passage first.",
    "ACT English tests concision: shorter answers are correct more often than chance.",
  ],
  ap: [
    "For AP FRQs, always define terms and label units to earn every rubric point.",
    "Practice with authentic released FRQs; timing matters as much as content.",
  ],
  general: [
    "Space your practice: 20 minutes daily beats 3 hours weekly.",
    "Review every wrong answer — the mistake journal is where real gains come from.",
    "Take a full-length timed practice test at least once every 2 weeks before test day.",
  ],
};

export default defineTool({
  name: "get_study_tip",
  title: "Get a study tip",
  description: "Get concise study and test-taking tips for a given exam family (sat, act, ap, or general).",
  inputSchema: {
    exam: z.enum(["sat", "act", "ap", "general"]).describe("Exam family."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ exam }) => {
    const tips = TIPS[exam] ?? TIPS.general;
    return {
      content: [{ type: "text", text: tips.map((t, i) => `${i + 1}. ${t}`).join("\n") }],
      structuredContent: { exam, tips },
    };
  },
});