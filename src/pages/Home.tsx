import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-4xl w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-20 h-20 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SAT Mastery
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            The path to 1600
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-border">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Calculator className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Math</h2>
                <p className="text-muted-foreground mt-2">
                  Algebra, linear equations, and systems of equations
                </p>
              </div>
              <div className="flex justify-center text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-primary/10 rounded-full">{questions.length} Questions</span>
              </div>
              <Link to="/math">
                <Button size="lg" className="w-full">
                  Start Math Practice
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-border">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-secondary/10 rounded-full">
                  <PenTool className="w-12 h-12 text-secondary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Reading & Writing</h2>
                <p className="text-muted-foreground mt-2">
                  Grammar, vocabulary, and text analysis
                </p>
              </div>
              <div className="flex justify-center text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-primary/10 rounded-full">{englishQuestions.length} Questions</span>
              </div>
              <Link to="/english">
                <Button size="lg" variant="secondary" className="w-full">
                  Start English Practice
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
