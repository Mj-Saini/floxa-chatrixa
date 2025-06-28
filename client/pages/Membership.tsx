import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Star,
  Zap,
  Shield,
  Users,
  MessageCircle,
  Video,
  Heart,
  Check,
  X,
  Sparkles,
  Trophy,
  Globe,
} from "lucide-react";

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "forever",
      color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      popular: false,
      features: [
        { text: "Basic text chat", included: true },
        { text: "Random matching", included: true },
        { text: "3 video calls per day", included: true },
        { text: "Basic rooms access", included: true },
        { text: "Ads supported", included: true },
        { text: "Priority matching", included: false },
        { text: "Gender filter", included: false },
        { text: "Country filter", included: false },
        { text: "Ad-free experience", included: false },
        { text: "Premium badge", included: false },
        { text: "Unlimited video calls", included: false },
        { text: "Private rooms", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹199",
      period: "per month",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      popular: true,
      features: [
        { text: "Everything in Free", included: true },
        { text: "Priority matching", included: true },
        { text: "Gender filter", included: true },
        { text: "Country filter", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Unlimited video calls", included: true },
        { text: "Private rooms", included: true },
        { text: "Chat history backup", included: true },
        { text: "Premium badge", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Advanced filters", included: false },
        { text: "VIP matching", included: false },
      ],
    },
    {
      id: "vip",
      name: "VIP",
      price: "₹499",
      period: "per month",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      popular: false,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "VIP matching (girls only)", included: true },
        { text: "Advanced interest filters", included: true },
        { text: "Custom profile themes", included: true },
        { text: "Priority in all rooms", included: true },
        { text: "Exclusive VIP rooms", included: true },
        { text: "Personal chat assistant", included: true },
        { text: "Custom emoji packs", included: true },
        { text: "Double earning rate", included: true },
        { text: "VIP badge & crown", included: true },
        { text: "Beta features access", included: true },
        { text: "Dedicated VIP support", included: true },
      ],
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast Matching",
      description: "Get connected with people instantly with priority matching",
      color: "text-yellow-500",
    },
    {
      icon: Shield,
      title: "Ad-Free Experience",
      description:
        "Enjoy uninterrupted conversations without any advertisements",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Advanced Filters",
      description: "Filter matches by gender, country, interests, and more",
      color: "text-blue-500",
    },
    {
      icon: Crown,
      title: "VIP Status",
      description: "Stand out with exclusive badges and premium features",
      color: "text-purple-500",
    },
    {
      icon: MessageCircle,
      title: "Unlimited Chats",
      description: "No limits on video calls, messages, or room access",
      color: "text-pink-500",
    },
    {
      icon: Trophy,
      title: "Exclusive Rooms",
      description: "Access to VIP-only rooms and premium content",
      color: "text-orange-500",
    },
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment partner.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! All new users get a 7-day free trial of Pro features when they first upgrade.",
    },
    {
      question: "How does VIP matching work?",
      answer:
        "VIP members get priority in matching queues and access to exclusive filters that help you connect with specific types of users.",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    console.log("Upgrading to:", plan?.name);
    // Handle payment flow
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Membership Plans"
        subtitle="Unlock premium features and enhance your chat experience"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Upgrade Your Experience</h1>
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of premium users enjoying ad-free conversations,
            priority matching, and exclusive features.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-muted/20 rounded-full w-fit mx-auto mb-4">
                    <Icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pricing Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-primary border-primary/50"
                    : ""
                } ${plan.popular ? "scale-105" : ""}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-3">
                  <div
                    className={`p-3 rounded-full w-fit mx-auto mb-3 ${plan.color}`}
                  >
                    {plan.id === "vip" ? (
                      <Crown className="h-8 w-8" />
                    ) : plan.id === "pro" ? (
                      <Zap className="h-8 w-8" />
                    ) : (
                      <Heart className="h-8 w-8" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">
                      /{plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }`}
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan.id);
                    }}
                  >
                    {plan.id === "free" ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upgrade Button */}
        {selectedPlan !== "free" && (
          <div className="text-center mb-12">
            <Button
              size="lg"
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-primary to-brand-purple hover:opacity-90 px-8"
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade to {plans.find((p) => p.id === selectedPlan)?.name}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              7-day free trial • Cancel anytime • Secure payment
            </p>
          </div>
        )}

        {/* FAQ Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{faq.question}</h4>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span className="text-sm">Trusted by 10M+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span className="text-sm">Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
