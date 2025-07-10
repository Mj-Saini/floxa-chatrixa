import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  isGroup: boolean;
  members?: number;
}

interface ChatHeaderProps {
  user: ChatUser;
  isTyping?: boolean;
}

export default function ChatHeader({
  user,
  isTyping = false,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  const handleBackClick = () => {
    navigate("/chats");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-background border-b border-border/50">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
          onClick={handleProfileClick}
        >
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink text-white font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && !user.isGroup && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {user.isGroup
                ? `${user.members} members`
                : isTyping
                  ? "typing..."
                  : user.isOnline
                    ? "online"
                    : `last seen ${user.lastSeen}`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <Video className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleProfileClick}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Media & Files</DropdownMenuItem>
            <DropdownMenuItem>Search Messages</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Block User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
