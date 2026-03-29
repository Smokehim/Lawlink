"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Send, MessageCircle, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

interface Message {
    message_id: number;
    sender_role: 'client' | 'lawyer' | 'admin';
    message_text: string;
    created_at: string;
}

export default function SupportForm() {
    const { user, token } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch messages for the existing support conversation
    useEffect(() => {
        if (!conversationId || !token) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`http://localhost:3002/messages/${conversationId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                    setTimeout(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            } catch (err) {
                console.error('Failed to fetch support messages:', err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [conversationId, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user || !token) return;

        setIsSending(true);
        try {
            const res = await fetch('http://localhost:3002/support/contact-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sender_id: user.userId,
                    sender_role: 'user',
                    message_text: message.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Failed to send message.');

            // Track the conversation for follow-up messages
            if (data.conversation_id) {
                setConversationId(data.conversation_id);
            }

            // Optimistically add message to the list
            setMessages(prev => [...prev, {
                message_id: Date.now(),
                sender_role: 'client',
                message_text: message.trim(),
                created_at: new Date().toISOString()
            }]);

            setMessage('');
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error: unknown) {
            console.error(`Failed to send support message:`, error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Support</h2>
                    <p className="text-sm text-gray-500">Our admin team will respond as soon as possible</p>
                </div>
            </div>

            {/* Message Thread */}
            {messages.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Conversation</span>
                    </div>
                    <div className="p-4 max-h-80 overflow-y-auto space-y-3">
                        {messages.map((msg) => {
                            const isMe = msg.sender_role === 'client';
                            return (
                                <div key={msg.message_id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    {!isMe && (
                                        <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
                                            A
                                        </div>
                                    )}
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMe
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap break-words">{msg.message_text}</p>
                                        <div className={`flex items-center mt-1 text-xs ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Send Message Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {messages.length === 0 && (
                    <div className="mb-5">
                        <h3 className="text-base font-semibold text-gray-800 mb-1">Send us a message</h3>
                        <p className="text-sm text-gray-500">
                            Having trouble? Describe your issue below and our admin team will get back to you.
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={messages.length > 0 ? "Write a follow-up message..." : "Describe your issue or question..."}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm transition-all"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Messages are reviewed by our admin team</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isSending || !message.trim()}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 shadow-sm shadow-blue-100"
                        >
                            {isSending ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : sent ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Sent!</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>{messages.length > 0 ? 'Reply' : 'Send Message'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}