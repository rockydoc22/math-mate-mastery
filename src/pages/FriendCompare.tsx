import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Trophy, TrendingUp, Swords, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface FriendStats {
  id: string;
  username: string;
  avatar_emoji: string;
  totalQuestions: number;
  accuracy: number;
  quizCount: number;
  streak: number;
}

const FriendCompare = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [friends, setFriends] = useState<FriendStats[]>([]);
  const [myStats, setMyStats] = useState<FriendStats | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Load my profile
      const { data: myProfile } = await supabase
        .from("profiles")
        .select("username, avatar_emoji")
        .eq("id", user.id)
        .maybeSingle();

      // Load my stats
      const { data: myAttempts } = await supabase
        .from("question_attempts")
        .select("is_correct")
        .eq("user_id", user.id);

      const { data: myQuizzes } = await supabase
        .from("quiz_scores")
        .select("id")
        .eq("user_id", user.id);

      const { data: myStreak } = await supabase
        .from("streaks")
        .select("current_streak")
        .eq("user_id", user.id)
        .maybeSingle();

      const myTotal = myAttempts?.length || 0;
      const myCorrect = myAttempts?.filter(a => a.is_correct).length || 0;

      setMyStats({
        id: user.id,
        username: myProfile?.username || "You",
        avatar_emoji: myProfile?.avatar_emoji || "😎",
        totalQuestions: myTotal,
        accuracy: myTotal > 0 ? (myCorrect / myTotal) * 100 : 0,
        quizCount: myQuizzes?.length || 0,
        streak: myStreak?.current_streak || 0,
      });

      // Load accepted friends
      const { data: friendships } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id")
        .eq("status", "accepted")
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (!friendships || friendships.length === 0) {
        setFriends([]);
        setLoading(false);
        return;
      }

      const friendIds = friendships.map(f =>
        f.requester_id === user.id ? f.addressee_id : f.requester_id
      );

      // Load friend profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_emoji")
        .in("id", friendIds);

      // For each friend, get their public quiz stats
      const friendStats: FriendStats[] = [];
      for (const profile of profiles || []) {
        const { data: scores } = await supabase
          .from("quiz_scores")
          .select("score, total_questions, percentage")
          .eq("user_id", profile.id);

        const totalQ = scores?.reduce((sum, s) => sum + s.total_questions, 0) || 0;
        const totalCorrect = scores?.reduce((sum, s) => sum + s.score, 0) || 0;

        friendStats.push({
          id: profile.id,
          username: profile.username,
          avatar_emoji: profile.avatar_emoji || "😎",
          totalQuestions: totalQ,
          accuracy: totalQ > 0 ? (totalCorrect / totalQ) * 100 : 0,
          quizCount: scores?.length || 0,
          streak: 0, // Can't see others' streaks
        });
      }

      setFriends(friendStats);
      if (friendStats.length > 0) setSelectedFriend(friendStats[0]);
    } catch (err) {
      console.error("Error loading friend data:", err);
    }

    setLoading(false);
  };

  const getComparisonColor = (myVal: number, theirVal: number) => {
    if (myVal > theirVal) return "text-emerald-500";
    if (myVal < theirVal) return "text-red-500";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" /> Friend Compare
          </h1>
          <p className="text-xs text-muted-foreground">See how you stack up</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading stats...</p>
          </div>
        ) : friends.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-2">No Friends Yet</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add friends to compare your stats and motivate each other!
            </p>
            <Button onClick={() => navigate("/friends")}>
              <Users className="w-4 h-4 mr-2" /> Find Friends
            </Button>
          </Card>
        ) : (
          <>
            {/* Friend Selector */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {friends.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFriend(f)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl shrink-0 transition-all ${
                    selectedFriend?.id === f.id
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xl">{f.avatar_emoji}</span>
                  <span className="text-[10px] font-medium max-w-[60px] truncate">{f.username}</span>
                </button>
              ))}
            </div>

            {/* Comparison Card */}
            {selectedFriend && myStats && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={selectedFriend.id}>
                <Card className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1">
                      <p className="text-2xl">{myStats.avatar_emoji}</p>
                      <p className="text-xs font-bold text-foreground mt-1">{myStats.username}</p>
                      <p className="text-[10px] text-muted-foreground">You</p>
                    </div>
                    <div className="px-3">
                      <Swords className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-2xl">{selectedFriend.avatar_emoji}</p>
                      <p className="text-xs font-bold text-foreground mt-1">{selectedFriend.username}</p>
                      <p className="text-[10px] text-muted-foreground">Friend</p>
                    </div>
                  </div>

                  {/* Stat Rows */}
                  {[
                    { label: "Questions Answered", myVal: myStats.totalQuestions, theirVal: selectedFriend.totalQuestions, format: (v: number) => v.toString() },
                    { label: "Accuracy", myVal: myStats.accuracy, theirVal: selectedFriend.accuracy, format: (v: number) => `${v.toFixed(1)}%` },
                    { label: "Quizzes Completed", myVal: myStats.quizCount, theirVal: selectedFriend.quizCount, format: (v: number) => v.toString() },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center py-3 border-t border-border">
                      <div className="flex-1 text-right">
                        <p className={`text-lg font-bold ${getComparisonColor(stat.myVal, stat.theirVal)}`}>
                          {stat.format(stat.myVal)}
                        </p>
                      </div>
                      <div className="px-4 text-center min-w-[100px]">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      </div>
                      <div className="flex-1">
                        <p className={`text-lg font-bold ${getComparisonColor(stat.theirVal, stat.myVal)}`}>
                          {stat.format(stat.theirVal)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Winner */}
                  {(() => {
                    let myWins = 0;
                    let theirWins = 0;
                    if (myStats.totalQuestions > selectedFriend.totalQuestions) myWins++;
                    else if (myStats.totalQuestions < selectedFriend.totalQuestions) theirWins++;
                    if (myStats.accuracy > selectedFriend.accuracy) myWins++;
                    else if (myStats.accuracy < selectedFriend.accuracy) theirWins++;
                    if (myStats.quizCount > selectedFriend.quizCount) myWins++;
                    else if (myStats.quizCount < selectedFriend.quizCount) theirWins++;

                    return (
                      <div className="mt-3 pt-3 border-t border-border text-center">
                        {myWins > theirWins ? (
                          <p className="text-sm font-bold text-emerald-500">🏆 You're winning!</p>
                        ) : theirWins > myWins ? (
                          <p className="text-sm font-bold text-amber-500">🔥 They're ahead — keep pushing!</p>
                        ) : (
                          <p className="text-sm font-bold text-primary">🤝 It's a tie!</p>
                        )}
                      </div>
                    );
                  })()}
                </Card>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full gap-2" onClick={() => navigate("/battle")}>
                <Swords className="w-4 h-4" /> Challenge to Battle
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/friends")}>
                <Users className="w-4 h-4" /> Manage Friends
              </Button>
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default FriendCompare;
