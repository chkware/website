# Contact Form Email Setup Guide

This guide explains how to set up and configure the contact form email system for CHKware's website.

## Overview

The contact form uses [Resend](https://resend.com) as the email service provider to deliver messages from the website contact form to the company email address.

## Prerequisites

1. A Resend account (free tier includes 3,000 emails/month)
2. Domain verification in Resend (for production)
3. Environment variables configured

## Setup Instructions

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com) and create an account
2. Verify your email address
3. Complete the onboarding process

### 2. Get API Key

1. In your Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give it a name like "CHKware Contact Form"
4. Select "Sending access" permission
5. Copy the generated API key (starts with `re_`)

### 3. Domain Setup (Production Only)

For production, you'll need to verify your domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `chkware.com`)
4. Follow the DNS verification steps
5. Wait for verification to complete

### 4. Environment Configuration

Copy the `.env.example` file to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Email Configuration for Contact Form
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_FROM_EMAIL=noreply@chkware.com
CONTACT_TO_EMAIL=info@chkware.com
CONTACT_FROM_NAME=CHKware Contact Form

# Rate Limiting Configuration
CONTACT_RATE_LIMIT_REQUESTS=5
CONTACT_RATE_LIMIT_WINDOW=3600
```

### 5. Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_123abc...` |
| `CONTACT_FROM_EMAIL` | Email address that sends the form submissions | `noreply@chkware.com` |
| `CONTACT_TO_EMAIL` | Email address that receives the form submissions | `info@chkware.com` |
| `CONTACT_FROM_NAME` | Display name for the sender | `CHKware Contact Form` |
| `CONTACT_RATE_LIMIT_REQUESTS` | Max requests per IP per window | `5` |
| `CONTACT_RATE_LIMIT_WINDOW` | Rate limit window in seconds | `3600` (1 hour) |

## Development vs Production

### Development
- You can use any email address for `CONTACT_FROM_EMAIL` (Resend allows this in development)
- Test emails will be sent from Resend's shared domain
- All features work the same as production

### Production
- `CONTACT_FROM_EMAIL` must use your verified domain
- Better deliverability with your own domain
- Professional appearance in recipient's inbox

## Testing the Setup

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test the Contact Form

1. Navigate to your website's contact section
2. Fill out the form with test data
3. Submit the form
4. Check for success message
5. Verify email delivery in the recipient inbox

### 3. Check Logs

Monitor the console for any error messages:

```bash
# Success log example
Contact form email sent successfully: {
  id: 'email-id-123',
  to: 'info@chkware.com',
  from: 'test@example.com',
  timestamp: '2024-01-01T12:00:00.000Z'
}

# Error log example
Failed to send email: {
  error: 'API key invalid',
  timestamp: '2024-01-01T12:00:00.000Z'
}
```

## Troubleshooting

### Common Issues

#### 1. "Server configuration error"
- **Cause**: Missing environment variables
- **Solution**: Check that all required env vars are set in `.env.local`

#### 2. "Failed to send message"
- **Cause**: Invalid API key or Resend service issue
- **Solution**: Verify API key is correct and Resend service is operational

#### 3. "Too many requests"
- **Cause**: Rate limiting triggered
- **Solution**: Wait for the rate limit window to reset, or adjust rate limit settings

#### 4. Emails not being received
- **Cause**: Email might be in spam folder or domain not verified
- **Solution**: Check spam folder, verify domain in Resend dashboard

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages in API responses.

## Security Considerations

### Input Validation
- All form inputs are validated and sanitized
- HTML/script tags are stripped from user input
- Email format validation prevents malformed addresses

### Rate Limiting
- Prevents spam by limiting submissions per IP address
- Default: 5 submissions per hour per IP
- Configurable via environment variables

### Data Protection
- No sensitive data is logged
- User emails are only used for reply-to functionality
- Form data is not stored permanently

## Monitoring and Maintenance

### Email Delivery Monitoring
- Check Resend dashboard for delivery statistics
- Monitor error logs for failed submissions
- Set up alerts for high error rates

### Rate Limit Monitoring
- Monitor console logs for rate limit triggers
- Adjust limits if legitimate users are being blocked
- Consider implementing user-specific rate limiting for authenticated users

### Regular Maintenance
- Rotate API keys periodically
- Review and update email templates
- Monitor spam reports and adjust content if needed

## Support

For issues with:
- **Resend service**: Contact Resend support
- **Contact form functionality**: Check application logs and this documentation
- **Email deliverability**: Verify domain settings in Resend dashboard

## API Reference

### POST /api/contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Test Subject",
  "message": "Test message content"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you within 24 hours."
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "Technical details (development only)"
}
```