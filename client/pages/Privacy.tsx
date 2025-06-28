import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your email address, username, password (encrypted), and basic profile information such as age, gender, and country. This information helps us provide personalized matching and improve your experience.",
        },
        {
          subtitle: "Chat Data",
          text: "We temporarily store message metadata (timestamps, participants) for technical purposes but do not store the actual content of your conversations unless they are reported for safety violations. Video calls are peer-to-peer and not recorded or stored.",
        },
        {
          subtitle: "Usage Information",
          text: "We collect information about how you use ChatFlow, including features accessed, time spent in conversations, and general app usage patterns. This helps us improve our services and provide better matching.",
        },
        {
          subtitle: "Device Information",
          text: "We collect basic device information including IP address, browser type, operating system, and device identifiers for security and technical optimization purposes.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Globe,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide and maintain ChatFlow services, including user matching, conversation facilitation, and account management.",
        },
        {
          subtitle: "Safety and Security",
          text: "Your information helps us detect and prevent abuse, spam, and inappropriate behavior. We use automated systems and human moderators to maintain a safe environment.",
        },
        {
          subtitle: "Communication",
          text: "We may send you service-related notifications, security alerts, and optional marketing communications (which you can opt out of at any time).",
        },
        {
          subtitle: "Improvement and Analytics",
          text: "We analyze usage patterns to improve our services, develop new features, and understand user preferences while maintaining your privacy.",
        },
      ],
    },
    {
      title: "Information Sharing",
      icon: Eye,
      content: [
        {
          subtitle: "No Sale of Personal Data",
          text: "We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your privacy is not for sale.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share limited information with trusted service providers (hosting, analytics, payment processing) who help us operate ChatFlow. These providers are bound by strict confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or to protect the rights, property, or safety of ChatFlow, our users, or the public.",
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or business transfer, user information may be transferred as part of the transaction, subject to the same privacy protections.",
        },
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmission is encrypted using industry-standard TLS encryption. Passwords are hashed and salted using secure algorithms.",
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls ensuring only authorized personnel can access user data, and only for legitimate business purposes.",
        },
        {
          subtitle: "Security Monitoring",
          text: "Our systems are continuously monitored for security threats, and we maintain incident response procedures to address any potential breaches.",
        },
        {
          subtitle: "Data Minimization",
          text: "We collect and retain only the minimum amount of data necessary to provide our services effectively.",
        },
      ],
    },
  ];

  const rights = [
    {
      title: "Access Your Data",
      description:
        "Request a copy of all personal information we have about you.",
    },
    {
      title: "Correct Information",
      description:
        "Update or correct any inaccurate personal information in your account.",
    },
    {
      title: "Delete Your Account",
      description:
        "Request deletion of your account and associated personal data.",
    },
    {
      title: "Data Portability",
      description:
        "Request your data in a machine-readable format for transfer.",
    },
    {
      title: "Opt-Out",
      description:
        "Opt out of non-essential communications and certain data processing.",
    },
    {
      title: "Restrict Processing",
      description:
        "Request limitation of how we process your personal information.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            At ChatFlow, we take your privacy seriously. This policy explains
            how we collect, use, and protect your personal information when you
            use our services.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20 mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span>Privacy at a Glance</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">✅ We Do</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Encrypt all your data and communications</li>
                  <li>• Give you control over your information</li>
                  <li>• Use data only to improve your experience</li>
                  <li>• Protect your conversations from third parties</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">❌ We Don't</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sell your personal information</li>
                  <li>• Store your conversation content</li>
                  <li>• Share data without your consent</li>
                  <li>• Track you across other websites</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold mb-2">{item.subtitle}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Your Rights */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span>Your Privacy Rights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              You have the following rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rights.map((right, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/10 rounded-lg border border-border/30"
                >
                  <h4 className="font-semibold mb-2">{right.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm">
                <strong>How to Exercise Your Rights:</strong> Contact us at{" "}
                <a
                  href="mailto:privacy@chatflow.com"
                  className="text-primary hover:underline"
                >
                  privacy@chatflow.com
                </a>{" "}
                or through your account settings. We'll respond within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* International Users */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>International Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">GDPR Compliance (EU)</h4>
              <p className="text-muted-foreground">
                For users in the European Union, we comply with the General Data
                Protection Regulation (GDPR). You have additional rights
                including the right to object to processing and lodge complaints
                with supervisory authorities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                CCPA Compliance (California)
              </h4>
              <p className="text-muted-foreground">
                California residents have specific rights under the California
                Consumer Privacy Act (CCPA), including the right to know what
                personal information we collect and the right to delete personal
                information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Transfers</h4>
              <p className="text-muted-foreground">
                We may transfer your data internationally to provide our
                services. All transfers are protected by appropriate safeguards
                and comply with applicable data protection laws.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy or how we
              handle your data, please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Privacy Officer:</strong>{" "}
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
                  href="mailto:legal@chatflow.com"
                  className="text-primary hover:underline"
                >
                  legal@chatflow.com
                </a>
              </p>
              <p>
                <strong>Address:</strong> 123 Tech Street, San Francisco, CA
                94105, United States
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We'll notify you of
              any material changes by posting the updated policy on our website
              and, where appropriate, sending you a notification. The "Last
              updated" date at the top of this policy indicates when it was most
              recently revised.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
