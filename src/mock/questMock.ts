import { QuestTemplate, UserProfile } from '@/lib/dailyQuestEngine';

export const mockQuestUser: UserProfile = {
  age: 14,
  grade: 9,
  recentActivityDomains: ['math', 'reading', 'vocabulary'],
};

export const mockQuestTemplates: QuestTemplate[] = [
  { id: 'quest-math-10', name: 'Math Sprint', goal: 'Answer 10 math questions with at least 80% accuracy.', reward_coins: 25, difficulty: 'medium', domains: ['math'], minGrade: 6 },
  { id: 'quest-vocab-8', name: 'Word Builder', goal: 'Review 8 vocabulary flashcards and mark confidence honestly.', reward_coins: 20, difficulty: 'easy', domains: ['vocabulary', 'language'] },
  { id: 'quest-reading-1', name: 'Deep Read', goal: 'Complete 1 reading passage and check every explanation.', reward_coins: 30, difficulty: 'medium', domains: ['reading'] },
  { id: 'quest-science-5', name: 'Science Boost', goal: 'Solve 5 science questions without rushing.', reward_coins: 35, difficulty: 'hard', domains: ['science'], minGrade: 8 },
];

export const mockYesterdayQuestIds = ['quest-vocab-8'];
