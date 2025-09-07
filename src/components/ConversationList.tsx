import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

export const ConversationList: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<string>('1');
  
  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      title: 'Neural Architecture Design',
      timestamp: '2 hours ago',
      preview: 'Discussing optimal transformer architectures...'
    },
    {
      id: '2',
      title: 'Data Pipeline Optimization',
      timestamp: '1 day ago',
      preview: 'How to streamline ETL processes for ML...'
    },
    {
      id: '3',
      title: 'API Integration Strategy',
      timestamp: '3 days ago',
      preview: 'Best practices for microservices architecture...'
    }
  ];

  const handleNewConversation = () => {
    console.log('Creating new conversation...');
  };

  return (
    <div className="flex flex-col h-full">
      {/* New Conversation Button */}
      <motion.div 
        className="p-4 border-b border-sidebar-border/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Button 
          onClick={handleNewConversation}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-200 shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </motion.div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              onClick={() => setActiveConversation(conversation.id)}
              className={cn(
                "group flex items-start gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200",
                "hover:bg-sidebar-surface/60 glass-subtle",
                activeConversation === conversation.id 
                  ? "bg-sidebar-surface/80 border border-primary/20 shadow-sm" 
                  : ""
              )}
            >
              <MessageSquare className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-sidebar-foreground truncate">
                    {conversation.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-muted/60 transition-all duration-200"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1 font-medium">
                  {conversation.preview}
                </p>
                <p className="text-xs text-muted-foreground/80 mt-2">
                  {conversation.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};