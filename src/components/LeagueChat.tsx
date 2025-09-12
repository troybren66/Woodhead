"use client"
import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Troy',
    message: 'Josh Allen is going off this week! 🔥',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    user: 'Mike',
    message: 'That trade for McCaffrey was huge for my team',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: '3',
    user: 'System',
    message: 'Troy submitted their Week 3 lineup',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isSystem: true
  },
  {
    id: '4',
    user: 'Sarah',
    message: 'Anyone else struggling with their RB situation?',
    timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  }
];

export default function LeagueChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState('Troy'); // In real app, this would come from auth
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: currentUser,
      message: newMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700 bg-gray-900/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">League Chat</h2>
          <div className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {messages.length} messages
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.user === currentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.user === currentUser ? 'order-2' : 'order-1'}`}>
              {!message.isSystem && message.user !== currentUser && (
                <div className="text-xs text-gray-400 mb-1 ml-1">
                  {message.user}
                </div>
              )}
              
              <div className={`rounded-2xl px-4 py-3 ${
                message.isSystem 
                  ? 'bg-gray-700/50 text-gray-300 text-center text-sm italic'
                  : message.user === currentUser
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-gray-700 text-white'
              }`}>
                <div className="break-words">{message.message}</div>
                <div className={`text-xs mt-1 ${
                  message.user === currentUser ? 'text-cyan-100' : 'text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.user === currentUser && !message.isSystem && (
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {formatDate(message.timestamp)}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 sm:p-6 border-t border-gray-700 bg-gray-900/30">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 text-sm sm:text-base"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
          >
            Send
          </button>
        </form>
        <div className="text-xs text-gray-400 mt-2 text-center">
          {newMessage.length}/500 characters
        </div>
      </div>
    </div>
  );
} 