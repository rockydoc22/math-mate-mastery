import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DISCQuadrant } from "./DISCQuadrant";
import { ChevronDown, ChevronUp, Lightbulb, Rocket } from "lucide-react";

const PROFILES: Record<string, {
  icon: string; title: string; desc: string;
  strengths: string[]; growth: string[];
  color: string;
  strengthenTips: { title: string; detail: string }[];
  maximizeTips: { title: string; detail: string }[];
}> = {
  D: {
    icon: "🔴", title: "Dominance", color: "text-red-500",
    desc: "You are results-oriented, direct, and decisive. You thrive on challenges and taking charge.",
    strengths: ["Strong leadership presence", "Quick, confident decision-making", "Results-focused under pressure", "Comfortable challenging the status quo"],
    growth: ["Active listening — pause before responding", "Showing patience with detail-oriented processes", "Considering others' emotional reactions", "Delegating with trust, not micromanaging"],
    strengthenTips: [
      { title: "Practice Active Listening", detail: "Before responding in conversations, count to 3. Repeat back what you heard. This builds trust and ensures you don't miss important context that affects your decisions." },
      { title: "Embrace Collaboration", detail: "Try asking 'What do you think?' before sharing your own opinion in meetings. You'll often find others have insights that make your decisions even stronger." },
      { title: "Slow Down on Big Decisions", detail: "Your instinct is to act fast — which is a strength. But for high-stakes choices, sleep on it. Write pros/cons. The extra reflection often leads to better outcomes." },
      { title: "Show Appreciation", detail: "People who feel valued work harder. Make it a daily habit to acknowledge one person's contribution. A simple 'great job on X' goes a long way." },
    ],
    maximizeTips: [
      { title: "Lead Strategic Projects", detail: "Your natural drive makes you ideal for spearheading initiatives. Volunteer for leadership roles in group projects, clubs, or study groups." },
      { title: "Set Ambitious Goals", detail: "You thrive on challenge. Set stretch goals and track progress weekly. Your competitive nature will fuel consistency." },
      { title: "Mentor Others", detail: "Teaching leadership to others strengthens your own skills. Offer to mentor a younger student or lead a peer study group." },
      { title: "Build a Decision Framework", detail: "Create a personal decision-making checklist. Your speed + a structured approach = unstoppable effectiveness." },
    ],
  },
  I: {
    icon: "🟡", title: "Influence", color: "text-yellow-500",
    desc: "You are enthusiastic, optimistic, and collaborative. You excel at motivating and persuading others.",
    strengths: ["Inspirational communication", "Natural team-building ability", "Creative problem-solving", "Infectious positive energy"],
    growth: ["Following through on commitments consistently", "Focusing on details and data analysis", "Managing time and avoiding overcommitting", "Being objective when emotions run high"],
    strengthenTips: [
      { title: "Build a Follow-Through System", detail: "Use a planner or app to track commitments. Your enthusiasm leads you to say 'yes' often — a system ensures you deliver on every promise." },
      { title: "Practice Data-Driven Arguments", detail: "Before your next presentation or debate, gather 3 supporting statistics. Combining your charisma with data makes you incredibly persuasive." },
      { title: "Set Time Boundaries", detail: "Your social nature is a gift, but protect your focus time. Block 2 hours daily for deep work — tell friends you'll catch up after." },
      { title: "Reflect Before Reacting", detail: "When you feel strongly about something, write your thoughts down first. This helps separate emotion from logic and leads to more balanced decisions." },
    ],
    maximizeTips: [
      { title: "Public Speaking & Debate", detail: "Your natural charisma shines in front of audiences. Join debate club, give presentations, or start a podcast. This is your superpower." },
      { title: "Build Your Network", detail: "You naturally connect with people. Be intentional about it — reach out to one new person per week in your field of interest." },
      { title: "Lead Brainstorming Sessions", detail: "Your creative energy is contagious. Organize brainstorming sessions for class projects — you'll bring out the best ideas in others." },
      { title: "Channel Optimism into Action", detail: "Pair every exciting idea with one concrete next step. Optimism + action = real results." },
    ],
  },
  S: {
    icon: "🟢", title: "Steadiness", color: "text-green-500",
    desc: "You are patient, reliable, and supportive. You value consistency and create harmonious environments.",
    strengths: ["Reliable and deeply dependable", "Excellent listener and mediator", "Team-oriented and loyal", "Patient and calm under pressure"],
    growth: ["Speaking up for your own needs and opinions", "Embracing necessary change without anxiety", "Setting clear personal boundaries", "Expressing disagreement when it matters"],
    strengthenTips: [
      { title: "Practice Assertive Communication", detail: "Start small: share one opinion per day that you'd normally keep to yourself. Use 'I feel...' or 'I think...' statements. Your perspective matters." },
      { title: "Reframe Change as Growth", detail: "When change feels uncomfortable, ask yourself: 'What can I learn from this?' Write down one positive thing about each change you encounter." },
      { title: "Set One Boundary This Week", detail: "Pick one area where you overextend yourself. Practice saying 'I'd love to help, but I can't this time.' Boundaries protect your energy for what matters most." },
      { title: "Journal About Conflict", detail: "After disagreements, write what you wish you'd said. Over time, you'll build confidence to speak up in the moment." },
    ],
    maximizeTips: [
      { title: "Become the Go-To Team Member", detail: "Your reliability is rare and valued. When working on group projects, volunteer for the coordination role — you'll ensure everything runs smoothly." },
      { title: "Deepen Your Relationships", detail: "Your loyalty creates lasting bonds. Invest in fewer, deeper friendships rather than spreading thin. Quality over quantity is your strength." },
      { title: "Create Systems & Routines", detail: "Your love of consistency means you excel at building effective habits. Create study schedules, workout routines, or organizational systems." },
      { title: "Be a Stabilizing Force", detail: "In stressful group situations, your calm presence is invaluable. Lean into this — be the person who keeps the team grounded." },
    ],
  },
  C: {
    icon: "🔵", title: "Conscientiousness", color: "text-blue-500",
    desc: "You are analytical, detail-oriented, and systematic. You value accuracy and maintain high standards.",
    strengths: ["Thorough analysis and research", "Quality-focused output", "Systematic, organized approach", "Objective, data-driven decisions"],
    growth: ["Accepting 'good enough' to avoid paralysis", "Being open to intuitive approaches", "Sharing reasoning with others proactively", "Taking action before having perfect information"],
    strengthenTips: [
      { title: "Set 'Good Enough' Deadlines", detail: "For each task, define upfront what 'done' looks like. When you hit that threshold, submit it. Perfect is the enemy of good — and your 'good enough' is already excellent." },
      { title: "Try Intuitive Decision-Making", detail: "Once a week, make a low-stakes decision based on gut feeling instead of analysis. Notice how it turns out. Building trust in your instincts adds flexibility." },
      { title: "Explain Your Thinking Out Loud", detail: "Others can't see your thorough analysis. Practice sharing your reasoning in simple terms: 'I chose this because...' This helps teams appreciate your process." },
      { title: "Start Before You're Ready", detail: "Pick one project and begin with 70% of the information. You can course-correct as you go. This builds comfort with ambiguity." },
    ],
    maximizeTips: [
      { title: "Become a Subject Matter Expert", detail: "Your analytical nature makes you perfect for deep dives. Pick a topic you love and become the most knowledgeable person in your circle about it." },
      { title: "Create Quality Standards", detail: "Offer to create rubrics, checklists, or quality guidelines for team projects. Your attention to detail elevates everyone's work." },
      { title: "Use Data to Solve Problems", detail: "When your group faces a challenge, be the person who gathers facts and presents options. Your objectivity is a superpower in emotional situations." },
      { title: "Build Documentation Habits", detail: "Your systematic nature means you create excellent notes, guides, and processes. Share these with others — you'll become an invaluable resource." },
    ],
  },
};

