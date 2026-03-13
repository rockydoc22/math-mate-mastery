import { useState, useCallback } from "react";

export interface MistakePattern {
  id: string;
  feedback: string;
  followUpSkill: string;
  subject: string;
}

interface PatternDef {
  id: string;
  signals: string[];
  feedback: string;
  follow_up_skill: string;
}

// Inline the patterns from mistake_coach_config.json for fast runtime access
const PATTERNS: Record<string, PatternDef[]> = {
  math: [
    { id: "sign_error", signals: ["negative", "positive", "sign", "distribution"], feedback: "Check the signs when combining or distributing terms.", follow_up_skill: "algebra_signs" },
    { id: "operation_swap", signals: ["added instead", "multiplied", "divided instead"], feedback: "Pause and identify the operation the question is asking for before calculating.", follow_up_skill: "operation_selection" },
    { id: "slope_intercept_confusion", signals: ["slope", "intercept", "y-intercept"], feedback: "Slope tells how fast the line changes; intercept tells where it crosses the y-axis.", follow_up_skill: "graphing_linear_equations" },
    { id: "formula_selection", signals: ["wrong formula", "geometry"], feedback: "Choose the formula that matches the shape before plugging in values.", follow_up_skill: "geometry_formulas" },
  ],
  english: [
    { id: "detail_vs_main_idea", signals: ["main idea", "detail", "central"], feedback: "Look for the sentence that captures the whole passage, not just one example.", follow_up_skill: "main_idea" },
    { id: "inference_without_evidence", signals: ["inference", "assumption", "evidence"], feedback: "For inference questions, your choice should be supported by clues in the passage.", follow_up_skill: "inference" },
    { id: "tone_confusion", signals: ["tone", "attitude"], feedback: "Pay attention to descriptive word choice to identify tone.", follow_up_skill: "author_tone" },
  ],
  science: [
    { id: "variable_confusion", signals: ["variable", "independent", "dependent"], feedback: "Ask what is being changed and what is being measured.", follow_up_skill: "scientific_method" },
    { id: "cause_effect_mixup", signals: ["cause", "effect", "causal"], feedback: "Trace the process step by step to identify what causes what.", follow_up_skill: "cause_effect" },
  ],
  writing: [
    { id: "grammar_vs_style", signals: ["grammar", "style", "stylistic"], feedback: "First eliminate options with grammar errors; then choose the clearest style.", follow_up_skill: "grammar_editing" },
    { id: "transition_mismatch", signals: ["transition", "contrast", "sequence"], feedback: "Match the transition to the relationship: contrast, cause, sequence, or example.", follow_up_skill: "transitions" },
  ],
};

export interface CoachFeedback {
  headline: string;
  body: string;
  pattern: MistakePattern | null;
  retryPrompt: string;
}

export function useMistakeCoach() {
  const [lastFeedback, setLastFeedback] = useState<CoachFeedback | null>(null);
  const [patternHistory, setPatternHistory] = useState<MistakePattern[]>([]);

  const detectPattern = useCallback((
    skill: string,
    domain: string,
    _questionText?: string,
  ): MistakePattern | null => {
    const subjectKey = domain.toLowerCase().replace(/\s+/g, "_");
    const patterns = PATTERNS[subjectKey] || PATTERNS.math;

    // Try to match by skill name overlap
    const normalizedSkill = skill.toLowerCase();
    for (const p of patterns) {
      if (
        p.id.includes(normalizedSkill) ||
        normalizedSkill.includes(p.id.replace(/_/g, " ")) ||
        p.signals.some(s => normalizedSkill.includes(s.toLowerCase().split(" ")[0]))
      ) {
        return { id: p.id, feedback: p.feedback, followUpSkill: p.follow_up_skill, subject: domain };
      }
    }

    // Fallback: return first pattern for the subject as a generic hint
    if (patterns.length > 0) {
      const fallback = patterns[0];
      return { id: fallback.id, feedback: fallback.feedback, followUpSkill: fallback.follow_up_skill, subject: domain };
    }
    return null;
  }, []);

  const onIncorrectAnswer = useCallback((
    skill: string,
    domain: string,
    questionText?: string,
  ) => {
    const pattern = detectPattern(skill, domain, questionText);

    const feedback: CoachFeedback = {
      headline: "What happened here?",
      body: pattern
        ? `It looks like ${pattern.feedback.charAt(0).toLowerCase()}${pattern.feedback.slice(1)}`
        : "One mistake is data, not failure. Review the explanation and try again.",
      pattern,
      retryPrompt: "Try one more like this with a quick hint.",
    };

    setLastFeedback(feedback);
    if (pattern) {
      setPatternHistory(prev => [...prev.slice(-19), pattern]);
    }

    return feedback;
  }, [detectPattern]);

  const clearFeedback = useCallback(() => setLastFeedback(null), []);

  // Get recurring patterns (appeared 2+ times)
  const recurringPatterns = patternHistory.reduce<Record<string, number>>((acc, p) => {
    acc[p.id] = (acc[p.id] || 0) + 1;
    return acc;
  }, {});

  const topRecurring = Object.entries(recurringPatterns)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => patternHistory.find(p => p.id === id)!)
    .filter(Boolean);

  return {
    lastFeedback,
    onIncorrectAnswer,
    clearFeedback,
    topRecurring,
    patternHistory,
  };
}
