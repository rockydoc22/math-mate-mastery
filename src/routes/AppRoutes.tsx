import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "@/components/LandingPage";
import { GlobalFeedbackFAB } from "@/components/GlobalFeedbackFAB";
import WhatNowFAB from "@/components/global/WhatNowFAB";
import GlobalStatsBar from "@/components/global/GlobalStatsBar";

// Core pages loaded eagerly (Home + Auth are always needed)
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";

// Everything else lazy-loaded for code splitting
const Quiz = lazy(() => import("@/pages/Quiz"));
const MathQuiz = lazy(() => import("@/pages/MathQuiz"));
const EnglishQuiz = lazy(() => import("@/pages/EnglishQuiz"));
const Admin = lazy(() => import("@/pages/Admin"));
const AdminSeedQuestions = lazy(() => import("@/pages/AdminSeedQuestions"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const StudyMode = lazy(() => import("@/pages/StudyMode"));
const ProblemsByTopic = lazy(() => import("@/pages/ProblemsByTopic"));
const DailyChallenge = lazy(() => import("@/pages/DailyChallenge"));
const Profile = lazy(() => import("@/pages/Profile"));
const Friends = lazy(() => import("@/pages/Friends"));
const BattleLobby = lazy(() => import("@/pages/BattleLobby"));
const BattleRoom = lazy(() => import("@/pages/BattleRoom"));
const PracticeTest = lazy(() => import("@/pages/PracticeTest"));
const Insights = lazy(() => import("@/pages/Insights"));
const Review = lazy(() => import("@/pages/Review"));
const WhyItWorks = lazy(() => import("@/pages/WhyItWorks"));
const TopicMastery = lazy(() => import("@/pages/TopicMastery"));
const ElitePractice = lazy(() => import("@/pages/ElitePractice"));
const Rulebook = lazy(() => import("@/pages/Rulebook"));
const DemoMode = lazy(() => import("@/pages/DemoMode"));
const Settings = lazy(() => import("@/pages/Settings"));
const PrintableQuestions = lazy(() => import("@/pages/PrintableQuestions"));
const DuplicateDetector = lazy(() => import("@/pages/DuplicateDetector"));
const StarterKitDownload = lazy(() => import("@/pages/StarterKitDownload"));
const KeyPrinciples = lazy(() => import("@/pages/KeyPrinciples"));
const RapidFacts = lazy(() => import("@/pages/RapidFacts"));
const BossBattle = lazy(() => import("@/pages/BossBattle"));
const APTests = lazy(() => import("@/pages/APTests"));
const APStudy = lazy(() => import("@/pages/APStudy"));
const Arcade = lazy(() => import("@/pages/Arcade"));
const InstallApp = lazy(() => import("@/pages/InstallApp"));
const FrenchCompetition = lazy(() => import("@/pages/FrenchCompetition"));
const FrenchLightning = lazy(() => import("@/pages/FrenchLightning"));
const FrenchSentenceUpgrade = lazy(() => import("@/pages/FrenchSentenceUpgrade"));
const VocabTrainer = lazy(() => import("@/pages/VocabTrainer"));
const EssayGrader = lazy(() => import("@/pages/EssayGrader"));
const FRQPractice = lazy(() => import("@/pages/FRQPractice"));
const WritingLab = lazy(() => import("@/pages/WritingLab"));
const EnduranceRun = lazy(() => import("@/pages/EnduranceRun"));
const StudyCoach = lazy(() => import("@/pages/StudyCoach"));
const SkillGraph = lazy(() => import("@/pages/SkillGraph"));
const ProExams = lazy(() => import("@/pages/ProExams"));
const ProExamQuiz = lazy(() => import("@/pages/ProExamQuiz"));
const DailyQuests = lazy(() => import("@/pages/DailyQuests"));
const TeacherDashboard = lazy(() => import("@/pages/TeacherDashboard"));
const ParentDashboard = lazy(() => import("@/pages/ParentDashboard"));
const AdaptiveLearning = lazy(() => import("@/pages/AdaptiveLearning"));
const JoinClass = lazy(() => import("@/pages/JoinClass"));
const MyAssignments = lazy(() => import("@/pages/MyAssignments"));
const SchoolAdmin = lazy(() => import("@/pages/SchoolAdmin"));
const PersonalityAssessment = lazy(() => import("@/pages/PersonalityAssessment"));
const CognitiveSkills = lazy(() => import("@/pages/CognitiveSkills"));
const IQTest = lazy(() => import("@/pages/IQTest"));
const HealthScreening = lazy(() => import("@/pages/HealthScreening"));
const StrategyPractice = lazy(() => import("@/pages/StrategyPractice"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const ConversationPractice = lazy(() => import("@/pages/ConversationPractice"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const CoinShop = lazy(() => import("@/pages/CoinShop"));
const StudyTimer = lazy(() => import("@/pages/StudyTimer"));
const Flashcards = lazy(() => import("@/pages/Flashcards"));
const StudyGroups = lazy(() => import("@/pages/StudyGroups"));
const StreakCalendar = lazy(() => import("@/pages/StreakCalendar"));
const WeeklyGoals = lazy(() => import("@/pages/WeeklyGoals"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const MistakeJournal = lazy(() => import("@/pages/MistakeJournal"));
const ProgressReport = lazy(() => import("@/pages/ProgressReport"));
const QuickReview = lazy(() => import("@/pages/QuickReview"));
const ScorePredictor = lazy(() => import("@/pages/ScorePredictor"));
const StudyPlanner = lazy(() => import("@/pages/StudyPlanner"));
const CheatSheet = lazy(() => import("@/pages/CheatSheet"));
const SpeedDrill = lazy(() => import("@/pages/SpeedDrill"));
const TestDayTips = lazy(() => import("@/pages/TestDayTips"));
const FriendCompare = lazy(() => import("@/pages/FriendCompare"));
const ConceptExplainer = lazy(() => import("@/pages/ConceptExplainer"));
const PracticeLog = lazy(() => import("@/pages/PracticeLog"));
const WordOfTheDay = lazy(() => import("@/pages/WordOfTheDay"));
const MathTricks = lazy(() => import("@/pages/MathTricks"));
const ProExamFRQ = lazy(() => import("@/pages/ProExamFRQ"));
const ProExamStudyGuide = lazy(() => import("@/pages/ProExamStudyGuide"));
const ProExamScoreTracker = lazy(() => import("@/pages/ProExamScoreTracker"));
const LogicGames = lazy(() => import("@/pages/LogicGames"));
const ExamSimulator = lazy(() => import("@/pages/ExamSimulator"));
const AITutorChat = lazy(() => import("@/pages/AITutorChat"));
const Competitions = lazy(() => import("@/pages/Competitions"));
const LanguageCompetition = lazy(() => import("@/pages/LanguageCompetition"));
const DebatePractice = lazy(() => import("@/pages/DebatePractice"));
const AnatomyAtlas = lazy(() => import("@/pages/AnatomyAtlas"));
const CompetitionHub = lazy(() => import("@/pages/CompetitionHub"));
const AlternativeAssessments = lazy(() => import("@/pages/AlternativeAssessments"));
const StrategyGameModes = lazy(() => import("@/pages/StrategyGameModes"));
const TimedModes = lazy(() => import("@/pages/TimedModes"));
const ReviewAnalytics = lazy(() => import("@/pages/ReviewAnalytics"));
const HomeworkSolver = lazy(() => import("@/pages/HomeworkSolver"));
const ThinkPath = lazy(() => import("@/pages/ThinkPath"));
const IQPersonalityHub = lazy(() => import("@/pages/IQPersonalityHub"));
const SentenceCompletion = lazy(() => import("@/pages/SentenceCompletion"));
const PersonalityMBTI = lazy(() => import("@/pages/PersonalityMBTI"));
const PersonalityDISC = lazy(() => import("@/pages/PersonalityDISC"));
const PersonalityEnneagram = lazy(() => import("@/pages/PersonalityEnneagram"));
const PersonalityStrengths = lazy(() => import("@/pages/PersonalityStrengths"));
const HighSchoolExams = lazy(() => import("@/pages/HighSchoolExams"));
const K12Exams = lazy(() => import("@/pages/K12Exams"));
const K12ExamQuiz = lazy(() => import("@/pages/K12ExamQuiz"));
const K12DailyChallenge = lazy(() => import("@/pages/K12DailyChallenge"));
const K12AdaptiveTutor = lazy(() => import("@/pages/K12AdaptiveTutor"));
const SurvivalModePage = lazy(() => import("@/pages/SurvivalModePage"));
const PracticeTools = lazy(() => import("@/pages/PracticeTools"));
const StoryMissions = lazy(() => import("@/pages/StoryMissions"));
const BoosterTest = lazy(() => import("@/pages/BoosterTest"));
const PersonalStudyGuide = lazy(() => import("@/pages/PersonalStudyGuide"));
const AdaptiveDashboard = lazy(() => import("@/pages/AdaptiveDashboard"));
const WeaknessRetest = lazy(() => import("@/pages/WeaknessRetest"));
const TestCatalog = lazy(() => import("@/pages/TestCatalog"));
const AopsPrealgebraQuiz = lazy(() => import("@/pages/AopsPrealgebraQuiz"));
const AlphaPath = lazy(() => import("@/pages/AlphaPath"));
const ReviewQueue = lazy(() => import("@/pages/ReviewQueue"));
const FamilyHub = lazy(() => import("@/pages/FamilyHub"));
const InternationalTests = lazy(() => import("@/pages/InternationalTests"));
const InterpretationLab = lazy(() => import("@/pages/InterpretationLab"));
const IntlSampleQuiz = lazy(() => import("@/pages/IntlSampleQuiz"));
const OfflinePractice = lazy(() => import("@/pages/OfflinePractice"));
const Warmup = lazy(() => import("@/pages/Warmup"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Support = lazy(() => import("@/pages/Support"));

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/math" element={<MathQuiz />} />
      <Route path="/english" element={<EnglishQuiz />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/seed-questions" element={<ProtectedRoute><AdminSeedQuestions /></ProtectedRoute>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
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
      <Route path="/printable-questions" element={<ProtectedRoute><PrintableQuestions /></ProtectedRoute>} />
      <Route path="/duplicate-detector" element={<ProtectedRoute><DuplicateDetector /></ProtectedRoute>} />
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
      <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/next-steps" element={<AdaptiveLearning />} />
      <Route path="/join-class" element={<JoinClass />} />
      <Route path="/my-assignments" element={<MyAssignments />} />
      <Route path="/school-admin" element={<ProtectedRoute><SchoolAdmin /></ProtectedRoute>} />
      <Route path="/personality" element={<PersonalityAssessment />} />
      <Route path="/cognitive" element={<CognitiveSkills />} />
      <Route path="/iq-test" element={<IQTest />} />
      <Route path="/health-screening" element={<HealthScreening />} />
      <Route path="/strategy" element={<StrategyPractice />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/conversations" element={<ConversationPractice />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/shop" element={<CoinShop />} />
      <Route path="/timer" element={<StudyTimer />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/study-groups" element={<StudyGroups />} />
      <Route path="/streak-calendar" element={<StreakCalendar />} />
      <Route path="/weekly-goals" element={<WeeklyGoals />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/mistake-journal" element={<MistakeJournal />} />
      <Route path="/progress-report" element={<ProgressReport />} />
      <Route path="/quick-review" element={<QuickReview />} />
      <Route path="/score-predictor" element={<ScorePredictor />} />
      <Route path="/study-planner" element={<StudyPlanner />} />
      <Route path="/cheat-sheet" element={<CheatSheet />} />
      <Route path="/speed-drill" element={<SpeedDrill />} />
      <Route path="/test-day-tips" element={<TestDayTips />} />
      <Route path="/friend-compare" element={<FriendCompare />} />
      <Route path="/concepts" element={<ConceptExplainer />} />
      <Route path="/practice-log" element={<PracticeLog />} />
      <Route path="/word-of-day" element={<WordOfTheDay />} />
      <Route path="/math-tricks" element={<MathTricks />} />
      <Route path="/pro-exam-frq/:examId" element={<ProExamFRQ />} />
      <Route path="/pro-exam-study/:examId" element={<ProExamStudyGuide />} />
      <Route path="/pro-exam-scores" element={<ProExamScoreTracker />} />
      <Route path="/logic-games" element={<LogicGames />} />
      <Route path="/exam-simulator" element={<ExamSimulator />} />
      <Route path="/ai-tutor" element={<AITutorChat />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/competition/:langId" element={<LanguageCompetition />} />
      <Route path="/debate" element={<DebatePractice />} />
      <Route path="/anatomy-atlas" element={<AnatomyAtlas />} />
      <Route path="/competition-hub/:competitionId" element={<CompetitionHub />} />
      <Route path="/alt-assessments" element={<AlternativeAssessments />} />
      <Route path="/strategy-games" element={<StrategyGameModes />} />
      <Route path="/timed-modes" element={<TimedModes />} />
      <Route path="/review-analytics" element={<ReviewAnalytics />} />
      <Route path="/homework-solver" element={<HomeworkSolver />} />
      <Route path="/thinkpath" element={<ThinkPath />} />
      <Route path="/iq-personality" element={<IQPersonalityHub />} />
      <Route path="/sentence-completion" element={<SentenceCompletion />} />
      <Route path="/personality-mbti" element={<PersonalityMBTI />} />
      <Route path="/personality-disc" element={<PersonalityDISC />} />
      <Route path="/personality-enneagram" element={<PersonalityEnneagram />} />
      <Route path="/personality-strengths" element={<PersonalityStrengths />} />
      <Route path="/high-school-exams" element={<HighSchoolExams />} />
      <Route path="/k12-exams" element={<K12Exams />} />
      <Route path="/k12-exam/:examId" element={<K12ExamQuiz />} />
      <Route path="/k12-daily" element={<K12DailyChallenge />} />
      <Route path="/survival" element={<SurvivalModePage />} />
      <Route path="/k12-tutor/:examId" element={<K12AdaptiveTutor />} />
      <Route path="/practice-tools" element={<PracticeTools />} />
      <Route path="/story-missions" element={<StoryMissions />} />
      <Route path="/booster" element={<ProtectedRoute><BoosterTest /></ProtectedRoute>} />
      <Route path="/study-guide" element={<ProtectedRoute><PersonalStudyGuide /></ProtectedRoute>} />
      <Route path="/adaptive" element={<ProtectedRoute><AdaptiveDashboard /></ProtectedRoute>} />
      <Route path="/weakness-retest" element={<ProtectedRoute><WeaknessRetest /></ProtectedRoute>} />
      <Route path="/tests" element={<TestCatalog />} />
      <Route path="/search" element={<TestCatalog />} />
      <Route path="/path" element={<AlphaPath />} />
      <Route path="/start" element={<AlphaPath />} />
      <Route path="/review-queue" element={<ReviewQueue />} />
      <Route path="/aops-prealgebra" element={<AopsPrealgebraQuiz />} />
      <Route path="/family" element={<FamilyHub />} />
      <Route path="/international" element={<InternationalTests />} />
      <Route path="/international/:examId" element={<IntlSampleQuiz />} />
      <Route path="/interpretation" element={<InterpretationLab />} />
      <Route path="/offline" element={<OfflinePractice />} />
      <Route path="/warmup" element={<Warmup />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/support" element={<Support />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <GlobalFeedbackFAB />
    <WhatNowFAB />
    <GlobalStatsBar />
  </>
);

export default AppRoutes;
