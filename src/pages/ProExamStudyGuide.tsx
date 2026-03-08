import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Lightbulb, AlertTriangle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { getProExam } from '@/utils/proExamConfig';

interface StudyTopic {
  title: string;
  keyFacts: string[];
  strategies: string[];
  commonMistakes: string[];
  formulas?: string[];
}

const STUDY_GUIDES: Record<string, Record<string, StudyTopic[]>> = {
  gre: {
    Quantitative: [
      {
        title: 'Number Properties',
        keyFacts: ['Even × Odd = Even', 'Prime numbers: 2 is the only even prime', 'Divisibility rules for 2, 3, 5, 6, 9', '0 is neither positive nor negative'],
        strategies: ['Plug in numbers for abstract problems', 'Use the answer choices — work backwards', 'Estimate before calculating'],
        commonMistakes: ['Forgetting that 1 is NOT prime', 'Assuming variables must be integers', 'Ignoring negative number cases'],
        formulas: ['n! = n × (n-1) × ... × 1', 'GCD × LCM = product of two numbers'],
      },
      {
        title: 'Algebra & Functions',
        keyFacts: ['Quadratic formula: x = (-b ± √(b²-4ac)) / 2a', 'Difference of squares: a²-b² = (a+b)(a-b)', 'Function composition: (f∘g)(x) = f(g(x))'],
        strategies: ['Substitute simple values to test function behavior', 'Factor before simplifying rational expressions', 'Graph mentally to check range/domain'],
        commonMistakes: ['Sign errors when distributing negatives', 'Forgetting ± in square root solutions', 'Confusing domain restrictions'],
        formulas: ['Slope: m = (y₂-y₁)/(x₂-x₁)', 'Distance: d = √((x₂-x₁)² + (y₂-y₁)²)', 'Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)'],
      },
      {
        title: 'Data Analysis & Probability',
        keyFacts: ['Mean = sum/count', 'Median = middle value (or avg of two middles)', 'Standard deviation measures spread from mean', 'P(A or B) = P(A) + P(B) - P(A and B)'],
        strategies: ['For weighted averages, use the alligation method', 'Draw probability trees for multi-step events', 'Check if events are independent or dependent'],
        commonMistakes: ['Confusing permutations (order matters) with combinations', 'Forgetting to subtract overlap in "or" probability', 'Misreading chart scales'],
        formulas: ['nCr = n! / (r!(n-r)!)', 'nPr = n! / (n-r)!', 'Expected value = Σ(value × probability)'],
      },
    ],
    Verbal: [
      {
        title: 'Text Completion',
        keyFacts: ['1-blank, 2-blank, or 3-blank questions', 'Each blank is scored independently on multi-blank', 'Context clues: signal words (however, moreover, despite)'],
        strategies: ['Read the entire sentence first, predict the blank', 'Look for structural clues: contrast, continuation, cause-effect', 'Eliminate answers that don\'t fit the sentence logic'],
        commonMistakes: ['Choosing a word that "sounds good" without checking logic', 'Ignoring double negatives', 'Not reading all options before selecting'],
      },
      {
        title: 'Reading Comprehension',
        keyFacts: ['3 types: multiple-choice (1 answer), multiple-choice (multiple answers), select-in-passage', 'Passages from humanities, social science, natural science', 'Questions test main idea, detail, inference, structure'],
        strategies: ['Read the first/last sentence of each paragraph first', 'Mark the author\'s tone and main argument', 'For inference questions, the answer must be supported by text'],
        commonMistakes: ['Bringing outside knowledge into answers', 'Choosing answers that are too extreme', 'Confusing "the author would agree" with "is stated in the passage"'],
      },
    ],
    'Analytical Writing': [
      {
        title: 'Issue Essay',
        keyFacts: ['30 minutes, choose from 2 prompts', 'Scored 0-6 in half-point increments', 'Two readers + AI grader', 'Position must be clear and well-supported'],
        strategies: ['Spend 3-4 minutes outlining before writing', 'Use the "concession + rebuttal" structure', 'Aim for 4-5 paragraphs with specific examples', 'Save 2-3 minutes to proofread'],
        commonMistakes: ['Being wishy-washy — take a clear stance', 'Using only hypothetical examples', 'Writing too short (under 400 words)'],
      },
    ],
  },
  gmat: {
    Quantitative: [
      {
        title: 'Data Sufficiency',
        keyFacts: ['Unique to GMAT — tests whether you CAN solve, not the solution', '5 fixed answer choices (always the same)', 'Statements are always true — they are facts, not hypotheticals'],
        strategies: ['Memorize the answer choice pattern: AD/BCE', 'Test extreme values and edge cases', 'Don\'t actually solve — determine solvability', 'Each statement is independent unless combining'],
        commonMistakes: ['Solving for a specific value when sufficiency only needs yes/no', 'Forgetting to test negative numbers and zero', 'Assuming statements are related when evaluating independently'],
      },
      {
        title: 'Problem Solving',
        keyFacts: ['Standard 5-choice multiple choice', 'Covers arithmetic, algebra, geometry, word problems', 'No calculator allowed on Quant section'],
        strategies: ['Backsolve from answer choices', 'Use smart numbers (pick 100 for percentages)', 'Estimate aggressively — answers are often spread apart'],
        commonMistakes: ['Spending too long on one problem (2-min target)', 'Unit conversion errors in rate problems', 'Not simplifying before calculating'],
        formulas: ['Simple Interest: I = Prt', 'Compound Interest: A = P(1+r/n)^(nt)', 'Work rate: 1/A + 1/B = 1/T'],
      },
    ],
    Verbal: [
      {
        title: 'Critical Reasoning',
        keyFacts: ['Tests logical thinking, not reading speed', 'Question types: strengthen, weaken, assumption, inference, evaluate', 'The conclusion is the key — identify it first'],
        strategies: ['Pre-phrase your answer before reading choices', 'For "weaken" questions, find what breaks the logic chain', 'For "assumption" questions, negate each answer — the one that destroys the argument is correct'],
        commonMistakes: ['Confusing correlation with causation arguments', 'Choosing answers that are true but irrelevant', 'Over-reading into "inference" — stick to what must be true'],
      },
      {
        title: 'Sentence Correction',
        keyFacts: ['Tests grammar, style, and meaning', 'Answer A always repeats the original (underlined)', 'Most common errors: subject-verb agreement, parallelism, modifiers, pronouns, idioms'],
        strategies: ['Start by identifying the error type in the original', 'Compare answers in groups — eliminate by pattern', 'Read your choice back into the sentence for meaning'],
        commonMistakes: ['Choosing the shortest answer by default', 'Missing dangling modifiers', 'Ignoring meaning changes between answer choices'],
      },
    ],
    'Data Insights': [
      {
        title: 'Integrated Reasoning Concepts',
        keyFacts: ['Multi-source reasoning, graphics interpretation, two-part analysis, table analysis', 'Calculator IS available in this section', 'Tests ability to synthesize information from multiple sources'],
        strategies: ['For table analysis, sort by the relevant column first', 'Read all tabs/sources before answering multi-source questions', 'In two-part analysis, one answer often constrains the other'],
        commonMistakes: ['Rushing through data without noting units', 'Not reading all options in two-part analysis', 'Misinterpreting "approximately" as "exactly"'],
      },
    ],
  },
  lsat: {
    'Logical Reasoning': [
      {
        title: 'Argument Structure',
        keyFacts: ['Every argument has premises and a conclusion', 'Common patterns: causal, analogy, statistical, appeal to authority', 'Flaws are predictable — learn the taxonomy'],
        strategies: ['Always identify the conclusion first (look for "therefore", "thus", "hence")', 'Bracket the premises vs. background info', 'Pre-phrase the flaw before reading answers'],
        commonMistakes: ['Confusing a premise for the conclusion', 'Bringing real-world knowledge into logical analysis', 'Not recognizing conditional logic (if/then)'],
      },
      {
        title: 'Conditional Logic',
        keyFacts: ['If A → B (contrapositive: If not B → not A)', 'Necessary vs. sufficient conditions', '"Only if" introduces a necessary condition', '"Unless" = "if not"'],
        strategies: ['Diagram every conditional statement', 'Chain conditionals: If A→B and B→C, then A→C', 'For "must be true," the answer follows from given conditions'],
        commonMistakes: ['Confusing the inverse (If B→A) with the contrapositive', 'Treating "most" or "some" as universal', 'Forgetting that the absence of a sufficient condition tells us nothing'],
      },
    ],
    'Analytical Reasoning': [
      {
        title: 'Game Types & Setup',
        keyFacts: ['4 games, ~5-7 questions each, 35 minutes total', 'Common types: sequencing (linear), grouping, matching, hybrid', 'Rules create deductions — always make initial deductions before questions'],
        strategies: ['Draw the game board immediately', 'Make all deductions from the rules before touching questions', 'Look for "limited options" scenarios — split the game', 'For sequencing: create a number line; for grouping: create columns'],
        commonMistakes: ['Skipping initial deductions (costs time later)', 'Not re-reading rules carefully (missing "not adjacent" vs. "not next to")', 'Spending too long on one game — move on and come back'],
      },
    ],
    'Reading Comprehension': [
      {
        title: 'Passage Strategy',
        keyFacts: ['4 passages, ~27 questions total, 35 minutes', 'One passage is "comparative" (two shorter passages)', 'Topics: law, science, humanities, social science'],
        strategies: ['Read for structure, not detail — note paragraph purposes', 'Mark the main point and author\'s attitude', 'Return to the passage for detail questions — don\'t rely on memory'],
        commonMistakes: ['Reading too slowly/carefully the first time', 'Choosing answers that are "true" but not the point', 'On comparative passages, confusing which author said what'],
      },
    ],
  },
  mcat: {
    'Chemical and Physical Foundations': [
      {
        title: 'General Chemistry Essentials',
        keyFacts: ['Periodic trends: electronegativity, ionization energy, atomic radius', 'Acid/base: pH = -log[H⁺], strong vs. weak', 'Stoichiometry: always balance equations first', 'Thermodynamics: ΔG = ΔH - TΔS'],
        strategies: ['Memorize amino acid structures and pKa values', 'Use dimensional analysis for unit conversions', 'Estimate calculations — the MCAT gives you no calculator'],
        commonMistakes: ['Confusing molarity with molality', 'Forgetting to convert temperatures to Kelvin', 'Mixing up exothermic (negative ΔH) and endothermic'],
        formulas: ['PV = nRT', 'pH + pOH = 14', 'Keq = products/reactants', 'ΔG° = -RT ln(Keq)'],
      },
      {
        title: 'Physics Fundamentals',
        keyFacts: ['Kinematics: v = v₀ + at, d = v₀t + ½at²', 'Newton\'s Laws — free body diagrams are essential', 'Circuits: V = IR, series vs. parallel', 'Optics: thin lens equation 1/f = 1/dₒ + 1/dᵢ'],
        strategies: ['Draw diagrams for every physics problem', 'Break vectors into components', 'For circuits, simplify step by step'],
        commonMistakes: ['Forgetting to account for friction', 'Mixing up series (same current) and parallel (same voltage)', 'Using the wrong sign convention in optics'],
        formulas: ['F = ma', 'KE = ½mv²', 'PE = mgh', 'W = Fd cos θ', 'P = IV'],
      },
    ],
    'Biological and Biochemical Foundations': [
      {
        title: 'Molecular Biology & Genetics',
        keyFacts: ['Central dogma: DNA → RNA → Protein', 'Replication: leading strand (continuous), lagging strand (Okazaki fragments)', 'Transcription factors, promoters, enhancers', 'Punnett squares for inheritance patterns'],
        strategies: ['Know the enzymes for each step of central dogma', 'Trace a mutation from DNA → protein → phenotype', 'For genetics, always define alleles before solving'],
        commonMistakes: ['Confusing 5\' to 3\' direction for different processes', 'Forgetting post-translational modifications', 'Assuming all traits are simple Mendelian inheritance'],
      },
      {
        title: 'Biochemistry & Metabolism',
        keyFacts: ['Glycolysis: glucose → 2 pyruvate (net 2 ATP, 2 NADH)', 'Krebs cycle: 2 CO₂, 3 NADH, 1 FADH₂, 1 GTP per turn', 'ETC: ~30-32 ATP total from one glucose', 'Enzyme kinetics: Vmax, Km, competitive vs. noncompetitive inhibition'],
        strategies: ['Draw out metabolic pathways from memory', 'Know the regulatory enzymes and what activates/inhibits them', 'Lineweaver-Burk plots for enzyme inhibition identification'],
        commonMistakes: ['Confusing aerobic vs. anaerobic ATP yields', 'Forgetting that Km is unchanged in competitive inhibition', 'Mixing up anabolic and catabolic pathways'],
        formulas: ['Michaelis-Menten: v = Vmax[S]/(Km+[S])', 'Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])'],
      },
    ],
    'Psychological, Social, and Biological Foundations': [
      {
        title: 'Psychology & Sociology Core',
        keyFacts: ['Piaget stages: sensorimotor, preoperational, concrete operational, formal operational', 'Erikson\'s 8 psychosocial stages', 'Classical conditioning (Pavlov) vs. operant conditioning (Skinner)', 'Sociological theories: functionalism, conflict theory, symbolic interactionism'],
        strategies: ['Create mnemonics for stage theories', 'Connect psychological concepts to biological mechanisms', 'Know the difference between similar terms (prejudice vs. discrimination)'],
        commonMistakes: ['Confusing negative reinforcement with punishment', 'Mixing up reliability (consistency) and validity (accuracy)', 'Forgetting that MCAT psych/soc is heavily passage-based'],
      },
    ],
    'Critical Analysis and Reasoning': [
      {
        title: 'CARS Strategy',
        keyFacts: ['9 passages, 53 questions, 90 minutes (~10 min per passage)', 'NO science content — humanities and social sciences only', 'Tests comprehension, reasoning, and application'],
        strategies: ['Read actively — ask "what is the author\'s main point?" after each paragraph', 'Don\'t highlight excessively — note structure, not details', 'For "the author would most likely agree" — look for direct textual support'],
        commonMistakes: ['Spending too long on one passage (move on after 11 minutes)', 'Using outside knowledge to evaluate arguments', 'Choosing "extreme" answer choices when the passage is nuanced'],
      },
    ],
  },
};

