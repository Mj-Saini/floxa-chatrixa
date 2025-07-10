import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const showFooter = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-16 flex-1">{children || <Outlet />}</main>
      {showFooter && <Footer />}
    </div>
  );
}
