import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isChatInterface = location.pathname.startsWith("/chat/");
  const isStrangerChat = location.pathname === "/home/stranger-chat";
  const showFooter = isHomepage;
  const showBottomNav = !isHomepage && !isChatInterface && !isStrangerChat;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        className={` flex-1`}
      >
        {children || <Outlet />}
      </main>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
