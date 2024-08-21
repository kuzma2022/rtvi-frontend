//const defaultLanguage = "English";
/*
export function composeSystemPrompt(language: string) {
  return `You are a helpful assistant named Gary. Keep responses short and legible. Respond in ${language}.`;
}*/

export const BOT_READY_TIMEOUT = 30 * 1000; // 20 seconds
export const LATENCY_MIN = 100;
export const LATENCY_MAX = 5500;
export const VAD_POSITIVE_SPEECH_THRESHOLD = 0.8;
export const VAD_NEGATIVE_SPEECH_THRESHOLD = 0.8 - 0.15;
export const VAD_MIN_SPEECH_FRAMES = 5;
export const VAD_REDEMPTION_FRAMES = 3;
export const VAD_PRESPEECH_PAD_FRAMES = 1;

export type Language = {
  language: string;
  model_id: string;
  code: string;
  voice: string;
};

export type Voice = {
  label: string;
  id: string;
};

export type LLMModel = {
  label: string;
  id: string;
};

export type TTSModel = {
  label: string;
  id: string;
};


const allVoices: { [key: string]: Voice[] } = {
  azure: [
    { label: "晓晓multi", id: "zh-CN-XiaoxiaoMultilingualNeural" },
    { label: "晓晓", id: "zh-CN-XiaoxiaoNeural" },
    { label: "晓艺", id: "zh-CN-XiaoyiNeural" },
    { label: "晓晨", id: "zh-CN-XiaochenNeural" },
    { label: "云溪", id: "zh-CN-YunxiNeural" },
  ],

  doubao: [
    { label: "柔美女友", id: "zh_female_sajiaonvyou_moon_bigtts" },
    { label: "爽快思思/Skye", id: "zh_female_shuangkuaisisi_moon_bigtts" },
    { label: "温暖阿虎/Alvin", id: "zh_male_wennuanahu_moon_bigtts" },
    { label: "京腔侃爷/Harmony", id: "zh_male_jingqiangkanye_moon_bigtts" },
  ],

  openai:[
    { label: "alloy", id: "alloy" },
    { label: "echo", id: "echo" },
    { label: "fable", id: "fable" },
    { label: "onyx", id: "onyx" },
    { label: "nova", id: "nova" },
    { label: "shimmer", id: "shimmer" },
  ]
};


// Function to get voices based on TTS model
export function getTTSVoices(ttsModelId: string): Voice[] {
  return allVoices[ttsModelId] || [];
}

export const languages: Language[] = [
  {
    language: "English",
    model_id: "sonic-english",
    code: "en",
    voice: "79a125e8-cd45-4c13-8a67-188112f4dd22",
  },
  {
    language: "French",
    model_id: "sonic-multilingual",
    code: "fr",
    voice: "a8a1eb38-5f15-4c1d-8722-7ac0f329727d",
  },
];

export const llmModels: LLMModel[] = [
  { label: "qwen2", id: "qwen2" },
  { label: "llama3.1", id: "llama3.1:8b" },
  { label: "llama3", id: "llama3" },
  { label: "gpt-4o", id: "gpt-4o" },
];


export const ttsModels: TTSModel[] = [
  { label: "豆包", id: "doubao" },
  { label: "微软", id: "azure" },
  //{ label: "OpenAI", id: "openai" },
];

const defaultTTSModel = ttsModels[0].id;
const defaultTTSVoices = getTTSVoices(defaultTTSModel);

export function updateTTSConfig(ttsModelId: string) {
  defaultConfig.tts.model = ttsModelId;
  const voices = getTTSVoices(ttsModelId);
  defaultConfig.tts.voice = voices.length > 0 ? voices[0].id : "";
}

export const defaultConfig = {
  llm: {
    model: llmModels[0].id,
    messages: [
      {
        role: "system",
        content:
          "你是聊天机器人,一个友好,乐于助人的机器人.您的输出将转换为音频,所以不包括特殊字符以外的还是在你的回答中.用一种创造性的和有帮助的方式回应用户所说的话,但是保持你的回应简短，回复的内容中文字用中文，标点符号请务必用英文.先打个招呼.",
        //composeSystemPrompt(defaultLanguage),
      },
    ],
  },
  tts: {
    model: defaultTTSModel,
    voice: defaultTTSVoices.length > 0 ? defaultTTSVoices[0].id : "",
  },
};
