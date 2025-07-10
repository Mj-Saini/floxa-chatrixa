import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import VideoCall from "./pages/VideoCall";
import LiveRooms from "./pages/LiveRooms";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import Groups from "./pages/Groups";
import Calls from "./pages/Calls";
import Status from "./pages/Status";
import StrangerChat from "./pages/StrangerChat";
import ChatInterface from "./pages/ChatInterface";
import CreateGroup from "./pages/CreateGroup";
import Membership from "./pages/Membership";
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

            {/* Chat Pages */}
            <Route path="chats" element={<Chats />} />
            <Route path="chat/:chatId" element={<ChatInterface />} />
            <Route path="groups" element={<Groups />} />
            <Route path="create-group" element={<CreateGroup />} />
            <Route path="calls" element={<Calls />} />
            <Route path="status" element={<Navigate to="/chats" replace />} />

            {/* Other main pages */}
            <Route path="video-call" element={<VideoCall />} />
            <Route path="live-rooms" element={<LiveRooms />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="profile" element={<Profile />} />
            <Route path="membership" element={<Membership />} />

            {/* Footer pages */}
            <Route path="help" element={<Help />} />
            <Route path="contact" element={<Contact />} />
            <Route path="community" element={<Community />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
            <Route path="cookies" element={<Cookies />} />

            {/* Stranger Chat */}
            <Route path="stranger-chat" element={<StrangerChat />} />

            {/* Placeholder routes */}
            <Route path="private-rooms" element={<LiveRooms />} />
            <Route path="group-chat" element={<LiveRooms />} />
            <Route path="leaderboard" element={<Profile />} />
            <Route path="refer" element={<Wallet />} />
            <Route path="settings" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
