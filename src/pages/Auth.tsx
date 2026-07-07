import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import { SEO } from "@/components/SEO";

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
  const initialModeParam = searchParams.get("mode");
  const initialMode: AuthMode = isResetMode
    ? "resetPassword"
    : initialModeParam === "signup"
      ? "signUp"
      : "signIn";
  
  const [mode, setMode] = useState<AuthMode>(initialMode);
  // Safe returnTo: relative paths only, never absolute URLs (prevents open redirect).
  const rawReturnTo = searchParams.get("returnTo") || "/";
  const returnTo =
    rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//")
      ? rawReturnTo
      : "/";
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ 
    emailOrUsername: "", 
    email: "", 
    password: "", 
    username: "", 
    confirmPassword: "" 
  });
  const [isParent, setIsParent] = useState(false);
  const [numKids, setNumKids] = useState("1");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({
          title: "Google sign-in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

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
    if (user && mode !== "resetPassword") navigate(returnTo, { replace: true });
  }, [user, navigate, mode, returnTo]);

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
        
        const { error, requiresEmailVerification } = await signUp(
          form.email, 
          form.password, 
          form.username,
          {
            ...(isParent ? { isParent: true, numKids: parseInt(numKids) } : {}),
            ...(dateOfBirth ? { dateOfBirth } : {}),
          }
        );
        if (error) throw error;
        
        toast({
          title: requiresEmailVerification
            ? "Check your email to verify your account"
            : "Account created! Welcome aboard! 🎮",
          description: requiresEmailVerification
            ? "Open the verification email and click the link to finish signing in."
            : undefined,
        });

        if (requiresEmailVerification) {
          setMode("signIn");
        }
      } else if (mode === "signIn") {
        const identifier = form.emailOrUsername.trim();

        if (isEmail(identifier)) {
          // Direct email login
          const { error } = await signIn(identifier, form.password);
          if (error) throw error;
        } else {
          // Username login via edge function
          const { data, error } = await supabase.functions.invoke('login-with-username', {
            body: { username: identifier, password: form.password },
          });
          if (error || !data?.access_token) {
            throw new Error(data?.error || error?.message || "Invalid username or password");
          }
          // Set session from returned tokens
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
          if (sessionError) throw sessionError;
        }
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
      case "signUp": return "Create your account to start practicing";
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
      <SEO
        title="Sign In to AlphaOmega"
        description="Sign in or create a free AlphaOmega account to track your progress across SAT, ACT, AP and more."
        path="/auth"
        noindex
      />
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="font-bold text-primary-foreground font-mono text-lg">AΩ</span>
            </div>
          </div>
        </div>

        <Card className="p-6 border-2 border-border bg-card/80 backdrop-blur">
          <h1 className="sr-only">Sign in to AlphaOmega</h1>
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
                <Label htmlFor="emailOrUsername">{mode === "magicLink" ? "Username or Email" : "Username or Email"}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="emailOrUsername"
                    type="text"
                    placeholder="username or you@email.com"
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

            {/* Parent option during sign-up */}
            {mode === "signUp" && (
              <div className="space-y-3 rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isParent"
                    checked={isParent}
                    onCheckedChange={(checked) => setIsParent(checked === true)}
                  />
                  <Label htmlFor="isParent" className="flex items-center gap-1.5 cursor-pointer text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    I'm a parent signing up for my kids
                  </Label>
                </div>
                {isParent && (
                  <div className="space-y-2 pl-6">
                    <Label htmlFor="numKids" className="text-sm">How many kids?</Label>
                    <Select value={numKids} onValueChange={setNumKids}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      After signing up, you can create profiles for each kid from the Parent Dashboard.
                    </p>
                  </div>
                )}
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
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

            {/* Google Sign-In - show for signIn and signUp modes */}
            {(mode === "signIn" || mode === "signUp") && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {googleLoading ? "Signing in..." : "Continue with Google"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={async () => {
                    setGoogleLoading(true);
                    try {
                      const { error } = await lovable.auth.signInWithOAuth("apple", {
                        redirect_uri: window.location.origin,
                      });
                      if (error) {
                        toast({
                          title: "Apple sign-in failed",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    } catch (err: any) {
                      toast({
                        title: "Error",
                        description: err.message || "Failed to sign in with Apple",
                        variant: "destructive",
                      });
                    } finally {
                      setGoogleLoading(false);
                    }
                  }}
                  disabled={googleLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  {googleLoading ? "Signing in..." : "Continue with Apple"}
                </Button>
              </>
            )}
          </form>

          {mode !== "resetPassword" && (
            <div className="mt-6 text-center space-y-2">
              {mode === "signIn" && (
                <>
                  <div className="flex justify-center gap-4 text-sm">
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary flex items-center gap-1"
                      onClick={() => setMode("magicLink")}
                    >
                      <Lock className="w-3 h-3" />
                      Forgot password?
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary flex items-center gap-1"
                      onClick={() => setMode("magicLink")}
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
