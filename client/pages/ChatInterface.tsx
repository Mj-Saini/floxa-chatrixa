import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Mic,
  Image,
  FileText,
  Camera,
  Reply,
  Copy,
  Edit,
  Trash,
  Check,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: Date;
  type: "text" | "image" | "file" | "audio";
  isEdited?: boolean;
  replyTo?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  isGroup: boolean;
  members?: number;
}

export default function ChatInterface() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock chat data - in real app this would come from API
  const chatUser: ChatUser = {
    id: chatId || "1",
    name: chatId === "2" ? "Tech Team" : "Sarah Johnson",
    avatar: "",
    isOnline: true,
    lastSeen: "2 minutes ago",
    isGroup: chatId === "2",
    members: chatId === "2" ? 24 : undefined,
  };

  // Mock messages
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: "Hey! How are you doing today?",
        sender: "other",
        timestamp: new Date(Date.now() - 300000),
        type: "text",
      },
      {
        id: "2",
        content: "I'm doing great, thanks for asking! How about you?",
        sender: "me",
        timestamp: new Date(Date.now() - 240000),
        type: "text",
      },
      {
        id: "3",
        content: "Working on some exciting new features for the app",
        sender: "other",
        timestamp: new Date(Date.now() - 180000),
        type: "text",
      },
      {
        id: "4",
        content: "That sounds awesome! Can't wait to see what you're building",
        sender: "me",
        timestamp: new Date(Date.now() - 120000),
        type: "text",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate other user typing and response
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Interesting point!",
        "I agree with that",
        "Thanks for sharing!",
        "That makes sense",
        "Good to know!",
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, response]);
    }, 3000);
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setEditingMessage(messageId);
      setEditText(message.content);
    }
  };

  const saveEditedMessage = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editingMessage
          ? { ...msg, content: editText, isEdited: true }
          : msg,
      ),
    );
    setEditingMessage(null);
    setEditText("");
  };

  const deleteMessage = (messageId: string, deleteFor: "me" | "everyone") => {
    if (deleteFor === "everyone") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, content: "🚫 This message was deleted", type: "text" }
            : msg,
        ),
      );
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }
    setSelectedMessage(null);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setSelectedMessage(null);
  };

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    const fileMessage: Message = {
      id: Date.now().toString(),
      content:
        type === "image"
          ? "📷 Image shared"
          : type === "file"
            ? "📄 Document shared"
            : "🎵 Audio message",
      sender: "me",
      timestamp: new Date(),
      type: type as "image" | "file" | "audio",
    };
    setMessages((prev) => [...prev, fileMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleProfileClick = () => {
    navigate(`/profile/${chatUser.id}`);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border/50">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/chats")}
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
                <AvatarImage src={chatUser.avatar} alt={chatUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink text-white font-semibold">
                  {chatUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {chatUser.isOnline && !chatUser.isGroup && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{chatUser.name}</h3>
              <p className="text-sm text-muted-foreground">
                {chatUser.isGroup
                  ? `${chatUser.members} members`
                  : isTyping
                    ? "typing..."
                    : chatUser.isOnline
                      ? "online"
                      : `last seen ${chatUser.lastSeen}`}
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
              <DropdownMenuItem>View Profile</DropdownMenuItem>
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] ${message.sender === "me" ? "order-2" : "order-1"}`}
            >
              {editingMessage === message.id ? (
                <div className="bg-muted p-3 rounded-lg">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEditedMessage()}
                    className="mb-2"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={saveEditedMessage}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingMessage(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "p-3 rounded-lg relative group cursor-pointer",
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                  onClick={() =>
                    setSelectedMessage(
                      selectedMessage === message.id ? null : message.id,
                    )
                  }
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    <div className="flex items-center space-x-1">
                      {message.isEdited && (
                        <span className="text-xs opacity-70">edited</span>
                      )}
                      {message.sender === "me" && (
                        <CheckCheck className="h-3 w-3 opacity-70" />
                      )}
                    </div>
                  </div>

                  {/* Message Options */}
                  {selectedMessage === message.id && (
                    <Card className="absolute top-0 right-0 transform translate-x-full -translate-y-2 z-10 w-48">
                      <CardContent className="p-2">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          {message.sender === "me" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => handleEditMessage(message.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-destructive"
                            onClick={() => deleteMessage(message.id, "me")}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete for me
                          </Button>
                          {message.sender === "me" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-destructive"
                              onClick={() =>
                                deleteMessage(message.id, "everyone")
                              }
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete for everyone
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border/50 bg-background sticky bottom-0">
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Paperclip className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleFileUpload("image")}>
                <Image className="h-4 w-4 mr-2" />
                Photo & Video
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("file")}>
                <FileText className="h-4 w-4 mr-2" />
                Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("audio")}>
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm">
            <Smile className="h-5 w-5" />
          </Button>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />

          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={(e) => {
          // Handle file upload
          console.log("File selected:", e.target.files?.[0]);
        }}
      />
    </div>
  );
}