const ProExamStudyGuide = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const exam = examId ? getProExam(examId) : undefined;
  const guide = examId ? STUDY_GUIDES[examId] : undefined;
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [masteredTopics, setMasteredTopics] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(`pro-guide-mastered-${examId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  if (!exam || !guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg font-bold mb-2">Exam not found</p>
          <Link to="/pro-exams"><Button>Back to Pro Exams</Button></Link>
        </Card>
      </div>
    );
  }

  const sections = Object.keys(guide);
  const allTopics = Object.values(guide).flat();
  const masteredCount = masteredTopics.size;
  const totalTopics = allTopics.length;

  const toggleExpand = (key: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleMastered = (key: string) => {
    setMasteredTopics(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem(`pro-guide-mastered-${examId}`, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/pro-exams`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">{exam.shortName} Study Guide</h1>
            <p className="text-xs text-muted-foreground">{masteredCount}/{totalTopics} topics mastered</p>
          </div>
          <span className="text-2xl">{exam.icon}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Mastery Progress</span>
            <span className="text-sm font-bold text-primary">{Math.round((masteredCount / totalTopics) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(masteredCount / totalTopics) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </Card>

        <Tabs defaultValue={sections[0]}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            {sections.map(s => (
              <TabsTrigger key={s} value={s} className="text-xs px-3 py-1.5">
                {s.length > 25 ? s.slice(0, 22) + '…' : s}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map(section => (
            <TabsContent key={section} value={section} className="space-y-3 mt-4">
              {guide[section].map((topic, idx) => {
                const key = `${section}-${idx}`;
                const expanded = expandedTopics.has(key);
                const mastered = masteredTopics.has(key);

                return (
                  <Card key={key} className={`overflow-hidden transition-all ${mastered ? 'border-primary/40 bg-primary/5' : ''}`}>
                    <div
                      className="p-4 flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleExpand(key)}
                    >
                      <button
                        onClick={e => { e.stopPropagation(); toggleMastered(key); }}
                        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          mastered ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 hover:border-primary'
                        }`}
                      >
                        {mastered && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-foreground">{topic.title}</h3>
                        <p className="text-[10px] text-muted-foreground">
                          {topic.keyFacts.length} facts · {topic.strategies.length} strategies · {topic.commonMistakes.length} pitfalls
                        </p>
                      </div>
                      {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4 border-t border-border pt-3">
                            {/* Key Facts */}
                            <div>
                              <h4 className="text-xs font-bold text-foreground flex items-center gap-1 mb-2">
                                <BookOpen className="w-3.5 h-3.5 text-primary" /> Key Facts
                              </h4>
                              <ul className="space-y-1">
                                {topic.keyFacts.map((f, i) => (
                                  <li key={i} className="text-xs text-muted-foreground pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-primary">
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Formulas */}
                            {topic.formulas && topic.formulas.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold text-foreground flex items-center gap-1 mb-2">
                                  📐 Formulas
                                </h4>
                                <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                                  {topic.formulas.map((f, i) => (
                                    <p key={i} className="text-xs font-mono text-foreground">{f}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Strategies */}
                            <div>
                              <h4 className="text-xs font-bold text-foreground flex items-center gap-1 mb-2">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Strategies
                              </h4>
                              <ul className="space-y-1">
                                {topic.strategies.map((s, i) => (
                                  <li key={i} className="text-xs text-muted-foreground pl-3 relative before:content-['💡'] before:absolute before:left-0 before:text-[10px]">
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Common Mistakes */}
                            <div>
                              <h4 className="text-xs font-bold text-foreground flex items-center gap-1 mb-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-destructive" /> Common Mistakes
                              </h4>
                              <ul className="space-y-1">
                                {topic.commonMistakes.map((m, i) => (
                                  <li key={i} className="text-xs text-destructive/80 pl-3 relative before:content-['⚠'] before:absolute before:left-0 before:text-[10px]">
                                    {m}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate(`/pro-exam/${examId}`)}>
            <span className="text-lg">📝</span>
            <span className="text-xs">Practice Questions</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate(`/pro-exam-frq/${examId}`)}>
            <span className="text-lg">✍️</span>
            <span className="text-xs">FRQ Practice</span>
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExamStudyGuide;
