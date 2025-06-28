import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCheck,
  Check,
  Mic,
  Image,
  FileText,
  Pin,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messageType: "text" | "voice" | "image" | "file";
  isTyping: boolean;
  isPinned: boolean;
  isMuted: boolean;
  isRead: boolean;
  isGroup: boolean;
  lastSender?: string;
}

interface ChatListProps {
  chats: Chat[];
  onChatClick: (chatId: string) => void;
}

export default function ChatList({ chats, onChatClick }: ChatListProps) {
  const getMessageIcon = (type: string) => {
    switch (type) {
      case "voice":
        return <Mic className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "file":
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 3600);

    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return messageTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-3 hover:bg-muted/30 cursor-pointer border-b border-border/20 transition-colors"
          onClick={() => onChatClick(chat.id)}
        >
          {/* Avatar */}
          <div className="relative mr-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink text-white font-semibold">
                {chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>

          {/* Chat Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h3
                  className={cn(
                    "font-medium truncate",
                    chat.unreadCount > 0
                      ? "text-foreground"
                      : "text-foreground",
                  )}
                >
                  {chat.name}
                </h3>
                {chat.isPinned && (
                  <Pin className="h-3 w-3 text-muted-foreground" />
                )}
                {chat.isMuted && (
                  <VolumeX className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">
                  {formatTime(chat.timestamp)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                {chat.isTyping ? (
                  <div className="flex items-center space-x-1 text-primary">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm">typing...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-1">
                      {getMessageIcon(chat.messageType)}
                      {!chat.isGroup && chat.isRead && (
                        <CheckCheck className="h-4 w-4 text-blue-500" />
                      )}
                      {!chat.isGroup && !chat.isRead && (
                        <Check className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-sm truncate",
                        chat.unreadCount > 0
                          ? "text-foreground font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {chat.isGroup && chat.lastSender && (
                        <span className="text-primary">
                          {chat.lastSender}:{" "}
                        </span>
                      )}
                      {chat.lastMessage}
                    </p>
                  </>
                )}
              </div>

              {/* Unread Count */}
              {chat.unreadCount > 0 && (
                <Badge
                  variant="default"
                  className="ml-2 h-5 w-5 p-0 text-xs bg-primary hover:bg-primary flex items-center justify-center rounded-full"
                >
                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
