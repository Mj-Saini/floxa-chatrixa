import React, { useState } from "react";
import ChatTabs from "@/components/ChatTabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Phone,
  Video,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Call {
  id: string;
  name: string;
  avatar?: string;
  type: "voice" | "video";
  direction: "incoming" | "outgoing" | "missed";
  timestamp: string;
  duration?: string;
  isGroup: boolean;
  participants?: number;
}

export default function Calls() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockCalls: Call[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      type: "video",
      direction: "outgoing",
      timestamp: "2024-01-15T10:30:00Z",
      duration: "12:34",
      isGroup: false,
    },
    {
      id: "2",
      name: "Tech Team",
      avatar: "",
      type: "video",
      direction: "incoming",
      timestamp: "2024-01-15T09:45:00Z",
      duration: "45:12",
      isGroup: true,
      participants: 8,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "",
      type: "voice",
      direction: "missed",
      timestamp: "2024-01-15T08:20:00Z",
      isGroup: false,
    },
    {
      id: "4",
      name: "Mom",
      avatar: "",
      type: "voice",
      direction: "incoming",
      timestamp: "2024-01-14T22:30:00Z",
      duration: "25:43",
      isGroup: false,
    },
    {
      id: "5",
      name: "Design Squad",
      avatar: "",
      type: "video",
      direction: "outgoing",
      timestamp: "2024-01-14T18:15:00Z",
      duration: "1:02:15",
      isGroup: true,
      participants: 5,
    },
    {
      id: "6",
      name: "John Smith",
      avatar: "",
      type: "voice",
      direction: "missed",
      timestamp: "2024-01-14T16:20:00Z",
      isGroup: false,
    },
    {
      id: "7",
      name: "Lisa Chen",
      avatar: "",
      type: "video",
      direction: "incoming",
      timestamp: "2024-01-14T14:10:00Z",
      duration: "8:45",
      isGroup: false,
    },
    {
      id: "8",
      name: "Family Group",
      avatar: "",
      type: "video",
      direction: "outgoing",
      timestamp: "2024-01-13T20:00:00Z",
      duration: "1:15:30",
      isGroup: true,
      participants: 12,
    },
  ];

  const filteredCalls = mockCalls.filter((call) =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const callTime = new Date(timestamp);
    const diffInHours = (now.getTime() - callTime.getTime()) / (1000 * 3600);

    if (diffInHours < 24) {
      return callTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return callTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getCallIcon = (direction: string, type: string) => {
    const iconClass = "h-4 w-4";

    if (direction === "missed") {
      return <PhoneMissed className={cn(iconClass, "text-red-500")} />;
    } else if (direction === "incoming") {
      return <PhoneIncoming className={cn(iconClass, "text-green-500")} />;
    } else {
      return <PhoneOutgoing className={cn(iconClass, "text-blue-500")} />;
    }
  };

  const handleCallBack = (call: Call) => {
    console.log("Calling back:", call.name);
  };

  return (
    <ChatTabs>
      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 bg-background border-b border-border/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-none focus:bg-background"
            />
          </div>
        </div>

        {/* Header */}
        <div className="p-4 border-b border-border/30">
          <h2 className="text-lg font-semibold">Call History</h2>
          <p className="text-sm text-muted-foreground">
            Your recent calls and contacts
          </p>
        </div>

        {/* Calls List */}
        <div className="flex-1 overflow-y-auto">
          {filteredCalls.length > 0 ? (
            <div className="p-2">
              {filteredCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center p-3 hover:bg-muted/30 cursor-pointer rounded-lg transition-colors"
                  onClick={() => handleCallBack(call)}
                >
                  {/* Avatar */}
                  <div className="relative mr-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={call.avatar} alt={call.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                        {call.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {call.type === "video" ? (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background border-2 border-background rounded-full flex items-center justify-center">
                        <Video className="h-3 w-3 text-blue-500" />
                      </div>
                    ) : (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background border-2 border-background rounded-full flex items-center justify-center">
                        <Phone className="h-3 w-3 text-green-500" />
                      </div>
                    )}
                  </div>

                  {/* Call Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium truncate">{call.name}</h3>
                        {call.isGroup && (
                          <Badge variant="secondary" className="text-xs">
                            {call.participants} participants
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(call.timestamp)}
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
                      <div className="flex items-center space-x-2">
                        {getCallIcon(call.direction, call.type)}
                        <span
                          className={cn(
                            "text-sm",
                            call.direction === "missed"
                              ? "text-red-500"
                              : "text-muted-foreground",
                          )}
                        >
                          {call.direction === "missed"
                            ? "Missed call"
                            : call.direction === "incoming"
                              ? "Incoming"
                              : "Outgoing"}
                          {call.duration && ` • ${call.duration}`}
                        </span>
                      </div>

                      {/* Call Back Button */}
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-500/20"
                        >
                          <Phone className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-500/20"
                        >
                          <Video className="h-4 w-4 text-blue-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <PhoneCall className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No call history</h3>
                <p className="text-muted-foreground">
                  Your call history will appear here once you make calls
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ChatTabs>
  );
}
