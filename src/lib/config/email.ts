/**
 * Email configuration validation and utilities
 */

export interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  fromName: string;
  rateLimitRequests: number;
  rateLimitWindow: number;
}

/**
 * Validates that all required email environment variables are present
 * @returns EmailConfig object if valid
 * @throws Error if any required variables are missing
 */
export function validateEmailConfig(): EmailConfig {
  const requiredVars = [
    'RESEND_API_KEY',
    'CONTACT_FROM_EMAIL',
    'CONTACT_TO_EMAIL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    apiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.CONTACT_FROM_EMAIL!,
    toEmail: process.env.CONTACT_TO_EMAIL!,
    fromName: process.env.CONTACT_FROM_NAME || 'CHKware Contact Form',
    rateLimitRequests: parseInt(process.env.CONTACT_RATE_LIMIT_REQUESTS || '5'),
    rateLimitWindow: parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW || '3600'),
  };
}

/**
 * Validates email format
 * @param email Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitizes text input by removing HTML tags and scripts
 * @param input Text to sanitize
 * @returns Sanitized text
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Creates a professional HTML email template
 * @param data Form submission data
 * @returns HTML email content
 */
export function createEmailTemplate(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const timestamp = new Date().toLocaleString();
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission - CHKware</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600; 
          }
          .content { 
            padding: 30px; 
          }
          .field { 
            margin-bottom: 20px; 
          }
          .field-label { 
            font-weight: 600; 
            color: #374151; 
            margin-bottom: 5px; 
            display: block; 
          }
          .field-value { 
            background-color: #f9fafb; 
            padding: 12px; 
            border-radius: 6px; 
            border-left: 4px solid #3b82f6; 
          }
          .message-content { 
            background-color: #f9fafb; 
            padding: 20px; 
            border-radius: 6px; 
            border-left: 4px solid #8b5cf6; 
            white-space: pre-wrap; 
          }
          .footer { 
            background-color: #f9fafb; 
            padding: 20px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            border-top: 1px solid #e5e7eb; 
          }
          .timestamp { 
            color: #9ca3af; 
            font-size: 12px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">CHKware Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="field-label">From:</span>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Email:</span>
              <div class="field-value">${data.email}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Subject:</span>
              <div class="field-value">${data.subject}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Message:</span>
              <div class="message-content">${data.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from the CHKware website contact form.</p>
            <p class="timestamp">Received: ${timestamp}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}