import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">{children || <Outlet />}</main>
    </div>
  );
}
