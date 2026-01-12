import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { usePWAUpdate } from "@/hooks/usePWAUpdate";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import MathQuiz from "./pages/MathQuiz";
import EnglishQuiz from "./pages/EnglishQuiz";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Leaderboard from "./pages/Leaderboard";
import StudyMode from "./pages/StudyMode";
import ProblemsByTopic from "./pages/ProblemsByTopic";
import DailyChallenge from "./pages/DailyChallenge";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import BattleLobby from "./pages/BattleLobby";
import BattleRoom from "./pages/BattleRoom";
import PracticeTest from "./pages/PracticeTest";
import Insights from "./pages/Insights";
import Review from "./pages/Review";
import WhyItWorks from "./pages/WhyItWorks";
import TopicMastery from "./pages/TopicMastery";
import ElitePractice from "./pages/ElitePractice";
import Rulebook from "./pages/Rulebook";
import NotFound from "./pages/NotFound";
import DemoMode from "./pages/DemoMode";

const queryClient = new QueryClient();

const PWAUpdater = () => {
  usePWAUpdate();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <PWAUpdater />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
