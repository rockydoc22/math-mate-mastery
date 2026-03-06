import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical, Lock } from "lucide-react";
import { AP_SUBJECTS, AP_CATEGORIES, AP_CATEGORY_ORDER } from "@/utils/apConfig";

const APTests = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectId: string, comingSoon?: boolean) => {
    if (comingSoon) return;
    navigate(`/ap-study/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-primary" />
              AP Tests
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your AP subject to start practicing
            </p>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All Subjects
          </Button>
          {AP_CATEGORY_ORDER.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {AP_CATEGORIES[cat].icon} {AP_CATEGORIES[cat].label}
            </Button>
          ))}
        </div>

        {/* Subject cards */}
        <div className="grid gap-3">
          {AP_CATEGORY_ORDER
            .filter(cat => !selectedCategory || selectedCategory === cat)
            .map(cat => {
              const subjects = filteredSubjects.filter(s => s.category === cat);
              if (subjects.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    {AP_CATEGORIES[cat].icon} {AP_CATEGORIES[cat].label}
                  </h2>
                  <div className="grid gap-2">
                    {subjects.map(subject => (
                      <Card
                        key={subject.id}
                        className={`p-4 cursor-pointer transition-all ${
                          subject.comingSoon
                            ? 'opacity-50 border-dashed cursor-not-allowed'
                            : 'hover:scale-[1.01] hover:shadow-md hover:border-primary/40'
                        }`}
                        onClick={() => handleSubjectClick(subject.id, subject.comingSoon)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm truncate">{subject.name}</h3>
                              {subject.comingSoon && (
                                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium shrink-0">
                                  <Lock className="w-3 h-3" /> Coming Soon
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{subject.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            Score: {subject.scoreRange.min}–{subject.scoreRange.max}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <p className="text-xs text-center text-muted-foreground pt-4">
          More AP subjects are being added regularly. Have a request? Let us know!
        </p>
      </div>
    </div>
  );
};

export default APTests;
