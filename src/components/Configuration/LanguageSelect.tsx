import React from "react";
import { MessageCircle } from "lucide-react";

import { languages, Language } from "../../config";
import { Field } from "../ui/field";
import { Select } from "../ui/select";

type LanguageSelectProps = {
  onSelect: (Language: Language) => void;
};

const LanguageSelect: React.FC<LanguageSelectProps> = ({ onSelect }) => {
  return (
    <Field label="Voice:">
      <Select
        onChange={(e) => onSelect(languages[e.target.selectedIndex])}
        icon={<MessageCircle size={24} />}
      >
        {languages.map((l: Language) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default LanguageSelect;
