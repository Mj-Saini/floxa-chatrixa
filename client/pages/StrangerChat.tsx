import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  MessageCircle,
  Send,
  SkipForward,
  X,
  Globe,
  UserX,
  Flag,
  Smile,
  Paperclip,
  MoreVertical,
  Camera,
  Image,
  Mic,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import io from "socket.io-client";

interface Message {
  id: string;
  content: string;
  sender: "me" | "stranger";
  timestamp: Date;
  type: "text" | "system" | "image" | "video" | "audio" | "file";
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

interface StrangerInfo {
  country: string;
  gender: string;
  isTyping: boolean;
  name: string;
  avatar?: string;
}

export default function StrangerChat() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [strangerInfo, setStrangerInfo] = useState<StrangerInfo | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(isConnecting);
  const waitingRef = useRef(waiting);

  useEffect(() => {
    isConnectingRef.current = isConnecting;
  }, [isConnecting]);

  useEffect(() => {
    waitingRef.current = waiting;
  }, [waiting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Clean up socket on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    setWaiting(true);
    // Connect to WebSocket server
    if (!socketRef.current) {
      socketRef.current = io("/", { transports: ["websocket"] });
    }
    // Determine userId: real user or guest
    const userType = localStorage.getItem("userType");
    let userId: string | null = null;
    if (userType === "guest") {
      userId = localStorage.getItem("guestId");
      if (!userId) {
        userId = `guest-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("guestId", userId);
      }
    } else {
      userId = localStorage.getItem("userId");
    }
    if (!userId) {
      toast({ title: "Login Required", description: "You must be logged in to use Stranger Chat.", variant: "destructive" });
      setIsConnecting(false);
      setWaiting(false);
      return;
    }
    // Listen for match
    socketRef.current.on("match-found", ({ chat, partner }) => {
      setIsConnecting(false);
      setWaiting(false);
      setIsConnected(true);
      setChatId(chat._id);
      setStrangerInfo({
        country: partner.country || "Unknown",
        gender: partner.gender || "Unknown",
        isTyping: false,
        name: partner.username || "Stranger",
        avatar: partner.avatar || "",
      });
      setMessages([
        {
          id: "system-" + Date.now(),
          content: `🌍 Connected to a person from ${partner.country || "Unknown"}`,
          sender: "me",
          timestamp: new Date(),
          type: "system",
        },
      ]);
      // Clear timeout if match is found
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    });
    // Listen for stranger messages
    socketRef.current.on("stranger-message-received", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: data.content,
          sender: "stranger",
          timestamp: new Date(data.timestamp),
          type: "text",
        },
      ]);
    });
    // Listen for queue joined
    socketRef.current.on("queue-joined", () => {
      setIsConnecting(true);
      setWaiting(true);
    });
    // Listen for queue left
    socketRef.current.on("queue-left", () => {
      setIsConnected(false);
      setWaiting(false);
      setIsConnecting(false);
      setChatId(null);
      setStrangerInfo(null);
      setMessages([]);
      // Clear timeout if user leaves queue
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    });
    // Listen for errors
    socketRef.current.on("error", (err) => {
      toast({ title: "Error", description: err.message || "Unknown error", variant: "destructive" });
      setIsConnecting(false);
      setWaiting(false);
      // Clear timeout on error
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    });
    // Join queue
    socketRef.current.emit("join-stranger-queue", { userId });

    // Set timeout for no user found
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (isConnectingRef.current || waitingRef.current) {
        toast({
          title: "No users found",
          description: "No one else is searching right now. Please try again later.",
          variant: "destructive",
        });
        setIsConnecting(false);
        setWaiting(false);
        // Optionally, leave the queue
        if (socketRef.current) {
          socketRef.current.emit("leave-stranger-queue", { userId });
        }
      }
    }, 15000); // 15 seconds
  };

  const handleDisconnect = () => {
    if (socketRef.current) {
      const userId = localStorage.getItem("userId");
      socketRef.current.emit("leave-stranger-queue", { userId });
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    setWaiting(false);
    setIsConnecting(false);
    setChatId(null);
    setStrangerInfo(null);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isConnected || !chatId) return;
    const userType = localStorage.getItem("userType");
    let userId: string | null = null;
    if (userType === "guest") {
      userId = localStorage.getItem("guestId");
    } else {
      userId = localStorage.getItem("userId");
    }
    if (!userId) return;
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
      type: "text",
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    // Send message via socket
    if (socketRef.current) {
      socketRef.current.emit("stranger-message", { userId, content: message.content, chatId });
    }
  };

  const handleSkip = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: "Stranger has disconnected. Looking for a new connection...",
        sender: "me",
        timestamp: new Date(),
        type: "system",
      },
    ]);

    setTimeout(() => {
      handleConnect();
    }, 1000);
  };

  const handleFileUpload = (type: string) => {
    const userType = localStorage.getItem("userType");

    if (userType === "guest") {
      toast({
        title: "Feature Restricted",
        description:
          "Please create an account to send files, images, and videos.",
        variant: "destructive",
      });
      return;
    }

    if (type === "camera") {
      cameraInputRef.current?.click();
    } else if (type === "gallery") {
      galleryInputRef.current?.click();
    } else if (type === "audio") {
      audioInputRef.current?.click();
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let fileType: "image" | "video" = "image";
        let content = "📷 Photo captured";

        if (file.type.startsWith("video/")) {
          fileType = "video";
          content = "🎥 Video captured";
        }

        const mediaMessage: Message = {
          id: Date.now().toString(),
          content,
          sender: "me",
          timestamp: new Date(),
          type: fileType,
          fileUrl: e.target?.result as string,
          fileName: file.name,
          fileSize: file.size,
        };
        setMessages((prev) => [...prev, mediaMessage]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let fileType: "image" | "video" | "file" = "file";
        let content = "";

        if (file.type.startsWith("image/")) {
          fileType = "image";
          content = "📷 Photo shared";
        } else if (file.type.startsWith("video/")) {
          fileType = "video";
          content = "🎥 Video shared";
        } else {
          content = "📎 File shared";
        }

        const fileMessage: Message = {
          id: Date.now().toString(),
          content,
          sender: "me",
          timestamp: new Date(),
          type: fileType,
          fileUrl: e.target?.result as string,
          fileName: file.name,
          fileSize: file.size,
        };
        setMessages((prev) => [...prev, fileMessage]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const audioMessage: Message = {
          id: Date.now().toString(),
          content: "🎵 Audio message",
          sender: "me",
          timestamp: new Date(),
          type: "audio",
          fileUrl: e.target?.result as string,
          fileName: file.name,
          fileSize: file.size,
        };
        setMessages((prev) => [...prev, audioMessage]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-4 max-w-4xl flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <span>Talk to Stranger</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {isConnected && (
                    <>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Connected
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>
                            Mute Notifications
                          </DropdownMenuItem>
                          <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Report User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </div>
              {isConnected && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{strangerInfo?.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Gender: {strangerInfo?.gender}</span>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 bg-card/50 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
            {!isConnected && !isConnecting ? (
              /* Connection Screen */
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md">
                  <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
                    <MessageCircle className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Start Anonymous Chat
                  </h2>
                  <p className="text-muted-foreground">
                    Connect with strangers from around the world for text
                    conversations. Share thoughts, make friends, and explore
                    different perspectives.
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={handleConnect}
                      size="lg"
                      className="w-full"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Find Someone to Chat
                    </Button>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div className="flex flex-col items-center p-2 bg-muted/10 rounded">
                        <Globe className="h-4 w-4 mb-1" />
                        <span>Global</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/10 rounded">
                        <MessageCircle className="h-4 w-4 mb-1" />
                        <span>Text Only</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/10 rounded">
                        <UserX className="h-4 w-4 mb-1" />
                        <span>Anonymous</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            ) : isConnecting ? (
              /* Connecting Screen */
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Finding someone to chat...
                  </h3>
                  <p className="text-muted-foreground">
                    Please wait while we connect you with a stranger
                  </p>
                </div>
              </CardContent>
            ) : (
              /* Chat Interface */
              <>
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "system" ? "justify-center" : message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "system" ? (
                        <div className="text-center text-sm text-muted-foreground bg-muted/20 px-3 py-2 rounded-full">
                          {message.content}
                        </div>
                      ) : (
                        <div className="flex items-end space-x-2 max-w-[70%]">
                          {message.sender === "stranger" && (
                            <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                                {strangerInfo?.name?.[0]?.toUpperCase() || "S"}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`px-4 py-2 rounded-2xl ${message.sender === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                              }`}
                          >
                            <div className="text-sm">
                              {message.type === "image" && message.fileUrl ? (
                                <div className="space-y-2">
                                  <img
                                    src={message.fileUrl}
                                    alt={message.fileName || "Image"}
                                    className="max-w-full h-auto max-h-64 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() =>
                                      window.open(message.fileUrl, "_blank")
                                    }
                                  />
                                  <div className="text-xs opacity-75">
                                    <p>{message.content}</p>
                                    {message.fileName && (
                                      <p className="truncate">
                                        {message.fileName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : message.type === "video" &&
                                message.fileUrl ? (
                                <div className="space-y-2">
                                  <video
                                    src={message.fileUrl}
                                    controls
                                    className="max-w-full h-auto max-h-64 rounded-lg"
                                    preload="metadata"
                                  />
                                  <div className="text-xs opacity-75">
                                    <p>{message.content}</p>
                                    {message.fileName && (
                                      <p className="truncate">
                                        {message.fileName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : message.type === "audio" &&
                                message.fileUrl ? (
                                <div className="space-y-2">
                                  <audio
                                    src={message.fileUrl}
                                    controls
                                    className="w-full max-w-xs"
                                    preload="metadata"
                                  />
                                  <div className="text-xs opacity-75">
                                    <p>{message.content}</p>
                                    {message.fileName && (
                                      <p className="truncate">
                                        {message.fileName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <p>{message.content}</p>
                              )}
                            </div>
                            <p className="text-xs opacity-70 mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                          {message.sender === "me" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink text-white text-sm">
                                ME
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {strangerInfo?.isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2 max-w-[70%]">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                            {strangerInfo?.name?.[0]?.toUpperCase() || "S"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="px-4 py-3 rounded-2xl bg-muted">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Chat Input - Fixed at bottom */}
                <div className="border-t border-border/30 p-4 bg-background">
                  <div className="flex items-center space-x-2 mb-3">
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      size="sm"
                      className="text-orange-500 border-orange-500/30 hover:bg-orange-500/10"
                    >
                      <SkipForward className="h-4 w-4 mr-1" />
                      Next
                    </Button>
                    <Button
                      onClick={handleDisconnect}
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          onClick={() => handleFileUpload("camera")}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Camera
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleFileUpload("gallery")}
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Photo & Video
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleFileUpload("audio")}
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Audio
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-80 max-h-60 overflow-y-auto"
                      >
                        <div className="grid grid-cols-10 gap-1 p-2">
                          {[
                            "😀",
                            "😃",
                            "😄",
                            "😁",
                            "😆",
                            "😅",
                            "😂",
                            "🤣",
                            "😊",
                            "😇",
                            "🙂",
                            "🙃",
                            "😉",
                            "😌",
                            "😍",
                            "🥰",
                            "😘",
                            "😗",
                            "😙",
                            "😚",
                            "😋",
                            "😛",
                            "😝",
                            "😜",
                            "🤪",
                            "🤨",
                            "🧐",
                            "🤓",
                            "😎",
                            "🤩",
                            "🥳",
                            "😏",
                            "😒",
                            "😞",
                            "😔",
                            "😟",
                            "😕",
                            "🙁",
                            "☹️",
                            "😣",
                            "😖",
                            "😫",
                            "😩",
                            "🥺",
                            "😢",
                            "😭",
                            "😤",
                            "😠",
                            "😡",
                            "🤬",
                            "🤯",
                            "😳",
                            "🥵",
                            "🥶",
                            "😱",
                            "😨",
                            "😰",
                            "😥",
                            "😓",
                            "🤗",
                            "🤔",
                            "🤭",
                            "🤫",
                            "🤥",
                            "😶",
                            "😐",
                            "😑",
                            "😬",
                            "🙄",
                            "😯",
                            "👍",
                            "👎",
                            "👌",
                            "✌️",
                            "🤞",
                            "🤟",
                            "🤘",
                            "🤙",
                            "👈",
                            "👉",
                            "👆",
                            "👇",
                            "☝️",
                            "✋",
                            "🤚",
                            "🖐",
                            "🖖",
                            "👋",
                            "🤝",
                            "👏",
                            "❤️",
                            "🧡",
                            "💛",
                            "💚",
                            "💙",
                            "💜",
                            "🖤",
                            "🤍",
                            "🤎",
                            "💔",
                            "❣️",
                            "💕",
                            "💞",
                            "💓",
                            "💗",
                            "💖",
                            "💘",
                            "💝",
                            "💟",
                            "☮️",
                          ].map((emoji, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() =>
                                setNewMessage((prev) => prev + emoji)
                              }
                              className="text-2xl hover:bg-muted rounded p-1 transition-colors cursor-pointer"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type a message..."
                      className="flex-1 bg-background/50 border-border/50"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        capture="environment"
        onChange={handleCameraCapture}
      />

      <input
        ref={galleryInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.mp4,.avi,.mov"
        onChange={handleGallerySelect}
      />

      <input
        ref={audioInputRef}
        type="file"
        className="hidden"
        accept="audio/*,.mp3,.wav,.aac,.ogg,.flac,.m4a"
        onChange={handleAudioSelect}
      />
    </div>
  );
}
