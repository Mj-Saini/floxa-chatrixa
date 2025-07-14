import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, MessageCircle, Users, X, Star } from 'lucide-react';
import { toast } from 'sonner';

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
    const [isSearching, setIsSearching] = useState(false);
    const [currentChat, setCurrentChat] = useState<StrangerChat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState<number | null>(null);
    const [preferences, setPreferences] = useState({
        language: 'en',
        ageRange: { min: 18, max: 99 },
        gender: 'any' as 'male' | 'female' | 'any',
        interests: [] as string[]
    });

    const socketRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const queuePollInterval = useRef<NodeJS.Timeout | null>(null);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = new WebSocket(`ws://localhost:5000`);

        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
        };

        socketRef.current.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            handleSocketMessage(data);
        };

        socketRef.current.onerror = (error: any) => {
            console.error('WebSocket error:', error);
            toast.error('Connection error');
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (queuePollInterval.current) {
                clearInterval(queuePollInterval.current);
            }
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, []);

    const handleSocketMessage = (data: any) => {
        switch (data.type) {
            case 'match-found':
                setIsSearching(false);
                setCurrentChat(data.chat);
                setMessages(data.chat.messages || []);
                setQueuePosition(null);
                setEstimatedWaitTime(null);
                if (queuePollInterval.current) {
                    clearInterval(queuePollInterval.current);
                }
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                    setSearchTimeout(null);
                }
                toast.success('Match found! You are now connected with a stranger.');
                break;
            case 'stranger-message-received':
                setMessages(prev => [...prev, data]);
                break;
            case 'stranger-chat-ended':
                toast.info('Your stranger chat partner has ended the conversation.');
                handleEndChat();
                break;
            case 'queue-update':
                setQueuePosition(data.position);
                setEstimatedWaitTime(data.estimatedWaitTime);
                break;
        }
    };

    const startSearching = async () => {
        try {
            setIsSearching(true);
            setQueuePosition(null);
            setEstimatedWaitTime(null);
            setCurrentChat(null);
            setMessages([]);

            // Join queue via API
            const response = await fetch('/api/stranger/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(preferences)
            });

            const data = await response.json();

            if (data.matchFound && data.chat) {
                setIsSearching(false);
                setCurrentChat(data.chat);
                setMessages(data.chat.messages || []);
                toast.success('Match found! You are now connected with a stranger.');
            } else {
                // Join WebSocket queue
                if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    socketRef.current.send(JSON.stringify({
                        type: 'join-stranger-queue',
                        userId: user?._id,
                        preferences
                    }));
                }

                // Start polling for queue status
                startQueuePolling();

                // Set a timeout for searching (e.g., 30 seconds)
                const timeout = setTimeout(() => {
                    if (isSearching && !currentChat) {
                        setIsSearching(false);
                        if (queuePollInterval.current) {
                            clearInterval(queuePollInterval.current);
                            queuePollInterval.current = null;
                        }
                        toast.info('No one is available right now. Please try again later.');
                    }
                }, 30000); // 30 seconds
                setSearchTimeout(timeout);
            }
        } catch (error) {
            console.error('Error starting search:', error);
            toast.error('Failed to start searching');
            setIsSearching(false);
        }
    };

    const startQueuePolling = () => {
        // Poll immediately
        pollQueueStatus();

        // Then poll every 5 seconds
        queuePollInterval.current = setInterval(pollQueueStatus, 5000);
    };

    const stopSearching = async () => {
        try {
            setIsSearching(false);
            setQueuePosition(null);
            setEstimatedWaitTime(null);
            if (searchTimeout) {
                clearTimeout(searchTimeout);
                setSearchTimeout(null);
            }

            // Leave queue via API
            await fetch('/api/stranger/leave', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Leave WebSocket queue
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                    type: 'leave-stranger-queue',
                    userId: user?._id
                }));
            }

            // Stop polling
            if (queuePollInterval.current) {
                clearInterval(queuePollInterval.current);
                queuePollInterval.current = null;
            }

            toast.info('Stopped searching for strangers');
        } catch (error) {
            console.error('Error stopping search:', error);
        }
    };

    const pollQueueStatus = async () => {
        if (!isSearching) return;

        try {
            const response = await fetch('/api/stranger/queue-status', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setQueuePosition(data.position);
                setEstimatedWaitTime(data.estimatedWaitTime);
            } else if (response.status === 404) {
                // User is no longer in queue (probably matched)
                setIsSearching(false);
                if (queuePollInterval.current) {
                    clearInterval(queuePollInterval.current);
                    queuePollInterval.current = null;
                }
            }
        } catch (error) {
            console.error('Error polling queue status:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !currentChat) return;

        try {
            const messageData = {
                content: newMessage,
                chatId: currentChat._id
            };

            // Send via API
            await fetch('/api/stranger/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(messageData)
            });

            // Send via WebSocket
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                    type: 'stranger-message',
                    userId: user?._id,
                    ...messageData
                }));
            }

            // Add message locally
            const newMsg: Message = {
                content: newMessage,
                sender: user?._id || '',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        }
    };

    const handleEndChat = async () => {
        try {
            if (currentChat) {
                await fetch('/api/stranger/end', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        rating: 5,
                        reportReason: ''
                    })
                });
            }

            setCurrentChat(null);
            setMessages([]);
            toast.info('Stranger chat ended');
        } catch (error) {
            console.error('Error ending chat:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Stranger Chat
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                    {!currentChat && !isSearching && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Connect with Strangers</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start a random conversation with someone from around the world
                                </p>
                            </div>

                            <div className="w-full max-w-md space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Gender Preference</label>
                                    <select
                                        value={preferences.gender}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, gender: e.target.value as any }))}
                                        className="w-full mt-1 p-2 border rounded-md"
                                    >
                                        <option value="any">Any</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Age Range</label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={preferences.ageRange.min}
                                            onChange={(e) => setPreferences(prev => ({
                                                ...prev,
                                                ageRange: { ...prev.ageRange, min: parseInt(e.target.value) }
                                            }))}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={preferences.ageRange.max}
                                            onChange={(e) => setPreferences(prev => ({
                                                ...prev,
                                                ageRange: { ...prev.ageRange, max: parseInt(e.target.value) }
                                            }))}
                                        />
                                    </div>
                                </div>

                                <Button onClick={startSearching} className="w-full">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Start Searching
                                </Button>
                            </div>
                        </div>
                    )}

                    {isSearching && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Searching for Strangers...</h3>
                                {queuePosition && (
                                    <p className="text-muted-foreground">
                                        Position in queue: {queuePosition}
                                    </p>
                                )}
                                {estimatedWaitTime && (
                                    <p className="text-muted-foreground">
                                        Estimated wait time: {Math.ceil(estimatedWaitTime / 60)} minutes
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground mt-2">
                                    We're looking for someone who matches your preferences...
                                </p>
                            </div>
                            <Button variant="outline" onClick={stopSearching}>
                                Stop Searching
                            </Button>
                        </div>
                    )}

                    {currentChat && (
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-md">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">Active</Badge>
                                    <span className="text-sm text-muted-foreground">
                                        Connected with a stranger
                                    </span>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleEndChat}>
                                    End Chat
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        <p>Start the conversation!</p>
                                    </div>
                                ) : (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs p-3 rounded-lg ${message.sender === user?._id
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {new Date(message.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1"
                                />
                                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StrangerChat; 