import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Award, Trophy, Lock, Star, Flame, Crown,
  Zap, Target, BookOpen, Brain, Swords, Clock
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

// Extended achievements beyond the base set
const ALL_ACHIEVEMENTS: Record<string, { name: string; icon: string; desc: string; category: string; rarity: string }> = {
  // Base (from useGameStats)
  first_quiz: { name: "First Steps", icon: "🎯", desc: "Complete your first quiz", category: "Milestones", rarity: "common" },
  perfect_score: { name: "Perfectionist", icon: "💯", desc: "Score 100% on any quiz", category: "Skill", rarity: "rare" },
  streak_3: { name: "On Fire", icon: "🔥", desc: "3-day practice streak", category: "Consistency", rarity: "common" },
  streak_7: { name: "Dedicated", icon: "⭐", desc: "7-day practice streak", category: "Consistency", rarity: "uncommon" },
  streak_30: { name: "Legend", icon: "👑", desc: "30-day practice streak", category: "Consistency", rarity: "legendary" },
  score_10: { name: "Getting Started", icon: "📊", desc: "Complete 10 quizzes", category: "Milestones", rarity: "common" },
  score_50: { name: "Regular", icon: "📈", desc: "Complete 50 quizzes", category: "Milestones", rarity: "uncommon" },
  score_100: { name: "Veteran", icon: "🏆", desc: "Complete 100 quizzes", category: "Milestones", rarity: "rare" },
  math_master: { name: "Math Master", icon: "🧮", desc: "Score 90%+ on 10 math quizzes", category: "Skill", rarity: "rare" },
  english_ace: { name: "English Ace", icon: "📚", desc: "Score 90%+ on 10 English quizzes", category: "Skill", rarity: "rare" },
  // Extended achievements (aspirational — unlocked via coin shop or future milestones)
  speed_demon: { name: "Speed Demon", icon: "⚡", desc: "Answer 10 questions under 15 seconds each", category: "Skill", rarity: "uncommon" },
  night_owl: { name: "Night Owl", icon: "🦉", desc: "Practice after 10 PM", category: "Fun", rarity: "common" },
  early_bird: { name: "Early Bird", icon: "🐦", desc: "Practice before 7 AM", category: "Fun", rarity: "common" },
  boss_slayer: { name: "Boss Slayer", icon: "💀", desc: "Defeat 5 boss battles", category: "Combat", rarity: "uncommon" },
  champion: { name: "Champion", icon: "🥇", desc: "Reach #1 on the leaderboard", category: "Competition", rarity: "legendary" },
  team_player: { name: "Team Player", icon: "🤝", desc: "Join a study group", category: "Social", rarity: "common" },
  reviewer: { name: "Reviewer", icon: "🔄", desc: "Review 50 missed questions", category: "Growth", rarity: "uncommon" },
  explorer: { name: "Explorer", icon: "🗺️", desc: "Try every practice mode", category: "Fun", rarity: "rare" },
  endurance: { name: "Iron Will", icon: "🏋️", desc: "Complete a 50-question endurance run", category: "Skill", rarity: "rare" },
  social_butterfly: { name: "Social Butterfly", icon: "🦋", desc: "Add 5 friends", category: "Social", rarity: "uncommon" },
  vocab_king: { name: "Vocab King", icon: "📖", desc: "Master 100 vocabulary words", category: "Skill", rarity: "rare" },
  daily_warrior: { name: "Daily Warrior", icon: "⚔️", desc: "Complete 7 daily challenges", category: "Consistency", rarity: "uncommon" },
  flashcard_pro: { name: "Flashcard Pro", icon: "🃏", desc: "Review all flashcard decks", category: "Growth", rarity: "uncommon" },
  strategist: { name: "Strategist", icon: "♟️", desc: "Complete 10 strategy sessions", category: "Skill", rarity: "rare" },
  brain_trainer: { name: "Brain Trainer", icon: "🧠", desc: "Complete 20 cognitive skill games", category: "Skill", rarity: "rare" },
  centurion: { name: "Centurion", icon: "💎", desc: "Answer 1,000 questions total", category: "Milestones", rarity: "legendary" },
};

const RARITY_COLORS: Record<string, string> = {
  common: "border-gray-200 dark:border-gray-700",
  uncommon: "border-green-300 dark:border-green-700",
  rare: "border-blue-300 dark:border-blue-700",
  legendary: "border-amber-300 dark:border-amber-600",
};

const RARITY_BADGES: Record<string, string> = {
  common: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  uncommon: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  rare: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  legendary: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const CATEGORIES = ["All", "Milestones", "Consistency", "Skill", "Combat", "Competition", "Social", "Growth", "Fun"];

const Achievements = () => {
  const { user } = useAuth();
  const { achievements } = useGameStats();
  const [category, setCategory] = useState("All");

  const unlockedSet = new Set(achievements.map(a => a.achievement_type));
  const unlockedCount = Object.keys(ALL_ACHIEVEMENTS).filter(k => unlockedSet.has(k)).length;
  const totalCount = Object.keys(ALL_ACHIEVEMENTS).length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  const filtered = Object.entries(ALL_ACHIEVEMENTS).filter(([_, def]) =>
    category === "All" || def.category === category
  );

  const sortedFiltered = [...filtered].sort((a, b) => {
    const aUnlocked = unlockedSet.has(a[0]) ? 0 : 1;
    const bUnlocked = unlockedSet.has(b[0]) ? 0 : 1;
    return aUnlocked - bUnlocked;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <Award className="w-6 h-6 text-primary ml-auto" />
        </div>

        {/* Progress summary */}
        <Card className="p-5 mb-6 border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Collection Progress</p>
              <p className="text-2xl font-bold">{unlockedCount} / {totalCount}</p>
            </div>
            <div className="text-4xl">
              {progress >= 80 ? '🏆' : progress >= 50 ? '⭐' : progress >= 20 ? '🎯' : '🔒'}
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
        </Card>

        {/* Rarity legend */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {["common", "uncommon", "rare", "legendary"].map(r => (
            <span key={r} className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${RARITY_BADGES[r]}`}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </span>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {CATEGORIES.map(c => (
            <Button
              key={c}
              variant={category === c ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Achievement grid */}
        <div className="grid grid-cols-2 gap-3">
          {sortedFiltered.map(([key, def], idx) => {
            const unlocked = unlockedSet.has(key);
            const unlockedAt = achievements.find(a => a.achievement_type === key)?.unlocked_at;

            return (
              <motion.div
                key={key}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Card className={`p-4 text-center border-2 ${RARITY_COLORS[def.rarity]} ${
                  unlocked ? '' : 'opacity-50 grayscale'
                }`}>
                  <div className="text-3xl mb-2">{unlocked ? def.icon : '🔒'}</div>
                  <p className="font-semibold text-xs mb-0.5">{def.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mb-2">{def.desc}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${RARITY_BADGES[def.rarity]}`}>
                    {def.rarity}
                  </span>
                  {unlocked && unlockedAt && (
                    <p className="text-[9px] text-muted-foreground mt-1">
                      {new Date(unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {sortedFiltered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <p className="text-sm">No achievements in this category</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Achievements;
