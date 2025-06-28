import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Trophy,
  Plus,
  Wallet,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = location.pathname === "/login";

  if (isAuthPage) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home", icon: MessageCircle },
    { href: "/stranger-chat", label: "Chat", icon: MessageCircle },
    { href: "/video-call", label: "Video", icon: Video },
    { href: "/chats", label: "Messages", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-xl">
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">
              ChatFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 px-3",
                      isActive &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            {/* Chat Rooms Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 px-3",
                    (location.pathname.includes("/live-rooms") ||
                      location.pathname.includes("/private-rooms") ||
                      location.pathname.includes("/group-chat")) &&
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat Rooms</span>
                  <svg
                    className="h-3 w-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <DropdownMenuLabel>Active Rooms</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-48 overflow-y-auto">
                  {activeRooms.map((room) => (
                    <DropdownMenuItem key={room.id} asChild>
                      <Link
                        to="/live-rooms"
                        className="flex items-center justify-between p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${room.isActive ? "bg-green-400" : "bg-gray-400"}`}
                          />
                          <div>
                            <div className="font-medium text-sm">
                              {room.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {room.users} users
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {room.type}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/live-rooms" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Browse All Rooms</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/private-rooms" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create New Room</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Groups</DropdownMenuLabel>
                <div className="max-h-32 overflow-y-auto">
                  {myGroups.map((group) => (
                    <DropdownMenuItem key={group.id} asChild>
                      <Link
                        to="/group-chat"
                        className="flex items-center justify-between p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm">
                              {group.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {group.members} members
                            </div>
                          </div>
                        </div>
                        {group.unread > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {group.unread}
                          </div>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/group-chat" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create New Group</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive hover:bg-destructive">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-muted-foreground">
                      From John Doe - 2 minutes ago
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Friend request</p>
                    <p className="text-xs text-muted-foreground">
                      Sarah wants to connect - 5 minutes ago
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Video call missed</p>
                    <p className="text-xs text-muted-foreground">
                      Anonymous user - 10 minutes ago
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-brand-pink flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      Alex_2024
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wallet" className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Wallet</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start space-x-2",
                        isActive &&
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* Active Rooms Section */}
              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Active Rooms
                </div>
              </div>
              {activeRooms.slice(0, 3).map((room) => (
                <Link
                  key={room.id}
                  to="/live-rooms"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2 ml-4"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${room.isActive ? "bg-green-400" : "bg-gray-400"}`}
                    />
                    <span className="truncate">{room.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({room.users})
                    </span>
                  </Button>
                </Link>
              ))}

              {/* My Groups Section */}
              <div className="px-3 py-2 mt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  My Groups
                </div>
              </div>
              {myGroups.slice(0, 2).map((group) => (
                <Link
                  key={group.id}
                  to="/group-chat"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2 ml-4"
                  >
                    <Users className="h-4 w-4" />
                    <span className="truncate">{group.name}</span>
                    {group.unread > 0 && (
                      <div className="bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {group.unread}
                      </div>
                    )}
                  </Button>
                </Link>
              ))}

              {/* Quick Actions */}
              <div className="px-3 py-2 mt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </div>
              </div>
              <Link to="/live-rooms" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-2 ml-4"
                >
                  <Users className="h-4 w-4" />
                  <span>Browse All Rooms</span>
                </Button>
              </Link>
              <Link
                to="/private-rooms"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-2 ml-4"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Room</span>
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
