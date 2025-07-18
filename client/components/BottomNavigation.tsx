import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Video, Users, Bell, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function BottomNavigation() {
  const location = useLocation();
  const isGroupChat = /^\/home\/groups\/chat\/[^/]+$/.test(location.pathname);
  const userType = localStorage.getItem("userType");
  const [chatPopoverOpen, setChatPopoverOpen] = React.useState(false);

  const handleChatOption = (type: "text" | "video") => {
    setChatPopoverOpen(false);
    if (type === "text") {
      window.location.href = "/home/stranger-chat";
    } else {
      window.location.href = "/home/video-call";
    }
  };

  const allNavItems = [
    { href: "/home", label: "Home", icon: MessageCircle },
    {
      href: "/home/stranger-chat",
      label: "Chat",
      icon: MessageCircle,
      guestAllowed: true,
      isChatCombo: true,
    },
    {
      href: "/home/chats",
      label: "Messages",
      icon: Users,
      badge: 3,
      guestAllowed: false,
    },
    {
      href: "/home/groups",
      label: "Groups",
      icon: Users,
      guestAllowed: false,
    },
    {
      href: "/home/calls",
      label: "Calls",
      icon: Phone,
      guestAllowed: false,
    },
  ];

  const navItems =
    userType === "guest"
      ? allNavItems.filter((item) => item.guestAllowed)
      : allNavItems;

  return (

    <>
      {!isGroupChat &&
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50">
          <nav className="flex items-center justify-around px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.href === "/home" && location.pathname === "/home");

              if (item.isChatCombo) {
                return (
                  <Popover key={item.href} open={chatPopoverOpen} onOpenChange={setChatPopoverOpen}>
                    <PopoverTrigger asChild>
                      <div className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-colors relative cursor-pointer">
                        <div className="relative">
                          <Icon
                            className={cn(
                              "h-6 w-6 transition-colors",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          />
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
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-40 p-2">
                      <button
                        className="w-full px-3 py-2 rounded hover:bg-muted/50 text-left text-sm"
                        onClick={() => handleChatOption("text")}
                      >
                        Text Chat
                      </button>
                      <button
                        className="w-full px-3 py-2 rounded hover:bg-muted/50 text-left text-sm mt-1"
                        onClick={() => handleChatOption("video")}
                      >
                        Video Chat
                      </button>
                    </PopoverContent>
                  </Popover>
                );
              }

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
                        <Badge className="absolute -top-2 flex items-center justify-center -right-2 h-5 w-5 p-0 text-xs bg-destructive hover:bg-destructive">
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
        </div>}
    </>
  );
}
