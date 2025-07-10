import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatTabs from "@/components/ChatTabs";
import ChatList from "@/components/ChatList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Plus,
  Settings,
  Crown,
  Shield,
  Lock,
  Globe,
} from "lucide-react";

export default function Groups() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [createdGroups, setCreatedGroups] = useState<any[]>([]);

  // Load created groups from localStorage
  useEffect(() => {
    const groups = JSON.parse(localStorage.getItem("createdGroups") || "[]");
    setCreatedGroups(groups);
  }, []);

  const myGroups = [
    {
      id: "1",
      name: "Tech Team",
      avatar: "",
      lastMessage: "The new update looks great! 🚀",
      timestamp: "2024-01-15T09:45:00Z",
      unreadCount: 12,
      isOnline: false,
      messageType: "text" as const,
      isTyping: true,
      isPinned: false,
      isMuted: false,
      isRead: false,
      isGroup: true,
      lastSender: "Mike",
      memberCount: 24,
      role: "admin",
    },
    {
      id: "2",
      name: "Family Group",
      avatar: "",
      lastMessage: "Don't forget about dinner tomorrow!",
      timestamp: "2024-01-14T20:45:00Z",
      unreadCount: 5,
      isOnline: false,
      messageType: "text" as const,
      isTyping: false,
      isPinned: true,
      isMuted: false,
      isRead: false,
      isGroup: true,
      lastSender: "Mom",
      memberCount: 8,
      role: "member",
    },
    {
      id: "3",
      name: "Design Squad",
      avatar: "",
      lastMessage: "Check out this new mockup",
      timestamp: "2024-01-15T07:15:00Z",
      unreadCount: 0,
      isOnline: false,
      messageType: "image" as const,
      isTyping: false,
      isPinned: false,
      isMuted: true,
      isRead: true,
      isGroup: true,
      lastSender: "Emma",
      memberCount: 15,
      role: "moderator",
    },
    {
      id: "4",
      name: "Book Club",
      avatar: "",
      lastMessage: "What did everyone think of chapter 5?",
      timestamp: "2024-01-14T16:10:00Z",
      unreadCount: 2,
      isOnline: false,
      messageType: "text" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: false,
      isGroup: true,
      lastSender: "David",
      memberCount: 45,
      role: "member",
    },
  ];

  const publicGroups = [
    {
      id: "p1",
      name: "React Developers",
      description: "Discuss React, Next.js, and modern web development",
      members: 2450,
      category: "Technology",
      isVerified: true,
    },
    {
      id: "p2",
      name: "Photography Hub",
      description: "Share your best shots and photography tips",
      members: 1820,
      category: "Arts",
      isVerified: false,
    },
    {
      id: "p3",
      name: "Fitness Motivation",
      description: "Stay motivated and share your fitness journey",
      members: 3100,
      category: "Health",
      isVerified: true,
    },
    {
      id: "p4",
      name: "Gaming Community",
      description: "Discuss latest games and find gaming partners",
      members: 5200,
      category: "Gaming",
      isVerified: true,
    },
  ];

  const enhancedGroups = myGroups.map((group) => ({
    ...group,
    isGroup: true,
  }));

  const filteredGroups = enhancedGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleGroupClick = (groupId: string) => {
    console.log("Open group:", groupId);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case "moderator":
        return <Shield className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <ChatTabs>
      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 bg-background border-b border-border/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-none focus:bg-background"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 space-y-3 border-b border-border/30">
          <div className="flex space-x-3">
            <Button
              className="flex-1"
              size="sm"
              onClick={() => navigate("/create-group")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Browse Public
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* My Groups Section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">My Groups</h2>
              <Badge variant="secondary">{myGroups.length}</Badge>
            </div>

            <div className="space-y-1">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center p-3 hover:bg-muted/30 cursor-pointer rounded-lg transition-colors"
                  onClick={() => handleGroupClick(group.id)}
                >
                  {/* Avatar */}
                  <div className="relative mr-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.avatar} alt={group.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white font-semibold">
                        {group.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Group Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium truncate">{group.name}</h3>
                        {getRoleIcon(group.role)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {group.memberCount} members
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {group.lastSender && (
                          <span className="text-primary">
                            {group.lastSender}:{" "}
                          </span>
                        )}
                        {group.lastMessage}
                      </p>
                      {group.unreadCount > 0 && (
                        <Badge
                          variant="default"
                          className="ml-2 h-5 w-5 p-0 text-xs bg-primary rounded-full"
                        >
                          {group.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discover Section */}
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Discover Groups</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {publicGroups.map((group) => (
                <Card
                  key={group.id}
                  className="bg-card/50 hover:bg-card/70 cursor-pointer transition-colors border-border/30"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium truncate">
                        {group.name}
                      </CardTitle>
                      {group.isVerified && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-blue-500/20 text-blue-400"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{group.members.toLocaleString()}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {group.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChatTabs>
  );
}
