import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageHeader from "@/components/PageHeader";
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
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "me" | "stranger";
  timestamp: Date;
  type: "text" | "system";
}

export default function StrangerChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [strangerInfo, setStrangerInfo] = useState({
    country: "Unknown",
    gender: "Unknown",
    isTyping: false,
    name: "Stranger",
    avatar: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate finding real user worldwide
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);

      // Random real user data from different countries
      const countries = [
        "USA",
        "Canada",
        "Germany",
        "Japan",
        "Australia",
        "Brazil",
        "France",
        "UK",
        "India",
        "Mexico",
      ];
      const genders = ["Male", "Female"];
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];

      setStrangerInfo({
        country: randomCountry,
        gender: randomGender,
        isTyping: false,
      });
      setMessages([
        {
          id: "1",
          content: `🌍 Connected to a real person from ${randomCountry}`,
          sender: "me",
          timestamp: new Date(),
          type: "system",
        },
      ]);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setMessages([]);
    setStrangerInfo({
      country: "Unknown",
      gender: "Unknown",
      name: "Stranger",
      isTyping: false,
      avatar: "",
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isConnected) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate stranger typing and response
    setTimeout(() => {
      setStrangerInfo((prev) => ({ ...prev, isTyping: true }));
    }, 500);

    setTimeout(() => {
      const responses = [
        "Hello! How are you doing today?",
        "Nice to meet you! Where are you from?",
        "That's interesting! Tell me more.",
        "I'm doing well, thanks for asking!",
        "What do you like to do for fun?",
        "The weather is great here today!",
      ];

      const strangerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "stranger",
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, strangerMessage]);
      setStrangerInfo((prev) => ({ ...prev, isTyping: false }));
    }, 3000);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Talk to Stranger"
        subtitle="Connect with people worldwide through anonymous text chat"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col h-[calc(100vh-16rem)]">
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
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {isConnected && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{strangerInfo.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Gender: {strangerInfo.gender}</span>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
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
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
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
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                                S
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              message.sender === "me"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
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

                  {strangerInfo.isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2 max-w-[70%]">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                            S
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

                {/* Chat Input */}
                <div className="border-t border-border/30 p-4">
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
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
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
    </div>
  );
}
