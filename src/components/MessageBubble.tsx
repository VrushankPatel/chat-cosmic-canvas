import React from 'react';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={cn(
      "flex gap-4 max-w-4xl mx-auto",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "group relative max-w-[80%] rounded-2xl px-4 py-3 transition-smooth",
        isUser 
          ? "bg-user-message text-user-message-foreground ml-12" 
          : "bg-assistant-message text-assistant-message-foreground border border-border"
      )}>
        <div className="prose prose-sm max-w-none">
          <p className="mb-0 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2 text-xs hover:bg-muted"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs hover:bg-muted"
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs hover:bg-muted"
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        <div className={cn(
          "absolute text-xs text-muted-foreground mt-1",
          "opacity-0 group-hover:opacity-100 transition-smooth",
          isUser ? "right-4 -bottom-5" : "left-4 -bottom-5"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};