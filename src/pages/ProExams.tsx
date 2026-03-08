import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { PRO_EXAMS, PRO_EXAM_CATEGORIES, type ProExamConfig } from "@/utils/proExamConfig";
import { BottomNav } from "@/components/BottomNav";

const ProExams = () => {
  const navigate = useNavigate();
  const categories = Object.entries(PRO_EXAM_CATEGORIES);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Professional Exams</h1>
            <p className="text-xs text-muted-foreground">Graduate, medical, law & more</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {categories.map(([catKey, catMeta]) => {
          const exams = PRO_EXAMS.filter(e => e.category === catKey);
          if (exams.length === 0) return null;
          return (
            <div key={catKey}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{catMeta.icon}</span>
                <h2 className="text-lg font-bold">{catMeta.label}</h2>
              </div>
              <div className="grid gap-3">
                {exams.map(exam => (
                  <Card
                    key={exam.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group"
                    onClick={() => navigate(`/pro-exam/${exam.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                        {exam.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{exam.shortName}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                            {exam.scoreRange.min}–{exam.scoreRange.max}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{exam.description}</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {exam.sections.slice(0, 3).map(s => (
                            <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              {s.length > 20 ? s.slice(0, 18) + '…' : s}
                            </span>
                          ))}
                          {exam.sections.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              +{exam.sections.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
        {/* FRQ Practice Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✍️</span>
            <h2 className="text-lg font-bold">Free Response Practice</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['gre', 'gmat', 'lsat', 'mcat'].map(id => {
              const exam = PRO_EXAMS.find(e => e.id === id);
              if (!exam) return null;
              return (
                <Card
                  key={id}
                  className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group"
                  onClick={() => navigate(`/pro-exam-frq/${id}`)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">{exam.icon}</span>
                    <h3 className="font-bold text-sm text-foreground">{exam.shortName} FRQ</h3>
                    <span className="text-[10px] text-muted-foreground">Written analysis</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Guides */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📖</span>
            <h2 className="text-lg font-bold">Study Guides</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['gre', 'gmat', 'lsat', 'mcat'].map(id => {
              const exam = PRO_EXAMS.find(e => e.id === id);
              if (!exam) return null;
              return (
                <Card
                  key={id}
                  className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group"
                  onClick={() => navigate(`/pro-exam-study/${id}`)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">{exam.icon}</span>
                    <h3 className="font-bold text-sm text-foreground">{exam.shortName} Guide</h3>
                    <span className="text-[10px] text-muted-foreground">Strategies & formulas</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tools Row */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40"
            onClick={() => navigate('/logic-games')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">🧩</div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Logic Games</h3>
                <p className="text-[10px] text-muted-foreground">LSAT puzzles</p>
              </div>
            </div>
          </Card>
          <Card
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40"
            onClick={() => navigate('/pro-exam-scores')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">📊</div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Score Tracker</h3>
                <p className="text-[10px] text-muted-foreground">Track progress</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExams;
