import React, { useState, useEffect } from 'react';
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
      color: 'bg-blue-500'
    },
    lmstudio: {
      name: 'LM Studio',
      description: 'Local inference with LM Studio',
      defaultPort: 1234,
      url: 'https://lmstudio.ai',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-purple-500'
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Backend Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Backend Type Selection */}
          <div className="space-y-3">
            <Label htmlFor="backend-type" className="text-sm font-medium">
              Backend Type
            </Label>
            <Select
              value={config.type}
              onValueChange={handleBackendTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select backend type" />
              </SelectTrigger>
              <SelectContent>
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                {backendInfo[config.type].icon}
                {backendInfo[config.type].name}
                <Badge variant="secondary" className="ml-auto">
                  Port {config.port}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                {backendInfo[config.type].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-muted-foreground">
                Default endpoint: <code className="bg-muted px-1 rounded">
                  http://localhost:{config.port}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Port Configuration */}
          <div className="space-y-2">
            <Label htmlFor="port" className="text-sm font-medium">
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
            />
            <p className="text-xs text-muted-foreground">
              Make sure your {backendInfo[config.type].name} server is running on this port.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};