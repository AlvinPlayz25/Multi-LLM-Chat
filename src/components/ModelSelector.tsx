import React from 'react';
import { AVAILABLE_MODELS } from '../types';
import { Bot, Brain, Sparkles, MessageSquare, Cpu, FlaskConical, Zap } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const modelIcons = {
  [AVAILABLE_MODELS.GPT40]: Bot,
  [AVAILABLE_MODELS.GEMINI]: Zap,
  [AVAILABLE_MODELS.GEMMA]: Brain,
  [AVAILABLE_MODELS.LLAMA]: Sparkles,
  [AVAILABLE_MODELS.MISTRAL]: Cpu,
  [AVAILABLE_MODELS.GROK]: FlaskConical,
};

const modelNames = {
  [AVAILABLE_MODELS.GPT40]: "GPT-4",
  [AVAILABLE_MODELS.GEMINI]: "Gemini 1.5",
  [AVAILABLE_MODELS.GEMMA]: "Gemma 2 9B",
  [AVAILABLE_MODELS.LLAMA]: "Llama 3",
  [AVAILABLE_MODELS.MISTRAL]: "Mistral",
  [AVAILABLE_MODELS.GROK]: "Grok",
};

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {Object.entries(AVAILABLE_MODELS).map(([key, model]) => {
        const Icon = modelIcons[model];
        return (
          <button
            key={model}
            onClick={() => onModelSelect(model)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedModel === model
                ? 'bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-102 shadow-sm'
            }`}
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className="font-medium">{modelNames[model]}</span>
          </button>
        );
      })}
    </div>
  );
}