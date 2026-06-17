import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, Eye, Flame, BarChart3, BookOpen,
  CheckCircle2, Plus, Pencil, UserCircle, Clock, CalendarCheck
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";

interface KidProfile {
  id: string;
  display_name: string;
  avatar_emoji: string | null;
  grade_level: string | null;
}

interface KidStats {
  questionsAnswered: number;
  accuracy: number;
  streak: number;
  quizzesCompleted: number;
  recentDomains: { domain: string; count: number; correct: number }[];
  minutesStudied: number;
  daysActive14: number; // active days in last 14
  activeDates: string[]; // ISO yyyy-mm-dd, last 14 days, ordered oldest→newest
  examSplit: { exam: string; count: number; correct: number }[]; // sat/psat/act/other
  lastActive: string | null; // ISO date or null
}

const AVATAR_OPTIONS = ["🧑‍🎓", "👧", "👦", "🦸", "🧙", "🐱", "🐶", "🦊", "🐼", "🦄", "🤖", "👽", "🧑‍🚀", "🎯", "⭐", "🔥"];
const GRADE_OPTIONS = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

const ParentDashboard = () => {
  const { user } = useAuth();
  const [kids, setKids] = useState<KidProfile[]>([]);
  const [selectedKid, setSelectedKid] = useState<string | null>(null);
  const [kidStats, setKidStats] = useState<KidStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [editingKid, setEditingKid] = useState<KidProfile | null>(null);
  const [editAvatar, setEditAvatar] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editName, setEditName] = useState("");
  const [addingKid, setAddingKid] = useState(false);
  const [newKidName, setNewKidName] = useState("");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadKids();
  }, [user]);

  useEffect(() => {
    if (selectedKid && user) loadKidStats(selectedKid);
  }, [selectedKid, user]);

  const loadKids = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("kid_profiles")
      .select("*")
      .eq("parent_id", user.id)
      .order("created_at");
    const profiles = (data || []) as KidProfile[];
    setKids(profiles);
    if (profiles.length > 0 && !selectedKid) {
      setSelectedKid(profiles[0].id);
    }
    setLoading(false);
  };

  const loadKidStats = async (kidId: string) => {
    if (!user) return;
    setStatsLoading(true);

    const [attemptsRes, streakRes, quizzesRes] = await Promise.all([
      supabase
        .from("question_attempts")
        .select("id, is_correct, domain, kid_profile_id, time_taken_ms, created_at, question_id" as any)
        .eq("user_id", user.id),
      supabase
        .from("streaks")
        .select("current_streak")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("quiz_scores")
        .select("id")
        .eq("user_id", user.id),
    ]);

    // Filter client-side by kid_profile_id since column isn't in generated types
    const allAttempts = (attemptsRes.data || []) as any[];
    const attempts = allAttempts.filter((a: any) => a.kid_profile_id === kidId);
    const totalQ = attempts.length;
    const correctQ = attempts.filter((a: any) => a.is_correct).length;
    const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;

    // Domain breakdown
    const domainMap = new Map<string, { count: number; correct: number }>();
    for (const a of attempts) {
      const d = a.domain || "Unknown";
      const entry = domainMap.get(d) || { count: 0, correct: 0 };
      entry.count++;
      if (a.is_correct) entry.correct++;
      domainMap.set(d, entry);
    }

    // Time studied — sum of time_taken_ms, capped per-question at 5min so an
    // idle-tab attempt doesn't blow up the total.
    const totalMs = attempts.reduce((sum: number, a: any) => {
      const t = Math.min(a.time_taken_ms || 0, 5 * 60 * 1000);
      return sum + t;
    }, 0);
    const minutesStudied = Math.round(totalMs / 60000);

    // Active-day rollup over last 14 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayKeys: string[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dayKeys.push(d.toISOString().slice(0, 10));
    }
    const activeSet = new Set<string>();
    let lastActive: string | null = null;
    for (const a of attempts) {
      if (!a.created_at) continue;
      const key = new Date(a.created_at).toISOString().slice(0, 10);
      activeSet.add(key);
      if (!lastActive || key > lastActive) lastActive = key;
    }
    const activeDates = dayKeys.filter(k => activeSet.has(k));
    const daysActive14 = dayKeys.filter(k => activeSet.has(k)).length;

    // Exam split — infer from question_id prefix (sat / psat / act / other)
    const examMap = new Map<string, { count: number; correct: number }>();
    for (const a of attempts) {
      const qid = String(a.question_id || "").toLowerCase();
      let exam = "other";
      if (qid.startsWith("psat")) exam = "PSAT";
      else if (qid.startsWith("actsci") || qid.startsWith("act")) exam = "ACT";
      else if (qid.startsWith("sat")) exam = "SAT";
      const e = examMap.get(exam) || { count: 0, correct: 0 };
      e.count++;
      if (a.is_correct) e.correct++;
      examMap.set(exam, e);
    }
    const examSplit = Array.from(examMap.entries())
      .map(([exam, v]) => ({ exam, ...v }))
      .sort((a, b) => b.count - a.count);

    setKidStats({
      questionsAnswered: totalQ,
      accuracy,
      streak: streakRes.data?.current_streak || 0,
      quizzesCompleted: (quizzesRes.data || []).length,
      recentDomains: Array.from(domainMap.entries()).map(([domain, v]) => ({ domain, ...v })),
      minutesStudied,
      daysActive14,
      activeDates,
      examSplit,
      lastActive,
    });
    setStatsLoading(false);
  };

  const handleAddKid = async () => {
    if (!user || !newKidName.trim()) return;
    setAddingKid(true);
    const { data, error } = await supabase.from("kid_profiles").insert({
      parent_id: user.id,
      display_name: newKidName.trim(),
    }).select().single();
    if (error) {
      toast({ title: "Error adding kid", variant: "destructive" });
    } else if (data) {
      const kid = data as KidProfile;
      setKids(prev => [...prev, kid]);
      if (!selectedKid) setSelectedKid(kid.id);
      setNewKidName("");
      toast({ title: `${kid.display_name} added! 🎉` });
    }
    setAddingKid(false);
  };

  const openEditKid = (kid: KidProfile) => {
    setEditingKid(kid);
    setEditAvatar(kid.avatar_emoji || "🧑‍🎓");
    setEditGrade(kid.grade_level || "");
    setEditName(kid.display_name);
  };

  const saveKidProfile = async () => {
    if (!editingKid) return;
    const { error } = await supabase.from("kid_profiles").update({
      display_name: editName.trim() || editingKid.display_name,
      avatar_emoji: editAvatar,
      grade_level: editGrade || null,
    }).eq("id", editingKid.id);
    if (error) {
      toast({ title: "Error saving", variant: "destructive" });
    } else {
      setKids(prev => prev.map(k => k.id === editingKid.id ? {
        ...k, display_name: editName.trim() || k.display_name,
        avatar_emoji: editAvatar, grade_level: editGrade || null,
      } : k));
      toast({ title: "Profile updated! ✅" });
      setEditingKid(null);
    }
  };

  const currentKid = kids.find(k => k.id === selectedKid);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Please sign in to access the Parent Dashboard</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> Parent Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Manage & monitor your kids</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {kids.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {kids.map(kid => (
              <Button
                key={kid.id}
                variant={selectedKid === kid.id ? "default" : "outline"}
                size="sm"
                className="gap-1.5 shrink-0"
                onClick={() => setSelectedKid(kid.id)}
              >
                <span className="text-lg">{kid.avatar_emoji || "🧑‍🎓"}</span>
                {kid.display_name}
              </Button>
            ))}
          </div>
        )}

        {kids.length === 0 && (
          <Card className="p-6 text-center border-dashed space-y-3">
            <UserCircle className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold">No kid profiles yet</h3>
            <p className="text-sm text-muted-foreground">Add your first kid to get started</p>
            <div className="flex gap-2 max-w-xs mx-auto">
              <Input
                placeholder="Kid's name"
                value={newKidName}
                onChange={e => setNewKidName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddKid()}
              />
              <Button onClick={handleAddKid} disabled={addingKid || !newKidName.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {currentKid && (
          <>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentKid.avatar_emoji || "🧑‍🎓"}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{currentKid.display_name}</h2>
                  {currentKid.grade_level && (
                    <span className="text-xs text-muted-foreground">Grade: {currentKid.grade_level}</span>
                  )}
                </div>
                <Button size="sm" variant="ghost" onClick={() => openEditKid(currentKid)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {statsLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : kidStats ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 text-center">
                    <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{kidStats.questionsAnswered}</p>
                    <p className="text-[10px] text-muted-foreground">Questions Done</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <BarChart3 className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{kidStats.accuracy}%</p>
                    <p className="text-[10px] text-muted-foreground">Accuracy</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{kidStats.streak}</p>
                    <p className="text-[10px] text-muted-foreground">Day Streak</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{kidStats.quizzesCompleted}</p>
                    <p className="text-[10px] text-muted-foreground">Quizzes Done</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">
                      {kidStats.minutesStudied >= 60
                        ? `${Math.floor(kidStats.minutesStudied / 60)}h ${kidStats.minutesStudied % 60}m`
                        : `${kidStats.minutesStudied}m`}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Time Studied</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <CalendarCheck className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{kidStats.daysActive14}/14</p>
                    <p className="text-[10px] text-muted-foreground">Active Days (2 wks)</p>
                  </Card>
                </div>

                {/* Consistency strip — last 14 days */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-primary" /> Consistency (last 14 days)
                    </h3>
                    {kidStats.lastActive && (
                      <span className="text-[10px] text-muted-foreground">
                        Last seen {kidStats.lastActive}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {(() => {
                      const today = new Date(); today.setHours(0,0,0,0);
                      const days: string[] = [];
                      for (let i = 13; i >= 0; i--) {
                        const d = new Date(today); d.setDate(today.getDate() - i);
                        days.push(d.toISOString().slice(0,10));
                      }
                      const active = new Set(kidStats.activeDates);
                      return days.map(k => (
                        <div
                          key={k}
                          title={k}
                          className={`flex-1 h-6 rounded ${active.has(k) ? 'bg-primary' : 'bg-muted'}`}
                        />
                      ));
                    })()}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    Filled bar = practiced that day. Aim for at least 5 of 7 days.
                  </p>
                </Card>

                {/* Per-exam focus */}
                {kidStats.examSplit.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" /> What they're focused on
                    </h3>
                    <div className="space-y-2">
                      {kidStats.examSplit.map(e => {
                        const pct = e.count > 0 ? Math.round((e.correct / e.count) * 100) : 0;
                        const share = kidStats.questionsAnswered > 0
                          ? Math.round((e.count / kidStats.questionsAnswered) * 100)
                          : 0;
                        return (
                          <div key={e.exam} className="flex items-center justify-between text-xs">
                            <span className="font-medium">{e.exam}</span>
                            <span className="text-muted-foreground">
                              {e.count} questions ({share}%) · {pct}% correct
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {kidStats.recentDomains.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" /> Domain Breakdown
                    </h3>
                    <div className="space-y-3">
                      {kidStats.recentDomains.map(d => (
                        <div key={d.domain}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium capitalize">{d.domain}</span>
                            <span className="text-muted-foreground">
                              {d.correct}/{d.count} correct ({d.count > 0 ? Math.round((d.correct / d.count) * 100) : 0}%)
                            </span>
                          </div>
                          <Progress value={d.count > 0 ? (d.correct / d.count) * 100 : 0} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {kidStats.questionsAnswered === 0 && (
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground text-center">
                      No activity yet for {currentKid.display_name}. Once they start practicing under their profile, stats will appear here.
                    </p>
                  </Card>
                )}
              </>
            ) : null}

            <Card className="p-4 border-dashed">
              <h3 className="font-bold text-sm mb-2">Add Another Kid</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Kid's name"
                  value={newKidName}
                  onChange={e => setNewKidName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddKid()}
                />
                <Button onClick={handleAddKid} disabled={addingKid || !newKidName.trim()} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>

      <Dialog open={!!editingKid} onOpenChange={() => setEditingKid(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile — {editingKid?.display_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Name</Label>
              <Input value={editName} onChange={e => setEditName(e.target.value)} />
            </div>
            <div>
              <Label>Avatar</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {AVATAR_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setEditAvatar(emoji)}
                    className={`text-2xl p-1.5 rounded-lg border-2 transition-all ${editAvatar === emoji ? 'border-primary bg-primary/10 scale-110' : 'border-transparent hover:border-border'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Grade Level</Label>
              <Select value={editGrade} onValueChange={setEditGrade}>
                <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map(g => (
                    <SelectItem key={g} value={g}>{g} Grade</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingKid(null)}>Cancel</Button>
            <Button onClick={saveKidProfile}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default ParentDashboard;
