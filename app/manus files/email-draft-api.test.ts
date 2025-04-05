import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../src/app/api/email/draft/route';
import { getCurrentUser } from '../src/lib/auth';
import { prisma } from '../src/lib/prisma';
import { generateEmailDraft } from '../src/lib/anthropic-enhanced';

// Mock dependencies
vi.mock('../src/lib/auth', () => ({
  getCurrentUser: vi.fn()
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: {
    subscription: {
      findFirst: vi.fn()
    },
    usageMetric: {
      create: vi.fn()
    }
  }
}));

vi.mock('../src/lib/anthropic-enhanced', () => ({
  generateEmailDraft: vi.fn()
}));

describe('Email Draft API Endpoint', () => {
  let mockRequest;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock request
    mockRequest = {
      json: vi.fn().mockResolvedValue({
        emailThread: 'Test email thread',
        userIntent: 'Respond positively',
        tone: 'professional',
        mailboxId: 1
      })
    } as unknown as NextRequest;
    
    // Mock auth
    getCurrentUser.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com'
    });
    
    // Mock subscription
    prisma.subscription.findFirst.mockResolvedValue({
      id: 'sub-123',
      status: 'active',
      plan: 'pro'
    });
    
    // Mock generateEmailDraft
    generateEmailDraft.mockResolvedValue({
      draft: 'Generated email draft',
      tokensUsed: 150
    });
    
    // Mock usageMetric
    prisma.usageMetric.create.mockResolvedValue({
      id: 'metric-123'
    });
    
    // Mock NextResponse.json
    vi.spyOn(NextResponse, 'json');
  });
  
  it('should return 401 if user is not authenticated', async () => {
    getCurrentUser.mockResolvedValue(null);
    
    await POST(mockRequest);
    
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  });
  
  it('should return 403 if user has no active subscription', async () => {
    prisma.subscription.findFirst.mockResolvedValue(null);
    
    await POST(mockRequest);
    
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Active subscription required' },
      { status: 403 }
    );
  });
  
  it('should return 400 if required fields are missing', async () => {
    mockRequest.json.mockResolvedValue({});
    
    await POST(mockRequest);
    
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Email thread and user intent are required' },
      { status: 400 }
    );
  });
  
  it('should generate email draft and record usage metrics', async () => {
    await POST(mockRequest);
    
    expect(generateEmailDraft).toHaveBeenCalledWith(
      'Test email thread',
      'Respond positively',
      'professional'
    );
    
    expect(prisma.usageMetric.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-123',
        mailboxId: 1,
        feature: 'email_draft',
        tokensUsed: 150,
        requestCount: 1
      }
    });
    
    expect(NextResponse.json).toHaveBeenCalledWith({
      draft: 'Generated email draft',
      tokensUsed: 150
    });
  });
  
  it('should handle errors properly', async () => {
    generateEmailDraft.mockRejectedValue(new Error('API error'));
    
    await POST(mockRequest);
    
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'API error' },
      { status: 500 }
    );
  });
});
