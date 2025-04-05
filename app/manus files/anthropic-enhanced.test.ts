import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateEmailDraft, improveEmailDraft, summarizeEmailThread, translateEmail } from '../src/lib/anthropic-enhanced';
import Anthropic from '@anthropic-ai/sdk';

// Mock the Anthropic SDK
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: vi.fn(() => ({
      messages: {
        create: vi.fn()
      }
    }))
  };
});

describe('Anthropic Enhanced Library', () => {
  let mockAnthropicInstance;
  
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Setup mock response
    mockAnthropicInstance = new Anthropic();
    mockAnthropicInstance.messages.create.mockResolvedValue({
      content: [{ text: 'Mocked response' }],
      usage: { input_tokens: 100, output_tokens: 50 }
    });
  });
  
  describe('generateEmailDraft', () => {
    it('should generate an email draft with default tone', async () => {
      const result = await generateEmailDraft('Test email thread', 'Respond positively');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-3-opus-20240229',
          messages: [
            {
              role: 'user',
              content: expect.stringContaining('Test email thread')
            }
          ]
        })
      );
      
      expect(result).toEqual({
        draft: 'Mocked response',
        tokensUsed: 150
      });
    });
    
    it('should generate an email draft with custom tone', async () => {
      const result = await generateEmailDraft('Test email thread', 'Respond positively', 'friendly');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create.mock.calls[0][0].messages[0].content).toContain('Tone: friendly');
      
      expect(result).toEqual({
        draft: 'Mocked response',
        tokensUsed: 150
      });
    });
    
    it('should handle errors properly', async () => {
      mockAnthropicInstance.messages.create.mockRejectedValue(new Error('API error'));
      
      await expect(generateEmailDraft('Test email thread', 'Respond positively')).rejects.toThrow('API error');
    });
  });
  
  describe('improveEmailDraft', () => {
    it('should improve an email draft with default tone', async () => {
      const result = await improveEmailDraft('Test email thread', 'Draft to improve');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-3-opus-20240229',
          messages: [
            {
              role: 'user',
              content: expect.stringContaining('Draft to improve')
            }
          ]
        })
      );
      
      expect(result).toEqual({
        improvedDraft: 'Mocked response',
        tokensUsed: 150
      });
    });
    
    it('should improve an email draft with custom tone', async () => {
      const result = await improveEmailDraft('Test email thread', 'Draft to improve', 'formal');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create.mock.calls[0][0].messages[0].content).toContain('Tone: formal');
      
      expect(result).toEqual({
        improvedDraft: 'Mocked response',
        tokensUsed: 150
      });
    });
  });
  
  describe('summarizeEmailThread', () => {
    it('should summarize an email thread', async () => {
      const result = await summarizeEmailThread('Long email thread to summarize');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-3-haiku-20240307',
          messages: [
            {
              role: 'user',
              content: expect.stringContaining('Long email thread to summarize')
            }
          ]
        })
      );
      
      expect(result).toEqual({
        summary: 'Mocked response',
        tokensUsed: 150
      });
    });
  });
  
  describe('translateEmail', () => {
    it('should translate an email', async () => {
      const result = await translateEmail('Email to translate', 'English', 'Spanish');
      
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledTimes(1);
      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-3-opus-20240229',
          messages: [
            {
              role: 'user',
              content: expect.stringContaining('Email to translate')
            }
          ]
        })
      );
      
      expect(mockAnthropicInstance.messages.create.mock.calls[0][0].messages[0].content).toContain('Source Language: English');
      expect(mockAnthropicInstance.messages.create.mock.calls[0][0].messages[0].content).toContain('Target Language: Spanish');
      
      expect(result).toEqual({
        translatedEmail: 'Mocked response',
        tokensUsed: 150
      });
    });
  });
});
