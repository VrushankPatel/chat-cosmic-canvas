import React from 'react';
import { Search, Globe } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SearchToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const SearchToggle: React.FC<SearchToggleProps> = ({ enabled, onToggle }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-muted">
      <div className="flex items-center space-x-2">
        <Globe className="h-4 w-4 text-primary" />
        <Checkbox
          id="web-search"
          checked={enabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label 
          htmlFor="web-search" 
          className="text-sm font-medium cursor-pointer select-none"
        >
          Enable Web Search
        </Label>
      </div>
      
      {enabled && (
        <div className="flex items-center text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-md">
          <Search className="h-3 w-3 mr-1" />
          Web search active
        </div>
      )}
    </div>
  );
};