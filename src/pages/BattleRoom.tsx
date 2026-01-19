import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Crown, Copy, Users, Trophy, Loader2, Clock, Skull, ChevronDown, ChevronUp, CheckCircle, XCircle, LogOut, Bot, Flag } from "lucide-react";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { BattleResultsFighter } from "@/components/BattleResultsFighter";
import { questions } from "@/data/questions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { additionalMathQuestions } from "@/data/additionalMathQuestions";
import { englishQuestions } from "@/data/englishQuestions";
import { QuestionVisual } from "@/components/QuestionVisual";
import { filterByDifficulty, DifficultyRange } from "@/utils/difficultyRating";

interface Room {
  id: string;
  host_id: string;
  room_code: string;
  status: string;
  subject: string;
  question_count: number;
  max_players: number;
  current_question_index: number;
  started_at: string | null;
  time_limit_seconds: number | null;
  battle_mode: string;
  is_solo?: boolean;
}

interface Participant {
  id: string;
  user_id: string;
  score: number;
  answers_correct: number;
  current_question: number;
  finished_at: string | null;
  total_time_ms?: number;
  eliminated?: boolean;
  profile?: {
    username: string;
    avatar_emoji: string | null;
  };
  skill_rating?: number;
}

interface BattleQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  visual?: any;
  difficultyRating?: number;
}

// Map skill rating to appropriate difficulty range
function getPlayerDifficultyRange(skillRating: number): DifficultyRange {
  if (skillRating < 1000) return 'easy';      // 1-3
  if (skillRating < 1200) return 'medium';    // 4-5
  if (skillRating < 1400) return 'hard';      // 6-8
  return 'veryhard';                           // 9-10
}

