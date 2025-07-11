import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Globe, ArrowRight } from "lucide-react";

export default function GenderSelection() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleContinue = () => {
    if (!gender || !country) return;

    // Save user preferences
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userCountry", country);

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

  const userType = localStorage.getItem("userType");
  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-brand-pink rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Welcome to cHaTRiXa!
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Hi {username}! Let's personalize your experience
            </p>
            {userType === "guest" && (
              <Badge variant="secondary" className="mt-2">
                Guest User
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select your gender</label>
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
            <label className="text-sm font-medium flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Select your country
            </label>
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

          {userType === "guest" && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-orange-400 mb-2">Guest Access</h4>
              <p className="text-sm text-muted-foreground">
                As a guest user, you can access:
              </p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Text chat with strangers</li>
                <li>• Video calls</li>
                <li className="text-orange-400">• Limited features</li>
              </ul>
            </div>
          )}

          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={!gender || !country}
          >
            Continue to cHaTRiXa
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
