import React from "react";
import { Navigate } from "react-router-dom";

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
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType");
  const hasCompletedOnboarding =
    localStorage.getItem("userGender") && localStorage.getItem("userCountry");

  // If authentication is required but user is not authenticated
  if (requiredAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated but hasn't completed onboarding
  if (isAuthenticated && !hasCompletedOnboarding) {
    return <Navigate to="/gender-selection" replace />;
  }

  // If route doesn't allow guests but user is a guest
  if (!guestAllowed && userType === "guest") {
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
