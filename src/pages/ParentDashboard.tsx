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
  CheckCircle2, TrendingUp, Download, Printer, Plus, Pencil, UserCircle
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
  recentActivity: { date: string; count: number }[];
  recentDomains: { domain: string; count: number; accuracy: number }[];
}

const AVATAR_OPTIONS = ["🧑‍🎓", "👧", "👦", "🦸", "🧙", "🐱", "🐶", "🦊", "🐼", "🦄", "🤖", "👽", "🧑‍🚀", "🎯", "⭐", "🔥"];
const GRADE_OPTIONS = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

const ParentDashboard = () => {
  const { user } = useAuth();
  const [kids, setKids] = useState<KidProfile[]>([]);
  const [selectedKid, setSelectedKid] = useState<string | null>(null);
  const [kidStats, setKidStats] = useState<KidStats | null>(null);
  const [loading, setLoading] = useState(true);
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
      // Stats are loaded via the kid_profiles — since kids don't have auth accounts,
      // we show the parent's own question_attempts filtered by kid session.
      // For now, show placeholder stats since kid_profiles are sub-profiles.
    }
    setLoading(false);
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
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> Parent Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Manage & monitor your kids</p>
          </div>
          <Button size="sm" variant="outline" className="gap-1" onClick={() => {
            setNewKidName("");
            setAddingKid(false);
          }}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Kid selector tabs */}
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

        {/* No kids yet */}
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

        {/* Selected kid profile + stats */}
        {currentKid && (
          <>
            {/* Profile card */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentKid.avatar_emoji || "🧑‍🎓"}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{currentKid.display_name}</h2>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {currentKid.grade_level && <span>Grade: {currentKid.grade_level}</span>}
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => openEditKid(currentKid)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Stats overview — since kid_profiles are sub-profiles without auth,
                real stats tracking requires the app to tag activity with kid_id.
                For now we show the profile info and a coming-soon note for stats. */}
            <Card className="p-4 bg-muted/30">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Activity Summary
              </h3>
              <p className="text-sm text-muted-foreground">
                Activity tracking for kid profiles is being set up. Once your kids start practicing under their profile, 
                their questions answered, accuracy, streaks, and domain breakdowns will appear here.
              </p>
            </Card>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center">
                <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold">—</p>
                <p className="text-[10px] text-muted-foreground">Questions Done</p>
              </Card>
              <Card className="p-3 text-center">
                <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">—</p>
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
              </Card>
              <Card className="p-3 text-center">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">—</p>
                <p className="text-[10px] text-muted-foreground">Day Streak</p>
              </Card>
              <Card className="p-3 text-center">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">—</p>
                <p className="text-[10px] text-muted-foreground">Quizzes Done</p>
              </Card>
            </div>

            {/* Add another kid */}
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

      {/* Edit kid dialog */}
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
