import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Swords, Users, ArrowLeft, Zap, Skull, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const BattleLobby = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [joinCode, setJoinCode] = useState("");
  const [subject, setSubject] = useState("both");
  const [questionCount, setQuestionCount] = useState("10");
  const [maxPlayers, setMaxPlayers] = useState("4");
  const [timeLimit, setTimeLimit] = useState("300"); // default 5 minutes
  const [battleMode, setBattleMode] = useState("sudden_death");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreatingSolo, setIsCreatingSolo] = useState(false);

  // Auto-start Quick Duel if ?mode=quick_duel
  useEffect(() => {
    if (searchParams.get("mode") === "quick_duel" && user && !isCreatingSolo) {
      startQuickDuel();
    }
  }, []);

  const startQuickDuel = async () => {
    if (!user || isCreatingSolo) return;
    setIsCreatingSolo(true);
    try {
      const code = generateRoomCode();
      const { data: room, error } = await supabase
        .from("battle_rooms")
        .insert({
          host_id: user.id,
          room_code: code,
          subject: "both",
          question_count: 3,
          max_players: 2,
          time_limit_seconds: 45,
          battle_mode: "quick_duel",
          is_solo: true,
          status: "in_progress",
          started_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      await supabase.from("battle_participants").insert({ room_id: room.id, user_id: user.id });
      navigate(`/battle/${code}`);
    } catch (e) {
      console.error("Quick Duel error:", e);
      toast.error("Failed to start Quick Duel");
    } finally {
      setIsCreatingSolo(false);
    }
  };

  const generateRoomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateRoom = async () => {
    if (!user) {
      toast.error("Please sign in to create a battle");
      navigate("/auth");
      return;
    }

    setIsCreating(true);
    try {
      const roomCode = generateRoomCode();
      
      const { data: room, error: roomError } = await supabase
        .from("battle_rooms")
        .insert({
        host_id: user.id,
        room_code: roomCode,
        subject,
        question_count: parseInt(questionCount),
        max_players: parseInt(maxPlayers),
        time_limit_seconds: parseInt(timeLimit) || null,
        battle_mode: battleMode,
      })
        .select()
        .single();

      if (roomError) throw roomError;

      // Host joins as participant
      const { error: joinError } = await supabase
        .from("battle_participants")
        .insert({
          room_id: room.id,
          user_id: user.id,
        });

      if (joinError) throw joinError;

      navigate(`/battle/${roomCode}`);
    } catch (error: any) {
      console.error("Error creating room:", error);
      toast.error("Failed to create battle room");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateSoloRoom = async () => {
    if (!user) {
      toast.error("Please sign in to start a solo battle");
      navigate("/auth");
      return;
    }

    setIsCreatingSolo(true);
    try {
      const roomCode = generateRoomCode();
      
      const { data: room, error: roomError } = await supabase
        .from("battle_rooms")
        .insert({
          host_id: user.id,
          room_code: roomCode,
          subject,
          question_count: parseInt(questionCount),
          max_players: 2,
          time_limit_seconds: parseInt(timeLimit) || null,
          battle_mode: battleMode,
          is_solo: true,
          status: "in_progress", // Start immediately
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // Host joins as participant
      const { error: joinError } = await supabase
        .from("battle_participants")
        .insert({
          room_id: room.id,
          user_id: user.id,
        });

      if (joinError) throw joinError;

      navigate(`/battle/${roomCode}`);
    } catch (error: any) {
      console.error("Error creating solo room:", error);
      toast.error("Failed to create solo battle");
    } finally {
      setIsCreatingSolo(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!user) {
      toast.error("Please sign in to join a battle");
      navigate("/auth");
      return;
    }

    if (!joinCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }

    setIsJoining(true);
    try {
      const { data: room, error: roomError } = await supabase
        .from("battle_rooms")
        .select("*, battle_participants(count)")
        .eq("room_code", joinCode.toUpperCase())
        .single();

      if (roomError || !room) {
        toast.error("Room not found");
        return;
      }

      if (room.status !== "waiting") {
        toast.error("This battle has already started");
        return;
      }

      const participantCount = (room.battle_participants as any)?.[0]?.count || 0;
      if (participantCount >= room.max_players) {
        toast.error("Room is full");
        return;
      }

      // Check if already joined
      const { data: existing } = await supabase
        .from("battle_participants")
        .select()
        .eq("room_id", room.id)
        .eq("user_id", user.id)
        .single();

      if (!existing) {
        const { error: joinError } = await supabase
          .from("battle_participants")
          .insert({
            room_id: room.id,
            user_id: user.id,
          });

        if (joinError) throw joinError;
      }

      navigate(`/battle/${joinCode.toUpperCase()}`);
    } catch (error: any) {
      console.error("Error joining room:", error);
      toast.error("Failed to join battle room");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Swords className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Where Friends Defeat Friends
            </h1>
          </div>
          <p className="text-muted-foreground">Ready for a Good Ole Time SAT Butt Whooping?</p>
        </div>

        {/* Solo vs SAT Button */}
        <Card className="border-primary/40 bg-gradient-to-r from-primary/10 to-primary/5 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Bot className="w-10 h-10 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Solo vs SAT</h3>
                  <p className="text-sm text-muted-foreground">Battle an AI opponent matched to your skill level</p>
                </div>
              </div>
              <Button 
                onClick={handleCreateSoloRoom}
                disabled={isCreatingSolo}
                size="lg"
                className="w-full md:w-auto"
              >
                {isCreatingSolo ? "Starting..." : "Start Solo Battle"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Create Room */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                The First Rule of Fight Club Is: Pick Your Weapon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Math & English</SelectItem>
                    <SelectItem value="math">Just Math</SelectItem>
                    <SelectItem value="english">Just English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">The Second Rule of Fight Club Is: Format</label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions (Quick)</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration</label>
                <Select value={timeLimit} onValueChange={setTimeLimit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Limit (Relaxed)</SelectItem>
                    <SelectItem value="180">3 Minutes (Speed)</SelectItem>
                    <SelectItem value="300">5 Minutes (Standard)</SelectItem>
                    <SelectItem value="600">10 Minutes (Extended)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Max Players</label>
                <Select value={maxPlayers} onValueChange={setMaxPlayers}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Players (1v1)</SelectItem>
                    <SelectItem value="4">4 Players</SelectItem>
                    <SelectItem value="6">6 Players</SelectItem>
                    <SelectItem value="8">8 Players</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Battle Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBattleMode("normal")}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      battleMode === "normal"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <Zap className={`w-5 h-5 mx-auto mb-1 ${battleMode === "normal" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">Normal</span>
                    <p className="text-xs text-muted-foreground">Most correct wins</p>
                  </button>
                  <button
                    onClick={() => setBattleMode("sudden_death")}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      battleMode === "sudden_death"
                        ? "border-destructive bg-destructive/10"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <Skull className={`w-5 h-5 mx-auto mb-1 ${battleMode === "sudden_death" ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">Sudden Death</span>
                    <p className="text-xs text-muted-foreground">1 wrong = eliminated</p>
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleCreateRoom} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </CardContent>
          </Card>

          {/* Join Room */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Join Battle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Room Code</label>
                <Input
                  placeholder="Enter 1-6 letter code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="text-center text-2xl font-mono tracking-widest"
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Ask the host for their room code to join the battle.</p>
              </div>

              <Button 
                onClick={handleJoinRoom} 
                disabled={isJoining || joinCode.length < 1}
                variant="secondary"
                className="w-full"
              >
                {isJoining ? "Joining..." : "Join Room"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-primary">Fair Battle System</h3>
          <ul className="text-base text-muted-foreground space-y-1 font-medium">
            <li>• <span className="text-primary font-bold">Skill-matched questions</span>: Each player gets questions suited to their level</li>
            <li>• Winner determined by <span className="text-primary font-bold">accuracy first</span> (most correct answers wins)</li>
            <li>• Speed is a <span className="text-primary font-bold">tiebreaker</span>: faster answers earn small bonus points</li>
            <li>• Correct answer: <span className="text-primary font-bold">1000 pts</span> + up to <span className="text-primary font-bold">100 pts</span> speed bonus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BattleLobby;
