import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Camera,
  MapPin,
  Calendar,
  Star,
  MessageCircle,
  Settings,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-brand-pink flex items-center justify-center mx-auto">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mb-2">Alex_2024</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>India</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined Jan 2024</span>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Star className="h-3 w-3 mr-1" />
                    4.8 Rating
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Online
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Activity Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Chats</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friends</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points Earned</span>
                  <span className="font-semibold">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referrals</span>
                  <span className="font-semibold">5</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-6 w-6" />
                  <span>Profile Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      defaultValue="Alex"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue="Alex_2024"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex@example.com"
                    className="bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      defaultValue="Male"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      defaultValue="India"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status Message</Label>
                  <Input
                    id="status"
                    placeholder="What's on your mind?"
                    className="bg-background/50"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">Save Changes</Button>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>

                <div className="text-center p-6 bg-muted/10 rounded-lg">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">
                    Profile Features Coming Soon
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Profile picture upload, cover photos, privacy settings, and
                    more customization options.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
