import { useState, useEffect } from 'react';
import { AppConfig } from '@/types';

const DEFAULT_CONFIG: AppConfig = {
  backend: {
    type: 'ollama',
    port: 11434
  },
  theme: {
    accentColor: 'emerald' // emerald, blue, purple, amber, rose, indigo
  },
  webSearchEnabled: false
};

export const useAppConfig = () => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      // Try to load from backend first
      const backendConfig = JSON.parse(localStorage.getItem('backendConfig') || '{"type": "ollama", "port": 11434}');
      const response = await fetch(`http://localhost:${backendConfig.port}/api/config`);
      
      if (response.ok) {
        const serverConfig = await response.json();
        setConfig(serverConfig);
        // Cache in localStorage
        localStorage.setItem('appConfig', JSON.stringify(serverConfig));
        return;
      }
    } catch (error) {
      console.log('Loading config from localStorage - backend not available:', error);
    }

    // Fallback to localStorage
    const localConfig = localStorage.getItem('appConfig');
    if (localConfig) {
      setConfig(JSON.parse(localConfig));
    } else {
      // Apply default config
      setConfig(DEFAULT_CONFIG);
      localStorage.setItem('appConfig', JSON.stringify(DEFAULT_CONFIG));
    }
  };

  const updateConfig = async (newConfig: Partial<AppConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    
    try {
      // Try to save to backend first
      const response = await fetch(`http://localhost:${config.backend.port}/api/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig)
      });

      if (response.ok) {
        setConfig(updatedConfig);
        localStorage.setItem('appConfig', JSON.stringify(updatedConfig));
        return;
      }
    } catch (error) {
      console.log('Saving config to localStorage - backend not available:', error);
    }

    // Fallback to localStorage only
    setConfig(updatedConfig);
    localStorage.setItem('appConfig', JSON.stringify(updatedConfig));
  };

  const updateTheme = (accentColor: string) => {
    updateConfig({ theme: { accentColor } });
  };

  const updateBackend = (backend: AppConfig['backend']) => {
    updateConfig({ backend });
    // Also update legacy backendConfig for backward compatibility
    localStorage.setItem('backendConfig', JSON.stringify(backend));
  };

  const toggleWebSearch = () => {
    updateConfig({ webSearchEnabled: !config.webSearchEnabled });
  };

  return {
    config,
    updateConfig,
    updateTheme,
    updateBackend,
    toggleWebSearch,
    loadConfig
  };
};