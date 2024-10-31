export interface Message {
  role: 'user' | 'assistant';
  content: string;
  model: string;
  timestamp: number;
}

export interface Conversation {
  messages: Message[];
  model: string;
}

export const AVAILABLE_MODELS = {
  GPT40: "openai/chatgpt-4o-latest:free",
  GEMINI: "google/gemini-flash-1.5-exp",
  GEMMA: "google/gemma-2-9b-it:free",
  LLAMA: "meta-llama/llama-3.2-3b-instruct:free",
  MISTRAL: "mistralai/mistral-7b-instruct:free",
  GROK: "x-ai/grok-beta:free"
} as const;