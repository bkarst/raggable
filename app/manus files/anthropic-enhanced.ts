// src/lib/anthropic-enhanced.ts
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

// Enhanced prompt templates with better context handling and tone options
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

Tone: {{tone}}

Draft a response email that accomplishes the user's intent while maintaining the specified tone:
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

Tone: {{tone}}

Improve the user's draft while maintaining their voice and intent, adjusting to the specified tone:
`,

  EMAIL_SUMMARIZE: `
You are Claude, an AI assistant helping to summarize an email thread.

Context:
- You're helping a user understand the key points of an email thread
- Extract the most important information and action items
- Be concise but comprehensive
- Organize the summary in a clear, structured way
- Do not include any explanations or notes about being an AI

Email Thread:
{{emailThread}}

Provide a concise summary of this email thread, highlighting key points and any action items:
`,

  EMAIL_TRANSLATE: `
You are Claude, an AI assistant helping to translate an email.

Context:
- You're helping a user translate an email to another language
- Maintain the original meaning, tone, and intent
- Ensure the translation is culturally appropriate
- Do not include any explanations or notes about being an AI

Original Email:
{{emailContent}}

Source Language: {{sourceLanguage}}
Target Language: {{targetLanguage}}

Translate the email to {{targetLanguage}} while preserving the original meaning and tone:
`
};

// Function to generate an email draft with enhanced options
export async function generateEmailDraft(
  emailThread: string,
  userIntent: string,
  tone: string = 'professional',
  maxTokens: number = 1000
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_DRAFT
      .replace('{{emailThread}}', emailThread)
      .replace('{{userIntent}}', userIntent)
      .replace('{{tone}}', tone);

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

// Function to improve an email draft with enhanced options
export async function improveEmailDraft(
  emailThread: string,
  userDraft: string,
  tone: string = 'professional',
  maxTokens: number = 1000
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_IMPROVEMENT
      .replace('{{emailThread}}', emailThread)
      .replace('{{userDraft}}', userDraft)
      .replace('{{tone}}', tone);

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

// Function to summarize an email thread
export async function summarizeEmailThread(
  emailThread: string,
  maxTokens: number = 500
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_SUMMARIZE
      .replace('{{emailThread}}', emailThread);

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return {
      summary: response.content[0].text,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  } catch (error) {
    console.error('Error summarizing email thread:', error);
    throw error;
  }
}

// Function to translate an email
export async function translateEmail(
  emailContent: string,
  sourceLanguage: string,
  targetLanguage: string,
  maxTokens: number = 1000
) {
  try {
    const prompt = PROMPT_TEMPLATES.EMAIL_TRANSLATE
      .replace('{{emailContent}}', emailContent)
      .replace(/\{\{sourceLanguage\}\}/g, sourceLanguage)
      .replace(/\{\{targetLanguage\}\}/g, targetLanguage);

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return {
      translatedEmail: response.content[0].text,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  } catch (error) {
    console.error('Error translating email:', error);
    throw error;
  }
}
