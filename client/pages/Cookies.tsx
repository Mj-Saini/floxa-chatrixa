import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, Shield, Settings, Eye, Database } from "lucide-react";

export default function Cookies() {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: Shield,
      description: "Required for basic website functionality",
      duration: "Session / 1 year",
      canDisable: false,
      purpose: [
        "User authentication and login sessions",
        "Security and fraud prevention",
        "Basic website functionality",
        "Remembering your preferences",
      ],
      examples: [
        "auth_token - Keeps you logged in",
        "csrf_token - Protects against security attacks",
        "session_id - Maintains your session",
      ],
    },
    {
      title: "Analytics Cookies",
      icon: Eye,
      description: "Help us understand how you use ChatFlow",
      duration: "2 years",
      canDisable: true,
      purpose: [
        "Understanding user behavior and preferences",
        "Measuring website performance",
        "Identifying popular features",
        "Improving user experience",
      ],
      examples: [
        "_ga - Google Analytics tracking",
        "mixpanel_events - User interaction tracking",
        "hotjar_session - User session recordings",
      ],
    },
    {
      title: "Functional Cookies",
      icon: Settings,
      description: "Remember your preferences and settings",
      duration: "1 year",
      canDisable: true,
      purpose: [
        "Remembering your language preference",
        "Storing your theme choice (dark/light)",
        "Maintaining chat notification settings",
        "Preserving your privacy preferences",
      ],
      examples: [
        "lang_pref - Your language setting",
        "theme_mode - Dark/light theme choice",
        "notification_settings - Your notification preferences",
      ],
    },
    {
      title: "Marketing Cookies",
      icon: Database,
      description: "Show you relevant advertisements",
      duration: "90 days",
      canDisable: true,
      purpose: [
        "Delivering personalized advertisements",
        "Measuring ad campaign effectiveness",
        "Building interest-based profiles",
        "Cross-platform ad targeting",
      ],
      examples: [
        "fb_pixel - Facebook advertising",
        "google_ads - Google advertising tracking",
        "twitter_conversion - Twitter ad tracking",
      ],
    },
  ];

  const thirdPartyServices = [
    {
      service: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataShared: "Usage statistics, page views, user interactions",
      privacy: "https://policies.google.com/privacy",
    },
    {
      service: "Mixpanel",
      purpose: "User behavior analytics and product insights",
      dataShared: "Feature usage, user journey, engagement metrics",
      privacy: "https://mixpanel.com/privacy",
    },
    {
      service: "Hotjar",
      purpose: "User experience optimization through heatmaps",
      dataShared: "Anonymous user interactions, page performance",
      privacy: "https://www.hotjar.com/privacy",
    },
    {
      service: "Facebook Pixel",
      purpose: "Social media advertising and conversion tracking",
      dataShared: "Website visits, conversion events",
      privacy: "https://www.facebook.com/privacy/policy",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Cookie className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            This Cookie Policy explains how ChatFlow uses cookies and similar
            technologies to provide, improve, and protect our services.
          </p>
        </div>

        {/* What are Cookies */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20 mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <Cookie className="h-6 w-6 text-primary" />
              <span>What are Cookies?</span>
            </h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              experience by remembering your preferences, keeping you logged in,
              and understanding how you use our service.
            </p>
            <p className="text-muted-foreground">
              We use both "session cookies" (which expire when you close your
              browser) and "persistent cookies" (which remain on your device
              until they expire or you delete them).
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <span>{type.title}</span>
                          <p className="text-sm text-muted-foreground font-normal">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-muted-foreground">
                          Duration: {type.duration}
                        </div>
                        <div
                          className={`font-medium ${type.canDisable ? "text-green-400" : "text-yellow-400"}`}
                        >
                          {type.canDisable ? "Optional" : "Required"}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Purpose</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {type.purpose.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Examples</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {type.examples.map((item, i) => (
                            <li
                              key={i}
                              className="font-mono text-xs bg-muted/20 p-1 rounded"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Third Party Services */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              We work with trusted third-party services that may also set
              cookies on your device. Here's what you need to know:
            </p>
            <div className="space-y-4">
              {thirdPartyServices.map((service, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/10 rounded-lg border border-border/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{service.service}</h4>
                    <a
                      href={service.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      Privacy Policy ↗
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {service.purpose}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Data shared:</strong> {service.dataShared}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Managing Your Cookie Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">ChatFlow Cookie Settings</h4>
              <p className="text-muted-foreground mb-4">
                You can manage your cookie preferences at any time through your
                account settings or by clicking the cookie banner when it
                appears.
              </p>
              <Button className="w-full sm:w-auto">
                <Settings className="mr-2 h-4 w-4" />
                Manage Cookie Preferences
              </Button>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Browser Settings</h4>
              <p className="text-muted-foreground mb-4">
                You can also control cookies through your browser settings.
                Here's how:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-muted/10 rounded">
                  <strong>Chrome:</strong> Settings → Privacy and security →
                  Cookies and other site data
                </div>
                <div className="p-3 bg-muted/10 rounded">
                  <strong>Firefox:</strong> Options → Privacy & Security →
                  Cookies and Site Data
                </div>
                <div className="p-3 bg-muted/10 rounded">
                  <strong>Safari:</strong> Preferences → Privacy → Manage
                  Website Data
                </div>
                <div className="p-3 bg-muted/10 rounded">
                  <strong>Edge:</strong> Settings → Site permissions → Cookies
                  and site data
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                ⚠️ Important Note
              </h4>
              <p className="text-sm text-muted-foreground">
                Disabling certain cookies may affect your experience on
                ChatFlow. Essential cookies cannot be disabled as they are
                required for the website to function properly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Legal Basis */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Legal Basis for Using Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Essential Cookies</h4>
              <p className="text-muted-foreground">
                Used based on our legitimate interest to provide you with our
                services and ensure website security and functionality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Optional Cookies</h4>
              <p className="text-muted-foreground">
                Used based on your consent, which you can withdraw at any time
                through your cookie preferences or browser settings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Retention</h4>
              <p className="text-muted-foreground">
                We retain cookie data only for as long as necessary to fulfill
                the purposes outlined in this policy or as required by law.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Cookie className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4">
              Questions About Cookies?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about our use of cookies or this policy,
              please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Privacy Team:</strong>{" "}
                <a
                  href="mailto:privacy@chatflow.com"
                  className="text-primary hover:underline"
                >
                  privacy@chatflow.com
                </a>
              </p>
              <p>
                <strong>General Contact:</strong>{" "}
                <a
                  href="mailto:support@chatflow.com"
                  className="text-primary hover:underline"
                >
                  support@chatflow.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
