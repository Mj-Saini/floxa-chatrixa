import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { Video, Users, Clock, Zap } from "lucide-react";

export default function VideoCall() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Video Call with Strangers</h1>
          <p className="text-muted-foreground">
            Connect face-to-face with people from around the world
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-6 w-6" />
              <span>Video Chat Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Users className="h-12 w-12 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Random Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Get matched with strangers instantly
                </p>
              </div>
              <div className="text-center p-4">
                <Clock className="h-12 w-12 mx-auto mb-2 text-brand-pink" />
                <h3 className="font-semibold">Time Limits</h3>
                <p className="text-sm text-muted-foreground">
                  Configurable chat durations
                </p>
              </div>
              <div className="text-center p-4">
                <Zap className="h-12 w-12 mx-auto mb-2 text-brand-blue" />
                <h3 className="font-semibold">Next User</h3>
                <p className="text-sm text-muted-foreground">
                  Skip to next person instantly
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Video Chat
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>🚧 Video call functionality coming soon!</p>
              <p>
                Will include WebRTC integration, camera/mic controls, and
                real-time matching.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
