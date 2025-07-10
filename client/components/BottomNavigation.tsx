import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Video, Users, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { href: "/home", label: "Home", icon: MessageCircle },
    { href: "/home/stranger-chat", label: "Chat", icon: MessageCircle },
    { href: "/home/video-call", label: "Video", icon: Video },
    { href: "/home/chats", label: "Messages", icon: Users, badge: 3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50">
      <nav className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.href === "/home" && location.pathname === "/home");

          return (
            <Link key={item.href} to={item.href}>
              <div className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-colors relative">
                <div className="relative">
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-destructive hover:bg-destructive">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
