import React from "react";
import { VoiceClientConfigOptions } from "realtime-ai";
import { useVoiceClient } from "realtime-ai-react";

import { getTTSVoices, TTSModel, Voice , updateTTSConfig, defaultConfig } from "@/config";

import ModelSelect from "./ModelSelect";
import VoiceSelect from "./VoiceSelect";
import TTSModelSelect from "./TTSModelSelect";
import { useConfig } from "../Setup/ConfigContext"; 
 
const Configuration: React.FC<{ showAllOptions: boolean }> = ({
  showAllOptions = false,
}) => {
  const { messages } = useConfig();

  const voiceClient = useVoiceClient()!;

  const updateConfig = (config: VoiceClientConfigOptions) => {
    const updateOpts =
      voiceClient.state === "ready"
        ? { sendPartial: true }
        : { useDeepMerge: true };
    console.log("Updating config with:", config);

    voiceClient.updateConfig(config, updateOpts);
  };

  const handleVoiceChange = (voice: Voice) => {
    updateConfig({
      tts: { voice: voice.id },
    });

    // Prompt the LLM to speak
    voiceClient.appendLLMContext(
      messages.voice_change
    );
  };

  const handleModelChange = (model: string) => {
    updateConfig({
      llm: { model: model },
    });

    if (voiceClient.state === "ready") {
      voiceClient.interrupt();

      setTimeout(() => {
        voiceClient.appendLLMContext(
          messages.model_change
        );
      }, 500);
    }
  };

  const handleTTSModelChange = (model: TTSModel) => {
    updateTTSConfig(model.id)
    const TTSVoices = getTTSVoices(model.id)
    updateConfig({
      tts: { model: model.id, voice: TTSVoices.length > 0 ? TTSVoices[0].id : "", },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <ModelSelect onSelect={handleModelChange} />
      {!showAllOptions && 
      <TTSModelSelect onSelect={handleTTSModelChange} />}
      {showAllOptions && (
        <VoiceSelect ttsModelId={defaultConfig.tts.model} onSelect={handleVoiceChange} />
      )}
    </div>
  );
};

export default Configuration;
