import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Users, Trophy, Plus, Copy, Check, Zap,
  Flame, Target, Crown, ChevronRight, Star
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface GroupMember {
  id: string;
  username: string;
  avatar_emoji: string;
  questionsThisWeek: number;
  accuracyThisWeek: number;
  streakDays: number;
}

// Demo data for study groups (real implementation would use DB)
const DEMO_CHALLENGES = [
  { id: "c1", title: "100 Questions Sprint", description: "First team to 100 questions this week wins", goal: 100, metric: "questions", icon: "🏃" },
  { id: "c2", title: "Accuracy King", description: "Highest group accuracy by Sunday midnight", goal: 90, metric: "accuracy", icon: "🎯" },
  { id: "c3", title: "Streak Warriors", description: "Every member maintains a 5-day streak", goal: 5, metric: "streak", icon: "🔥" },
  { id: "c4", title: "Topic Master", description: "Master 3 new topics as a group", goal: 3, metric: "mastery", icon: "👑" },
];

const StudyGroups = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("my-group");
  const [groupCode, setGroupCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [hasGroup, setHasGroup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState(DEMO_CHALLENGES[0]);
  const [groupProgress, setGroupProgress] = useState(0);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadGroupData();
  }, [user]);

  const loadGroupData = async () => {
    if (!user) return;
    setLoading(false);

    // Check for friends to simulate group
    const { data: friendships } = await supabase
      .from('friendships')
      .select('requester_id, addressee_id')
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq('status', 'accepted')
      .limit(5);

    if (friendships && friendships.length > 0) {
      const friendIds = friendships.map(f =>
        f.requester_id === user.id ? f.addressee_id : f.requester_id
      );

      // Get friend profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, avatar_emoji')
        .in('id', friendIds);

      if (profiles) {
        const groupMembers: GroupMember[] = profiles.map(p => ({
          id: p.id,
          username: p.username,
          avatar_emoji: p.avatar_emoji || '👤',
          questionsThisWeek: Math.floor(Math.random() * 80) + 10,
          accuracyThisWeek: Math.floor(Math.random() * 30) + 65,
          streakDays: Math.floor(Math.random() * 10),
        }));

        // Add self
        const { data: myProfile } = await supabase
          .from('profiles')
          .select('username, avatar_emoji')
          .eq('id', user.id)
          .maybeSingle();

        if (myProfile) {
          groupMembers.unshift({
            id: user.id,
            username: myProfile.username + ' (You)',
            avatar_emoji: myProfile.avatar_emoji || '👤',
            questionsThisWeek: Math.floor(Math.random() * 80) + 10,
            accuracyThisWeek: Math.floor(Math.random() * 30) + 65,
            streakDays: Math.floor(Math.random() * 10),
          });
        }

        setMembers(groupMembers);
        setHasGroup(true);
        setGroupCode(`GRP-${user.id.slice(0, 6).toUpperCase()}`);
        setGroupProgress(Math.floor(Math.random() * 60) + 20);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Share this code with friends" });
  };

  const handleCreateGroup = () => {
    const code = `GRP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setGroupCode(code);
    setHasGroup(true);
    if (user) {
      setMembers([{
        id: user.id,
        username: 'You',
        avatar_emoji: '😎',
        questionsThisWeek: 0,
        accuracyThisWeek: 0,
        streakDays: 0,
      }]);
    }
    toast({ title: "Group Created!", description: `Share code: ${code}` });
  };

  const handleJoinGroup = () => {
    if (!joinCode.trim()) return;
    toast({ title: "Joined Group!", description: `You joined group ${joinCode}` });
    setHasGroup(true);
    setGroupCode(joinCode);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4 text-center py-20">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Sign in to join Study Groups</h2>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Study Groups</h1>
          <Users className="w-6 h-6 text-primary ml-auto" />
        </div>

        {!hasGroup ? (
          /* Create or Join */
          <div className="space-y-6">
            <Card className="p-6 text-center border-dashed border-2">
              <Plus className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Create a Study Group</h3>
              <p className="text-sm text-muted-foreground mb-4">Start a group and invite friends to compete in weekly challenges</p>
              <Button onClick={handleCreateGroup} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Create Group
              </Button>
            </Card>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Join a Group</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter group code..."
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                />
                <Button onClick={handleJoinGroup} disabled={!joinCode.trim()}>Join</Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Group Dashboard */
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="my-group">Group</TabsTrigger>
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            </TabsList>

            <TabsContent value="my-group">
              {/* Group code */}
              <Card className="p-4 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Group Code</p>
                  <p className="font-mono font-bold text-lg">{groupCode}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </Card>

              {/* Members */}
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Members ({members.length})
              </h3>
              <div className="space-y-2 mb-4">
                {members.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-3 flex items-center gap-3">
                      <span className="text-2xl">{m.avatar_emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{m.username}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{m.questionsThisWeek} Qs</span>
                          <span className="flex items-center gap-1"><Target className="w-3 h-3" />{m.accuracyThisWeek}%</span>
                          <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{m.streakDays}d</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Link to="/friends">
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Invite Friends
                </Button>
              </Link>
            </TabsContent>

            <TabsContent value="challenge">
              {/* Active Challenge */}
              <Card className="p-5 mb-4 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{activeChallenge.icon}</span>
                  <div>
                    <h3 className="font-bold">{activeChallenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{activeChallenge.description}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Group Progress</span>
                    <span className="font-bold">{groupProgress}/{activeChallenge.goal}</span>
                  </div>
                  <Progress value={(groupProgress / activeChallenge.goal) * 100} className="h-3" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">⏰ Resets every Monday at midnight</p>
              </Card>

              {/* Other challenges */}
              <h3 className="font-semibold mb-3">Available Challenges</h3>
              <div className="space-y-2">
                {DEMO_CHALLENGES.filter(c => c.id !== activeChallenge.id).map(ch => (
                  <Card
                    key={ch.id}
                    className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      setActiveChallenge(ch);
                      setGroupProgress(Math.floor(Math.random() * 40));
                      toast({ title: "Challenge Activated!", description: ch.title });
                    }}
                  >
                    <span className="text-2xl">{ch.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{ch.title}</p>
                      <p className="text-xs text-muted-foreground">{ch.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Weekly Rankings
              </h3>
              <div className="space-y-2">
                {[...members].sort((a, b) => b.questionsThisWeek - a.questionsThisWeek).map((m, idx) => (
                  <Card key={m.id} className={`p-3 flex items-center gap-3 ${idx === 0 ? 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      : idx === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                      : idx === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300'
                      : 'bg-muted text-muted-foreground'
                    }`}>
                      {idx === 0 ? <Crown className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="text-xl">{m.avatar_emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{m.username}</p>
                      <p className="text-xs text-muted-foreground">{m.questionsThisWeek} questions · {m.accuracyThisWeek}% acc</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{m.questionsThisWeek}</p>
                      <p className="text-[10px] text-muted-foreground">Qs</p>
                    </div>
                  </Card>
                ))}
              </div>

              {members.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Invite friends to see rankings!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default StudyGroups;
