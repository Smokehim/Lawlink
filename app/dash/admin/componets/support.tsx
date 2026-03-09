import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { MessageSquare, Send, Clock, Search, ShieldAlert } from 'lucide-react';

interface Conversation {
  conversation_id: number;
  participant_name: string;
  participant_role: 'client' | 'lawyer' | 'admin';
  last_message: string;
  last_message_at: string;
}

interface Message {
  message_id: number;
  sender_role: 'client' | 'lawyer' | 'admin';
  message_text: string;
  created_at: string;
}

export default function Support() {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch all conversations for the admin
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!user?.userId || !token) return;
        const response = await fetch(`http://localhost:3002/support/conversations/${user.userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Fetch conversations status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`Received ${data.length} conversations`);

          // Map the backend fields (sender_name, sender_role) to frontend interface (participant_name, participant_role)
          const formatted = data.map((c: { conversation_id: number; sender_name?: string; sender_role?: 'client' | 'lawyer' | 'admin'; last_message: string; last_message_at: string }) => ({
            conversation_id: c.conversation_id,
            participant_name: c.sender_name || 'Unknown',
            participant_role: c.sender_role || 'client',
            last_message: c.last_message,
            last_message_at: c.last_message_at
          }));

          setConversations(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch support conversations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [user, token]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3002/messages/${selectedConversation.conversation_id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Fetch messages status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`Received ${data.length} messages`);
          setMessages(data);
          scrollToBottom();
        }
      } catch (error) {
        console.error('Failed to fetch support messages', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [selectedConversation, token]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user) return;

    // Based on the endpoint workarounds (admins reply as 'lawyer' to clients, and as 'admin' to lawyers)
    const senderRole = selectedConversation.participant_role === 'client' ? 'lawyer' : 'admin';

    try {
      console.log(`Sending support reply to conversation: ${selectedConversation.conversation_id}`);
      const response = await fetch('http://localhost:3002/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          conversation_id: selectedConversation.conversation_id,
          sender_id: user.userId,
          sender_role: senderRole,
          message_text: newMessage
        })
      });

      console.log(`Send reply status: ${response.status}`);
      if (response.ok) {
        console.log("Support reply successfully sent");
        const newMsg = {
          message_id: Date.now(),
          sender_role: senderRole as 'client' | 'lawyer' | 'admin',
          message_text: newMessage,
          created_at: new Date().toISOString()
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const filteredConversations = conversations.filter(c =>
    c.participant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.last_message && c.last_message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-md h-[calc(100vh-8rem)] flex overflow-hidden">
      {/* Conversations List Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
            <ShieldAlert className="w-5 h-5 mr-2 text-indigo-600" />
            Support Inbox
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No support conversations yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.conversation_id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-4 hover:bg-gray-100 transition-colors ${selectedConversation?.conversation_id === conv.conversation_id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate pr-2">
                      {conv.participant_name}
                      <span className="text-xs font-normal text-gray-500 ml-2 py-0.5 px-2 bg-gray-200 rounded-full">
                        {conv.participant_role === 'client' ? 'User' : 'Lawyer'}
                      </span>
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(conv.last_message_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.last_message || 'No messages yet'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Area Header */}
            <div className="p-4 border-b border-gray-200 flex items-center bg-white">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                {selectedConversation.participant_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedConversation.participant_name}</h3>
                <p className="text-sm text-gray-500 capitalize">{selectedConversation.participant_role === 'client' ? 'User' : 'Lawyer'} Support</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Start the conversation</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isAdminReply =
                    (selectedConversation.participant_role === 'client' && msg.sender_role === 'lawyer') ||
                    (selectedConversation.participant_role === 'lawyer' && msg.sender_role === 'admin');

                  return (
                    <div
                      key={msg.message_id}
                      className={`flex ${isAdminReply ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${isAdminReply
                          ? 'bg-indigo-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm'
                          }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.message_text}</p>
                        <div
                          className={`flex items-center mt-1 text-xs ${isAdminReply ? 'text-indigo-200' : 'text-gray-400'
                            }`}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a support reply..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <ShieldAlert className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-600">Admin Support Inbox</p>
            <p className="text-sm">Select a conversation to assist users or lawyers</p>
          </div>
        )}
      </div>
    </div>
  );
}
