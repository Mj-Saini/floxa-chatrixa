import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageCircle,
  Video,
  Users,
  Shield,
  Wallet,
  Settings,
  BookOpen,
  Mail,
  Phone,
} from "lucide-react";

export default function Help() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using ChatFlow",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      topics: [
        "Creating your account",
        "Setting up your profile",
        "First time chatting guide",
        "Understanding the interface",
      ],
    },
    {
      title: "Chat Features",
      description: "Master all chatting capabilities",
      icon: MessageCircle,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      topics: [
        "Text messaging tips",
        "File sharing guide",
        "Emoji and stickers",
        "Chat history access",
      ],
    },
    {
      title: "Video Calls",
      description: "Everything about video chatting",
      icon: Video,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      topics: [
        "Starting video calls",
        "Camera and audio settings",
        "Troubleshooting video issues",
        "Safety during video chats",
      ],
    },
    {
      title: "Rooms & Groups",
      description: "Join and manage chat rooms",
      icon: Users,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      topics: [
        "Joining public rooms",
        "Creating private rooms",
        "Managing group chats",
        "Room moderation tools",
      ],
    },
    {
      title: "Points & Wallet",
      description: "Earn and manage your rewards",
      icon: Wallet,
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      topics: [
        "How to earn points",
        "Referral system guide",
        "Withdrawing money",
        "Transaction history",
      ],
    },
    {
      title: "Safety & Privacy",
      description: "Stay safe while chatting",
      icon: Shield,
      color: "bg-red-500/10 text-red-400 border-red-500/20",
      topics: [
        "Privacy settings",
        "Blocking and reporting",
        "Safety guidelines",
        "Data protection",
      ],
    },
  ];

  const quickActions = [
    {
      title: "Live Chat Support",
      description: "Chat with our support team",
      icon: MessageCircle,
      action: "Start Chat",
      href: "/contact",
    },
    {
      title: "Report an Issue",
      description: "Report bugs or safety concerns",
      icon: Shield,
      action: "Report",
      href: "/contact",
    },
    {
      title: "Feature Request",
      description: "Suggest new features",
      icon: Settings,
      action: "Suggest",
      href: "/contact",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers, guides, and get support for ChatFlow
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              className="pl-10 h-12 text-lg bg-background/50 border-border/50"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Link to={action.href}>
                    <Button className="w-full">{action.action}</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {category.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      >
                        • {topic}
                      </li>
                    ))}
                  </ul>
                  <Link to="/faq">
                    <Button variant="ghost" className="w-full mt-4">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Articles */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Popular Help Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">How to start your first chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guide for new users
                  </p>
                </Link>
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">Earning and using points</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete guide to our rewards system
                  </p>
                </Link>
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">Video call troubleshooting</h4>
                  <p className="text-sm text-muted-foreground">
                    Fix common video and audio issues
                  </p>
                </Link>
              </div>
              <div className="space-y-3">
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">Privacy and safety settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Protect yourself while chatting
                  </p>
                </Link>
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">Creating and managing rooms</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up your own chat spaces
                  </p>
                </Link>
                <Link
                  to="/faq"
                  className="block p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-medium">Referral program explained</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn points by inviting friends
                  </p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
