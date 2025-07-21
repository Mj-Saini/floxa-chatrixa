import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/components/BackButton";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  SkipForward,
  Settings,
  Users,
  Globe,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StrangerInfo {
  country: string;
  gender: string;
  isConnected: boolean;
}

export default function VideoCall() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [strangerInfo, setStrangerInfo] = useState<StrangerInfo>({
    country: "",
    gender: "",
    isConnected: false,
  });
  const [hasMediaPermission, setHasMediaPermission] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock stranger data
  const mockStrangers = [
    { country: "USA", gender: "Male" },
    { country: "Canada", gender: "Female" },
    { country: "Germany", gender: "Male" },
    { country: "Japan", gender: "Female" },
    { country: "Australia", gender: "Male" },
    { country: "Brazil", gender: "Female" },
    { country: "France", gender: "Male" },
    { country: "UK", gender: "Female" },
    { country: "India", gender: "Male" },
    { country: "Mexico", gender: "Female" },
  ];

  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    };
  }, []);

  const startCallTimer = () => {
    setCallDuration(0);
    durationIntervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;
      setHasMediaPermission(true);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setHasMediaPermission(false);
      throw error;
    }
  };

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);

      // Initialize media devices
      await initializeMedia();

      // Simulate connection delay
      connectionTimeoutRef.current = setTimeout(() => {
        // Randomly select a stranger
        const randomStranger = mockStrangers[Math.floor(Math.random() * mockStrangers.length)];

        setStrangerInfo({
          country: randomStranger.country,
          gender: randomStranger.gender,
          isConnected: true,
        });

        setIsConnecting(false);
        setIsConnected(true);
        startCallTimer();
      }, 2000 + Math.random() * 3000); // 2-5 second delay

    } catch (error) {
      console.error("Error starting call:", error);
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setIsConnecting(false);
    setStrangerInfo({
      country: "",
      gender: "",
      isConnected: false,
    });

    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const handleSkipUser = () => {
    if (isConnected) {
      handleEndCall();
      // Start a new call after a short delay
      setTimeout(() => {
        handleStartCall();
      }, 1000);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Video Call" />

      <div className="container mx-auto px-4 py-6">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Local Video */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Your Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!hasMediaPermission && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Camera access required
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Remote Video */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stranger Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {isConnected ? (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="text-center">
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                          <p className="text-sm text-muted-foreground">
                            Connecting to stranger...
                          </p>
                        </>
                      ) : (
                        <>
                          <Users className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            No connection
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call Controls */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Call Status */}
              <div className="flex items-center gap-4">
                {isConnected && (
                  <>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {strangerInfo.country}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {strangerInfo.gender}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(callDuration)}
                    </Badge>
                  </>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                {!isConnected && !isConnecting && (
                  <Button onClick={handleStartCall} size="lg">
                    <Phone className="h-5 w-5 mr-2" />
                    Start Call
                  </Button>
                )}

                {isConnecting && (
                  <Button variant="outline" onClick={handleEndCall} size="lg">
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </Button>
                )}

                {isConnected && (
                  <>
                    <Button
                      variant={isVideoOn ? "default" : "secondary"}
                      onClick={toggleVideo}
                      size="lg"
                    >
                      {isVideoOn ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <VideoOff className="h-5 w-5" />
                      )}
                    </Button>

                    <Button
                      variant={isAudioOn ? "default" : "secondary"}
                      onClick={toggleAudio}
                      size="lg"
                    >
                      {isAudioOn ? (
                        <Mic className="h-5 w-5" />
                      ) : (
                        <MicOff className="h-5 w-5" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleSkipUser}
                      size="lg"
                    >
                      <SkipForward className="h-5 w-5 mr-2" />
                      Skip
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={handleEndCall}
                      size="lg"
                    >
                      <PhoneOff className="h-5 w-5 mr-2" />
                      End Call
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
