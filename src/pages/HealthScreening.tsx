import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Activity, Brain, Heart, AlertTriangle, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ConsentGate } from "@/components/ConsentGate";
import { motion, AnimatePresence } from "framer-motion";

interface ScreeningItem {
  id: string;
  prompt: string;
  options: { label: string; score: number }[];
}

interface ScreeningConfig {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  disclaimerTitle: string;
  disclaimerText: string;
  checkboxLabel: string;
  items: ScreeningItem[];
  scoreBands: { min: number; max: number; label: string; color: string; desc: string }[];
}

const MEMORY_ITEMS: ScreeningItem[] = [
  { id: "mem-1", prompt: "I have difficulty remembering recent conversations.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-2", prompt: "I forget appointments or important dates.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-3", prompt: "I have trouble finding the right word in conversation.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-4", prompt: "I lose track of what I was doing or thinking.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-5", prompt: "I have difficulty following a story on TV or in a book.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-6", prompt: "I forget where I put everyday items (keys, phone, glasses).", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-7", prompt: "I have difficulty learning new information or skills.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-8", prompt: "I repeat questions or stories without realizing it.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-9", prompt: "I have trouble managing finances or paying bills on time.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-10", prompt: "I feel confused about the time of day or day of the week.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-11", prompt: "I have difficulty planning or organizing tasks.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "mem-12", prompt: "I struggle to navigate familiar routes.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
];

const ADHD_ITEMS: ScreeningItem[] = [
  { id: "adhd-1", prompt: "I have difficulty sustaining attention on tasks or activities.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-2", prompt: "I make careless mistakes in work or other activities.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-3", prompt: "I have trouble organizing tasks and activities.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-4", prompt: "I avoid or am reluctant to engage in tasks requiring sustained mental effort.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-5", prompt: "I lose things necessary for tasks or activities.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-6", prompt: "I am easily distracted by extraneous stimuli.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-7", prompt: "I fidget, tap my hands/feet, or squirm in my seat.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-8", prompt: "I have difficulty remaining seated when expected to.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-9", prompt: "I talk excessively in social situations.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-10", prompt: "I blurt out answers before questions are completed.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-11", prompt: "I have difficulty waiting my turn.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
  { id: "adhd-12", prompt: "I interrupt others frequently.", options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 1 }, { label: "Sometimes", score: 2 }, { label: "Often", score: 3 }, { label: "Very Often", score: 4 }] },
];

