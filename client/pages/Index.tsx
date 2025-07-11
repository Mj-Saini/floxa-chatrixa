import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Video,
  Users,
  Lock,
  UserPlus,
  Trophy,
  Wallet,
  Gift,
  Globe,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: MessageCircle,
      title: "Talk to Stranger",
      description: "Start anonymous conversations with people worldwide",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      href: "/stranger-chat",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face conversations with random strangers",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      href: "/video-call",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Users,
      title: "Live Public Rooms",
      description: "Join active group conversations on various topics",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      href: "/live-rooms",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: Lock,
      title: "Create Private Room",
      description: "Set up exclusive rooms for your circle",
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      href: "/private-rooms",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: UserPlus,
      title: "Group Chat",
      description: "Manage group conversations like WhatsApp",
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      href: "/group-chat",
      gradient: "from-pink-400 to-rose-400",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "See top users and earn your place",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      href: "/leaderboard",
      gradient: "from-yellow-400 to-amber-400",
    },
  ];

  const stats = [
    { value: "10M+", label: "Active Users", icon: Users },
    { value: "50K+", label: "Daily Conversations", icon: MessageCircle },
    { value: "200+", label: "Countries", icon: Globe },
    { value: "99.9%", label: "Uptime", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-brand-purple/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Welcome to the future of chat
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Connect with the{" "}
              <span className="bg-gradient-to-r from-primary via-brand-pink to-brand-blue bg-clip-text text-transparent">
                World
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join millions of users in real-time conversations. Make friends,
              share moments, and discover new perspectives from across the
              globe.
            </p>
            {localStorage.getItem("userType") === "guest" && (
              <div className="mt-6 inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <span className="text-orange-400 text-sm font-medium">
                  👋 Guest Mode - Text & Video Chat Available
                </span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link to="/stranger-chat" className="flex-1">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-brand-purple hover:opacity-90 transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to Stranger
              </Button>
            </Link>
            <Link to="/video-call" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
              >
                <Video className="mr-2 h-5 w-5" />
                Video Call
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to connect, communicate, and build meaningful
              relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.href}>
                  <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/5">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:bg-primary/10 group-hover:text-primary transition-all"
                        >
                          Get Started
                          <Heart className="ml-2 h-4 w-4 group-hover:text-red-400 transition-colors" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Earn While You Chat
              </h2>
              <p className="text-lg text-muted-foreground">
                Our unique reward system lets you earn points for every
                conversation, referral, and daily login. Convert your points to
                real money!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/wallet">
                  <Button className="w-full" variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    View Wallet
                  </Button>
                </Link>
                <Link to="/refer">
                  <Button className="w-full" variant="outline">
                    <Gift className="mr-2 h-4 w-4" />
                    Refer Friends
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-brand-purple/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold">1,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Points Per Referral
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-brand-pink/10 to-brand-blue/10 border-brand-pink/20">
                <CardContent className="p-6 text-center">
                  <Gift className="h-12 w-12 mx-auto mb-4 text-brand-pink" />
                  <div className="text-2xl font-bold">₹10</div>
                  <div className="text-sm text-muted-foreground">
                    Per 1000 Points
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
