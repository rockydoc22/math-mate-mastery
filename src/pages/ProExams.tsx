import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { PRO_EXAMS, PRO_EXAM_CATEGORIES, type ProExamConfig } from "@/utils/proExamConfig";
import { BottomNav } from "@/components/BottomNav";
import { ConsentGate } from "@/components/ConsentGate";
import { SEO } from "@/components/SEO";

const IP_DISCLAIMER = `Important Disclaimer

This application provides original, free-response format (FRC) practice questions and materials created independently. Multiple Choice questions are specifically limited.

This app is not affiliated with, endorsed by, sponsored by, or in any way officially connected to:

• The Law School Admission Council (LSAC)
• The LSAT® or any LSAT-related products or services
• The Graduate Management Admission Council (GMAC)
• The GMAT™ exam or any GMAT-related products or services
• ACT Inc. (ACT)
• ETS (GRE, TOEFL, Praxis, etc.)
• College Board (SAT, PSAT, AP)
• NCBE (bar exam components like MBE, MEE, MPT)
• Any other official testing organization or standardized exam

None of the questions, passages, prompts, or content in this app are copied from, derived from, or reproduce official exams, questions, books, websites, or other protected exam materials. This app is intended solely as an independent study aid to help users practice logical reasoning, reading comprehension, analytical writing, quantitative reasoning, and related skills in a free-response format.

The use of terms such as "LSAT-style," "GMAT-style," or similar descriptive phrases is for informational purposes only and does not imply any official relationship or approval.

For official preparation materials, practice tests, registration, and policies, please visit the official respective websites.

AlphaOmega assumes no responsibility for how users perform on actual standardized exams. Success on the LSAT, GMAT, or any other test depends on many factors beyond practice with this application.`;

const IP_CHECKBOX = "I have read and understand this notice. I acknowledge that this platform uses only original content and is not affiliated with or endorsed by official testing organizations. I agree to use this platform responsibly.";

// MCAT and LSAT are now FRQ-only (no multiple choice to avoid IP issues)
const FRQ_ONLY_EXAMS = ['mcat', 'lsat'];

const ProExams = () => {
  const navigate = useNavigate();
  const categories = Object.entries(PRO_EXAM_CATEGORIES);

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title="Free Pro & Grad Exam Practice — LSAT, GMAT, GRE & More"
        description="Original, free-response practice for LSAT, GMAT, GRE, MCAT, bar exam prep, and more. 100% free, AI-generated, with instant feedback."
        path="/pro-exams"
      />
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
        <ConsentGate
          consentType="pro_exam_ip"
          consentKey="all_pro_exams"
          title="Intellectual Property Notice"
          disclaimerText={IP_DISCLAIMER}
          checkboxLabel={IP_CHECKBOX}
        >
          {categories.map(([catKey, catMeta]) => {
            const exams = PRO_EXAMS.filter(e => e.category === catKey && !FRQ_ONLY_EXAMS.includes(e.id));
            if (exams.length === 0) return null;
            return (
              <div key={catKey} className="mb-6">
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

          {/* MCAT/LSAT — FRQ-Only Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✍️</span>
              <h2 className="text-lg font-bold">MCAT & LSAT — Free Response Only</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Original passage-based reasoning questions with AI grading. No multiple choice — all free response to avoid any IP concerns.
            </p>
            <div className="grid gap-3">
              {FRQ_ONLY_EXAMS.map(id => {
                const exam = PRO_EXAMS.find(e => e.id === id);
                if (!exam) return null;
                return (
                  <Card
                    key={id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group border-2 border-primary/20"
                    onClick={() => navigate(`/pro-exam-frq/${id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                        {exam.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{exam.shortName}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">FRQ Only</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{exam.description}</p>
                        <p className="text-[10px] text-primary mt-1">Original passages • AI-graded • No IP risk</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Anatomy Atlas - MCAT Specific */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🫀</span>
              <h2 className="text-lg font-bold">Anatomy Atlas</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Interactive body identification — like the game Operation! Identify muscles, bones, and structures.
            </p>
            <Card
              className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group border-2 border-primary/20"
              onClick={() => navigate('/anatomy-atlas')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                  🦴
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">Musculoskeletal Atlas</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Interactive</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Identify muscles & bones on interactive SVG diagrams</p>
                  <p className="text-[10px] text-primary mt-1">Desktop: free-text • Mobile: tap labels • Fuzzy spelling</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Card>
          </div>

          {/* GRE/GMAT FRQ Practice Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📝</span>
              <h2 className="text-lg font-bold">Analytical Writing Practice</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['gre', 'gmat'].map(id => {
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

          {/* Study Guides - exclude gated exams */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📖</span>
              <h2 className="text-lg font-bold">Study Guides</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['gre', 'gmat'].map(id => {
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
                  <p className="text-[10px] text-muted-foreground">Analytical puzzles</p>
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
        </ConsentGate>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExams;
