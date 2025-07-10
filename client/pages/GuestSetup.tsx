import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Globe, ArrowRight, UserPlus } from "lucide-react";

export default function GuestSetup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleContinue = () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }
    if (!gender || !country) {
      alert("Please select your gender and country");
      return;
    }

    // Save guest user data
    localStorage.setItem("userType", "guest");
    localStorage.setItem("username", username);
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userCountry", country);
    localStorage.setItem("isAuthenticated", "true");

    // Redirect to home
    navigate("/home");
  };

  const countries = [
    "India",
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Mexico",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "South Korea",
    "Singapore",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Guest Access Setup
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Let's get you started with guest access
            </p>
            <Badge
              variant="secondary"
              className="mt-2 bg-orange-500/20 text-orange-400"
            >
              Limited Features
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="guest-username">Choose a username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guest-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select your gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Select your country
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((countryName) => (
                  <SelectItem key={countryName} value={countryName}>
                    {countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-medium text-orange-400 mb-2">Guest Features</h4>
            <p className="text-sm text-muted-foreground mb-2">
              As a guest, you can access:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Text chat with strangers
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Video calls
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✗</span>
                Personal chats & groups (register required)
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✗</span>
                Profile & wallet features
              </li>
            </ul>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={!username.trim() || !gender || !country}
          >
            Start Chatting as Guest
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Want full features?</p>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-primary border-primary/20 hover:bg-primary/10"
            >
              Create Account Instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
