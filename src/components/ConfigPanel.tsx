import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Zap, Settings2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BackendConfig {
  type: 'ollama' | 'lmstudio';
  port: number;
}

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<BackendConfig>({
    type: 'ollama',
    port: 11434
  });

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('backendConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('backendConfig', JSON.stringify(config));
    console.log('Backend configuration saved:', config);
    onClose();
  };

  const handleBackendTypeChange = (type: 'ollama' | 'lmstudio') => {
    const defaultPorts = {
      ollama: 11434,
      lmstudio: 1234
    };
    
    setConfig({
      type,
      port: defaultPorts[type]
    });
  };

  const backendInfo = {
    ollama: {
      name: 'Ollama',
      description: 'Local AI models with Ollama',
      defaultPort: 11434,
      url: 'https://ollama.ai',
      icon: <Server className="h-4 w-4" />,
      color: 'bg-emerald-500'
    },
    lmstudio: {
      name: 'LM Studio',
      description: 'Local inference with LM Studio',
      defaultPort: 1234,
      url: 'https://lmstudio.ai',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-amber-500'
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md glass border-border/50 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Bifrost Configuration
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Backend Type Selection */}
                <div className="space-y-3">
                  <Label htmlFor="backend-type" className="text-sm font-semibold">
                    Backend Type
                  </Label>
                  <Select
                    value={config.type}
                    onValueChange={handleBackendTypeChange}
                  >
                    <SelectTrigger className="bg-surface-elevated/80 border-border/50">
                      <SelectValue placeholder="Select backend type" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-elevated/95 backdrop-blur-xl border-border/50">
                      <SelectItem value="ollama">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${backendInfo.ollama.color}`} />
                          Ollama
                        </div>
                      </SelectItem>
                      <SelectItem value="lmstudio">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${backendInfo.lmstudio.color}`} />
                          LM Studio
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Backend Info Card */}
                <Card className="bg-surface-elevated/60 border-border/40 glass-subtle">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      {backendInfo[config.type].icon}
                      {backendInfo[config.type].name}
                      <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary border-primary/20">
                        Port {config.port}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {backendInfo[config.type].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-xs text-muted-foreground font-medium">
                      Default endpoint: <code className="bg-muted/60 px-2 py-1 rounded border border-border/30 font-mono">
                        http://localhost:{config.port}
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {/* Port Configuration */}
                <div className="space-y-2">
                  <Label htmlFor="port" className="text-sm font-semibold">
                    Port Number
                  </Label>
                  <Input
                    id="port"
                    type="number"
                    value={config.port}
                    onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) || 0 })}
                    placeholder="Enter port number"
                    min="1"
                    max="65535"
                    className="bg-surface-elevated/80 border-border/50 font-medium"
                  />
                  <p className="text-xs text-muted-foreground font-medium">
                    Make sure your {backendInfo[config.type].name} server is running on this port.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={onClose} 
                    className="flex-1 bg-surface-elevated/60 border-border/50 hover:bg-surface-elevated/80"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    className="flex-1 bg-primary hover:bg-primary/90 font-semibold"
                  >
                    Save Configuration
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};