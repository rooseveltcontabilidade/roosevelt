import { SYSTEM_PROMPT } from './ai/config.js';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LLMRequest {
  provider?: 'groq' | 'openai';
  messages: ChatMessage[];
  temperature?: number;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateReply({ provider = 'groq', messages, temperature = 0.2 }: LLMRequest): Promise<string> {
  const selectedProvider = process.env.LLM_PROVIDER || provider;
  
  // Clean user messages and inject strict system prompt
  const userMessages = messages.filter(m => m.role !== 'system');
  
  const finalMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...userMessages
  ];
  
  // Adjusted parameters for short, professional responses
  const MAX_TOKENS = 400; 

  if (selectedProvider === 'openai') {
    return callOpenAI(finalMessages, temperature, MAX_TOKENS);
  } else {
    return callGroq(finalMessages, temperature, MAX_TOKENS);
  }
}

async function callGroq(messages: ChatMessage[], temperature: number, maxTokens: number): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not found');

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
        messages,
        temperature,
        max_tokens: maxTokens,
        presence_penalty: 0.1 // Slight penalty to avoid loops, but keep flow natural
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
    }

    const data: any = await response.json();
    return data.choices?.[0]?.message?.content || 'Sem resposta.';

  } catch (error) {
    console.error('Groq Call Failed:', error);
    throw error;
  }
}

async function callOpenAI(messages: ChatMessage[], temperature: number, maxTokens: number): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY not found');
  
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', 
          messages,
          temperature,
          max_tokens: maxTokens,
          presence_penalty: 0.1
        })
      });
  
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
      }
  
      const data: any = await response.json();
      return data.choices?.[0]?.message?.content || 'Sem resposta.';
  
    } catch (error) {
      console.error('OpenAI Call Failed:', error);
      throw error;
    }
}
