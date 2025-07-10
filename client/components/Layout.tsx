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
  const showFooter = isHomepage;
  const showBottomNav = !isHomepage && !isChatInterface;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        className={`${isChatInterface ? "pt-0" : "pt-16"} flex-1 ${showBottomNav ? "pb-20" : ""}`}
      >
        {children || <Outlet />}
      </main>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
