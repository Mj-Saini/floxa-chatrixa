import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export default function WithdrawMoney() {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("upi");
    const [account, setAccount] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
    };

    const handleBack = () => {
        if (window.history.length > 1) {
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
                    <h1 className="text-2xl font-bold text-center flex-1">Withdraw Money</h1>
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle>Withdraw Money</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="text-center py-8">
                                <h2 className="text-2xl font-bold mb-2">Withdrawal Requested!</h2>
                                <p className="text-muted-foreground mb-4">Your withdrawal request has been submitted. Funds will be processed soon.</p>
                                <Button onClick={() => setSuccess(false)}>Make Another Withdrawal</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount to withdraw" required />
                                </div>
                                <div>
                                    <Label htmlFor="method">Payment Method</Label>
                                    <Select value={method} onValueChange={setMethod}>
                                        <SelectTrigger id="method">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="bank">Bank Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="account">{method === "upi" ? "UPI ID" : "Bank Account Number"}</Label>
                                    <Input id="account" value={account} onChange={e => setAccount(e.target.value)} placeholder={method === "upi" ? "Enter UPI ID" : "Enter Bank Account Number"} required />
                                </div>
                                <Button type="submit" className="w-full">Submit Withdrawal</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 