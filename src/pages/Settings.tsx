import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Lock, Eye, EyeOff, GraduationCap, User, Loader2, Sparkles, Search, Calendar, Target } from "lucide-react";
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { useAIAssistant } from "@/hooks/useAIAssistant";
import { Switch } from "@/components/ui/switch";

const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one lowercase letter" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one uppercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: "Password must contain at least one number" };
  }
  return { valid: true };
};

const Settings = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, signOut } = useAuth();
  const { examType, setExamType } = useExamType();
  const [loading, setLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordSectionRef = useRef<HTMLFormElement>(null);
  const { disabled: aiOff, setDisabled: setAiOff } = useAIAssistant();

  // Personalization signals
  const [ageBand, setAgeBand] = useState<string>("");
  const [ratings, setRatings] = useState<Record<string, number>>({
    math: 3, reading: 3, vocabulary: 3, writing: 3, science: 3,
  });
  const [prefsSaving, setPrefsSaving] = useState(false);

  // Load current username
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("username, age_band, self_ratings")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setUsername(data.username || "");
        if ((data as any).age_band) setAgeBand((data as any).age_band as string);
        const sr = (data as any).self_ratings as Record<string, number> | null;
        if (sr && typeof sr === "object") {
          setRatings(r => ({ ...r, ...sr }));
        }
      }
    };
    loadProfile();
  }, [user]);

  // Handle magic link password reset redirect
  useEffect(() => {
    if (searchParams.get("reset") === "true") {
      // Show toast after a short delay to ensure page is rendered
      setTimeout(() => {
        toast({
          title: "Set your new password 🔐",
          description: "Enter and confirm your new password below to complete the reset.",
        });
        // Scroll to password section
        passwordSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        // Focus the password input
        document.getElementById("newPassword")?.focus();
      }, 300);
      // Clear the reset param from URL
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      toast({ title: passwordCheck.error, variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated successfully! 🎉" });
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="sr-only">Account Settings</h1>
        <button
          type="button"
          aria-label="Go back"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Change Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <Label className="font-semibold">Display Name</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name"
                  maxLength={30}
                />
                <Button
                  size="sm"
                  disabled={nameLoading || !username.trim()}
                  onClick={async () => {
                    setNameLoading(true);
                    try {
                      const { error } = await supabase.from("profiles").update({ username: username.trim() }).eq("id", user.id);
                      if (error) throw error;
                      toast({ title: "Name updated! 🎉" });
                    } catch (err: any) {
                      toast({ title: "Error", description: err.message, variant: "destructive" });
                    } finally {
                      setNameLoading(false);
                    }
                  }}
                >
                  {nameLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            </div>

            {/* Exam Type Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <Label className="font-semibold">Exam Mode</Label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['sat', 'psat', 'act'] as ExamType[]).map((type) => {
                  const config = EXAM_CONFIGS[type];
                  return (
                    <Button
                      key={type}
                      variant={examType === type ? "default" : "outline"}
                      size="sm"
                      className="flex flex-col h-auto py-2"
                      onClick={() => {
                        setExamType(type);
                        toast({ title: `Switched to ${config.name} mode ${config.icon}` });
                      }}
                    >
                      <span>{config.icon}</span>
                      <span className="text-xs">{config.shortName}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{user.email}</p>
            </div>

            {/* AI Assistant preference — global switch that hides the tutor
                across the app. Anchored id lets us deep-link here from
                homeschool prompts. */}
            <div id="ai-assistant" className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <Label className="font-semibold block">AI Assistant</Label>
                    <p className="text-xs text-muted-foreground">
                      Adaptive hints and difficulty adjustments across practice.
                      Turn off if you prefer to study without AI help. Real
                      practice tests always disable it automatically.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={!aiOff}
                  onCheckedChange={(v) => setAiOff(!v)}
                  aria-label="Toggle AI Assistant"
                />
              </div>
            </div>

            <form ref={passwordSectionRef} onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="font-semibold">Change Password</h3>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Min 8 chars with uppercase, lowercase, and number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
