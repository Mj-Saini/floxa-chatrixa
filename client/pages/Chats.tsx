import React, { useState } from "react";
import ChatTabs from "@/components/ChatTabs";
import ChatList from "@/components/ChatList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Archive, MessageCircle, Users } from "lucide-react";

const mockChats = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      lastMessage: "Hey! How are you doing today?",
      timestamp: "2024-01-15T10:30:00Z",
      unreadCount: 3,
      isOnline: true,
      messageType: "text" as const,
      isTyping: false,
      isPinned: true,
      isMuted: false,
      isRead: false,
      isGroup: false,
      isArchived: false,
    },
    {
      id: "2",
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
      isArchived: false,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "",
      lastMessage: "Voice message",
      timestamp: "2024-01-15T08:20:00Z",
      unreadCount: 1,
      isOnline: true,
      messageType: "voice" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: false,
      isGroup: false,
      isArchived: false,
    },
    {
      id: "4",
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
      isArchived: false,
    },
    {
      id: "5",
      name: "John Smith",
      avatar: "",
      lastMessage: "Thanks for the help with the project!",
      timestamp: "2024-01-14T22:30:00Z",
      unreadCount: 0,
      isOnline: false,
      messageType: "text" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: true,
      isGroup: false,
      isArchived: false,
    },
    {
      id: "6",
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
      isArchived: false,
    },
    {
      id: "7",
      name: "Lisa Chen",
      avatar: "",
      lastMessage: "Project_final.pdf",
      timestamp: "2024-01-14T18:20:00Z",
      unreadCount: 0,
      isOnline: true,
      messageType: "file" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: true,
      isGroup: false,
      isArchived: false,
    },
    {
      id: "8",
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
      isArchived: false,
    },
    {
      id: "9",
      name: "Old Project Team",
      avatar: "",
      lastMessage: "Great working with you all!",
      timestamp: "2024-01-10T14:20:00Z",
      unreadCount: 0,
      isOnline: false,
      messageType: "text" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: true,
      isGroup: true,
      lastSender: "Tom",
      isArchived: true,
    },
    {
      id: "10",
      name: "Emma Wilson",
      avatar: "",
      lastMessage: "See you next time!",
      timestamp: "2024-01-08T11:15:00Z",
      unreadCount: 0,
      isOnline: false,
      messageType: "text" as const,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      isRead: true,
      isGroup: false,
      isArchived: true,
    },
  ];

  const getFilteredChats = () => {
    let filtered = mockChats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (activeFilter) {
      case "unread":
        return filtered.filter((chat) => chat.unreadCount > 0);
      case "groups":
        return filtered.filter((chat) => chat.isGroup);
      case "archived":
        return filtered.filter((chat) => chat.isArchived);
      case "all":
      default:
        return filtered.filter((chat) => !chat.isArchived);
    }
  };

  const filteredChats = getFilteredChats();

  const handleChatClick = (chatId: string) => {
    // Clear unread count for this chat
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );

    window.location.href = `/chat/${chatId}`;
  };

  return (
    <ChatTabs>
      <div className="flex flex-col h-full">
        {/* Search and Filters */}
        <div className="p-4 bg-background border-b border-border/30">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30 border-none focus:bg-background"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 mt-3">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1 h-7"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "unread" ? "default" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1 h-7"
              onClick={() => setActiveFilter("unread")}
            >
              Unread
              {mockChats.filter(
                (chat) => chat.unreadCount > 0 && !chat.isArchived,
              ).length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1 text-xs">
                  {
                    mockChats.filter(
                      (chat) => chat.unreadCount > 0 && !chat.isArchived,
                    ).length
                  }
                </span>
              )}
            </Button>
            <Button
              variant={activeFilter === "groups" ? "default" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1 h-7"
              onClick={() => setActiveFilter("groups")}
            >
              Groups
              {mockChats.filter((chat) => chat.isGroup && !chat.isArchived)
                .length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1 text-xs">
                  {
                    mockChats.filter((chat) => chat.isGroup && !chat.isArchived)
                      .length
                  }
                </span>
              )}
            </Button>
            <Button
              variant={activeFilter === "archived" ? "default" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1 h-7"
              onClick={() => setActiveFilter("archived")}
            >
              <Archive className="h-3 w-3 mr-1" />
              Archived
              {mockChats.filter((chat) => chat.isArchived).length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1 text-xs">
                  {mockChats.filter((chat) => chat.isArchived).length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ChatList chats={filteredChats} onChatClick={handleChatClick} />

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {activeFilter === "unread" ? (
                <>
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No unread messages
                  </h3>
                  <p className="text-muted-foreground">
                    You're all caught up! All messages have been read.
                  </p>
                </>
              ) : activeFilter === "groups" ? (
                <>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No groups found</h3>
                  <p className="text-muted-foreground">
                    Join a group or create one to start group conversations.
                  </p>
                </>
              ) : activeFilter === "archived" ? (
                <>
                  <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No archived chats
                  </h3>
                  <p className="text-muted-foreground">
                    Archived conversations will appear here.
                  </p>
                </>
              ) : (
                <>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No chats found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or start a new conversation
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </ChatTabs>
  );
}