const MOOD_ITEMS: ScreeningItem[] = [
  { id: "mood-1", prompt: "Over the past 2 weeks, I've had little interest or pleasure in doing things.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-2", prompt: "Over the past 2 weeks, I've been feeling down, depressed, or hopeless.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-3", prompt: "Over the past 2 weeks, I've had trouble falling or staying asleep, or sleeping too much.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-4", prompt: "Over the past 2 weeks, I've been feeling tired or having little energy.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-5", prompt: "Over the past 2 weeks, I've had poor appetite or been overeating.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-6", prompt: "Over the past 2 weeks, I've been feeling bad about myself — or that I'm a failure.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-7", prompt: "Over the past 2 weeks, I've had trouble concentrating on things.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-8", prompt: "Over the past 2 weeks, I've been feeling nervous, anxious, or on edge.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-9", prompt: "Over the past 2 weeks, I haven't been able to stop or control worrying.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-10", prompt: "Over the past 2 weeks, I've been worrying too much about different things.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-11", prompt: "Over the past 2 weeks, I've had trouble relaxing.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
  { id: "mood-12", prompt: "Over the past 2 weeks, I've felt afraid as if something awful might happen.", options: [{ label: "Not at all", score: 0 }, { label: "Several days", score: 1 }, { label: "More than half the days", score: 2 }, { label: "Nearly every day", score: 3 }] },
];

const TBI_ITEMS: ScreeningItem[] = [
  { id: "tbi-1", prompt: "I experience headaches.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-2", prompt: "I feel pressure in my head.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-3", prompt: "I feel nauseous or dizzy.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-4", prompt: "I have difficulty with balance.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-5", prompt: "I experience blurry or double vision.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-6", prompt: "I am sensitive to light.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-7", prompt: "I am sensitive to noise.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-8", prompt: "I feel mentally foggy.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-9", prompt: "I have difficulty concentrating.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-10", prompt: "I have difficulty remembering.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-11", prompt: "I feel more emotional than usual.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
  { id: "tbi-12", prompt: "I feel drowsy or fatigued.", options: [{ label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 3 }] },
];

const HEALTH_DISCLAIMER = `IMPORTANT: This screening tool is for informational and educational purposes ONLY. It is NOT a clinical diagnostic instrument and should NOT be used to diagnose, treat, or manage any medical condition.

This assessment:
• Does NOT replace professional medical evaluation
• Does NOT constitute medical advice
• Cannot diagnose dementia, ADHD, depression, anxiety, concussion, or any other condition
• Should NOT be used as the sole basis for any medical decision

Results are general indicators based on self-reported symptoms. Many factors (stress, sleep, medication, etc.) can affect scores. False positives and false negatives are common with screening tools.

If you have concerns about your cognitive health, mood, or have experienced a head injury, please consult a licensed healthcare professional (physician, neuropsychologist, psychiatrist, or other qualified provider) for proper evaluation and diagnosis.

If you are in crisis or experiencing thoughts of self-harm, please contact:
• 988 Suicide & Crisis Lifeline: call/text 988
• Crisis Text Line: text HOME to 741741
• Emergency: call 911`;

const SCREENINGS: ScreeningConfig[] = [
  {
    id: "dementia",
    title: "Memory & Cognitive Screening",
    emoji: "🧠",
    desc: "12 questions about memory, orientation, and daily functioning",
    disclaimerTitle: "Medical Disclaimer — Cognitive Screening",
    disclaimerText: HEALTH_DISCLAIMER,
    checkboxLabel: "I have read and understand this disclaimer. I acknowledge this is NOT a diagnostic tool and does NOT replace professional medical evaluation. I agree to use results for informational purposes only.",
    items: MEMORY_ITEMS,
    scoreBands: [
      { min: 0, max: 8, label: "Low Concern", color: "text-green-600", desc: "Your responses suggest minimal cognitive concerns. Continue healthy habits like regular exercise, sleep, and mental engagement." },
      { min: 9, max: 20, label: "Mild Concern", color: "text-yellow-600", desc: "Some responses indicate areas worth monitoring. Stress, sleep issues, and medication can affect cognition. Consider discussing with your doctor at your next visit." },
      { min: 21, max: 35, label: "Moderate Concern", color: "text-orange-600", desc: "Several responses suggest cognitive difficulties worth discussing with a healthcare provider. Please schedule an appointment for a professional evaluation." },
      { min: 36, max: 48, label: "Significant Concern", color: "text-red-600", desc: "Your responses indicate notable cognitive concerns. We strongly recommend scheduling an appointment with a healthcare professional for a thorough cognitive evaluation as soon as possible." },
    ],
  },
  {
    id: "adhd",
    title: "ADHD Screening",
    emoji: "⚡",
    desc: "12 questions about attention, hyperactivity, and impulsivity",
    disclaimerTitle: "Medical Disclaimer — ADHD Screening",
    disclaimerText: HEALTH_DISCLAIMER,
    checkboxLabel: "I have read and understand this disclaimer. I acknowledge this is NOT a diagnostic tool and does NOT replace professional medical evaluation. I agree to use results for informational purposes only.",
    items: ADHD_ITEMS,
    scoreBands: [
      { min: 0, max: 10, label: "Low Indicators", color: "text-green-600", desc: "Your responses are within the typical range. Most people experience occasional inattention or restlessness." },
      { min: 11, max: 22, label: "Mild Indicators", color: "text-yellow-600", desc: "Some responses suggest attention or activity patterns that may be worth exploring. Consider discussing with a healthcare provider if these affect daily life." },
      { min: 23, max: 35, label: "Moderate Indicators", color: "text-orange-600", desc: "Several responses are consistent with ADHD-like patterns. We recommend discussing with a healthcare professional for proper assessment." },
      { min: 36, max: 48, label: "Significant Indicators", color: "text-red-600", desc: "Your responses suggest notable attention/activity concerns. Please consider scheduling an evaluation with a healthcare professional who specializes in ADHD." },
    ],
  },
  {
    id: "mood",
    title: "Mood & Anxiety Screening",
    emoji: "💙",
    desc: "12 questions about mood, energy, worry, and well-being (past 2 weeks)",
    disclaimerTitle: "Medical Disclaimer — Mood Screening",
    disclaimerText: HEALTH_DISCLAIMER,
    checkboxLabel: "I have read and understand this disclaimer. I acknowledge this is NOT a diagnostic tool and does NOT replace professional medical evaluation. I agree to use results for informational purposes only.",
    items: MOOD_ITEMS,
    scoreBands: [
      { min: 0, max: 6, label: "Minimal", color: "text-green-600", desc: "Your responses suggest minimal mood or anxiety symptoms. Continue practicing self-care and healthy coping strategies." },
      { min: 7, max: 14, label: "Mild", color: "text-yellow-600", desc: "Some symptoms are present. Consider monitoring your mood and incorporating stress management techniques. Discuss with your doctor if symptoms persist." },
      { min: 15, max: 24, label: "Moderate", color: "text-orange-600", desc: "Moderate symptoms are indicated. We recommend speaking with a healthcare professional about your mood and well-being." },
      { min: 25, max: 36, label: "Significant", color: "text-red-600", desc: "Your responses indicate significant mood or anxiety symptoms. Please reach out to a healthcare professional. If in crisis, contact the 988 Suicide & Crisis Lifeline." },
    ],
  },
  {
    id: "tbi",
    title: "Concussion / TBI Symptom Check",
    emoji: "🏈",
    desc: "12 questions about post-injury symptoms (headache, balance, cognition)",
    disclaimerTitle: "Medical Disclaimer — Concussion Screening",
    disclaimerText: HEALTH_DISCLAIMER,
    checkboxLabel: "I have read and understand this disclaimer. I acknowledge this is NOT a diagnostic tool and does NOT replace professional medical evaluation. I agree to use results for informational purposes only.",
    items: TBI_ITEMS,
    scoreBands: [
      { min: 0, max: 6, label: "Minimal Symptoms", color: "text-green-600", desc: "Few post-injury symptoms reported. Continue monitoring and follow return-to-activity protocols." },
      { min: 7, max: 15, label: "Mild Symptoms", color: "text-yellow-600", desc: "Some symptoms present. Rest and avoid activities that worsen symptoms. See a healthcare provider if symptoms persist beyond a few days." },
      { min: 16, max: 25, label: "Moderate Symptoms", color: "text-orange-600", desc: "Notable post-injury symptoms. Please see a healthcare professional for evaluation. Avoid physical and cognitive exertion until cleared." },
      { min: 26, max: 36, label: "Significant Symptoms", color: "text-red-600", desc: "Significant post-injury symptoms reported. Seek medical attention promptly. Do NOT return to physical activity or sports without clearance from a healthcare provider." },
    ],
  },
];

type PageMode = "select" | "screening" | "results";

const HealthScreening = () => {
  const { user } = useAuth();
  const [pageMode, setPageMode] = useState<PageMode>("select");
  const [activeScreening, setActiveScreening] = useState<ScreeningConfig | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const startScreening = (config: ScreeningConfig) => {
    setActiveScreening(config);
    setCurrentIndex(0);
    setTotalScore(0);
    setPageMode("screening");
  };

  const handleAnswer = (score: number) => {
    const newTotal = totalScore + score;
    setTotalScore(newTotal);

    if (activeScreening && currentIndex < activeScreening.items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setTotalScore(newTotal);
      setPageMode("results");
    }
  };

  const getBand = () => {
    if (!activeScreening) return null;
    return activeScreening.scoreBands.find(
      (b) => totalScore >= b.min && totalScore <= b.max
    ) || activeScreening.scoreBands[activeScreening.scoreBands.length - 1];
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to access health screenings</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Health Screenings
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {pageMode === "select" && (
          <div className="space-y-4">
            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  These are non-clinical screening tools for educational purposes only. They do NOT diagnose any condition. Each screening requires reading and agreeing to a medical disclaimer before proceeding.
                </p>
              </div>
            </Card>

            {SCREENINGS.map((s) => (
              <Card
                key={s.id}
                className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => startScreening(s)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{s.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {pageMode === "screening" && activeScreening && (
          <ConsentGate
            consentType="health_screening"
            consentKey={activeScreening.id}
            title={activeScreening.disclaimerTitle}
            disclaimerText={activeScreening.disclaimerText}
            checkboxLabel={activeScreening.checkboxLabel}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Progress
                  value={Math.round(((currentIndex + 1) / activeScreening.items.length) * 100)}
                  className="flex-1 h-2"
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {currentIndex + 1}/{activeScreening.items.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreening.items[currentIndex].id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6">
                    <p className="text-lg font-medium mb-6 leading-relaxed">
                      {activeScreening.items[currentIndex].prompt}
                    </p>
                    <div className="space-y-2">
                      {activeScreening.items[currentIndex].options.map((opt) => (
                        <Button
                          key={opt.label}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => handleAnswer(opt.score)}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </ConsentGate>
        )}

        {pageMode === "results" && activeScreening && (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-2">{activeScreening.emoji}</div>
              <h2 className="text-xl font-bold mb-1">{activeScreening.title} Results</h2>
              <p className="text-sm text-muted-foreground">Score: {totalScore} / {activeScreening.items.length * (activeScreening.items[0].options.length - 1)}</p>
            </Card>

            {getBand() && (
              <Card className="p-6">
                <h3 className={`text-lg font-bold ${getBand()!.color}`}>{getBand()!.label}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{getBand()!.desc}</p>
              </Card>
            )}

            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                  <p className="font-bold">Remember:</p>
                  <p>This is NOT a diagnosis. Only a qualified healthcare professional can diagnose medical conditions. If your results concern you, please consult a doctor.</p>
                  <p><strong>Crisis resources:</strong> 988 Suicide & Crisis Lifeline (call/text 988)</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => startScreening(activeScreening)}>
                Retake
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => { setPageMode("select"); setActiveScreening(null); }}>
                Other Screenings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthScreening;
