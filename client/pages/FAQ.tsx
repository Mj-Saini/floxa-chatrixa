import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageCircle, Users, Video } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I start chatting with strangers?",
          answer:
            "Simply click on 'Talk to Stranger' from the home page or navigation menu. You'll be instantly matched with someone online and ready to chat!",
        },
        {
          question: "Do I need to create an account?",
          answer:
            "No! You can start chatting immediately as a guest user. Just enter your name and you're ready to go. However, creating an account gives you access to additional features like friend lists, chat history, and points system.",
        },
        {
          question: "Is ChatFlow free to use?",
          answer:
            "Yes, ChatFlow is completely free to use. We also offer premium memberships with additional features like priority matching, no ads, and exclusive rooms.",
        },
      ],
    },
    {
      category: "Chat Features",
      icon: MessageCircle,
      questions: [
        {
          question: "Can I share files in chat?",
          answer:
            "Yes! You can share images, PDFs, and voice notes up to 5MB in size. File sharing is available in text chats and private rooms (not in video calls for safety reasons).",
        },
        {
          question: "How do I know if someone is typing?",
          answer:
            "You'll see a typing indicator when the other person is composing a message. This appears as '...' or 'User is typing' depending on your settings.",
        },
        {
          question: "Can I save my chat conversations?",
          answer:
            "Chat history is automatically saved for registered users. You can view your previous conversations in the 'Chat History' section of your profile.",
        },
      ],
    },
    {
      category: "Video Calls",
      icon: Video,
      questions: [
        {
          question: "How do video calls work?",
          answer:
            "Click 'Video Call' to be matched with a random person for face-to-face conversation. You can skip to the next person anytime or end the call.",
        },
        {
          question: "Is my video call private?",
          answer:
            "Yes, all video calls are peer-to-peer encrypted and not recorded or stored anywhere. Your privacy and safety are our top priorities.",
        },
        {
          question: "What if I have camera/microphone issues?",
          answer:
            "Make sure to allow camera and microphone permissions when prompted. Check your browser settings and ensure no other apps are using your camera/mic.",
        },
      ],
    },
    {
      category: "Rooms & Groups",
      icon: Users,
      questions: [
        {
          question: "What's the difference between public and private rooms?",
          answer:
            "Public rooms are open to everyone and visible in the room list. Private rooms require an invitation or room code to join and are not publicly listed.",
        },
        {
          question: "How many people can join a room?",
          answer:
            "Public rooms can have unlimited participants. Private rooms support up to 50 people, and group chats support up to 256 members.",
        },
        {
          question: "Can I moderate my own room?",
          answer:
            "Yes! As a room creator, you have admin privileges to remove users, change room settings, and manage the conversation.",
        },
      ],
    },
    {
      category: "Points & Rewards",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I earn points?",
          answer:
            "Earn points through daily logins, chatting time, referring friends, and completing special activities. Check your wallet for detailed earning history.",
        },
        {
          question: "Can I convert points to real money?",
          answer:
            "Yes! You can convert points to real currency. 1000 points = ₹10. Withdrawals are processed through UPI or bank transfer after admin verification.",
        },
        {
          question: "How does the referral system work?",
          answer:
            "Share your unique referral code with friends. When they sign up and verify their account, both you and your friend receive 1000 bonus points!",
        },
      ],
    },
    {
      category: "Safety & Privacy",
      icon: HelpCircle,
      questions: [
        {
          question: "How do you keep users safe?",
          answer:
            "We have automated moderation, user reporting systems, and 24/7 monitoring. Users can block, report, or skip inappropriate conversations instantly.",
        },
        {
          question: "What information do you collect?",
          answer:
            "We only collect basic profile information (name, age, country) and chat metadata for matching purposes. We never store conversation content unless reported for safety.",
        },
        {
          question: "Can I delete my account and data?",
          answer:
            "Absolutely! You can delete your account anytime from Settings. All your data will be permanently removed within 30 days as per our privacy policy.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about ChatFlow
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card
                key={categoryIndex}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-border/30"
                      >
                        <AccordionTrigger className="hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Contact Support
              </a>
              <a
                href="/community"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Join Community
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
