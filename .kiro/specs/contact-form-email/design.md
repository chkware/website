# Design Document

## Overview

The contact form email system will transform the existing static contact form into a fully functional email delivery system. The solution uses Resend as the email service provider due to its modern API, excellent deliverability, and developer-friendly integration. The system follows a standard Next.js API route pattern with proper validation, error handling, and user feedback.

## Architecture

### Email Service Selection: Resend

**Why Resend:**
- Modern, developer-friendly API
- Excellent deliverability rates
- Built-in email templates and HTML support
- Generous free tier (3,000 emails/month)
- Great documentation and TypeScript support
- No complex SMTP configuration required

### System Flow

1. User fills out contact form
2. Frontend validates form data
3. Form submission triggers API call to `/api/contact`
4. API validates and sanitizes input
5. API calls Resend service to send email
6. API returns success/error response
7. Frontend displays appropriate feedback to user

## Components and Interfaces

### API Route: `/api/contact`

**Input Interface:**
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

**Response Interface:**
```typescript
interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

### Frontend Form Handler

**State Management:**
- Form data state
- Loading state
- Success/error message state
- Form validation state

**Validation Rules:**
- Name: Required, 2-100 characters
- Email: Required, valid email format
- Subject: Required, 5-200 characters
- Message: Required, 10-2000 characters

### Email Template

**HTML Email Structure:**
- CHKware branding header
- Sender information section
- Message content with proper formatting
- Footer with timestamp and source
- Responsive design for mobile clients

## Data Models

### Contact Form Submission

```typescript
interface ContactSubmission {
  name: string;          // Sender's full name
  email: string;         // Sender's email (validated)
  subject: string;       // Message subject line
  message: string;       // Message content
  timestamp: Date;       // Submission timestamp
  userAgent?: string;    // Browser info for debugging
  ipAddress?: string;    // IP for rate limiting (not stored)
}
```

### Email Configuration

```typescript
interface EmailConfig {
  apiKey: string;        // Resend API key
  fromEmail: string;     // Sender email (noreply@chkware.com)
  toEmail: string;       // Recipient email (info@chkware.com)
  fromName: string;      // Sender name (CHKware Contact Form)
}
```

## Error Handling

### Client-Side Errors
- Form validation errors (inline field validation)
- Network errors (connection issues)
- Server errors (API failures)
- Rate limiting errors (too many requests)

### Server-Side Errors
- Invalid input data (400 Bad Request)
- Email service failures (500 Internal Server Error)
- Rate limiting (429 Too Many Requests)
- Configuration errors (500 Internal Server Error)

### Error Response Format
```typescript
{
  success: false,
  message: "User-friendly error message",
  error: "Technical error details" // Only in development
}
```

## Testing Strategy

### Unit Tests
- Form validation functions
- Email template generation
- API route input validation
- Error handling scenarios

### Integration Tests
- End-to-end form submission flow
- Email delivery verification
- Error handling with mock failures
- Rate limiting behavior

### Manual Testing
- Form submission with various inputs
- Email delivery and formatting
- Error scenarios (network failures, invalid data)
- Mobile responsiveness
- Accessibility compliance

## Security Considerations

### Input Validation
- Sanitize all user inputs
- Validate email format
- Limit message length
- Strip HTML/script tags

### Rate Limiting
- Implement per-IP rate limiting
- Prevent spam submissions
- Use exponential backoff for failures

### Data Protection
- Don't log sensitive information
- Use HTTPS for all communications
- Validate environment variables
- Implement CORS properly

## Configuration

### Environment Variables
```
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_FROM_EMAIL=noreply@chkware.com
CONTACT_TO_EMAIL=info@chkware.com
CONTACT_FROM_NAME=CHKware Contact Form
```

### Rate Limiting Configuration
- 5 submissions per IP per hour
- 1 submission per IP per minute
- Exponential backoff on failures

## Deployment Considerations

### Dependencies
- `resend` package for email service
- `zod` for input validation
- `rate-limiter-flexible` for rate limiting

### Monitoring
- Log successful email deliveries
- Track error rates and types
- Monitor rate limiting triggers
- Alert on email service failures