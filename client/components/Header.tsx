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
  Wallet,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Coins,
  Users,
  Trophy,
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
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const chatFeatures = [
    { href: "/stranger-chat", label: "Talk to Stranger", icon: MessageCircle },
    { href: "/video-call", label: "Video Call", icon: Users },
    { href: "/live-rooms", label: "Live Rooms", icon: Users },
    { href: "/private-rooms", label: "Private Rooms", icon: Users },
    { href: "/group-chat", label: "Group Chat", icon: Users },
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

            {/* Chat Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 px-3",
                    chatFeatures.some(
                      (feature) => location.pathname === feature.href,
                    ) &&
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat</span>
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
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {chatFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <DropdownMenuItem key={feature.href} asChild>
                      <Link to={feature.href} className="flex items-center">
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{feature.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Wallet */}
            <Link to="/wallet">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">1,250</span>
                <Coins className="h-4 w-4 ml-1 text-yellow-500" />
              </Button>
            </Link>

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

              {/* Chat Features Section */}
              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Chat Options
                </div>
              </div>
              {chatFeatures.map((feature) => {
                const Icon = feature.icon;
                const isActive = location.pathname === feature.href;
                return (
                  <Link
                    key={feature.href}
                    to={feature.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start space-x-2 ml-4",
                        isActive &&
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{feature.label}</span>
                    </Button>
                  </Link>
                );
              })}

              <Link to="/wallet" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Wallet (1,250 points)</span>
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
