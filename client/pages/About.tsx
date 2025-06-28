import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Users,
  Globe,
  Heart,
  Zap,
  Shield,
  Target,
  Award,
  Rocket,
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, value: "10M+", label: "Active Users Worldwide" },
    { icon: MessageCircle, value: "50K+", label: "Daily Conversations" },
    { icon: Globe, value: "200+", label: "Countries Connected" },
    { icon: Heart, value: "4.8", label: "User Satisfaction Rating" },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Co-Founder",
      description:
        "Passionate about connecting people across the globe through technology.",
      image: "👨‍💼",
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      description:
        "Expert in real-time communication systems and user experience design.",
      image: "👩‍💻",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Safety",
      description:
        "Dedicated to creating a safe and inclusive environment for all users.",
      image: "👨‍🔧",
    },
    {
      name: "Emily Wang",
      role: "Product Manager",
      description:
        "Focused on building features that bring people together meaningfully.",
      image: "👩‍🎨",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Connection",
      description:
        "We believe in the power of human connection to break down barriers and build understanding.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Creating a safe space where everyone can express themselves freely and authentically.",
    },
    {
      icon: Globe,
      title: "Global Unity",
      description:
        "Bringing together people from all walks of life to share experiences and learn from each other.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Continuously pushing the boundaries of what's possible in digital communication.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "ChatFlow Founded",
      description:
        "Started as a simple idea to connect strangers in meaningful conversations.",
    },
    {
      year: "2021",
      title: "1M Users Milestone",
      description:
        "Reached our first million users and launched video calling features.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded to 100+ countries with multi-language support and local communities.",
    },
    {
      year: "2023",
      title: "Advanced Features",
      description:
        "Introduced AI-powered matching, group rooms, and the points reward system.",
    },
    {
      year: "2024",
      title: "10M+ Community",
      description:
        "Growing strong with over 10 million active users and expanding our vision.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-primary rounded-2xl">
              <MessageCircle className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">
              About ChatFlow
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ChatFlow was born from a simple belief: that meaningful connections
            can happen anywhere, anytime, with anyone. We're building the future
            of digital communication, one conversation at a time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 text-center"
              >
                <CardContent className="p-6">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20 mb-16">
          <CardContent className="p-12 text-center">
            <Target className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To create a world where distance doesn't matter, where language
              barriers dissolve, and where every person can find someone to
              connect with. We're not just building a chat app—we're fostering a
              global community where understanding, empathy, and friendship
              flourish across all boundaries.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Story / Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                </div>
                <Card className="flex-1 bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-16">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-3">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-2xl">Awards & Recognition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🏆</div>
                <h4 className="font-semibold">Best Communication App 2023</h4>
                <p className="text-muted-foreground text-sm">
                  Tech Innovation Awards
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">⭐</div>
                <h4 className="font-semibold">Top Rated Social Platform</h4>
                <p className="text-muted-foreground text-sm">
                  User Choice Awards 2023
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🌟</div>
                <h4 className="font-semibold">Safety Excellence Award</h4>
                <p className="text-muted-foreground text-sm">
                  Digital Safety Council 2023
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Join Us CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <Rocket className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Join Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the next chapter in ChatFlow's journey. Whether you're
              looking to connect with new people, join our team, or partner with
              us, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
              <Button size="lg" variant="outline">
                <Users className="mr-2 h-5 w-5" />
                Join Our Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
