import React, { createContext, useContext, useState } from "react";
import { defaultConfigs, defaultMessages, language as defaultLanguage } from "@/config";
import { VoiceClientConfigOptions } from "realtime-ai";
import { useVoiceClient } from "realtime-ai-react";

type ConfigContextType = {
  config: typeof defaultConfigs['en'];
  messages: typeof defaultMessages['en'];
  setLanguage: (lang: 'en' | 'zh') => void;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'zh'>(defaultLanguage);
  const [config, setConfig] = useState(defaultConfigs[defaultLanguage]);
  const [messages, setMessages] = useState(defaultMessages[defaultLanguage]);
  const voiceClient = useVoiceClient();


  const setLanguage = (lang: 'en' | 'zh') => {
    console.log("setLanguage", lang);
    setSelectedLanguage(lang);
    setConfig(defaultConfigs[lang]);
    setMessages(defaultMessages[lang]);
    const updateOpts ={ useDeepMerge: true };
    voiceClient.updateConfig(defaultConfigs[lang], updateOpts);
    console.log("Updating config with:", defaultConfigs[lang]);
  };


  return (
    <ConfigContext.Provider value={{ config, messages, setLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
