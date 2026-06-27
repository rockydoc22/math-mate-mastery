import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserPlus, School } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const JoinClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinedClasses, setJoinedClasses] = useState<{ id: string; name: string; teacher: string }[]>([]);

  const loadJoinedClasses = async () => {
    if (!user) return;
    const { data: memberships } = await supabase
      .from("classroom_members")
      .select("classroom_id")
      .eq("user_id", user.id);

    if (memberships && memberships.length > 0) {
      const classIds = memberships.map((m) => m.classroom_id);
      const { data: classes } = await supabase
        .from("classrooms")
        .select("id, name, teacher_id")
        .in("id", classIds);
      setJoinedClasses(
        (classes || []).map((c) => ({ id: c.id, name: c.name, teacher: "" }))
      );
    }
  };

  useState(() => {
    loadJoinedClasses();
  });

  const handleJoin = async () => {
    if (!user || !code.trim()) return;
    setLoading(true);

    // Find + join atomically via secure RPC (students don't need read access to class_code)
    const { data, error } = await supabase.rpc('join_classroom_by_code', {
      _code: code.trim().toUpperCase(),
    });
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row) {
      const msg = (error?.message || '').includes('not_found')
        ? "No class with that code. Check with your teacher."
        : (error?.message || "Couldn't join that class.");
      toast({ title: "Not found", description: msg, variant: "destructive" });
      setLoading(false);
      return;
    }
    toast({ title: "Joined! 🎉", description: `Welcome to ${row.name}` });
    setCode("");
    loadJoinedClasses();
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to join a class</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <School className="w-5 h-5 text-primary" /> Join a Class
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="p-6 space-y-4">
          <div className="text-center">
            <UserPlus className="w-10 h-10 text-primary mx-auto mb-2" />
            <h2 className="font-bold text-lg">Enter Class Code</h2>
            <p className="text-sm text-muted-foreground">Ask your teacher for the class join code</p>
          </div>
          <Input
            placeholder="e.g. MATH3A472"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="text-center text-lg font-mono tracking-widest"
            maxLength={20}
          />
          <Button onClick={handleJoin} disabled={loading || !code.trim()} className="w-full">
            {loading ? "Joining..." : "Join Class"}
          </Button>
        </Card>

        {joinedClasses.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-muted-foreground">Your Classes</h3>
            {joinedClasses.map((c) => (
              <Card key={c.id} className="p-3 flex items-center gap-3">
                <School className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">{c.name}</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinClass;
