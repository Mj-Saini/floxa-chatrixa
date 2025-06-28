import React, { useState } from "react";
import ChatTabs from "@/components/ChatTabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Eye,
  Camera,
  Image,
  Mic,
  Type,
  Heart,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusUpdate {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: {
    type: "text" | "image" | "video";
    text?: string;
    media?: string;
    backgroundColor?: string;
  };
  timestamp: string;
  views: number;
  isViewed: boolean;
  isMine: boolean;
}

export default function Status() {
  const [searchQuery, setSearchQuery] = useState("");

  const myStatus = {
    id: "my-status",
    hasUpdate: true,
    lastUpdate: "2024-01-15T08:30:00Z",
    viewCount: 12,
  };

  const statusUpdates: StatusUpdate[] = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "",
      },
      content: {
        type: "image",
        text: "Beautiful sunset today! 🌅",
        media: "",
      },
      timestamp: "2024-01-15T10:30:00Z",
      views: 45,
      isViewed: false,
      isMine: false,
    },
    {
      id: "2",
      user: {
        name: "Alex Rodriguez",
        avatar: "",
      },
      content: {
        type: "text",
        text: "Just finished my morning workout! 💪",
        backgroundColor: "from-purple-500 to-pink-500",
      },
      timestamp: "2024-01-15T09:15:00Z",
      views: 23,
      isViewed: true,
      isMine: false,
    },
    {
      id: "3",
      user: {
        name: "Lisa Chen",
        avatar: "",
      },
      content: {
        type: "image",
        text: "New coffee shop discovery ☕",
        media: "",
      },
      timestamp: "2024-01-15T08:45:00Z",
      views: 67,
      isViewed: false,
      isMine: false,
    },
    {
      id: "4",
      user: {
        name: "Tech Team",
        avatar: "",
      },
      content: {
        type: "text",
        text: "Deployment successful! 🚀",
        backgroundColor: "from-green-500 to-blue-500",
      },
      timestamp: "2024-01-15T07:20:00Z",
      views: 156,
      isViewed: true,
      isMine: false,
    },
    {
      id: "5",
      user: {
        name: "John Smith",
        avatar: "",
      },
      content: {
        type: "video",
        text: "Weekend hiking adventure",
        media: "",
      },
      timestamp: "2024-01-14T20:30:00Z",
      views: 89,
      isViewed: false,
      isMine: false,
    },
  ];

  const filteredStatuses = statusUpdates.filter((status) =>
    status.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const statusTime = new Date(timestamp);
    const diffInHours = (now.getTime() - statusTime.getTime()) / (1000 * 3600);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const handleStatusClick = (statusId: string) => {
    console.log("View status:", statusId);
  };

  const handleAddStatus = () => {
    console.log("Add status");
  };

  return (
    <ChatTabs>
      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 bg-background border-b border-border/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search status updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-none focus:bg-background"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* My Status */}
          <div className="p-4 border-b border-border/30">
            <h2 className="text-lg font-semibold mb-3">My Status</h2>
            <div
              className="flex items-center p-3 hover:bg-muted/30 cursor-pointer rounded-lg transition-colors"
              onClick={handleAddStatus}
            >
              <div className="relative mr-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="" alt="My Status" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink text-white font-semibold text-lg">
                    ME
                  </AvatarFallback>
                </Avatar>
                {myStatus.hasUpdate ? (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary border-2 border-background rounded-full flex items-center justify-center">
                    <Eye className="h-3 w-3 text-white" />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-background rounded-full flex items-center justify-center">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">
                  {myStatus.hasUpdate ? "My Status" : "Add Status"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {myStatus.hasUpdate
                    ? `${formatTime(myStatus.lastUpdate)} • ${myStatus.viewCount} views`
                    : "Tap to add status update"}
                </p>
              </div>

              {!myStatus.hasUpdate && (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Type className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Updates</h2>
              <Badge variant="secondary">{filteredStatuses.length}</Badge>
            </div>

            {filteredStatuses.length > 0 ? (
              <div className="space-y-1">
                {filteredStatuses.map((status) => (
                  <div
                    key={status.id}
                    className="flex items-center p-3 hover:bg-muted/30 cursor-pointer rounded-lg transition-colors"
                    onClick={() => handleStatusClick(status.id)}
                  >
                    {/* Avatar with ring */}
                    <div className="relative mr-3">
                      <div
                        className={cn(
                          "p-0.5 rounded-full",
                          status.isViewed
                            ? "bg-gray-300"
                            : "bg-gradient-to-r from-purple-500 to-pink-500",
                        )}
                      >
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarImage
                            src={status.user.avatar}
                            alt={status.user.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                            {status.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Status Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={cn(
                            "font-medium truncate",
                            status.isViewed
                              ? "text-muted-foreground"
                              : "text-foreground",
                          )}
                        >
                          {status.user.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(status.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          {status.content.type === "image" && (
                            <Image className="h-4 w-4 text-muted-foreground" />
                          )}
                          {status.content.type === "video" && (
                            <Camera className="h-4 w-4 text-muted-foreground" />
                          )}
                          {status.content.type === "text" && (
                            <Type className="h-4 w-4 text-muted-foreground" />
                          )}
                          <p
                            className={cn(
                              "text-sm truncate",
                              status.isViewed
                                ? "text-muted-foreground"
                                : "text-foreground",
                            )}
                          >
                            {status.content.text}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{status.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No status updates
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to share a status update
                  </p>
                  <Button onClick={handleAddStatus}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Status
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Status Creation Options */}
          <div className="p-4 border-t border-border/30 bg-muted/10">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Create Status
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-3 h-auto"
              >
                <Camera className="h-5 w-5 mb-1" />
                <span className="text-xs">Camera</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-3 h-auto"
              >
                <Image className="h-5 w-5 mb-1" />
                <span className="text-xs">Photo</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-3 h-auto"
              >
                <Type className="h-5 w-5 mb-1" />
                <span className="text-xs">Text</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-3 h-auto"
              >
                <Mic className="h-5 w-5 mb-1" />
                <span className="text-xs">Voice</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ChatTabs>
  );
}
