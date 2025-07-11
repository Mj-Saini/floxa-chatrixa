import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import io, { Socket } from "socket.io-client";

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
  const [socket, setSocket] = useState<Socket | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize media when component mounts
  useEffect(() => {
    initializeMedia();
  }, []);

  // Initialize Socket.io connection
  useEffect(() => {
    // In production, this would be your actual socket server
    // For demo purposes, we'll simulate the connection
    const socketConnection = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socketConnection.on("connect", () => {
      console.log("Connected to socket server");
      setSocket(socketConnection);
    });

    socketConnection.on("stranger-found", (data) => {
      // Random real user data from different countries
      const countries = [
        "USA",
        "Canada",
        "Germany",
        "Japan",
        "Australia",
        "Brazil",
        "France",
        "UK",
        "India",
        "Mexico",
      ];
      const genders = ["Male", "Female"];
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];

      setStrangerInfo({
        country: randomCountry,
        gender: randomGender,
        isConnected: true,
      });
      setIsConnecting(false);
      setIsConnected(true);
      startCallTimer();
    });

    socketConnection.on("stranger-disconnected", () => {
      handleEndCall();
    });

    socketConnection.on("offer", handleOffer);
    socketConnection.on("answer", handleAnswer);
    socketConnection.on("ice-candidate", handleIceCandidate);

    return () => {
      socketConnection.disconnect();
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
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

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };

    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return peerConnection;
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = createPeerConnection();
    }

    await peerConnectionRef.current.setRemoteDescription(offer);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });
    }

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    if (socket) {
      socket.emit("answer", answer);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(answer);
    }
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.addIceCandidate(candidate);
    }
  };

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);

      // Initialize media first
      await initializeMedia();

      // Create peer connection
      peerConnectionRef.current = createPeerConnection();

      // Add local stream to peer connection
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
        });
      }

      // In a real application, this would find a random stranger
      // For demo, we'll simulate finding a stranger
      if (socket) {
        socket.emit("find-stranger");
      } else {
        // Fallback simulation
        setTimeout(() => {
          setStrangerInfo({
            country: "India",
            gender: "Male",
            isConnected: true,
          });
          setIsConnecting(false);
          setIsConnected(true);
          startCallTimer();
        }, 3000);
      }
    } catch (error) {
      console.error("Error starting call:", error);
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Reset state
    setIsConnected(false);
    setIsConnecting(false);
    setCallDuration(0);
    setStrangerInfo({ country: "", gender: "", isConnected: false });

    // Clear timer
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    // Notify socket
    if (socket) {
      socket.emit("end-call");
    }
  };

  const handleSkipUser = () => {
    handleEndCall();
    setTimeout(() => {
      handleStartCall();
    }, 1000);
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

  if (!isConnected && !isConnecting) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Video Call"
          subtitle="Connect face-to-face with strangers worldwide"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Start Screen */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-12">
                <div className="text-center space-y-8">
                  <div className="p-8 bg-primary/10 rounded-full w-fit mx-auto">
                    <Video className="h-20 w-20 text-primary" />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold mb-4">
                      Start Video Chat
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Connect with strangers from around the world for
                      face-to-face conversations. Make sure your camera and
                      microphone are ready.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <Globe className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                      <h3 className="font-semibold mb-2">Global Connections</h3>
                      <p className="text-sm text-muted-foreground">
                        Meet people from 200+ countries
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <Users className="h-12 w-12 mx-auto mb-3 text-green-500" />
                      <h3 className="font-semibold mb-2">Instant Matching</h3>
                      <p className="text-sm text-muted-foreground">
                        Get connected within seconds
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <SkipForward className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                      <h3 className="font-semibold mb-2">Skip & Next</h3>
                      <p className="text-sm text-muted-foreground">
                        Move to next person anytime
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleStartCall}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-brand-purple hover:opacity-90 px-8"
                    >
                      <Video className="mr-2 h-5 w-5" />
                      Start Video Chat
                    </Button>

                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>Camera & mic required</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Must be 18+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Video Call"
        subtitle={
          isConnecting
            ? "Connecting..."
            : `Connected with stranger from ${strangerInfo.country}`
        }
      />

      <div className="relative h-[calc(100vh-4rem)] bg-black">
        {isConnecting ? (
          /* Connecting Screen */
          <div className="flex items-center justify-center h-full">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Finding someone to chat...
                    </h2>
                    <p className="text-muted-foreground">
                      Please wait while we connect you with a stranger
                    </p>
                  </div>
                  <Button onClick={handleEndCall} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Video Call Interface */
          <>
            {/* Remote Video (Main) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
              className="w-full h-full object-cover"
            />

            {/* Local Video (PiP) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden border-2 border-white/20">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
              {!isVideoOn && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <VideoOff className="h-8 w-8 text-white" />
                </div>
              )}
            </div>

            {/* Call Info */}
            <div className="absolute top-4 left-4">
              <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Connected</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(callDuration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{strangerInfo.country}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={toggleAudio}
                  size="lg"
                  variant={isAudioOn ? "secondary" : "destructive"}
                  className="rounded-full w-14 h-14 p-0"
                >
                  {isAudioOn ? (
                    <Mic className="h-6 w-6" />
                  ) : (
                    <MicOff className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  onClick={handleEndCall}
                  size="lg"
                  variant="destructive"
                  className="rounded-full w-16 h-16 p-0 bg-red-500 hover:bg-red-600"
                >
                  <PhoneOff className="h-8 w-8" />
                </Button>

                <Button
                  onClick={toggleVideo}
                  size="lg"
                  variant={isVideoOn ? "secondary" : "destructive"}
                  className="rounded-full w-14 h-14 p-0"
                >
                  {isVideoOn ? (
                    <Video className="h-6 w-6" />
                  ) : (
                    <VideoOff className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>

            {/* Skip Button */}
            <div className="absolute bottom-8 right-8">
              <Button
                onClick={handleSkipUser}
                variant="outline"
                className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
