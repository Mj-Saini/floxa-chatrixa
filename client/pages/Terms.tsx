import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle, Users } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing or using ChatFlow, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.",
        "These Terms of Service apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
        "We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.",
      ],
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You are responsible for safeguarding the password that you use to access the service and for all activities that occur under your account. You agree not to disclose your password to any third party.",
        "You must provide accurate, complete, and current information when creating your account. You agree to update your information to keep it accurate, complete, and current.",
        "You are responsible for all content posted and activity that occurs under your account. This includes conversations, shared files, and any other interactions within the service.",
        "You must be at least 13 years old to use ChatFlow. Users between 13-17 must have parental consent. We recommend parental supervision for all users under 18.",
      ],
    },
    {
      title: "Acceptable Use Policy",
      icon: Shield,
      content: [
        "You agree not to use ChatFlow for any unlawful purposes or to solicit others to perform unlawful acts. This includes but is not limited to harassment, bullying, or sharing illegal content.",
        "You may not use our service to transmit, distribute, or facilitate the distribution of content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.",
        "You agree not to impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.",
        "Spam, unsolicited messages, chain letters, pyramid schemes, and commercial solicitation are strictly prohibited.",
        "You may not attempt to gain unauthorized access to any portion of the service, other accounts, computer systems, or networks connected to any server through hacking, password mining, or any other means.",
      ],
    },
    {
      title: "Content and Intellectual Property",
      icon: FileText,
      content: [
        "The service and its original content, features, and functionality are and will remain the exclusive property of ChatFlow and its licensors. The service is protected by copyright, trademark, and other laws.",
        "You retain ownership of content you create and share through ChatFlow. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute such content in connection with the service.",
        "You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to publish the content you submit.",
        "You may not use our service to share copyrighted material without proper authorization. We will respond to valid DMCA takedown notices and may terminate accounts of repeat infringers.",
      ],
    },
    {
      title: "Privacy and Data Protection",
      icon: Shield,
      content: [
        "Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.",
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "You acknowledge that no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security of your information.",
        "We may use aggregated, anonymized data for analytics and service improvement purposes.",
      ],
    },
    {
      title: "Points System and Rewards",
      icon: Users,
      content: [
        "ChatFlow operates a points-based reward system. Points have no cash value and are not transferable except as explicitly allowed by the service.",
        "Points may be earned through various activities including daily logins, successful referrals, and active participation in the platform.",
        "Point conversion rates and withdrawal methods are subject to change at our discretion with reasonable notice.",
        "We reserve the right to modify, suspend, or terminate the points system at any time. Any accumulated points may be forfeited in case of account termination for violations of these terms.",
        "Withdrawal requests are subject to verification and approval processes. We reserve the right to decline fraudulent or suspicious withdrawal requests.",
      ],
    },
  ];

  const prohibitedActions = [
    "Creating fake accounts or impersonating others",
    "Sharing personal information of other users without consent",
    "Using the service for commercial purposes without authorization",
    "Attempting to hack, reverse engineer, or compromise the service",
    "Distributing malware, viruses, or other harmful code",
    "Engaging in activities that could harm minors",
    "Violating any applicable local, state, national, or international law",
    "Interfering with other users' enjoyment of the service",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Scale className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            These terms and conditions outline the rules and regulations for the
            use of ChatFlow's services. Please read them carefully.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 mb-12">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                  Important Notice
                </h3>
                <p className="text-sm text-muted-foreground">
                  By using ChatFlow, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please do not use our
                  service.
                </p>
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
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Prohibited Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <span>Prohibited Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              The following actions are strictly prohibited when using ChatFlow:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prohibitedActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-red-500/5 rounded-lg border border-red-500/20"
                >
                  <span className="text-red-400 mt-1">×</span>
                  <span className="text-sm text-muted-foreground">
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enforcement */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Enforcement and Violations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Warning System</h4>
              <p className="text-muted-foreground">
                We operate a progressive enforcement system. Minor violations
                may result in warnings, while serious violations may lead to
                immediate account suspension or termination.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Suspension</h4>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate accounts that
                violate these terms. Suspended accounts may lose access to
                accumulated points and premium features.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Appeals Process</h4>
              <p className="text-muted-foreground">
                If you believe your account was suspended in error, you may
                contact our support team within 30 days of the action. We will
                review all appeals fairly and respond within 7 business days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              ChatFlow is provided "as is" without warranties of any kind. We do
              not guarantee that the service will be uninterrupted, secure, or
              error-free.
            </p>
            <p className="text-muted-foreground">
              In no event shall ChatFlow, its directors, employees, partners,
              agents, suppliers, or affiliates be liable for any indirect,
              incidental, special, consequential, or punitive damages resulting
              from your use of the service.
            </p>
            <p className="text-muted-foreground">
              Our total liability for any claims arising from the use of
              ChatFlow shall not exceed the amount you have paid us in the 12
              months prior to such claim.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle>Governing Law and Disputes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Applicable Law</h4>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of California, United States, without
                regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dispute Resolution</h4>
              <p className="text-muted-foreground">
                Any disputes arising from these Terms or your use of ChatFlow
                shall be resolved through binding arbitration in accordance with
                the rules of the American Arbitration Association.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Jurisdiction</h4>
              <p className="text-muted-foreground">
                You agree to submit to the personal jurisdiction of the courts
                located in San Francisco, California for any actions not subject
                to arbitration.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-primary/10 to-brand-purple/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please
              contact our legal team.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Legal Department:</strong>{" "}
                <a
                  href="mailto:legal@chatflow.com"
                  className="text-primary hover:underline"
                >
                  legal@chatflow.com
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
              <p>
                <strong>Address:</strong> 123 Tech Street, San Francisco, CA
                94105, United States
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
