import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { ThemeToggle } from './ThemeToggle';
import { ConfigPanel } from './ConfigPanel';
import { Settings, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppShell: React.FC = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-chat-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-sidebar flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              AI Assistant
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsConfigOpen(true)}
              className="text-sidebar-foreground hover:bg-sidebar-surface"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Conversation List */}
        <ConversationList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>

      {/* Configuration Panel */}
      <ConfigPanel 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
      />
    </div>
  );
};