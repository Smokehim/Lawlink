"use client"
import React, { useState } from 'react'
import { MessageSquare } from 'lucide-react'

type Reply = { id: string; sender: string; content: string; date: string }
type MessageType = {
    id: string
    lawyerName: string
    content: string
    date: string
    lawyerId: string
    replies: Reply[]
}



const mockMessages: MessageType[] = [
    {
        id: '1',
        lawyerName: 'Sarah Banda',
        content: 'Thank you for reaching out. I have reviewed your case and I am available to discuss it further.',
        date: '2026-01-28',
        lawyerId: '1',
        replies: [],
    },
    {
        id: '2',
        lawyerName: 'James Phiri',
        content: 'I would be happy to help you with your family law matter. Please schedule a consultation.',
        date: '2026-01-27',
        lawyerId: '2',
        replies: [],
    },
];

export default function Message() {
    const [openComposer, setOpenComposer] = useState<string | null>(null)
    const [replyText, setReplyText] = useState<Record<string, string>>({})
    const [messages, setMessages] = useState<MessageType[]>(() =>
        mockMessages.map((m) => ({ ...m, replies: m.replies || [] }))
    )

    const handleSend = (messageId: string) => {
        const text = (replyText[messageId] || '').trim()
        if (!text) {
            alert('Please enter a message before sending.')
            return
        }

        // Create a mock reply object
        const newReply = {
            id: Date.now().toString(),
            sender: 'you',
            content: text,
            date: new Date().toISOString(),
        }

        // Append reply to the message in local state
        setMessages((prev) =>
            prev.map((m) => (m.id === messageId ? { ...m, replies: [...(m.replies || []), newReply] } : m))
        )

        // clear composer for that message
        setReplyText((prev) => ({ ...prev, [messageId]: '' }))
        setOpenComposer(null)
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{message.lawyerName}</h3>
                                <p className="text-sm text-gray-500">{message.date}</p>
                            </div>
                            <button
                                onClick={() => setOpenComposer(openComposer === message.id ? null : message.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                aria-label={`Reply to ${message.lawyerName}`}
                                title={`Reply to ${message.lawyerName}`}
                            >
                                Reply
                            </button>
                        </div>

                        <p className="text-gray-700">{message.content}</p>

                        {/* Render replies (including sent messages) */}
                        {message.replies && message.replies.length > 0 && (
                            <div className="mt-4 space-y-3">
                                {message.replies.map((r: { id: string; sender: string; content: string; date: string }) => (
                                    <div key={r.id} className="bg-gray-50 border rounded-md p-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-800">{r.sender === 'you' ? 'You' : message.lawyerName}</span>
                                            <span className="text-xs text-gray-500">{new Date(r.date).toLocaleString()}</span>
                                        </div>
                                        <div className="text-gray-700 mt-1">{r.content}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {openComposer === message.id && (
                            <div className="mt-4">
                                <label className="sr-only" htmlFor={`reply-${message.id}`}>
                                    Reply to {message.lawyerName}
                                </label>
                                <textarea
                                    id={`reply-${message.id}`}
                                    value={replyText[message.id] || ''}
                                    onChange={(e) =>
                                        setReplyText((prev) => ({ ...prev, [message.id]: e.target.value }))
                                    }
                                    rows={4}
                                    placeholder={`Write a message to ${message.lawyerName}...`}
                                    className="w-full border rounded-md p-2 mt-1 text-sm"
                                    aria-label={`Message to ${message.lawyerName}`}
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() => handleSend(message.id)}
                                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        title="Send message"
                                    >
                                        Send
                                    </button>
                                    <button
                                        onClick={() => setOpenComposer(null)}
                                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                        title="Cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {mockMessages.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No messages yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}