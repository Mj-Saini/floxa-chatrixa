import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coins, Gift, TrendingUp, UserPlus, Info, Wallet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AboutWallet() {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-3xl font-bold text-center flex-1">About Wallet & Coins</h1>
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wallet className="h-6 w-6 text-primary" /> What are Coins?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">Coins are the in-app currency of ChatriXa. Earn coins by being active, referring friends, and participating in events. Use coins to redeem rewards and gift cards.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-green-500" /> How to Earn Coins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Daily login bonus</li>
                            <li>Active chatting and making new friends</li>
                            <li>Referring friends to ChatriXa</li>
                            <li>Participating in special events and challenges</li>
                            <li>Leveling up and reaching achievements</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserPlus className="h-6 w-6 text-blue-500" /> Referral Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><span className="font-semibold">You earn:</span> <span className="text-green-600 font-bold">1000 coins</span> for every friend who signs up and chats.</li>
                            <li><span className="font-semibold">Your friend earns:</span> <span className="text-blue-600 font-bold">500 coins</span> as a welcome bonus.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gift className="h-6 w-6 text-yellow-500" /> Gift Card Redemption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Redeem <span className="font-bold">10,000 coins</span> for a <span className="font-bold">₹100 gift card</span>.</li>
                            <li>Gift cards can be used for shopping, recharges, and more.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Coins className="h-6 w-6 text-purple-500" /> Coin Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">100 coins = ₹1</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Info className="h-6 w-6 text-primary" /> Top-up & More</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>You will soon be able to top-up your wallet with real money.</li>
                            <li>More redemption options and features coming soon!</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 