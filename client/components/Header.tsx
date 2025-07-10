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
  Video,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = location.pathname === "/login";
  const isHomepage = location.pathname === "/";
  const isChatInterface = location.pathname.startsWith("/chat/");

  if (isAuthPage || isChatInterface) {
    return null;
  }

  const navItems = [
    { href: "/home", label: "Home", icon: MessageCircle },
    { href: "/home/stranger-chat", label: "Chat", icon: MessageCircle },
    { href: "/home/video-call", label: "Video", icon: Video },
    { href: "/home/chats", label: "Messages", icon: Users },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-xl">
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">
              cHaTRiXa
            </span>
          </Link>

          {/* Instagram-style Navigation - Only on homepage */}
          {isHomepage && (
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/");
                return (
                  <Link key={item.href} to={item.href}>
                    <div className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Icon
                        className={cn(
                          "h-6 w-6 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="w-1 h-1 bg-primary rounded-full" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          )}

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
                  <Link to="/membership" className="flex items-center">
                    <span className="mr-2">👑</span>
                    <span>Upgrade to Pro</span>
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

        {/* Mobile Navigation - Only on homepage */}
        {isMobileMenuOpen && isHomepage && (
          <div className="md:hidden border-t border-border/50 py-4">
            <nav className="grid grid-cols-4 gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/");
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Icon
                        className={cn(
                          "h-6 w-6 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="w-1 h-1 bg-primary rounded-full" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
