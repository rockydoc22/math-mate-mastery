import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordSectionRef = useRef<HTMLFormElement>(null);

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
        <button
          type="button"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Exam Type Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <Label className="font-semibold">Exam Mode</Label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['sat', 'psat', 'act'] as ExamType[]).map((type) => {
                  const config = EXAM_CONFIGS[type];
                  const isACT = type === 'act';
                  return (
                    <Button
                      key={type}
                      variant={examType === type ? "default" : "outline"}
                      size="sm"
                      disabled={isACT}
                      className={`flex flex-col h-auto py-2 ${isACT ? 'opacity-50' : ''}`}
                      onClick={() => {
                        if (!isACT) {
                          setExamType(type);
                          toast({ title: `Switched to ${config.name} mode ${config.icon}` });
                        }
                      }}
                    >
                      <span>{config.icon}</span>
                      <span className="text-xs">{config.shortName}</span>
                      {isACT && <span className="text-[8px]">Soon</span>}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{user.email}</p>
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
