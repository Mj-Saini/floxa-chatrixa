import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
  showText?: boolean;
}

export default function BackButton({
  className = "",
  variant = "ghost",
  showText = true,
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleBack}
      className={`flex items-center space-x-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {showText && <span>Back</span>}
    </Button>
  );
}
