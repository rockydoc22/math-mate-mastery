import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { PWAUpdatePrompt } from "@/components/PWAUpdatePrompt";
import { LandingPage } from "@/components/LandingPage";

// Core pages loaded eagerly (Home + Auth are always needed)
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Everything else lazy-loaded for code splitting
const Quiz = lazy(() => import("./pages/Quiz"));
const MathQuiz = lazy(() => import("./pages/MathQuiz"));
const EnglishQuiz = lazy(() => import("./pages/EnglishQuiz"));
const Admin = lazy(() => import("./pages/Admin"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const StudyMode = lazy(() => import("./pages/StudyMode"));
const ProblemsByTopic = lazy(() => import("./pages/ProblemsByTopic"));
const DailyChallenge = lazy(() => import("./pages/DailyChallenge"));
const Profile = lazy(() => import("./pages/Profile"));
const Friends = lazy(() => import("./pages/Friends"));
const BattleLobby = lazy(() => import("./pages/BattleLobby"));
const BattleRoom = lazy(() => import("./pages/BattleRoom"));
const PracticeTest = lazy(() => import("./pages/PracticeTest"));
const Insights = lazy(() => import("./pages/Insights"));
const Review = lazy(() => import("./pages/Review"));
const WhyItWorks = lazy(() => import("./pages/WhyItWorks"));
const TopicMastery = lazy(() => import("./pages/TopicMastery"));
const ElitePractice = lazy(() => import("./pages/ElitePractice"));
const Rulebook = lazy(() => import("./pages/Rulebook"));
const DemoMode = lazy(() => import("./pages/DemoMode"));
const Settings = lazy(() => import("./pages/Settings"));
const PrintableQuestions = lazy(() => import("./pages/PrintableQuestions"));
const DuplicateDetector = lazy(() => import("./pages/DuplicateDetector"));
const StarterKitDownload = lazy(() => import("./pages/StarterKitDownload"));
const KeyPrinciples = lazy(() => import("./pages/KeyPrinciples"));
const RapidFacts = lazy(() => import("./pages/RapidFacts"));
const BossBattle = lazy(() => import("./pages/BossBattle"));
const APTests = lazy(() => import("./pages/APTests"));
const APStudy = lazy(() => import("./pages/APStudy"));
const Arcade = lazy(() => import("./pages/Arcade"));
const InstallApp = lazy(() => import("./pages/InstallApp"));
const FrenchCompetition = lazy(() => import("./pages/FrenchCompetition"));
const FrenchLightning = lazy(() => import("./pages/FrenchLightning"));
const FrenchSentenceUpgrade = lazy(() => import("./pages/FrenchSentenceUpgrade"));
const VocabTrainer = lazy(() => import("./pages/VocabTrainer"));
const EssayGrader = lazy(() => import("./pages/EssayGrader"));
const FRQPractice = lazy(() => import("./pages/FRQPractice"));
const WritingLab = lazy(() => import("./pages/WritingLab"));
const EnduranceRun = lazy(() => import("./pages/EnduranceRun"));
const StudyCoach = lazy(() => import("./pages/StudyCoach"));
const SkillGraph = lazy(() => import("./pages/SkillGraph"));
const ProExams = lazy(() => import("./pages/ProExams"));
const ProExamQuiz = lazy(() => import("./pages/ProExamQuiz"));
const DailyQuests = lazy(() => import("./pages/DailyQuests"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const ParentDashboard = lazy(() => import("./pages/ParentDashboard"));
const AdaptiveLearning = lazy(() => import("./pages/AdaptiveLearning"));
const JoinClass = lazy(() => import("./pages/JoinClass"));
const MyAssignments = lazy(() => import("./pages/MyAssignments"));
const SchoolAdmin = lazy(() => import("./pages/SchoolAdmin"));
const PersonalityAssessment = lazy(() => import("./pages/PersonalityAssessment"));
const CognitiveSkills = lazy(() => import("./pages/CognitiveSkills"));
const StrategyPractice = lazy(() => import("./pages/StrategyPractice"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ConversationPractice = lazy(() => import("./pages/ConversationPractice"));
const Portfolio = lazy(() => import("./pages/Portfolio"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <PWAUpdatePrompt />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Marketing / homepage preview (useful even when logged in) */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/math" element={<MathQuiz />} />
              <Route path="/english" element={<EnglishQuiz />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/study" element={<StudyMode />} />
              <Route path="/problems-by-topic" element={<ProblemsByTopic />} />
              <Route path="/daily" element={<DailyChallenge />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/battle" element={<BattleLobby />} />
              <Route path="/battle/:roomCode" element={<BattleRoom />} />
              <Route path="/practice-test" element={<PracticeTest />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/review" element={<Review />} />
              <Route path="/why-it-works" element={<WhyItWorks />} />
              <Route path="/mastery" element={<TopicMastery />} />
              <Route path="/elite-practice" element={<ElitePractice />} />
              <Route path="/rulebook" element={<Rulebook />} />
              <Route path="/demo" element={<DemoMode />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/printable-questions" element={<PrintableQuestions />} />
              <Route path="/duplicate-detector" element={<DuplicateDetector />} />
              <Route path="/starter-kit" element={<StarterKitDownload />} />
              <Route path="/key-principles" element={<KeyPrinciples />} />
              <Route path="/rapid-facts" element={<RapidFacts />} />
              <Route path="/boss-battle" element={<BossBattle />} />
              <Route path="/ap-tests" element={<APTests />} />
              <Route path="/ap-study/:subjectId" element={<APStudy />} />
              <Route path="/ap-frq/:subjectId" element={<FRQPractice />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/french-competition" element={<FrenchCompetition />} />
              <Route path="/french-lightning" element={<FrenchLightning />} />
              <Route path="/french-upgrade" element={<FrenchSentenceUpgrade />} />
              <Route path="/vocab" element={<VocabTrainer />} />
              <Route path="/essay-grader" element={<EssayGrader />} />
              <Route path="/writing-lab" element={<WritingLab />} />
              <Route path="/install" element={<InstallApp />} />
              <Route path="/endurance" element={<EnduranceRun />} />
              <Route path="/coach" element={<StudyCoach />} />
              <Route path="/skill-map" element={<SkillGraph />} />
              <Route path="/pro-exams" element={<ProExams />} />
              <Route path="/pro-exam/:examId" element={<ProExamQuiz />} />
              <Route path="/daily-quests" element={<DailyQuests />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/next-steps" element={<AdaptiveLearning />} />
              <Route path="/join-class" element={<JoinClass />} />
              <Route path="/my-assignments" element={<MyAssignments />} />
              <Route path="/school-admin" element={<SchoolAdmin />} />
              <Route path="/personality" element={<PersonalityAssessment />} />
              <Route path="/cognitive" element={<CognitiveSkills />} />
              <Route path="/strategy" element={<StrategyPractice />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/conversations" element={<ConversationPractice />} />
              <Route path="/portfolio" element={<Portfolio />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
