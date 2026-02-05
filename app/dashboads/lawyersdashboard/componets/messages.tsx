"use client"
import React, { useState } from 'react'
import { MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react'

type MessageStatus = 'received' | 'sending' | 'approved'
type ClientMessage = {
  id: string
  clientName: string
  clientEmail: string
  content: string
  date: string
  status: MessageStatus
}

type Reply = {
  id: string
  sender: string
  content: string
  date: string
  status: MessageStatus
}

type MessageWithReplies = ClientMessage & {
  replies: Reply[]
}

interface MessagesProps {
  messages: MessageWithReplies[];
  onMessagesChange: (messages: MessageWithReplies[]) => void;
}

export default function Messages({ messages, onMessagesChange }: MessagesProps) {
  const [displayMessages, setDisplayMessages] = useState<MessageWithReplies[]>(() => messages)
  const [openComposer, setOpenComposer] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [sendingId, setSendingId] = useState<string | null>(null)

  const handleSendReply = (messageId: string) => {
    const text = (replyText[messageId] || '').trim()
    if (!text) {
      alert('Please enter a message before sending.')
      return
    }

    // Set sending state
    setSendingId(messageId)

    // Simulate sending delay
    setTimeout(() => {
      const newReply: Reply = {
        id: Date.now().toString(),
        sender: 'lawyer',
        content: text,
        date: new Date().toISOString(),
        status: 'approved',
      }

      const updatedMessages = displayMessages.map((m) =>
        m.id === messageId
          ? { ...m, replies: [...(m.replies || []), newReply] }
          : m
      )
      setDisplayMessages(updatedMessages)
      onMessagesChange(updatedMessages)

      setReplyText((prev) => ({ ...prev, [messageId]: '' }))
      setSendingId(null)
      setOpenComposer(null)
    }, 1500)
  }

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Messages from Clients</h2>
      <div className="space-y-6">
        {displayMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Client Message */}
            <div className="mb-4 pb-4 border-b">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{message.clientName}</h3>
                  <p className="text-sm text-gray-500">{message.clientEmail}</p>
                  <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                </div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  New
                </span>
              </div>
              <p className="text-gray-700 mt-2">{message.content}</p>
            </div>

            {/* Lawyer Replies */}
            {message.replies && message.replies.length > 0 && (
              <div className="mb-4 space-y-3">
                {message.replies.map((reply) => (
                  <div key={reply.id} className="bg-purple-50 border border-purple-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">Your Response</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(reply.status)}
                        <span className="text-xs text-gray-500">
                          {reply.status === 'sending' ? 'Sending...' : 'Approved'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mt-2">{reply.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(reply.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Composer */}
            {openComposer === message.id && (
              <div className="mt-4 space-y-3">
                <label className="sr-only" htmlFor={`reply-${message.id}`}>
                  Reply to {message.clientName}
                </label>
                <textarea
                  id={`reply-${message.id}`}
                  value={replyText[message.id] || ''}
                  onChange={(e) =>
                    setReplyText((prev) => ({ ...prev, [message.id]: e.target.value }))
                  }
                  rows={4}
                  placeholder={`Write a response to ${message.clientName}...`}
                  className="w-full border rounded-md p-2 text-sm"
                  aria-label={`Message to ${message.clientName}`}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSendReply(message.id)}
                    disabled={sendingId === message.id}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
                    title="Send reply"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sendingId === message.id ? 'Sending...' : 'Send'}</span>
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

            {/* Reply Button */}
            {openComposer !== message.id && (
              <button
                onClick={() => setOpenComposer(message.id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                title={`Reply to ${message.clientName}`}
              >
                Reply
              </button>
            )}
          </div>
        ))}

        {displayMessages.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No messages from clients yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
