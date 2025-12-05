import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import MathQuiz from "./pages/MathQuiz";
import EnglishQuiz from "./pages/EnglishQuiz";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Leaderboard from "./pages/Leaderboard";
import StudyMode from "./pages/StudyMode";
import DailyChallenge from "./pages/DailyChallenge";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import BattleLobby from "./pages/BattleLobby";
import BattleRoom from "./pages/BattleRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
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
            <Route path="/daily" element={<DailyChallenge />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/battle" element={<BattleLobby />} />
            <Route path="/battle/:roomCode" element={<BattleRoom />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
