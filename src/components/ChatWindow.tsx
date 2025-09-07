import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      content: 'Welcome to Bifrost! I\'m your professional AI assistant, ready to help with any questions or tasks. How can I assist you today?',
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
    
    console.log('Query received:', payload);
    
    // Add user message with animation
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate assistant response with delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Query received and processed through Bifrost. Your message: "${content}" has been analyzed using ${backendConfig.type} backend on port ${backendConfig.port}.${webSearchEnabled ? ' Web search capabilities were enabled for enhanced context.' : ' This query was processed locally without web search.'}`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                delay: index === messages.length - 1 ? 0.2 : 0,
                ease: "easeOut"
              }}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area with Glass Effect */}
      <motion.div 
        className="border-t border-border/50 bg-surface/50 backdrop-blur-xl p-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <SearchToggle
            enabled={webSearchEnabled}
            onToggle={setWebSearchEnabled}
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </motion.div>
    </div>
  );
};