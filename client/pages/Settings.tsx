import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function Settings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [theme, setTheme] = useState("system");
    const [privacy, setPrivacy] = useState("everyone");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSave = () => {
        // Placeholder for save logic
        alert("Settings saved!");
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/home");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-3xl font-bold text-center flex-1">Settings</h1>
                </div>
                {/* Account Settings */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <Button onClick={handleSave}>Save Account</Button>
                    </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="privacy">Who can contact you?</Label>
                            <Select value={privacy} onValueChange={setPrivacy}>
                                <SelectTrigger id="privacy">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="friends">Friends Only</SelectItem>
                                    <SelectItem value="noone">No one</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleSave}>Save Privacy</Button>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="pushNotifications">Push Notifications</Label>
                            <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                        </div>
                        <Button onClick={handleSave}>Save Notifications</Button>
                    </CardContent>
                </Card>

                {/* App Preferences */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>App Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger id="theme">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="system">System</SelectItem>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleSave}>Save Preferences</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 