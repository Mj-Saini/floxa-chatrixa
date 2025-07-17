import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import GenderSelection from "./pages/GenderSelection";
import GuestSetup from "./pages/GuestSetup";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoCall from "./pages/VideoCall";
import LiveRooms from "./pages/LiveRooms";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import Groups from "./pages/Groups";
import Calls from "./pages/Calls";
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
import Settings from "./pages/Settings";
import WithdrawMoney from "./pages/WithdrawMoney";
import ReferFriend from "./pages/ReferFriend";
import EarnMore from "./pages/EarnMore";
import AboutWallet from "./pages/AboutWallet";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gender-selection" element={<GenderSelection />} />
            <Route path="/guest-setup" element={<GuestSetup />} />
            {/* Top-level wallet route */}
            <Route path="/wallet" element={<ProtectedRoute guestAllowed={false}><Wallet /></ProtectedRoute>} />
            {/* Top-level settings route */}
            <Route path="/settings" element={<ProtectedRoute guestAllowed={false}><Settings /></ProtectedRoute>} />
            {/* Top-level membership route */}
            <Route path="/membership" element={<ProtectedRoute guestAllowed={false}><Membership /></ProtectedRoute>} />
            {/* Wallet sub-pages */}
            <Route path="/wallet/about" element={<ProtectedRoute guestAllowed={false}><AboutWallet /></ProtectedRoute>} />
            <Route path="/wallet/withdraw" element={<ProtectedRoute guestAllowed={false}><WithdrawMoney /></ProtectedRoute>} />
            <Route path="/wallet/refer" element={<ProtectedRoute guestAllowed={false}><ReferFriend /></ProtectedRoute>} />
            <Route path="/wallet/earn" element={<ProtectedRoute guestAllowed={false}><EarnMore /></ProtectedRoute>} />
            <Route
              path="/home"
              element={
                <ProtectedRoute guestAllowed={true}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <Index />
                  </ProtectedRoute>
                }
              />

              {/* Chat Pages - Guests allowed */}
              <Route
                path="chats"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Chats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="chat/:chatId"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <ChatInterface />
                  </ProtectedRoute>
                }
              />
              <Route
                path="groups"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Groups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-group"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <CreateGroup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="calls"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Calls />
                  </ProtectedRoute>
                }
              />

              {/* Guest Allowed Pages */}
              <Route
                path="video-call"
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <VideoCall />
                  </ProtectedRoute>
                }
              />
              <Route
                path="stranger-chat"
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <StrangerChat />
                  </ProtectedRoute>
                }
              />

              {/* Registered Users Only */}
              <Route
                path="live-rooms"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <LiveRooms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="wallet"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="membership"
                element={
                  <ProtectedRoute guestAllowed={false}>
                    <Membership />
                  </ProtectedRoute>
                }
              />

              {/* Footer pages */}
              <Route path="help" element={<Help />} />
              <Route path="contact" element={<Contact />} />
              <Route path="community" element={<Community />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="about" element={<About />} />
              <Route path="cookies" element={<Cookies />} />
              <Route
                path="status"
                element={<Navigate to="/home/chats" replace />}
              />

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
  </AuthProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
