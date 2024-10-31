import { Message } from './types';

const OPENROUTER_API_KEY = "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export async function sendMessage(messages: Message[], selectedModel: string) {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.href,
        "X-Title": "Multi-LLM Chat",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages.map(({ role, content }) => ({ role, content })),
        temperature: 0.7,
        max_tokens: 1000,
        route: "fallback" // This ensures we get the exact model we request
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    
    // Verify the model used matches what we requested
    const usedModel = data.model;
    if (!usedModel.includes(selectedModel)) {
      throw new Error(`Model mismatch: Requested ${selectedModel} but got ${usedModel}`);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}