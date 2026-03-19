import { SkillMastery, PracticeQuestion } from "@/lib/weakAreaPracticeEngine";

export const mockMastery: SkillMastery[] = [
  { subject: "SAT Math", domain: "Algebra", skill: "Linear equations", mastery: 42, recentAccuracy: 0.58, recentAttempts: 7 },
  { subject: "SAT Math", domain: "Algebra", skill: "Systems of equations", mastery: 35, recentAccuracy: 0.49, recentAttempts: 5 },
  { subject: "SAT Math", domain: "Geometry", skill: "Circles", mastery: 71, recentAccuracy: 0.8, recentAttempts: 12 },
  { subject: "SAT Reading", domain: "Comprehension", skill: "Inference", mastery: 54, recentAccuracy: 0.63, recentAttempts: 9 },
];

export const mockQuestionBank: PracticeQuestion[] = [
  {
    id: "q1",
    subject: "SAT Math",
    domain: "Algebra",
    skill: "Linear equations",
    difficulty: "medium",
    prompt: "Solve: 3x + 5 = 20",
    options: ["x = 3", "x = 5", "x = 10", "x = 15"],
    correctIndex: 1,
    explanation: "Subtract 5, then divide by 3.",
  },
  {
    id: "q2",
    subject: "SAT Math",
    domain: "Algebra",
    skill: "Systems of equations",
    difficulty: "easy",
    prompt: "If x + y = 6 and x = 2, what is y?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2,
  },
];