interface Props {
  pcts: Record<string, number>;
  primary: string;
  onRetake: () => void;
}

export const DISCResultsView = ({ pcts, primary, onRetake }: Props) => {
  const info = PROFILES[primary];
  const sorted = Object.entries(pcts).sort((a, b) => b[1] - a[1]);
  const [showStrengthen, setShowStrengthen] = useState(false);
  const [showMaximize, setShowMaximize] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-4 border-amber-500/30 bg-amber-500/5">
        <p className="text-xs text-muted-foreground">
          <strong>⚠️ Non-Clinical:</strong> Educational self-assessment only. Not a diagnostic tool.
          If you have mental health concerns, please consult a licensed professional.
        </p>
      </Card>

      {/* Primary type */}
      <Card className="p-6 text-center space-y-2">
        <span className="text-5xl">{info.icon}</span>
        <h2 className={`text-3xl font-black ${info.color}`}>{info.title}</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">{info.desc}</p>
      </Card>

      {/* Quadrant visual */}
      <Card className="p-5">
        <DISCQuadrant pcts={pcts} primary={primary} />
      </Card>

      {/* Profile Breakdown bars */}
      <Card className="p-5 space-y-4">
        <h3 className="font-bold text-foreground">Profile Breakdown</h3>
        {sorted.map(([dim, pct]) => (
          <div key={dim} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium">{PROFILES[dim].icon} {PROFILES[dim].title}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </Card>

      {/* Strengths */}
      <Card className="p-5 space-y-3">
        <h3 className="font-bold text-green-600">💪 Your Strengths</h3>
        {info.strengths.map((s, i) => (
          <p key={i} className="text-sm pl-4 border-l-2 border-green-500/30 text-foreground">{s}</p>
        ))}
      </Card>

      {/* Growth Areas */}
      <Card className="p-5 space-y-3">
        <h3 className="font-bold text-amber-600">🌱 Growth Areas</h3>
        {info.growth.map((g, i) => (
          <p key={i} className="text-sm pl-4 border-l-2 border-amber-500/30 text-foreground">{g}</p>
        ))}
      </Card>

      {/* Strengthen Weaknesses - Expandable */}
      <Card className="p-5 space-y-3">
        <button
          onClick={() => setShowStrengthen(!showStrengthen)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            How to Strengthen Your Growth Areas
          </h3>
          {showStrengthen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showStrengthen && (
          <div className="space-y-4 pt-2">
            {info.strengthenTips.map((tip, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{i + 1}. {tip.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Maximize Talents - Expandable */}
      <Card className="p-5 space-y-3">
        <button
          onClick={() => setShowMaximize(!showMaximize)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Rocket className="w-4 h-4 text-primary" />
            How to Maximize Your Current Talents
          </h3>
          {showMaximize ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showMaximize && (
          <div className="space-y-4 pt-2">
            {info.maximizeTips.map((tip, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{i + 1}. {tip.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Button onClick={onRetake} className="w-full">Retake Assessment</Button>
    </div>
  );
};
