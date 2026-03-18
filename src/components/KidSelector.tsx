import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, UserCircle, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface KidProfile {
  id: string;
  display_name: string;
  avatar_emoji: string;
  grade_level: string | null;
}

interface KidSelectorProps {
  onSelectKid: (kidId: string | null) => void;
  onContinueAsParent: () => void;
}

export const KidSelector = ({ onSelectKid, onContinueAsParent }: KidSelectorProps) => {
  const { user } = useAuth();
  const [kids, setKids] = useState<KidProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newKidName, setNewKidName] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchKids = async () => {
      const { data } = await supabase
        .from("kid_profiles")
        .select("*")
        .eq("parent_id", user.id)
        .order("created_at");
      setKids((data as KidProfile[]) || []);
      setLoading(false);
    };
    fetchKids();
  }, [user]);

  const handleAddKid = async () => {
    if (!user || !newKidName.trim()) return;
    setAdding(true);
    const { data, error } = await supabase.from("kid_profiles").insert({
      parent_id: user.id,
      display_name: newKidName.trim(),
    }).select().single();
    
    if (error) {
      toast({ title: "Error adding kid profile", variant: "destructive" });
    } else if (data) {
      setKids([...kids, data as KidProfile]);
      setNewKidName("");
      toast({ title: `${newKidName.trim()} added! 🎉` });
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Who's practicing today?</h3>
      
      <div className="grid gap-3">
        {kids.map((kid) => (
          <button
            key={kid.id}
            onClick={() => onSelectKid(kid.id)}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary bg-card transition-all hover:shadow-md"
          >
            <span className="text-3xl">{kid.avatar_emoji || "🧑‍🎓"}</span>
            <div className="flex-1 text-left">
              <p className="font-semibold">{kid.display_name}</p>
              {kid.grade_level && (
                <p className="text-xs text-muted-foreground">{kid.grade_level}</p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Add new kid */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a kid's name"
          value={newKidName}
          onChange={(e) => setNewKidName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddKid()}
        />
        <Button size="icon" onClick={handleAddKid} disabled={adding || !newKidName.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onContinueAsParent}>
        <UserCircle className="w-4 h-4 mr-2" />
        Continue as Parent
      </Button>
    </div>
  );
};
