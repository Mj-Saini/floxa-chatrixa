import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ChatHeader from "@/components/ChatHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Image,
  Camera,
  Copy,
  Edit,
  Trash,
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const emojis = [
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
  ];

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

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: "me",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Close emoji picker if open
    setShowEmojiPicker(false);

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
        "👍",
        "😊 Nice!",
        "Tell me more about that",
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
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
    if (type === "camera") {
      cameraInputRef.current?.click();
    } else if (type === "gallery") {
      galleryInputRef.current?.click();
    } else if (type === "audio") {
      audioInputRef.current?.click();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        content: `📷 Photo captured: ${file.name}`,
        sender: "me",
        timestamp: new Date(),
        type: "image",
      };
      setMessages((prev) => [...prev, imageMessage]);
    }
  };

  const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
          ? "image"
          : "file";
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `📎 ${fileType === "image" ? "Photo/Video" : "File"} shared: ${file.name}`,
        sender: "me",
        timestamp: new Date(),
        type: fileType as "image" | "file",
      };
      setMessages((prev) => [...prev, fileMessage]);
    }
  };

  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const audioMessage: Message = {
        id: Date.now().toString(),
        content: `🎵 ${file.name}`,
        sender: "me",
        timestamp: new Date(),
        type: "audio",
      };
      setMessages((prev) => [...prev, audioMessage]);

      // Clear the input for next selection
      event.target.value = "";
    }
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
    <div className="h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <ChatHeader user={chatUser} isTyping={isTyping} />

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
              <DropdownMenuItem onClick={() => handleFileUpload("camera")}>
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("gallery")}>
                <Image className="h-4 w-4 mr-2" />
                Photo & Video
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("audio")}>
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </Button>

            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-12 left-0 bg-background border border-border rounded-lg p-4 shadow-lg z-50 w-80 max-h-60 overflow-y-auto"
              >
                <div className="grid grid-cols-10 gap-1">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEmojiClick(emoji);
                      }}
                      className="text-2xl hover:bg-muted rounded p-2 transition-colors cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1"
          />

          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
      />

      <input
        ref={galleryInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,.pdf,.doc,.docx"
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
