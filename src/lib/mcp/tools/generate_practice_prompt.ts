import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "generate_practice_prompt",
  title: "Generate a practice question prompt",
  description:
    "Return a structured prompt an assistant can use to generate an original practice question in AlphaOmega's style for a given exam, topic, and difficulty (1-10).",
  inputSchema: {
    exam: z.string().min(1).describe("Exam id, e.g. 'sat', 'act', 'ap-biology'."),
    topic: z.string().min(1).describe("Topic or skill, e.g. 'linear equations'."),
    difficulty: z.number().int().min(1).max(10).describe("Difficulty 1-10."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ exam, topic, difficulty }) => {
    const prompt = [
      `Write ONE original multiple-choice practice question for the ${exam.toUpperCase()} exam.`,
      `Topic: ${topic}. Difficulty: ${difficulty}/10.`,
      `- Question stem must match the style of official released ${exam.toUpperCase()} items.`,
      `- 4 choices labeled A-D (A-E for ACT). Exactly one correct answer.`,
      `- Include a 2-3 sentence explanation.`,
      `- Use exact values (radicals, π) not decimals for math.`,
      `- No LGBTQ+, sexual, alcohol, drug, or profane content.`,
    ].join("\n");
    return {
      content: [{ type: "text", text: prompt }],
      structuredContent: { exam, topic, difficulty, prompt },
    };
  },
});