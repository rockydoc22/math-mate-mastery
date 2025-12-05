import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Target, BarChart3, Loader2 } from "lucide-react";

interface SkillData {
  domain: string;
  skill: string;
  total: number;
  correct: number;
  percentage: number;
}

interface TestHistory {
  id: string;
  total_score: number;
  math_score: number;
  english_score: number;
  completed_at: string;
}

const Insights = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mathSkills, setMathSkills] = useState<SkillData[]>([]);
  const [englishSkills, setEnglishSkills] = useState<SkillData[]>([]);
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    mathAccuracy: 0,
    englishAccuracy: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch all question attempts
      const { data: attempts } = await supabase
        .from("question_attempts")
        .select("*")
        .eq("user_id", user.id);

      if (attempts && attempts.length > 0) {
        // Calculate overall stats
        const mathAttempts = attempts.filter(a => a.question_type === "math");
        const englishAttempts = attempts.filter(a => a.question_type === "english");
        
        setOverallStats({
          totalQuestions: attempts.length,
          correctAnswers: attempts.filter(a => a.is_correct).length,
          mathAccuracy: mathAttempts.length > 0 
            ? Math.round((mathAttempts.filter(a => a.is_correct).length / mathAttempts.length) * 100)
            : 0,
          englishAccuracy: englishAttempts.length > 0
            ? Math.round((englishAttempts.filter(a => a.is_correct).length / englishAttempts.length) * 100)
            : 0,
        });

        // Group by domain and skill
        const groupBySkill = (attempts: typeof mathAttempts) => {
          const grouped: Record<string, SkillData> = {};
          
          attempts.forEach(a => {
            const key = `${a.domain}-${a.skill}`;
            if (!grouped[key]) {
              grouped[key] = { domain: a.domain, skill: a.skill, total: 0, correct: 0, percentage: 0 };
            }
            grouped[key].total++;
            if (a.is_correct) grouped[key].correct++;
          });

          return Object.values(grouped)
            .map(s => ({ ...s, percentage: Math.round((s.correct / s.total) * 100) }))
            .sort((a, b) => a.percentage - b.percentage);
        };

        setMathSkills(groupBySkill(mathAttempts));
        setEnglishSkills(groupBySkill(englishAttempts));
      }

      // Fetch test history
      const { data: tests } = await supabase
        .from("practice_tests")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(10);

      if (tests) {
        setTestHistory(tests);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view insights</h1>
          <p className="text-muted-foreground mb-4">Track your progress and identify weak areas</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const weakestMath = mathSkills.slice(0, 3);
  const weakestEnglish = englishSkills.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Performance Insights</h1>
            <p className="text-muted-foreground">Identify your weak areas and track progress</p>
          </div>
        </div>

        {overallStats.totalQuestions === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No data yet</h2>
              <p className="text-muted-foreground mb-4">Complete some quizzes or practice tests to see your insights</p>
              <div className="flex gap-4 justify-center">
                <Link to="/quiz?subject=both&count=10">
                  <Button variant="outline">Quick Quiz</Button>
                </Link>
                <Link to="/practice-test">
                  <Button>Practice Test</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{overallStats.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions Attempted</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {Math.round((overallStats.correctAnswers / overallStats.totalQuestions) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-500">{overallStats.mathAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Math Accuracy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-purple-500">{overallStats.englishAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">English Accuracy</div>
                </CardContent>
              </Card>
            </div>

            {/* Weak Areas */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    Math - Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weakestMath.length > 0 ? (
                    <div className="space-y-4">
                      {weakestMath.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="truncate">{skill.skill || skill.domain}</span>
                            <span className={skill.percentage < 50 ? "text-destructive" : "text-muted-foreground"}>
                              {skill.percentage}% ({skill.correct}/{skill.total})
                            </span>
                          </div>
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No math data yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    English - Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weakestEnglish.length > 0 ? (
                    <div className="space-y-4">
                      {weakestEnglish.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="truncate">{skill.skill || skill.domain}</span>
                            <span className={skill.percentage < 50 ? "text-destructive" : "text-muted-foreground"}>
                              {skill.percentage}% ({skill.correct}/{skill.total})
                            </span>
                          </div>
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No english data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Test History */}
            {testHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Practice Test History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testHistory.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-semibold">{test.total_score}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(test.completed_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-blue-500">Math: {test.math_score}</span>
                          <span className="text-purple-500">English: {test.english_score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-6 text-center">
              <Link to="/review">
                <Button className="gap-2">
                  <Target className="w-4 h-4" />
                  Practice Weak Areas
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Insights;
