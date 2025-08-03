# Vercel Deployment Guide

This guide will help you deploy the ChkWare website to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Resend Account**: For contact form functionality, sign up at [resend.com](https://resend.com)

## Quick Deployment Steps

### 1. Connect Your Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will automatically detect this as a Next.js project

### 2. Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

#### Required Variables (for contact form):
```
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_FROM_EMAIL=noreply@yourdomain.com
CONTACT_TO_EMAIL=contact@yourdomain.com
CONTACT_FROM_NAME=CHKware Contact Form
```

#### Optional Variables:
```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION=your_verification_code
CONTACT_RATE_LIMIT_REQUESTS=5
CONTACT_RATE_LIMIT_WINDOW=3600
```

### 3. Deploy

Click **Deploy** and Vercel will:
- Install dependencies with `npm install`
- Build the project with `npm run build`
- Deploy to a global CDN

## Setting Up Email (Resend)

1. **Create Resend Account**: Go to [resend.com](https://resend.com)
2. **Get API Key**: 
   - Go to API Keys in your dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)
3. **Verify Domain** (recommended):
   - Add your domain in Resend dashboard
   - Follow DNS verification steps
   - Use your verified domain for `CONTACT_FROM_EMAIL`

## Domain Configuration

### Custom Domain
1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### SSL Certificate
Vercel automatically provides SSL certificates for all domains.

## Build Configuration

The project includes a `vercel.json` file with optimized settings:

- **Build Command**: `npm run build`
- **Output Directory**: `.next` (Next.js default)
- **Framework**: Next.js
- **Security Headers**: Included for production
- **API Function Timeout**: 10 seconds for contact form

## Performance Optimizations

The deployment includes:
- ✅ Static generation for blog posts
- ✅ Image optimization (disabled for compatibility)
- ✅ Font optimization with Google Fonts
- ✅ CSS optimization with Tailwind
- ✅ Bundle optimization with Next.js
- ✅ CDN distribution via Vercel Edge Network

## Monitoring & Analytics

### Built-in Vercel Analytics
- Automatically enabled for all deployments
- View in Vercel dashboard under **Analytics**

### Google Analytics (Optional)
1. Create Google Analytics 4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable

### Search Console (Optional)
1. Add property in Google Search Console
2. Get verification meta tag content
3. Add to `NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION`

## Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

### Contact Form Issues
- Verify all required environment variables are set
- Check Resend API key is valid
- Ensure `CONTACT_FROM_EMAIL` uses verified domain

### Performance Issues
- Use Vercel Analytics to identify bottlenecks
- Check Core Web Vitals in deployment overview
- Monitor function execution times

## Environment-Specific Notes

### Development
```bash
npm run dev
```

### Production Build (Local Testing)
```bash
npm run build  # Builds to .next directory
npm run start  # Starts production server
```

### Vercel CLI (Optional)
```bash
npm i -g vercel
vercel --prod
```

## Security Considerations

The deployment includes:
- Rate limiting on contact form (5 requests/hour per IP)
- Input sanitization and validation
- Security headers via `vercel.json`
- Environment variable protection
- HTTPS enforcement

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)