import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Swords } from "lucide-react";
import { PRO_EXAMS, PRO_EXAM_CATEGORIES, type ProExamConfig } from "@/utils/proExamConfig";
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

// The Pro Exams page focuses on graduate / professional / career exams.
// K-12 assessments live in /k12-exams and GED/HiSET live in /high-school-exams,
// so we drop those categories/exams here to avoid duplication.
const HIDDEN_CATEGORIES = new Set(['k12']);
const HIDDEN_EXAM_IDS = new Set(['ged', 'hiset']);

// Consolidated top-level groups. Each group pulls from one or more of the
// raw exam categories so students see a cleaner "pick your track" layout.
type GroupKey = 'healthcare' | 'graduate' | 'career' | 'military' | 'international' | 'faith';
const GROUPS: Record<GroupKey, { label: string; icon: string; blurb: string; categories: string[]; extras?: string[] }> = {
  healthcare:    { label: 'Healthcare',        icon: '⚕️', blurb: 'MCAT, DAT, OAT, NCLEX, TEAS + Anatomy Atlas', categories: ['professional', 'nursing'], extras: ['anatomy-atlas'] },
  graduate:      { label: 'Graduate & Law',    icon: '🎓', blurb: 'GRE, GMAT, LSAT',                              categories: ['graduate'] },
  career:        { label: 'Career & Placement', icon: '💼', blurb: 'ACCUPLACER and college placement',            categories: ['career'] },
  military:      { label: 'Military & Trade',  icon: '🎖️', blurb: 'ASVAB and vocational batteries',              categories: ['military'] },
  international: { label: 'International & Language', icon: '🌍', blurb: 'TOEFL and IB Diploma',                   categories: ['international'] },
  faith:         { label: 'Faith-Based',       icon: '✝️', blurb: 'Classic Learning Test',                        categories: ['faith-based'] },
};
const GROUP_ORDER: GroupKey[] = ['healthcare', 'graduate', 'career', 'military', 'international', 'faith'];

const ProExams = () => {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState<GroupKey | null>(null);

  const visibleExams = useMemo(
    () => PRO_EXAMS.filter(e => !HIDDEN_CATEGORIES.has(e.category) && !HIDDEN_EXAM_IDS.has(e.id)),
    []
  );

  const examsInGroup = (g: GroupKey): ProExamConfig[] =>
    visibleExams.filter(e => GROUPS[g].categories.includes(e.category));

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
          {/* Category picker — tap a track to reveal its exams. */}
          <div className="grid grid-cols-2 gap-3">
            {GROUP_ORDER.map(g => {
              const count = examsInGroup(g).length + (GROUPS[g].extras?.length ?? 0);
              if (count === 0) return null;
              const active = activeGroup === g;
              return (
                <Card
                  key={g}
                  onClick={() => setActiveGroup(active ? null : g)}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${active ? 'border-primary ring-2 ring-primary/30' : 'hover:border-primary/40'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{GROUPS[g].icon}</span>
                    <div className="min-w-0">
                      <h2 className="font-bold text-sm text-foreground">{GROUPS[g].label}</h2>
                      <p className="text-[11px] text-muted-foreground leading-snug">{GROUPS[g].blurb}</p>
                      <p className="text-[10px] text-primary mt-1">{count} exam{count === 1 ? '' : 's'}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {activeGroup && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xl">{GROUPS[activeGroup].icon}</span>
                <h2 className="text-lg font-bold">{GROUPS[activeGroup].label}</h2>
              </div>
              {examsInGroup(activeGroup).map(exam => (
                <Card
                  key={exam.id}
                  className="p-4 hover:shadow-md transition-all hover:border-primary/40 group"
                >
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                      navigate(FRQ_ONLY_EXAMS.includes(exam.id) ? `/pro-exam-frq/${exam.id}` : `/pro-exam/${exam.id}`)
                    }
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                      {exam.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground">{exam.shortName}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                          {exam.scoreRange.min}–{exam.scoreRange.max}
                        </span>
                        {FRQ_ONLY_EXAMS.includes(exam.id) && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">FRQ Only</span>
                        )}
                        {exam.fresh && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                            ✨ Fresh
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{exam.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>

                  {/* Per-exam extras: score tracker, study guide, daily boss.
                      Boss lives on the exam card as "Daily <EXAM> Boss" per the
                      user's request rather than a separate global section. */}
                  <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                    <Button
                      size="sm" variant="outline"
                      onClick={(e) => { e.stopPropagation(); navigate(`/boss-battle?exam=${exam.id}`); }}
                      className="text-[11px] h-7"
                    >
                      <Swords className="w-3 h-3 mr-1" /> Daily {exam.shortName} Boss
                    </Button>
                    {['gre', 'gmat'].includes(exam.id) && (
                      <>
                        <Button
                          size="sm" variant="ghost"
                          onClick={(e) => { e.stopPropagation(); navigate(`/pro-exam-frq/${exam.id}`); }}
                          className="text-[11px] h-7"
                        >
                          ✍️ Analytical Writing
                        </Button>
                        <Button
                          size="sm" variant="ghost"
                          onClick={(e) => { e.stopPropagation(); navigate(`/pro-exam-study/${exam.id}`); }}
                          className="text-[11px] h-7"
                        >
                          📖 Study Guide
                        </Button>
                      </>
                    )}
                    {exam.id === 'lsat' && (
                      <Button
                        size="sm" variant="ghost"
                        onClick={(e) => { e.stopPropagation(); navigate('/logic-games'); }}
                        className="text-[11px] h-7"
                      >
                        🧩 Logic Games
                      </Button>
                    )}
                  </div>
                </Card>
              ))}

              {activeGroup === 'healthcare' && (
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/40 group border-2 border-primary/20"
                  onClick={() => navigate('/anatomy-atlas')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">🦴</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">Anatomy Atlas</h3>
                      <p className="text-xs text-muted-foreground">Interactive muscle & bone identification for MCAT/NCLEX prep.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Card>
              )}

              {/* Global score tracker lives at the bottom of any active group
                  so it isn't a competing top-level tile. */}
              <button
                onClick={() => navigate('/pro-exam-scores')}
                className="w-full text-xs text-primary hover:underline pt-1"
              >
                📊 Open Score Tracker for all exams →
              </button>
            </div>
          )}
        </ConsentGate>
      </div>
    </div>
  );
};

export default ProExams;
