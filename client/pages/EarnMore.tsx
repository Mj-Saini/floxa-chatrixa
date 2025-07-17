import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Gift, TrendingUp, MessageCircle, UserPlus, Calendar, User, Users, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EarnMore() {
    const navigate = useNavigate();
    const methods = [
        {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            title: "Daily Login",
            description: "Earn points every day you log in to the app.",
        },
        {
            icon: <MessageCircle className="h-6 w-6 text-green-500" />,
            title: "Chat Bonuses",
            description: "Get bonus points for active chatting and making new friends.",
        },
        {
            icon: <UserPlus className="h-6 w-6 text-brand-pink" />,
            title: "Refer Friends",
            description: "Invite friends and earn points when they join and chat.",
        },
        {
            icon: <Gift className="h-6 w-6 text-yellow-500" />,
            title: "Special Events",
            description: "Participate in events and challenges for extra rewards.",
        },
        {
            icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
            title: "Level Up",
            description: "Earn more as you reach higher levels and achievements.",
        },
        // Additional tasks
        {
            icon: <User className="h-6 w-6 text-blue-500" />,
            title: "Complete Your Profile",
            description: "Fill out your profile details to earn a one-time bonus.",
        },
        {
            icon: <UserPlus className="h-6 w-6 text-green-600" />,
            title: "Invite 3 Friends",
            description: "Get extra points for inviting at least 3 friends.",
        },
        {
            icon: <Users className="h-6 w-6 text-orange-500" />,
            title: "Join a Group Chat",
            description: "Earn points by joining your first group chat.",
        },
        {
            icon: <Send className="h-6 w-6 text-pink-500" />,
            title: "Send Your First Message",
            description: "Get a bonus for sending your first message in any chat.",
        },
    ];

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/wallet");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-3xl font-bold text-center flex-1">Earn More Points</h1>
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Earn More Points</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {methods.map((method, idx) => (
                            <div key={idx} className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
                                {method.icon}
                                <div>
                                    <div className="font-semibold">{method.title}</div>
                                    <div className="text-sm text-muted-foreground">{method.description}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 