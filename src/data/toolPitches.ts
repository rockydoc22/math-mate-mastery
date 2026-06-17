// Single source of truth for tool one-liners and mascot grouping.
// Used by MascotDashboard, SubjectPinManager, and Home's tile tooltips.

export type MascotKey = "hoot" | "bolt" | "nova" | "quest" | "sage";

export interface MascotDef {
  key: MascotKey;
  emoji: string;
  name: string;
  pitch: string; // one-line persona pitch
}

export const MASCOTS: MascotDef[] = [
  { key: "hoot",  emoji: "🦉", name: "Professor Hoot", pitch: "Helps you study and remember." },
  { key: "bolt",  emoji: "🎯", name: "Coach Bolt",     pitch: "Drills your weak spots." },
  { key: "nova",  emoji: "🤖", name: "Nova",           pitch: "Your AI study buddy." },
  { key: "quest", emoji: "⚔️", name: "Captain Quest",  pitch: "Games, battles, and challenges." },
  { key: "sage",  emoji: "📊", name: "Sage",           pitch: "Tracks progress and plans." },
];

export interface ToolMeta {
  emoji: string;
  pitch: string; // ≤ 7 words
  mascot: MascotKey;
}

// id matches the dashboard tile ids in Home.tsx
export const TOOL_META: Record<string, ToolMeta> = {
  // 🦉 Hoot — studying
  "sat-vocab":       { emoji: "📗", pitch: "Learn high-frequency exam words.",     mascot: "hoot" },
  "flashcards":      { emoji: "🃏", pitch: "Spaced-repetition flashcards.",        mascot: "hoot" },
  "key-rules":       { emoji: "💡", pitch: "Quick rules that show up most.",       mascot: "hoot" },
  "cheat-sheet":     { emoji: "📄", pitch: "One-page formula reference.",          mascot: "hoot" },
  "concepts":        { emoji: "🔬", pitch: "Browse concepts by topic.",            mascot: "hoot" },
  "word-of-day":     { emoji: "🗣️", pitch: "A new word every day.",                mascot: "hoot" },

  // 🎯 Bolt — practice & drills
  "by-topic":        { emoji: "📖", pitch: "Practice any topic, your pace.",       mascot: "bolt" },
  "weaknesses":      { emoji: "🎯", pitch: "Hit your weakest skills first.",       mascot: "bolt" },
  "review-missed":   { emoji: "🔄", pitch: "Redo questions you got wrong.",        mascot: "bolt" },
  "booster":         { emoji: "🚀", pitch: "Short test on shaky topics.",          mascot: "bolt" },
  "full-test":       { emoji: "📝", pitch: "Take a full timed test.",              mascot: "bolt" },
  "speed-drill":     { emoji: "⚡", pitch: "Fast-paced accuracy drill.",           mascot: "bolt" },
  "endurance":       { emoji: "🔥", pitch: "Endless mode — 3 lives.",              mascot: "bolt" },

  // 🤖 Nova — AI help
  "ai-tutor":        { emoji: "💬", pitch: "Chat with an AI tutor.",               mascot: "nova" },
  "coach":           { emoji: "✨", pitch: "Your daily AI study plan.",            mascot: "nova" },
  "thinkpath":       { emoji: "🧭", pitch: "Walks you through the thinking.",      mascot: "nova" },
  "homework-solver": { emoji: "📐", pitch: "Snap a problem, get steps.",           mascot: "nova" },
  "explore":         { emoji: "🧠", pitch: "Quick IQ and learning style.",         mascot: "nova" },

  // ⚔️ Quest — games & social
  "arcade":          { emoji: "🎮", pitch: "Mini-games for skill practice.",       mascot: "quest" },
  "boss-battle":     { emoji: "💀", pitch: "Beat the boss with accuracy.",         mascot: "quest" },
  "story-missions":  { emoji: "🚀", pitch: "Story-driven study missions.",         mascot: "quest" },
  "elite-practice":  { emoji: "👑", pitch: "Top-tier hard questions only.",        mascot: "quest" },
  "friend-compare":  { emoji: "🤝", pitch: "Compare with friends.",                mascot: "quest" },
  "study-groups":    { emoji: "👥", pitch: "Study together with classmates.",      mascot: "quest" },
  "daily-quests":    { emoji: "⭐", pitch: "Fresh daily challenges.",              mascot: "quest" },

  // 📊 Sage — progress & planning
  "study-progress":  { emoji: "🏆", pitch: "Mastery by topic.",                    mascot: "sage" },
  "insights":        { emoji: "🧠", pitch: "What's working and what isn't.",       mascot: "sage" },
  "score-predictor": { emoji: "📈", pitch: "Predicted score for test day.",        mascot: "sage" },
  "study-planner":   { emoji: "🗓️", pitch: "Plan your week of practice.",         mascot: "sage" },
  "streak-calendar": { emoji: "📅", pitch: "See your streak on a calendar.",       mascot: "sage" },
  "weekly-goals":    { emoji: "🎯", pitch: "Set and hit weekly goals.",            mascot: "sage" },
  "mistake-journal": { emoji: "📓", pitch: "Patterns in your wrong answers.",      mascot: "sage" },
  "progress-report": { emoji: "📊", pitch: "Printable report card.",               mascot: "sage" },
  "exam-simulator":  { emoji: "⏱️", pitch: "Real-time exam simulation.",           mascot: "sage" },
  "study-guide":     { emoji: "✨", pitch: "Your personalized study guide.",        mascot: "sage" },
  "quick-review":    { emoji: "🔁", pitch: "5-minute focused review.",             mascot: "sage" },
};

export function getToolMeta(id: string): ToolMeta | undefined {
  return TOOL_META[id];
}