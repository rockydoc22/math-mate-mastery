import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Zap, User, Mail, Lock, ArrowLeft, HelpCircle } from "lucide-react";

type AuthMode = "signIn" | "signUp" | "forgotPassword" | "forgotUsername" | "resetPassword";

// Password validation helper
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

// Check if input looks like an email
const isEmail = (input: string): boolean => {
  return input.includes("@") && input.includes(".");
};

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    emailOrUsername: "", 
    email: "", 
    password: "", 
    username: "", 
    confirmPassword: "" 
  });

  // Check for password reset flow
  useEffect(() => {
    const isReset = searchParams.get("reset") === "true";
    
    // Listen for PASSWORD_RECOVERY event from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("resetPassword");
      }
    });

    // Also check URL hash for recovery token (Supabase sends these)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    if (type === "recovery" || isReset) {
      setMode("resetPassword");
    }

    return () => subscription.unsubscribe();
  }, [searchParams]);

  useEffect(() => {
    // Don't redirect if in reset password mode
    if (user && mode !== "resetPassword") navigate("/");
  }, [user, navigate, mode]);

  const lookupEmailByUsername = async (username: string): Promise<string | null> => {
    const { data, error } = await supabase.rpc('get_email_by_username', { 
      lookup_username: username 
    });
    if (error || !data) return null;
    return data as string;
  };

  const lookupUsernameByEmail = async (email: string): Promise<string | null> => {
    const { data, error } = await supabase.rpc('get_username_by_email', { 
      lookup_email: email 
    });
    if (error || !data) return null;
    return data as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signUp") {
        if (!form.username.trim()) {
          toast({ title: "Username required", variant: "destructive" });
          setLoading(false);
          return;
        }
        
        // Validate password strength
        const passwordCheck = validatePassword(form.password);
        if (!passwordCheck.valid) {
          toast({ title: passwordCheck.error, variant: "destructive" });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(form.email, form.password, form.username);
        if (error) throw error;
        toast({ title: "Account created! Welcome aboard! 🎮" });
      } else if (mode === "signIn") {
        let emailToUse = form.emailOrUsername.trim();
        
        // If it doesn't look like an email, try to look up the email by username
        if (!isEmail(emailToUse)) {
          const lookedUpEmail = await lookupEmailByUsername(emailToUse);
          if (!lookedUpEmail) {
            toast({ 
              title: "Username not found", 
              description: "Check your username or try signing in with email",
              variant: "destructive" 
            });
            setLoading(false);
            return;
          }
          emailToUse = lookedUpEmail;
        }
        
        const { error } = await signIn(emailToUse, form.password);
        if (error) throw error;
        toast({ title: "Welcome back! Let's practice! 💪" });
      } else if (mode === "forgotPassword") {
        let emailToUse = form.emailOrUsername.trim();
        
        // If it doesn't look like an email, try to look up the email by username
        if (!isEmail(emailToUse)) {
          const lookedUpEmail = await lookupEmailByUsername(emailToUse);
          if (!lookedUpEmail) {
            toast({ 
              title: "Username not found", 
              description: "Try entering your email instead",
              variant: "destructive" 
            });
            setLoading(false);
            return;
          }
          emailToUse = lookedUpEmail;
        }
        
        const { error } = await supabase.auth.resetPasswordForEmail(emailToUse, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });
        if (error) throw error;
        toast({ title: "Check your email for the reset link! 📧" });
        setMode("signIn");
      } else if (mode === "forgotUsername") {
        const username = await lookupUsernameByEmail(form.email.trim());
        if (!username) {
          toast({ 
            title: "Email not found", 
            description: "No account exists with this email address",
            variant: "destructive" 
          });
          setLoading(false);
          return;
        }
        toast({ 
          title: `Your username is: ${username}`,
          description: "You can now sign in with this username",
        });
        setForm(prev => ({ ...prev, emailOrUsername: username }));
        setMode("signIn");
      } else if (mode === "resetPassword") {
        if (form.password !== form.confirmPassword) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          setLoading(false);
          return;
        }
        
        // Validate password strength
        const passwordCheck = validatePassword(form.password);
        if (!passwordCheck.valid) {
          toast({ title: passwordCheck.error, variant: "destructive" });
          setLoading(false);
          return;
        }
        
        const { error } = await supabase.auth.updateUser({ password: form.password });
        if (error) throw error;
        toast({ title: "Password updated successfully! 🎉" });
        navigate("/");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "signUp": return "Create your account to start grinding";
      case "forgotPassword": return "Reset your password";
      case "forgotUsername": return "Recover your username";
      case "resetPassword": return "Enter your new password";
      default: return "Sign in to continue your journey";
    }
  };

  const getButtonText = () => {
    if (loading) return "Loading...";
    switch (mode) {
      case "signUp": return "Create Account";
      case "forgotPassword": return "Send Reset Link";
      case "forgotUsername": return "Find My Username";
      case "resetPassword": return "Update Password";
      default: return "Sign In";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Zap className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">40²</h1>
          <p className="text-muted-foreground">{getTitle()}</p>
        </div>

        <Card className="p-6 border-2 border-border bg-card/80 backdrop-blur">
          {(mode === "forgotPassword" || mode === "forgotUsername" || mode === "resetPassword") && (
            <button
              type="button"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-4"
              onClick={() => {
                setMode("signIn");
                // Clear URL params
                window.history.replaceState({}, "", "/auth");
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signUp" && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="SATChampion2025"
                    className="pl-10"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Sign In - Username OR Email field */}
            {(mode === "signIn" || mode === "forgotPassword") && (
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername">Username or Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="emailOrUsername"
                    type="text"
                    placeholder="username or email@example.com"
                    className="pl-10"
                    value={form.emailOrUsername}
                    onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* Sign Up - Email field */}
            {mode === "signUp" && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="pl-10"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* Forgot Username - Email field */}
            {mode === "forgotUsername" && (
              <div className="space-y-2">
                <Label htmlFor="recoveryEmail">Your Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="recoveryEmail"
                    type="email"
                    placeholder="you@email.com"
                    className="pl-10"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the email you used to sign up and we'll show you your username
                </p>
              </div>
            )}

            {(mode === "signIn" || mode === "signUp" || mode === "resetPassword") && (
              <div className="space-y-2">
                <Label htmlFor="password">{mode === "resetPassword" ? "New Password" : "Password"}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={mode === "signIn" ? 1 : 8}
                  />
                </div>
                {(mode === "signUp" || mode === "resetPassword") && (
                  <p className="text-xs text-muted-foreground">
                    Min 8 chars with uppercase, lowercase, and number
                  </p>
                )}
              </div>
            )}

            {mode === "resetPassword" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {getButtonText()}
            </Button>
          </form>

          {mode !== "resetPassword" && (
            <div className="mt-6 text-center space-y-2">
              {mode === "signIn" && (
                <>
                  <div className="flex justify-center gap-4 text-sm">
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary flex items-center gap-1"
                      onClick={() => setMode("forgotPassword")}
                    >
                      <Lock className="w-3 h-3" />
                      Forgot password?
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary flex items-center gap-1"
                      onClick={() => setMode("forgotUsername")}
                    >
                      <HelpCircle className="w-3 h-3" />
                      Forgot username?
                    </button>
                  </div>
                </>
              )}
              {mode !== "forgotPassword" && mode !== "forgotUsername" && (
                <button
                  type="button"
                  className="text-primary hover:underline text-sm"
                  onClick={() => setMode(mode === "signUp" ? "signIn" : "signUp")}
                >
                  {mode === "signUp" ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              )}
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Track your progress, compete on leaderboards, earn achievements 🏆
        </p>
      </div>
    </div>
  );
};

export default Auth;