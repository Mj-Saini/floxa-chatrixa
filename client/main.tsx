import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import VideoCall from "./pages/VideoCall";
import LiveRooms from "./pages/LiveRooms";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="video-call" element={<VideoCall />} />
            <Route path="live-rooms" element={<LiveRooms />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="profile" element={<Profile />} />
            {/* Placeholder routes */}
            <Route path="stranger-chat" element={<VideoCall />} />
            <Route path="private-rooms" element={<LiveRooms />} />
            <Route path="group-chat" element={<LiveRooms />} />
            <Route path="leaderboard" element={<Profile />} />
            <Route path="refer" element={<Wallet />} />
            <Route path="settings" element={<Profile />} />
            <Route path="terms" element={<NotFound />} />
            <Route path="privacy" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
