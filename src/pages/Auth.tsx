import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Lock, ArrowLeft, HelpCircle, Eye, EyeOff, KeyRound, Sparkles } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthMode = "signIn" | "signUp" | "forgotUsername" | "resetPassword" | "codeReset" | "enterCode";

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
  const [resetCode, setResetCode] = useState("");
  const [resetEmail, setResetEmail] = useState("");
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
    if (user && mode !== "resetPassword" && mode !== "enterCode") navigate("/");
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

  const sendResetCode = async (email: string) => {
    const { data, error } = await supabase.functions.invoke('send-reset-code', {
      body: { email }
    });
    if (error) throw error;
    return data;
  };

  const verifyResetCode = async (email: string, code: string, newPassword: string) => {
    const { data, error } = await supabase.functions.invoke('verify-reset-code', {
      body: { email, code, newPassword }
    });
    if (error) throw error;
    if (data.error) throw new Error(data.error);
    return data;
  };

  const sendMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/settings`,
      }
    });
    if (error) throw error;
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
      } else if (mode === "codeReset") {
        // Send 6-digit code via edge function
        let emailToUse = form.emailOrUsername.trim();
        
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
        
        await sendResetCode(emailToUse);
        setResetEmail(emailToUse);
        setMode("enterCode");
        toast({ title: "Check your email for the 6-digit code! 📧" });
      } else if (mode === "enterCode") {
        if (resetCode.length !== 6) {
          toast({ title: "Please enter the 6-digit code", variant: "destructive" });
          setLoading(false);
          return;
        }
        
        if (form.password !== form.confirmPassword) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          setLoading(false);
          return;
        }
        
        const passwordCheck = validatePassword(form.password);
        if (!passwordCheck.valid) {
          toast({ title: passwordCheck.error, variant: "destructive" });
          setLoading(false);
          return;
        }
        
        await verifyResetCode(resetEmail, resetCode, form.password);
        toast({ title: "Password updated successfully! 🎉" });
        setMode("signIn");
        setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setResetCode("");
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
        
        // Just try to update - Supabase will error if no valid session
        const { error } = await supabase.auth.updateUser({ password: form.password });
        if (error) {
          if (error.message.includes("session") || error.message.includes("token") || error.message.includes("Auth")) {
            toast({ 
              title: "Session expired", 
              description: "Please use the code-based reset instead",
              variant: "destructive" 
            });
            setMode("codeReset");
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

  const handleMagicLinkReset = async () => {
    setLoading(true);
    try {
      let emailToUse = form.emailOrUsername.trim();
      
      if (!emailToUse) {
        toast({ title: "Please enter your username or email first", variant: "destructive" });
        setLoading(false);
        return;
      }
      
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
      
      await sendMagicLink(emailToUse);
      toast({ 
        title: "Magic link sent! ✨", 
        description: "Click the link in your email to sign in, then change your password in settings" 
      });
      setMode("signIn");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to send magic link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "signUp": return "Create your account to start grinding";
      case "codeReset": return "Reset with security code";
      case "enterCode": return "Enter your security code";
      case "forgotUsername": return "Recover your username";
      case "resetPassword": return "Enter your new password";
      default: return "Sign in to continue your journey";
    }
  };

  const getButtonText = () => {
    if (loading) return "Loading...";
    switch (mode) {
      case "signUp": return "Create Account";
      case "codeReset": return "Send Security Code";
      case "enterCode": return "Reset Password";
      case "forgotUsername": return "Find My Username";
      case "resetPassword": return "Update Password";
      default: return "Sign In";
    }
  };

  const goBack = () => {
    if (mode === "enterCode") {
      setMode("codeReset");
      setResetCode("");
    } else {
      setMode("signIn");
      window.history.replaceState({}, "", "/auth");
    }
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
          {(mode === "forgotUsername" || mode === "resetPassword" || mode === "codeReset" || mode === "enterCode") && (
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

            {/* Sign In, Code Reset - Username OR Email field */}
            {(mode === "signIn" || mode === "codeReset") && (
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

            {/* Enter Code mode - show code input and new password */}
            {mode === "enterCode" && (
              <>
                <div className="space-y-2">
                  <Label>Security Code</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Enter the 6-digit code sent to {resetEmail}
                  </p>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={resetCode}
                      onChange={setResetCode}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </>
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

            {(mode === "signIn" || mode === "signUp" || mode === "resetPassword" || mode === "enterCode") && (
              <div className="space-y-2">
                <Label htmlFor="password">{mode === "resetPassword" || mode === "enterCode" ? "New Password" : "Password"}</Label>
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
                {(mode === "signUp" || mode === "resetPassword" || mode === "enterCode") && (
                  <p className="text-xs text-muted-foreground">
                    Min 8 chars with uppercase, lowercase, and number
                  </p>
                )}
              </div>
            )}

            {(mode === "resetPassword" || mode === "enterCode") && (
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

          {/* Magic link option shown on code reset mode */}
          {mode === "codeReset" && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-2">Or sign in without a password:</p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={handleMagicLinkReset}
                disabled={loading || !form.emailOrUsername.trim()}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Send Magic Link (then change password in Settings)
              </Button>
            </div>
          )}

          {mode !== "resetPassword" && mode !== "enterCode" && (
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
                          setMode("codeReset");
                        }
                      }}
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
              {mode !== "forgotUsername" && mode !== "codeReset" && (
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
