import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Coins,
  Gift,
  TrendingUp,
  Download,
  Upload,
  Clock,
} from "lucide-react";

export default function WalletPage() {
  const transactions = [
    {
      id: 1,
      type: "earned",
      description: "Daily login bonus",
      amount: 50,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "earned",
      description: "Friend referral",
      amount: 1000,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Withdrawal request",
      amount: -500,
      date: "2024-01-13",
      status: "pending",
    },
    {
      id: 4,
      type: "earned",
      description: "Chat time bonus",
      amount: 25,
      date: "2024-01-12",
      status: "completed",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your points and earnings
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-brand-purple/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <Coins className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold">1,250</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold">₹12.50</div>
              <div className="text-sm text-muted-foreground">Current Value</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-pink/10 to-brand-blue/10 border-brand-pink/20">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 mx-auto mb-4 text-brand-pink" />
              <div className="text-3xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">
                Successful Referrals
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button className="h-14 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Withdraw Money</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 flex items-center space-x-2"
          >
            <Gift className="h-5 w-5" />
            <span>Refer Friends</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Earn More Points</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-6 w-6" />
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "earned"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {transaction.type === "earned" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} points
                    </div>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 p-6 bg-muted/10 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                💰 Wallet Features Coming Soon
              </h3>
              <p className="text-muted-foreground mb-4">
                Full withdrawal system, referral tracking, and point conversion
                features are being developed.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>• Real money withdrawals via UPI/Bank</p>
                <p>• Referral bonus tracking</p>
                <p>• Daily login streak rewards</p>
                <p>• Chat activity bonuses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
