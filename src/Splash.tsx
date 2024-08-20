import React, { useEffect } from "react";
import { VAD } from "web-vad";

import { Button } from "./components/ui/button";

type SplashProps = {
  handleReady: () => void;
};

export const Splash: React.FC<SplashProps> = ({ handleReady }) => {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const cacheVAD = async () => {
      await VAD.precacheModels("silero_vad.onnx");
      setIsReady(true);
    };
    cacheVAD();
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center bg-primary-200 p-4 bg-[length:auto_50%] lg:bg-auto bg-colorWash bg-no-repeat bg-right-top">
      <div className="flex flex-col gap-8 lg:gap-12 items-left max-w-full lg:max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-left">
          Virtual Human
          <br/>
        </h1>
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl text-balance text-left">
          PROOF OF CONCEPT EXPERIMENTS
          <br/>
        </h2>
        <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl text-balance text-left ">
          虚拟人语音交互Roadmap:
        </h3>

        <div className="relative text-left">
          <div className="absolute inset-0 flex items-center justify-left ml-4" aria-hidden="true">
            <div className="w-1 bg-gray-300 h-full"></div>
          </div>
          <div className="space-y-8">
            <div className="relative flex items-center">

              <div className="ml-8">
                <h3 className="text-1xl font-bold mb-2">Phase 1: 虚拟人对话原型搭建</h3>
                <p className="text-gray-700">集成语音文字互转、大语言模型等服务，基于开源项目快速验证，并支持不间断对话。</p>
              </div>
            </div>
            <div className="relative flex items-center">

              <div className="ml-8">
                <h3 className="text-1xl font-bold mb-2">Phase 2: 多语种支持与效果调优</h3>
                <p className="text-gray-700">部署中文推理模型与服务，统计各环节实验情况，并针对性的进行优化。</p>
              </div>
            </div>
            <div className="relative flex items-center">

              <div className="ml-8">
                <h3 className="text-1xl font-bold mb-2">Phase 3: 语气和语调情感调优</h3>
                <p className="text-gray-700">不同语言模型和prompt对比优化，控制tts的音色，引入语音标记语言和音色迁移等。</p>
              </div>
            </div>
            <div className="relative flex items-center">

              <div className="ml-8">
                <h3 className="text-1xl font-bold mb-2">Phase 4: 长对话内容优化</h3>
                <p className="text-gray-700">引入长短时记忆、增强式检索(RAG)、支持函数调用与实时搜索等工具调用。</p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleReady} disabled={!isReady}>
          {isReady ? "Try demo" : "Downloading assets..."}
        </Button>

        <div className="h-[1px] bg-primary-300 w-full"/>

        <footer className="flex flex-col lg:gap-2">

          <div className="ml-8 text-left">
            <h3 className="text-xl font-bold mb-2"> Release note</h3>
            <p className="font-bold text-gray-700">update:2024.8.16</p>
            <p className="text-gray-700">1. 完成基于开源方案的语音交互全流程打通，实现LLM，TTS等方案可配置。</p>
            <p className="text-gray-700">2. 初步实现不间断对话效果。</p>
          </div>
          
        </footer>
      </div>
    </main>
  );
};

export default Splash;
