"use client"
import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, Send, User, Shield, Search, Loader2 } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Conversation {
  conversation_id: number;
  participant_id: number;
  participant_role: 'client' | 'admin';
  participant_name: string;
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
  is_read: boolean;
}

export default function Messages() {
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
      const res = await fetch(`${API_BASE}/conversations/lawyer/${user.userId}`);
      const data: Conversation[] = await res.json();
      if (!res.ok) throw new Error('Failed to fetch conversations');
      setConversations(data);
      if (data.length > 0 && !selectedConversation) {
        // setSelectedConversation(data[0]);
      }
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
          sender_role: 'lawyer',
          message_text: newMessage.trim()
        })
      });
      if (!res.ok) throw new Error('Failed to send message');
      setNewMessage('');
      fetchMessages(selectedConversation.conversation_id);
      fetchConversations(); // Update last message in sidebar
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.participant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.participant_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-180px)] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
      {/* Sidebar - Conversation List */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/30">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Conversations</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No conversations found.</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.conversation_id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-start space-x-3 transition-all border-b border-gray-50 hover:bg-white ${
                  selectedConversation?.conversation_id === conv.conversation_id ? 'bg-white border-l-4 border-l-purple-600 shadow-sm' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  conv.participant_role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {conv.participant_role === 'admin' ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 truncate">{conv.participant_name}</h4>
                    <div className="flex flex-col items-end">
                      {conv.last_message_at && (
                        <span className="text-[10px] text-gray-400 uppercase font-bold">{formatTime(conv.last_message_at)}</span>
                      )}
                      {conv.request_status === 'pending' && (
                        <span className="text-[8px] bg-purple-100 text-purple-700 px-1 rounded font-bold uppercase mt-0.5">New Request</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-1 italic">
                    {conv.participant_role.charAt(0).toUpperCase() + conv.participant_role.slice(1)}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
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
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedConversation.participant_role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedConversation.participant_role === 'admin' ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{selectedConversation.participant_name}</h3>
                  <div className="flex items-center text-xs text-gray-500 font-medium">
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedConversation.participant_role === 'admin' ? 'bg-amber-400' : 'bg-green-400'}`}></span>
                    {selectedConversation.participant_role.charAt(0).toUpperCase() + selectedConversation.participant_role.slice(1)}
                    {selectedConversation.request_status === 'pending' && (
                      <span className="ml-3 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-tight">Pending Acceptance</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {selectedConversation.request_status === 'pending' && (
              <div className="bg-purple-50 p-3 px-6 flex items-center justify-between border-b border-purple-100">
                <p className="text-xs text-purple-800 font-medium italic">
                  This is a new client request. Accept it in the "Clients" section to enable the client to reply.
                </p>
              </div>
            )}

            {/* Messages Thread */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No messages yet with {selectedConversation.participant_name}.</p>
                  <p className="text-xs text-gray-400">Start the conversation below.</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isLawyer = msg.sender_role === 'lawyer';
                  const showDate = idx === 0 || new Date(messages[idx-1].created_at).toDateString() !== new Date(msg.created_at).toDateString();
                  
                  return (
                    <React.Fragment key={msg.message_id}>
                      {showDate && (
                        <div className="flex justify-center my-6">
                          <span className="bg-white px-4 py-1 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm border border-gray-100">
                            {new Date(msg.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isLawyer ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] group ${isLawyer ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm transition-all ${
                            isLawyer 
                              ? 'bg-purple-600 text-white rounded-tr-none' 
                              : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                          }`}>
                            {msg.message_text}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 font-semibold px-1">
                            {formatTime(msg.created_at)}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-6 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Type a message to ${selectedConversation.participant_name}...`}
                  className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="absolute right-3 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-200 transition-all shadow-lg shadow-purple-200 disabled:shadow-none"
                  title="Send"
                >
                  {isSending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 text-purple-600">
              <MessageSquare className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Inbox</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Select a conversation from the sidebar to view messages and start chatting with clients or admins.
            </p>
            {conversations.length === 0 && (
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 max-w-md">
                <p className="text-purple-700 text-sm font-semibold">
                  No active conversations yet.
                </p>
                <p className="text-purple-600/70 text-xs mt-1">
                  Once you accept a client request, a new conversation will appear in your list.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
