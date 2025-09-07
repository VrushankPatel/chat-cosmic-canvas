import React, { useState } from 'react';
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
      title: 'Web Development Tips',
      timestamp: '2 hours ago',
      preview: 'How to optimize React performance...'
    },
    {
      id: '2',
      title: 'AI and Machine Learning',
      timestamp: '1 day ago',
      preview: 'Explain neural networks in simple terms...'
    },
    {
      id: '3',
      title: 'Python Data Analysis',
      timestamp: '3 days ago',
      preview: 'Best practices for pandas dataframes...'
    }
  ];

  const handleNewConversation = () => {
    console.log('Creating new conversation...');
  };

  return (
    <div className="flex flex-col h-full">
      {/* New Conversation Button */}
      <div className="p-4 border-b border-border">
        <Button 
          onClick={handleNewConversation}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className={cn(
                "group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-smooth",
                "hover:bg-sidebar-surface",
                activeConversation === conversation.id 
                  ? "bg-sidebar-surface border border-sidebar-accent/20" 
                  : ""
              )}
            >
              <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-sidebar-foreground truncate">
                    {conversation.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-muted"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {conversation.preview}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {conversation.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};