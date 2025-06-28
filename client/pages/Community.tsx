import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageCircle,
  Heart,
  Globe,
  Calendar,
  Trophy,
  Star,
  Zap,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Community() {
  const communityStats = [
    {
      icon: Users,
      value: "10M+",
      label: "Active Members",
      color: "text-blue-400",
    },
    {
      icon: MessageCircle,
      value: "50K+",
      label: "Daily Messages",
      color: "text-green-400",
    },
    {
      icon: Globe,
      value: "200+",
      label: "Countries",
      color: "text-purple-400",
    },
    {
      icon: Heart,
      value: "4.8",
      label: "Community Rating",
      color: "text-pink-400",
    },
  ];

  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Discussion Forums",
      description:
        "Join topic-based discussions, share experiences, and connect with like-minded people.",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      members: "2.5M members",
      activity: "Very active",
    },
    {
      icon: Trophy,
      title: "Events & Contests",
      description:
        "Participate in community events, competitions, and special challenges.",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      members: "850K participants",
      activity: "Weekly events",
    },
    {
      icon: Users,
      title: "User Groups",
      description:
        "Create or join groups based on interests, location, or languages.",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      members: "15K groups",
      activity: "Growing daily",
    },
    {
      icon: Star,
      title: "Featured Creators",
      description:
        "Discover and follow top community contributors and content creators.",
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      members: "1.2K creators",
      activity: "Featured weekly",
    },
  ];

  const upcomingEvents = [
    {
      title: "Global Chat Day",
      date: "March 15, 2024",
      time: "12:00 PM UTC",
      description: "24-hour global conversation marathon",
      participants: 50000,
      status: "upcoming",
    },
    {
      title: "Video Call Challenge",
      date: "March 22, 2024",
      time: "2:00 PM UTC",
      description: "Make friends from 10 different countries",
      participants: 25000,
      status: "registration",
    },
    {
      title: "Community Feedback Session",
      date: "March 30, 2024",
      time: "6:00 PM UTC",
      description: "Share your ideas for ChatFlow improvements",
      participants: 5000,
      status: "upcoming",
    },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      platform: "Twitter",
      handle: "@ChatFlowApp",
      followers: "125K",
      href: "#",
    },
    {
      icon: Instagram,
      platform: "Instagram",
      handle: "@chatflow_official",
      followers: "89K",
      href: "#",
    },
    {
      icon: Github,
      platform: "GitHub",
      handle: "chatflow-community",
      followers: "12K",
      href: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">ChatFlow Community</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of users connecting, sharing, and building the future
            of communication together
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50"
                >
                  <CardContent className="p-4 text-center">
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Community Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Community Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {feature.members}
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        {feature.activity}
                      </Badge>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge
                      variant={
                        event.status === "registration"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {event.status === "registration"
                        ? "Register Now"
                        : "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-muted-foreground">{event.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {event.participants.toLocaleString()} interested
                      </span>
                    </div>
                    <Button className="w-full">
                      {event.status === "registration"
                        ? "Register"
                        : "Set Reminder"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Follow Us on Social Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {social.platform}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {social.handle}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {social.followers} followers
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Follow
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Join CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Connect with millions of users, participate in events, and help
              shape the future of ChatFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="mr-2 h-5 w-5" />
                Join Community Forums
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
