import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SearchToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const SearchToggle: React.FC<SearchToggleProps> = ({ enabled, onToggle }) => {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-surface-elevated/60 backdrop-blur-sm rounded-2xl border border-border/40 glass-subtle"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <Globe className="h-5 w-5 text-primary" />
        <div className="flex items-center space-x-3">
          <Checkbox
            id="web-search"
            checked={enabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-2 h-5 w-5"
          />
          <Label 
            htmlFor="web-search" 
            className="text-sm font-semibold cursor-pointer select-none"
          >
            Enable Web Search
          </Label>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: enabled ? 1 : 0, 
          scale: enabled ? 1 : 0.8 
        }}
        transition={{ duration: 0.2 }}
      >
        {enabled && (
          <div className="flex items-center text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 font-medium">
            <Search className="h-3 w-3 mr-2" />
            Web search active
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};