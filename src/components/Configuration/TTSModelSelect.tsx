import React from "react";
import { MessageCircle } from "lucide-react";

import { ttsModels, TTSModel } from "@/config";
import { Field } from "../ui/field";
import { Select } from "../ui/select";

type TTSModelSelectProps = {
  onSelect: (model: TTSModel) => void;
};

const TTSModelSelect: React.FC<TTSModelSelectProps> = ({ onSelect }) => {
  return (
    <Field label="TTS Model:">
      <Select
        onChange={(e) => {
          const selectedModel = ttsModels.find(
            (model) => model.id === e.target.value
          );
          if (selectedModel) {
            onSelect(selectedModel);
          }
        }}
        icon={<MessageCircle size={24} />}
      >
        {ttsModels.map((model: TTSModel) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default TTSModelSelect;
