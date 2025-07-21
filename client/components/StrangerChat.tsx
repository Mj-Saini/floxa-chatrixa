import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Send, X, Search, Users, MessageCircle, Clock, User } from 'lucide-react';

interface StrangerChatProps {
    onClose: () => void;
}

interface Message {
    content: string;
    sender: string;
    timestamp: Date;
}

interface StrangerChat {
    _id: string;
    participants: Array<{
        user: {
            _id: string;
            username: string;
            firstName?: string;
            lastName?: string;
            avatar?: string;
        };
    }>;
    messages: Message[];
    status: 'waiting' | 'active' | 'ended';
    startedAt: Date;
}

const StrangerChat: React.FC<StrangerChatProps> = ({ onClose }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isSearching, setIsSearching] = useState(false);
    const [currentChat, setCurrentChat] = useState<StrangerChat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState<number | null>(null);
    const [preferences, setPreferences] = useState({
        gender: 'any',
        ageRange: '18-25',
        interests: []
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const queuePollInterval = useRef<NodeJS.Timeout | null>(null);

    // Mock stranger data
    const mockStrangers = [
        {
            _id: 'stranger_1',
            username: 'Alex',
            firstName: 'Alex',
            lastName: 'Smith',
            avatar: '',
            isOnline: true
        },
        {
            _id: 'stranger_2',
            username: 'Sarah',
            firstName: 'Sarah',
            lastName: 'Johnson',
            avatar: '',
            isOnline: true
        },
        {
            _id: 'stranger_3',
            username: 'Mike',
            firstName: 'Mike',
            lastName: 'Davis',
            avatar: '',
            isOnline: true
        }
    ];

    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
            if (queuePollInterval.current) {
                clearInterval(queuePollInterval.current);
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSocketMessage = (data: any) => {
        // Mock socket message handling
        if (data.type === 'match_found') {
            setIsSearching(false);
            const mockChat: StrangerChat = {
                _id: `chat_${Date.now()}`,
                participants: [
                    {
                        user: {
                            _id: user?._id || '',
                            username: user?.username || '',
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            avatar: user?.avatar
                        }
                    },
                    {
                        user: mockStrangers[Math.floor(Math.random() * mockStrangers.length)]
                    }
                ],
                messages: [],
                status: 'active',
                startedAt: new Date()
            };
            setCurrentChat(mockChat);
            toast({
                title: "Match found!",
                description: "You are now connected with a stranger.",
            });
        }
    };

    const startSearching = async () => {
        try {
            setIsSearching(true);
            setQueuePosition(null);
            setEstimatedWaitTime(null);
            setCurrentChat(null);
            setMessages([]);

            // Mock queue position
            setQueuePosition(Math.floor(Math.random() * 10) + 1);
            setEstimatedWaitTime(Math.floor(Math.random() * 30) + 10);

            // Simulate finding a match after a random delay
            const matchDelay = Math.random() * 10000 + 5000; // 5-15 seconds
            searchTimeout.current = setTimeout(() => {
                if (isSearching && !currentChat) {
                    // Simulate match found
                    const mockChat: StrangerChat = {
                        _id: `chat_${Date.now()}`,
                        participants: [
                            {
                                user: {
                                    _id: user?._id || '',
                                    username: user?.username || '',
                                    firstName: user?.firstName,
                                    lastName: user?.lastName,
                                    avatar: user?.avatar
                                }
                            },
                            {
                                user: mockStrangers[Math.floor(Math.random() * mockStrangers.length)]
                            }
                        ],
                        messages: [],
                        status: 'active',
                        startedAt: new Date()
                    };
                    setCurrentChat(mockChat);
                    setIsSearching(false);
                    setQueuePosition(null);
                    setEstimatedWaitTime(null);
                    toast({
                        title: "Match found!",
                        description: "You are now connected with a stranger.",
                    });
                }
            }, matchDelay);

        } catch (error) {
            console.error('Error starting search:', error);
            toast({
                title: "Error",
                description: "Failed to start searching",
                variant: "destructive",
            });
            setIsSearching(false);
        }
    };

    const stopSearching = async () => {
        try {
            setIsSearching(false);
            setQueuePosition(null);
            setEstimatedWaitTime(null);
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
                searchTimeout.current = null;
            }

            toast({
                title: "Search stopped",
                description: "Stopped searching for strangers",
            });
        } catch (error) {
            console.error('Error stopping search:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !currentChat) return;

        try {
            // Add message locally
            const newMsg: Message = {
                content: newMessage,
                sender: user?._id || '',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');

            // Simulate stranger response after a delay
            setTimeout(() => {
                const strangerResponse: Message = {
                    content: getRandomResponse(),
                    sender: currentChat.participants[1].user._id,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, strangerResponse]);
            }, 1000 + Math.random() * 2000); // 1-3 second delay

        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: "Failed to send message",
                variant: "destructive",
            });
        }
    };

    const getRandomResponse = (): string => {
        const responses = [
            "That's interesting! Tell me more.",
            "I can relate to that.",
            "What do you think about that?",
            "That's cool!",
            "I see what you mean.",
            "That's a good point.",
            "Interesting perspective!",
            "I agree with you.",
            "That makes sense.",
            "What else is on your mind?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleEndChat = async () => {
        try {
            setCurrentChat(null);
            setMessages([]);
            toast({
                title: "Chat ended",
                description: "Stranger chat ended",
            });
        } catch (error) {
            console.error('Error ending chat:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                        <div>
                            <h2 className="font-semibold">Stranger Chat</h2>
                            <p className="text-sm text-muted-foreground">
                                Connect with random people
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex">
                    {!currentChat && !isSearching && (
                        <div className="flex-1 p-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Users className="h-5 w-5" />
                                        <span>Find a Stranger</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Gender Preference</label>
                                        <select
                                            className="w-full mt-1 p-2 border rounded-md"
                                            value={preferences.gender}
                                            onChange={(e) => setPreferences(prev => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <option value="any">Any</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Age Range</label>
                                        <select
                                            className="w-full mt-1 p-2 border rounded-md"
                                            value={preferences.ageRange}
                                            onChange={(e) => setPreferences(prev => ({ ...prev, ageRange: e.target.value }))}
                                        >
                                            <option value="18-25">18-25</option>
                                            <option value="26-35">26-35</option>
                                            <option value="36-45">36-45</option>
                                            <option value="46+">46+</option>
                                        </select>
                                    </div>
                                    <Button
                                        onClick={startSearching}
                                        className="w-full"
                                        disabled={isSearching}
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        Start Searching
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {isSearching && (
                        <div className="flex-1 p-6 flex items-center justify-center">
                            <Card className="w-full max-w-md">
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                    <div>
                                        <h3 className="font-semibold">Searching for strangers...</h3>
                                        {queuePosition && (
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Position in queue: {queuePosition}
                                            </p>
                                        )}
                                        {estimatedWaitTime && (
                                            <p className="text-sm text-muted-foreground">
                                                Estimated wait: {estimatedWaitTime} seconds
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={stopSearching}
                                        className="w-full"
                                    >
                                        Stop Searching
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {currentChat && (
                        <div className="flex-1 flex flex-col">
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={currentChat.participants[1].user.avatar} />
                                        <AvatarFallback>
                                            {currentChat.participants[1].user.firstName?.[0] || currentChat.participants[1].user.username[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{currentChat.participants[1].user.firstName || currentChat.participants[1].user.username}</p>
                                        <p className="text-sm text-muted-foreground">Stranger</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleEndChat}>
                                    End Chat
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === user?._id
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StrangerChat; 