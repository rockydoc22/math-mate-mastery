import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, Clock, Target, Trophy, Users, Zap, 
  CheckCircle, Star, ArrowRight, Calculator, PenTool,
  Brain, Swords, GraduationCap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { APP_VERSION } from "@/hooks/usePWAUpdate";
import { SATMasteryLogo } from "@/components/SATMasteryLogo";
import { FeedbackButton } from "@/components/FeedbackButton";
import { InstallAppButton } from "@/components/InstallAppButton";
import { ShareAppButton } from "@/components/ShareAppButton";

// Official SAT dates for 2025-2026
const upcomingSATDates = [
  new Date("2025-03-08"),
  new Date("2025-05-03"),
  new Date("2025-06-07"),
  new Date("2026-03-14"),
  new Date("2026-05-02"),
  new Date("2026-06-06"),
  new Date("2026-08-29"),
  new Date("2026-10-03"),
  new Date("2026-11-07"),
  new Date("2026-12-05"),
];

function getNextSATDate(): { date: Date; daysUntil: number } {
  const now = new Date();
  for (const satDate of upcomingSATDates) {
    if (satDate > now) {
      const daysUntil = Math.ceil((satDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { date: satDate, daysUntil };
    }
  }
  return { date: upcomingSATDates[0], daysUntil: 0 };
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Practice",
    description: "Questions adapt to your skill level with ELO-based difficulty matching"
  },
  {
    icon: Target,
    title: "1600 Club Training",
    description: "Elite practice modes designed for top scorers"
  },
  {
    icon: Swords,
    title: "Fight Club Battles",
    description: "Compete head-to-head with other students in real-time"
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description: "Detailed insights, streaks, and achievement badges"
  }
];

const testimonials = [
  {
    quote: "Went from 1320 to 1510 in 6 weeks!",
    author: "Alex M.",
    score: "1510"
  },
  {
    quote: "The Fight Club mode made studying actually fun.",
    author: "Sarah K.",
    score: "1480"
  },
  {
    quote: "Best SAT prep app I've used. Period.",
    author: "Jordan T.",
    score: "1560"
  }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const nextSAT = getNextSATDate();

  const handleTry3Questions = () => {
    navigate(`/quiz?subject=both&count=3&difficulty=easy&timer=false`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <header className="px-4 pt-8 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Unified Logo */}
          <div className="mb-6 flex justify-center">
            <SATMasteryLogo
              size="xl"
              layout="stacked"
              titleText="1600: The SAT App"
              showTagline={false}
            />
          </div>
          
          {/* Headline with upward curve icon */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="text-lg text-muted-foreground">
              Free SAT prep that actually works. Practice smarter, not harder.
            </p>
            <svg 
              viewBox="0 0 100 100" 
              className="w-28 h-28 flex-shrink-0 drop-shadow-lg"
              aria-label="Score improvement arrow"
            >
              <path 
                d="M 25 80 Q 30 30 75 20" 
                fill="none" 
                stroke="url(#arrowGradient)" 
                strokeWidth="5" 
                strokeLinecap="round"
              />
              <polygon 
                points="70,8 82,18 68,24" 
                fill="url(#arrowGradient)"
              />
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* SAT Countdown */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Next SAT: {nextSAT.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="text-4xl font-bold text-primary">
              {nextSAT.daysUntil} days
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3">
            <Button 
              size="lg" 
              onClick={handleTry3Questions}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-pulse px-8 py-6"
            >
              <Sparkles className="w-5 h-5" />
              Try 3 Questions Now — Free
            </Button>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="gap-2 text-sm">
                Create free account for battles, AI practice & more
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="link" className="text-muted-foreground text-sm">
                Already have an account? Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Social Proof */}
      <section className="px-4 py-8 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div>
              <div className="text-2xl font-bold text-primary">10,000+</div>
              <div className="text-xs text-muted-foreground">Questions Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-xs text-muted-foreground">Avg Score Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Students Love Us</h2>
          <div className="grid gap-4">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Everything You Need</h2>
          <div className="grid gap-3 text-left max-w-md mx-auto">
            {[
              "2,000+ SAT-style questions (Math & English)",
              "Adaptive difficulty that matches your level",
              "Real-time battle mode against other students",
              "Score prediction based on your performance",
              "Daily challenges to build consistency",
              "Detailed explanations for every question",
              "Track progress with insights dashboard",
              "100% free to use"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 justify-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Student Results</h2>
          <div className="grid gap-4">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-5 text-center">
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium mb-3">"{testimonial.quote}"</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-muted-foreground">— {testimonial.author}</span>
                  <span className="text-xs font-bold text-primary">{testimonial.score}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Practice Preview */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Start Practicing Now</h2>
          <p className="text-muted-foreground mb-6">Choose your subject and begin your journey to 1600</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              size="lg" 
              className="h-16 text-lg gap-2"
              onClick={() => navigate('/quiz?subject=math&count=10&difficulty=all&timer=true')}
            >
              <Calculator className="w-5 h-5" />
              Math
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="h-16 text-lg gap-2"
              onClick={() => navigate('/quiz?subject=english&count=10&difficulty=all&timer=true')}
            >
              <PenTool className="w-5 h-5" />
              English
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Crush the SAT?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of students already on their path to 1600</p>
          
          <div className="flex flex-col gap-3 items-center">
            <Button 
              size="lg" 
              onClick={handleTry3Questions}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8"
            >
              <Sparkles className="w-5 h-5" />
              Try 3 Questions Free
            </Button>
            <Link to="/auth">
              <Button variant="link" className="text-muted-foreground">
                or create a free account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-border">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2025 SAT Mastery</span>
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
