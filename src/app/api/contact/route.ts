import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Input validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
});

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: NextRequest) => {
    // Use IP address for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown';
    return ip;
  },
  points: parseInt(process.env.CONTACT_RATE_LIMIT_REQUESTS || '5'), // Number of requests
  duration: parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW || '3600'), // Per 1 hour
});

// Response interfaces
interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Utility function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const clientIP = getClientIP(request);
    
    try {
      await rateLimiter.consume(clientIP);
    } catch (rateLimiterRes) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? 'Rate limit exceeded' : undefined,
        } as ContactResponse,
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format.',
          error: process.env.NODE_ENV === 'development' ? 'Invalid JSON' : undefined,
        } as ContactResponse,
        { status: 400 }
      );
    }

    // Validate input data
    let validatedData: ContactFormData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        return NextResponse.json(
          {
            success: false,
            message: firstError.message,
            error: process.env.NODE_ENV === 'development' ? JSON.stringify(error.errors) : undefined,
          } as ContactResponse,
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input data.',
          error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
        } as ContactResponse,
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: validatedData.email, // Email is already validated by Zod
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message),
    };

    // Check environment variables
    const requiredEnvVars = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? `Missing env vars: ${missingEnvVars.join(', ')}` : undefined,
        } as ContactResponse,
        { status: 500 }
      );
    }

    // Import Resend dynamically to handle potential import issues
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Create email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission - CHKware</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: 600; color: #374151; margin-bottom: 5px; display: block; }
            .field-value { background-color: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .message-content { background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #8b5cf6; white-space: pre-wrap; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
            .timestamp { color: #9ca3af; font-size: 12px; }
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
                <div class="field-value">${sanitizedData.name}</div>
              </div>
              
              <div class="field">
                <span class="field-label">Email:</span>
                <div class="field-value">${sanitizedData.email}</div>
              </div>
              
              <div class="field">
                <span class="field-label">Subject:</span>
                <div class="field-value">${sanitizedData.subject}</div>
              </div>
              
              <div class="field">
                <span class="field-label">Message:</span>
                <div class="message-content">${sanitizedData.message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent from the CHKware website contact form.</p>
              <p class="timestamp">Received: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: `${process.env.CONTACT_FROM_NAME || 'CHKware Contact Form'} <${process.env.CONTACT_FROM_EMAIL}>`,
        to: [process.env.CONTACT_TO_EMAIL!],
        replyTo: sanitizedData.email,
        subject: `Contact Form: ${sanitizedData.subject}`,
        html: emailHtml,
      });

      // Log successful email (without sensitive content)
      console.log('Contact form email sent successfully:', {
        id: emailResult.data?.id,
        to: process.env.CONTACT_TO_EMAIL,
        from: sanitizedData.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      } as ContactResponse);

    } catch (emailError: any) {
      console.error('Failed to send email:', {
        error: emailError.message,
        timestamp: new Date().toISOString(),
        // Don't log sensitive data
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send message. Please try again or contact us directly.',
          error: process.env.NODE_ENV === 'development' ? emailError.message : undefined,
        } as ContactResponse,
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Unexpected error in contact API:', {
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      } as ContactResponse,
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}