import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Voice, getTTSVoices } from "@/config";
import { Field } from "../ui/field";
import { Select } from "../ui/select";

type VoiceSelectProps = {
  ttsModelId: string;
  onSelect: (voice: Voice) => void;
};

const VoiceSelect: React.FC<VoiceSelectProps> = ({ ttsModelId, onSelect }) => {
  const [voices, setVoices] = useState<Voice[]>([]);

  useEffect(() => {
    setVoices(getTTSVoices(ttsModelId));
  }, [ttsModelId]);

  return (
    <Field label="Voice:">
      <Select
        onChange={(e) => onSelect(voices[e.target.selectedIndex])}
        icon={<MessageCircle size={24} />}
      >
        {voices.map((voice: Voice) => (
          <option key={voice.id} value={voice.id}>
            {voice.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default VoiceSelect;
