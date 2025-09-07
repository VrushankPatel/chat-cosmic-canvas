import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isGenerating) {
      setIsGenerating(true);
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset generating state after a delay (simulate processing)
      setTimeout(() => setIsGenerating(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    setIsGenerating(false);
    console.log('Stopping generation...');
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end gap-3 p-3 bg-background border border-input-border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-smooth">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground p-2"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        {/* Message Input */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isGenerating ? "AI is thinking..." : "Ask me anything..."}
          disabled={isGenerating}
          className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
        />

        {/* Send/Stop Button */}
        {isGenerating ? (
          <Button
            type="button"
            onClick={handleStop}
            size="sm"
            variant="secondary"
            className="rounded-xl px-3 py-2 h-8"
          >
            <Square className="h-3 w-3 mr-1" />
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!message.trim()}
            size="sm"
            className="rounded-xl px-3 py-2 h-8 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Send className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {/* Character count or tips */}
      <div className="flex justify-between items-center mt-2 px-1">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1 py-0.5 text-xs font-semibold bg-muted rounded">Enter</kbd> to send, <kbd className="px-1 py-0.5 text-xs font-semibold bg-muted rounded">Shift + Enter</kbd> for new line
        </p>
        <p className="text-xs text-muted-foreground">
          {message.length > 0 && `${message.length} characters`}
        </p>
      </div>
    </form>
  );
};