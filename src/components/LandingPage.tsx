import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, Clock, Target, Trophy, Users, Zap, 
  CheckCircle, Star, ArrowRight, Calculator, PenTool,
  Brain, Swords, Crown, Medal, Gamepad2, BookOpen, GraduationCap, Briefcase, Search
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePWAUpdate, APP_VERSION } from "@/hooks/usePWAUpdate";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { FeedbackButton } from "@/components/FeedbackButton";
import { InstallAppButton } from "@/components/InstallAppButton";
import { ShareAppButton } from "@/components/ShareAppButton";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Practice",
    description: "Questions adapt to your skill level automatically"
  },
  {
    icon: Target,
    title: "Every Test Covered",
    description: "SAT, ACT, AP, GED, MCAT, GRE, LSAT & more — all in one place"
  },
  {
    icon: Swords,
    title: "Battle Friends",
    description: "Compete head-to-head in real-time study battles"
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Streaks, score predictions & achievement badges"
  }
];

const examCategories = [
  { icon: BookOpen, label: "High School", exams: "SAT · ACT · PSAT · AP", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { icon: GraduationCap, label: "College & K-12", exams: "GED · MAP · STAR · Iowa", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/30" },
  { icon: Briefcase, label: "Grad & Professional", exams: "MCAT · GRE · LSAT · GMAT", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30" },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [oauthLoading, setOauthLoading] = useState(false);
  const { forceUpdate, isUpdating, hasUpdate } = usePWAUpdate();

  const handleOAuthSignIn = async (provider: "google" | "apple") => {
    setOauthLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ title: `${provider === "google" ? "Google" : "Apple"} sign-in failed`, description: error.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || `Failed to sign in with ${provider}`, variant: "destructive" });
    } finally {
      setOauthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AlphaOmega — One App, Every Test | Free Test Prep"
        description="Free adaptive test prep for SAT, ACT, AP, GED, MAP & more. 15,000+ practice questions, AI tutoring, and multiplayer battles."
        path="/landing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AlphaOmega",
          url: "https://40squared.club/",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://40squared.club/key-principles?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      {/* Update banner */}
      {hasUpdate && (
        <div className="px-4 py-2 text-center">
          <Button onClick={forceUpdate} disabled={isUpdating} size="sm" className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            {isUpdating ? "Updating..." : `🆕 Update v${APP_VERSION}`}
          </Button>
        </div>
      )}

      {/* ═══════════ Hero — Clean & Calm ═══════════ */}
      <header className="px-6 pt-12 pb-16 text-center">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="font-bold text-primary-foreground font-mono text-lg">AΩ</span>
            </div>
          </div>

          {/* Title & tagline */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">AlphaOmega — One app. Every test.</h1>
            <p className="text-sm text-muted-foreground font-medium">Free adaptive prep for SAT, ACT, AP & more.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                🛡️ Family-safe content
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-600 dark:text-pink-400">
                ❤️ Safe for all ages
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                100% Free
              </span>
            </div>
          </div>

          {/* Search / Find a test */}
          <Link to="/tests" className="block">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground flex-1">
                Search tests, courses & PDFs (e.g. "prealgebra")
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>

          {/* Subheadline */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
            From SAT to MCAT — free test prep that adapts to you. 
            Start with just 10 minutes today.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <Link to="/auth" className="w-full max-w-xs">
              <Button size="lg" className="w-full gap-2 h-14 text-base font-semibold shadow-md">
                <Sparkles className="w-5 h-5" />
                I'm new — let's get started
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" className="text-muted-foreground text-sm">
                I already have an account — Log in
              </Button>
            </Link>
          </div>

          {/* OAuth */}
          <div className="flex items-center gap-3 max-w-xs mx-auto">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 border-t border-border" />
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="lg" onClick={() => handleOAuthSignIn("google")} disabled={oauthLoading} className="gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleOAuthSignIn("apple")} disabled={oauthLoading} className="gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </Button>
          </div>
        </div>
      </header>

      {/* ═══════════ What's Covered ═══════════ */}
      <section className="px-6 py-10 bg-muted/30">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-center mb-6">Every test. One dashboard.</h2>
          {examCategories.map((cat, i) => (
            <div key={i} className={`${cat.bg} rounded-xl p-4 flex items-center gap-4`}>
              <div className={`p-2 rounded-lg bg-background/60`}>
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.exams}</p>
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-muted-foreground pt-2">
            50,000+ practice questions across all exams
          </p>
        </div>
      </section>

      {/* ═══════════ Why Students Love Us ═══════════ */}
      <section className="px-6 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-semibold text-center mb-8">Why students love it</h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-5 flex flex-col items-center text-center gap-3 border-border/50">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Everything You Get ═══════════ */}
      <section className="px-6 py-10 bg-muted/30">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-lg font-semibold mb-6">Everything included. Free.</h2>
          <div className="grid gap-2.5 text-left max-w-sm mx-auto">
            {[
              "50,000+ questions across every exam",
              "AI that adapts to your level",
              "Real-time multiplayer battles",
              "Score prediction & progress tracking",
              "Story missions & learning arcade",
              "Daily challenges to build consistency",
              "Step-by-step explanations",
              "100% free. No catch.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Encouraging CTA ═══════════ */}
      <section className="px-6 py-12">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <p className="text-base font-medium text-foreground">
            Not sure where to start? That's okay.
          </p>
          <p className="text-sm text-muted-foreground">
            Tell us your test and we'll build a personalized plan in 30 seconds.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2 mt-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground italic">
            "You've got this. Start with just 10 minutes today."
          </p>
        </div>
      </section>

      {/* ═══════════ Feedback Request ═══════════ */}
      <section className="px-6 py-8 bg-muted/30">
        <div className="max-w-lg mx-auto text-center space-y-3">
          <p className="text-sm font-semibold text-primary">🎉 100% Free — No catch!</p>
          <p className="text-sm text-foreground">
            In exchange, leave comments & suggestions to help us improve.
          </p>
          <FeedbackButton />
        </div>
      </section>

      {/* ═══════════ Legal ═══════════ */}
      <section className="px-6 py-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            AlphaOmega is not affiliated with, endorsed by, or sponsored by College Board®, ACT Inc.®, 
            the International Baccalaureate Organization®, AAMC®, ETS®, LSAC®, GMAC®, or any other test maker. 
            All trademarks are property of their respective owners. All practice questions are original 
            and for educational purposes only.
          </p>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="px-6 py-6 border-t border-border">
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2025 AlphaOmega</span>
          <div className="flex items-center gap-3">
            <ShareAppButton />
            <InstallAppButton />
            <FeedbackButton />
            <span>v{APP_VERSION}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
