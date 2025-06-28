import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Globe, Zap } from "lucide-react";

export default function LiveRooms() {
  const mockRooms = [
    {
      id: 1,
      name: "General Chat",
      topic: "Open discussion for everyone",
      users: 245,
      messages: 1250,
      isActive: true,
    },
    {
      id: 2,
      name: "Music Lovers",
      topic: "Share your favorite songs and artists",
      users: 89,
      messages: 432,
      isActive: true,
    },
    {
      id: 3,
      name: "Tech Talk",
      topic: "Latest in technology and programming",
      users: 156,
      messages: 678,
      isActive: true,
    },
    {
      id: 4,
      name: "Random Thoughts",
      topic: "Share anything on your mind",
      users: 67,
      messages: 234,
      isActive: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Live Public Rooms</h1>
          <p className="text-muted-foreground">
            Join active conversations happening right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockRooms.map((room) => (
            <Card
              key={room.id}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Badge
                    variant={room.isActive ? "default" : "secondary"}
                    className={
                      room.isActive
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : ""
                    }
                  >
                    {room.isActive ? "Live" : "Quiet"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{room.topic}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{room.users}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{room.messages}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant={room.isActive ? "default" : "outline"}
                >
                  Join Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 text-primary">
                  <Globe className="h-8 w-8" />
                  <Zap className="h-8 w-8" />
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">
                  Live Room Features Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Real-time messaging, user avatars, room moderation, and much
                  more!
                </p>
                <Button variant="outline">Create New Room</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
