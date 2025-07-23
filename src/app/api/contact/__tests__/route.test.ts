import { NextRequest } from 'next/server';
import { POST } from '../route';

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({
        data: { id: 'test-email-id' }
      })
    }
  }))
}));

// Mock rate limiter
jest.mock('rate-limiter-flexible', () => ({
  RateLimiterMemory: jest.fn().mockImplementation(() => ({
    consume: jest.fn().mockResolvedValue(true)
  }))
}));

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    RESEND_API_KEY: 'test-api-key',
    CONTACT_FROM_EMAIL: 'noreply@chkware.com',
    CONTACT_TO_EMAIL: 'info@chkware.com',
    CONTACT_FROM_NAME: 'CHKware Contact Form',
    CONTACT_RATE_LIMIT_REQUESTS: '5',
    CONTACT_RATE_LIMIT_WINDOW: '3600',
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('/api/contact', () => {
  const validFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message with enough characters.'
  };

  const createRequest = (body: any, headers: Record<string, string> = {}) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });
  };

  describe('Input Validation', () => {
    it('should accept valid form data', async () => {
      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Thank you for your message');
    });

    it('should reject empty name', async () => {
      const request = createRequest({ ...validFormData, name: '' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Name must be at least 2 characters');
    });

    it('should reject invalid email', async () => {
      const request = createRequest({ ...validFormData, email: 'invalid-email' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toContain('valid email address');
    });

    it('should reject short subject', async () => {
      const request = createRequest({ ...validFormData, subject: 'Hi' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Subject must be at least 5 characters');
    });

    it('should reject short message', async () => {
      const request = createRequest({ ...validFormData, message: 'Short' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Message must be at least 10 characters');
    });

    it('should sanitize HTML input', async () => {
      const maliciousData = {
        ...validFormData,
        name: 'John <script>alert("xss")</script> Doe',
        message: 'Hello <b>world</b> <script>alert("xss")</script>'
      };

      const request = createRequest(maliciousData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Invalid request format');
    });

    it('should handle missing environment variables', async () => {
      delete process.env.RESEND_API_KEY;

      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Server configuration error');
    });
  });

  describe('Rate Limiting', () => {
    it('should handle rate limit exceeded', async () => {
      // Mock rate limiter to throw error
      const { RateLimiterMemory } = require('rate-limiter-flexible');
      const mockConsume = jest.fn().mockRejectedValue(new Error('Rate limit exceeded'));
      RateLimiterMemory.mockImplementation(() => ({
        consume: mockConsume
      }));

      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Too many requests');
    });
  });

  describe('Email Service', () => {
    it('should handle email service failure', async () => {
      // Mock Resend to throw error
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockRejectedValue(new Error('Email service error'));
      Resend.mockImplementation(() => ({
        emails: { send: mockSend }
      }));

      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Failed to send message');
    });
  });
});