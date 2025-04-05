// src/lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Helper function to count tokens in a message
export function countTokens(text: string): number {
  // This is a simple approximation - in production, use a proper tokenizer
  // Claude uses ~4 characters per token on average
  return Math.ceil(text.length / 4);
}

// Prompt templates for email responses
export const PROMPT_TEMPLATES = {
  EMAIL_DRAFT: `
You are Claude, an AI assistant helping to draft an email response.

Context:
- You're helping a user respond to an email thread
- Be professional, concise, and match the tone of the original email
- Address all points raised in the original email
- Keep your response focused and to the point
- Do not include any explanations or notes about being an AI

Email Thread:
{{emailThread}}

User's Intent:
{{userIntent}}

Draft a response email that accomplishes the user's intent while maintaining a professional tone:
`,

  EMAIL_IMPROVEMENT: `
You are Claude, an AI assistant helping to improve an email draft.

Context:
- You're helping a user improve their draft email
- Maintain the user's voice and intent
- Improve clarity, professionalism, and effectiveness
- Fix any grammar or spelling issues
- Do not include any explanations or notes about being an AI

Email Thread:
{{emailThread}}

User's Draft:
{{userDraft}}

Improve the user's draft while maintaining their voice and intent:
`,
};

// Function to generate an email draft
export async function generateEmailDraft(
  emailThread: string,
  userIntent: string,
  maxTokens: number = 1000
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_DRAFT
      .replace('{{emailThread}}', emailThread)
      .replace('{{userIntent}}', userIntent);

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return {
      draft: response.content[0].text,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  } catch (error) {
    console.error('Error generating email draft:', error);
    throw error;
  }
}

// Function to improve an email draft
export async function improveEmailDraft(
  emailThread: string,
  userDraft: string,
  maxTokens: number = 1000
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_IMPROVEMENT
      .replace('{{emailThread}}', emailThread)
      .replace('{{userDraft}}', userDraft);

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return {
      improvedDraft: response.content[0].text,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  } catch (error) {
    console.error('Error improving email draft:', error);
    throw error;
  }
}
