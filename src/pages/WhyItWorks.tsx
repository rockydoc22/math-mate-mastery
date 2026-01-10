import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, BookOpen, TrendingUp, Brain, Target, 
  Flame, BarChart3, Clock, Zap, ChevronDown, ChevronUp, Coins 
} from "lucide-react";
import { CompoundGrowthChart } from "@/components/CompoundGrowthChart";
import { ForgettingCurveChart } from "@/components/ForgettingCurveChart";
import { WeaknessGrowthChart } from "@/components/WeaknessGrowthChart";
import { StudyPlanBuilder } from "@/components/StudyPlanBuilder";
import ChessboardChart from "@/components/ChessboardChart";

const WhyItWorks = () => {
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);
  const [showChessboard, setShowChessboard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Why 1600² Works
            </h1>
            <p className="text-muted-foreground">Built One Brick at a Time</p>
          </div>
        </div>

        {/* Intro Section */}
        <Card className="p-6 mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <p className="text-lg leading-relaxed">
            Learning compounds just like money does. Small, consistent daily effort creates a 
            <span className="font-bold text-primary"> "brick house"</span> of skills — sturdy, layered, 
            and impossible to knock down. Most students try to cram; <span className="font-bold">1600²</span> builds 
            mastery the way it actually works in the brain.
          </p>
        </Card>

        {/* Section 1: Power of Compounding */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">The Power of Compounding</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-muted-foreground">
              Daily practice creates an exponential curve. At first progress feels slow… then suddenly 
              it bends upward — the classic <span className="font-semibold text-foreground">hockey-stick effect</span>.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
              <p className="italic text-lg">
                "Compound interest is the eighth wonder of the world. He who understands it, earns it; 
                he who doesn't, pays it."
              </p>
              <footer className="text-sm text-muted-foreground mt-2">— Attributed to Albert Einstein</footer>
            </blockquote>
            <p className="text-muted-foreground">
              Learning behaves the same way. In fields requiring cumulative knowledge (math, languages, medicine), 
              consistent daily work creates an exponential-like advantage because knowledge is 
              <span className="font-semibold text-foreground"> hierarchical</span> — each piece makes the next 2–3 pieces easier to learn.
            </p>
          </div>

          <Card className="p-6 border-border">
            <h3 className="font-semibold mb-4 text-center">The Hockey Stick Effect: Slow Start → Rapid Acceleration</h3>
            <CompoundGrowthChart />
            <p className="text-xs text-muted-foreground text-center mt-4">
              After 6–8 weeks of consistent practice, most students see dramatic acceleration
            </p>
          </Card>

          {/* Chessboard Problem */}
          <Card className="p-6 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-primary/5 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold">The Penny Doubling Problem</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChessboard(!showChessboard)}
              >
                {showChessboard ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Place 1 penny on the first square of a chessboard, then double it for each next square.
              By square 64, you'd have <span className="font-bold text-primary">over $92 quadrillion</span> — 
              more than 1,000× the U.S. national debt!
            </p>

            {showChessboard && (
              <div className="mt-4">
                <ChessboardChart />
              </div>
            )}

            {!showChessboard && (
              <Button variant="outline" size="sm" onClick={() => setShowChessboard(true)} className="w-full">
                <Coins className="w-4 h-4 mr-2" />
                See Interactive Demo
              </Button>
            )}
          </Card>
        </section>

        {/* Section 2: Spaced Repetition */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">Why Spaced Repetition Wins</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-muted-foreground">
              Over <span className="font-semibold text-foreground">100 years of research</span> (Ebbinghaus, 1885 → modern meta-analyses) 
              shows that spacing out practice dramatically improves long-term retention.
            </p>
            
            <Card className="p-4 bg-green-500/10 border-green-500/20">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">Research Finding</p>
                  <p className="text-sm text-muted-foreground">
                    Students using spaced repetition score <span className="font-bold text-foreground">6–9% higher</span> on 
                    exams and remember more months later. One physics education study found these gains persisted 
                    even when tested months after the course ended.
                  </p>
                </div>
              </div>
            </Card>

            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">References:</span> Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology. 
              Cepeda et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin.
              Karpicke & Roediger (2008). The critical importance of retrieval for learning. Science.
            </p>
          </div>

          <Card className="p-6 border-border">
            <h3 className="font-semibold mb-4 text-center">Forgetting Curve vs. Spaced Review</h3>
            <ForgettingCurveChart />
            <p className="text-xs text-muted-foreground text-center mt-4">
              Without review, you forget 70% within 24 hours. Spaced review flattens the curve.
            </p>
          </Card>
        </section>

        {/* Section 3: Daily Micro-Workouts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold">Daily Micro-Workouts (5–20 Minutes)</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            1600² is built for <span className="font-semibold text-foreground">consistency, not burnout</span>. 
            Each day you complete a focused session that builds on the last.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 border-primary/20">
              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Your Daily Brick
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                  5–15 tough questions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">2</span>
                  Immediate review & explanations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">3</span>
                  Re-attempt missed questions next day
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                  Mixed topics (no siloing)
                </li>
              </ul>
            </Card>

            <Card className="p-4 border-destructive/20 bg-destructive/5">
              <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4" /> Zero Days Kill Momentum
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                The hardest day is the day after you did not put forth any effort.
              </p>
              <p className="text-sm font-medium">
                <span className="text-primary">Consistency &gt; Intensity</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Even 5 minutes maintains your streak and keeps neural pathways active.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 4: Weakness-First */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">Weakness-First = Maximum Score Gain</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-muted-foreground">
              You grow fastest where you're weakest. 1600² automatically targets the skills that give you 
              the <span className="font-semibold text-foreground">biggest return on your limited minutes</span>.
            </p>
            
            <Card className="p-4 bg-purple-500/10 border-purple-500/20">
              <p className="text-sm">
                <span className="font-semibold text-purple-600 dark:text-purple-400">The Hard Truth:</span> This takes humility, persistence and consistency 
                because most people want to get things right — focusing on their areas of strength. 
                However, your <span className="font-bold">greatest opportunity lies in strengthening where you are weakest</span>.
              </p>
            </Card>
          </div>

          <Card className="p-6 border-border">
            <h3 className="font-semibold mb-4 text-center">Weak Areas Improve Fastest With Focus</h3>
            <WeaknessGrowthChart />
          </Card>
        </section>

        {/* Section 5: The 6-8 Week Acceleration */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">The 6–8 Week Acceleration</h2>
          </div>
          
          <Card className="p-6 bg-gradient-to-r from-green-500/10 to-primary/10 border-green-500/20">
            <p className="text-lg mb-4">
              Most serious students see the <span className="font-bold text-primary">"hockey stick" jump</span> after 
              6–8 weeks of consistent micro-workouts.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">~100</p>
                <p className="text-sm text-muted-foreground">hard questions reviewed</p>
                <p className="text-xs text-primary font-medium">≈ 40–50 point gain</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-3xl font-bold text-green-500">20 hrs</p>
                <p className="text-sm text-muted-foreground">quality practice</p>
                <p className="text-xs text-green-600 font-medium">≈ 115 point gain*</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              *Based on Khan Academy/College Board research. Individual results vary.
            </p>
          </Card>
        </section>

        {/* CTA: Brain Building Program */}
        <Card className="p-6 border-2 border-primary bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Ready to Build Your Brain?</h2>
            <p className="text-muted-foreground">
              Create a personalized study plan based on your exam date and time commitment.
            </p>
          </div>
          
          <Button 
            onClick={() => setShowPlanBuilder(!showPlanBuilder)}
            size="lg"
            className="w-full mb-4"
          >
            {showPlanBuilder ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Plan Builder
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Create My Brain Building Program
              </>
            )}
          </Button>

          {showPlanBuilder && (
            <div className="mt-6 pt-6 border-t border-border">
              <StudyPlanBuilder />
            </div>
          )}
        </Card>

        {/* Key Assumptions */}
        <Card className="p-6 mt-8 bg-muted/30">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            Key Assumptions (Based on Real Data)
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• <span className="font-medium text-foreground">Starting score:</span> 1200 (solid baseline, room to grow)</li>
            <li>• <span className="font-medium text-foreground">Daily routine:</span> 5 hard Math + 5 hard English questions, fully reviewed</li>
            <li>• <span className="font-medium text-foreground">Benchmark:</span> ~100 hard questions understood ≈ 40–50 point increase</li>
            <li>• <span className="font-medium text-foreground">Diminishing returns:</span> Gains slow as you approach 1500+</li>
            <li>• <span className="font-medium text-foreground">Total to 1600:</span> From 1200 → 400 points (requires serious consistency)</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Sources: Piqosity research, Khan Academy/College Board studies, meta-analyses on spaced learning.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default WhyItWorks;
