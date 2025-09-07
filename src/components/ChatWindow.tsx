import React, { useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { SearchToggle } from './SearchToggle';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you with a wide range of topics. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);

  const handleSendMessage = (content: string) => {
    // Get backend config from localStorage
    const backendConfig = JSON.parse(localStorage.getItem('backendConfig') || '{"type": "ollama", "port": 11434}');
    
    // Create payload as specified
    const payload = {
      query: content,
      webSearchEnabled,
      backend: backendConfig
    };
    
    console.log('Message payload:', payload);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${content}". This is a demo response. In the actual implementation, this would be processed by the ${backendConfig.type} backend running on port ${backendConfig.port}.${webSearchEnabled ? ' Web search was enabled for this query.' : ''}`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-chat-surface p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <SearchToggle
            enabled={webSearchEnabled}
            onToggle={setWebSearchEnabled}
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};