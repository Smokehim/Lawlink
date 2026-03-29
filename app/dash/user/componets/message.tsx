"use client"
import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, Send, User, Search, Loader2 } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'

const API_BASE = 'http://localhost:3002';

interface Conversation {
  conversation_id: number;
  lawyer_id: number;
  lawyer_name: string;
  lawyer_specialization: string;
  last_message: string;
  last_message_at: string;
  request_status?: string;
}

interface Message {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  sender_role: 'lawyer' | 'client' | 'admin';
  message_text: string;
  created_at: string;
}

export default function Message() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.conversation_id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchConversations = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/conversations/client/${user.userId}`);
      const data: Conversation[] = await res.json();
      if (!res.ok) throw new Error('Failed to fetch conversations');
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: number) => {
    try {
      const res = await fetch(`${API_BASE}/messages/${conversationId}`);
      const data: Message[] = await res.json();
      if (!res.ok) throw new Error('Failed to fetch messages');
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !newMessage.trim() || isSending || !user) return;

    try {
      setIsSending(true);
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: selectedConversation.conversation_id,
          sender_id: user.userId,
          sender_role: 'client',
          message_text: newMessage.trim()
        })
      });
      if (!res.ok) throw new Error('Failed to send message');
      setNewMessage('');
      fetchMessages(selectedConversation.conversation_id);
      fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.lawyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lawyer_specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-180px)] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-100 flex flex-col bg-gray-50/20">
        <div className="p-5 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search lawyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No conversations found.
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.conversation_id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-start space-x-3 border-b border-gray-50 transition-colors hover:bg-white ${
                  selectedConversation?.conversation_id === conv.conversation_id ? 'bg-white border-l-4 border-l-blue-600 shadow-sm' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-gray-900 truncate text-sm">{conv.lawyer_name}</h4>
                    <div className="flex flex-col items-end">
                      {conv.last_message_at && (
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{formatTime(conv.last_message_at)}</span>
                      )}
                      {conv.request_status === 'pending' && (
                        <span className="text-[8px] bg-amber-100 text-amber-700 px-1 rounded font-bold uppercase mt-0.5">Pending</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-600 font-medium truncate mb-1">
                    {conv.lawyer_specialization}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.last_message || "No messages yet"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            <div className="p-5 border-b border-gray-100 flex items-center bg-white">
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{selectedConversation.lawyer_name}</h3>
                <p className="text-xs text-blue-600 font-medium">{selectedConversation.lawyer_specialization}</p>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <MessageSquare className="w-12 h-12 text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm">No messages yet.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender_role === 'client';
                  return (
                    <div key={msg.message_id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                        }`}>
                          {msg.message_text}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 font-medium italic">
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              {selectedConversation.request_status === 'accepted' || (user as any)?.role === 'admin' ? (
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full pl-5 pr-14 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                    className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-200 transition-colors"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-xs font-medium">
                   You can send more messages once the lawyer accepts your request.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Your Messages</p>
            <p className="text-sm">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}