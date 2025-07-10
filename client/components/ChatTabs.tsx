import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "./BackButton";
import {
  MessageCircle,
  Users,
  Phone,
  Video,
  Settings,
  Search,
  Edit,
  Plus,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatTabsProps {
  children: React.ReactNode;
}

export default function ChatTabs({ children }: ChatTabsProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chats");

  const tabs = [
    {
      id: "chats",
      label: "Chats",
      icon: MessageCircle,
      count: 12,
      href: "/chats",
    },
    {
      id: "groups",
      label: "Groups",
      icon: Users,
      count: 3,
      href: "/groups",
    },
    {
      id: "calls",
      label: "Calls",
      icon: Phone,
      count: 0,
      href: "/calls",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border/50">
        <div className="flex items-center space-x-3">
          <BackButton showText={false} />
          <h1 className="text-2xl font-bold">cHaTRiXa</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between bg-background border-b border-border/30">
        <div className="flex items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.includes(tab.href.slice(1));
            return (
              <Link key={tab.id} to={tab.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex items-center space-x-2 px-4 py-3 rounded-none border-b-2 border-transparent",
                    isActive
                      ? "border-primary text-primary bg-primary/5"
                      : "hover:bg-muted/50",
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                  {tab.count > 0 && (
                    <Badge
                      variant="default"
                      className="ml-1 h-5 w-5 p-0 text-xs bg-primary hover:bg-primary"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Floating Action Button */}
        <div className="p-4">
          <Button
            size="sm"
            className="rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
