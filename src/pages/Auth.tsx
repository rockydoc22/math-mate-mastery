import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

type AuthMode = "signIn" | "signUp" | "resetPassword" | "magicLink";

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
  
  // Immediately check URL for reset mode on first render
  const isResetMode = searchParams.get("reset") === "true" || 
    window.location.hash.includes("type=recovery");
  
  const [mode, setMode] = useState<AuthMode>(isResetMode ? "resetPassword" : "signIn");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ 
    emailOrUsername: "", 
    email: "", 
    password: "", 
    username: "", 
    confirmPassword: "" 
  });

  // Handle auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "Has session:", !!session);
      if (event === "PASSWORD_RECOVERY") {
        setMode("resetPassword");
        window.history.replaceState({}, "", "/auth?reset=true");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Don't redirect if in reset password mode
    if (user && mode !== "resetPassword") navigate("/");
  }, [user, navigate, mode]);

  // SECURITY NOTE:
  // We intentionally do not perform username<->email lookups client-side.
  // That pattern enables account/email enumeration.

  const sendMagicLink = async (identifier: string) => {
    const { data, error } = await supabase.functions.invoke('send-magic-link', {
      body: { 
        email: isEmail(identifier) ? identifier : undefined,
        username: !isEmail(identifier) ? identifier : undefined,
        redirectTo: `${window.location.origin}/settings?reset=true`
      }
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
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
        const emailToUse = form.emailOrUsername.trim();

        if (!isEmail(emailToUse)) {
          toast({
            title: "Please use your email",
            description: "For security, sign-in requires an email address.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await signIn(emailToUse, form.password);
        if (error) throw error;
        toast({ title: "Welcome back! Let's practice! 💪" });
      } else if (mode === "magicLink") {
        // Send magic link via edge function
        const identifier = form.emailOrUsername.trim();
        
        if (!identifier) {
          toast({ title: "Please enter your username or email", variant: "destructive" });
          setLoading(false);
          return;
        }

        await sendMagicLink(identifier);
        toast({ 
          title: "Magic link sent! 📧", 
          description: "Check your email and click the link to sign in" 
        });
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
        
        // Just try to update - Supabase will error if no valid session
        const { error } = await supabase.auth.updateUser({ password: form.password });
        if (error) {
          if (error.message.includes("session") || error.message.includes("token") || error.message.includes("Auth")) {
            toast({ 
              title: "Session expired", 
              description: "Use 'Sign in with magic link' instead",
              variant: "destructive" 
            });
            setMode("magicLink");
            window.history.replaceState({}, "", "/auth");
          } else {
            throw error;
          }
          setLoading(false);
          return;
        }
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
      case "magicLink": return "Sign in with magic link";
      case "resetPassword": return "Enter your new password";
      default: return "Sign in to continue your journey";
    }
  };

  const getButtonText = () => {
    if (loading) return "Loading...";
    switch (mode) {
      case "signUp": return "Create Account";
      case "magicLink": return "Send Magic Link";
      case "resetPassword": return "Update Password";
      default: return "Sign In";
    }
  };

  const goBack = () => {
    setMode("signIn");
    window.history.replaceState({}, "", "/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <span className="text-3xl font-bold text-primary-foreground">40²</span>
            </div>
          </div>
        </div>

        <Card className="p-6 border-2 border-border bg-card/80 backdrop-blur">
          {(mode === "resetPassword" || mode === "magicLink") && (
            <button
              type="button"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-4"
              onClick={goBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </button>
          )}

          <h2 className="text-lg font-semibold mb-4 text-center">{getTitle()}</h2>

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

            {/* Sign In / Magic Link identifier field */}
            {(mode === "signIn" || mode === "magicLink") && (
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername">{mode === "signIn" ? "Email" : "Username or Email"}</Label>
                <div className="relative">
                  {mode === "signIn" ? (
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  ) : (
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  )}
                  <Input
                    id="emailOrUsername"
                    type="text"
                    placeholder={mode === "signIn" ? "you@email.com" : "username or you@email.com"}
                    className="pl-10"
                    value={form.emailOrUsername}
                    onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
                    required
                  />
                </div>
                {mode === "magicLink" && (
                  <p className="text-xs text-muted-foreground">
                    We'll send a magic link to your email. Click it to sign in instantly—no password needed.
                  </p>
                )}
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

            {(mode === "signIn" || mode === "signUp" || mode === "resetPassword") && (
              <div className="space-y-2">
                <Label htmlFor="password">{mode === "resetPassword" ? "New Password" : "Password"}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={mode === "signIn" ? 1 : 8}
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
                      onClick={() => {
                        // If user is logged in, go to settings to change password
                        if (user) {
                          navigate("/settings");
                        } else {
                          setMode("magicLink");
                        }
                      }}
                    >
                      <Mail className="w-3 h-3" />
                      Sign in with magic link
                    </button>
                  </div>
                </>
              )}
              {mode !== "magicLink" && (
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
