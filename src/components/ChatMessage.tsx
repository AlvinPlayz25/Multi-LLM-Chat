import React from 'react';
import { Message } from '../types';
import { User, Bot, Brain, Sparkles, Cpu, FlaskConical, Zap } from 'lucide-react';
import { AVAILABLE_MODELS } from '../types';

interface ChatMessageProps {
  message: Message;
}

const modelIcons: Record<string, React.ComponentType> = {
  [AVAILABLE_MODELS.GPT40]: Bot,
  [AVAILABLE_MODELS.GEMINI]: Zap,
  [AVAILABLE_MODELS.GEMMA]: Brain,
  [AVAILABLE_MODELS.LLAMA]: Sparkles,
  [AVAILABLE_MODELS.MISTRAL]: Cpu,
  [AVAILABLE_MODELS.GROK]: FlaskConical,
};

const getModelDisplayName = (modelId: string): string => {
  switch (modelId) {
    case AVAILABLE_MODELS.GPT40:
      return "GPT-4";
    case AVAILABLE_MODELS.GEMINI:
      return "Gemini 1.5";
    case AVAILABLE_MODELS.GEMMA:
      return "Gemma 2 9B";
    case AVAILABLE_MODELS.LLAMA:
      return "Llama 3";
    case AVAILABLE_MODELS.MISTRAL:
      return "Mistral";
    case AVAILABLE_MODELS.GROK:
      return "Grok";
    default:
      return modelId.split('/')[1].split(':')[0];
  }
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const Icon = !isUser ? (modelIcons[message.model] || Bot) : User;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-700'
      } shadow-lg transform hover:scale-105 transition-transform duration-200`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-2 rounded-2xl shadow-md ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-white text-gray-800 border border-gray-100'
        } transform hover:scale-[1.02] transition-transform duration-200`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          {!isUser && (
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
              {getModelDisplayName(message.model)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}