const BattleRoom = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [battleQuestions, setBattleQuestions] = useState<BattleQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myScore, setMyScore] = useState(0);
  const [myCorrect, setMyCorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [myTotalTime, setMyTotalTime] = useState(0);
  const [mySkillRating, setMySkillRating] = useState(1200);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isEliminated, setIsEliminated] = useState(false);
  const [myAnswers, setMyAnswers] = useState<Record<number, string>>({});
  const [showRecap, setShowRecap] = useState(false);
  const [aiScore, setAiScore] = useState(0);
  const [aiCorrect, setAiCorrect] = useState(0);
  const [aiCurrentQuestion, setAiCurrentQuestion] = useState(0);
  const [aiEliminated, setAiEliminated] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (room?.status !== "in_progress" || !room.time_limit_seconds || !room.started_at) {
      return;
    }

    const startTime = new Date(room.started_at).getTime();
    const endTime = startTime + room.time_limit_seconds * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0 && !showResults) {
        // Time's up! Force end the battle
        setShowResults(true);
        checkGameEnd();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [room?.status, room?.time_limit_seconds, room?.started_at, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch room and participants
  const fetchRoom = useCallback(async () => {
    if (!roomCode) return;

    const { data: roomData, error: roomError } = await supabase
      .from("battle_rooms")
      .select("*")
      .eq("room_code", roomCode)
      .single();

    if (roomError || !roomData) {
      toast.error("Room not found");
      navigate("/battle");
      return;
    }

    setRoom(roomData);

    // Fetch participants with profiles and skill ratings
    const { data: participantsData } = await supabase
      .from("battle_participants")
      .select("*")
      .eq("room_id", roomData.id);

    if (participantsData) {
      // Fetch profiles for participants
      const userIds = participantsData.map(p => p.user_id);
      // Use profiles_public view to avoid exposing email addresses
      const { data: profiles } = await supabase
        .from("profiles_public")
        .select("id, username, avatar_emoji")
        .in("id", userIds);
      
      // Fetch skill ratings for participants
      const { data: skillRatings } = await supabase
        .from("skill_ratings")
        .select("user_id, overall_rating")
        .in("user_id", userIds);

      const participantsWithProfiles = participantsData.map(p => ({
        ...p,
        profile: profiles?.find(pr => pr.id === p.user_id),
        skill_rating: skillRatings?.find(sr => sr.user_id === p.user_id)?.overall_rating || 1200
      }));

      setParticipants(participantsWithProfiles);
      
      // Update my score and skill rating
      const myParticipant = participantsWithProfiles.find(p => p.user_id === user?.id);
      if (myParticipant) {
        setMyScore(myParticipant.score);
        setMyCorrect(myParticipant.answers_correct);
        setMySkillRating(myParticipant.skill_rating || 1200);
      }
    }

    setLoading(false);
  }, [roomCode, navigate, user?.id]);

  // Generate questions personalized to player's skill level
  const generateQuestions = useCallback((room: Room, playerSkillRating: number): BattleQuestion[] => {
    // Filter out questions with imageUrl to avoid showing College Board branding
    const filteredMathVisuals = visualMathQuestions.filter(q => !(q as any).imageUrl);
    const filteredMoreMathVisuals = moreMathVisualQuestions.filter(q => !(q as any).imageUrl);
    const filteredAdditionalMath = additionalMathQuestions.filter(q => !(q as any).imageUrl);
    const filteredEnglishVisuals = visualEnglishQuestions.filter(q => !(q as any).imageUrl);
    const filteredMoreEnglishVisuals = moreEnglishVisualQuestions.filter(q => !(q as any).imageUrl);
    
    const allMathQuestions = [
      ...questions, // Already filtered in questions.ts
      ...filteredMathVisuals,
      ...filteredMoreMathVisuals,
      ...filteredAdditionalMath
    ];
    const allEnglishQuestions = [
      ...englishQuestions,
      ...filteredEnglishVisuals,
      ...filteredMoreEnglishVisuals
    ];
    
    let pool: BattleQuestion[] = [];
    if (room.subject === "math") {
      pool = allMathQuestions;
    } else if (room.subject === "english") {
      pool = allEnglishQuestions;
    } else {
      pool = [...allMathQuestions, ...allEnglishQuestions];
    }

    // Filter by player's skill-appropriate difficulty
    const difficultyRange = getPlayerDifficultyRange(playerSkillRating);
    let filteredPool = filterByDifficulty(pool, difficultyRange);
    
    // If not enough questions at this difficulty, expand the pool
    if (filteredPool.length < room.question_count) {
      filteredPool = pool; // Fall back to all questions
    }

    // Shuffle and pick questions
    const shuffled = [...filteredPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, room.question_count);
  }, []);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  // Set up realtime subscriptions
  useEffect(() => {
    if (!room?.id) return;

    const roomChannel = supabase
      .channel(`room-${room.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "battle_rooms", filter: `id=eq.${room.id}` },
        (payload) => {
          const newRoom = payload.new as Room;
          setRoom(newRoom);
          
          if (newRoom.status === "in_progress" && battleQuestions.length === 0) {
            const generatedQuestions = generateQuestions(newRoom, mySkillRating);
            setBattleQuestions(generatedQuestions);
            setQuestionStartTime(Date.now());
          }
          
          if (newRoom.status === "completed") {
            setShowResults(true);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "battle_participants", filter: `room_id=eq.${room.id}` },
        () => {
          fetchRoom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [room?.id, battleQuestions.length, generateQuestions, fetchRoom, mySkillRating]);

  // When room becomes in_progress, generate questions
  useEffect(() => {
    if (room?.status === "in_progress" && battleQuestions.length === 0) {
      const generatedQuestions = generateQuestions(room, mySkillRating);
      setBattleQuestions(generatedQuestions);
      setQuestionStartTime(Date.now());
    }
  }, [room?.status, battleQuestions.length, generateQuestions, room, mySkillRating]);

  // AI opponent simulation for solo mode
  useEffect(() => {
    if (!room?.is_solo || room.status !== "in_progress" || battleQuestions.length === 0) return;
    if (aiCurrentQuestion >= battleQuestions.length || aiEliminated) return;

    // AI answers with a delay based on difficulty (simulates thinking)
    const baseDelay = 3000 + Math.random() * 5000; // 3-8 seconds per question
    
    const answerQuestion = () => {
      if (aiCurrentQuestion >= battleQuestions.length || aiEliminated) return;
      
      // AI accuracy based on player skill level (matched difficulty)
      // AI gets ~70-85% correct at the player's level
      const aiAccuracy = 0.70 + Math.random() * 0.15;
      const isCorrect = Math.random() < aiAccuracy;
      
      const isSuddenDeath = room.battle_mode === "sudden_death";
      
      if (isSuddenDeath && !isCorrect) {
        setAiEliminated(true);
      } else {
        if (isCorrect) {
          const timeTaken = baseDelay;
          const speedBonus = Math.max(0, Math.floor(100 * (1 - timeTaken / 15000)));
          setAiScore(prev => prev + 1000 + speedBonus);
          setAiCorrect(prev => prev + 1);
        }
        setAiCurrentQuestion(prev => prev + 1);
      }
    };

    const timer = setTimeout(answerQuestion, baseDelay);
    return () => clearTimeout(timer);
  }, [room?.is_solo, room?.status, room?.battle_mode, aiCurrentQuestion, battleQuestions.length, aiEliminated]);

  const handleStartGame = async () => {
    if (!room || !user) return;

    if (participants.length < 2) {
      toast.error("Need at least 2 players to start");
      return;
    }

    const { error } = await supabase
      .from("battle_rooms")
      .update({ 
        status: "in_progress",
        started_at: new Date().toISOString()
      })
      .eq("id", room.id);

    if (error) {
      toast.error("Failed to start game");
    }
  };

  const handleLeaveRoom = async () => {
    if (!room || !user) return;
    
    const { error } = await supabase
      .from("battle_participants")
      .delete()
      .eq("room_id", room.id)
      .eq("user_id", user.id);
    
    if (error) {
      toast.error("Failed to leave room");
      return;
    }
    
    toast.success("Left the room");
    navigate("/battle");
  };

  const handleAnswer = async (answerLetter: string) => {
    if (isAnswered || !room || !user || !battleQuestions[currentQuestionIndex] || isEliminated) return;

    setSelectedAnswer(answerLetter);
    setIsAnswered(true);
    
    // Track my answer for recap
    setMyAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerLetter }));

    const timeTaken = Date.now() - questionStartTime;
    const isCorrect = answerLetter === battleQuestions[currentQuestionIndex].correctAnswer;
    
    // Check for sudden death elimination
    const isSuddenDeath = room.battle_mode === "sudden_death";
    const eliminated = isSuddenDeath && !isCorrect;
    
    if (eliminated) {
      setIsEliminated(true);
      toast.error("💀 Eliminated! One wrong answer in Sudden Death mode.");
    }
    
    // New scoring: primarily based on correctness (1000 pts), with small time bonus (max 100 pts)
    // This makes accuracy ~10x more important than speed
    let points = 0;
    if (isCorrect) {
      points = 1000; // Base points for correct answer
      // Speed bonus: up to 100 points if answered in under 15 seconds
      const speedBonus = Math.max(0, Math.floor(100 * (1 - timeTaken / 15000)));
      points += speedBonus;
    }
    
    const newTotalTime = myTotalTime + timeTaken;
    setMyTotalTime(newTotalTime);

    // Save answer
    await supabase.from("battle_answers").insert({
      room_id: room.id,
      user_id: user.id,
      question_index: currentQuestionIndex,
      is_correct: isCorrect,
      time_taken_ms: timeTaken,
      points_earned: points,
    });

    // Update participant score
    const newScore = myScore + points;
    const newCorrect = isCorrect ? myCorrect + 1 : myCorrect;
    setMyScore(newScore);
    setMyCorrect(newCorrect);

    const isLastQuestion = currentQuestionIndex >= battleQuestions.length - 1;
    
    await supabase
      .from("battle_participants")
      .update({
        score: newScore,
        answers_correct: newCorrect,
        current_question: currentQuestionIndex + 1,
        finished_at: (isLastQuestion || eliminated) ? new Date().toISOString() : null,
      })
      .eq("room_id", room.id)
      .eq("user_id", user.id);

    // Wait a moment to show result, then move to next question
    setTimeout(() => {
      if (isLastQuestion || eliminated) {
        setShowResults(true);
        // Check if all finished
        checkGameEnd();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setQuestionStartTime(Date.now());
      }
    }, 1500);
  };

  const checkGameEnd = async () => {
    if (!room) return;
    
    // Update room to completed
    await supabase
      .from("battle_rooms")
      .update({ status: "completed" })
      .eq("id", room.id);
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode || "");
    toast.success("Room code copied!");
  };

  const isHost = user?.id === room?.host_id;
  const currentQuestion = battleQuestions[currentQuestionIndex];
  
  // Create AI participant for solo mode
  const aiParticipant: Participant | null = room?.is_solo ? {
    id: 'ai-opponent',
    user_id: 'ai',
    score: aiScore,
    answers_correct: aiCorrect,
    current_question: aiCurrentQuestion,
    finished_at: aiEliminated || aiCurrentQuestion >= battleQuestions.length ? new Date().toISOString() : null,
    eliminated: aiEliminated,
    profile: {
      username: 'SAT Bot',
      avatar_emoji: '🤖'
    },
    skill_rating: mySkillRating
  } : null;
  
  // Combine real participants with AI for solo mode
  const allParticipants = aiParticipant ? [...participants, aiParticipant] : participants;
  
  // Sort by answers correct first (primary), then by score which includes time bonus (secondary)
  const sortedParticipants = [...allParticipants].sort((a, b) => {
    if (b.answers_correct !== a.answers_correct) {
      return b.answers_correct - a.answers_correct; // More correct = higher rank
    }
    return b.score - a.score; // Tiebreaker: higher score (faster answers)
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Results screen
  if (showResults || room?.status === "completed") {
    // In sudden death, sort by: 1) eliminated last, 2) most correct, 3) score
    const resultsParticipants = room?.battle_mode === "sudden_death" 
      ? [...allParticipants].sort((a, b) => {
          // Players who answered more are ranked higher (survived longer)
          if (b.answers_correct !== a.answers_correct) {
            return b.answers_correct - a.answers_correct;
          }
          return b.score - a.score;
        })
      : sortedParticipants;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Fighter Results Visual */}
          <BattleResultsFighter 
            fighters={resultsParticipants.map((p, index) => {
              const wasEliminated = room?.battle_mode === "sudden_death" && p.answers_correct < battleQuestions.length && p.finished_at;
              return {
                username: p.profile?.username || "Player",
                avatar_emoji: p.profile?.avatar_emoji || "😎",
                score: p.score,
                answersCorrect: p.answers_correct,
                totalQuestions: battleQuestions.length,
                isWinner: index === 0,
                isEliminated: !!wasEliminated
              };
            })}
            battleMode={room?.battle_mode || "normal"}
          />

          {/* Score Cards */}
          <div className="space-y-3 mt-6">
            {resultsParticipants.map((p, index) => {
              const wasEliminated = room?.battle_mode === "sudden_death" && p.answers_correct < battleQuestions.length && p.finished_at;
              const isWinner = index === 0;
              const isAI = p.user_id === 'ai';
              
              return (
                <Card 
                  key={p.id} 
                  className={`${isWinner ? "border-yellow-500 bg-yellow-500/10" : ""} ${wasEliminated ? "opacity-60" : ""} ${isAI ? "border-primary/30" : ""}`}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                      {isWinner && <Crown className="w-6 h-6 text-yellow-500" />}
                      {wasEliminated && <Skull className="w-5 h-5 text-destructive" />}
                      {isAI && <Bot className="w-5 h-5 text-primary" />}
                      <span className="text-2xl">{p.profile?.avatar_emoji || "😎"}</span>
                      <span className={`font-medium ${wasEliminated ? "line-through" : ""}`}>
                        {p.profile?.username || "Player"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${wasEliminated ? "text-destructive" : "text-primary"}`}>
                        {p.score}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {p.answers_correct}/{battleQuestions.length} correct
                        {wasEliminated && " (eliminated)"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recap Toggle */}
          <div className="mt-8">
            <Button 
              onClick={() => setShowRecap(!showRecap)} 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              {showRecap ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showRecap ? "Hide Question Recap" : "Show Question Recap"}
            </Button>
          </div>

          {/* Question Recap */}
          {showRecap && (
            <div className="mt-4 space-y-4">
              <h2 className="text-xl font-bold text-center">Question Recap</h2>
              {battleQuestions.map((q, index) => {
                const myAnswer = myAnswers[index];
                const isCorrect = myAnswer === q.correctAnswer;
                const didAnswer = myAnswer !== undefined;
                
                return (
                  <Card key={q.id} className={`${isCorrect ? "border-green-500/30" : didAnswer ? "border-destructive/30" : "border-muted"}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {didAnswer ? (
                              isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                              )
                            ) : (
                              <span className="text-xs text-muted-foreground">(not answered)</span>
                            )}
                            <span className={`text-sm font-medium ${isCorrect ? "text-green-500" : didAnswer ? "text-destructive" : "text-muted-foreground"}`}>
                              {isCorrect ? "Correct" : didAnswer ? "Incorrect" : "Skipped"}
                            </span>
                          </div>
                          <p className="text-sm mb-3">{q.question}</p>
                          
                          {/* Answer options */}
                          <div className="space-y-1 mb-3">
                            {q.options.map((opt) => {
                              const isThisCorrect = opt.letter === q.correctAnswer;
                              const isThisMine = opt.letter === myAnswer;
                              
                              return (
                                <div 
                                  key={opt.letter}
                                  className={`text-xs p-2 rounded ${
                                    isThisCorrect 
                                      ? "bg-green-500/20 text-green-700 dark:text-green-300 font-medium" 
                                      : isThisMine && !isThisCorrect
                                        ? "bg-destructive/20 text-destructive line-through"
                                        : "text-muted-foreground"
                                  }`}
                                >
                                  <span className="font-bold mr-1">{opt.letter}.</span>
                                  {opt.text}
                                  {isThisCorrect && <span className="ml-2">✓</span>}
                                  {isThisMine && !isThisCorrect && <span className="ml-2">(your answer)</span>}
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Explanation */}
                          <div className="p-3 bg-muted/50 rounded-lg border border-border">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Explanation:</p>
                            <p className="text-sm">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex gap-4 justify-center">
            <Button onClick={() => navigate("/battle")} variant="outline">
              New Battle
            </Button>
            <Link to="/">
              <Button>Back Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Waiting room
  if (room?.status === "waiting") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={handleLeaveRoom}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-destructive mb-6"
          >
            <LogOut className="w-4 h-4" />
            Leave Room
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Waiting for Players</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-mono font-bold tracking-widest text-primary">{roomCode}</span>
              <Button size="icon" variant="ghost" onClick={copyRoomCode}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2">Share this code with friends to join</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Players ({participants.length}/{room.max_players})
                </span>
                <div className="text-sm text-muted-foreground text-right">
                  <div>{room.question_count} questions • {room.subject === "both" ? "Math & English" : room.subject}</div>
                  <div className="flex items-center gap-2 justify-end">
                    {room.battle_mode === "sudden_death" && (
                      <span className="flex items-center gap-1 text-destructive">
                        <Skull className="w-3 h-3" />
                        Sudden Death
                      </span>
                    )}
                    {room.time_limit_seconds && (
                      <span className="flex items-center gap-1 text-primary">
                        <Clock className="w-3 h-3" />
                        {formatTime(room.time_limit_seconds)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <span className="text-xl">{p.profile?.avatar_emoji || "😎"}</span>
                    <span className="font-medium">{p.profile?.username || "Player"}</span>
                    {p.user_id === room.host_id && (
                      <Crown className="w-4 h-4 text-yellow-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isHost ? (
            <Button 
              onClick={handleStartGame} 
              className="w-full"
              disabled={participants.length < 2}
            >
              {participants.length < 2 ? "Waiting for players..." : "Start Battle!"}
            </Button>
          ) : (
            <p className="text-center text-muted-foreground">Waiting for host to start...</p>
          )}
        </div>
      </div>
    );
  }

  // Game in progress
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {battleQuestions.length}
          </div>
          
          {/* Timer (if time limit exists) */}
          {timeRemaining !== null && room?.time_limit_seconds && (
            <div className={`flex items-center gap-1 font-mono font-bold text-lg ${
              timeRemaining <= 30 ? 'text-destructive animate-pulse' : 
              timeRemaining <= 60 ? 'text-orange-500' : 'text-primary'
            }`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeRemaining)}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-primary font-bold">
            <Trophy className="w-5 h-5" />
            {myScore} pts
          </div>
        </div>

        {/* Sudden Death indicator */}
        {room?.battle_mode === "sudden_death" && !isEliminated && (
          <div className="flex items-center justify-center gap-2 mb-4 p-2 rounded-lg bg-destructive/10 border border-destructive/30">
            <Skull className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Sudden Death - One wrong answer eliminates you!</span>
          </div>
        )}

        {/* Eliminated banner */}
        {isEliminated && (
          <div className="flex items-center justify-center gap-2 mb-4 p-4 rounded-lg bg-destructive/20 border border-destructive">
            <Skull className="w-6 h-6 text-destructive" />
            <span className="text-lg font-bold text-destructive">ELIMINATED</span>
          </div>
        )}

        {/* Live scoreboard */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sortedParticipants.slice(0, 4).map((p) => {
            const pEliminated = room?.battle_mode === "sudden_death" && p.finished_at && p.answers_correct < battleQuestions.length;
            const isAI = p.user_id === 'ai';
            return (
              <div 
                key={p.id} 
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  pEliminated ? "bg-destructive/20 opacity-60" :
                  isAI ? "bg-primary/20 border border-primary/40" :
                  p.user_id === user?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {pEliminated && <Skull className="w-3 h-3 text-destructive" />}
                {isAI && !pEliminated && <Bot className="w-3 h-3 text-primary" />}
                <span>{p.profile?.avatar_emoji || "😎"}</span>
                <span className={`truncate max-w-[60px] ${pEliminated ? "line-through" : ""}`}>{p.profile?.username}</span>
                <span className="font-bold">{p.score}</span>
              </div>
            );
          })}
        </div>

        {/* Question */}
        {currentQuestion && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-muted-foreground">Q{currentQuestionIndex + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFlagModalOpen(true)}
                  className="text-muted-foreground hover:text-destructive flex-shrink-0 -mt-1 -mr-2"
                  title="Report an issue with this question"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
              {currentQuestion.visual && (
                <div className="mb-4">
                  <QuestionVisual visual={currentQuestion.visual} />
                </div>
              )}
              <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.letter;
                  const isCorrect = option.letter === currentQuestion.correctAnswer;
                  const showResult = isAnswered;
                  
                  let buttonClass = "w-full text-left p-4 rounded-lg border transition-all ";
                  if (showResult) {
                    if (isCorrect) {
                      buttonClass += "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "bg-destructive/20 border-destructive text-destructive";
                    } else {
                      buttonClass += "bg-muted/50 border-border opacity-50";
                    }
                  } else {
                    buttonClass += "hover:bg-muted/50 border-border";
                  }

                  return (
                    <button
                      key={option.letter}
                      onClick={() => handleAnswer(option.letter)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <span className="font-medium mr-2">{option.letter}.</span>
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {isAnswered && (
          <div className="text-center text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
            Loading next question...
          </div>
        )}

        {/* Flag Question Modal */}
        {currentQuestion && (
          <FlagQuestionModal
            isOpen={isFlagModalOpen}
            onClose={() => setIsFlagModalOpen(false)}
            questionId={currentQuestion.id}
            questionType={room?.subject === "english" ? "english" : "math"}
          />
        )}
      </div>
    </div>
  );
};

export default BattleRoom;
