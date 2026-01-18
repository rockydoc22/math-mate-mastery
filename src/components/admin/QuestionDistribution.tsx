import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { visualQuestionStats } from "@/data/additionalVisualQuestions";
import { visualMathQuestions, visualEnglishQuestions } from "@/data/visualQuestions";
import { moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/moreVisualQuestions";
import { grokVisualQuestions } from "@/data/grokVisualQuestions";

interface LevelCount {
  level: number;
  count: number;
}

export const QuestionDistribution = () => {
  const mathDistribution = useMemo(() => {
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 10; i++) counts[i] = 0;
    
    questions.forEach(q => {
      const level = Math.min(q.difficultyRating || 5, 10);
      if (level >= 1 && level <= 10) {
        counts[level]++;
      }
    });
    
    return Object.entries(counts).map(([level, count]) => ({
      level: parseInt(level),
      count
    }));
  }, []);

  const englishDistribution = useMemo(() => {
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 10; i++) counts[i] = 0;
    
    englishQuestions.forEach(q => {
      const level = Math.min(q.difficultyRating || 5, 10);
      if (level >= 1 && level <= 10) {
        counts[level]++;
      }
    });
    
    return Object.entries(counts).map(([level, count]) => ({
      level: parseInt(level),
      count
    }));
  }, []);

  const mathTotal = questions.length;
  const englishTotal = englishQuestions.length;
  const mathMax = Math.max(...mathDistribution.map(d => d.count));
  const englishMax = Math.max(...englishDistribution.map(d => d.count));

  const getLevelLabel = (level: number) => {
    if (level <= 3) return "Easy";
    if (level <= 6) return "Medium";
    if (level <= 8) return "Hard";
    return "Very Hard";
  };

  const getLevelColor = (level: number) => {
    if (level <= 3) return "bg-green-500";
    if (level <= 6) return "bg-yellow-500";
    if (level <= 8) return "bg-orange-500";
    return "bg-red-500";
  };

  const renderDistribution = (data: LevelCount[], max: number, subject: string) => (
    <div className="space-y-2">
      {data.map(({ level, count }) => (
        <div key={level} className="flex items-center gap-3">
          <div className="w-20 text-sm font-medium flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getLevelColor(level)}`} />
            Level {level}
          </div>
          <div className="flex-1">
            <div className="relative h-6 bg-muted rounded overflow-hidden">
              <div 
                className={`h-full ${getLevelColor(level)} transition-all`}
                style={{ width: `${max > 0 ? (count / max) * 100 : 0}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                {count}
              </span>
            </div>
          </div>
          <div className="w-16 text-xs text-muted-foreground text-right">
            {getLevelLabel(level)}
          </div>
        </div>
      ))}
    </div>
  );

  // Calculate gaps (levels with fewer than 20 questions)
  const mathGaps = mathDistribution.filter(d => d.count < 20 && d.level <= 10);
  const englishGaps = englishDistribution.filter(d => d.count < 20 && d.level <= 10);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>📐 Math Questions</span>
              <span className="text-sm font-normal text-muted-foreground">{mathTotal} total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderDistribution(mathDistribution, mathMax, "math")}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>📚 English Questions</span>
              <span className="text-sm font-normal text-muted-foreground">{englishTotal} total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderDistribution(englishDistribution, englishMax, "english")}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">📊 Distribution Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Math Gaps (levels 1-10 with &lt;20 questions):</h4>
            {mathGaps.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {mathGaps.map(({ level, count }) => (
                  <span key={level} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm">
                    Level {level}: {count} questions (need {20 - count} more)
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-600 dark:text-green-400 text-sm">✓ All levels have 20+ questions</p>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">English Gaps (levels 1-10 with &lt;20 questions):</h4>
            {englishGaps.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {englishGaps.map(({ level, count }) => (
                  <span key={level} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm">
                    Level {level}: {count} questions (need {20 - count} more)
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-600 dark:text-green-400 text-sm">✓ All levels have 20+ questions</p>
            )}
          </div>

          <div className="pt-2 border-t">
            <h4 className="font-medium mb-2">Summary:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Total Questions: <strong>{mathTotal + englishTotal}</strong></li>
              <li>• Math: <strong>{mathTotal}</strong> | English: <strong>{englishTotal}</strong></li>
              <li>• Balance: {mathTotal > englishTotal 
                ? `Math has ${mathTotal - englishTotal} more questions` 
                : englishTotal > mathTotal 
                  ? `English has ${englishTotal - mathTotal} more questions`
                  : "Perfectly balanced!"}</li>
            </ul>
          </div>

          <div className="pt-2 border-t">
            <h4 className="font-medium mb-2">📊 Visual Questions (Charts/Tables/Graphs):</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Additional Visual Math: <strong>{visualQuestionStats.total}</strong>
                <span className="text-xs ml-2">(Scatter: {visualQuestionStats.scatterPlot}, Bar: {visualQuestionStats.barChart}, Table: {visualQuestionStats.table}, Line: {visualQuestionStats.lineGraph})</span>
              </li>
              <li>• Visual Math (original): <strong>{visualMathQuestions.length}</strong></li>
              <li>• More Visual Math: <strong>{moreMathVisualQuestions.length}</strong></li>
              <li>• Grok Visual: <strong>{grokVisualQuestions.length}</strong></li>
              <li>• Visual English (original): <strong>{visualEnglishQuestions.length}</strong></li>
              <li>• More Visual English: <strong>{moreEnglishVisualQuestions.length}</strong></li>
              <li className="pt-1 font-medium text-foreground">
                • Total Visual Questions: <strong className="text-green-600">{visualQuestionStats.total + visualMathQuestions.length + moreMathVisualQuestions.length + grokVisualQuestions.length + visualEnglishQuestions.length + moreEnglishVisualQuestions.length}</strong>
                <span className="text-xs ml-2">({Math.round((visualQuestionStats.total + visualMathQuestions.length + moreMathVisualQuestions.length + grokVisualQuestions.length + visualEnglishQuestions.length + moreEnglishVisualQuestions.length) / (mathTotal + englishTotal) * 100)}% of total)</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
