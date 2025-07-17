import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share2, Facebook, Twitter, Mail, Send, MessageCircle, Info, ArrowLeft } from "lucide-react";

const SOCIALS = [
    {
        name: "WhatsApp",
        url: (code: string) => `https://wa.me/?text=Join%20me%20on%20ChatriXa!%20Use%20my%20referral%20code:%20${code}`,
        icon: <Send className="h-5 w-5 text-green-500" />,
    },
    {
        name: "Facebook",
        url: (code: string) => `https://www.facebook.com/sharer/sharer.php?u=https://chatrixa.com&quote=Join%20me%20on%20ChatriXa!%20Use%20my%20referral%20code:%20${code}`,
        icon: <Facebook className="h-5 w-5 text-blue-600" />,
    },
    {
        name: "Twitter",
        url: (code: string) => `https://twitter.com/intent/tweet?text=Join%20me%20on%20ChatriXa!%20Use%20my%20referral%20code:%20${code}`,
        icon: <Twitter className="h-5 w-5 text-sky-400" />,
    },
    {
        name: "Telegram",
        url: (code: string) => `https://t.me/share/url?url=https://chatrixa.com&text=Join%20me%20on%20ChatriXa!%20Use%20my%20referral%20code:%20${code}`,
        icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
    },
    {
        name: "Email",
        url: (code: string) => `mailto:?subject=Join%20me%20on%20ChatriXa!&body=Use%20my%20referral%20code:%20${code}%20to%20sign%20up%20at%20https://chatrixa.com`,
        icon: <Mail className="h-5 w-5 text-rose-500" />,
    },
];

export default function ReferFriend() {
    const [copied, setCopied] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const referralCode = "CHAT12345";
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (url: string) => {
        window.open(url, "_blank");
        setShowShare(false);
    };

    const handleBack = () => {
        if (showShare) {
            setShowShare(false);
        } else if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/wallet");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-center flex-1">Refer a Friend</h1>
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Refer a Friend</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label>Your Referral Code</Label>
                            <div className="flex items-center space-x-2 mt-2">
                                <Input value={referralCode} readOnly className="font-mono" />
                                <Button type="button" size="icon" variant="ghost" onClick={handleCopy} title="Copy">
                                    <Copy className={copied ? "text-green-500" : ""} />
                                </Button>
                                <Button type="button" size="icon" variant="ghost" onClick={() => setShowShare(true)} title="Share">
                                    <Share2 />
                                </Button>
                            </div>
                        </div>
                        {showShare && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                <div className="bg-background rounded-lg p-6 shadow-lg w-80">
                                    <h3 className="text-lg font-semibold mb-4 text-center">Share via</h3>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {SOCIALS.map((social) => (
                                            <Button
                                                key={social.name}
                                                variant="outline"
                                                className="flex items-center justify-center space-x-2"
                                                onClick={() => handleShare(social.url(referralCode))}
                                                title={social.name}
                                            >
                                                {social.icon}
                                                <span>{social.name}</span>
                                            </Button>
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="w-full" onClick={() => setShowShare(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="bg-muted/20 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">How Referral Works</h3>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                <li>Share your code with friends.</li>
                                <li>They sign up and enter your code.</li>
                                <li>You both earn bonus points after their first chat.</li>
                                <li>Track your referrals and rewards in your wallet.</li>
                            </ul>
                        </div>
                        {/* Referral Benefits Section */}
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Info className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-primary">Referral Benefits</span>
                            </div>
                            <ul className="list-disc pl-5 text-sm">
                                <li><span className="font-semibold">You earn:</span> <span className="text-green-600 font-bold">1000 coins</span> for every friend who signs up and chats.</li>
                                <li><span className="font-semibold">Your friend earns:</span> <span className="text-blue-600 font-bold">500 coins</span> as a welcome bonus.</li>
                                <li><span className="font-semibold">Gift Cards:</span> Redeem <span className="font-bold">10,000 coins</span> for a ₹100 gift card.</li>
                                <li><span className="font-semibold">Conversion Rate:</span> <span className="font-bold">100 coins = ₹1</span></li>
                                <li><span className="font-semibold">Top-up:</span> You can top-up your wallet with real money soon!</li>
                            </ul>
                            <Button variant="link" className="self-start px-0 mt-2" onClick={() => navigate('/wallet/about')}>
                                Learn more about Wallet & Coins
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 