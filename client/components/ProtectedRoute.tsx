import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  guestAllowed?: boolean;
  requiredAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  guestAllowed = false,
  requiredAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;
  const hasCompletedOnboarding =
    localStorage.getItem("userGender") && localStorage.getItem("userCountry");
  const isGuest = localStorage.getItem("userType") === "guest";
  const guestAllowedRoutes = ["/home", "/home/stranger-chat", "/home/video-call"];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  // Allow guest if guestAllowed is true
  if (requiredAuth && !isAuthenticated && !(guestAllowed && isGuest)) {
    return <Navigate to="/login" replace />;
  }

  // If guest is trying to access a route not allowed for guests, redirect to /home
  if (isGuest && !guestAllowedRoutes.includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  // If user is authenticated but hasn't completed onboarding
  if (isAuthenticated && !hasCompletedOnboarding) {
    // Only redirect to gender selection if they're not already there
    if (location.pathname !== "/gender-selection") {
      return <Navigate to="/gender-selection" replace />;
    }
  }

  // If route doesn't allow guests but user is not authenticated (guest)
  if (!guestAllowed && !isAuthenticated && isGuest) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-muted-foreground mb-6">
            This feature is only available for registered users.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
