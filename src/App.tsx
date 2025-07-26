
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AgeProvider } from "./context/AgeContext";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Pictures from "./pages/Pictures";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Health from "./pages/Health";
import Stories from "./pages/Stories";
import Arts from "./pages/Arts";
import Language from "./pages/Language";
import Riddles from "./pages/Riddles";
import PictureComposition from "./pages/PictureComposition";
import Music from "./pages/Music";
import ParentsZone from "./pages/ParentsZone";
import PictureHunt from "./pages/PictureHunt";
import MysteryImage from "./pages/MysteryImage";
import TenClue from "./pages/TenClue";
import VisualIQ from "./pages/VisualIQ";
import Puzzle from "./pages/Puzzle";
import Activities from "./pages/Activities";
import KidsNews from "./pages/KidsNews";
import YoungTalents from "./pages/YoungTalents";
import EarlyLearning from "./pages/EarlyLearning";
import EarlyParenting from "./pages/EarlyParenting";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import KidsStore from "./pages/KidsStore";
import TreasureHunt from "./pages/TreasureHunt";
import LocalEvents from "./pages/LocalEvents";
import ShapePatternMatching from "./pages/ShapePatternMatching";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import Dictionary from "./pages/Dictionary";
import Translator from "./pages/Translator";
import SocialSkills from "./pages/SocialSkills";
import ReadingPractice from "./pages/ReadingPractice";
import IntroCoding from "./pages/IntroCoding";
import CodingLesson from "./pages/coding/CodingLesson";
import CodingChallenge from "./pages/coding/CodingChallenge";
import Donate from "./pages/Donate";
import PositiveActions from "./pages/PositiveActions";
import FeelingsEmotions from "./pages/FeelingsEmotions";
import ColorShapeSorting from "./pages/ColorShapeSorting";
import RhymingGames from "./pages/RhymingGames";
import StoryCompletion from "./pages/StoryCompletion";
import SafetyAwareness from "./pages/SafetyAwareness";
import CareerDiscovery from "./pages/CareerDiscovery";
import Entrepreneurship from "./pages/Entrepreneurship";
import AdvancedMath from "./pages/AdvancedMath";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AgeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/early-learning" element={<EarlyLearning />} />
            <Route path="/early-parenting" element={<EarlyParenting />} />
            <Route path="/health" element={<Health />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/language" element={<Language />} />
            <Route path="/pictures" element={<Pictures />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/music" element={<Music />} />
            <Route path="/riddles" element={<Riddles />} />
            <Route path="/picture-composition" element={<PictureComposition />} />
            <Route path="/picture-hunt" element={<PictureHunt />} />
            <Route path="/mystery-image" element={<MysteryImage />} />
            <Route path="/ten-clue" element={<TenClue />} />
            <Route path="/visual-iq" element={<VisualIQ />} />
            <Route path="/treasure-hunt" element={<TreasureHunt />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/kids-store" element={<KidsStore />} />
            <Route path="/kids-news" element={<KidsNews />} />
            <Route path="/young-talents" element={<YoungTalents />} />
            <Route path="/local-events" element={<LocalEvents />} />
            <Route path="/shapes" element={<ShapePatternMatching />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/social-skills" element={<SocialSkills />} />
            <Route path="/reading-practice" element={<ReadingPractice />} />
            <Route path="/coding" element={<IntroCoding />} />
            <Route path="/coding/lesson/:lessonId" element={<CodingLesson />} />
            <Route path="/coding/challenge/:challengeId" element={<CodingChallenge />} />
            <Route path="/positive-actions" element={<PositiveActions />} />
            <Route path="/feelings-emotions" element={<FeelingsEmotions />} />
            <Route path="/color-shape-sorting" element={<ColorShapeSorting />} />
            <Route path="/rhyming-games" element={<RhymingGames />} />
            <Route path="/story-completion" element={<StoryCompletion />} />
            <Route path="/safety-awareness" element={<SafetyAwareness />} />
            <Route path="/career-discovery" element={<CareerDiscovery />} />
            <Route path="/entrepreneurship" element={<Entrepreneurship />} />
            <Route path="/advanced-math" element={<AdvancedMath />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/parents-zone" element={<ParentsZone />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AgeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
