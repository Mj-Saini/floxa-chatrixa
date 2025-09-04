import React from "react";
import BackButton from "./BackButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  showBackButton = true,
  children,
}: PageHeaderProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center space-x-4">
          {showBackButton && <BackButton />}
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {children && (
          <div className="flex items-center space-x-2">{children}</div>
        )}
      </div>
   </div>
  );
}
