# SEO Setup Guide for CHKware

This guide provides comprehensive instructions for setting up and maintaining SEO optimization for CHKware's website.

## Overview

The SEO system includes:
- Technical SEO fundamentals (meta tags, structured data, sitemaps)
- Performance optimization for Core Web Vitals
- Analytics and tracking integration
- Content optimization for target keywords
- Social media optimization

## Quick Setup

### 1. Environment Variables

Add these to your `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION=your_verification_code_here
```

### 2. Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (starts with G-)
3. Add it to your environment variables
4. The system will automatically track:
   - Page views
   - Core Web Vitals
   - User interactions
   - Conversion events

### 3. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (https://chkware.com)
3. Verify ownership using the HTML tag method
4. Add the verification code to your environment variables

## SEO Features

### Technical SEO

#### Meta Tags
- Dynamic title and description generation
- Open Graph tags for social media
- Twitter Card integration
- Canonical URLs
- Robots meta tags

#### Structured Data
- Software Application schema
- Organization schema
- Breadcrumb navigation
- JSON-LD format

#### Performance
- Image optimization with Next.js Image
- Critical CSS inlining
- Resource preloading
- Service worker caching

### Content Optimization

#### Target Keywords
Primary keywords:
- YAML validation
- Configuration management
- DevOps tools

Secondary keywords:
- YAML linting
- CI/CD integration
- Infrastructure as code
- Configuration validation

#### Content Structure
- Proper heading hierarchy (H1 → H2 → H3)
- Strategic keyword placement
- Internal linking optimization
- Alt text for all images

### Analytics & Tracking

#### Google Analytics Events
- Page views
- Button clicks
- Form submissions
- Scroll depth
- Time on page
- Core Web Vitals

#### Conversion Tracking
- Contact form submissions
- Download events
- External link clicks
- Newsletter signups

## SEO Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

### Performance Monitoring
```javascript
// Check Core Web Vitals in browser console
import { measureCoreWebVitals } from '@/lib/performance/optimization';
measureCoreWebVitals();
```

### SEO Validation
```javascript
// Validate page SEO
import { extractPageSEOData, validatePageSEO } from '@/lib/seo/validation';

const pageData = extractPageSEOData();
const validation = validatePageSEO(pageData);
console.log('SEO Score:', validation.score);
```

## Content Guidelines

### Title Tags
- Length: 30-60 characters
- Include primary keyword
- Brand name at the end
- Unique for each page

### Meta Descriptions
- Length: 120-160 characters
- Include primary and secondary keywords
- Compelling call-to-action
- Unique for each page

### Headings
- One H1 per page with primary keyword
- H2s for main sections with secondary keywords
- H3s for subsections
- Logical hierarchy

### Images
- Descriptive alt text with keywords
- Optimized file sizes (WebP format)
- Proper dimensions
- Lazy loading for below-fold images

## Social Media Optimization

### Open Graph Tags
- Title: Same as page title
- Description: Same as meta description
- Image: 1200x630 pixels
- URL: Canonical URL

### Twitter Cards
- Card type: summary_large_image
- Title and description
- Image: Same as Open Graph
- Site and creator handles

## Testing & Validation

### SEO Testing Tools
1. **Google Rich Results Test**: Test structured data
2. **Google PageSpeed Insights**: Check Core Web Vitals
3. **Google Mobile-Friendly Test**: Verify mobile optimization
4. **Facebook Sharing Debugger**: Test Open Graph tags
5. **Twitter Card Validator**: Test Twitter Cards

### Automated Testing
```bash
# Run SEO tests
npm run test src/lib/seo/__tests__/

# Check bundle size
npm run analyze

# Lighthouse audit
npx lighthouse https://chkware.com --output=html
```

## Maintenance

### Regular Tasks
- [ ] Monitor Core Web Vitals monthly
- [ ] Update structured data as needed
- [ ] Review and optimize content quarterly
- [ ] Check for broken links monthly
- [ ] Update meta tags for new content

### Performance Monitoring
- Set up alerts for Core Web Vitals degradation
- Monitor page load times
- Track search rankings for target keywords
- Review Google Search Console regularly

### Content Updates
- Refresh meta descriptions quarterly
- Update structured data for new features
- Add internal links to new content
- Optimize images regularly

## Troubleshooting

### Common Issues

#### Low SEO Score
1. Check title and description lengths
2. Verify structured data validity
3. Ensure proper heading hierarchy
4. Add missing alt text to images

#### Poor Core Web Vitals
1. Optimize images (size and format)
2. Minimize JavaScript bundles
3. Use proper loading strategies
4. Eliminate layout shifts

#### Missing Search Console Data
1. Verify ownership
2. Check robots.txt
3. Submit sitemap manually
4. Wait 24-48 hours for indexing

### Debug Commands
```javascript
// Check current SEO data
console.log(extractPageSEOData());

// Validate structured data
const structuredData = document.querySelector('script[type="application/ld+json"]');
console.log(JSON.parse(structuredData.textContent));

// Check meta tags
Array.from(document.querySelectorAll('meta')).forEach(meta => {
  console.log(meta.getAttribute('name') || meta.getAttribute('property'), meta.getAttribute('content'));
});
```

## Resources

### Documentation
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Core Web Vitals](https://web.dev/vitals/)
- [Structured Data Guidelines](https://developers.google.com/search/docs/guides/intro-structured-data)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Rich Results Test](https://search.google.com/test/rich-results)

### Monitoring
- Set up Google Alerts for brand mentions
- Monitor competitor rankings
- Track backlink acquisition
- Review search performance monthly